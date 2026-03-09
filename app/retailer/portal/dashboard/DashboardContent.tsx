"use client";

import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Building2, LogOut, Package, RefreshCcw, TrendingUp, Truck } from 'lucide-react';
import {
  DEFAULT_RETAILER_SHIPPING_COST,
  RETAILER_SKU_CONFIG,
  RETAILER_SKU_ORDER,
  RetailerSkuId,
  calculateRetailerProfit,
} from '@/lib/retailer-profit';

interface RetailerSummary {
  totalOrders: number;
  lifetimeSpend: number;
  lastOrderAt: string | null;
}

interface RetailerOrderRow {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  subtotal: number;
  shipping: number;
  boxCount: number;
}

interface RetailerDashboardResponse {
  retailer: {
    id: string;
    businessName: string;
    contactName: string;
    email: string;
    status: string;
    createdAt: string;
    lastLoginAt: string | null;
  };
  summary: RetailerSummary;
  recentOrders: RetailerOrderRow[];
}

interface PortalCopy {
  title: string;
  subtitle: string;
  loading: string;
  refresh: string;
  logout: string;
  errors: {
    loadFailed: string;
    sessionExpired: string;
  };
  summary: {
    totalOrders: string;
    lifetimeSpend: string;
    lastOrder: string;
    noOrders: string;
  };
  calculator: {
    badge: string;
    title: string;
    description: string;
    shippingLabel: string;
    shippingHelp: string;
    freeShippingUnlocked: string;
    freeShippingLocked: string;
    inputsTitle: string;
    currentScenario: string;
    tableTitle: string;
    tableHeaders: {
      product: string;
      boxes: string;
      units: string;
      revenue: string;
      cost: string;
      profit: string;
      margin: string;
    };
    metrics: {
      revenue: string;
      landedCost: string;
      netProfit: string;
      margin: string;
    };
  };
  graph: {
    title: string;
    description: string;
    legend: {
      revenue: string;
      cost: string;
      profit: string;
    };
  };
  recentOrders: {
    title: string;
    empty: string;
    columns: {
      order: string;
      status: string;
      date: string;
      boxes: string;
      total: string;
    };
  };
  products: Record<RetailerSkuId, {
    label: string;
    unitsPerBox: string;
    boxesLabel: string;
    sellPriceLabel: string;
    unitCostLabel: string;
    boxCostLabel: string;
  }>;
  statuses: Record<string, string>;
}

function NumberField({
  label,
  value,
  min = 0,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(event) => {
          const nextValue = Number.parseFloat(event.target.value);
          onChange(Number.isFinite(nextValue) ? Math.max(min, nextValue) : min);
        }}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-emerald-900/40"
      />
    </label>
  );
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
        <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
    </div>
  );
}

export default function DashboardContent() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const copy = t.raw('retailers.portal') as PortalCopy;
  const localeCode = locale === 'fr' ? 'fr-CA' : 'en-CA';

  const currencyFormatter = useMemo(() => new Intl.NumberFormat(localeCode, {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
  }), [localeCode]);

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(localeCode, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }), [localeCode]);

  const [authToken, setAuthToken] = useState<string | null>(null);
  const [fallbackRetailer, setFallbackRetailer] = useState<RetailerDashboardResponse['retailer'] | null>(null);
  const [dashboard, setDashboard] = useState<RetailerDashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [quantities, setQuantities] = useState<Record<RetailerSkuId, number>>({
    trial: 1,
    medium: 1,
    large: 1,
  });
  const [sellPrices, setSellPrices] = useState<Record<RetailerSkuId, number>>({
    trial: RETAILER_SKU_CONFIG.trial.defaultSellPrice,
    medium: RETAILER_SKU_CONFIG.medium.defaultSellPrice,
    large: RETAILER_SKU_CONFIG.large.defaultSellPrice,
  });
  const [shippingCost, setShippingCost] = useState(DEFAULT_RETAILER_SHIPPING_COST);

  const clearRetailerSession = useCallback(() => {
    localStorage.removeItem('retailerToken');
    localStorage.removeItem('retailerInfo');
  }, []);

  const fetchDashboard = useCallback(async (token: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/retailer/portal/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        clearRetailerSession();
        router.replace('/retailer/portal/login');
        return;
      }

      if (!response.ok) {
        throw new Error(copy.errors.loadFailed);
      }

      const json = await response.json() as RetailerDashboardResponse;
      setDashboard(json);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : copy.errors.loadFailed);
    } finally {
      setIsLoading(false);
    }
  }, [clearRetailerSession, copy.errors.loadFailed, router]);

  useEffect(() => {
    const token = localStorage.getItem('retailerToken');
    const retailerInfo = localStorage.getItem('retailerInfo');

    if (retailerInfo) {
      try {
        const parsedRetailer = JSON.parse(retailerInfo) as RetailerDashboardResponse['retailer'];
        setFallbackRetailer(parsedRetailer);
      } catch {
        localStorage.removeItem('retailerInfo');
      }
    }

    if (!token) {
      router.replace('/retailer/portal/login');
      return;
    }

    setAuthToken(token);
    fetchDashboard(token);
  }, [fetchDashboard, router]);

  const calculatorResult = useMemo(() => calculateRetailerProfit({
    quantities,
    sellPrices,
    shippingCost,
  }), [quantities, sellPrices, shippingCost]);

  const chartData = useMemo(() => RETAILER_SKU_ORDER.map((skuId) => ({
    name: copy.products[skuId].label,
    revenue: calculatorResult.perSku[skuId].revenue,
    cost: calculatorResult.perSku[skuId].cost + calculatorResult.perSku[skuId].shippingShare,
    profit: calculatorResult.perSku[skuId].profit,
  })), [calculatorResult.perSku, copy.products]);

  const retailer = dashboard?.retailer ?? fallbackRetailer;
  const summary = dashboard?.summary ?? {
    totalOrders: 0,
    lifetimeSpend: 0,
    lastOrderAt: null,
  };
  const recentOrders = dashboard?.recentOrders ?? [];

  const freeShippingMessage = calculatorResult.qualifiesForFreeShipping
    ? copy.calculator.freeShippingUnlocked
    : copy.calculator.freeShippingLocked
      .replace('{trial}', String(calculatorResult.remainingBoxesForFreeShipping.trial))
      .replace('{medium}', String(calculatorResult.remainingBoxesForFreeShipping.medium))
      .replace('{large}', String(calculatorResult.remainingBoxesForFreeShipping.large));

  if (isLoading && !retailer) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_45%),linear-gradient(180deg,#f7f7f5_0%,#ffffff_100%)] px-4 py-20 dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_40%),linear-gradient(180deg,#0f172a_0%,#020617_100%)]">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/60 bg-white/80 p-12 text-center shadow-2xl backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600 dark:border-emerald-900 dark:border-t-emerald-400" />
          <p className="text-base text-gray-600 dark:text-gray-300">{copy.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_45%),linear-gradient(180deg,#f7f7f5_0%,#ffffff_100%)] px-4 py-8 dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_40%),linear-gradient(180deg,#0f172a_0%,#020617_100%)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="overflow-hidden rounded-[32px] border border-white/60 bg-white/85 p-8 shadow-2xl backdrop-blur dark:border-gray-800 dark:bg-gray-950/85">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <Building2 className="mr-2 h-4 w-4" />
                {copy.title}
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                {retailer?.businessName || copy.title}
              </h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                {copy.subtitle}
              </p>
              {retailer && (
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <div>{retailer.contactName}</div>
                  <div>{retailer.email}</div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  if (authToken) {
                    fetchDashboard(authToken);
                  }
                }}
                disabled={!authToken || isLoading}
                className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-emerald-700 dark:hover:text-emerald-300"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                {copy.refresh}
              </button>
              <button
                type="button"
                onClick={() => {
                  clearRetailerSession();
                  router.replace('/retailer/portal/login');
                }}
                className="inline-flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {copy.logout}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
              {error}
            </div>
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            label={copy.summary.totalOrders}
            value={summary.totalOrders.toLocaleString(localeCode)}
            icon={<Package className="h-5 w-5" />}
          />
          <SummaryCard
            label={copy.summary.lifetimeSpend}
            value={currencyFormatter.format(summary.lifetimeSpend)}
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <SummaryCard
            label={copy.summary.lastOrder}
            value={summary.lastOrderAt ? dateFormatter.format(new Date(summary.lastOrderAt)) : copy.summary.noOrders}
            icon={<Truck className="h-5 w-5" />}
          />
        </section>

        <section className="rounded-[32px] border border-white/60 bg-white/85 p-8 shadow-xl backdrop-blur dark:border-gray-800 dark:bg-gray-950/85">
          <div className="mb-8 max-w-3xl">
            <div className="mb-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {copy.calculator.badge}
            </div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
              {copy.calculator.title}
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              {copy.calculator.description}
            </p>
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-900/70">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {copy.calculator.inputsTitle}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <NumberField
                    label={copy.calculator.shippingLabel}
                    value={shippingCost}
                    step={0.01}
                    onChange={setShippingCost}
                  />
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  {copy.calculator.shippingHelp}
                </p>
              </div>

              <div className="grid gap-5 xl:grid-cols-3">
                {RETAILER_SKU_ORDER.map((skuId) => {
                  const config = RETAILER_SKU_CONFIG[skuId];
                  const skuCopy = copy.products[skuId];
                  return (
                    <div
                      key={skuId}
                      className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="mb-5">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {skuCopy.label}
                        </h3>
                        <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                          <div>{skuCopy.unitsPerBox.replace('{count}', String(config.unitsPerBox))}</div>
                          <div>{skuCopy.boxCostLabel.replace('{value}', currencyFormatter.format(config.defaultBoxCost))}</div>
                          <div>{skuCopy.unitCostLabel.replace('{value}', currencyFormatter.format(config.defaultUnitCost))}</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <NumberField
                          label={skuCopy.boxesLabel}
                          value={quantities[skuId]}
                          onChange={(value) => {
                            setQuantities((current) => ({
                              ...current,
                              [skuId]: Math.floor(value),
                            }));
                          }}
                        />
                        <NumberField
                          label={skuCopy.sellPriceLabel}
                          value={sellPrices[skuId]}
                          step={0.01}
                          onChange={(value) => {
                            setSellPrices((current) => ({
                              ...current,
                              [skuId]: value,
                            }));
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                <TrendingUp className="h-4 w-4" />
                {copy.calculator.currentScenario}
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/80 p-4 dark:bg-gray-950/80">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{copy.calculator.metrics.revenue}</div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                    {currencyFormatter.format(calculatorResult.totalRevenue)}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 dark:bg-gray-950/80">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{copy.calculator.metrics.landedCost}</div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                    {currencyFormatter.format(calculatorResult.totalCost)}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 dark:bg-gray-950/80">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{copy.calculator.metrics.netProfit}</div>
                  <div className="mt-1 text-3xl font-semibold text-emerald-700 dark:text-emerald-300">
                    {currencyFormatter.format(calculatorResult.totalProfit)}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 dark:bg-gray-950/80">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{copy.calculator.metrics.margin}</div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                    {calculatorResult.marginPercent.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-200 bg-white/70 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200">
                {freeShippingMessage}
              </div>
            </div>
          </div>

          <div className="mb-8 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800">
            <div className="border-b border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {copy.calculator.tableTitle}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-white dark:bg-gray-950">
                  <tr>
                    {[
                      copy.calculator.tableHeaders.product,
                      copy.calculator.tableHeaders.boxes,
                      copy.calculator.tableHeaders.units,
                      copy.calculator.tableHeaders.revenue,
                      copy.calculator.tableHeaders.cost,
                      copy.calculator.tableHeaders.profit,
                      copy.calculator.tableHeaders.margin,
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
                  {RETAILER_SKU_ORDER.map((skuId) => {
                    const row = calculatorResult.perSku[skuId];
                    return (
                      <tr key={skuId}>
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                          {copy.products[skuId].label}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.boxes}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.units}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{currencyFormatter.format(row.revenue)}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                          {currencyFormatter.format(row.cost + row.shippingShare)}
                        </td>
                        <td className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-300">
                          {currencyFormatter.format(row.profit)}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.marginPercent.toFixed(2)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {copy.graph.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {copy.graph.description}
            </p>
            <div className="mt-6 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={12}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.25} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis
                    tickFormatter={(value) => currencyFormatter.format(Number(value))}
                    tickLine={false}
                    axisLine={false}
                    width={90}
                  />
                  <Tooltip
                    formatter={(value: number | string) => currencyFormatter.format(Number(value))}
                    contentStyle={{
                      borderRadius: 16,
                      borderColor: 'rgba(16,24,40,0.08)',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name={copy.graph.legend.revenue} radius={[10, 10, 0, 0]} fill="#0f766e" />
                  <Bar dataKey="cost" name={copy.graph.legend.cost} radius={[10, 10, 0, 0]} fill="#f59e0b" />
                  <Bar dataKey="profit" name={copy.graph.legend.profit} radius={[10, 10, 0, 0]} fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/60 bg-white/85 p-8 shadow-xl backdrop-blur dark:border-gray-800 dark:bg-gray-950/85">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {copy.recentOrders.title}
          </h2>

          {recentOrders.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 px-6 py-10 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
              {copy.recentOrders.empty}
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr>
                    {[
                      copy.recentOrders.columns.order,
                      copy.recentOrders.columns.status,
                      copy.recentOrders.columns.date,
                      copy.recentOrders.columns.boxes,
                      copy.recentOrders.columns.total,
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{order.orderNumber}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {copy.statuses[order.status] || order.status}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {dateFormatter.format(new Date(order.createdAt))}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{order.boxCount}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {currencyFormatter.format(order.totalAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
