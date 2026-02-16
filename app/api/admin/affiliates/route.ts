import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { AffiliateStatus } from '@/generated/client/client';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

export async function GET(req: Request) {
  // Apply rate limiting (generous: 100 req/min for reads)
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'generous');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: {
      status?: AffiliateStatus;
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' };
        email?: { contains: string; mode: 'insensitive' };
        code?: { contains: string; mode: 'insensitive' };
      }>;
    } = {};

    if (status && status !== 'ALL') {
      where.status = status as AffiliateStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy
    const validSortFields = [
      'createdAt',
      'name',
      'totalClicks',
      'totalConversions',
      'totalEarnings',
      'lastLoginAt',
    ];
    const sortField = validSortFields.includes(sortBy)
      ? sortBy
      : 'createdAt';
    const order = sortOrder === 'asc' ? 'asc' : 'desc';

    // Fetch affiliates with pagination
    const [affiliates, total] = await Promise.all([
      prisma.affiliate.findMany({
        where,
        orderBy: { [sortField]: order },
        skip,
        take: limitNum,
        select: {
          id: true,
          code: true,
          name: true,
          email: true,
          website: true,
          status: true,
          totalClicks: true,
          totalConversions: true,
          totalEarnings: true,
          pendingEarnings: true,
          availableBalance: true,
          payoutMethod: true,
          payoutEmail: true,
          lastLoginAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.affiliate.count({ where }),
    ]);

    return Response.json({
      affiliates,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Failed to fetch affiliates:', error);
    return Response.json({ error: 'Failed to fetch affiliates' }, { status: 500, headers: rateLimitHeaders });
  }
}
