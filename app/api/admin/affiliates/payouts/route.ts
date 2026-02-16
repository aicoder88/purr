/**
 * Admin Affiliate Payouts API
 *
 * GET: Fetch list of payout requests with stats
 */

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { PayoutStatus } from '@/generated/client/client';
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
    const search = searchParams.get('search');

    // Build where clause for payouts
    interface PayoutWhereClause {
      status?: PayoutStatus;
      affiliate?: {
        OR: Array<{
          name?: { contains: string; mode: 'insensitive' };
          email?: { contains: string; mode: 'insensitive' };
          code?: { contains: string; mode: 'insensitive' };
        }>;
      };
    }

    const where: PayoutWhereClause = {};

    if (status && status !== '') {
      where.status = status as PayoutStatus;
    }

    if (search && search.trim() !== '') {
      where.affiliate = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { code: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    // Fetch payouts with affiliate info
    const payouts = await prisma.affiliatePayout.findMany({
      where,
      orderBy: [
        { status: 'asc' }, // PENDING first
        { requestedAt: 'desc' },
      ],
      include: {
        affiliate: {
          select: {
            id: true,
            name: true,
            email: true,
            code: true,
          },
        },
      },
    });

    // Transform for frontend
    const transformedPayouts = payouts.map((payout) => ({
      id: payout.id,
      affiliateId: payout.affiliateId,
      affiliateName: payout.affiliate.name,
      affiliateEmail: payout.affiliate.email,
      affiliateCode: payout.affiliate.code,
      amount: payout.amount,
      method: payout.method,
      payoutEmail: payout.payoutEmail,
      status: payout.status,
      requestedAt: payout.requestedAt.toISOString(),
      processedAt: payout.processedAt?.toISOString() || null,
      processedBy: payout.processedBy,
      transactionRef: payout.transactionRef,
      notes: payout.notes,
    }));

    // Calculate stats
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [pendingStats, processingStats, completedStats] = await Promise.all([
      prisma.affiliatePayout.aggregate({
        where: { status: 'PENDING' },
        _count: { id: true },
        _sum: { amount: true },
      }),
      prisma.affiliatePayout.aggregate({
        where: { status: 'PROCESSING' },
        _count: { id: true },
        _sum: { amount: true },
      }),
      prisma.affiliatePayout.aggregate({
        where: {
          status: 'COMPLETED',
          processedAt: { gte: startOfMonth },
        },
        _count: { id: true },
        _sum: { amount: true },
      }),
    ]);

    const stats = {
      pendingCount: pendingStats._count.id || 0,
      pendingAmount: pendingStats._sum.amount || 0,
      processingCount: processingStats._count.id || 0,
      processingAmount: processingStats._sum.amount || 0,
      completedThisMonth: completedStats._count.id || 0,
      completedAmountThisMonth: completedStats._sum.amount || 0,
    };

    return Response.json({
      payouts: transformedPayouts,
      stats,
    }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Failed to fetch payouts:', error);
    return Response.json({ error: 'Failed to fetch payouts' }, { status: 500, headers: rateLimitHeaders });
  }
}
