/**
 * Admin Affiliate Detail API
 *
 * GET: Fetch affiliate details with conversions and payouts
 */

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    // Fetch affiliate with related data
    const affiliate = await prisma.affiliate.findUnique({
      where: { id },
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
    });

    if (!affiliate) {
      return Response.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    // Fetch recent conversions (last 20)
    const conversions = await prisma.affiliateConversion.findMany({
      where: { affiliateId: id },
      orderBy: { purchasedAt: 'desc' },
      take: 20,
      select: {
        id: true,
        orderId: true,
        orderSubtotal: true,
        commissionAmount: true,
        status: true,
        purchasedAt: true,
      },
    });

    // Fetch payout history (last 20)
    const payouts = await prisma.affiliatePayout.findMany({
      where: { affiliateId: id },
      orderBy: { requestedAt: 'desc' },
      take: 20,
      select: {
        id: true,
        amount: true,
        method: true,
        status: true,
        requestedAt: true,
        processedAt: true,
        transactionRef: true,
      },
    });

    // Transform dates to ISO strings
    const transformedAffiliate = {
      ...affiliate,
      lastLoginAt: affiliate.lastLoginAt?.toISOString() || null,
      createdAt: affiliate.createdAt.toISOString(),
      updatedAt: affiliate.updatedAt.toISOString(),
    };

    const transformedConversions = conversions.map((c) => ({
      ...c,
      purchasedAt: c.purchasedAt.toISOString(),
    }));

    const transformedPayouts = payouts.map((p) => ({
      ...p,
      requestedAt: p.requestedAt.toISOString(),
      processedAt: p.processedAt?.toISOString() || null,
    }));

    return Response.json({
      affiliate: transformedAffiliate,
      conversions: transformedConversions,
      payouts: transformedPayouts,
    }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Failed to fetch affiliate:', error);
    return Response.json({ error: 'Failed to fetch affiliate' }, { status: 500, headers: rateLimitHeaders });
  }
}
