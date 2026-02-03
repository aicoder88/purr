import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { clearPendingConversions } from '@/lib/affiliate/clearing';

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

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    // First, clear any pending conversions that are past hold period
    await clearPendingConversions(affiliateId);

    // Fetch fresh affiliate balance data
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: affiliateId },
      select: {
        pendingEarnings: true,
        availableBalance: true,
        totalEarnings: true,
        payoutMethod: true,
        payoutEmail: true,
      },
    });

    if (!affiliate) {
      return Response.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    // Fetch payouts with pagination
    const [payouts, totalCount] = await Promise.all([
      prisma.affiliatePayout.findMany({
        where: { affiliateId },
        orderBy: { requestedAt: 'desc' },
        skip,
        take: limitNum,
        select: {
          id: true,
          amount: true,
          status: true,
          method: true,
          requestedAt: true,
          processedAt: true,
          transactionRef: true,
        },
      }),
      prisma.affiliatePayout.count({ where: { affiliateId } }),
    ]);

    // Calculate total paid out
    const totalPaidOut = await prisma.affiliatePayout.aggregate({
      where: {
        affiliateId,
        status: 'COMPLETED',
      },
      _sum: { amount: true },
    });

    // Get pending payout requests
    const pendingPayoutRequest = await prisma.affiliatePayout.findFirst({
      where: {
        affiliateId,
        status: 'PENDING',
      },
    });

    return Response.json({
      balance: {
        pendingEarnings: affiliate.pendingEarnings,
        availableBalance: affiliate.availableBalance,
        totalEarnings: affiliate.totalEarnings,
        totalPaidOut: totalPaidOut._sum.amount || 0,
        minimumPayout: 50, // $50 minimum
        canRequestPayout: affiliate.availableBalance >= 50 && !pendingPayoutRequest,
      },
      paymentSettings: {
        method: affiliate.payoutMethod,
        email: affiliate.payoutEmail,
      },
      hasPendingRequest: !!pendingPayoutRequest,
      pendingRequestAmount: pendingPayoutRequest?.amount || 0,
      payouts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (error) {
    console.error('Failed to fetch affiliate payouts:', error);
    return Response.json({ error: 'Failed to fetch payouts' }, { status: 500 });
  }
}
