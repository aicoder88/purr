"use client";

import { useState, useEffect, useCallback } from 'react';
import OpsLayout from '@/components/admin/ops/OpsLayout';
import { Store, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Retailer {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';
  createdAt: string;
}

export default function RetailersPage() {
  const { toast } = useToast();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRetailers = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/ops/retailers');
      if (response.ok) {
        const data = await response.json();
        setRetailers(data.retailers || []);
      }
    } catch (error) {
      console.error('Failed to fetch retailers:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRetailers();
  }, [fetchRetailers]);

  const pendingRetailers = retailers.filter(r => r.status === 'PENDING');
  const activeRetailers = retailers.filter(r => r.status === 'ACTIVE');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: Retailer['status']) => {
    const styles = {
      PENDING: 'bg-yellow-100 bg-yellow-900/30 text-yellow-700 text-yellow-300',
      ACTIVE: 'bg-green-100 bg-green-900/30 text-green-700 text-green-300',
      SUSPENDED: 'bg-red-100 bg-red-900/30 text-red-700 text-red-300',
      REJECTED: 'bg-gray-100 bg-gray-700 text-gray-700 text-gray-300'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/ops/retailers/${id}/approve`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to approve retailer');
      }

      toast({
        title: 'Retailer Approved',
        description: 'The retailer has been approved and notified via email.',
      });

      // Refresh data
      await fetchRetailers();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to approve retailer',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Please provide a reason for rejection (optional):');

    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/ops/retailers/${id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to reject retailer');
      }

      toast({
        title: 'Retailer Rejected',
        description: 'The retailer has been rejected and notified via email.',
      });

      // Refresh data
      await fetchRetailers();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to reject retailer',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <OpsLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 text-gray-50">
          Retailer Management
        </h1>
        <p className="text-gray-600 text-gray-400 mt-1">
          Manage wholesale retailer applications and accounts
        </p>
      </div>

      {/* Pending Approvals */}
      {pendingRetailers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4">
            Pending Approvals ({pendingRetailers.length})
          </h2>
          <div className="space-y-4">
            {pendingRetailers.map((retailer) => (
              <div
                key={retailer.id}
                className="bg-white bg-gray-800 rounded-xl border border-yellow-200 border-yellow-900/50 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-gray-50">
                        {retailer.businessName}
                      </h3>
                      {getStatusBadge(retailer.status)}
                    </div>
                    <p className="text-gray-600 text-gray-400">
                      {retailer.contactName} &bull; {retailer.email}
                    </p>
                    <p className="text-sm text-gray-500 text-gray-400 mt-1">
                      Applied: {formatDate(retailer.createdAt)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(retailer.id)}
                      disabled={processingId === retailer.id}
                      className="flex items-center space-x-1 px-3 py-2 bg-green-500 bg-green-600 text-white text-gray-100 rounded-lg hover:bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingId === retailer.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(retailer.id)}
                      disabled={processingId === retailer.id}
                      className="flex items-center space-x-1 px-3 py-2 border border-red-300 border-red-700 text-red-600 text-red-400 rounded-lg hover:bg-red-50 hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingId === retailer.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Retailers */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4">
          Active Retailers ({activeRetailers.length})
        </h2>
        {isLoading ? (
          <div className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 border-teal-400 mx-auto" />
            <p className="text-gray-600 text-gray-400 mt-4">Loading retailers...</p>
          </div>
        ) : activeRetailers.length === 0 ? (
          <div className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-12 text-center">
            <div className="p-4 bg-gray-100 bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Store className="w-8 h-8 text-gray-500 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-gray-50 mb-2">
              No Active Retailers Yet
            </h3>
            <p className="text-gray-600 text-gray-400">
              Approved retailers will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 divide-gray-700">
              <thead className="bg-gray-50 bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-gray-400 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-gray-400 uppercase tracking-wider">
                    Since
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 divide-gray-700">
                {activeRetailers.map((retailer) => (
                  <tr key={retailer.id} className="hover:bg-gray-50 hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 text-gray-50">
                        {retailer.businessName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 text-gray-50">{retailer.contactName}</div>
                      <div className="text-sm text-gray-500 text-gray-400">{retailer.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(retailer.status)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-gray-400">
                      {formatDate(retailer.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </OpsLayout>
  );
}
