import { useState, useEffect, useCallback } from 'react';
import { User, Package, Calendar, Settings, LogOut, Bell, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrencyValue } from '@/lib/pricing';
import { CustomerSupport } from './CustomerSupport';
import { DashboardTab } from './DashboardTab';
import { OrdersTab } from './OrdersTab';
import { SubscriptionsTab } from './SubscriptionsTab';
import { ProfileTab } from './ProfileTab';
import type { Order, Subscription, Customer, CustomerPortalProps } from './customer-portal-types';

export function CustomerPortal({ customerId, onLogout }: CustomerPortalProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomerData = useCallback(async () => {
    try {
      setLoading(true);

      // Mock data - replace with actual API calls
      const mockCustomer: Customer = {
        id: customerId,
        email: 'customer@example.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Main Street',
          city: 'Toronto',
          province: 'ON',
          postalCode: 'M5V 3A8',
          country: 'Canada'
        },
        subscriptions: [
          {
            id: 'sub_1',
            productName: 'Purrify 50g Monthly',
            frequency: 'Every 30 days',
            nextDelivery: '2024-02-15',
            status: 'active',
            price: 19.99
          }
        ],
        totalOrders: 8,
        totalSpent: 159.92,
        memberSince: '2023-06-15'
      };

      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'PUR-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 19.99,
          items: [
            {
              id: '1',
              name: 'Purrify 50g',
              quantity: 1,
              price: 19.99,
              image: '/images/products/60g.webp'
            }
          ],
          trackingNumber: 'CA1234567890',
          estimatedDelivery: '2024-01-18'
        },
        {
          id: '2',
          orderNumber: 'PUR-2024-002',
          date: '2024-01-20',
          status: 'shipped',
          total: 29.99,
          items: [
            {
              id: '2',
              name: 'Purrify 120g',
              quantity: 1,
              price: 29.99,
              image: '/images/products/60g.webp'
            }
          ],
          trackingNumber: 'CA0987654321',
          estimatedDelivery: '2024-01-25'
        }
      ];

      const mockSubscriptions: Subscription[] = [
        {
          id: 'sub_001',
          productName: 'Purrify 120g Monthly',
          status: 'active',
          frequency: 'monthly',
          nextDelivery: '2024-02-15',
          price: 29.99,
          lastDelivery: '2024-01-15',
          quantity: 1,
          created: '2023-12-15'
        },
        {
          id: 'sub_002',
          productName: 'Purrify 50g Bi-weekly',
          status: 'paused',
          frequency: 'bi-weekly',
          nextDelivery: '2024-02-20',
          price: 19.99,
          lastDelivery: '2024-01-22',
          quantity: 2,
          created: '2024-01-08'
        }
      ];

      setCustomer(mockCustomer);
      setOrders(mockOrders);
      setSubscriptions(mockSubscriptions);
    } catch (error) {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchCustomerData();
  }, [customerId, fetchCustomerData]);

  const getStatusColor = useCallback((status: string) => {
    const colors = {
      processing: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300',
      shipped: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
      delivered: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300',
      cancelled: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300',
      active: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300',
      paused: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const formatCurrency = useCallback((amount: number) => formatCurrencyValue(amount), []);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'subscriptions', label: 'Subscriptions', icon: Calendar },
    { id: 'support', label: 'Support', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: Settings }
  ];

  const handleTabClick = useCallback((tab: typeof tabs[0]) => {
    return () => handleTabChange(tab.id);
  }, [handleTabChange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Unable to load customer data</h2>
          <p className="text-gray-600 dark:text-gray-300">Please try refreshing the page or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50">Customer Portal</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Welcome, {customer.firstName}!
                </span>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={handleTabClick(tab)}
                  className={cn(
                    'flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardTab customer={customer} orders={orders} subscriptions={subscriptions} />
        )}

        {activeTab === 'orders' && (
          <OrdersTab orders={orders} formatDate={formatDate} formatCurrency={formatCurrency} getStatusColor={getStatusColor} />
        )}

        {activeTab === 'subscriptions' && (
          <SubscriptionsTab subscriptions={subscriptions} formatDate={formatDate} formatCurrency={formatCurrency} getStatusColor={getStatusColor} />
        )}

        {activeTab === 'support' && (
          <CustomerSupport customerId={customerId} />
        )}

        {activeTab === 'profile' && (
          <ProfileTab customer={customer} />
        )}
      </main>
    </div>
  );
}
