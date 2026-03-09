'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { LogOut, Package, Repeat, Wallet } from 'lucide-react';
import type { CustomerPortalProps, Customer, Order, Subscription } from './customer-portal-types';

interface CustomerPortalResponse {
  customer: Customer;
  orders: Order[];
  subscriptions: Subscription[];
}

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
  }).format(value);
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
        <div className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
    </div>
  );
}

export function CustomerPortal({ onLogout }: CustomerPortalProps) {
  const t = useTranslations('auth.customer.portal');
  const locale = useLocale() === 'fr' ? 'fr-CA' : 'en-CA';
  const [data, setData] = useState<CustomerPortalResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortal = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/customer/portal');
      if (!response.ok) {
        throw new Error(t('loadFailed'));
      }

      const json = await response.json() as CustomerPortalResponse;
      setData(json);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : t('loadFailed'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void fetchPortal();
  }, [fetchPortal]);

  const activeSubscriptions = useMemo(
    () => data?.subscriptions.filter((subscription) => subscription.status === 'active').length ?? 0,
    [data]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400" />
      </div>
    );
  }

  if (!data?.customer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm dark:border-red-900/40 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('unableToLoadTitle')}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error ?? t('loadFailed')}</p>
        </div>
      </div>
    );
  }

  const { customer, orders, subscriptions } = data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {t('welcome').replace('{name}', customer.firstName || customer.email)}
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('logout')}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
            {error}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard label={t('summary.totalOrders')} value={String(customer.totalOrders)} icon={<Package className="h-5 w-5" />} />
          <SummaryCard label={t('summary.totalSpent')} value={formatCurrency(customer.totalSpent, locale)} icon={<Wallet className="h-5 w-5" />} />
          <SummaryCard label={t('summary.activeSubscriptions')} value={String(activeSubscriptions)} icon={<Repeat className="h-5 w-5" />} />
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('ordersTitle')}</h2>

              {orders.length === 0 ? (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{t('emptyOrders')}</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead>
                      <tr>
                        {[t('table.order'), t('table.date'), t('table.status'), t('table.total')].map((heading) => (
                          <th key={heading} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-3 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{order.orderNumber}</td>
                          <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">{formatDate(order.date, locale)}</td>
                          <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">{t(`statuses.${order.status}`)}</td>
                          <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">{formatCurrency(order.total, locale)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('subscriptionsTitle')}</h2>

              {subscriptions.length === 0 ? (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{t('emptySubscriptions')}</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {subscriptions.map((subscription) => (
                    <div key={subscription.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{subscription.productName}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {t('table.frequency')}: {t(`frequencies.${subscription.frequency}`)}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {t('table.nextDelivery')}: {formatDate(subscription.nextDelivery, locale)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('profileTitle')}</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-gray-500 dark:text-gray-400">{t('profile.email')}</dt>
                <dd className="text-gray-900 dark:text-gray-100">{customer.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">{t('profile.phone')}</dt>
                <dd className="text-gray-900 dark:text-gray-100">{customer.phone || t('profile.none')}</dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">{t('profile.address')}</dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {[customer.address.street, customer.address.city, customer.address.province, customer.address.postalCode]
                    .filter(Boolean)
                    .join(', ') || t('profile.none')}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">{t('profile.memberSince')}</dt>
                <dd className="text-gray-900 dark:text-gray-100">{formatDate(customer.memberSince, locale)}</dd>
              </div>
            </dl>
          </section>
        </section>
      </main>
    </div>
  );
}
