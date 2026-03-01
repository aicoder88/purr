'use client';

import { useState, useEffect, useCallback } from 'react';
import { CustomerAuth } from '@/components/customer/CustomerAuth';
import { CustomerPortal } from '@/components/customer/CustomerPortal';

interface Customer {
  id: string;
  email: string;
}

export default function PortalPageClient() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkExistingSession();
  }, []);

  const checkExistingSession = () => {
    try {
      // Check localStorage for existing session
      const sessionData = localStorage.getItem('customer_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        // Validate session is not expired (24 hour expiry)
        if (session.expiresAt && new Date(session.expiresAt) > new Date()) {
          setCustomer(session.customer);
        } else {
          // Clear expired session
          localStorage.removeItem('customer_session');
        }
      }
    } catch {
      localStorage.removeItem('customer_session');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = useCallback((customerData: Customer) => {
    // Store session in localStorage with 24 hour expiry
    const session = {
      customer: customerData,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    localStorage.setItem('customer_session', JSON.stringify(session));
    setCustomer(customerData);

    // Track successful login for analytics
    if (typeof globalThis.window !== 'undefined' && window.gtag) {
      window.gtag('event', 'customer_login', {
        event_category: 'engagement',
        event_label: 'customer_portal',
      });
    }
  }, []);

  const handleLogout = useCallback(() => {
    // Clear session
    localStorage.removeItem('customer_session');
    setCustomer(null);

    // Track logout for analytics
    if (typeof globalThis.window !== 'undefined' && window.gtag) {
      window.gtag('event', 'customer_logout', {
        event_category: 'engagement',
        event_label: 'customer_portal',
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-gray-300">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 bg-gray-900">
      {customer ? (
        <CustomerPortal customerId={customer.id} onLogout={handleLogout} />
      ) : (
        <CustomerAuth onLogin={handleLogin} />
      )}
    </main>
  );
}
