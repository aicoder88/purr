import { useState, useCallback } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Subscription } from './customer-portal-types';

interface SubscriptionsTabProps {
  subscriptions: Subscription[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  getStatusColor: (status: string) => string;
}

export function SubscriptionsTab({
  subscriptions,
  formatDate,
  formatCurrency,
  getStatusColor
}: SubscriptionsTabProps) {
  // Use subscriptions directly since parent manages the data
  // Local state only for optimistic updates during actions
  const [localSubscriptions, setLocalSubscriptions] = useState<Record<string, Partial<Subscription>>>({});
  const [loading, setLoading] = useState(false);

  // Merge local optimistic updates with props
  const subscriptionList = subscriptions.map(sub => ({
    ...sub,
    ...localSubscriptions[sub.id]
  }));

  const handleFrequencyChange = useCallback(async (subscriptionId: string, newFrequency: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setLocalSubscriptions(prev => ({
        ...prev,
        [subscriptionId]: {
          ...prev[subscriptionId],
          frequency: newFrequency as Subscription['frequency'],
          nextDelivery: calculateNextDelivery(newFrequency)
        }
      }));
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateNextDelivery = (frequency: string): string => {
    const now = new Date();
    switch (frequency) {
      case 'weekly':
        now.setDate(now.getDate() + 7);
        break;
      case 'bi-weekly':
        now.setDate(now.getDate() + 14);
        break;
      case 'monthly':
        now.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        now.setMonth(now.getMonth() + 3);
        break;
      default:
        now.setMonth(now.getMonth() + 1);
    }
    return now.toISOString().split('T')[0];
  };

  const handleFrequencyChangeCallback = useCallback((subscriptionId: string) => {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleFrequencyChange(subscriptionId, e.target.value);
    };
  }, [handleFrequencyChange]);

  const handleSubscriptionAction = useCallback(async (subscriptionId: string, action: 'pause' | 'resume' | 'cancel') => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setLocalSubscriptions(prev => ({
        ...prev,
        [subscriptionId]: {
          ...prev[subscriptionId],
          status: action === 'pause' ? 'paused' : action === 'resume' ? 'active' : 'cancelled'
        }
      }));

      if (typeof globalThis.window !== 'undefined' && window.gtag) {
        window.gtag('event', 'subscription_action', {
          event_category: 'subscription',
          event_label: action,
          subscription_id: subscriptionId
        });
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubscriptionPause = useCallback((subscriptionId: string) => {
    return () => handleSubscriptionAction(subscriptionId, 'pause');
  }, [handleSubscriptionAction]);

  const handleSubscriptionResume = useCallback((subscriptionId: string) => {
    return () => handleSubscriptionAction(subscriptionId, 'resume');
  }, [handleSubscriptionAction]);

  const handleSubscriptionCancel = useCallback((subscriptionId: string) => {
    return () => handleSubscriptionAction(subscriptionId, 'cancel');
  }, [handleSubscriptionAction]);



  return (
    <div className="space-y-6">
      {/* Subscription Summary */}
      <div className="bg-white bg-gray-800 rounded-lg shadow p-6">
        <h3 className="font-heading text-lg font-medium text-gray-900 text-gray-50 mb-4">Subscription Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 text-green-400">
              {subscriptionList.filter(s => s.status === 'active').length}
            </p>
            <p className="text-sm text-gray-500 text-gray-400">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 text-yellow-400">
              {subscriptionList.filter(s => s.status === 'paused').length}
            </p>
            <p className="text-sm text-gray-500 text-gray-400">Paused</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 text-gray-50">
              {formatCurrency(subscriptionList.filter(s => s.status === 'active').reduce((sum, s) => sum + s.price, 0))}
            </p>
            <p className="text-sm text-gray-500 text-gray-400">Monthly Total</p>
          </div>
        </div>
      </div>

      {/* Subscription List */}
      <div className="bg-white bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 border-gray-700">
          <h3 className="font-heading text-lg font-medium text-gray-900 text-gray-50">Your Subscriptions</h3>
        </div>
        <div className="p-6">
          {subscriptionList.length > 0 ? (
            <div className="space-y-6">
              {subscriptionList.map((subscription) => (
                <div key={subscription.id} className="border border-gray-200 border-gray-700 rounded-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 text-gray-50">{subscription.productName}</h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 text-gray-400">
                        <span>Quantity: {subscription.quantity}</span>
                        <span>Started: {formatDate(subscription.created)}</span>
                        <span>Last delivery: {formatDate(subscription.lastDelivery)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4 lg:mt-0">
                      <span className={cn('inline-flex px-3 py-1 text-sm font-medium rounded-full', getStatusColor(subscription.status))}>
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                      <p className="text-lg font-bold text-gray-900 text-gray-50">{formatCurrency(subscription.price)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 text-gray-50">Delivery Frequency</p>
                          <select
                            value={subscription.frequency}
                            onChange={handleFrequencyChangeCallback(subscription.id)}
                            disabled={loading || subscription.status === 'cancelled'}
                            className="mt-1 block w-full rounded-md border border-gray-300 border-gray-600 bg-white bg-gray-700 px-3 py-2 text-sm text-gray-900 text-gray-50 disabled:opacity-50"
                          >
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                          </select>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 text-gray-50">Next Delivery</p>
                          <p className="text-sm text-gray-500 text-gray-400 mt-1">{formatDate(subscription.nextDelivery)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {subscription.status === 'active' ? (
                        <button
                          onClick={handleSubscriptionPause(subscription.id)}
                          disabled={loading}
                          className="px-4 py-2 border border-gray-300 border-gray-600 text-gray-700 text-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : 'Pause'}
                        </button>
                      ) : subscription.status === 'paused' ? (
                        <button
                          onClick={handleSubscriptionResume(subscription.id)}
                          disabled={loading}
                          className="px-4 py-2 bg-green-600 text-white text-gray-100 text-sm font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : 'Resume'}
                        </button>
                      ) : null}

                      {subscription.status !== 'cancelled' && (
                        <button
                          onClick={handleSubscriptionCancel(subscription.id)}
                          disabled={loading}
                          className="px-4 py-2 bg-red-600 text-white text-gray-100 text-sm font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500 text-gray-400 mb-4">No subscriptions found</p>
              <button className="px-6 py-2 bg-blue-600 bg-blue-600 text-white text-gray-100 font-medium rounded-md hover:bg-blue-700 hover:bg-blue-500 transition-colors">
                Start a Subscription
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
