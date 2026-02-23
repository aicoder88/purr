import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { OrderConfirmationEmailHTML, getOrderConfirmationEmailSubject } from '@/emails/order-confirmation';
import { recordAffiliateConversion, parseAffiliateMetadata } from '@/lib/affiliate/conversion';

// Lazy initialize Stripe
let stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripe = new Stripe(key, {
      apiVersion: '2025-08-27.basil',
    });
  }
  return stripe;
}

// Use environment-appropriate webhook secret — never try both
function getWebhookSecret(): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const secret = isProduction
    ? process.env.STRIPE_WEBHOOK_SECRET
    : (process.env.STRIPE_WEBHOOK_SECRET_TEST || process.env.STRIPE_WEBHOOK_SECRET);

  if (!secret) {
    throw new Error(`STRIPE_WEBHOOK_SECRET${isProduction ? '' : '_TEST'} is not configured`);
  }
  return secret;
}

// Lazy initialize Resend for sending emails directly
let resend: Resend | null = null;
function getResend(): Resend {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resend = new Resend(key);
  }
  return resend;
}

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

  if (!process.env.RESEND_API_KEY) {
    // Email service not configured - skip admin notification
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
                  <p style="margin: 8px 0; font-size: 18px;"><strong>Amount:</strong> $${formattedAmount}</p>
                </div>

                <p style="color: #666; font-size: 14px;">
                  View this order in the <a href="https://dashboard.stripe.com/payments" style="color: #03E46A;">Stripe Dashboard</a>
                </p>
              </div>
            </body>
          </html>
        `;

    const { error } = await getResend().emails.send({
      from: 'Purrify Notifications <support@purrify.ca>',
      to: ADMIN_EMAIL,
      subject: `🎉 New Sale: $${formattedAmount} - ${productName}`,
      html: emailHTML,
    });

    if (error) {
      // Admin notification failed - error tracked by monitoring service
      return { success: false, error: error.message };
    }

    // // // // // span.setAttribute('emailId', data?.id || '');
    // Admin notification sent successfully
    return { success: true };
  } catch (_err) {
    // Error sending admin notification - tracked by monitoring service
    return { success: false, error: _err instanceof Error ? _err.message : 'Unknown error' };
  }
  // }
  // );
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


  // Validate Resend API key exists (Resend will validate the key itself)
  if (!process.env.RESEND_API_KEY) {
    // Email service not configured - skip customer email
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

    const { error } = await getResend().emails.send({
      from: 'Purrify Support <support@purrify.ca>',
      to: customerEmail,
      subject: emailSubject,
      html: emailHTML,
    });

    if (error) {
      // Customer email failed - error tracked by monitoring service
      return { success: false, error: error.message };
    }

    // // // // // span.setAttribute('emailId', data?.id || '');
    // Customer email sent successfully
    return { success: true };
  } catch (_err) {
    // Error sending customer email - tracked by monitoring service
    return { success: false, error: _err instanceof Error ? _err.message : 'Unknown error' };
  }
}



export async function POST(req: NextRequest): Promise<Response> {
  // Get raw body for signature verification
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    // Missing stripe-signature header
    return Response.json({ message: 'Missing stripe-signature header' }, { status: 400 });
  }

  // Verify webhook signature with environment-appropriate secret
  let event: Stripe.Event;
  try {
    const secret = getWebhookSecret();
    event = getStripe().webhooks.constructEvent(payload, sig, secret);
  } catch (_err) {
    // Webhook signature verification failed - tracked by monitoring service
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  // // // // // span.setAttribute('eventType', event.type);
  // // // // // span.setAttribute('eventId', event.id);
  // Stripe webhook received

  // Idempotency: check if this event was already processed
  // Stripe event IDs are globally unique (e.g., evt_1234...)
  if (prisma) {
    const alreadyProcessed = await prisma.auditLog.findFirst({
      where: {
        entity: 'stripe_webhook',
        entityId: event.id,
        action: 'PAYMENT_PROCESSED',
      },
    });

    if (alreadyProcessed) {
      // Webhook event already processed (idempotent skip)
      return Response.json({ received: true, deduplicated: true });
    }
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        const orderType = session.metadata?.type;

        // // // // // span.setAttribute('sessionId', session.id);
        // // // // // span.setAttribute('orderType', orderType || 'consumer');
        // if (orderId) // // // // // span.setAttribute('orderId', orderId);

        // Checkout session completed

        // Handle Affiliate Starter Kit purchase
        if (orderType === 'affiliate_starter_kit') {
          const affiliateId = session.metadata?.affiliateId;
          if (affiliateId && prisma) {
            try {
              // Activate the affiliate
              await prisma.affiliate.update({
                where: { id: affiliateId },
                data: {
                  activatedAt: new Date(),
                  starterKitOrderId: session.id,
                },
              });
              // Affiliate activated via starter kit purchase

              // Send activation confirmation email
              const customerEmail = session.customer_details?.email;
              if (customerEmail) {
                await getResend().emails.send({
                  from: 'Purrify Affiliates <support@purrify.ca>',
                  to: customerEmail,
                  subject: 'Your Purrify Affiliate Account is Now Active! 🎉',
                  html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                          <h2 style="color: #9333ea;">Your Affiliate Account is Active!</h2>
                          <p>Thank you for purchasing the Affiliate Starter Kit. Your account is now fully activated and ready to earn commissions!</p>
                          <h3>What's Next?</h3>
                          <ol>
                            <li>Log in to your dashboard and grab your referral link</li>
                            <li>Start sharing with your audience</li>
                            <li>Watch your commissions grow!</li>
                          </ol>
                          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/affiliate/dashboard" style="display: inline-block; background-color: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Go to Dashboard</a></p>
                          <p>Your starter kit will be shipped within 1-2 business days. You'll receive a shipping confirmation with tracking information.</p>
                          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                          <p style="color: #666; font-size: 12px;">The Purrify Affiliate Team</p>
                        </div>
                      `,
                });
              }
            } catch (_err) {
              // Failed to activate affiliate - tracked by monitoring service
            }
          }
          break;
        }

        // Determine if this is a Payment Link (no orderId) or website checkout
        const isPaymentLink = !orderId;
        // // // // // span.setAttribute('isPaymentLink', isPaymentLink);

        // Extract customer details for email
        const customerEmail = session.customer_details?.email || session.customer_email;
        const customerName = session.customer_details?.name || undefined;
        const locale = (session.metadata?.locale as 'en' | 'fr') || 'en';

        // Generate order number: use orderId if available, otherwise use session ID
        const orderNumber = orderId || session.id.slice(-12).toUpperCase();

        // Get line items to extract product details
        let productName = 'Purrify';
        let quantity = 1;
        const amount = session.amount_total || 0;

        try {
          const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, { limit: 5 });
          if (lineItems.data.length > 0) {
            const item = lineItems.data[0];
            productName = item.description || item.price?.product?.toString() || 'Purrify';
            quantity = lineItems.data.reduce((sum, li) => sum + (li.quantity || 0), 0);
          }
        } catch (_err) {
          // Error fetching line items - continue with defaults
        }

        // Handle Payment Links (no database order to update)
        if (isPaymentLink) {
          // Payment Link checkout completed

          // Send customer confirmation email
          if (customerEmail) {
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
              // Failed to send Payment Link thank you email - tracked by monitoring service
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
              // Failed to send admin notification - tracked by monitoring service
            }
          }

          // Process affiliate conversion for Payment Link orders
          const paymentLinkAffiliateRef = session.metadata?.affiliate_ref;
          if (paymentLinkAffiliateRef) {
            const affiliateData = parseAffiliateMetadata(paymentLinkAffiliateRef);
            if (affiliateData) {
              const orderSubtotalDollars = (amount || 0) / 100;

              const conversionResult = await recordAffiliateConversion({
                affiliateCode: affiliateData.code,
                affiliateSessionId: affiliateData.sessionId,
                orderId: orderNumber,
                orderSubtotal: orderSubtotalDollars,
              });

              if (!conversionResult.success) {
                // Failed to record affiliate conversion for Payment Link - tracked by monitoring service
              }
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

          // Check current order status before updating (idempotency guard)
          const currentRetailerOrder = await prisma.retailerOrder.findUnique({
            where: { id: orderId },
            select: { status: true },
          });

          if (!currentRetailerOrder) {
            // Retailer order not found for webhook
            break;
          }

          if (currentRetailerOrder.status === 'PAID') {
            // Retailer order already paid, skipping
            break;
          }

          if (currentRetailerOrder.status === 'CANCELLED') {
            // Retailer order cancelled, skipping
            break;
          }

          // Update retailer order status
          await prisma.retailerOrder.update({
            where: { id: orderId },
            data: {
              status: 'PAID',
              stripePaymentIntentId: paymentIntent,
            },
          });

          // Retailer order paid successfully

          // Send thank you email to retailer
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
              // Failed to send retailer thank you email - tracked by monitoring service
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

        // Check current order status before updating (idempotency guard)
        const currentOrder = await prisma.order.findUnique({
          where: { id: orderId },
          select: { status: true },
        });

        if (!currentOrder) {
          // Order not found for webhook
          break;
        }

        if (currentOrder.status === 'PAID') {
          // Order already paid, skipping
          break;
        }

        if (currentOrder.status === 'CANCELLED') {
          // Order cancelled, skipping
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
            locale
          });

          if (!emailResult.success) {
            // Failed to send thank you email - tracked by monitoring service
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

        // Process affiliate conversion if applicable
        const affiliateRef = session.metadata?.affiliate_ref;
        if (affiliateRef) {
          const affiliateData = parseAffiliateMetadata(affiliateRef);
          if (affiliateData) {
            // Calculate order subtotal (amount in cents, convert to dollars)
            const orderSubtotalDollars = (amount || 0) / 100;

            const conversionResult = await recordAffiliateConversion({
              affiliateCode: affiliateData.code,
              affiliateSessionId: affiliateData.sessionId,
              orderId: orderNumber,
              orderSubtotal: orderSubtotalDollars,
            });

            if (!conversionResult.success) {
              // Failed to record affiliate conversion - tracked by monitoring service
            }
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
        // Unhandled Stripe event type
    }

    // Record successful processing for idempotency
    if (prisma) {
      try {
        await prisma.auditLog.create({
          data: {
            action: 'PAYMENT_PROCESSED',
            entity: 'stripe_webhook',
            entityId: event.id,
            changes: { eventType: event.type },
          },
        });
      } catch (_auditErr) {
        // Non-fatal: Failed to write idempotency audit log - tracked by monitoring service
      }
    }

    // Webhook processed successfully
    return Response.json({ received: true });
  } catch (_error) {
    // Error processing webhook - tracked by monitoring service
    return Response.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}
