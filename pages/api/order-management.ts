import { NextApiRequest, NextApiResponse } from 'next';
import { OrderManager, ShippingAddress } from '../../src/lib/order-management';
import { OrderStatus } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { customerId, items, stripeSessionId, shippingAddress } = req.body;

      if (!customerId || !items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Customer ID and items are required' });
      }

      const order = await OrderManager.createOrder({
        customerId,
        items,
        stripeSessionId,
        shippingAddress,
      });

      res.status(201).json({ success: true, order });
    } catch (error) {
      console.error('Order creation failed:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else if (req.method === 'GET') {
    try {
      const { orderId, customerId, analytics } = req.query;

      if (analytics === 'true') {
        const timeframe = parseInt(req.query.timeframe as string) || 30;
        const analyticsData = await OrderManager.getOrderAnalytics(timeframe);
        return res.status(200).json({ success: true, analytics: analyticsData });
      }

      if (orderId && typeof orderId === 'string') {
        const order = await OrderManager.getOrder(orderId);
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
        return res.status(200).json({ success: true, order });
      }

      if (customerId && typeof customerId === 'string') {
        const orders = await OrderManager.getOrdersByCustomer(customerId);
        return res.status(200).json({ success: true, orders });
      }

      res.status(400).json({ error: 'Order ID or Customer ID is required' });
    } catch (error) {
      console.error('Order lookup failed:', error);
      res.status(500).json({ error: 'Failed to get order' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { orderId, status, trackingNumber, estimatedDelivery, shippingAddress, stripeSessionId } = req.body;

      if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
      }

      if (stripeSessionId) {
        const paymentSuccess = await OrderManager.processPayment(orderId, stripeSessionId);
        if (!paymentSuccess) {
          return res.status(400).json({ error: 'Payment processing failed' });
        }
        return res.status(200).json({ success: true, message: 'Payment processed successfully' });
      }

      const updateData: Partial<{ status: OrderStatus; trackingNumber: string; estimatedDelivery: Date; shippingAddress: ShippingAddress }> = {};
      if (status && Object.values(OrderStatus).includes(status)) {
        updateData.status = status;
      }
      if (trackingNumber) updateData.trackingNumber = trackingNumber;
      if (estimatedDelivery) updateData.estimatedDelivery = new Date(estimatedDelivery);
      if (shippingAddress) updateData.shippingAddress = shippingAddress;

      const order = await OrderManager.updateOrderStatus(orderId, updateData);
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error('Order update failed:', error);
      res.status(500).json({ error: 'Failed to update order' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { orderId, reason } = req.body;

      if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
      }

      const cancelled = await OrderManager.cancelOrder(orderId, reason);
      if (!cancelled) {
        return res.status(400).json({ error: 'Failed to cancel order' });
      }

      res.status(200).json({ success: true, message: 'Order cancelled successfully' });
    } catch (error) {
      console.error('Order cancellation failed:', error);
      res.status(500).json({ error: 'Failed to cancel order' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}