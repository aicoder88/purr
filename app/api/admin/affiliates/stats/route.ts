import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
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

    return Response.json({
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
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
