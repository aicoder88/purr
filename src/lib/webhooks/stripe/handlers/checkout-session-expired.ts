/**
 * Checkout Session Expired Event Handler
 * Handles expired checkout sessions by updating order status to CANCELLED
 */
import type Stripe from 'stripe';
import prisma from '@/lib/prisma';

/**
 * Main handler for checkout.session.expired event
 */
export async function handleCheckoutSessionExpired(session: Stripe.Checkout.Session): Promise<void> {
  if (!prisma) {
    throw new Error('Database connection not established');
  }

  const orderId = session.metadata?.orderId;
  const orderType = session.metadata?.type;

  if (!orderId) {
    // No orderId in metadata - nothing to update
    return;
  }

  if (orderType === 'retailer_order') {
    await prisma.retailerOrder.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });
  } else {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });
  }
}
