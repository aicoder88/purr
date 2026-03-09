'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { CustomerAuth } from '@/components/customer/CustomerAuth';
import { CustomerPortal } from '@/components/customer/CustomerPortal';

interface CustomerIdentity {
  id: string;
  email: string;
}

export default function PortalPageClient() {
  const t = useTranslations('auth.customer.portal');
  const [customer, setCustomer] = useState<CustomerIdentity | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    setLoading(true);

    try {
      const session = await getSession();
      if (session?.user?.role === 'customer' && session.user.id && session.user.email) {
        setCustomer({
          id: session.user.id,
          email: session.user.email,
        });
      } else {
        setCustomer(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    setCustomer(null);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {customer ? (
        <CustomerPortal customerId={customer.id} onLogout={handleLogout} />
      ) : (
        <CustomerAuth onLogin={() => void refreshSession()} />
      )}
    </main>
  );
}
