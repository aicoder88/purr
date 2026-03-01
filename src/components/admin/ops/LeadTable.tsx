import { useState, useCallback, useMemo } from 'react';
import { Lead, LeadStatus } from '@/generated/client/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import LeadStatusBadge, { statusConfig } from './LeadStatusBadge';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Globe,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onSort: (field: string, order: 'asc' | 'desc') => void;
  onSearch: (query: string) => void;
  onStatusFilter: (status: LeadStatus | 'ALL') => void;
  onPageChange: (page: number) => void;
  onViewLead: (lead: Lead) => void;
  onEditLead: (lead: Lead) => void;
  onDeleteLead: (lead: Lead) => void;
  onQuickStatusChange: (leadId: string, status: LeadStatus) => void;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
  statusFilter: LeadStatus | 'ALL';
}

// SortableHeader component moved outside to avoid React compiler warnings
interface SortableHeaderProps {
  field: string;
  children: React.ReactNode;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string, order: 'asc' | 'desc') => void;
}

function SortableHeader({ field, children, sortField, sortOrder, onSort }: SortableHeaderProps) {
  const isActive = sortField === field;
  const Icon =
    isActive && sortOrder === 'asc'
      ? ChevronUp
      : isActive && sortOrder === 'desc'
        ? ChevronDown
        : ChevronsUpDown;

  return (
    <button
      className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      onClick={() => {
        if (isActive) {
          onSort(field, sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          onSort(field, 'desc');
        }
      }}
    >
      <span>{children}</span>
      <Icon className={cn('w-4 h-4', isActive ? 'text-teal-500 dark:text-teal-400' : 'text-gray-400 dark:text-gray-500')} />
    </button>
  );
}

export default function LeadTable({
  leads,
  isLoading,
  pagination,
  selectedIds,
  onSelect,
  onSort,
  onSearch,
  onStatusFilter,
  onPageChange,
  onViewLead,
  onEditLead,
  onDeleteLead,
  onQuickStatusChange,
  sortField,
  sortOrder,
  searchQuery,
  statusFilter
}: LeadTableProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(localSearch);
    },
    [localSearch, onSearch]
  );

  const handleSelectAll = useCallback(() => {
    if (selectedIds.length === leads.length) {
      onSelect([]);
    } else {
      onSelect(leads.map((l) => l.id));
    }
  }, [leads, selectedIds, onSelect]);

  const handleSelectOne = useCallback(
    (id: string) => {
      if (selectedIds.includes(id)) {
        onSelect(selectedIds.filter((i) => i !== id));
      } else {
        onSelect([...selectedIds, id]);
      }
    },
    [selectedIds, onSelect]
  );

  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];
    const { page, totalPages } = pagination;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 'ellipsis', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages);
      }
    }

    return pages;
  }, [pagination]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="Search by company, contact, email, or city..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </form>
        <Select value={statusFilter} onValueChange={(v) => onStatusFilter(v as LeadStatus | 'ALL')}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectItem value="ALL" className="text-gray-900 dark:text-gray-100">All Statuses</SelectItem>
            {Object.keys(statusConfig).map((status) => (
              <SelectItem key={status} value={status} className="text-gray-900 dark:text-gray-100">
                {statusConfig[status as LeadStatus].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <TableHead className="w-12 text-gray-700 dark:text-gray-300">
                  <Checkbox
                    checked={leads.length > 0 && selectedIds.length === leads.length}
                    onCheckedChange={handleSelectAll}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  <SortableHeader field="companyName" sortField={sortField} sortOrder={sortOrder} onSort={onSort}>
                    Company
                  </SortableHeader>
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Contact</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  <SortableHeader field="city" sortField={sortField} sortOrder={sortOrder} onSort={onSort}>
                    Location
                  </SortableHeader>
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  <SortableHeader field="status" sortField={sortField} sortOrder={sortOrder} onSort={onSort}>
                    Status
                  </SortableHeader>
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                  <SortableHeader field="lastContact" sortField={sortField} sortOrder={sortOrder} onSort={onSort}>
                    Last Contact
                  </SortableHeader>
                </TableHead>
                <TableHead className="w-12 text-gray-700 dark:text-gray-300"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i} className="border-b border-gray-100 dark:border-gray-700">
                    <TableCell>
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="w-40 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-gray-500 dark:text-gray-400">
                    No leads found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className={cn(
                      'border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors',
                      selectedIds.includes(lead.id) && 'bg-teal-50 dark:bg-teal-900/20'
                    )}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(lead.id)}
                        onCheckedChange={() => handleSelectOne(lead.id)}
                        className="border-gray-300 dark:border-gray-600"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[200px]">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {lead.companyName}
                        </div>
                        {lead.category && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {lead.category}
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {lead.website && (
                            <a
                              href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-teal-500 dark:text-gray-500 dark:hover:text-teal-400"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-gray-400 hover:text-teal-500 dark:text-gray-500 dark:hover:text-teal-400"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-gray-400 hover:text-teal-500 dark:text-gray-500 dark:hover:text-teal-400"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[120px] text-gray-900 dark:text-gray-100">
                        {lead.contactName || <span className="text-gray-400 dark:text-gray-500">-</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[120px]">
                        {lead.city ? (
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400 dark:text-gray-500" />
                            {lead.city}
                            {lead.province && `, ${lead.province}`}
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="cursor-pointer">
                            <LeadStatusBadge status={lead.status} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          {Object.entries(statusConfig).map(([status, config]) => (
                            <DropdownMenuItem
                              key={status}
                              onClick={() => onQuickStatusChange(lead.id, status as LeadStatus)}
                              className={cn(
                                'cursor-pointer text-gray-900 dark:text-gray-100',
                                lead.status === status && 'bg-gray-100 dark:bg-gray-700'
                              )}
                            >
                              <LeadStatusBadge status={status as LeadStatus} className="mr-2" />
                              {config.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {lead.lastContact
                          ? new Date(lead.lastContact).toLocaleDateString()
                          : <span className="text-gray-400 dark:text-gray-500">Never</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <DropdownMenuItem
                            onClick={() => onViewLead(lead)}
                            className="cursor-pointer text-gray-900 dark:text-gray-100"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEditLead(lead)}
                            className="cursor-pointer text-gray-900 dark:text-gray-100"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                          <DropdownMenuItem
                            onClick={() => onDeleteLead(lead)}
                            className="cursor-pointer text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.totalCount)}
            </span>{' '}
            to{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {Math.min(pagination.page * pagination.limit, pagination.totalCount)}
            </span>{' '}
            of{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">{pagination.totalCount}</span>{' '}
            leads
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-1">
              {pageNumbers.map((pageNum, idx) =>
                pageNum === 'ellipsis' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 dark:text-gray-500">
                    ...
                  </span>
                ) : (
                  <Button
                    key={pageNum}
                    variant={pagination.page === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    className={cn(
                      'w-8 h-8 p-0',
                      pagination.page === pageNum
                        ? 'bg-teal-500 dark:bg-teal-600 text-white dark:text-gray-100 hover:bg-teal-600 dark:hover:bg-teal-700'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    {pageNum}
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
