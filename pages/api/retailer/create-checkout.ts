import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia',
});

const JWT_SECRET = process.env.RETAILER_JWT_SECRET || 'your-secret-key-change-in-production';

interface JWTPayload {
  retailerId: string;
  email: string;
  businessName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    // Get order details
    const order = await prisma.retailerOrder.findUnique({
      where: { id: orderId },
      include: {
        retailer: {
          include: {
            shippingAddress: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify order belongs to this retailer
    if (order.retailerId !== decoded.retailerId) {
      return res.status(403).json({ message: 'Unauthorized access to order' });
    }

    // Check if order is already paid
    if (order.status !== 'PENDING') {
      return res.status(400).json({ message: 'Order has already been processed' });
    }

    // Create or get Stripe customer
    let stripeCustomerId = order.retailer.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: order.retailer.email,
        name: order.retailer.businessName,
        metadata: {
          retailerId: order.retailer.id,
          type: 'retailer',
        },
      });

      stripeCustomerId = customer.id;

      // Update retailer with Stripe customer ID
      await prisma.retailer.update({
        where: { id: order.retailer.id },
        data: { stripeCustomerId },
      });
    }

    // Create Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map((item) => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.product.name,
          description: `Wholesale - ${item.product.description}`,
          images: [item.product.image],
        },
        unit_amount: Math.round(item.unitPrice * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item
    if (order.shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'Shipping',
            description: 'Shipping and handling',
          },
          unit_amount: Math.round(order.shipping * 100),
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/retailer/portal/orders?success=true&orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/retailer/portal/orders?canceled=true`,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        retailerId: order.retailer.id,
        type: 'retailer_order',
      },
      shipping_address_collection: {
        allowed_countries: ['CA', 'US'],
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Wholesale Order ${order.orderNumber}`,
          custom_fields: [
            {
              name: 'Business Name',
              value: order.retailer.businessName,
            },
            {
              name: 'Order Number',
              value: order.orderNumber,
            },
          ],
        },
      },
    });

    // Update order with Stripe session ID
    await prisma.retailerOrder.update({
      where: { id: order.id },
      data: {
        stripeSessionId: session.id,
      },
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ message: 'Failed to create checkout session' });
  } finally {
    await prisma.$disconnect();
  }
}
