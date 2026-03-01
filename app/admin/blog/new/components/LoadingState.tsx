'use client';

import AdminLayout from '@/components/admin/AdminLayout';

export function LoadingState() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400"></div>
      </div>
    </AdminLayout>
  );
}
