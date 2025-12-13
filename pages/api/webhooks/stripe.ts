import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import prisma from '../../../src/lib/prisma';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send('Webhook signature verification failed');
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        if (!prisma) {
          throw new Error('Database connection not established');
        }
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        const orderType = session.metadata?.type;

        if (!orderId) {
          throw new Error('No order ID in session metadata');
        }

        // Extract customer details for email
        const customerEmail = session.customer_details?.email || session.customer_email;
        const customerName = session.customer_details?.name || undefined;

        // Get line items to extract product details
        let productName = 'Purrify';
        let quantity = 1;
        let amount = session.amount_total || 0;

        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
          if (lineItems.data.length > 0) {
            const item = lineItems.data[0];
            productName = item.description || item.price?.product?.toString() || 'Purrify';
            quantity = item.quantity || 1;
          }
        } catch (err) {
          console.error('Error fetching line items:', err);
          // Continue with defaults
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

          console.log(`Retailer order ${orderId} paid successfully`);

          // Send thank you email to retailer
          if (customerEmail) {
            try {
              const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/email/send-thank-you-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  customerEmail,
                  customerName,
                  orderNumber: orderId,
                  productName,
                  quantity,
                  amount,
                  locale: 'en'
                })
              });

              if (!emailResponse.ok) {
                console.error('Failed to send retailer thank you email:', await emailResponse.text());
              } else {
                console.log(`Thank you email sent to retailer: ${customerEmail}`);
              }
            } catch (emailError) {
              console.error('Error sending retailer thank you email:', emailError);
            }
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
          try {
            const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/email/send-thank-you-email`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customerEmail,
                customerName,
                orderNumber: orderId,
                productName,
                quantity,
                amount,
                locale: 'en' // TODO: Get from session metadata or customer preference
              })
            });

            if (!emailResponse.ok) {
              console.error('Failed to send thank you email:', await emailResponse.text());
            } else {
              console.log(`Thank you email sent to: ${customerEmail}`);
            }
          } catch (emailError) {
            console.error('Error sending thank you email:', emailError);
            // Don't fail the webhook if email fails
          }
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
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ message: 'Error processing webhook' });
  }
} 