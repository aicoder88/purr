"use client";

import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocale, useMessages } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Boxes,
  Building2,
  LogOut,
  Package,
  RefreshCcw,
  TrendingUp,
  Truck,
} from 'lucide-react';
import {
  DEFAULT_RETAILER_SHIPPING_COST,
  RETAILER_SKU_CONFIG,
  RETAILER_SKU_ORDER,
  RetailerSkuId,
  calculateRetailerProfit,
} from '@/lib/retailer-profit';
import type { TranslationType } from '@/translations/types';
import { en as englishMessages } from '@/translations/en';

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
  actions: {
    placeFirstOrder: string;
    reorderNow: string;
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

const WHOLESALE_EMAIL = 'wholesale@purrify.ca';

const SKU_ACCENTS: Record<RetailerSkuId, {
  panel: string;
  glow: string;
  meter: string;
  icon: string;
}> = {
  trial: {
    panel: 'border-[#ffd3d3] bg-[#fff6f6]',
    glow: 'from-[#ffe2e2] via-[#fff7f7] to-white',
    meter: 'bg-[#FF3131]',
    icon: 'bg-[#ffe5e5] text-[#c92727]',
  },
  medium: {
    panel: 'border-[#d8ccff] bg-[#f7f3ff]',
    glow: 'from-[#ede5ff] via-[#faf8ff] to-white',
    meter: 'bg-[#5B2EFF]',
    icon: 'bg-[#ebe3ff] text-[#4a26cc]',
  },
  large: {
    panel: 'border-[#d4e7ff] bg-[#f5faff]',
    glow: 'from-[#e4f0ff] via-[#f8fbff] to-white',
    meter: 'bg-[#3694FF]',
    icon: 'bg-[#e8f2ff] text-[#256fcc]',
  },
};

function getOrderStatusClasses(status: string): string {
  switch (status) {
    case 'DELIVERED':
      return 'border-[#ffd1e5] bg-[#fff3f9] text-[#cc246c]';
    case 'SHIPPED':
    case 'PROCESSING':
      return 'border-[#d4e7ff] bg-[#f4f9ff] text-[#256fcc]';
    case 'PAID':
      return 'border-[#d8ccff] bg-[#f7f3ff] text-[#4a26cc]';
    case 'CANCELLED':
    case 'REFUNDED':
      return 'border-[#ffd3d3] bg-[#fff3f3] text-[#c92727]';
    default:
      return 'border-[#eadffb] bg-[#faf7ff] text-[#5B2EFF]';
  }
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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6255]">
        {label}
      </span>
      <input
        type="number"
        min={min}
        step={step}
        inputMode="decimal"
        value={value}
        onChange={(event) => {
          const nextValue = Number.parseFloat(event.target.value);
          onChange(Number.isFinite(nextValue) ? Math.max(min, nextValue) : min);
        }}
        className="w-full rounded-[20px] border border-[#e6ddcf] bg-white px-4 py-3 text-base font-medium text-[#1f1f1f] shadow-[0_16px_40px_rgba(51,51,51,0.06)] outline-none transition focus:border-[#FF2D87] focus:ring-4 focus:ring-[#ffd6e8]"
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
    <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-white/8 p-3.5 shadow-[0_14px_32px_rgba(0,0,0,0.14)] backdrop-blur">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="max-w-[8rem] text-[10px] font-semibold uppercase tracking-[0.18em] text-white/62 sm:max-w-[9rem]">
          {label}
        </span>
        <div className="rounded-xl bg-white/10 p-1.5 text-[#ff9bc5]">
          {icon}
        </div>
      </div>
      <div className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {value}
      </div>
    </div>
  );
}

function ScenarioMetric({
  label,
  value,
  accentClassName,
}: {
  label: string;
  value: string;
  accentClassName: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#eadfd2] bg-white/90 p-4 shadow-[0_20px_40px_rgba(51,51,51,0.08)]">
      <div className={`mb-3 h-1.5 w-14 rounded-full ${accentClassName}`} />
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#666a5f]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-[#1f1f1f]">
        {value}
      </div>
    </div>
  );
}

export default function DashboardContent() {
  const locale = useLocale();
  const messages = useMessages() as TranslationType;
  const router = useRouter();
  const copy = (messages.retailers?.portal ?? englishMessages.retailers.portal) as unknown as PortalCopy;
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
      const response = await fetch('/api/retailer/portal/dashboard/', {
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

  const freeShippingProgress = useMemo(() => {
    const completed = RETAILER_SKU_ORDER.reduce((total, skuId) => (
      total + Math.min(5, Math.max(0, quantities[skuId]))
    ), 0);

    return (completed / (RETAILER_SKU_ORDER.length * 5)) * 100;
  }, [quantities]);

  const retailer = dashboard?.retailer ?? fallbackRetailer;
  const summary = dashboard?.summary ?? {
    totalOrders: 0,
    lifetimeSpend: 0,
    lastOrderAt: null,
  };
  const recentOrders = dashboard?.recentOrders ?? [];
  const hasOrders = summary.totalOrders > 0;
  const orderCtaLabel = hasOrders ? copy.actions.reorderNow : copy.actions.placeFirstOrder;
  const orderCtaHref = `mailto:${WHOLESALE_EMAIL}?subject=${encodeURIComponent(
    hasOrders ? 'Purrify wholesale reorder' : 'Purrify first wholesale order'
  )}`;

  const freeShippingMessage = calculatorResult.qualifiesForFreeShipping
    ? copy.calculator.freeShippingUnlocked
    : copy.calculator.freeShippingLocked
      .replace('{trial}', String(calculatorResult.remainingBoxesForFreeShipping.trial))
      .replace('{medium}', String(calculatorResult.remainingBoxesForFreeShipping.medium))
      .replace('{large}', String(calculatorResult.remainingBoxesForFreeShipping.large));

  if (isLoading && !retailer) {
    return (
      <div className="min-h-screen bg-[#fffdf8] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[34px] border border-[#eadfd2] bg-[linear-gradient(135deg,#fffdf8_0%,#fff3f3_42%,#f5f2ff_72%,#f4f9ff_100%)] p-12 text-center shadow-[0_35px_100px_rgba(51,51,51,0.12)]">
          <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-[#ffd6e8] border-t-[#FF2D87]" />
          <p className="text-base font-medium text-[#4f4a45]">{copy.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffdf8] px-4 py-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-5rem] h-[20rem] w-[20rem] rounded-full bg-[#ffd6d6]/70 blur-3xl" />
        <div className="absolute right-[-6rem] top-[8rem] h-[18rem] w-[18rem] rounded-full bg-[#e8dcff]/80 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[18rem] w-[18rem] rounded-full bg-[#dcecff]/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-5">
        <section className="relative overflow-hidden rounded-[36px] border border-[#26155f] bg-[linear-gradient(135deg,#120933_0%,#2a146f_36%,#5B2EFF_68%,#FF3131_100%)] text-white shadow-[0_40px_120px_rgba(18,9,51,0.34)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,45,135,0.24),transparent_28%)]" />
          <div className="absolute right-[-2rem] top-[-3rem] h-52 w-52 rounded-full border border-white/10" />
          <div className="absolute bottom-[-5rem] left-1/3 h-44 w-44 rounded-full border border-white/10" />

          <div className="relative p-4 sm:p-5">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-white/14 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/78">
                  <Building2 className="mr-2 h-4 w-4" />
                  {copy.title}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (authToken) {
                      fetchDashboard(authToken);
                    }
                  }}
                  disabled={!authToken || isLoading}
                  className="inline-flex items-center rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/16 disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="inline-flex items-center rounded-full bg-[#fff6f9] px-4 py-2 text-sm font-semibold text-[#33091B] transition hover:bg-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {copy.logout}
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
              <div className="space-y-3">
                <div className="max-w-xl">
                  <h1 className="max-w-3xl font-heading text-[2rem] font-black leading-none tracking-[-0.05em] text-white sm:text-[2.35rem] lg:text-[2.8rem]">
                    {retailer?.businessName || copy.title}
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-5 text-[#d6e8de] sm:text-[15px] sm:leading-6">
                    {copy.subtitle}
                  </p>
                </div>

                {error ? (
                  <div className="rounded-[20px] border border-[#ffe1a8]/50 bg-[#fff1cb]/14 px-4 py-3 text-sm text-[#fff4dd]">
                    {error}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <SummaryCard
                  label={copy.summary.totalOrders}
                  value={summary.totalOrders.toLocaleString(localeCode)}
                  icon={<Package className="h-4 w-4" />}
                />
                <SummaryCard
                  label={copy.summary.lifetimeSpend}
                  value={currencyFormatter.format(summary.lifetimeSpend)}
                  icon={<TrendingUp className="h-4 w-4" />}
                />
                <SummaryCard
                  label={copy.summary.lastOrder}
                  value={summary.lastOrderAt ? dateFormatter.format(new Date(summary.lastOrderAt)) : copy.summary.noOrders}
                  icon={<Truck className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <div className="rounded-[34px] border border-[#eadfd2] bg-[linear-gradient(180deg,#fffdf8_0%,#fff6f6_48%,#f7f3ff_100%)] p-5 shadow-[0_30px_90px_rgba(51,51,51,0.08)] sm:p-6">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-[#d8d1bf] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6255]">
                {copy.calculator.badge}
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black tracking-[-0.04em] text-[#10231c] sm:text-4xl">
                {copy.calculator.title}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#556156]">
                {copy.calculator.description}
              </p>
            </div>

            <div className="mt-8 rounded-[28px] border border-[#eadfd2] bg-white/85 p-5 shadow-[0_20px_40px_rgba(51,51,51,0.05)]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5f6255]">
                {copy.calculator.inputsTitle}
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <NumberField
                  label={copy.calculator.shippingLabel}
                  value={shippingCost}
                  step={0.01}
                  onChange={setShippingCost}
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#677063]">
                {copy.calculator.shippingHelp}
              </p>
            </div>

            <div className="mt-6 grid gap-5">
              {RETAILER_SKU_ORDER.map((skuId) => {
                const config = RETAILER_SKU_CONFIG[skuId];
                const skuCopy = copy.products[skuId];
                const productResult = calculatorResult.perSku[skuId];
                const progress = Math.min(100, (quantities[skuId] / 5) * 100);
                const accent = SKU_ACCENTS[skuId];

                return (
                  <div
                    key={skuId}
                    className={`overflow-hidden rounded-[28px] border p-5 shadow-[0_20px_45px_rgba(51,51,51,0.05)] ${accent.panel}`}
                  >
                    <div className={`rounded-[22px] bg-gradient-to-r p-5 ${accent.glow}`}>
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-md">
                          <div className="flex items-center gap-3">
                            <div className={`rounded-2xl p-3 ${accent.icon}`}>
                              <Boxes className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-heading text-2xl font-bold tracking-[-0.03em] text-[#10231c]">
                                {skuCopy.label}
                              </h3>
                              <div className="mt-1 text-sm text-[#556156]">
                                {skuCopy.unitsPerBox.replace('{count}', String(config.unitsPerBox))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 grid gap-2 text-sm text-[#556156] sm:grid-cols-2">
                            <div>{skuCopy.boxCostLabel.replace('{value}', currencyFormatter.format(config.defaultBoxCost))}</div>
                            <div>{skuCopy.unitCostLabel.replace('{value}', currencyFormatter.format(config.defaultUnitCost))}</div>
                          </div>
                        </div>

                        <div className="min-w-[12rem] rounded-[22px] border border-white/70 bg-white/80 p-4">
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#697062]">
                            {copy.calculator.metrics.netProfit}
                          </div>
                          <div className="mt-2 text-3xl font-semibold tracking-tight text-[#FF2D87]">
                            {currencyFormatter.format(productResult.profit)}
                          </div>
                          <div className="mt-2 text-sm text-[#556156]">
                            {productResult.marginPercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
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

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#697062]">
                          <span>{copy.calculator.tableHeaders.boxes}</span>
                          <span>{Math.min(5, Math.max(0, quantities[skuId]))}/5</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-white/80">
                          <div
                            className={`h-full rounded-full transition-[width] duration-500 ${accent.meter}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <section className="sticky top-6 overflow-hidden rounded-[34px] border border-[#eadfd2] bg-[linear-gradient(180deg,#fffaf8_0%,#fff3f8_50%,#f4f7ff_100%)] p-6 shadow-[0_30px_90px_rgba(51,51,51,0.08)] sm:p-8">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ffc1dd] to-transparent" />
              <div className="relative">
                <div className="inline-flex items-center rounded-full border border-[#c7d9cb] bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#345441]">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {copy.calculator.currentScenario}
                </div>

                <div className="mt-5 rounded-[28px] bg-[#10231c] p-6 text-white shadow-[0_30px_90px_rgba(16,35,28,0.22)]">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/64">
                    {copy.calculator.metrics.netProfit}
                  </div>
                  <div className="mt-3 text-5xl font-black tracking-[-0.05em] text-[#FF8BC0]">
                    {currencyFormatter.format(calculatorResult.totalProfit)}
                  </div>
                  <div className="mt-4 h-2.5 rounded-full bg-white/12">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#FF3131_0%,#FF2D87_52%,#5B2EFF_100%)] transition-[width] duration-500"
                      style={{ width: `${Math.min(100, Math.max(10, freeShippingProgress))}%` }}
                    />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#dceae2]">
                    {freeShippingMessage}
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <ScenarioMetric
                    label={copy.calculator.metrics.revenue}
                    value={currencyFormatter.format(calculatorResult.totalRevenue)}
                    accentClassName="bg-[#FF3131]"
                  />
                  <ScenarioMetric
                    label={copy.calculator.metrics.landedCost}
                    value={currencyFormatter.format(calculatorResult.totalCost)}
                    accentClassName="bg-[#5B2EFF]"
                  />
                  <ScenarioMetric
                    label={copy.calculator.metrics.netProfit}
                    value={currencyFormatter.format(calculatorResult.totalProfit)}
                    accentClassName="bg-[#FF2D87]"
                  />
                  <ScenarioMetric
                    label={copy.calculator.metrics.margin}
                    value={`${calculatorResult.marginPercent.toFixed(2)}%`}
                    accentClassName="bg-[#10231c]"
                  />
                </div>

                <div className="mt-5 rounded-[26px] border border-[#d8d1bf] bg-white/85 p-5">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#667062]">
                    <span className="rounded-full bg-[#f3ebff] px-3 py-1 text-[#5B2EFF]">{copy.graph.legend.cost}</span>
                    <span className="rounded-full bg-[#fff0f6] px-3 py-1 text-[#FF2D87]">{copy.graph.legend.profit}</span>
                    <span className="rounded-full bg-[#fff1f1] px-3 py-1 text-[#FF3131]">{copy.graph.legend.revenue}</span>
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold tracking-[-0.03em] text-[#10231c]">
                    {copy.graph.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#667062]">
                    {copy.graph.description}
                  </p>

                  <div className="mt-6 h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} barGap={12}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d7ddd3" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#566056', fontSize: 12, fontWeight: 600 }}
                        />
                        <YAxis
                          tickFormatter={(value) => currencyFormatter.format(Number(value))}
                          tickLine={false}
                          axisLine={false}
                          width={92}
                          tick={{ fill: '#566056', fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(value: number | string) => currencyFormatter.format(Number(value))}
                          contentStyle={{
                            borderRadius: 18,
                            border: '1px solid #d8d1bf',
                            backgroundColor: '#fffdf7',
                            boxShadow: '0 18px 50px rgba(16,35,28,0.12)',
                          }}
                        />
                        <Bar dataKey="cost" radius={[12, 12, 0, 0]} fill="#5B2EFF" />
                        <Bar dataKey="profit" radius={[12, 12, 0, 0]} fill="#FF2D87" />
                        <Bar dataKey="revenue" radius={[12, 12, 0, 0]} fill="#FF3131" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <Link
                  href={orderCtaHref}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#FF2D87] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e22779]"
                >
                  {orderCtaLabel}
                </Link>
              </div>
            </section>
          </div>
        </section>

        <section className="rounded-[34px] border border-[#eadfd2] bg-white/90 p-6 shadow-[0_30px_90px_rgba(51,51,51,0.08)] sm:p-8">
          <div className="flex flex-col gap-3 border-b border-[#e7e1d2] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#697062]">
                {copy.calculator.badge}
              </div>
              <h2 className="mt-2 font-heading text-3xl font-black tracking-[-0.04em] text-[#10231c]">
                {copy.calculator.tableTitle}
              </h2>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[26px] border border-[#e1dac9]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#ebe4d5]">
                <thead className="bg-[#f8f4ea]">
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
                        className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#697062]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebe4d5] bg-white">
                  {RETAILER_SKU_ORDER.map((skuId) => {
                    const row = calculatorResult.perSku[skuId];
                    return (
                      <tr key={skuId} className="transition hover:bg-[#fcfaf4]">
                        <td className="px-4 py-4">
                          <div className="font-semibold text-[#10231c]">{copy.products[skuId].label}</div>
                          <div className="mt-1 text-sm text-[#667062]">
                            {copy.products[skuId].unitsPerBox.replace('{count}', String(RETAILER_SKU_CONFIG[skuId].unitsPerBox))}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-[#435347]">{row.boxes}</td>
                        <td className="px-4 py-4 text-[#435347]">{row.units}</td>
                        <td className="px-4 py-4 text-[#435347]">{currencyFormatter.format(row.revenue)}</td>
                        <td className="px-4 py-4 text-[#435347]">
                          {currencyFormatter.format(row.cost + row.shippingShare)}
                        </td>
                        <td className="px-4 py-4 font-semibold text-[#FF2D87]">
                          {currencyFormatter.format(row.profit)}
                        </td>
                        <td className="px-4 py-4 text-[#435347]">{row.marginPercent.toFixed(2)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="rounded-[34px] border border-[#eadfd2] bg-[linear-gradient(180deg,#fffdf8_0%,#fff6f6_48%,#f8f5ff_100%)] p-6 shadow-[0_30px_90px_rgba(51,51,51,0.08)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#697062]">
                {copy.summary.totalOrders}
              </div>
              <h2 className="mt-2 font-heading text-3xl font-black tracking-[-0.04em] text-[#10231c]">
                {copy.recentOrders.title}
              </h2>
            </div>
            <Link
              href={orderCtaHref}
              className="inline-flex items-center justify-center rounded-full border border-[#ffb9d8] bg-white px-4 py-2.5 text-sm font-semibold text-[#c22770] transition hover:border-[#FF2D87] hover:text-[#a31d5e]"
            >
              {orderCtaLabel}
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="mt-6 rounded-[26px] border border-dashed border-[#cec4af] bg-white/70 px-6 py-12 text-center text-[#677063]">
              <p>{copy.recentOrders.empty}</p>
              <Link
                href={orderCtaHref}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#FF2D87] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e22779]"
              >
                {orderCtaLabel}
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4 lg:hidden">
                {recentOrders.map((order) => (
                  <article
                    key={order.id}
                    className="rounded-[24px] border border-[#e1dac9] bg-white p-5 shadow-[0_20px_40px_rgba(16,35,28,0.06)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#697062]">
                          {copy.recentOrders.columns.order}
                        </div>
                        <div className="mt-2 text-xl font-semibold text-[#10231c]">
                          {order.orderNumber}
                        </div>
                      </div>
                      <div className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${getOrderStatusClasses(order.status)}`}>
                        {copy.statuses[order.status] || order.status}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#697062]">
                          {copy.recentOrders.columns.date}
                        </div>
                        <div className="mt-1 text-sm text-[#435347]">
                          {dateFormatter.format(new Date(order.createdAt))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#697062]">
                          {copy.recentOrders.columns.boxes}
                        </div>
                        <div className="mt-1 text-sm text-[#435347]">
                          {order.boxCount}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#697062]">
                          {copy.recentOrders.columns.total}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-[#10231c]">
                          {currencyFormatter.format(order.totalAmount)}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 hidden overflow-hidden rounded-[26px] border border-[#e1dac9] lg:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#ebe4d5]">
                    <thead className="bg-[#f8f4ea]">
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
                            className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#697062]"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ebe4d5] bg-white">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="transition hover:bg-[#fcfaf4]">
                          <td className="px-4 py-4 font-semibold text-[#10231c]">{order.orderNumber}</td>
                          <td className="px-4 py-4">
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${getOrderStatusClasses(order.status)}`}>
                              {copy.statuses[order.status] || order.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-[#435347]">
                            {dateFormatter.format(new Date(order.createdAt))}
                          </td>
                          <td className="px-4 py-4 text-[#435347]">{order.boxCount}</td>
                          <td className="px-4 py-4 font-semibold text-[#10231c]">
                            {currencyFormatter.format(order.totalAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </section>

        {retailer ? (
          <section className="rounded-[30px] border border-[#eadfd2] bg-white/80 p-5 shadow-[0_20px_60px_rgba(51,51,51,0.06)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <div className="rounded-full border border-[#eadfd2] bg-[#fff6f9] px-3 py-1.5 text-sm text-[#4f4a45]">
                  {retailer.contactName}
                </div>
                <div className="rounded-full border border-[#eadfd2] bg-[#f7f3ff] px-3 py-1.5 text-sm text-[#4f4a45]">
                  {retailer.email}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearRetailerSession();
                  router.replace('/retailer/portal/login');
                }}
                className="inline-flex items-center justify-center rounded-full border border-[#eadfd2] bg-white px-4 py-2 text-sm font-semibold text-[#5B2EFF] transition hover:border-[#5B2EFF] hover:text-[#4a26cc]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {copy.logout}
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
