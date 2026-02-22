"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import OpsLayout from '@/components/admin/ops/OpsLayout';
import { AnimatedMetricCard } from '@/components/admin/ops/AnimatedMetricCard';
import {
  ArrowLeft,
  Mail,
  Globe,
  Calendar,
  Clock,
  MousePointer,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wallet,
  ExternalLink,
  Copy,
} from 'lucide-react';

interface AffiliateDetail {
  id: string;
  code: string;
  name: string;
  email: string;
  website: string | null;
  status: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED';
  totalClicks: number;
  totalConversions: number;
  totalEarnings: number;
  pendingEarnings: number;
  availableBalance: number;
  payoutMethod: 'PAYPAL' | 'ETRANSFER' | null;
  payoutEmail: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Conversion {
  id: string;
  orderId: string;
  orderSubtotal: number;
  commissionAmount: number;
  status: 'PENDING' | 'CLEARED' | 'PAID' | 'REFUNDED';
  purchasedAt: string;
}

interface Payout {
  id: string;
  amount: number;
  method: 'PAYPAL' | 'ETRANSFER';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  requestedAt: string;
  processedAt: string | null;
  transactionRef: string | null;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    SUSPENDED: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    TERMINATED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    PENDING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    CLEARED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    PAID: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
    REFUNDED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    PROCESSING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    COMPLETED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
      {status}
    </span>
  );
}

export default function AffiliateDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [affiliate, setAffiliate] = useState<AffiliateDetail | null>(null);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/affiliates/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('Affiliate not found');
        } else {
          throw new Error('Failed to fetch affiliate');
        }
        return;
      }

      const data = await response.json();
      setAffiliate(data.affiliate);
      setConversions(data.conversions || []);
      setPayouts(data.payouts || []);
    } catch (err) {
      console.error('Failed to fetch affiliate:', err);
      setError('Failed to load affiliate data');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (newStatus: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED') => {
    if (!affiliate || actionLoading) return;

    const confirmed = window.confirm(
      `Are you sure you want to ${newStatus === 'ACTIVE' ? 'activate' : newStatus === 'SUSPENDED' ? 'suspend' : 'terminate'} this affiliate?`
    );

    if (!confirmed) return;

    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/affiliates/${affiliate.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      await fetchData();
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update affiliate status');
    } finally {
      setActionLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (!affiliate) return;
    const link = `${window.location.origin}?ref=${affiliate.code}`;
    navigator.clipboard.writeText(link);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const conversionRate = affiliate && affiliate.totalClicks > 0
    ? ((affiliate.totalConversions / affiliate.totalClicks) * 100).toFixed(1)
    : '0.0';

  if (isLoading) {
    return (
      <OpsLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 dark:border-teal-400" />
        </div>
      </OpsLayout>
    );
  }

  if (error || !affiliate) {
    return (
      <OpsLayout>
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {error || 'Affiliate not found'}
          </h2>
          <Link
            href="/admin/ops/affiliates/"
            className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Back to Affiliates
          </Link>
        </div>
      </OpsLayout>
    );
  }

  return (
    <OpsLayout>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/ops/affiliates/"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Affiliates
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
                {affiliate.name}
              </h1>
              <StatusBadge status={affiliate.status} />
            </div>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                {affiliate.code}
              </span>
              <button
                onClick={copyReferralLink}
                className="text-teal-600 hover:text-teal-700 dark:text-teal-400"
                title="Copy referral link"
              >
                {copySuccess ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </p>
          </div>

          {/* Status Actions */}
          <div className="flex gap-2">
            {affiliate.status !== 'ACTIVE' && (
              <button
                onClick={() => handleStatusChange('ACTIVE')}
                disabled={actionLoading}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white dark:text-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Activate
              </button>
            )}
            {affiliate.status === 'ACTIVE' && (
              <button
                onClick={() => handleStatusChange('SUSPENDED')}
                disabled={actionLoading}
                className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white dark:text-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Suspend
              </button>
            )}
            {affiliate.status !== 'TERMINATED' && (
              <button
                onClick={() => handleStatusChange('TERMINATED')}
                disabled={actionLoading}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white dark:text-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Terminate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <AnimatedMetricCard
          title="Total Clicks"
          value={affiliate.totalClicks}
          icon={MousePointer}
        />
        <AnimatedMetricCard
          title="Conversions"
          value={affiliate.totalConversions}
          icon={ShoppingCart}
          changeLabel={`${conversionRate}% rate`}
        />
        <AnimatedMetricCard
          title="Total Earnings"
          value={affiliate.totalEarnings}
          format="currency"
          icon={DollarSign}
        />
        <AnimatedMetricCard
          title="Available Balance"
          value={affiliate.availableBalance}
          format="currency"
          icon={Wallet}
          changeLabel={`$${affiliate.pendingEarnings.toFixed(2)} pending`}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Affiliate Details */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">
              Affiliate Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-gray-100">{affiliate.email}</p>
                </div>
              </div>

              {affiliate.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                    <a
                      href={affiliate.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 flex items-center gap-1"
                    >
                      {affiliate.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Wallet className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Payout Method</p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {affiliate.payoutMethod === 'PAYPAL' ? 'PayPal' :
                     affiliate.payoutMethod === 'ETRANSFER' ? 'E-Transfer' : 'Not set'}
                    {affiliate.payoutEmail && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">
                        {affiliate.payoutEmail}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {new Date(affiliate.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {affiliate.lastLoginAt
                      ? new Date(affiliate.lastLoginAt).toLocaleString()
                      : 'Never'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Conversions & Payouts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Conversions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                Recent Conversions
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Subtotal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Commission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {conversions.length > 0 ? (
                    conversions.map((conversion) => (
                      <tr key={conversion.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {new Date(conversion.purchasedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">
                          {conversion.orderId.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          ${conversion.orderSubtotal.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                          ${conversion.commissionAmount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={conversion.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        No conversions yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payout History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                Payout History
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Requested
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Reference
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {payouts.length > 0 ? (
                    payouts.map((payout) => (
                      <tr key={payout.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {new Date(payout.requestedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          ${payout.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {payout.method === 'PAYPAL' ? 'PayPal' : 'E-Transfer'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={payout.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {payout.transactionRef || '-'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        No payouts yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </OpsLayout>
  );
}
