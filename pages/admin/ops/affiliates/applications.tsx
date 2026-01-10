import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/session';
import OpsLayout from '@/components/admin/ops/OpsLayout';
import {
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Globe,
  Users,
  TrendingUp,
  Mail,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

interface Application {
  id: string;
  name: string;
  email: string;
  website: string | null;
  audience: string;
  trafficSource: string;
  monthlyVisitors: string;
  experience: string;
  message: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    PENDING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    APPROVED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  const icons = {
    PENDING: Clock,
    APPROVED: CheckCircle,
    REJECTED: XCircle,
  };

  const Icon = icons[status as keyof typeof icons] || Clock;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </span>
  );
}

function ApplicationCard({
  application,
  onApprove,
  onReject,
  isProcessing,
}: {
  application: Application;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  isProcessing: boolean;
}) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {application.name}
          </h3>
          <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
            <Mail className="w-4 h-4 mr-1" />
            <a href={`mailto:${application.email}`} className="hover:text-teal-600 dark:hover:text-teal-400">
              {application.email}
            </a>
          </div>
        </div>
        <StatusBadge status={application.status} />
      </div>

      {/* Body */}
      <div className="px-6 py-4 space-y-4">
        {/* Website */}
        {application.website && (
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Website/Social</p>
              <a
                href={application.website.startsWith('http') ? application.website : `https://${application.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center"
              >
                {application.website}
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        )}

        {/* Audience */}
        <div className="flex items-start space-x-3">
          <Users className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Audience</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{application.audience}</p>
          </div>
        </div>

        {/* Traffic Source & Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Traffic Source</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{application.trafficSource}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Visitors</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{application.monthlyVisitors}</p>
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Affiliate Experience</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{application.experience}</p>
        </div>

        {/* Message */}
        {application.message && (
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{application.message}</p>
          </div>
        )}

        {/* Rejection Reason */}
        {application.status === 'REJECTED' && application.rejectionReason && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm font-medium text-red-700 dark:text-red-300">Rejection Reason</p>
            <p className="text-sm text-red-600 dark:text-red-400">{application.rejectionReason}</p>
          </div>
        )}

        {/* Applied Date */}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Applied {new Date(application.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Actions */}
      {application.status === 'PENDING' && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={isProcessing}
            className="px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors disabled:opacity-50"
          >
            Reject
          </button>
          <button
            onClick={() => onApprove(application.id)}
            disabled={isProcessing}
            className="px-4 py-2 text-sm font-medium text-white dark:text-gray-100 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Approve'}
          </button>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Reject Application
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please provide a reason for rejecting {application.name}&apos;s application:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              rows={3}
              placeholder="e.g., Insufficient audience size, content not aligned with brand..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onReject(application.id, rejectReason);
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                disabled={!rejectReason.trim() || isProcessing}
                className="px-4 py-2 text-sm font-medium text-white dark:text-gray-100 bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('PENDING');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchApplications = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        status: statusFilter,
      });
      if (searchTerm) {
        params.set('search', searchTerm);
      }

      const response = await fetch(`/api/admin/affiliates/applications?${params}`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
        setPagination(data.pagination || null);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleApprove = async (id: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/affiliates/applications/${id}/approve`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchApplications(pagination?.page || 1);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to approve application');
      }
    } catch (error) {
      console.error('Failed to approve application:', error);
      alert('Failed to approve application');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (id: string, reason: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/affiliates/applications/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (response.ok) {
        fetchApplications(pagination?.page || 1);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to reject application');
      }
    } catch (error) {
      console.error('Failed to reject application:', error);
      alert('Failed to reject application');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Affiliate Applications - Purrify Hub</title>
      </Head>
      <OpsLayout>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <Link href="/admin/ops/affiliates" className="hover:text-teal-600 dark:hover:text-teal-400">
              Affiliates
            </Link>
            <span>/</span>
            <span>Applications</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
            Affiliate Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Review and manage affiliate applications.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : applications.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onApprove={handleApprove}
                onReject={handleReject}
                isProcessing={isProcessing}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {statusFilter === 'PENDING'
                ? 'No pending applications'
                : `No ${statusFilter.toLowerCase()} applications found`}
            </p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => fetchApplications(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchApplications(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}
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
