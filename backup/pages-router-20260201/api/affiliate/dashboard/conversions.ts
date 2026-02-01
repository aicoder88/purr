import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { ConversionStatus, Prisma } from '@prisma/client';
import { withAffiliateAuth, AffiliateApiRequest } from '@/lib/affiliate/middleware';

async function handler(req: AffiliateApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  const { affiliateId } = req.affiliate;
  const { page = '1', limit = '20', status, startDate, endDate } = req.query;

  const pageNum = Math.max(1, parseInt(page as string, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
  const skip = (pageNum - 1) * limitNum;

  try {
    // Build filters
    const dateFilter: { gte?: Date; lte?: Date } = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate as string);
    }
    if (endDate) {
      const end = new Date(endDate as string);
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

    return res.status(200).json({
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
    return res.status(500).json({ error: 'Failed to fetch conversions' });
  }
}

export default withAffiliateAuth(handler);
