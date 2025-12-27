import { useState, useCallback, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { requireAuth } from '@/lib/auth/session';
import OpsLayout from '@/components/admin/ops/OpsLayout';
import LeadTable from '@/components/admin/ops/LeadTable';
import LeadDetailSheet from '@/components/admin/ops/LeadDetailSheet';
import CSVImportModal from '@/components/admin/ops/CSVImportModal';
import LeadStatusBadge, { statusConfig } from '@/components/admin/ops/LeadStatusBadge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Lead, LeadStatus } from '@prisma/client';
import {
  Plus,
  Upload,
  RefreshCw,
  ChevronDown,
  Trash2,
  Tag
} from 'lucide-react';

interface LeadsPageProps {
  initialLeads: Lead[];
  initialPagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  initialStatusCounts: Record<LeadStatus, number>;
}

export default function LeadsPage({
  initialLeads,
  initialPagination,
  initialStatusCounts
}: LeadsPageProps) {
  const { toast } = useToast();
  
  // Data state
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [pagination, setPagination] = useState(initialPagination);
  const [statusCounts, setStatusCounts] = useState(initialStatusCounts);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'ALL'>('ALL');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [detailSheetMode, setDetailSheetMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteConfirmLead, setDeleteConfirmLead] = useState<Lead | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  // Fetch leads
  const fetchLeads = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '25',
        search: searchQuery,
        status: statusFilter,
        sortBy: sortField,
        sortOrder: sortOrder
      });

      const response = await fetch(`/api/admin/ops/leads?${params}`);
      if (!response.ok) throw new Error('Failed to fetch leads');
      
      const data = await response.json();
      setLeads(data.leads);
      setPagination(data.pagination);
      setStatusCounts(data.statusCounts);
      setSelectedIds([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch leads',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter, sortField, sortOrder, toast]);

  // Refetch when filters change
  useEffect(() => {
    fetchLeads(1);
  }, [searchQuery, statusFilter, sortField, sortOrder]);

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchLeads(page);
  };

  // Handle sort
  const handleSort = (field: string, order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle status filter
  const handleStatusFilter = (status: LeadStatus | 'ALL') => {
    setStatusFilter(status);
  };

  // Handle view lead
  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDetailSheetMode('view');
    setIsDetailSheetOpen(true);
  };

  // Handle edit lead
  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDetailSheetMode('edit');
    setIsDetailSheetOpen(true);
  };

  // Handle create lead
  const handleCreateLead = () => {
    setSelectedLead(null);
    setDetailSheetMode('create');
    setIsDetailSheetOpen(true);
  };

  // Handle save lead
  const handleSaveLead = async (leadData: Partial<Lead>) => {
    try {
      if (detailSheetMode === 'create') {
        const response = await fetch('/api/admin/ops/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to create lead');
        }
        
        toast({
          title: 'Lead Created',
          description: 'New lead has been added successfully'
        });
      } else {
        const response = await fetch(`/api/admin/ops/leads/${selectedLead?.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to update lead');
        }
        
        toast({
          title: 'Lead Updated',
          description: 'Lead has been updated successfully'
        });
      }
      
      fetchLeads(pagination.page);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save lead',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Handle delete lead
  const handleDeleteLead = (lead: Lead) => {
    setDeleteConfirmLead(lead);
  };

  // Confirm delete lead
  const confirmDeleteLead = async () => {
    if (!deleteConfirmLead) return;
    
    try {
      const response = await fetch(`/api/admin/ops/leads/${deleteConfirmLead.id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete lead');
      
      toast({
        title: 'Lead Deleted',
        description: 'Lead has been removed'
      });
      
      setDeleteConfirmLead(null);
      fetchLeads(pagination.page);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete lead',
        variant: 'destructive'
      });
    }
  };

  // Handle quick status change
  const handleQuickStatusChange = async (leadId: string, status: LeadStatus) => {
    try {
      const response = await fetch(`/api/admin/ops/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      // Update local state
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status } : lead
        )
      );
      
      toast({
        title: 'Status Updated',
        description: `Lead status changed to ${statusConfig[status].label}`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive'
      });
    }
  };

  // Handle bulk status change
  const handleBulkStatusChange = async (status: LeadStatus) => {
    if (selectedIds.length === 0) return;
    
    try {
      const response = await fetch('/api/admin/ops/leads/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: selectedIds,
          action: 'updateStatus',
          status
        })
      });
      
      if (!response.ok) throw new Error('Failed to update leads');
      
      const { updatedCount } = await response.json();
      
      toast({
        title: 'Leads Updated',
        description: `${updatedCount} leads changed to ${statusConfig[status].label}`
      });
      
      fetchLeads(pagination.page);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update leads',
        variant: 'destructive'
      });
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setBulkDeleteConfirm(true);
  };

  // Confirm bulk delete
  const confirmBulkDelete = async () => {
    try {
      const response = await fetch('/api/admin/ops/leads/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: selectedIds,
          action: 'delete'
        })
      });
      
      if (!response.ok) throw new Error('Failed to delete leads');
      
      const { deletedCount } = await response.json();
      
      toast({
        title: 'Leads Deleted',
        description: `${deletedCount} leads have been removed`
      });
      
      setBulkDeleteConfirm(false);
      fetchLeads(pagination.page);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete leads',
        variant: 'destructive'
      });
    }
  };

  // Calculate total leads count
  const totalLeads = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  return (
    <>
      <Head>
        <title>Leads - Purrify Hub</title>
      </Head>
      <OpsLayout>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
              Lead Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {totalLeads} total leads · Manage and track your B2B prospects
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => setIsImportModalOpen(true)}
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => fetchLeads(pagination.page)}
              disabled={isLoading}
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleCreateLead}
              className="bg-teal-500 dark:bg-teal-600 text-white dark:text-gray-100 hover:bg-teal-600 dark:hover:bg-teal-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {Object.entries(statusConfig).map(([status, config]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status === statusFilter ? 'ALL' : (status as LeadStatus))}
              className={`p-3 rounded-lg border transition-all ${
                statusFilter === status
                  ? 'border-teal-500 dark:border-teal-400 ring-2 ring-teal-500/20 dark:ring-teal-400/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              } bg-white dark:bg-gray-800`}
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {statusCounts[status as LeadStatus] || 0}
              </div>
              <LeadStatusBadge status={status as LeadStatus} className="mt-1" />
            </button>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
            <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
              {selectedIds.length} lead{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex-1" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Change Status
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                {Object.entries(statusConfig).map(([status, config]) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleBulkStatusChange(status as LeadStatus)}
                    className="cursor-pointer text-gray-900 dark:text-gray-100"
                  >
                    <LeadStatusBadge status={status as LeadStatus} className="mr-2" />
                    {config.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDelete}
              className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIds([])}
              className="text-gray-600 dark:text-gray-400"
            >
              Clear Selection
            </Button>
          </div>
        )}

        {/* Lead Table */}
        <LeadTable
          leads={leads}
          isLoading={isLoading}
          pagination={pagination}
          selectedIds={selectedIds}
          onSelect={setSelectedIds}
          onSort={handleSort}
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          onPageChange={handlePageChange}
          onViewLead={handleViewLead}
          onEditLead={handleEditLead}
          onDeleteLead={handleDeleteLead}
          onQuickStatusChange={handleQuickStatusChange}
          sortField={sortField}
          sortOrder={sortOrder}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
        />

        {/* CSV Import Modal */}
        <CSVImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImportComplete={() => fetchLeads(1)}
        />

        {/* Lead Detail Sheet */}
        <LeadDetailSheet
          lead={selectedLead}
          isOpen={isDetailSheetOpen}
          onClose={() => setIsDetailSheetOpen(false)}
          onSave={handleSaveLead}
          mode={detailSheetMode}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!deleteConfirmLead}
          onOpenChange={(open) => !open && setDeleteConfirmLead(null)}
        >
          <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-gray-50">
                Delete Lead
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete &quot;{deleteConfirmLead?.companyName}&quot;? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteLead}
                className="bg-red-600 dark:bg-red-700 text-white dark:text-gray-100 hover:bg-red-700 dark:hover:bg-red-800"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Bulk Delete Confirmation Dialog */}
        <AlertDialog
          open={bulkDeleteConfirm}
          onOpenChange={(open) => !open && setBulkDeleteConfirm(false)}
        >
          <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-gray-50">
                Delete {selectedIds.length} Lead{selectedIds.length > 1 ? 's' : ''}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete {selectedIds.length} selected lead{selectedIds.length > 1 ? 's' : ''}? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmBulkDelete}
                className="bg-red-600 dark:bg-red-700 text-white dark:text-gray-100 hover:bg-red-700 dark:hover:bg-red-800"
              >
                Delete All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </OpsLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    };
  }

  // Fetch initial data server-side
  try {
    const { default: prismaClient } = await import('@/lib/prisma');
    
    if (!prismaClient) {
      throw new Error('Database not configured');
    }
    
    const [leads, totalCount, statusCounts] = await Promise.all([
      prismaClient.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 25
      }),
      prismaClient.lead.count(),
      prismaClient.lead.groupBy({
        by: ['status'],
        _count: { status: true }
      })
    ]);

    const statusCountsObj = statusCounts.reduce(
      (acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      },
      {} as Record<LeadStatus, number>
    );

    // Ensure all statuses have a count (spread defaults first, then actual counts)
    const allStatusCounts: Record<LeadStatus, number> = {
      ...{
        NEW: 0,
        CONTACTED: 0,
        SAMPLE_SENT: 0,
        FOLLOWING_UP: 0,
        CONVERTED: 0,
        NOT_INTERESTED: 0,
        NO_RESPONSE: 0
      },
      ...statusCountsObj
    };

    return {
      props: {
        initialLeads: JSON.parse(JSON.stringify(leads)),
        initialPagination: {
          page: 1,
          limit: 25,
          totalCount,
          totalPages: Math.ceil(totalCount / 25)
        },
        initialStatusCounts: allStatusCounts
      }
    };
  } catch (error) {
    console.error('Failed to fetch initial leads:', error);
    return {
      props: {
        initialLeads: [],
        initialPagination: {
          page: 1,
          limit: 25,
          totalCount: 0,
          totalPages: 0
        },
        initialStatusCounts: {
          NEW: 0,
          CONTACTED: 0,
          SAMPLE_SENT: 0,
          FOLLOWING_UP: 0,
          CONVERTED: 0,
          NOT_INTERESTED: 0,
          NO_RESPONSE: 0
        }
      }
    };
  }
};
