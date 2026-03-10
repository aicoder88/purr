import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { RetailerOrderStatus } from '@/generated/client/enums';
import { getRetailerBearerToken, verifyRetailerToken } from '@/lib/retailer-auth';

const COMPLETED_RETAILER_ORDER_STATUSES: RetailerOrderStatus[] = [
  RetailerOrderStatus.PAID,
  RetailerOrderStatus.PROCESSING,
  RetailerOrderStatus.SHIPPED,
  RetailerOrderStatus.DELIVERED,
];

async function handler(req: NextRequest): Promise<Response> {
  try {
    const token = getRetailerBearerToken(req);
    if (!token) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyRetailerToken(token);
    if (!payload?.retailerId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!prisma) {
      return Response.json({ message: 'Database unavailable. Please try again later.' }, { status: 500 });
    }

    const retailer = await prisma.retailer.findUnique({
      where: { id: payload.retailerId },
      select: {
        id: true,
        businessName: true,
        contactName: true,
        email: true,
        status: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!retailer) {
      return Response.json({ message: 'Retailer not found' }, { status: 404 });
    }

    if (retailer.status !== 'ACTIVE') {
      return Response.json({ message: 'Retailer account is not active' }, { status: 403 });
    }

    const [orderSummary, recentOrders] = await Promise.all([
      prisma.retailerOrder.aggregate({
        where: {
          retailerId: retailer.id,
          status: { in: COMPLETED_RETAILER_ORDER_STATUSES },
        },
        _count: {
          _all: true,
        },
        _sum: {
          totalAmount: true,
        },
        _max: {
          createdAt: true,
        },
      }),
      prisma.retailerOrder.findMany({
        where: {
          retailerId: retailer.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 8,
        select: {
          id: true,
          orderNumber: true,
          status: true,
          createdAt: true,
          totalAmount: true,
          subtotal: true,
          shipping: true,
          items: {
            select: {
              quantity: true,
            },
          },
        },
      }),
    ]);

    return Response.json({
      retailer,
      summary: {
        totalOrders: orderSummary._count?._all ?? 0,
        lifetimeSpend: orderSummary._sum?.totalAmount ?? 0,
        lastOrderAt: orderSummary._max?.createdAt ?? null,
      },
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        createdAt: order.createdAt,
        totalAmount: order.totalAmount,
        subtotal: order.subtotal,
        shipping: order.shipping,
        boxCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
      })),
    });
  } catch (error) {
    console.error('Retailer dashboard error:', error);
    return Response.json({ message: 'Failed to load retailer dashboard.' }, { status: 500 });
  }
}

export const GET = handler;
