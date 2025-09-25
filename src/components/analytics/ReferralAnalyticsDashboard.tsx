import { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Share2,
  Clock,
  Award,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Activity,
  Calendar,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface AnalyticsData {
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

interface ReferralAnalyticsDashboardProps {
  className?: string;
}

export function ReferralAnalyticsDashboard({ className }: ReferralAnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<string>('30d');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch analytics data
  const fetchAnalytics = useCallback(async (selectedTimeframe?: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics/referrals?timeframe=${selectedTimeframe || timeframe}`);
      const result = await response.json();

      if (result.success) {
        setAnalyticsData(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  // Initial data load
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Handle timeframe change
  const handleTimeframeChange = useCallback((newTimeframe: string) => {
    setTimeframe(newTimeframe);
    fetchAnalytics(newTimeframe);
  }, [fetchAnalytics]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAnalytics();
    setRefreshing(false);
  }, [fetchAnalytics]);

  // Export data
  const handleExport = useCallback(() => {
    if (!analyticsData) return;

    const csvContent = generateCSVExport(analyticsData);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `referral-analytics-${timeframe}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [analyticsData, timeframe]);

  if (loading || !analyticsData) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="flex items-center justify-center p-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400 dark:text-gray-600" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Referral Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track performance, optimize conversion rates, and maximize referral ROI
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Timeframe Selector */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {['7d', '30d', '90d', '1y'].map((period) => (
              <Button
                key={period}
                onClick={() => handleTimeframeChange(period)}
                variant={timeframe === period ? 'default' : 'ghost'}
                size="sm"
                className="text-xs"
              >
                {period}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <Button onClick={handleRefresh} variant="outline" size="sm" disabled={refreshing}>
            <RefreshCw className={cn("w-4 h-4 mr-2", refreshing && "animate-spin")} />
            Refresh
          </Button>

          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'funnel', label: 'Conversion Funnel', icon: Target },
            { id: 'social', label: 'Social Channels', icon: Share2 },
            { id: 'cohorts', label: 'Cohorts', icon: Users },
            { id: 'revenue', label: 'Revenue Impact', icon: DollarSign }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center py-2 px-1 border-b-2 font-medium text-sm",
                activeTab === tab.id
                  ? "border-orange-500 text-orange-600 dark:text-orange-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              )}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <OverviewTab data={analyticsData.overview} trends={analyticsData.trends} topPerformers={analyticsData.topPerformers} />
      )}

      {activeTab === 'performance' && (
        <PerformanceTab data={analyticsData.performance} trends={analyticsData.trends} />
      )}

      {activeTab === 'funnel' && (
        <FunnelTab data={analyticsData.conversionFunnel} />
      )}

      {activeTab === 'social' && (
        <SocialTab data={analyticsData.socialChannels} />
      )}

      {activeTab === 'cohorts' && (
        <CohortsTab data={analyticsData.cohortAnalysis} />
      )}

      {activeTab === 'revenue' && (
        <RevenueTab data={analyticsData.revenueImpact} trends={analyticsData.trends} />
      )}
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ data, trends, topPerformers }: { data: OverviewMetrics; trends: TrendData[]; topPerformers: TopPerformer[] }) {
  const kpiCards = [
    {
      title: 'Total Referrals',
      value: data.totalReferrals.toLocaleString(),
      change: '+12.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      change: '+2.1%',
      trend: 'up' as const,
      icon: Target,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Revenue Generated',
      value: `$${data.totalRevenueGenerated.toLocaleString()}`,
      change: '+18.7%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Viral Coefficient',
      value: data.viralCoefficient.toString(),
      change: '+0.15',
      trend: 'up' as const,
      icon: Activity,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Avg Order Value',
      value: `$${data.averageOrderValue}`,
      change: '+5.2%',
      trend: 'up' as const,
      icon: BarChart3,
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      title: 'Customer LTV',
      value: `$${data.customerLifetimeValue}`,
      change: '+8.9%',
      trend: 'up' as const,
      icon: Award,
      color: 'text-indigo-600 dark:text-indigo-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {kpi.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {kpi.value}
                </p>
                <div className="flex items-center mt-2">
                  {kpi.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-green-500 dark:text-green-400" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500 dark:text-red-400" />
                  )}
                  <span className={cn(
                    "ml-1 text-sm font-medium",
                    kpi.trend === 'up' ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {kpi.change}
                  </span>
                </div>
              </div>
              <div className={cn("p-3 bg-gray-100 dark:bg-gray-800 rounded-full", kpi.color)}>
                <kpi.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Trends Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Performance Trends
        </h3>
        <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Interactive chart would render here (Chart.js/Recharts)
          </p>
        </div>
      </Card>

      {/* Top Performers */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Top Performing Referrers
        </h3>
        <div className="space-y-4">
          {topPerformers.map((performer, index) => (
            <div key={performer.referrerCode} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {performer.referrerName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {performer.referrerCode}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-gray-100">
                  {performer.successfulConversions} conversions
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  ${performer.revenueGenerated.toLocaleString()} revenue
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Performance Tab Component
function PerformanceTab({ data, trends }: { data: PerformanceMetrics; trends: TrendData[] }) {
  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Click Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.clickThroughRate}%</p>
              <Badge variant="outline" className="mt-2">
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                Excellent
              </Badge>
            </div>
            <Activity className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time to Convert</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.timeToConversion}d</p>
              <Badge variant="outline" className="mt-2">
                <Clock className="w-3 h-3 mr-1 text-orange-500" />
                Fast
              </Badge>
            </div>
            <Clock className="w-8 h-8 text-orange-500 dark:text-orange-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quality Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.referralQuality}%</p>
              <Badge variant="outline" className="mt-2">
                <Award className="w-3 h-3 mr-1 text-purple-500" />
                High Quality
              </Badge>
            </div>
            <Award className="w-8 h-8 text-purple-500 dark:text-purple-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">+{data.monthlyGrowthRate}%</p>
              <Badge variant="outline" className="mt-2">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                Growing
              </Badge>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500 dark:text-green-400" />
          </div>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Conversion Performance Over Time
        </h3>
        <div className="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Performance trend chart would render here
          </p>
        </div>
      </Card>
    </div>
  );
}

// Additional tab components would go here...
function FunnelTab({ data }: { data: FunnelData[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Conversion Funnel Analysis
      </h3>
      <div className="space-y-4">
        {data.map((stage, index) => (
          <div key={stage.stage} className="relative">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{stage.stage}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stage.count.toLocaleString()} users • {stage.conversionRate}% conversion
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stage.conversionRate}%
                </p>
                {index > 0 && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    -{stage.dropoffRate.toFixed(1)}% dropoff
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Simplified placeholder components for other tabs
function SocialTab({ data }: { data: SocialChannelData[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Social Channel Performance
      </h3>
      <div className="space-y-4">
        {data.map((channel) => (
          <div key={channel.platform} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{channel.platform}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {channel.shares} shares • {channel.clicks} clicks
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900 dark:text-gray-100">{channel.conversionRate}%</p>
              <p className="text-sm text-green-600 dark:text-green-400">
                ${channel.revenuePerShare.toFixed(2)}/share
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CohortsTab({ data }: { data: CohortData[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Cohort Analysis
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100">Cohort</th>
              <th className="text-right py-3 px-4 text-gray-900 dark:text-gray-100">Acquired</th>
              <th className="text-right py-3 px-4 text-gray-900 dark:text-gray-100">Month 1</th>
              <th className="text-right py-3 px-4 text-gray-900 dark:text-gray-100">Month 3</th>
              <th className="text-right py-3 px-4 text-gray-900 dark:text-gray-100">Month 6</th>
              <th className="text-right py-3 px-4 text-gray-900 dark:text-gray-100">LTV</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cohort) => (
              <tr key={cohort.cohortMonth} className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{cohort.cohortMonth}</td>
                <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">{cohort.referrersAcquired}</td>
                <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">{cohort.month1Retention}%</td>
                <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">
                  {cohort.month3Retention > 0 ? `${cohort.month3Retention}%` : '-'}
                </td>
                <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">
                  {cohort.month6Retention > 0 ? `${cohort.month6Retention}%` : '-'}
                </td>
                <td className="py-3 px-4 text-right font-medium text-green-600 dark:text-green-400">
                  ${cohort.lifetimeValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function RevenueTab({ data, trends }: { data: RevenueData; trends: TrendData[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</h4>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            ${data.totalRevenueFromReferrals.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            +{data.revenueGrowthRate}% growth
          </p>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Profit Impact</h4>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            +{data.profitMarginImpact}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Margin improvement
          </p>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">AOV Trend</h4>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            ${data.averageOrderValueTrend[data.averageOrderValueTrend.length - 1]}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            Trending up
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Revenue by Source
        </h3>
        <div className="space-y-4">
          {data.revenueBySource.map((source) => (
            <div key={source.source} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium text-gray-900 dark:text-gray-100">{source.source}</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                ${source.revenue.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Helper function to generate CSV export
function generateCSVExport(data: AnalyticsData): string {
  const headers = ['Metric', 'Value', 'Category'];
  const rows = [
    ['Total Referrals', data.overview.totalReferrals.toString(), 'Overview'],
    ['Conversion Rate', `${data.overview.conversionRate}%`, 'Overview'],
    ['Total Revenue', `$${data.overview.totalRevenueGenerated}`, 'Overview'],
    ['Viral Coefficient', data.overview.viralCoefficient.toString(), 'Overview'],
    ...data.topPerformers.map(p => [p.referrerName, p.successfulConversions.toString(), 'Top Performers']),
    ...data.socialChannels.map(c => [c.platform, `${c.conversionRate}%`, 'Social Channels'])
  ];

  return [headers, ...rows].map(row => row.join(',')).join('\n');
}