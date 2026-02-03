import prisma from '@/lib/prisma';
import { auth } from '@/auth';

interface DailyData {
  date: string;
  clicks: number;
  conversions: number;
  earnings: number;
}

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
    const days = searchParams.get('days') || '30';

    const daysNum = Math.min(90, Math.max(7, parseInt(days, 10)));

    // Calculate date range
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);
    startDate.setHours(0, 0, 0, 0);

    // Fetch clicks grouped by date
    const clicks = await prisma.affiliateClick.groupBy({
      by: ['createdAt'],
      where: {
        affiliateId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: true,
    });

    // Fetch conversions grouped by date
    const conversions = await prisma.affiliateConversion.groupBy({
      by: ['purchasedAt'],
      where: {
        affiliateId,
        purchasedAt: {
          gte: startDate,
          lte: endDate,
        },
        status: { in: ['PENDING', 'CLEARED', 'PAID'] },
      },
      _count: true,
      _sum: {
        commissionAmount: true,
      },
    });

    // Create a map of dates to data
    const dataMap = new Map<string, DailyData>();

    // Initialize all dates in range
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      dataMap.set(dateStr, {
        date: dateStr,
        clicks: 0,
        conversions: 0,
        earnings: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Populate clicks
    for (const click of clicks) {
      const dateStr = new Date(click.createdAt).toISOString().split('T')[0];
      const existing = dataMap.get(dateStr);
      if (existing) {
        existing.clicks += click._count;
      }
    }

    // Populate conversions and earnings
    for (const conv of conversions) {
      const dateStr = new Date(conv.purchasedAt).toISOString().split('T')[0];
      const existing = dataMap.get(dateStr);
      if (existing) {
        existing.conversions += conv._count;
        existing.earnings += conv._sum.commissionAmount || 0;
      }
    }

    // Convert map to sorted array
    const chartData = Array.from(dataMap.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Calculate totals for the period
    const totals = chartData.reduce(
      (acc, day) => {
        acc.clicks += day.clicks;
        acc.conversions += day.conversions;
        acc.earnings += day.earnings;
        return acc;
      },
      { clicks: 0, conversions: 0, earnings: 0 }
    );

    return Response.json({
      chartData,
      totals,
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        days: daysNum,
      },
    });
  } catch (error) {
    console.error('Failed to fetch chart data:', error);
    return Response.json({ error: 'Failed to fetch chart data' }, { status: 500 });
  }
}
