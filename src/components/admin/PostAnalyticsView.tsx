import { useState, useEffect } from 'react';
import { Eye, Users, Clock, TrendingUp, ExternalLink, Download } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import type { PostAnalytics } from '@/lib/blog/analytics-service';

interface PostAnalyticsViewProps {
  slug: string;
}

export default function PostAnalyticsView({ slug }: PostAnalyticsViewProps) {
  const [analytics, setAnalytics] = useState<PostAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    loadAnalytics();
  }, [slug, dateRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/blog/analytics/${slug}?range=${dateRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="md" text="Loading analytics..." />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No analytics data available</p>
      </div>
    );
  }

  const totalTraffic = Object.values(analytics.sources).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Post Analytics</h3>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Eye className="w-5 h-5" />}
          label="Views"
          value={formatNumber(analytics.views)}
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Visitors"
          value={formatNumber(analytics.uniqueVisitors)}
        />
        <MetricCard
          icon={<Clock className="w-5 h-5" />}
          label="Avg Time"
          value={formatTime(analytics.avgTimeOnPage)}
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Bounce Rate"
          value={`${analytics.bounceRate.toFixed(1)}%`}
        />
      </div>

      {/* Traffic Sources */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Traffic Sources</h4>
        <div className="space-y-2">
          {Object.entries(analytics.sources).map(([source, count]) => (
            <div key={source} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{source}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(count / totalTraffic) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-12 text-right">
                  {count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Keywords */}
      {analytics.topKeywords.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Top Keywords</h4>
          <div className="space-y-2">
            {analytics.topKeywords.map((kw) => (
              <div key={kw.keyword} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{kw.keyword}</span>
                <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                  <span>{kw.impressions} impressions</span>
                  <span>{kw.clicks} clicks</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {((kw.clicks / kw.impressions) * 100).toFixed(1)}% CTR
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversion Rate */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100">Conversion Rate</h4>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-0.5">
              Visitors who took action after reading
            </p>
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {analytics.conversionRate.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
    </div>
  );
}
