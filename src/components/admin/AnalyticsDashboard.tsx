import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, Eye, FileText, Target, Users, Clock, BarChart3 } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import type { DashboardMetrics } from '@/lib/blog/analytics-service';

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

  const loadMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/blog/analytics?range=${dateRange}`);
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      const response = await fetch(`/api/admin/blog/analytics/export?range=${dateRange}&format=${format}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-report-${dateRange}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch {
      // Silently fail
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
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading analytics..." />
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-gray-400">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-2xl font-bold text-gray-900 text-gray-100">Analytics Overview</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 border border-gray-300 border-gray-700 rounded-lg hover:bg-gray-50 hover:bg-gray-700 transition-colors text-gray-700 text-gray-300 text-sm font-medium"
          >
            Export CSV
          </button>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white bg-gray-900 text-gray-900 text-gray-100"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Views"
          value={formatNumber(metrics.totalViews)}
          change={metrics.periodComparison.viewsChange}
          icon={<Eye className="w-5 h-5" />}
        />
        <MetricCard
          title="Total Posts"
          value={metrics.totalPosts.toString()}
          change={metrics.periodComparison.postsChange}
          icon={<FileText className="w-5 h-5" />}
        />
        <MetricCard
          title="Avg SEO Score"
          value={metrics.avgSEOScore.toString()}
          icon={<Target className="w-5 h-5" />}
        />
        <MetricCard
          title="Engagement"
          value={`${metrics.periodComparison.engagementChange > 0 ? '+' : ''}${metrics.periodComparison.engagementChange.toFixed(1)}%`}
          change={metrics.periodComparison.engagementChange}
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Top Posts */}
      <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-6">
        <h3 className="font-heading text-lg font-semibold text-gray-900 text-gray-100 mb-4 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>Top Performing Posts</span>
        </h3>
        <div className="space-y-3">
          {metrics.topPosts.map((post, index) => (
            <div
              key={post.slug}
              className="flex items-center justify-between p-3 bg-gray-50 bg-gray-900 rounded-lg"
            >
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-2xl font-bold text-gray-400 text-gray-600 w-8">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-gray-100">{post.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 text-gray-400 mt-1">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(post.views)} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{formatNumber(post.uniqueVisitors)} visitors</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(post.avgTimeOnPage)}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 text-gray-100">
                  {post.bounceRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 text-gray-400">bounce rate</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Categories & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Categories */}
        <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-6">
          <h3 className="font-heading text-lg font-semibold text-gray-900 text-gray-100 mb-4">
            Trending Categories
          </h3>
          <div className="space-y-3">
            {metrics.trendingCategories.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between">
                <span className="text-gray-700 text-gray-300">{cat.category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(cat.views / Math.max(...metrics.trendingCategories.map(c => c.views))) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-gray-100 w-16 text-right">
                    {formatNumber(cat.views)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-6">
          <h3 className="font-heading text-lg font-semibold text-gray-900 text-gray-100 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {metrics.recentActivity.length > 0 ? (
              metrics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5" />
                  <div className="flex-1">
                    <p className="text-gray-900 text-gray-100">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-gray-600 text-gray-400">{activity.action}</span>{' '}
                      <span className="font-medium">{activity.postTitle}</span>
                    </p>
                    <p className="text-gray-500 text-gray-400 text-xs mt-0.5">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-gray-400 text-sm">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, icon }: MetricCardProps) {
  return (
    <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600 text-gray-400">{title}</span>
        <div className="text-purple-600 text-purple-400">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-900 text-gray-100">{value}</span>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${change >= 0 ? 'text-green-600 text-green-400' : 'text-red-600 text-red-400'
            }`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
