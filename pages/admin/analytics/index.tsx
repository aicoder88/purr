/**
 * Admin Analytics Dashboard
 *
 * Unified view for UTM attribution, customer segmentation, and A/B tests.
 */

import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Target,
  BarChart3,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Loader2,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SITE_NAME } from '@/lib/constants';

interface UTMData {
  summary: {
    totalOrders: number;
    totalRevenue: number;
    attributedOrders: number;
    attributedRevenue: number;
    attributionRate: number;
  };
  bySource: Array<{
    source: string;
    orders: number;
    revenue: number;
    avgOrderValue: number;
  }>;
  byCampaign: Array<{
    campaign: string;
    orders: number;
    revenue: number;
    avgOrderValue: number;
  }>;
}

interface CustomerData {
  summary: {
    totalCustomers: number;
    totalRevenue: number;
    averageLTV: number;
    averageOrderValue: number;
  };
  segmentBreakdown: Array<{
    segment: string;
    count: number;
    revenue: number;
    percentage: number;
  }>;
}

interface PageProps {
  isAuthorized: boolean;
}

export default function AnalyticsDashboard({ isAuthorized }: PageProps) {
  const [utmData, setUtmData] = useState<UTMData | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [utmRes, customerRes] = await Promise.all([
        fetch(`/api/admin/analytics/utm?days=${dateRange}`),
        fetch('/api/admin/analytics/customers'),
      ]);

      if (utmRes.ok) {
        const utmJson = await utmRes.json();
        if (utmJson.success) setUtmData(utmJson.data);
      }

      if (customerRes.ok) {
        const customerJson = await customerRes.json();
        if (customerJson.success) setCustomerData(customerJson.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
    setLoading(false);
  }, [dateRange]);

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    }
  }, [isAuthorized, fetchData]);

  if (!isAuthorized) {
    return (
      <>
        <NextSeo title={`Access Denied - ${SITE_NAME}`} noindex />
        <Container className="py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Admin access required.
          </p>
        </Container>
      </>
    );
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(value);

  const segmentColors: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    RETURNING: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    LOYAL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    VIP: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    AT_RISK: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    CHURNED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <>
      <NextSeo
        title={`Analytics Dashboard - ${SITE_NAME}`}
        description="Business analytics and insights"
        noindex
      />

      <Container className="py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              UTM attribution, customer insights, and A/B testing
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <Link href="/admin/analytics/ab-tests">
              <Button variant="outline">
                <Target className="w-4 h-4 mr-2" />
                A/B Tests
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400 dark:text-gray-500" />
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Revenue
                  </span>
                  <DollarSign className="w-5 h-5 text-green-500 dark:text-green-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(utmData?.summary.totalRevenue || 0)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {utmData?.summary.totalOrders || 0} orders
                </p>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Attribution Rate
                  </span>
                  <Target className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {(utmData?.summary.attributionRate || 0).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {utmData?.summary.attributedOrders || 0} attributed
                </p>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Customers
                  </span>
                  <Users className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {customerData?.summary.totalCustomers || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Avg LTV: {formatCurrency(customerData?.summary.averageLTV || 0)}
                </p>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Avg Order Value
                  </span>
                  <BarChart3 className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(customerData?.summary.averageOrderValue || 0)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Per transaction
                </p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traffic Sources */}
              <Card className="p-6 bg-white dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                  Top Traffic Sources
                </h2>
                <div className="space-y-3">
                  {utmData?.bySource.slice(0, 5).map((source, idx) => (
                    <div
                      key={source.source}
                      className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400 mr-3">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {source.source}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(source.revenue)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {source.orders} orders
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!utmData?.bySource || utmData.bySource.length === 0) && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No UTM data yet
                    </p>
                  )}
                </div>
              </Card>

              {/* Top Campaigns */}
              <Card className="p-6 bg-white dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" />
                  Top Campaigns
                </h2>
                <div className="space-y-3">
                  {utmData?.byCampaign.slice(0, 5).map((campaign, idx) => (
                    <div
                      key={campaign.campaign}
                      className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400 mr-3">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px]">
                          {campaign.campaign}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(campaign.revenue)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          AOV: {formatCurrency(campaign.avgOrderValue)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!utmData?.byCampaign || utmData.byCampaign.length === 0) && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No campaign data yet
                    </p>
                  )}
                </div>
              </Card>

              {/* Customer Segments */}
              <Card className="p-6 bg-white dark:bg-gray-800 lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
                  Customer Segments
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {customerData?.segmentBreakdown.map((seg) => (
                    <div
                      key={seg.segment}
                      className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                    >
                      <Badge className={segmentColors[seg.segment] || 'bg-gray-100 dark:bg-gray-700'}>
                        {seg.segment}
                      </Badge>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                        {seg.count}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {seg.percentage.toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {formatCurrency(seg.revenue)}
                      </p>
                    </div>
                  ))}
                  {(!customerData?.segmentBreakdown ||
                    customerData.segmentBreakdown.length === 0) && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4 col-span-full">
                      No customer data yet
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  // Simple auth check - in production use proper session validation
  const adminCookie = ctx.req.cookies['admin-auth'];

  return {
    props: {
      isAuthorized: !!adminCookie || process.env.NODE_ENV === 'development',
    },
  };
};
