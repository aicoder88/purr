/**
 * Affiliate Stats Query Hooks
 * 
 * TanStack Query hooks for affiliate dashboard with caching
 * and automatic background refetching.
 */
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

// Query keys
const affiliateKeys = {
  all: ['affiliate'] as const,
  chartData: (days: string) => [...affiliateKeys.all, 'chartData', days] as const,
  conversions: (limit?: number) => [...affiliateKeys.all, 'conversions', limit] as const,
  dashboard: () => [...affiliateKeys.all, 'dashboard'] as const,
};

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

/**
 * Hook to fetch affiliate chart data
 */
export function useAffiliateChartData(days: string = '30') {
  return useQuery({
    queryKey: affiliateKeys.chartData(days),
    queryFn: async () => {
      const { data } = await apiClient.get<ChartDataResponse>(
        `/api/affiliate/dashboard/chart-data?days=${days}`,
        { showToast: false }
      );
      return data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to fetch affiliate conversions
 */
export function useAffiliateConversions(limit: number = 10) {
  return useQuery({
    queryKey: affiliateKeys.conversions(limit),
    queryFn: async () => {
      const { data } = await apiClient.get<ConversionsResponse>(
        `/api/affiliate/dashboard/conversions?limit=${limit}`,
        { showToast: false }
      );
      return data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Combined hook for affiliate dashboard
 * Fetches both chart data and conversions in parallel
 */
export function useAffiliateDashboard(days: string = '30', conversionsLimit: number = 10) {
  const chartQuery = useAffiliateChartData(days);
  const conversionsQuery = useAffiliateConversions(conversionsLimit);

  return {
    chartData: chartQuery.data,
    conversions: conversionsQuery.data,
    isLoading: chartQuery.isLoading || conversionsQuery.isLoading,
    isError: chartQuery.isError || conversionsQuery.isError,
    error: chartQuery.error || conversionsQuery.error,
    refetch: () => {
      chartQuery.refetch();
      conversionsQuery.refetch();
    },
  };
}
