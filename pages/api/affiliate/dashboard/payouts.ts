import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { withAffiliateAuth, AffiliateApiRequest } from '@/lib/affiliate/middleware';
import { clearPendingConversions } from '@/lib/affiliate/clearing';

async function handler(req: AffiliateApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  const { affiliateId } = req.affiliate;
  const { page = '1', limit = '20' } = req.query;

  const pageNum = Math.max(1, parseInt(page as string, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
  const skip = (pageNum - 1) * limitNum;

  try {
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
      return res.status(404).json({ error: 'Affiliate not found' });
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

    return res.status(200).json({
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
    return res.status(500).json({ error: 'Failed to fetch payouts' });
  }
}

export default withAffiliateAuth(handler);
