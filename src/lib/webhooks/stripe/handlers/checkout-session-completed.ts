/**
 * Checkout Session Completed Event Handler
 * Handles successful checkout completions including:
 * - Affiliate starter kit activations
 * - Payment link orders
 * - Consumer orders
 * - Retailer orders
 */
import type Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { getStripe } from '../config';
import { sendAdminNotification, sendThankYouEmail, sendAffiliateActivationEmail } from '../emails';
import { recordAffiliateConversion, parseAffiliateMetadata } from '@/lib/affiliate/conversion';
import { randomBytes } from 'crypto';

interface CheckoutSessionData {
  session: Stripe.Checkout.Session;
  orderId?: string;
  orderType?: string;
  isPaymentLink: boolean;
  customerEmail?: string;
  customerName?: string;
  locale: 'en' | 'fr';
  orderNumber: string;
  productName: string;
  quantity: number;
  amount: number;
}

/**
 * Extract session data common to all order types
 */
async function extractSessionData(session: Stripe.Checkout.Session): Promise<CheckoutSessionData> {
  const orderId = session.metadata?.orderId;
  const orderType = session.metadata?.type;
  const isPaymentLink = !orderId;

  const customerEmail = session.customer_details?.email || session.customer_email || undefined;
  const customerName = session.customer_details?.name || undefined;
  const locale = (session.metadata?.locale as 'en' | 'fr') || 'en';
  const orderNumber = orderId || session.id.slice(-12).toUpperCase();
  const amount = session.amount_total || 0;

  // Get line items to extract product details
  let productName = 'Purrify';
  let quantity = 1;

  try {
    const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, { limit: 5 });
    if (lineItems.data.length > 0) {
      const item = lineItems.data[0];
      productName = item.description || item.price?.product?.toString() || 'Purrify';
      quantity = lineItems.data.reduce((sum, li) => sum + (li.quantity || 0), 0);
    }
  } catch {
    // Error fetching line items - continue with defaults
  }

  return {
    session,
    orderId,
    orderType,
    isPaymentLink,
    customerEmail,
    customerName,
    locale,
    orderNumber,
    productName,
    quantity,
    amount,
  };
}

/**
 * Handle affiliate starter kit purchase
 */
async function handleAffiliateStarterKit(session: Stripe.Checkout.Session): Promise<void> {
  const affiliateId = session.metadata?.affiliateId;
  if (!affiliateId || !prisma) return;

  try {
    // Activate the affiliate
    await prisma.affiliate.update({
      where: { id: affiliateId },
      data: {
        activatedAt: new Date(),
        starterKitOrderId: session.id,
      },
    });

    // Send activation confirmation email
    const customerEmail = session.customer_details?.email;
    if (customerEmail) {
      await sendAffiliateActivationEmail({ customerEmail });
    }
  } catch (err) {
    // Failed to activate affiliate - tracked by monitoring service
    console.error('[Webhook] Failed to activate affiliate:', err);
  }
}

/**
 * Handle payment link order (no database order)
 */
async function handlePaymentLinkOrder(data: CheckoutSessionData): Promise<void> {
  const { customerEmail, customerName, orderNumber, productName, quantity, amount, locale, session } = data;

  if (!customerEmail) return;

  // Send customer confirmation email
  const emailResult = await sendThankYouEmail({
    customerEmail,
    customerName,
    orderNumber,
    productName,
    quantity,
    amount,
    locale
  });

  if (!emailResult.success) {
    console.error('[Webhook] Failed to send Payment Link thank you email:', emailResult.error);
  }

  // Send admin notification
  const adminResult = await sendAdminNotification({
    customerEmail,
    customerName,
    orderNumber,
    productName,
    quantity,
    amount,
    isPaymentLink: true,
  });

  if (!adminResult.success) {
    console.error('[Webhook] Failed to send admin notification:', adminResult.error);
  }

  // Process affiliate conversion for Payment Link orders
  const paymentLinkAffiliateRef = session.metadata?.affiliate_ref;
  if (paymentLinkAffiliateRef) {
    const affiliateData = parseAffiliateMetadata(paymentLinkAffiliateRef);
    if (affiliateData) {
      const orderSubtotalDollars = amount / 100;

      const conversionResult = await recordAffiliateConversion({
        affiliateCode: affiliateData.code,
        affiliateSessionId: affiliateData.sessionId,
        orderId: orderNumber,
        orderSubtotal: orderSubtotalDollars,
      });

      if (!conversionResult.success) {
        console.error('[Webhook] Failed to record affiliate conversion for Payment Link:', conversionResult.error);
      }
    }
  }
}

/**
 * Handle retailer order
 */
async function handleRetailerOrder(data: CheckoutSessionData): Promise<void> {
  const { orderId, session, customerEmail, customerName, locale, productName, quantity, amount } = data;

  if (!orderId || !prisma) return;

  const paymentIntent = session.payment_intent as string;

  // Check current order status (idempotency guard)
  const currentOrder = await prisma.retailerOrder.findUnique({
    where: { id: orderId },
    select: { status: true },
  });

  if (!currentOrder || currentOrder.status === 'PAID' || currentOrder.status === 'CANCELLED') {
    return;
  }

  // Update retailer order status
  await prisma.retailerOrder.update({
    where: { id: orderId },
    data: {
      status: 'PAID',
      stripePaymentIntentId: paymentIntent,
    },
  });

  // Send emails
  if (customerEmail) {
    const emailResult = await sendThankYouEmail({
      customerEmail,
      customerName,
      orderNumber: orderId,
      productName,
      quantity,
      amount,
      locale
    });

    if (!emailResult.success) {
      console.error('[Webhook] Failed to send retailer thank you email:', emailResult.error);
    }

    await sendAdminNotification({
      customerEmail,
      customerName,
      orderNumber: orderId,
      productName,
      quantity,
      amount,
      isPaymentLink: false,
    });
  }
}

/**
 * Generate referral code for first-time customers
 */
async function generateReferralCode(orderId: string): Promise<void> {
  if (!prisma) return;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: {
        include: {
          orders: true,
        },
      },
    },
  });

  if (order?.user && order.user.orders.length === 1) {
    // Generate cryptographically secure referral code
    const referralCode = randomBytes(3).toString('hex').toUpperCase();

    await prisma.referral.create({
      data: {
        code: referralCode,
        orderId,
        referrerId: order.user.id,
        refereeId: order.user.id,
      },
    });
  }
}

/**
 * Handle consumer order
 */
async function handleConsumerOrder(data: CheckoutSessionData): Promise<void> {
  const { orderId, customerEmail, customerName, locale, orderNumber, productName, quantity, amount, session } = data;

  if (!orderId || !prisma) return;

  // Check current order status (idempotency guard)
  const currentOrder = await prisma.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });

  if (!currentOrder || currentOrder.status === 'PAID' || currentOrder.status === 'CANCELLED') {
    return;
  }

  // Update order status
  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'PAID' },
  });

  // Generate referral code if first-time customer
  await generateReferralCode(orderId);

  // Send thank you email
  if (customerEmail) {
    const emailResult = await sendThankYouEmail({
      customerEmail,
      customerName,
      orderNumber: orderId,
      productName,
      quantity,
      amount,
      locale
    });

    if (!emailResult.success) {
      console.error('[Webhook] Failed to send thank you email:', emailResult.error);
    }

    // Send admin notification
    await sendAdminNotification({
      customerEmail,
      customerName,
      orderNumber: orderId,
      productName,
      quantity,
      amount,
      isPaymentLink: false,
    });
  }

  // Process affiliate conversion if applicable
  const affiliateRef = session.metadata?.affiliate_ref;
  if (affiliateRef) {
    const affiliateData = parseAffiliateMetadata(affiliateRef);
    if (affiliateData) {
      const orderSubtotalDollars = amount / 100;

      const conversionResult = await recordAffiliateConversion({
        affiliateCode: affiliateData.code,
        affiliateSessionId: affiliateData.sessionId,
        orderId: orderNumber,
        orderSubtotal: orderSubtotalDollars,
      });

      if (!conversionResult.success) {
        console.error('[Webhook] Failed to record affiliate conversion:', conversionResult.error);
      }
    }
  }
}

/**
 * Main handler for checkout.session.completed event
 */
export async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const orderType = session.metadata?.type;

  // Handle Affiliate Starter Kit purchase
  if (orderType === 'affiliate_starter_kit') {
    await handleAffiliateStarterKit(session);
    return;
  }

  // Extract common session data
  const data = await extractSessionData(session);

  // Handle Payment Links (no database order)
  if (data.isPaymentLink) {
    await handlePaymentLinkOrder(data);
    return;
  }

  // Handle database-backed orders
  if (orderType === 'retailer_order') {
    await handleRetailerOrder(data);
  } else {
    await handleConsumerOrder(data);
  }
}
