import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Resend } from 'resend';
import * as Sentry from '@sentry/nextjs';
import prisma from '../../../src/lib/prisma';
import { buffer } from 'micro';
import { OrderConfirmationEmailHTML, getOrderConfirmationEmailSubject } from '../../../src/emails/order-confirmation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Initialize Resend for sending emails directly
const resend = new Resend(process.env.RESEND_API_KEY);

// Admin email for notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@purrify.ca';

/**
 * Send admin notification email when a sale is made
 */
async function sendAdminNotification({
  customerEmail,
  customerName,
  orderNumber,
  productName,
  quantity,
  amount,
  isPaymentLink = false,
}: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  amount: number;
  isPaymentLink?: boolean;
}): Promise<{ success: boolean; error?: string }> {
  return Sentry.startSpan(
    {
      op: 'email.send',
      name: 'Send Admin Notification',
    },
    async (span) => {
      const { logger } = Sentry;

      span.setAttribute('orderNumber', orderNumber);
      span.setAttribute('amount', amount);
      span.setAttribute('isPaymentLink', isPaymentLink);

      if (!process.env.RESEND_API_KEY) {
        logger.error('RESEND_API_KEY not configured for admin notification');
        return { success: false, error: 'Email service not configured' };
      }

      try {
    const formattedAmount = (amount / 100).toFixed(2);
    const orderSource = isPaymentLink ? '(via Payment Link)' : '(via Website Checkout)';

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Sale Notification</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #03E46A; margin-bottom: 20px;">🎉 New Sale!</h1>
            <p style="font-size: 16px; color: #333;">A new order has been placed ${orderSource}:</p>

            <div style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin: 20px 0;">
              <p style="margin: 8px 0;"><strong>Order #:</strong> ${orderNumber}</p>
              <p style="margin: 8px 0;"><strong>Customer:</strong> ${customerName || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${customerEmail}</p>
              <p style="margin: 8px 0;"><strong>Product:</strong> ${productName}</p>
              <p style="margin: 8px 0;"><strong>Quantity:</strong> ${quantity}</p>
              <p style="margin: 8px 0; font-size: 18px;"><strong>Amount:</strong> $${formattedAmount} CAD</p>
            </div>

            <p style="color: #666; font-size: 14px;">
              View this order in the <a href="https://dashboard.stripe.com/payments" style="color: #03E46A;">Stripe Dashboard</a>
            </p>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Purrify Notifications <support@purrify.ca>',
      to: ADMIN_EMAIL,
      subject: `🎉 New Sale: $${formattedAmount} - ${productName}`,
      html: emailHTML,
    });

        if (error) {
          logger.error('Admin notification failed', {
            error: error.message,
            orderNumber
          });
          return { success: false, error: error.message };
        }

        span.setAttribute('emailId', data?.id || '');
        logger.info('Admin notification sent successfully', {
          emailId: data?.id,
          to: ADMIN_EMAIL,
          orderNumber
        });
        return { success: true };
      } catch (err) {
        Sentry.captureException(err);
        logger.error('Error sending admin notification', {
          error: err instanceof Error ? err.message : 'Unknown error',
          orderNumber
        });
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
      }
    }
  );
}

/**
 * Send thank you email directly via Resend
 * This avoids the internal HTTP fetch which can fail in serverless environments
 */
async function sendThankYouEmail({
  customerEmail,
  customerName,
  orderNumber,
  productName,
  quantity,
  amount,
  locale = 'en'
}: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  amount: number;
  locale?: string;
}): Promise<{ success: boolean; error?: string }> {
  return Sentry.startSpan(
    {
      op: 'email.send',
      name: 'Send Thank You Email',
    },
    async (span) => {
      const { logger } = Sentry;

      span.setAttribute('orderNumber', orderNumber);
      span.setAttribute('locale', locale);
      span.setAttribute('amount', amount);

      // Validate Resend API key exists (Resend will validate the key itself)
      if (!process.env.RESEND_API_KEY) {
        logger.error('RESEND_API_KEY not configured for customer email');
        return { success: false, error: 'Email service not configured' };
      }

      try {
    const emailHTML = OrderConfirmationEmailHTML({
      customerEmail,
      customerName,
      orderNumber,
      productName,
      quantity,
      amount,
      locale
    });

    const emailSubject = getOrderConfirmationEmailSubject(locale);

    const { data, error } = await resend.emails.send({
      from: 'Purrify Support <support@purrify.ca>',
      to: customerEmail,
      subject: emailSubject,
      html: emailHTML,
    });

        if (error) {
          logger.error('Customer email failed', {
            error: error.message,
            orderNumber,
            customerEmail
          });
          return { success: false, error: error.message };
        }

        span.setAttribute('emailId', data?.id || '');
        logger.info('Customer email sent successfully', {
          emailId: data?.id,
          to: customerEmail,
          orderNumber
        });
        return { success: true };
      } catch (err) {
        Sentry.captureException(err);
        logger.error('Error sending customer email', {
          error: err instanceof Error ? err.message : 'Unknown error',
          orderNumber
        });
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
      }
    }
  );
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return Sentry.startSpan(
    {
      op: 'webhook.stripe',
      name: 'POST /api/webhooks/stripe',
    },
    async (span) => {
      const { logger } = Sentry;

      if (req.method !== 'POST') {
        logger.warn('Invalid method for Stripe webhook', {
          method: req.method
        });
        return res.status(405).json({ message: 'Method not allowed' });
      }

      const buf = await buffer(req);
      const sig = req.headers['stripe-signature']!;

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        span.setAttribute('eventType', event.type);
        span.setAttribute('eventId', event.id);
        logger.info('Stripe webhook received', {
          eventType: event.type,
          eventId: event.id
        });
      } catch (err) {
        Sentry.captureException(err);
        logger.error('Webhook signature verification failed', {
          error: err instanceof Error ? err.message : 'Unknown error'
        });
        return res.status(400).send('Webhook signature verification failed');
      }

      try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        const orderType = session.metadata?.type;

        // Determine if this is a Payment Link (no orderId) or website checkout
        const isPaymentLink = !orderId;

        span.setAttribute('sessionId', session.id);
        span.setAttribute('isPaymentLink', isPaymentLink);
        span.setAttribute('orderType', orderType || 'consumer');
        if (orderId) span.setAttribute('orderId', orderId);

        logger.info('Checkout session completed', {
          sessionId: session.id,
          orderId,
          orderType,
          isPaymentLink,
          amount: session.amount_total
        });

        // Extract customer details for email
        const customerEmail = session.customer_details?.email || session.customer_email;
        const customerName = session.customer_details?.name || undefined;

        // Generate order number: use orderId if available, otherwise use session ID
        const orderNumber = orderId || session.id.slice(-12).toUpperCase();

        // Get line items to extract product details
        let productName = 'Purrify';
        let quantity = 1;
        const amount = session.amount_total || 0;

        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
          if (lineItems.data.length > 0) {
            const item = lineItems.data[0];
            productName = item.description || item.price?.product?.toString() || 'Purrify';
            quantity = lineItems.data.reduce((sum, li) => sum + (li.quantity || 0), 0);
          }
        } catch (err) {
          console.error('Error fetching line items:', err);
          // Continue with defaults
        }

        // Handle Payment Links (no database order to update)
        if (isPaymentLink) {
          logger.info('Payment Link checkout completed', {
            sessionId: session.id,
            amount: session.amount_total
          });

          // Send customer confirmation email
          if (customerEmail) {
            const emailResult = await sendThankYouEmail({
              customerEmail,
              customerName,
              orderNumber,
              productName,
              quantity,
              amount,
              locale: 'en'
            });

            if (!emailResult.success) {
              logger.warn('Failed to send Payment Link thank you email', {
                error: emailResult.error,
                sessionId: session.id
              });
            }
          }

          // Send admin notification
          if (customerEmail) {
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
              logger.warn('Failed to send admin notification', {
                error: adminResult.error,
                sessionId: session.id
              });
            }
          }

          break;
        }

        // Database operations require prisma
        if (!prisma) {
          throw new Error('Database connection not established');
        }

        // Handle retailer orders differently
        if (orderType === 'retailer_order') {
          const paymentIntent = session.payment_intent as string;

          // Update retailer order status
          await prisma.retailerOrder.update({
            where: { id: orderId },
            data: {
              status: 'PAID',
              stripePaymentIntentId: paymentIntent,
            },
          });

          logger.info('Retailer order paid successfully', {
            orderId,
            paymentIntent,
            amount: session.amount_total
          });

          // Send thank you email to retailer
          if (customerEmail) {
            const emailResult = await sendThankYouEmail({
              customerEmail,
              customerName,
              orderNumber: orderId,
              productName,
              quantity,
              amount,
              locale: 'en'
            });

            if (!emailResult.success) {
              logger.warn('Failed to send retailer thank you email', {
                error: emailResult.error,
                orderId
              });
            }

            // Send admin notification for retailer order
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

          break;
        }

        // Handle consumer orders
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'PAID' },
        });

        // Generate referral code if this is a first-time customer
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
          const { randomBytes } = await import('crypto');
          const referralCode = randomBytes(3).toString('hex').toUpperCase();

          await prisma.referral.create({
            data: {
              code: referralCode,
              orderId,
              referrerId: order.user.id,
              refereeId: order.user.id, // Initially set to self, will be updated when used
            },
          });
        }

        // Send thank you email to customer
        if (customerEmail) {
          const emailResult = await sendThankYouEmail({
            customerEmail,
            customerName,
            orderNumber: orderId,
            productName,
            quantity,
            amount,
            locale: 'en' // TODO: Get from session metadata or customer preference
          });

          if (!emailResult.success) {
            logger.warn('Failed to send thank you email', {
              error: emailResult.error,
              orderId
            });
            // Don't fail the webhook if email fails
          }

          // Send admin notification for consumer order
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

        break;
      }

      case 'checkout.session.expired': {
        if (!prisma) {
          throw new Error('Database connection not established');
        }
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        const orderType = session.metadata?.type;

        if (orderId) {
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
        break;
      }

      default:
        logger.debug('Unhandled Stripe event type', {
          eventType: event.type,
          eventId: event.id
        });
        }

        logger.info('Webhook processed successfully', {
          eventType: event.type,
          eventId: event.id
        });

        return res.status(200).json({ received: true });
      } catch (error) {
        Sentry.captureException(error);
        logger.error('Error processing webhook', {
          error: error instanceof Error ? error.message : 'Unknown error',
          eventType: event.type,
          eventId: event.id
        });
        return res.status(500).json({ message: 'Error processing webhook' });
      }
    }
  );
} 