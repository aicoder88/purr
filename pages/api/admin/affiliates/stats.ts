import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  try {
    // Fetch all stats in parallel
    const [
      totalAffiliates,
      activeAffiliates,
      pendingApplications,
      affiliateStats,
      payoutStats,
    ] = await Promise.all([
      // Total affiliates
      prisma.affiliate.count(),
      // Active affiliates
      prisma.affiliate.count({ where: { status: 'ACTIVE' } }),
      // Pending applications
      prisma.affiliateApplication.count({ where: { status: 'PENDING' } }),
      // Aggregate affiliate stats
      prisma.affiliate.aggregate({
        _sum: {
          totalEarnings: true,
          pendingEarnings: true,
          availableBalance: true,
        },
        _avg: {
          totalClicks: true,
          totalConversions: true,
        },
      }),
      // Completed payouts
      prisma.affiliatePayout.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

    // Calculate conversion rate
    const totalClicksSum = await prisma.affiliate.aggregate({
      _sum: { totalClicks: true, totalConversions: true },
    });

    const totalClicks = totalClicksSum._sum.totalClicks || 0;
    const totalConversions = totalClicksSum._sum.totalConversions || 0;
    const averageConversionRate =
      totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    // Calculate total revenue from conversions
    const revenueStats = await prisma.affiliateConversion.aggregate({
      _sum: { orderSubtotal: true },
    });

    return res.status(200).json({
      totalAffiliates,
      activeAffiliates,
      pendingApplications,
      totalRevenue: revenueStats._sum.orderSubtotal || 0,
      totalCommissionsPaid: payoutStats._sum.amount || 0,
      pendingCommissions:
        (affiliateStats._sum.pendingEarnings || 0) +
        (affiliateStats._sum.availableBalance || 0),
      averageConversionRate,
    });
  } catch (error) {
    console.error('Failed to fetch affiliate stats:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
