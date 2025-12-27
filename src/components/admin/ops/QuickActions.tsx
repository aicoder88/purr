'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  Share2,
  FileText,
  RefreshCw,
  Download,
  Upload,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  LucideIcon
} from 'lucide-react';

interface QuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => Promise<void>;
  variant?: 'default' | 'primary';
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  onClick,
  variant = 'default'
}: QuickActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    if (!onClick) return;
    
    setIsLoading(true);
    setStatus('idle');
    
    try {
      await onClick();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const isPrimary = variant === 'primary';

  const Content = (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center space-x-4 p-4 rounded-xl border transition-all cursor-pointer ${
        isPrimary
          ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 hover:border-teal-400 dark:hover:border-teal-600'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700'
      } hover:shadow-md dark:hover:shadow-gray-900/30`}
    >
      <div className={`p-3 rounded-lg ${
        isPrimary
          ? 'bg-teal-100 dark:bg-teal-800/50'
          : 'bg-gray-100 dark:bg-gray-700'
      }`}>
        {isLoading ? (
          <Loader2 className={`w-5 h-5 animate-spin ${
            isPrimary ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'
          }`} />
        ) : status === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        ) : status === 'error' ? (
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        ) : (
          <Icon className={`w-5 h-5 ${
            isPrimary ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'
          }`} />
        )}
      </div>
      <div className="flex-1">
        <h3 className={`font-medium ${
          isPrimary ? 'text-teal-900 dark:text-teal-100' : 'text-gray-900 dark:text-gray-50'
        }`}>
          {title}
        </h3>
        <p className={`text-sm ${
          isPrimary ? 'text-teal-700 dark:text-teal-300' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {isLoading ? 'Processing...' : status === 'success' ? 'Done!' : status === 'error' ? 'Failed' : description}
        </p>
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{Content}</Link>;
  }

  return <button onClick={handleClick} className="w-full text-left">{Content}</button>;
}

interface QuickActionsProps {
  onSync?: () => Promise<void>;
  onExport?: () => Promise<void>;
}

export function QuickActions({ onSync, onExport }: QuickActionsProps) {
  const handleSync = async () => {
    if (onSync) {
      await onSync();
    } else {
      const response = await fetch('/api/admin/ops/leads/sync', { method: 'POST' });
      if (!response.ok) throw new Error('Sync failed');
    }
  };

  const handleExport = async () => {
    if (onExport) {
      await onExport();
    } else {
      // Default export implementation
      const response = await fetch('/api/admin/ops/leads?limit=1000');
      if (!response.ok) throw new Error('Export failed');
      
      const data = await response.json();
      const leads = data.leads || [];
      
      // Convert to CSV
      const headers = ['Company Name', 'Contact', 'Email', 'Phone', 'City', 'Province', 'Status'];
      const rows = leads.map((lead: {
        companyName: string;
        contactName: string;
        email: string;
        phone: string;
        city: string;
        province: string;
        status: string;
      }) => [
        lead.companyName,
        lead.contactName || '',
        lead.email || '',
        lead.phone || '',
        lead.city || '',
        lead.province || '',
        lead.status
      ]);
      
      const csvContent = [headers, ...rows]
        .map(row => row.map((cell: string) => `"${cell}"`).join(','))
        .join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `purrify-leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Email Campaign"
          description="Send to leads"
          icon={Mail}
          href="/admin/ops/leads"
        />
        <QuickActionCard
          title="Social Post"
          description="Create content"
          icon={Share2}
          href="/admin/ops/social"
          variant="primary"
        />
        <QuickActionCard
          title="Blog Content"
          description="Generate article"
          icon={FileText}
          href="/admin/blog/new"
        />
        <QuickActionCard
          title="Sync Leads"
          description="From Google Sheets"
          icon={RefreshCw}
          onClick={handleSync}
        />
      </div>
      
      {/* Secondary Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <QuickActionCard
          title="Export Leads"
          description="Download as CSV"
          icon={Download}
          onClick={handleExport}
        />
        <QuickActionCard
          title="Import Leads"
          description="Upload CSV file"
          icon={Upload}
          href="/admin/ops/leads?import=true"
        />
        <QuickActionCard
          title="Send Newsletter"
          description="To subscribers"
          icon={Send}
          href="/admin/ops/leads"
        />
      </div>
    </motion.div>
  );
}

export default QuickActions;
