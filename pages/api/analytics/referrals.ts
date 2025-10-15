import { NextApiRequest, NextApiResponse } from 'next';

type GtagFunction = (command: 'event' | 'config', action: string, params?: Record<string, unknown>) => void;

const getGtag = (): GtagFunction | undefined => {
  if (typeof global === 'undefined') {
    return undefined;
  }
  const maybeGtag = (global as typeof globalThis & { gtag?: unknown }).gtag;
  return typeof maybeGtag === 'function' ? (maybeGtag as GtagFunction) : undefined;
};

// Analytics data interfaces
interface ReferralAnalytics {
  overview: OverviewMetrics;
  performance: PerformanceMetrics;
  trends: TrendData[];
  topPerformers: TopPerformer[];
  conversionFunnel: FunnelData[];
  socialChannels: SocialChannelData[];
  cohortAnalysis: CohortData[];
  revenueImpact: RevenueData;
}

interface OverviewMetrics {
  totalReferrals: number;
  activeReferrers: number;
  conversionRate: number;
  averageOrderValue: number;
  totalRevenueGenerated: number;
  viralCoefficient: number;
  costPerAcquisition: number;
  customerLifetimeValue: number;
}

interface PerformanceMetrics {
  clickThroughRate: number;
  signupConversionRate: number;
  purchaseConversionRate: number;
  timeToConversion: number;
  referralQuality: number;
  churnRate: number;
  monthlyGrowthRate: number;
  seasonalTrends: SeasonalTrend[];
}

interface TrendData {
  date: string;
  referrals: number;
  conversions: number;
  revenue: number;
  newReferrers: number;
}

interface TopPerformer {
  referrerCode: string;
  referrerName: string;
  totalReferrals: number;
  successfulConversions: number;
  revenueGenerated: number;
  conversionRate: number;
  averageTimeToConvert: number;
}

interface FunnelData {
  stage: string;
  count: number;
  conversionRate: number;
  dropoffRate: number;
}

interface SocialChannelData {
  platform: string;
  shares: number;
  clicks: number;
  conversions: number;
  conversionRate: number;
  revenuePerShare: number;
}

interface CohortData {
  cohortMonth: string;
  referrersAcquired: number;
  month1Retention: number;
  month3Retention: number;
  month6Retention: number;
  lifetimeValue: number;
}

interface RevenueData {
  totalRevenueFromReferrals: number;
  revenueGrowthRate: number;
  averageOrderValueTrend: number[];
  revenueBySource: { source: string; revenue: number }[];
  profitMarginImpact: number;
}

interface SeasonalTrend {
  month: string;
  performanceIndex: number;
  bestPerformingDays: string[];
}

// Mock analytics data - replace with database queries
const getMockAnalytics = (): ReferralAnalytics => {
  const currentDate = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      referrals: Math.floor(Math.random() * 25) + 10,
      conversions: Math.floor(Math.random() * 15) + 5,
      revenue: (Math.random() * 500) + 200,
      newReferrers: Math.floor(Math.random() * 8) + 2
    };
  });

  return {
    overview: {
      totalReferrals: 1247,
      activeReferrers: 89,
      conversionRate: 23.7,
      averageOrderValue: 31.45,
      totalRevenueGenerated: 18650.00,
      viralCoefficient: 1.34,
      costPerAcquisition: 12.85,
      customerLifetimeValue: 127.50
    },
    performance: {
      clickThroughRate: 12.3,
      signupConversionRate: 8.7,
      purchaseConversionRate: 23.1,
      timeToConversion: 2.8, // days
      referralQuality: 87.5,
      churnRate: 4.2,
      monthlyGrowthRate: 18.5,
      seasonalTrends: [
        { month: 'January', performanceIndex: 95, bestPerformingDays: ['Saturday', 'Sunday'] },
        { month: 'February', performanceIndex: 103, bestPerformingDays: ['Friday', 'Saturday'] },
        { month: 'March', performanceIndex: 112, bestPerformingDays: ['Thursday', 'Friday'] }
      ]
    },
    trends: last30Days,
    topPerformers: [
      {
        referrerCode: 'SARAH15-CAT',
        referrerName: 'Sarah M.',
        totalReferrals: 47,
        successfulConversions: 23,
        revenueGenerated: 1285.50,
        conversionRate: 48.9,
        averageTimeToConvert: 1.2
      },
      {
        referrerCode: 'MIKE42-CAT',
        referrerName: 'Michael R.',
        totalReferrals: 38,
        successfulConversions: 19,
        revenueGenerated: 967.25,
        conversionRate: 50.0,
        averageTimeToConvert: 2.1
      },
      {
        referrerCode: 'JENNY88-CAT',
        referrerName: 'Jennifer L.',
        totalReferrals: 34,
        successfulConversions: 16,
        revenueGenerated: 834.75,
        conversionRate: 47.1,
        averageTimeToConvert: 1.8
      }
    ],
    conversionFunnel: (() => {
      const stages = [
        { stage: 'Link Clicked', count: 2847, conversionRate: 100.0 },
        { stage: 'Landing Page Viewed', count: 2405, conversionRate: 84.5 },
        { stage: 'Trial Added to Cart', count: 1624, conversionRate: 57.0 },
        { stage: 'Checkout Started', count: 1247, conversionRate: 43.8 },
        { stage: 'Purchase Completed', count: 967, conversionRate: 34.0 }
      ];
      return stages.map((stage, index): FunnelData => ({
        ...stage,
        dropoffRate: index > 0 ? ((stages[index - 1].count - stage.count) / stages[index - 1].count) * 100 : 0
      }));
    })(),
    socialChannels: [
      { platform: 'WhatsApp', shares: 245, clicks: 1247, conversions: 89, conversionRate: 7.1, revenuePerShare: 22.85 },
      { platform: 'Email', shares: 189, clicks: 894, conversions: 67, conversionRate: 7.5, revenuePerShare: 18.45 },
      { platform: 'Facebook', shares: 156, clicks: 723, conversions: 52, conversionRate: 7.2, revenuePerShare: 16.75 },
      { platform: 'SMS', shares: 134, clicks: 567, conversions: 41, conversionRate: 7.2, revenuePerShare: 15.25 },
      { platform: 'Twitter', shares: 78, clicks: 312, conversions: 23, conversionRate: 7.4, revenuePerShare: 12.80 },
      { platform: 'LinkedIn', shares: 45, clicks: 189, conversions: 14, conversionRate: 7.4, revenuePerShare: 11.65 }
    ],
    cohortAnalysis: [
      { cohortMonth: '2024-10', referrersAcquired: 23, month1Retention: 87.0, month3Retention: 74.0, month6Retention: 65.2, lifetimeValue: 156.75 },
      { cohortMonth: '2024-11', referrersAcquired: 31, month1Retention: 83.9, month3Retention: 71.0, month6Retention: 0, lifetimeValue: 142.50 },
      { cohortMonth: '2024-12', referrersAcquired: 42, month1Retention: 85.7, month3Retention: 0, month6Retention: 0, lifetimeValue: 134.25 },
      { cohortMonth: '2025-01', referrersAcquired: 38, month1Retention: 89.5, month3Retention: 0, month6Retention: 0, lifetimeValue: 127.80 }
    ],
    revenueImpact: {
      totalRevenueFromReferrals: 18650.00,
      revenueGrowthRate: 23.4,
      averageOrderValueTrend: [28.50, 29.75, 31.20, 31.45, 32.10],
      revenueBySource: [
        { source: 'Direct Referral Links', revenue: 12450.00 },
        { source: 'Social Media Shares', revenue: 4250.00 },
        { source: 'QR Code Scans', revenue: 1950.00 }
      ],
      profitMarginImpact: 15.7
    }
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { timeframe = '30d', metric } = req.query;

  try {
    // In production, this would query database with filters
    const analyticsData = getMockAnalytics();

    // Apply timeframe filtering if specified
    if (timeframe && timeframe !== '30d') {
      // Filter data based on timeframe (7d, 30d, 90d, 1y)
      const days = timeframe === '7d' ? 7 : timeframe === '90d' ? 90 : timeframe === '1y' ? 365 : 30;
      analyticsData.trends = analyticsData.trends.slice(-days);
    }

    // Return specific metric if requested
    if (metric && typeof metric === 'string') {
      const metricValue = getMetricValue(analyticsData, metric);
      if (metricValue !== null) {
        return res.status(200).json({ metric, value: metricValue, timeframe });
      }
    }

    // Track analytics dashboard access
    const gtag = getGtag();
    if (gtag) {
      gtag('event', 'referral_analytics_view', {
        event_category: 'analytics',
        event_label: 'dashboard_access',
        custom_parameter_1: timeframe
      });
    }

    res.status(200).json({
      success: true,
      data: analyticsData,
      timeframe,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching referral analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics data'
    });
  }
}

// Helper function to extract specific metrics
function getMetricValue(data: ReferralAnalytics, metric: string): number | null {
  const metricMap: Record<string, number> = {
    'total_referrals': data.overview.totalReferrals,
    'conversion_rate': data.overview.conversionRate,
    'revenue': data.overview.totalRevenueGenerated,
    'viral_coefficient': data.overview.viralCoefficient,
    'active_referrers': data.overview.activeReferrers,
    'aov': data.overview.averageOrderValue,
    'cpa': data.overview.costPerAcquisition,
    'clv': data.overview.customerLifetimeValue
  };

  return metricMap[metric] || null;
}

// Helper function for A/B testing insights
export function calculateTestSignificance(
  controlConversions: number,
  controlTotal: number,
  testConversions: number,
  testTotal: number
): { significant: boolean; confidenceLevel: number; improvement: number } {
  const controlRate = controlConversions / controlTotal;
  const testRate = testConversions / testTotal;
  const improvement = ((testRate - controlRate) / controlRate) * 100;

  // Simplified significance test - in production use proper statistical testing
  const pooledRate = (controlConversions + testConversions) / (controlTotal + testTotal);
  const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * (1/controlTotal + 1/testTotal));
  const zScore = Math.abs(testRate - controlRate) / standardError;
  const confidenceLevel = (1 - 2 * (1 - normalCDF(Math.abs(zScore)))) * 100;

  return {
    significant: confidenceLevel > 95,
    confidenceLevel: Math.round(confidenceLevel * 10) / 10,
    improvement: Math.round(improvement * 10) / 10
  };
}

// Normal cumulative distribution function approximation
function normalCDF(x: number): number {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

// Error function approximation
function erf(x: number): number {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}
