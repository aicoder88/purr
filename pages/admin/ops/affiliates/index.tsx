import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/session';
import OpsLayout from '@/components/admin/ops/OpsLayout';
import { AnimatedMetricCard } from '@/components/admin/ops/AnimatedMetricCard';
import {
  Users,
  UserPlus,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

interface AffiliateStats {
  totalAffiliates: number;
  activeAffiliates: number;
  pendingApplications: number;
  totalRevenue: number;
  totalCommissionsPaid: number;
  pendingCommissions: number;
  averageConversionRate: number;
}

interface Affiliate {
  id: string;
  code: string;
  name: string;
  email: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED';
  totalClicks: number;
  totalConversions: number;
  totalEarnings: number;
  availableBalance: number;
  createdAt: string;
  lastLoginAt: string | null;
}

interface Application {
  id: string;
  name: string;
  email: string;
  trafficSource: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    SUSPENDED: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    TERMINATED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    PENDING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    APPROVED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
      {status}
    </span>
  );
}

export default function AffiliatesIndexPage() {
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [pendingApplications, setPendingApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, affiliatesRes, applicationsRes] = await Promise.all([
        fetch('/api/admin/affiliates/stats'),
        fetch('/api/admin/affiliates?limit=10'),
        fetch('/api/admin/affiliates/applications?status=PENDING&limit=5'),
      ]);

      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
      if (affiliatesRes.ok) {
        const data = await affiliatesRes.json();
        setAffiliates(data.affiliates || []);
      }
      if (applicationsRes.ok) {
        const data = await applicationsRes.json();
        setPendingApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Failed to fetch affiliate data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Head>
        <title>Affiliates - Purrify Hub</title>
      </Head>
      <OpsLayout>
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
              Affiliate Program
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage affiliates, applications, and track performance.
            </p>
          </div>
          <Link
            href="/admin/ops/affiliates/applications"
            className="inline-flex items-center px-4 py-2 bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600 text-white dark:text-gray-100 rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Review Applications
            {stats && stats.pendingApplications > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 dark:bg-white/10 rounded-full text-xs">
                {stats.pendingApplications}
              </span>
            )}
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnimatedMetricCard
            title="Active Affiliates"
            value={stats?.activeAffiliates || 0}
            icon={Users}
            isLoading={isLoading}
          />
          <AnimatedMetricCard
            title="Pending Applications"
            value={stats?.pendingApplications || 0}
            icon={Clock}
            href="/admin/ops/affiliates/applications"
            isLoading={isLoading}
          />
          <AnimatedMetricCard
            title="Total Revenue (via Affiliates)"
            value={stats?.totalRevenue || 0}
            format="currency"
            icon={DollarSign}
            isLoading={isLoading}
          />
          <AnimatedMetricCard
            title="Avg. Conversion Rate"
            value={stats?.averageConversionRate || 0}
            format="percentage"
            icon={TrendingUp}
            isLoading={isLoading}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Applications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Pending Applications
              </h2>
              <Link
                href="/admin/ops/affiliates/applications"
                className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
              >
                View all
              </Link>
            </div>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 dark:bg-gray-700 rounded" />
                ))}
              </div>
            ) : pendingApplications.length > 0 ? (
              <div className="space-y-3">
                {pendingApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{app.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {app.email} &bull; {app.trafficSource}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/ops/affiliates/applications?id=${app.id}`}
                        className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded"
                        title="Review"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No pending applications
              </p>
            )}
          </div>

          {/* Commission Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
              Commission Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Total Paid</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ${(stats?.totalCommissionsPaid || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Pending</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ${(stats?.pendingCommissions || 0).toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              href="/admin/ops/affiliates/payouts"
              className="block mt-4 text-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
            >
              Manage payouts &rarr;
            </Link>
          </div>
        </div>

        {/* Active Affiliates Table */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Recent Affiliates
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Affiliate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <div className="animate-pulse space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto" />
                      </div>
                    </td>
                  </tr>
                ) : affiliates.length > 0 ? (
                  affiliates.map((affiliate) => (
                    <tr key={affiliate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {affiliate.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {affiliate.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300">
                          {affiliate.code}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={affiliate.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        {affiliate.totalClicks.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        {affiliate.totalConversions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        ${affiliate.totalEarnings.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link
                          href={`/admin/ops/affiliates/${affiliate.id}`}
                          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No affiliates yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </OpsLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { authorized } = await requireAuth(req, res, ['admin']);

  if (!authorized) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
