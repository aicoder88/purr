import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { withAffiliateAuth, AffiliateApiRequest } from '@/lib/affiliate/middleware';
import { clearPendingConversions } from '@/lib/affiliate/clearing';
import { getTierProgress, checkAndResetMonthlySales } from '@/lib/affiliate/tiers';

async function handler(req: AffiliateApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  const { affiliateId } = req.affiliate;

  try {
    // Lazy operations: clear pending conversions and check monthly reset
    await clearPendingConversions(affiliateId);
    await checkAndResetMonthlySales(affiliateId);

    // Get tier progress information
    const tierProgress = await getTierProgress(affiliateId);

    // Fetch affiliate data with stats
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: affiliateId },
      select: {
        id: true,
        code: true,
        name: true,
        totalClicks: true,
        totalConversions: true,
        totalEarnings: true,
        pendingEarnings: true,
        availableBalance: true,
        createdAt: true,
        tier: true,
        commissionRate: true,
        currentMonthSales: true,
        lastRewardMonth: true,
      },
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    // Calculate conversion rate
    const conversionRate =
      affiliate.totalClicks > 0
        ? (affiliate.totalConversions / affiliate.totalClicks) * 100
        : 0;

    // Get this month's stats
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const startOfLastMonth = new Date(startOfMonth);
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);

    // Clicks this month
    const clicksThisMonth = await prisma.affiliateClick.count({
      where: {
        affiliateId,
        createdAt: { gte: startOfMonth },
      },
    });

    // Clicks last month
    const clicksLastMonth = await prisma.affiliateClick.count({
      where: {
        affiliateId,
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfMonth,
        },
      },
    });

    // Conversions this month
    const conversionsThisMonth = await prisma.affiliateConversion.count({
      where: {
        affiliateId,
        purchasedAt: { gte: startOfMonth },
      },
    });

    // Conversions last month
    const conversionsLastMonth = await prisma.affiliateConversion.count({
      where: {
        affiliateId,
        purchasedAt: {
          gte: startOfLastMonth,
          lt: startOfMonth,
        },
      },
    });

    // Earnings this month
    const earningsThisMonth = await prisma.affiliateConversion.aggregate({
      where: {
        affiliateId,
        purchasedAt: { gte: startOfMonth },
        status: { in: ['PENDING', 'CLEARED', 'PAID'] },
      },
      _sum: { commissionAmount: true },
    });

    // Earnings last month
    const earningsLastMonth = await prisma.affiliateConversion.aggregate({
      where: {
        affiliateId,
        purchasedAt: {
          gte: startOfLastMonth,
          lt: startOfMonth,
        },
        status: { in: ['PENDING', 'CLEARED', 'PAID'] },
      },
      _sum: { commissionAmount: true },
    });

    // Recent conversions (last 10)
    const recentConversions = await prisma.affiliateConversion.findMany({
      where: { affiliateId },
      orderBy: { purchasedAt: 'desc' },
      take: 10,
      select: {
        id: true,
        orderId: true,
        orderSubtotal: true,
        commissionAmount: true,
        status: true,
        purchasedAt: true,
        clearedAt: true,
      },
    });

    // Check if eligible for monthly reward (3+ sales this month)
    const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    const hasReceivedRewardThisMonth = affiliate.lastRewardMonth === currentMonth;
    const eligibleForReward = affiliate.currentMonthSales >= 3 && !hasReceivedRewardThisMonth;

    return res.status(200).json({
      affiliate: {
        id: affiliate.id,
        code: affiliate.code,
        name: affiliate.name,
      },
      stats: {
        totalClicks: affiliate.totalClicks,
        totalConversions: affiliate.totalConversions,
        conversionRate: Math.round(conversionRate * 100) / 100,
        totalEarnings: affiliate.totalEarnings,
        pendingEarnings: affiliate.pendingEarnings,
        availableBalance: affiliate.availableBalance,
      },
      tier: {
        current: affiliate.tier,
        commissionRate: affiliate.commissionRate,
        ...tierProgress,
      },
      monthlyProgress: {
        currentMonthSales: affiliate.currentMonthSales,
        salesForReward: 3,
        eligibleForReward,
        rewardValue: 49,
      },
      thisMonth: {
        clicks: clicksThisMonth,
        conversions: conversionsThisMonth,
        earnings: earningsThisMonth._sum.commissionAmount || 0,
      },
      lastMonth: {
        clicks: clicksLastMonth,
        conversions: conversionsLastMonth,
        earnings: earningsLastMonth._sum.commissionAmount || 0,
      },
      trends: {
        clicksChange: clicksLastMonth > 0
          ? Math.round(((clicksThisMonth - clicksLastMonth) / clicksLastMonth) * 100)
          : clicksThisMonth > 0 ? 100 : 0,
        conversionsChange: conversionsLastMonth > 0
          ? Math.round(((conversionsThisMonth - conversionsLastMonth) / conversionsLastMonth) * 100)
          : conversionsThisMonth > 0 ? 100 : 0,
        earningsChange: (earningsLastMonth._sum.commissionAmount || 0) > 0
          ? Math.round((((earningsThisMonth._sum.commissionAmount || 0) - (earningsLastMonth._sum.commissionAmount || 0)) / (earningsLastMonth._sum.commissionAmount || 1)) * 100)
          : (earningsThisMonth._sum.commissionAmount || 0) > 0 ? 100 : 0,
      },
      recentConversions,
      memberSince: affiliate.createdAt,
    });
  } catch (error) {
    console.error('Failed to fetch affiliate stats:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}

export default withAffiliateAuth(handler);
