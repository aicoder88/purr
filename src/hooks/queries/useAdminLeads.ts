/**
 * Admin Leads Query Hooks
 * 
 * TanStack Query hooks for lead management with caching,
 * optimistic updates, and automatic background refetching.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Lead, LeadStatus } from '@/generated/client/client';
import apiClient from '@/lib/api-client';

// Query keys for cache management
const leadsKeys = {
  all: ['leads'] as const,
  lists: (filters: LeadsFilters) => [...leadsKeys.all, 'list', filters] as const,
  detail: (id: string) => [...leadsKeys.all, 'detail', id] as const,
  stats: () => [...leadsKeys.all, 'stats'] as const,
};

interface LeadsFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus | 'ALL';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface LeadsResponse {
  leads: Lead[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  statusCounts: Record<LeadStatus, number>;
}

/**
 * Fetch leads with filters
 */
async function fetchLeads(filters: LeadsFilters): Promise<LeadsResponse> {
  const params = new URLSearchParams({
    page: (filters.page ?? 1).toString(),
    limit: (filters.limit ?? 25).toString(),
    search: filters.search ?? '',
    status: filters.status ?? 'ALL',
    sortBy: filters.sortBy ?? 'createdAt',
    sortOrder: filters.sortOrder ?? 'desc',
  });

  const { data } = await apiClient.get<LeadsResponse>(`/api/admin/ops/leads?${params}`, {
    showToast: false,
  });
  return data;
}

/**
 * Hook to fetch and cache leads list
 */
export function useLeads(filters: LeadsFilters) {
  return useQuery({
    queryKey: leadsKeys.lists(filters),
    queryFn: () => fetchLeads(filters),
    staleTime: 1000 * 30, // 30 seconds - leads change frequently
  });
}

/**
 * Hook to fetch a single lead
 */
export function useLead(id: string | null) {
  return useQuery({
    queryKey: leadsKeys.detail(id ?? ''),
    queryFn: async () => {
      if (!id) return null;
      const { data } = await apiClient.get<Lead>(`/api/admin/ops/leads/${id}`, {
        showToast: false,
      });
      return data;
    },
    enabled: !!id,
  });
}

/**
 * Hook to create a new lead
 */
export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadData: Partial<Lead>) => {
      const { data } = await apiClient.post<Lead>('/api/admin/ops/leads', leadData, {
        successMessage: 'Lead created successfully',
      });
      return data;
    },
    onSuccess: () => {
      // Invalidate all lead lists to refresh data
      queryClient.invalidateQueries({ queryKey: leadsKeys.all });
    },
  });
}

/**
 * Hook to update a lead
 */
export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Lead> }) => {
      const { data: result } = await apiClient.put<Lead>(`/api/admin/ops/leads/${id}`, data, {
        successMessage: 'Lead updated successfully',
      });
      return result;
    },
    onSuccess: (_, variables) => {
      // Invalidate specific lead and all lists
      queryClient.invalidateQueries({ queryKey: leadsKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: leadsKeys.all });
    },
  });
}

/**
 * Hook to update lead status (optimistic update)
 */
export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { data } = await apiClient.patch<Lead>(`/api/admin/ops/leads/${id}`, { status }, {
        showToast: false,
      });
      return data;
    },
    onMutate: async ({ id, status }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: leadsKeys.all });

      // Snapshot previous value
      const previousData = queryClient.getQueryData<LeadsResponse>(leadsKeys.lists({}));

      // Optimistically update
      if (previousData) {
        queryClient.setQueryData(leadsKeys.lists({}), {
          ...previousData,
          leads: previousData.leads.map((lead) =>
            lead.id === id ? { ...lead, status } : lead
          ),
        });
      }

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(leadsKeys.lists({}), context.previousData);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: leadsKeys.all });
    },
  });
}

/**
 * Hook to delete a lead
 */
export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/api/admin/ops/leads/${id}`, {
        successMessage: 'Lead deleted successfully',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadsKeys.all });
    },
  });
}

/**
 * Hook for bulk operations on leads
 */
export function useBulkUpdateLeads() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ids,
      action,
      status,
    }: {
      ids: string[];
      action: 'updateStatus' | 'delete';
      status?: LeadStatus;
    }) => {
      const { data } = await apiClient.post<{
        updatedCount?: number;
        deletedCount?: number;
      }>(
        '/api/admin/ops/leads/bulk',
        { ids, action, status },
        {
          successMessage:
            action === 'delete'
              ? `${ids.length} leads deleted`
              : `${ids.length} leads updated`,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadsKeys.all });
    },
  });
}
