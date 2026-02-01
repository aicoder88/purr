"use client";

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import OpsLayout from '@/components/admin/ops/OpsLayout';
import { AnimatedMetricCard } from '@/components/admin/ops/AnimatedMetricCard';
import { RecentActivity } from '@/components/admin/ops/RecentActivity';
import type { ChartType } from '@/components/admin/ops/EnhancedChart';

// Dynamic import for EnhancedChart to reduce admin bundle size
// This component uses recharts which is a heavy library
const EnhancedChart = dynamic(
  () => import('@/components/admin/ops/EnhancedChart').then((mod) => mod.EnhancedChart),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[280px] flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-3 border-teal-500 dark:border-teal-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Loading chart...</span>
        </div>
      </div>
    ),
  }
);
import {
  Users,
  Store,
  ShoppingCart,
  TrendingUp,
  Mail,
  Share2,
  FileText,
  RefreshCw
} from 'lucide-react';
import { LeadStatus } from '@prisma/client';

// Type definition for chart data
interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface LeadsByStatus {
  status: LeadStatus;
  count: number;
}

interface LeadsByProvince {
  province: string;
  count: number;
}

interface LeadsByMonth {
  month: string;
  count: number;
}

interface ActivityItem {
  id: string;
  type: 'lead' | 'retailer' | 'order';
  action: string;
  subject: string;
  timestamp: string;
}

interface OpsStats {
  totalLeads: number;
  leadsByStatus: LeadsByStatus[];
  leadsByProvince: LeadsByProvince[];
  leadsByMonth: LeadsByMonth[];
  newLeadsThisMonth: number;
  leadsGrowth: number;
  totalRetailers: number;
  activeRetailers: number;
  pendingRetailers: number;
  totalOrders: number;
  recentOrders: number;
  totalRevenue: number;
  recentRevenue: number;
  revenueGrowth: number;
  conversionRate: number;
  recentActivity: ActivityItem[];
}

// Quick action button component
function QuickAction({
  title,
  description,
  icon: Icon,
  href,
  onClick
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void;
}) {
  const Content = (
    <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md dark:hover:shadow-gray-900/30 transition-all cursor-pointer">
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900 dark:text-gray-50">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{Content}</Link>;
  }

  return <button onClick={onClick} className="w-full text-left">{Content}</button>;
}

export default function OpsPage() {
  const [stats, setStats] = useState<OpsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/ops/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    // Refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/admin/ops/leads/sync', { method: 'POST' });
      if (response.ok) {
        await fetchStats();
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Transform data for charts
  const leadStatusChartData = stats?.leadsByStatus.map(item => ({
    name: item.status.replace(/_/g, ' '),
    value: item.count
  })) || [];

  const leadsByMonthChartData = stats?.leadsByMonth.map(item => ({
    name: item.month,
    value: item.count
  })) || [];

  const leadsByProvinceChartData = stats?.leadsByProvince.slice(0, 6).map(item => ({
    name: item.province || 'Unknown',
    value: item.count
  })) || [];

  return (
    <OpsLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
          Operations Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnimatedMetricCard
          title="Total Leads"
          value={stats?.totalLeads || 0}
          change={stats?.leadsGrowth}
          changeLabel="vs last month"
          icon={Users}
          href="/admin/ops/leads"
          isLoading={isLoading}
        />
        <AnimatedMetricCard
          title="Active Retailers"
          value={stats?.activeRetailers || 0}
          change={stats?.pendingRetailers}
          changeLabel="pending"
          icon={Store}
          href="/admin/ops/retailers"
          isLoading={isLoading}
        />
        <AnimatedMetricCard
          title="Total Revenue"
          value={stats?.totalRevenue || 0}
          format="currency"
          change={stats?.revenueGrowth}
          changeLabel="vs last month"
          icon={ShoppingCart}
          href="/admin/ops/orders"
          isLoading={isLoading}
        />
        <AnimatedMetricCard
          title="Conversion Rate"
          value={stats?.conversionRate || 0}
          format="percentage"
          icon={TrendingUp}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EnhancedChart
          title="Leads Over Time"
          type="area"
          data={leadsByMonthChartData}
          height={280}
        />
        <EnhancedChart
          title="Lead Pipeline"
          type="pie"
          data={leadStatusChartData}
          height={280}
        />
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EnhancedChart
          title="Leads by Province"
          type="bar"
          data={leadsByProvinceChartData}
          height={280}
        />
        <RecentActivity
          activities={stats?.recentActivity || []}
          isLoading={isLoading}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction
            title="Email Campaign"
            description="Send to leads"
            icon={Mail}
            href="/admin/ops/leads"
          />
          <QuickAction
            title="Social Post"
            description="Create content"
            icon={Share2}
            href="/admin/ops/social"
          />
          <QuickAction
            title="Blog Content"
            description="Generate article"
            icon={FileText}
            href="/admin/blog/new"
          />
          <QuickAction
            title="Sync Leads"
            description={isSyncing ? "Syncing..." : "From Google Sheets"}
            icon={RefreshCw}
            onClick={handleSync}
          />
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lead Status Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-4">Lead Pipeline</h3>
          <div className="space-y-3">
            {stats?.leadsByStatus.slice(0, 5).map(item => (
              <div key={item.status} className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.status.replace(/_/g, ' ')}
                </span>
                <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded text-sm font-medium">
                  {item.count}
                </span>
              </div>
            ))}
            {!stats?.leadsByStatus.length && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No leads yet</p>
            )}
          </div>
          <Link
            href="/admin/ops/leads"
            className="block mt-4 text-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
          >
            View all leads &rarr;
          </Link>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-4">Pending Approvals</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Retailers</span>
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-sm font-medium">
                {stats?.pendingRetailers || 0}
              </span>
            </div>
          </div>
          <Link
            href="/admin/ops/retailers"
            className="block mt-4 text-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
          >
            Review applications &rarr;
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">This week</span>
              <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded text-sm font-medium">
                {stats?.recentOrders || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Revenue</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-sm font-medium">
                ${(stats?.recentRevenue || 0).toFixed(0)}
              </span>
            </div>
          </div>
          <Link
            href="/admin/ops/orders"
            className="block mt-4 text-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
          >
            View all orders &rarr;
          </Link>
        </div>
      </div>
    </OpsLayout>
  );
}
