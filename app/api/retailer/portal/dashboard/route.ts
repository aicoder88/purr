import prisma from '@/lib/prisma';
import { RetailerOrderStatus } from '@/generated/client/enums';
import { getRetailerPortalAccessForRouteHandler } from '@/lib/auth/retailer-portal';

const COMPLETED_RETAILER_ORDER_STATUSES: RetailerOrderStatus[] = [
  RetailerOrderStatus.PAID,
  RetailerOrderStatus.PROCESSING,
  RetailerOrderStatus.SHIPPED,
  RetailerOrderStatus.DELIVERED,
];

async function handler(): Promise<Response> {
  try {
    if (!prisma) {
      return Response.json({ message: 'Database unavailable. Please try again later.' }, { status: 500 });
    }

    const access = await getRetailerPortalAccessForRouteHandler();
    if (access.state === 'unauthenticated') {
      return Response.json(
        { code: 'retailer_session_expired', message: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (access.state !== 'active') {
      return Response.json(
        {
          code: access.code,
          message: access.message,
          status: access.state === 'blocked' ? access.status : undefined,
        },
        { status: 403 }
      );
    }

    const [orderSummary, recentOrders] = await Promise.all([
      prisma.retailerOrder.aggregate({
        where: {
          retailerId: access.retailer.id,
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
          retailerId: access.retailer.id,
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
      retailer: access.retailer,
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
