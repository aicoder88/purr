import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { withAffiliateAuth, AffiliateApiRequest } from '@/lib/affiliate/middleware';

async function handler(req: AffiliateApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  const { affiliateId } = req.affiliate;
  const { page = '1', limit = '20', startDate, endDate } = req.query;

  const pageNum = Math.max(1, parseInt(page as string, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
  const skip = (pageNum - 1) * limitNum;

  try {
    // Build date filter
    const dateFilter: { gte?: Date; lte?: Date } = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate as string);
    }
    if (endDate) {
      const end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }

    const where = {
      affiliateId,
      ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }),
    };

    // Fetch clicks with pagination
    const [clicks, totalCount] = await Promise.all([
      prisma.affiliateClick.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        select: {
          id: true,
          sessionId: true,
          landingPage: true,
          createdAt: true,
          convertedAt: true,
          orderId: true,
        },
      }),
      prisma.affiliateClick.count({ where }),
    ]);

    // Transform data for response
    const clicksData = clicks.map((click) => ({
      id: click.id,
      sessionId: click.sessionId,
      landingPage: click.landingPage,
      createdAt: click.createdAt,
      converted: !!click.convertedAt,
      convertedAt: click.convertedAt,
      orderId: click.orderId,
    }));

    return res.status(200).json({
      clicks: clicksData,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (error) {
    console.error('Failed to fetch affiliate clicks:', error);
    return res.status(500).json({ error: 'Failed to fetch clicks' });
  }
}

export default withAffiliateAuth(handler);
