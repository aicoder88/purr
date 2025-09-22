import { prisma } from './prisma';
import { PaymentValidator } from './payment-validation';
import { OrderStatus } from '@prisma/client';

export interface Order {
  id: string;
  customerId: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  shippingAddress?: ShippingAddress;
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderUpdateData {
  status?: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  shippingAddress?: ShippingAddress;
}

export class OrderManager {
  static async createOrder(data: {
    customerId: string;
    items: Array<{
      productId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
    }>;
    stripeSessionId?: string;
    shippingAddress?: ShippingAddress;
  }): Promise<Order> {
    try {
      const totalAmount = data.items.reduce((sum, item) => 
        sum + (item.quantity * item.unitPrice), 0
      );

      const order = await prisma.order.create({
        data: {
          userId: data.customerId,
          stripeSessionId: data.stripeSessionId,
          status: 'PENDING',
          totalAmount,
          items: {
            create: data.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.unitPrice,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return this.formatOrderResponse(order);
    } catch (err) {
      console.error('Failed to create order:', err);
      throw new Error('Failed to create order');
    }
  }

  static async updateOrderStatus(orderId: string, updateData: OrderUpdateData): Promise<Order> {
    try {
      const updatePayload: Partial<{ status: OrderStatus; trackingNumber: string; estimatedDelivery: Date }> = {};

      if (updateData.status) {
        updatePayload.status = updateData.status;
      }

      if (updateData.trackingNumber) {
        // Note: Current schema doesn't support trackingNumber field
        console.log('Tracking number would be updated:', updateData.trackingNumber);
      }

      if (updateData.estimatedDelivery) {
        // Note: Current schema doesn't support estimatedDelivery field
        console.log('Estimated delivery would be updated:', updateData.estimatedDelivery);
      }

      if (updateData.shippingAddress) {
        // Note: Current schema doesn't support shippingAddress field
        console.log('Shipping address would be updated:', updateData.shippingAddress);
      }

      const order = await prisma.order.update({
        where: { id: orderId },
        data: updatePayload,
        include: {
          items: true,
        },
      });

      return this.formatOrderResponse(order);
    } catch (err) {
      console.error('Failed to update order:', err);
      throw new Error('Failed to update order');
    }
  }

  static async getOrder(orderId: string): Promise<Order | null> {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: true,
        },
      });

      return order ? this.formatOrderResponse(order) : null;
    } catch (error) {
      console.error('Failed to get order:', error);
      return null;
    }
  }

  static async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        where: { userId: customerId },
        include: {
          items: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return orders.map(order => this.formatOrderResponse(order));
    } catch (error) {
      console.error('Failed to get customer orders:', error);
      return [];
    }
  }

  static async processPayment(orderId: string, stripeSessionId: string): Promise<boolean> {
    try {
      const validation = await PaymentValidator.validateCheckoutSession(stripeSessionId);
      
      if (!validation.isValid) {
        console.error('Payment validation failed:', validation.errors);
        await this.updateOrderStatus(orderId, { status: 'CANCELLED' });
        return false;
      }

      await prisma.order.update({
        where: { id: orderId },
        data: {
          stripeSessionId,
          status: 'PROCESSING',
        },
      });

      return true;
    } catch (error) {
      console.error('Failed to process payment:', error);
      await this.updateOrderStatus(orderId, { status: 'CANCELLED' });
      return false;
    }
  }

  static async cancelOrder(orderId: string, reason?: string): Promise<boolean> {
    try {
      const order = await this.getOrder(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      if (order.status === 'SHIPPED' || order.status === 'DELIVERED') {
        throw new Error('Cannot cancel shipped or delivered order');
      }

      await this.updateOrderStatus(orderId, { status: 'CANCELLED', cancellationReason: reason });

      if (order.stripeSessionId && order.status === 'PROCESSING') {
        // Could initiate refund process here if needed
      }

      return true;
    } catch (err) {
      console.error('Failed to cancel order:', err);
      return false;
    }
  }

  static async getOrderAnalytics(timeframe: number = 30): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    statusBreakdown: Record<OrderStatus, number>;
    topProducts: Array<{ productName: string; quantity: number; revenue: number }>;
  }> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - timeframe);

      const orders = await prisma.order.findMany({
        where: {
          createdAt: { gte: startDate },
        },
        include: {
          items: true,
        },
      });

      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      const statusBreakdown = orders.reduce((acc, order) => {
        const status = order.status as OrderStatus;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<OrderStatus, number>);

      const productStats = orders.reduce((acc, order) => {
        order.items.forEach(item => {
          const productName = `Product_${item.productId}`;
          if (!acc[productName]) {
            acc[productName] = { quantity: 0, revenue: 0 };
          }
          acc[productName].quantity += item.quantity;
          acc[productName].revenue += item.price * item.quantity;
        });
        return acc;
      }, {} as Record<string, { quantity: number; revenue: number }>);

      const topProducts = Object.entries(productStats)
        .map(([productName, stats]) => ({ productName, ...stats }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);

      return {
        totalOrders,
        totalRevenue,
        averageOrderValue,
        statusBreakdown,
        topProducts,
      };
    } catch (err) {
      console.error('Failed to get order analytics:', err);
      throw new Error('Failed to retrieve order analytics');
    }
  }

  private static formatOrderResponse(order: {
    id: string;
    userId: string | null;
    stripeSessionId: string | null;
    status: OrderStatus;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
    items?: Array<{
      id: string;
      orderId: string;
      productId: string;
      quantity: number;
      price: number;
    }>;
  }): Order {
    return {
      id: order.id,
      customerId: order.userId || '',
      stripeSessionId: order.stripeSessionId || undefined,
      status: order.status as OrderStatus,
      totalAmount: order.totalAmount,
      currency: 'CAD',
      items: order.items?.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        productName: `Product_${item.productId}`,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
      })) || [],
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      shippingAddress: undefined,
      trackingNumber: undefined,
      estimatedDelivery: undefined,
    };
  }
}
