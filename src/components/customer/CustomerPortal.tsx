import { useState, useEffect, useCallback } from 'react';
import { User, Package, Calendar, CreditCard, Settings, LogOut, Bell, Download, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomerSupport } from './CustomerSupport';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface Subscription {
  id: string;
  productName: string;
  status: 'active' | 'paused' | 'cancelled';
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
  nextDelivery: string;
  price: number;
  lastDelivery: string;
  quantity: number;
  created: string;
}

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  subscriptions: Array<{
    id: string;
    productName: string;
    frequency: string;
    nextDelivery: string;
    status: 'active' | 'paused' | 'cancelled';
    price: number;
  }>;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
}

interface CustomerPortalProps {
  customerId: string;
  onLogout: () => void;
}

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
            productName: 'Purrify 60g Monthly',
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
              name: 'Purrify 60g',
              quantity: 1,
              price: 19.99,
              image: '/images/60g.jpg'
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
              name: 'Purrify 140g',
              quantity: 1,
              price: 29.99,
              image: '/images/140g.jpg'
            }
          ],
          trackingNumber: 'CA0987654321',
          estimatedDelivery: '2024-01-25'
        }
      ];

      const mockSubscriptions: Subscription[] = [
        {
          id: 'sub_001',
          productName: 'Purrify 140g Monthly',
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
          productName: 'Purrify 60g Bi-weekly',
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
      console.error('Failed to fetch customer data:', error);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    // Fetch customer data and orders
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

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  }, []);

  // Tab change handlers - must be defined before early returns
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Unable to load customer data</h2>
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Customer Portal</h1>
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
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
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

// Dashboard Tab Component
function DashboardTab({ customer, orders, subscriptions }: { customer: Customer; orders: Order[]; subscriptions: Subscription[] }) {
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">{customer.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(customer.totalSpent)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {subscriptions.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Recent Orders</h3>
        </div>
        <div className="p-6">
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Package className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-50">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-50">
                      {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(order.total)}
                    </p>
                    <span className={cn('inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      order.status === 'delivered' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
                      order.status === 'shipped' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' :
                      'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                    )}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Orders Tab Component
function OrdersTab({
  orders,
  formatDate,
  formatCurrency,
  getStatusColor
}: {
  orders: Order[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  getStatusColor: (status: string) => string;
}) {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
  }, []);

  const handleReorderItem = useCallback((order: Order, item: Order['items'][0]) => {
    return () => handleReorder({ ...order, items: [item] });
  }, []);

  const handleReorderOrder = useCallback((order: Order) => {
    return () => handleReorder(order);
  }, []);

  const handleDownloadInvoiceCallback = useCallback((orderNumber: string) => {
    return () => handleDownloadInvoice(orderNumber);
  }, []);

  const handleTrackPackageCallback = useCallback((trackingNumber: string) => {
    return () => handleTrackPackage(trackingNumber);
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchTerm]);

  const handleReorder = async (order: Order) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual reorder functionality
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Track reorder for analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'reorder', {
          event_category: 'ecommerce',
          event_label: order.orderNumber,
          value: order.total
        });
      }

      alert(`Order ${order.orderNumber} has been added to your cart!`);
    } catch (error) {
      console.error('Reorder failed:', error);
      alert('Failed to reorder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackPackage = (trackingNumber: string) => {
    // Mock tracking - replace with actual tracking service
    window.open(`https://www.canadapost.ca/trackweb/en#/details/${trackingNumber}`, '_blank');
  };

  const handleDownloadInvoice = async (orderNumber: string) => {
    try {
      // Mock invoice download - replace with actual invoice generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Invoice for order ${orderNumber} will be downloaded shortly.`);
    } catch (error) {
      console.error('Invoice download failed:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  const getOrderStatusCount = (status: string) => {
    if (status === 'all') return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Order Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Order Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{getOrderStatusCount('all')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{getOrderStatusCount('processing')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Processing</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{getOrderStatusCount('shipped')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Shipped</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{getOrderStatusCount('delivered')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Delivered</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Orders
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by order number or product name..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Orders ({getOrderStatusCount('all')})</option>
              <option value="processing">Processing ({getOrderStatusCount('processing')})</option>
              <option value="shipped">Shipped ({getOrderStatusCount('shipped')})</option>
              <option value="delivered">Delivered ({getOrderStatusCount('delivered')})</option>
              <option value="cancelled">Cancelled ({getOrderStatusCount('cancelled')})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
            Order History
            {statusFilter !== 'all' && (
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                ({filteredOrders.length} {statusFilter} orders)
              </span>
            )}
          </h3>
        </div>
        <div className="p-6">
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50">#{order.orderNumber}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ordered on {formatDate(order.date)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 lg:mt-0">
                      <span className={cn('inline-flex px-3 py-1 text-sm font-medium rounded-full', getStatusColor(order.status))}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-50">{formatCurrency(order.total)}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded border border-gray-200 dark:border-gray-600"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-50">{item.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-gray-50">{formatCurrency(item.price)}</p>
                          <button
                            onClick={handleReorderItem(order, item)}
                            disabled={loading}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
                          >
                            Reorder this item
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Info */}
                  {order.trackingNumber && (
                    <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Tracking: {order.trackingNumber}</p>
                          {order.estimatedDelivery && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Estimated delivery: {formatDate(order.estimatedDelivery)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={handleTrackPackageCallback(order.trackingNumber!)}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        >
                          Track Package →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleReorderOrder(order)}
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white dark:text-gray-100 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Package className="w-4 h-4" />
                          Reorder All Items
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDownloadInvoiceCallback(order.orderNumber)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>

                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Leave Review
                      </button>
                    )}

                    {order.status === 'processing' && (
                      <button className="px-4 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 text-sm font-medium rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {searchTerm || statusFilter !== 'all'
                  ? 'No orders match your search criteria'
                  : 'No orders yet'
                }
              </p>
              {(searchTerm || statusFilter !== 'all') && (
                <button
                  onClick={handleClearFilters}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Subscriptions Tab Component
function SubscriptionsTab({
  subscriptions,
  formatDate,
  formatCurrency,
  getStatusColor
}: {
  subscriptions: Subscription[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  getStatusColor: (status: string) => string;
}) {
  const [subscriptionList, setSubscriptionList] = useState(subscriptions);
  const [loading, setLoading] = useState(false);

  const handleFrequencyChange = async (subscriptionId: string, newFrequency: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubscriptionList(prev => prev.map(sub =>
        sub.id === subscriptionId
          ? {
              ...sub,
              frequency: newFrequency as Subscription['frequency'],
              nextDelivery: calculateNextDelivery(newFrequency)
            }
          : sub
      ));
    } catch (error) {
      console.error('Frequency change failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNextDelivery = (frequency: string): string => {
    const now = new Date();
    switch (frequency) {
      case 'weekly':
        now.setDate(now.getDate() + 7);
        break;
      case 'bi-weekly':
        now.setDate(now.getDate() + 14);
        break;
      case 'monthly':
        now.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        now.setMonth(now.getMonth() + 3);
        break;
      default:
        now.setMonth(now.getMonth() + 1);
    }
    return now.toISOString().split('T')[0];
  };

  const handleFrequencyChangeCallback = useCallback((subscriptionId: string) => {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleFrequencyChange(subscriptionId, e.target.value);
    };
  }, [handleFrequencyChange]);

  const handleSubscriptionPause = useCallback((subscriptionId: string) => {
    return () => handleSubscriptionAction(subscriptionId, 'pause');
  }, []);

  const handleSubscriptionResume = useCallback((subscriptionId: string) => {
    return () => handleSubscriptionAction(subscriptionId, 'resume');
  }, []);

  const handleSubscriptionCancel = useCallback((subscriptionId: string) => {
    return () => handleSubscriptionAction(subscriptionId, 'cancel');
  }, []);

  useEffect(() => {
    setSubscriptionList(subscriptions);
  }, [subscriptions]);

  const handleSubscriptionAction = async (subscriptionId: string, action: 'pause' | 'resume' | 'cancel') => {
    setLoading(true);
    try {
      // Mock API call - replace with actual subscription management API
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubscriptionList(prev => prev.map(sub =>
        sub.id === subscriptionId
          ? {
              ...sub,
              status: action === 'pause' ? 'paused' : action === 'resume' ? 'active' : 'cancelled'
            }
          : sub
      ));

      // Track subscription action for analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'subscription_action', {
          event_category: 'subscription',
          event_label: action,
          subscription_id: subscriptionId
        });
      }
    } catch (error) {
      console.error('Subscription action failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Subscription Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Subscription Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {subscriptionList.filter(s => s.status === 'active').length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {subscriptionList.filter(s => s.status === 'paused').length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Paused</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {formatCurrency(subscriptionList.filter(s => s.status === 'active').reduce((sum, s) => sum + s.price, 0))}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Total</p>
          </div>
        </div>
      </div>

      {/* Subscription List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Your Subscriptions</h3>
        </div>
        <div className="p-6">
          {subscriptionList.length > 0 ? (
            <div className="space-y-6">
              {subscriptionList.map((subscription) => (
                <div key={subscription.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50">{subscription.productName}</h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>Quantity: {subscription.quantity}</span>
                        <span>Started: {formatDate(subscription.created)}</span>
                        <span>Last delivery: {formatDate(subscription.lastDelivery)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4 lg:mt-0">
                      <span className={cn('inline-flex px-3 py-1 text-sm font-medium rounded-full', getStatusColor(subscription.status))}>
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-50">{formatCurrency(subscription.price)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Delivery Frequency</p>
                          <select
                            value={subscription.frequency}
                            onChange={handleFrequencyChangeCallback(subscription.id)}
                            disabled={loading || subscription.status === 'cancelled'}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 disabled:opacity-50"
                          >
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                          </select>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Next Delivery</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{formatDate(subscription.nextDelivery)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {subscription.status === 'active' ? (
                        <button
                          onClick={handleSubscriptionPause(subscription.id)}
                          disabled={loading}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : 'Pause'}
                        </button>
                      ) : subscription.status === 'paused' ? (
                        <button
                          onClick={handleSubscriptionResume(subscription.id)}
                          disabled={loading}
                          className="px-4 py-2 bg-green-600 text-white dark:text-gray-100 text-sm font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : 'Resume'}
                        </button>
                      ) : null}

                      {subscription.status !== 'cancelled' && (
                        <button
                          onClick={handleSubscriptionCancel(subscription.id)}
                          disabled={loading}
                          className="px-4 py-2 bg-red-600 text-white dark:text-gray-100 text-sm font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No subscriptions found</p>
              <button className="px-6 py-2 bg-blue-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-blue-700 transition-colors">
                Start a Subscription
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Profile Tab Component
function ProfileTab({ customer }: { customer: Customer }) {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone || ''
  });
  const [addressData, setAddressData] = useState({
    street: customer.address.street,
    city: customer.address.city,
    province: customer.address.province,
    postalCode: customer.address.postalCode,
    country: customer.address.country
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true
  });
  const [loading, setLoading] = useState(false);

  const handleProfileFieldChange = useCallback((field: keyof typeof profileData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfileData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handleAddressFieldChange = useCallback((field: keyof typeof addressData) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAddressData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handlePasswordFieldChange = useCallback((field: keyof typeof passwordData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handlePreferencesChange = useCallback((key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      handlePreferencesUpdate(key, e.target.checked);
    };
  }, []);

  const handleEditProfile = useCallback(() => {
    setEditingProfile(true);
  }, []);

  const handleCancelProfileEdit = useCallback(() => {
    setEditingProfile(false);
    setProfileData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone || ''
    });
  }, [customer]);

  const handleEditAddress = useCallback(() => {
    setEditingAddress(true);
  }, []);

  const handleCancelAddressEdit = useCallback(() => {
    setEditingAddress(false);
    setAddressData({
      street: customer.address.street,
      city: customer.address.city,
      province: customer.address.province,
      postalCode: customer.address.postalCode,
      country: customer.address.country
    });
  }, [customer]);

  const handleShowPasswordForm = useCallback(() => {
    setShowPasswordForm(true);
  }, []);

  const handleCancelPasswordForm = useCallback(() => {
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  }, []);

  const handleProfileSave = useCallback(async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEditingProfile(false);

      // Track profile update for analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'profile_updated', {
          event_category: 'account',
          event_label: 'profile_information'
        });
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddressSave = useCallback(async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual address update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEditingAddress(false);
    } catch (error) {
      console.error('Failed to update address:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePasswordChange = useCallback(async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Mock API call - replace with actual password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Password updated successfully');
    } catch (error) {
      console.error('Failed to change password:', error);
      alert('Failed to change password');
    } finally {
      setLoading(false);
    }
  }, [passwordData.newPassword, passwordData.confirmPassword]);

  const handlePreferencesUpdate = async (key: string, value: boolean) => {
    try {
      setPreferences(prev => ({ ...prev, [key]: value }));
      // Mock API call - replace with actual preferences update
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Personal Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={handleProfileFieldChange('firstName')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingProfile}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={handleProfileFieldChange('lastName')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingProfile}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={handleProfileFieldChange('email')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                disabled={!editingProfile}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={handleProfileFieldChange('phone')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                disabled={!editingProfile}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="flex gap-3">
              {editingProfile ? (
                <>
                  <button
                    onClick={handleProfileSave}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancelProfileEdit}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditProfile}
                  className="w-full px-4 py-2 bg-blue-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Shipping Address</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={addressData.street}
                onChange={handleAddressFieldChange('street')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                disabled={!editingAddress}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={addressData.city}
                  onChange={handleAddressFieldChange('city')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingAddress}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Province
                </label>
                <select
                  value={addressData.province}
                  onChange={handleAddressFieldChange('province')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingAddress}
                >
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="YT">Yukon</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={addressData.postalCode}
                  onChange={handleAddressFieldChange('postalCode')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingAddress}
                  placeholder="A1A 1A1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Country
                </label>
                <select
                  value={addressData.country}
                  onChange={handleAddressFieldChange('country')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingAddress}
                >
                  <option value="Canada">Canada</option>
                  <option value="United States">United States</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              {editingAddress ? (
                <>
                  <button
                    onClick={handleAddressSave}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Address'}
                  </button>
                  <button
                    onClick={handleCancelAddressEdit}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditAddress}
                  className="w-full px-4 py-2 bg-blue-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Edit Address
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Security Settings</h3>
          </div>
          <div className="p-6">
            {!showPasswordForm ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Password</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
                  </div>
                  <button
                    onClick={handleShowPasswordForm}
                    className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordFieldChange('currentPassword')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordFieldChange('newPassword')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordFieldChange('confirmPassword')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handlePasswordChange}
                    disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="flex-1 px-4 py-2 bg-green-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                  <button
                    onClick={handleCancelPasswordForm}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Notification Preferences</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Email Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={handlePreferencesChange('emailNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">SMS Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via text message</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.smsNotifications}
                  onChange={handlePreferencesChange('smsNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Marketing Emails</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive promotional offers and news</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketingEmails}
                  onChange={handlePreferencesChange('marketingEmails')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Order Updates</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive order and delivery notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.orderUpdates}
                  onChange={handlePreferencesChange('orderUpdates')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Account Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Account Summary</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{customer.totalOrders}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(customer.totalSpent)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {customer.memberSince ? new Date(customer.memberSince).getFullYear() : new Date().getFullYear()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}