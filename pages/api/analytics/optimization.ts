import { NextApiRequest, NextApiResponse } from 'next';

// A/B Testing and Optimization API
interface OptimizationTest {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  variants: TestVariant[];
  metrics: TestMetric[];
  results?: TestResults;
  startDate: string;
  endDate?: string;
  confidence: number;
  significance: boolean;
}

interface TestVariant {
  id: string;
  name: string;
  description: string;
  allocation: number; // percentage of traffic
  changes: VariantChange[];
  performance: VariantPerformance;
}

interface VariantChange {
  element: string;
  property: string;
  value: string | number;
  description: string;
}

interface VariantPerformance {
  visitors: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  averageOrderValue: number;
}

interface TestMetric {
  name: string;
  type: 'conversion' | 'revenue' | 'engagement' | 'retention';
  goal: 'increase' | 'decrease';
  currentValue: number;
  targetValue: number;
}

interface TestResults {
  winner?: string;
  improvement: number;
  confidence: number;
  significant: boolean;
  recommendation: string;
  details: ResultDetail[];
}

interface ResultDetail {
  metric: string;
  control: number;
  variant: number;
  lift: number;
  pValue: number;
}

interface OptimizationRecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: 'conversion' | 'ux' | 'messaging' | 'targeting';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  roi: number;
  implementation: string[];
  metrics: string[];
}

interface CreateTestConfig {
  name?: string;
  description?: string;
  variants?: TestVariant[];
  metrics?: TestMetric[];
}

type OptimizationApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

type OptimizationApiError = {
  success: false;
  error: string;
};

type OptimizationApiResponse<T> = OptimizationApiSuccess<T> | OptimizationApiError;

type GtagEventParams = Record<string, string | number | boolean | undefined>;

type AnalyticsGlobal = typeof globalThis & {
  gtag?: (command: 'event', eventName: string, params?: GtagEventParams) => void;
};

// Mock A/B tests data
const getMockOptimizationTests = (): OptimizationTest[] => [
  {
    id: 'test_001',
    name: 'Referral Landing Page Headline',
    description: 'Testing emotional vs rational headlines on referral landing pages',
    status: 'running',
    startDate: '2025-01-20T00:00:00Z',
    confidence: 87.5,
    significance: false,
    variants: [
      {
        id: 'control',
        name: 'Control - Original',
        description: 'Your Friend Was Right - This Actually Works!',
        allocation: 50,
        changes: [],
        performance: {
          visitors: 1247,
          conversions: 89,
          conversionRate: 7.1,
          revenue: 2845.67,
          averageOrderValue: 31.98
        }
      },
      {
        id: 'variant_a',
        name: 'Emotional Appeal',
        description: 'Stop Being Embarrassed - Get Your FREE Trial!',
        allocation: 50,
        changes: [
          {
            element: 'h1',
            property: 'text',
            value: 'Stop Being Embarrassed - Get Your FREE Trial!',
            description: 'More direct emotional pain point'
          }
        ],
        performance: {
          visitors: 1198,
          conversions: 97,
          conversionRate: 8.1,
          revenue: 3127.45,
          averageOrderValue: 32.24
        }
      }
    ],
    metrics: [
      {
        name: 'Conversion Rate',
        type: 'conversion',
        goal: 'increase',
        currentValue: 7.1,
        targetValue: 8.5
      },
      {
        name: 'Revenue per Visitor',
        type: 'revenue',
        goal: 'increase',
        currentValue: 2.28,
        targetValue: 2.75
      }
    ]
  },
  {
    id: 'test_002',
    name: 'Social Share Button Copy',
    description: 'Testing different call-to-action text on social sharing buttons',
    status: 'completed',
    startDate: '2025-01-10T00:00:00Z',
    endDate: '2025-01-20T00:00:00Z',
    confidence: 95.2,
    significance: true,
    variants: [
      {
        id: 'control',
        name: 'Control - Share Now',
        description: 'Generic share button text',
        allocation: 50,
        changes: [],
        performance: {
          visitors: 892,
          conversions: 45,
          conversionRate: 5.0,
          revenue: 1456.78,
          averageOrderValue: 32.37
        }
      },
      {
        id: 'variant_a',
        name: 'Help a Friend',
        description: 'More personal sharing motivation',
        allocation: 50,
        changes: [
          {
            element: 'share-button',
            property: 'text',
            value: 'Help a Friend',
            description: 'Appeal to altruistic motivation'
          }
        ],
        performance: {
          visitors: 876,
          conversions: 67,
          conversionRate: 7.6,
          revenue: 2234.12,
          averageOrderValue: 33.34
        }
      }
    ],
    metrics: [
      {
        name: 'Share Click Rate',
        type: 'engagement',
        goal: 'increase',
        currentValue: 12.3,
        targetValue: 15.0
      }
    ],
    results: {
      winner: 'variant_a',
      improvement: 52.0,
      confidence: 95.2,
      significant: true,
      recommendation: 'Implement variant A immediately. The "Help a Friend" copy significantly outperforms generic sharing language.',
      details: [
        {
          metric: 'Conversion Rate',
          control: 5.0,
          variant: 7.6,
          lift: 52.0,
          pValue: 0.018
        },
        {
          metric: 'Revenue per Visitor',
          control: 1.63,
          variant: 2.55,
          lift: 56.4,
          pValue: 0.021
        }
      ]
    }
  }
];

// Mock optimization recommendations
const getMockOptimizationRecommendations = (): OptimizationRecommendation[] => [
  {
    id: 'rec_001',
    priority: 'high',
    category: 'conversion',
    title: 'Add Urgency Timer to Referral Landing Pages',
    description: 'Display a 24-hour countdown timer to create urgency and increase conversion rates',
    impact: 'high',
    effort: 'low',
    roi: 3.2,
    implementation: [
      'Add countdown timer component to landing page',
      'Test different time limits (12h, 24h, 48h)',
      'Track timer visibility vs conversion correlation'
    ],
    metrics: ['conversion_rate', 'time_on_page', 'bounce_rate']
  },
  {
    id: 'rec_002',
    priority: 'high',
    category: 'messaging',
    title: 'Personalize Social Share Templates by Platform',
    description: 'Customize message templates based on platform demographics and behavior patterns',
    impact: 'high',
    effort: 'medium',
    roi: 2.8,
    implementation: [
      'Analyze platform-specific conversion data',
      'Create platform-optimized message templates',
      'A/B test personalized vs generic messages'
    ],
    metrics: ['social_share_rate', 'click_through_rate', 'platform_conversion_rate']
  },
  {
    id: 'rec_003',
    priority: 'medium',
    category: 'ux',
    title: 'Implement Progressive Reward Disclosure',
    description: 'Reveal increasing rewards as users complete referral milestones to maintain engagement',
    impact: 'medium',
    effort: 'high',
    roi: 2.1,
    implementation: [
      'Design milestone progress visualization',
      'Create reward unlocking animations',
      'Track engagement with milestone system'
    ],
    metrics: ['referrer_retention', 'milestone_completion', 'lifetime_referrals']
  },
  {
    id: 'rec_004',
    priority: 'medium',
    category: 'targeting',
    title: 'Optimize Referral Code Format by Demographics',
    description: 'Test different referral code formats based on user demographics and preferences',
    impact: 'medium',
    effort: 'low',
    roi: 1.9,
    implementation: [
      'Analyze current code sharing patterns',
      'Test shorter vs longer code formats',
      'Implement memorable code generation algorithm'
    ],
    metrics: ['code_sharing_frequency', 'manual_typing_success', 'recall_rate']
  },
  {
    id: 'rec_005',
    priority: 'low',
    category: 'conversion',
    title: 'Add Social Proof Notifications',
    description: 'Display real-time notifications of successful referrals to increase credibility',
    impact: 'low',
    effort: 'medium',
    roi: 1.4,
    implementation: [
      'Create anonymous success notification system',
      'Implement notification timing optimization',
      'Test notification frequency limits'
    ],
    metrics: ['trust_indicators', 'conversion_rate', 'user_engagement']
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse<OptimizationApiResponse<unknown>>) {
  const actionParam = req.query.action;
  const action = Array.isArray(actionParam) ? actionParam[0] : actionParam;

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    switch (action) {
      case 'tests':
        if (req.method === 'GET') {
          const tests = getMockOptimizationTests();
          trackApiUsage(action, req.method);
          return res.status(200).json({
            success: true,
            data: tests
          });
        }
        break;

      case 'recommendations':
        if (req.method === 'GET') {
          const recommendations = getMockOptimizationRecommendations();
          trackApiUsage(action, req.method);
          return res.status(200).json({
            success: true,
            data: recommendations
          });
        }
        break;

      case 'create-test':
        if (req.method === 'POST') {
          const testConfig = req.body as CreateTestConfig;
          // In production, create and start A/B test
          const newTest = createNewTest(testConfig);
          trackApiUsage(action, req.method);
          return res.status(201).json({
            success: true,
            data: newTest,
            message: 'A/B test created and started successfully'
          });
        }
        break;

      case 'test-results':
        if (req.method === 'GET') {
          const { testId } = req.query;
          const normalizedTestId = Array.isArray(testId) ? testId[0] : testId;
          if (!normalizedTestId) {
            trackApiUsage(action, req.method);
            return res.status(400).json({ success: false, error: 'testId is required' });
          }
          const testResults = calculateTestResults(normalizedTestId);
          trackApiUsage(action, req.method);
          return res.status(200).json({
            success: true,
            data: testResults
          });
        }
        break;

      default:
        trackApiUsage(action, req.method);
        return res.status(400).json({ success: false, error: 'Invalid action specified' });
    }

    trackApiUsage(action, req.method);
    return res.status(405).json({ success: false, error: 'Unsupported method for action' });
  } catch (error) {
    console.error('Optimization API error:', error);
    trackApiUsage(action, req.method);
    return res.status(500).json({
      success: false,
      error: 'Failed to process optimization request'
    });
  }
}

// Helper function to create new A/B test
function createNewTest(config: CreateTestConfig): OptimizationTest {
  const testId = `test_${Date.now()}`;

  return {
    id: testId,
    name: config.name || 'New A/B Test',
    description: config.description || '',
    status: 'draft',
    startDate: new Date().toISOString(),
    confidence: 0,
    significance: false,
    variants: config.variants || [
      {
        id: 'control',
        name: 'Control',
        description: 'Original version',
        allocation: 50,
        changes: [],
        performance: {
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
          revenue: 0,
          averageOrderValue: 0
        }
      }
    ],
    metrics: config.metrics || []
  };
}

// Helper function to calculate test results
function calculateTestResults(testId: string): TestResults | null {
  const tests = getMockOptimizationTests();
  const test = tests.find(t => t.id === testId);

  if (!test || test.variants.length < 2) {
    return null;
  }

  const control = test.variants[0];
  const variant = test.variants[1];

  // Calculate statistical significance (simplified)
  const controlRate = control.performance.conversionRate / 100;
  const variantRate = variant.performance.conversionRate / 100;

  const pooledRate = (
    (control.performance.conversions + variant.performance.conversions) /
    (control.performance.visitors + variant.performance.visitors)
  );

  const visitorFactor = (1 / control.performance.visitors) + (1 / variant.performance.visitors);
  if (!Number.isFinite(visitorFactor) || visitorFactor === 0) {
    return null;
  }

  const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * visitorFactor);

  if (standardError === 0) {
    return null;
  }

  const zScore = Math.abs(variantRate - controlRate) / standardError;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
  const improvement = ((variantRate - controlRate) / controlRate) * 100;
  const confidence = (1 - pValue) * 100;

  return {
    winner: improvement > 0 ? 'variant' : 'control',
    improvement: Math.abs(improvement),
    confidence: Math.round(confidence * 10) / 10,
    significant: pValue < 0.05,
    recommendation: improvement > 0 && pValue < 0.05
      ? 'Implement the variant immediately - statistically significant improvement detected.'
      : 'Continue testing or try different approaches - no significant improvement detected.',
    details: [
      {
        metric: 'Conversion Rate',
        control: control.performance.conversionRate,
        variant: variant.performance.conversionRate,
        lift: improvement,
        pValue: pValue
      }
    ]
  };
}

// Normal CDF approximation for statistical calculations
function normalCDF(x: number): number {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

function erf(x: number): number {
  // Abramowitz and Stegun approximation
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

// Helper function for advanced segment analysis
export function analyzeReferralSegments(data: Array<{ conversionRate: number; socialShares: number; timeToConvert: number; averageOrderValue: number }>) {
  const segments = {
    highPerformers: data.filter(d => d.conversionRate > 10),
    socialSharers: data.filter(d => d.socialShares > 5),
    quickConverters: data.filter(d => d.timeToConvert < 1),
    highValue: data.filter(d => d.averageOrderValue > 40)
  };

  return {
    segments,
    insights: {
      highPerformerTraits: analyzeTraits(segments.highPerformers),
      optimalSharingChannels: findOptimalChannels(segments.socialSharers),
      conversionTriggers: identifyTriggers(segments.quickConverters),
      valueDrivers: findValueDrivers(segments.highValue)
    }
  };
}

// Placeholder functions for advanced analytics
function analyzeTraits(performers: Array<{ conversionRate: number }>): string[] {
  // Analyze high performer traits based on conversion rates
  const avgRate = performers.reduce((sum, p) => sum + p.conversionRate, 0) / performers.length;
  return avgRate > 15 ? ['High email engagement', 'Multiple social platforms', 'Tech-savvy demographic'] : ['Basic traits'];
}

function findOptimalChannels(sharers: Array<{ socialShares: number }>): string[] {
  // Identify optimal sharing channels based on share counts
  const avgShares = sharers.reduce((sum, s) => sum + s.socialShares, 0) / sharers.length;
  return avgShares > 8 ? ['WhatsApp', 'Email', 'Facebook'] : ['Email', 'Direct'];
}

function identifyTriggers(converters: Array<{ timeToConvert: number }>): string[] {
  // Find conversion triggers based on time patterns
  const avgTime = converters.reduce((sum, c) => sum + c.timeToConvert, 0) / converters.length;
  return avgTime < 0.5 ? ['Urgency timers', 'Friend recommendations', 'Free trial offers'] : ['Educational content'];
}

function findValueDrivers(highValue: Array<{ averageOrderValue: number }>): string[] {
  // Determine value drivers based on order values
  const avgValue = highValue.reduce((sum, h) => sum + h.averageOrderValue, 0) / highValue.length;
  return avgValue > 50 ? ['Bundle offerings', 'Premium positioning', 'Educational content'] : ['Value messaging'];
}

function trackApiUsage(action: string | undefined, method: string): void {
  const analyticsGlobal = globalThis as AnalyticsGlobal;
  analyticsGlobal.gtag?.('event', 'optimization_api_call', {
    event_category: 'analytics',
    event_label: action,
    custom_parameter_1: method
  });
}
