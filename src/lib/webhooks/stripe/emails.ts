/**
 * Stripe Webhook Email Services
 * Handles admin and customer email notifications
 */
import { Resend } from 'resend';
import { OrderConfirmationEmailHTML, getOrderConfirmationEmailSubject } from '@/emails/order-confirmation';
import { ADMIN_EMAIL } from './config';

// Lazy initialize Resend
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

interface AdminNotificationParams {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  amount: number;
  isPaymentLink?: boolean;
}

/**
 * Send admin notification email when a sale is made
 */
export async function sendAdminNotification({
  customerEmail,
  customerName,
  orderNumber,
  productName,
  quantity,
  amount,
  isPaymentLink = false,
}: AdminNotificationParams): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
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
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

interface ThankYouEmailParams {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  amount: number;
  locale?: string;
}

/**
 * Send thank you email to customer
 */
export async function sendThankYouEmail({
  customerEmail,
  customerName,
  orderNumber,
  productName,
  quantity,
  amount,
  locale = 'en'
}: ThankYouEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
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
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

interface AffiliateActivationEmailParams {
  customerEmail: string;
}

/**
 * Send affiliate activation confirmation email
 */
export async function sendAffiliateActivationEmail({
  customerEmail
}: AffiliateActivationEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { error } = await getResend().emails.send({
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

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
