import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import AffiliateLayout from '@/components/affiliate/AffiliateLayout';
import { StatsCard } from '@/components/affiliate/StatsCard';
import { useTranslation } from '@/lib/translation-context';
import {
  MousePointer,
  ShoppingCart,
  Percent,
  DollarSign,
  Clock,
  Wallet,
  Copy,
  Check,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface DashboardStats {
  affiliate: {
    id: string;
    code: string;
    name: string;
  };
  stats: {
    totalClicks: number;
    totalConversions: number;
    conversionRate: number;
    totalEarnings: number;
    pendingEarnings: number;
    availableBalance: number;
  };
  thisMonth: {
    clicks: number;
    conversions: number;
    earnings: number;
  };
  trends: {
    clicksChange: number;
    conversionsChange: number;
    earningsChange: number;
  };
  recentConversions: Array<{
    id: string;
    orderId: string;
    orderSubtotal: number;
    commissionAmount: number;
    status: string;
    purchasedAt: string;
  }>;
}

function QuickLinkCard({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca'}?ref=${code}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Your Referral Link
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Share this link to earn commissions on every sale.
      </p>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 overflow-hidden">
          <code className="text-sm text-gray-700 dark:text-gray-300 truncate block">
            {referralLink}
          </code>
        </div>
        <button
          onClick={copyLink}
          className="flex-shrink-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <Link
          href="/affiliate/dashboard/links"
          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center"
        >
          Get more links
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
        <a
          href={referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
        >
          Preview link
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>
  );
}

function RecentConversions({ conversions }: { conversions: DashboardStats['recentConversions'] }) {
  const { t } = useTranslation();

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
      CLEARED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      PAID: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      VOIDED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles] || styles.PENDING}`}>
        {status}
      </span>
    );
  };

  if (conversions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {t.affiliateDashboard?.conversions?.title || 'Recent Conversions'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          {t.affiliateDashboard?.conversions?.noConversions || 'No conversions yet. Share your link to start earning!'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {t.affiliateDashboard?.conversions?.title || 'Recent Conversions'}
        </h3>
        <Link
          href="/affiliate/dashboard/stats"
          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
        >
          View all
        </Link>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {conversions.slice(0, 5).map((conversion) => (
          <div key={conversion.id} className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Order #{conversion.orderId.slice(-8)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(conversion.purchasedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  +${conversion.commissionAmount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  from ${conversion.orderSubtotal.toFixed(2)}
                </p>
              </div>
              {getStatusBadge(conversion.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AffiliateDashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/affiliate/dashboard/stats');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          window.location.href = '/affiliate/login';
          return;
        }
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
      setError(t.affiliateDashboard?.errors?.loadFailed || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [t.affiliateDashboard?.errors?.loadFailed]);

  useEffect(() => {
    fetchStats();
    // Refresh stats every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <>
      <Head>
        <title>{t.affiliateDashboard?.pageTitle || 'Affiliate Dashboard'} - Purrify</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AffiliateLayout>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t.affiliateDashboard?.overview?.welcome || 'Welcome back'}{data?.affiliate?.name ? `, ${data.affiliate.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here&apos;s how your affiliate account is performing.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title={t.affiliateDashboard?.stats?.totalClicks || 'Total Clicks'}
            value={data?.stats.totalClicks || 0}
            icon={<MousePointer className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            change={data?.trends.clicksChange}
            changeLabel="vs last month"
            isLoading={isLoading}
          />
          <StatsCard
            title={t.affiliateDashboard?.stats?.totalConversions || 'Conversions'}
            value={data?.stats.totalConversions || 0}
            icon={<ShoppingCart className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            change={data?.trends.conversionsChange}
            changeLabel="vs last month"
            isLoading={isLoading}
          />
          <StatsCard
            title={t.affiliateDashboard?.stats?.conversionRate || 'Conversion Rate'}
            value={data?.stats.conversionRate || 0}
            format="percentage"
            icon={<Percent className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            isLoading={isLoading}
          />
          <StatsCard
            title={t.affiliateDashboard?.stats?.totalEarnings || 'Total Earnings'}
            value={data?.stats.totalEarnings || 0}
            format="currency"
            icon={<DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            change={data?.trends.earningsChange}
            changeLabel="vs last month"
            isLoading={isLoading}
          />
          <StatsCard
            title={t.affiliateDashboard?.stats?.pendingEarnings || 'Pending'}
            value={data?.stats.pendingEarnings || 0}
            format="currency"
            icon={<Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            note={t.affiliateDashboard?.stats?.pendingNote || '30-day hold'}
            isLoading={isLoading}
          />
          <StatsCard
            title={t.affiliateDashboard?.stats?.availableBalance || 'Available'}
            value={data?.stats.availableBalance || 0}
            format="currency"
            icon={<Wallet className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            isLoading={isLoading}
          />
        </div>

        {/* Quick Link Card */}
        {data?.affiliate?.code && (
          <div className="mb-8">
            <QuickLinkCard code={data.affiliate.code} />
          </div>
        )}

        {/* Recent Conversions */}
        <RecentConversions conversions={data?.recentConversions || []} />
      </AffiliateLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  // Check if user is authenticated as affiliate
  const user = session?.user as { role?: string } | undefined;
  if (!session || user?.role !== 'affiliate') {
    return {
      redirect: {
        destination: '/affiliate/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
