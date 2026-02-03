import prisma from '@/lib/prisma';
import { ConversionStatus, Prisma } from '@/generated/client/client';
import { auth } from '@/auth';

export async function GET(req: Request): Promise<Response> {
  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    // Authenticate affiliate
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = session.user as { role?: string; affiliateId?: string };
    if (user.role !== 'affiliate' || !user.affiliateId) {
      return Response.json({ error: 'Not authorized as affiliate' }, { status: 403 });
    }

    const affiliateId = user.affiliateId;

    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Build filters
    const dateFilter: { gte?: Date; lte?: Date } = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }

    // Build where clause with proper typing
    const where: Prisma.AffiliateConversionWhereInput = {
      affiliateId,
    };

    if (Object.keys(dateFilter).length > 0) {
      where.purchasedAt = dateFilter;
    }

    // Only add status if it's a valid ConversionStatus
    const validStatuses: ConversionStatus[] = ['PENDING', 'CLEARED', 'VOIDED', 'PAID'];
    if (status && validStatuses.includes(status as ConversionStatus)) {
      where.status = status as ConversionStatus;
    }

    // Fetch conversions with pagination
    const [conversions, totalCount, statusCounts] = await Promise.all([
      prisma.affiliateConversion.findMany({
        where,
        orderBy: { purchasedAt: 'desc' },
        skip,
        take: limitNum,
        select: {
          id: true,
          orderId: true,
          orderSubtotal: true,
          commissionRate: true,
          commissionAmount: true,
          status: true,
          purchasedAt: true,
          clearedAt: true,
        },
      }),
      prisma.affiliateConversion.count({ where }),
      // Get status breakdown
      prisma.affiliateConversion.groupBy({
        by: ['status'],
        where: { affiliateId },
        _count: true,
      }),
    ]);

    // Calculate summary stats
    const summary = await prisma.affiliateConversion.aggregate({
      where,
      _sum: {
        orderSubtotal: true,
        commissionAmount: true,
      },
      _count: true,
    });

    // Transform status counts into an object
    const statusBreakdown = statusCounts.reduce(
      (acc, item) => {
        acc[item.status] = item._count;
        return acc;
      },
      {} as Record<string, number>
    );

    return Response.json({
      conversions,
      summary: {
        totalConversions: summary._count,
        totalOrderValue: summary._sum?.orderSubtotal ?? 0,
        totalCommission: summary._sum?.commissionAmount ?? 0,
      },
      statusBreakdown,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (error) {
    console.error('Failed to fetch affiliate conversions:', error);
    return Response.json({ error: 'Failed to fetch conversions' }, { status: 500 });
  }
}
