import { requireAuth } from '@/lib/auth/session';
import { getReferralAnalyticsData } from '@/lib/referral-program';

export async function GET(req: Request): Promise<Response> {
  const { authorized } = await requireAuth();
  if (!authorized) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get('timeframe') || '30d';
  const metric = searchParams.get('metric');

  try {
    const analyticsData = await getReferralAnalyticsData(timeframe);

    if (metric) {
      const metricValue = getMetricValue(analyticsData, metric);
      if (metricValue !== null) {
        return Response.json({
          success: true,
          metric,
          value: metricValue,
          timeframe,
        });
      }
    }

    return Response.json({
      success: true,
      data: analyticsData,
      timeframe,
      generatedAt: new Date().toISOString(),
    });
  } catch {
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch analytics data',
      },
      { status: 500 }
    );
  }
}

function getMetricValue(
  data: Awaited<ReturnType<typeof getReferralAnalyticsData>>,
  metric: string
): number | null {
  const metricMap: Record<string, number> = {
    total_referrals: data.overview.totalReferrals,
    conversion_rate: data.overview.conversionRate,
    revenue: data.overview.totalRevenueGenerated,
    viral_coefficient: data.overview.viralCoefficient,
    active_referrers: data.overview.activeReferrers,
    aov: data.overview.averageOrderValue,
    cpa: data.overview.costPerAcquisition,
    clv: data.overview.customerLifetimeValue,
  };

  return metricMap[metric] ?? null;
}
