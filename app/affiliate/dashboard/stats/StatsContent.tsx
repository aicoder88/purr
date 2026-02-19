"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AffiliateLayout from '@/components/affiliate/AffiliateLayout';
import { PerformanceChart } from '@/components/affiliate/PerformanceChart';
import { useTranslation } from '@/lib/translation-context';
import {
    MousePointer,
    ShoppingCart,
    DollarSign,
    Calendar,
    TrendingUp,
    TrendingDown
} from 'lucide-react';

interface DailyData {
    date: string;
    clicks: number;
    conversions: number;
    earnings: number;
}

interface ChartDataResponse {
    chartData: DailyData[];
    totals: {
        clicks: number;
        conversions: number;
        earnings: number;
    };
    period: {
        start: string;
        end: string;
        days: number;
    };
}

interface ConversionItem {
    id: string;
    orderId: string;
    orderSubtotal: number;
    commissionAmount: number;
    status: string;
    purchasedAt: string;
}

interface ConversionsResponse {
    conversions: ConversionItem[];
    summary: {
        totalConversions: number;
        totalOrderValue: number;
        totalCommission: number;
    };
    statusBreakdown: Record<string, number>;
    pagination: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
    };
}

function SummaryCard({
    title,
    value,
    icon,
    change,
    format = 'number',
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    change?: number;
    format?: 'number' | 'currency' | 'percentage';
}) {
    const formatValue = (val: number) => {
        switch (format) {
            case 'currency':
                return `$${val.toFixed(2)}`;
            case 'percentage':
                return `${val.toFixed(1)}%`;
            default:
                return val.toLocaleString();
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{title}</span>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    {icon}
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatValue(value)}
            </p>
            {change !== undefined && (
                <div className="flex items-center mt-1">
                    {change > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 mr-1" />
                    ) : change < 0 ? (
                        <TrendingDown className="w-4 h-4 text-red-500 dark:text-red-400 mr-1" />
                    ) : null}
                    <span
                        className={`text-sm ${change > 0
                                ? 'text-green-600 dark:text-green-400'
                                : change < 0
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        {change > 0 ? '+' : ''}
                        {change}% from period avg
                    </span>
                </div>
            )}
        </div>
    );
}

export default function StatsContent() {
    const { t } = useTranslation();
    const router = useRouter();
    const [chartData, setChartData] = useState<ChartDataResponse | null>(null);
    const [conversions, setConversions] = useState<ConversionsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<'7' | '30' | '90'>('30');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [chartRes, conversionsRes] = await Promise.all([
                fetch(`/api/affiliate/dashboard/chart-data?days=${dateRange}`),
                fetch('/api/affiliate/dashboard/conversions?limit=10'),
            ]);

            if (!chartRes.ok || !conversionsRes.ok) {
                if (chartRes.status === 401 || conversionsRes.status === 401) {
                    router.push('/affiliate/login');
                    return;
                }
                throw new Error('Failed to fetch data');
            }

            const [chartJson, conversionsJson] = await Promise.all([
                chartRes.json(),
                conversionsRes.json(),
            ]);

            setChartData(chartJson);
            setConversions(conversionsJson);
        } catch {
            setError(t.affiliateDashboard?.errors?.loadFailed || 'Failed to load stats');
        } finally {
            setIsLoading(false);
        }
    }, [dateRange, t.affiliateDashboard?.errors?.loadFailed, router]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getStatusBadge = (status: string) => {
        const styles = {
            PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
            CLEARED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
            PAID: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
            VOIDED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        };
        return (
            <span
                className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles] || styles.PENDING}`}
            >
                {status}
            </span>
        );
    };

    return (
        <AffiliateLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Performance Stats
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Track your affiliate performance over time.
                    </p>
                </div>

                {/* Date Range Selector */}
                <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        {(['7', '30', '90'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${dateRange === range
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                                    }`}
                            >
                                {range}d
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
            )}

            {isLoading ? (
                <div className="space-y-6">
                    {/* Loading skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 animate-pulse"
                            >
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4" />
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                            </div>
                        ))}
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                </div>
            ) : chartData ? (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SummaryCard
                            title={`Clicks (${dateRange} days)`}
                            value={chartData.totals.clicks}
                            icon={<MousePointer className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                        />
                        <SummaryCard
                            title={`Conversions (${dateRange} days)`}
                            value={chartData.totals.conversions}
                            icon={<ShoppingCart className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                        />
                        <SummaryCard
                            title={`Earnings (${dateRange} days)`}
                            value={chartData.totals.earnings}
                            format="currency"
                            icon={<DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                        />
                    </div>

                    {/* Clicks Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Clicks Over Time
                        </h3>
                        <PerformanceChart
                            data={chartData.chartData.map((d) => ({ date: d.date, value: d.clicks }))}
                            color="#9333ea"
                            height={200}
                        />
                    </div>

                    {/* Earnings Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Earnings Over Time
                        </h3>
                        <PerformanceChart
                            data={chartData.chartData.map((d) => ({ date: d.date, value: d.earnings }))}
                            color="#16a34a"
                            height={200}
                            formatValue={(v) => `$${v.toFixed(0)}`}
                        />
                    </div>

                    {/* Recent Conversions Table */}
                    {conversions && conversions.conversions.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Recent Conversions
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Order
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Order Value
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Commission
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {conversions.conversions.map((conv) => (
                                            <tr key={conv.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    #{conv.orderId.slice(-8)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(conv.purchasedAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 text-right">
                                                    ${conv.orderSubtotal.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400 text-right">
                                                    +${conv.commissionAmount.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {getStatusBadge(conv.status)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Status Breakdown */}
                    {conversions && Object.keys(conversions.statusBreakdown).length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Conversion Status Breakdown
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(conversions.statusBreakdown).map(([status, count]) => (
                                    <div key={status} className="text-center">
                                        <div className="mb-2">{getStatusBadge(status)}</div>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            {count}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </AffiliateLayout>
    );
}
