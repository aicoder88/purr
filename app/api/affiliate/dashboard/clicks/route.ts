import prisma from '@/lib/prisma';
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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Build date filter
    const dateFilter: { gte?: Date; lte?: Date } = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
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

    return Response.json({
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
    return Response.json({ error: 'Failed to fetch clicks' }, { status: 500 });
  }
}
