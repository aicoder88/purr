// Shared TypeScript interfaces for Customer Portal components

export interface Order {
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

export interface Subscription {
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

export interface Customer {
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

export interface CustomerPortalProps {
  customerId: string;
  onLogout: () => void;
}
