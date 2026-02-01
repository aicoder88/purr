import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/session';
import OpsLayout from '@/components/admin/ops/OpsLayout';
import { AnimatedMetricCard } from '@/components/admin/ops/AnimatedMetricCard';
import {
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Search,
  Filter
} from 'lucide-react';

interface PayoutRequest {
  id: string;
  affiliateId: string;
  affiliateName: string;
  affiliateEmail: string;
  affiliateCode: string;
  amount: number;
  method: 'PAYPAL' | 'ETRANSFER';
  payoutEmail: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  requestedAt: string;
  processedAt: string | null;
  processedBy: string | null;
  transactionRef: string | null;
  notes: string | null;
}

interface PayoutStats {
  pendingCount: number;
  pendingAmount: number;
  processingCount: number;
  processingAmount: number;
  completedThisMonth: number;
  completedAmountThisMonth: number;
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    PROCESSING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    COMPLETED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
      {status}
    </span>
  );
}

function MethodBadge({ method }: { method: 'PAYPAL' | 'ETRANSFER' }) {
  const styles = {
    PAYPAL: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    ETRANSFER: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  };

  const labels = {
    PAYPAL: 'PayPal',
    ETRANSFER: 'E-Transfer',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[method]}`}>
      {labels[method]}
    </span>
  );
}

function ProcessPayoutModal({
  payout,
  onClose,
  onProcess,
}: {
  payout: PayoutRequest;
  onClose: () => void;
  onProcess: (id: string, transactionRef: string, notes: string) => Promise<void>;
}) {
  const [transactionRef, setTransactionRef] = useState('');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim()) return;

    setIsProcessing(true);
    try {
      await onProcess(payout.id, transactionRef.trim(), notes.trim());
      onClose();
    } catch (error) {
      console.error('Failed to process payout:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Process Payout
        </h3>

        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Affiliate</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{payout.affiliateName}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
            <span className="font-semibold text-green-600 dark:text-green-400">${payout.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Method</span>
            <MethodBadge method={payout.method} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Send to</span>
            <span className="text-sm text-gray-900 dark:text-gray-100">{payout.payoutEmail}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Transaction Reference *
            </label>
            <input
              type="text"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              placeholder={payout.method === 'PAYPAL' ? 'PayPal Transaction ID' : 'Interac Reference Number'}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes about this payout..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || !transactionRef.trim()}
              className="flex-1 px-4 py-2 bg-teal-600 dark:bg-teal-600 hover:bg-teal-700 dark:hover:bg-teal-500 text-white dark:text-gray-100 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isProcessing ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Completed
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AffiliatePayoutsPage() {
  const [stats, setStats] = useState<PayoutStats | null>(null);
  const [payouts, setPayouts] = useState<PayoutRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('PENDING');
  const [searchQuery, setSearchQuery] = useState('');
  const [processingPayout, setProcessingPayout] = useState<PayoutRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPayouts = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetch(`/api/admin/affiliates/payouts?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch payouts');

      const data = await response.json();
      setPayouts(data.payouts || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error('Failed to fetch payouts:', error);
      setError('Failed to load payouts');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchPayouts();
  }, [fetchPayouts]);

  const handleProcessPayout = async (id: string, transactionRef: string, notes: string) => {
    const response = await fetch(`/api/admin/affiliates/payouts/${id}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionRef, notes }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to process payout');
    }

    // Refresh payouts list
    await fetchPayouts();
  };

  return (
    <>
      <Head>
        <title>Affiliate Payouts - Purrify Hub</title>
      </Head>
      <OpsLayout>
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/ops/affiliates"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Affiliates
          </Link>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
            Payout Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Review and process affiliate payout requests.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnimatedMetricCard
            title="Pending Payouts"
            value={stats?.pendingCount || 0}
            icon={Clock}
            changeLabel={`$${(stats?.pendingAmount || 0).toFixed(2)} total`}
            isLoading={isLoading}
          />
          <AnimatedMetricCard
            title="Processing"
            value={stats?.processingCount || 0}
            icon={AlertCircle}
            changeLabel={`$${(stats?.processingAmount || 0).toFixed(2)} total`}
            isLoading={isLoading}
          />
          <AnimatedMetricCard
            title="Completed This Month"
            value={stats?.completedThisMonth || 0}
            icon={CheckCircle}
            changeLabel={`$${(stats?.completedAmountThisMonth || 0).toFixed(2)} paid`}
            isLoading={isLoading}
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by affiliate name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 dark:text-gray-500 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="COMPLETED">Completed</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Payouts Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Affiliate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Payout Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Requested
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
                ) : payouts.length > 0 ? (
                  payouts.map((payout) => (
                    <tr key={payout.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <Link
                            href={`/admin/ops/affiliates/${payout.affiliateId}`}
                            className="font-medium text-gray-900 dark:text-gray-100 hover:text-teal-600 dark:hover:text-teal-400"
                          >
                            {payout.affiliateName}
                          </Link>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {payout.affiliateCode}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ${payout.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <MethodBadge method={payout.method} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {payout.payoutEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={payout.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {new Date(payout.requestedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {payout.status === 'PENDING' && (
                          <button
                            onClick={() => setProcessingPayout(payout)}
                            className="inline-flex items-center px-3 py-1.5 bg-teal-600 dark:bg-teal-600 hover:bg-teal-700 dark:hover:bg-teal-500 text-white dark:text-gray-100 text-sm font-medium rounded-lg transition-colors"
                          >
                            <DollarSign className="w-4 h-4 mr-1" />
                            Process
                          </button>
                        )}
                        {payout.status === 'COMPLETED' && payout.transactionRef && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Ref: {payout.transactionRef}
                          </span>
                        )}
                        {payout.status === 'PROCESSING' && (
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            In Progress
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No payout requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </OpsLayout>

      {/* Process Payout Modal */}
      {processingPayout && (
        <ProcessPayoutModal
          payout={processingPayout}
          onClose={() => setProcessingPayout(null)}
          onProcess={handleProcessPayout}
        />
      )}
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
