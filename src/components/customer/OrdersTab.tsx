import { useState, useEffect, useCallback } from 'react';
import { Package, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Order } from './customer-portal-types';

interface OrdersTabProps {
  orders: Order[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  getStatusColor: (status: string) => string;
}

export function OrdersTab({
  orders,
  formatDate,
  formatCurrency,
  getStatusColor
}: OrdersTabProps) {
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
      if (typeof globalThis.window !== 'undefined' && window.gtag) {
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
        <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Order Statistics</h3>
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
          <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50">
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
                      className="px-4 py-2 bg-blue-600 dark:bg-blue-600 text-white dark:text-gray-100 text-sm font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center gap-2"
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
