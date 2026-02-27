/**
 * Admin Analytics Query Hooks
 * 
 * TanStack Query hooks for admin analytics dashboard
 */
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

// Query keys
const analyticsKeys = {
  all: ['analytics'] as const,
  utm: (days: string) => [...analyticsKeys.all, 'utm', days] as const,
  customers: () => [...analyticsKeys.all, 'customers'] as const,
};

interface UTMData {
  summary: {
    totalOrders: number;
    totalRevenue: number;
    attributedOrders: number;
    attributedRevenue: number;
    attributionRate: number;
  };
  bySource: Array<{
    source: string;
    orders: number;
    revenue: number;
    avgOrderValue: number;
  }>;
  byCampaign: Array<{
    campaign: string;
    orders: number;
    revenue: number;
    avgOrderValue: number;
  }>;
}

interface CustomerData {
  summary: {
    totalCustomers: number;
    totalRevenue: number;
    averageLTV: number;
    averageOrderValue: number;
  };
  segmentBreakdown: Array<{
    segment: string;
    count: number;
    revenue: number;
    percentage: number;
  }>;
}

interface AnalyticsResponse<T> {
  success: boolean;
  data: T;
}

/**
 * Hook to fetch UTM analytics data
 */
export function useUTMAnalytics(days: string = '30') {
  return useQuery({
    queryKey: analyticsKeys.utm(days),
    queryFn: async () => {
      const { data } = await apiClient.get<AnalyticsResponse<UTMData>>(
        `/api/admin/analytics/utm?days=${days}`,
        { showToast: false }
      );
      return data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch customer analytics data
 */
export function useCustomerAnalytics() {
  return useQuery({
    queryKey: analyticsKeys.customers(),
    queryFn: async () => {
      const { data } = await apiClient.get<AnalyticsResponse<CustomerData>>(
        '/api/admin/analytics/customers',
        { showToast: false }
      );
      return data.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes - customer data changes less frequently
  });
}

/**
 * Combined hook for admin analytics dashboard
 */
export function useAdminAnalytics(days: string = '30') {
  const utmQuery = useUTMAnalytics(days);
  const customerQuery = useCustomerAnalytics();

  return {
    utmData: utmQuery.data,
    customerData: customerQuery.data,
    isLoading: utmQuery.isLoading || customerQuery.isLoading,
    isError: utmQuery.isError || customerQuery.isError,
    error: utmQuery.error || customerQuery.error,
    refetch: () => {
      utmQuery.refetch();
      customerQuery.refetch();
    },
  };
}
