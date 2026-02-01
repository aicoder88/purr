import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import AffiliateLayout from '@/components/affiliate/AffiliateLayout';
import { PayoutRequestModal } from '@/components/affiliate/PayoutRequestModal';
import { useTranslation } from '@/lib/translation-context';
import {
  Wallet,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Settings,
  ArrowRight
} from 'lucide-react';

interface PayoutItem {
  id: string;
  amount: number;
  status: string;
  method: string;
  requestedAt: string;
  processedAt: string | null;
  transactionRef: string | null;
}

interface PayoutsData {
  balance: {
    pendingEarnings: number;
    availableBalance: number;
    totalEarnings: number;
    totalPaidOut: number;
    minimumPayout: number;
    canRequestPayout: boolean;
  };
  paymentSettings: {
    method: string | null;
    email: string | null;
  };
  hasPendingRequest: boolean;
  pendingRequestAmount: number;
  payouts: PayoutItem[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

function BalanceCard({
  title,
  value,
  icon,
  description,
  highlight = false,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        highlight
          ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-sm font-medium ${
            highlight
              ? 'text-purple-700 dark:text-purple-300'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {title}
        </span>
        <div
          className={`p-2 rounded-lg ${
            highlight
              ? 'bg-purple-100 dark:bg-purple-900/50'
              : 'bg-gray-100 dark:bg-gray-700'
          }`}
        >
          {icon}
        </div>
      </div>
      <p
        className={`text-2xl font-bold ${
          highlight
            ? 'text-purple-900 dark:text-purple-100'
            : 'text-gray-900 dark:text-gray-100'
        }`}
      >
        ${value.toFixed(2)}
      </p>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
}

export default function AffiliatePayouts() {
  const { t } = useTranslation();
  const [data, setData] = useState<PayoutsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const fetchPayouts = useCallback(async () => {
    try {
      const response = await fetch('/api/affiliate/dashboard/payouts');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          window.location.href = '/affiliate/login';
          return;
        }
        throw new Error('Failed to fetch payouts');
      }
      const payoutsData = await response.json();
      setData(payoutsData);
    } catch (err) {
      console.error('Failed to fetch payouts:', err);
      setError(t.affiliateDashboard?.errors?.loadFailed || 'Failed to load payout data');
    } finally {
      setIsLoading(false);
    }
  }, [t.affiliateDashboard?.errors?.loadFailed]);

  useEffect(() => {
    fetchPayouts();
  }, [fetchPayouts]);

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-300',
        icon: <Clock className="w-3 h-3" />,
      },
      COMPLETED: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300',
        icon: <CheckCircle className="w-3 h-3" />,
      },
      FAILED: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300',
        icon: <AlertCircle className="w-3 h-3" />,
      },
    };

    const statusLabels: Record<string, string> = {
      PENDING: t.affiliateDashboard?.payoutsSection?.statusPending || 'Pending',
      PROCESSING: t.affiliateDashboard?.payoutsSection?.statusProcessing || 'Processing',
      COMPLETED: t.affiliateDashboard?.payoutsSection?.statusCompleted || 'Completed',
      FAILED: t.affiliateDashboard?.payoutsSection?.statusRejected || 'Failed',
      REJECTED: t.affiliateDashboard?.payoutsSection?.statusRejected || 'Rejected',
    };

    const style = styles[status as keyof typeof styles] || styles.PENDING;
    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${style.bg} ${style.text}`}
      >
        {style.icon}
        <span>{statusLabels[status] || status}</span>
      </span>
    );
  };

  const handlePayoutSuccess = () => {
    fetchPayouts();
  };

  return (
    <>
      <Head>
        <title>Payouts - Purrify Affiliate</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AffiliateLayout>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t.affiliateDashboard?.payouts || 'Payouts'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your earnings and request payouts.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-6">
            {/* Loading skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                </div>
              ))}
            </div>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <BalanceCard
                title="Available Balance"
                value={data.balance.availableBalance}
                icon={<Wallet className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                description="Ready to withdraw"
                highlight
              />
              <BalanceCard
                title="Pending Earnings"
                value={data.balance.pendingEarnings}
                icon={<Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                description="30-day hold period"
              />
              <BalanceCard
                title="Total Earnings"
                value={data.balance.totalEarnings}
                icon={<DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                description="Lifetime earnings"
              />
              <BalanceCard
                title="Total Paid Out"
                value={data.balance.totalPaidOut}
                icon={<CheckCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                description="Successfully received"
              />
            </div>

            {/* Request Payout Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Request Payout
              </h3>

              {data.hasPendingRequest ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">
                        Pending Payout Request
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        You have a pending payout request for ${data.pendingRequestAmount.toFixed(2)}.
                        Please wait for it to be processed before requesting another payout.
                      </p>
                    </div>
                  </div>
                </div>
              ) : !data.paymentSettings.method || !data.paymentSettings.email ? (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-200">
                        Configure Payment Settings
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Please set up your payment method and email before requesting a payout.
                      </p>
                      <Link
                        href="/affiliate/dashboard/settings"
                        className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mt-2"
                      >
                        Go to Settings
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : data.balance.availableBalance < data.balance.minimumPayout ? (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Minimum payout amount is ${data.balance.minimumPayout}. Your current available
                    balance is ${data.balance.availableBalance.toFixed(2)}.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      You have <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ${data.balance.availableBalance.toFixed(2)}
                      </span> available for withdrawal.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Payment via {data.paymentSettings.method} to {data.paymentSettings.email}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPayoutModal(true)}
                    className="mt-4 sm:mt-0 px-6 py-2 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 text-white dark:text-gray-100 font-medium rounded-lg transition-colors"
                  >
                    Request Payout
                  </button>
                </div>
              )}
            </div>

            {/* Payout History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Payout History
                </h3>
              </div>

              {data.payouts.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Wallet className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No payouts yet. Request your first payout when you reach the minimum balance.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Reference
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {data.payouts.map((payout) => (
                        <tr key={payout.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {new Date(payout.requestedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">
                            ${payout.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {payout.method}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(payout.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {payout.transactionRef || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </AffiliateLayout>

      {/* Payout Request Modal */}
      {data && (
        <PayoutRequestModal
          isOpen={showPayoutModal}
          onClose={() => setShowPayoutModal(false)}
          onSuccess={handlePayoutSuccess}
          availableBalance={data.balance.availableBalance}
          payoutMethod={data.paymentSettings.method}
          payoutEmail={data.paymentSettings.email}
        />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

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
