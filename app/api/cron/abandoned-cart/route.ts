/**
 * Cron Job: Send Abandoned Cart Recovery Emails
 *
 * Runs every hour to send recovery emails to users who abandoned their carts.
 * - First email: 1 hour after cart abandonment
 * - Second email: 24 hours after abandonment (with 10% discount code)
 *
 * Vercel cron schedule: 0 * * * * (every hour)
 * Security: Requires CRON_SECRET header for authorization
 */

import type { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import {
  getCartsNeedingRecoveryEmails,
  recordRecoveryEmailSent,
  generateDiscountCode,
  calculateCartTotal,
  cleanupOldCarts,
} from '@/lib/cart-tracking';
import {
  AbandonedCartEmailHTML,
  getAbandonedCartEmailSubject,
} from '@/emails/abandoned-cart';

// Maximum emails to send per cron run (to avoid rate limits)
const MAX_EMAILS_PER_RUN = 50;

// Discount percentage for second recovery email
const DISCOUNT_PERCENTAGE = 10;

interface CronResponse {
  success: boolean;
  sent?: number;
  skipped?: number;
  errors?: number;
  cleanedUp?: number;
  message?: string;
  details?: Array<{ cartId: string; email: string; status: string }>;
}

/**
 * Extract cron secret from request headers or query
 */
function extractCronSecret(req: NextRequest): string | null {
  const headerSecret = req.headers.get('x-cron-secret');
  if (headerSecret) return headerSecret;

  const { searchParams } = new URL(req.url);
  return searchParams.get('secret');
}

/**
 * Generate cart recovery URL with session restoration
 */
function generateRecoveryUrl(cartId: string, locale: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';
  const localePath = locale !== 'en' ? `/${locale}` : '';
  return `${baseUrl}${localePath}/cart?recover=${cartId}`;
}

export async function GET(req: NextRequest): Promise<Response> {
  return handleAbandonedCart(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleAbandonedCart(req);
}

async function handleAbandonedCart(req: NextRequest): Promise<Response> {
  return Sentry.startSpan(
    {
      op: 'cron.job',
      name: 'Send Abandoned Cart Emails',
    },
    async (span) => {
      const { logger } = Sentry;

      logger.info('Abandoned cart cron job started', {
        method: req.method,
        timestamp: new Date().toISOString(),
      });

      // Verify cron secret
      const cronSecret = extractCronSecret(req);
      const expectedSecret = process.env.CRON_SECRET;

      if (!expectedSecret || cronSecret !== expectedSecret) {
        logger.warn('Unauthorized abandoned cart cron attempt', {
          hasSecret: !!cronSecret,
        });
        return Response.json({
          success: false,
          message: 'Unauthorized',
        }, { status: 401 });
      }

      // Check if Resend is configured
      if (!isResendConfigured()) {
        logger.error('Resend email service not configured');
        return Response.json({
          success: false,
          message: 'Email service not configured',
        }, { status: 500 });
      }

      const resend = new Resend(RESEND_CONFIG.apiKey);

      try {
        // First, clean up old expired/converted carts
        const cleanedUp = await cleanupOldCarts();
        if (cleanedUp > 0) {
          logger.info('Cleaned up old carts', { count: cleanedUp });
        }

        // Get carts needing recovery emails
        const carts = await getCartsNeedingRecoveryEmails();

        logger.info('Found carts needing recovery emails', {
          count: carts.length,
          maxPerRun: MAX_EMAILS_PER_RUN,
        });

        span.setAttribute('eligibleCartsCount', carts.length);

        if (carts.length === 0) {
          return Response.json({
            success: true,
            sent: 0,
            skipped: 0,
            errors: 0,
            cleanedUp,
            message: 'No carts eligible for recovery emails',
          });
        }

        let sentCount = 0;
        let skippedCount = 0;
        let errorCount = 0;
        const details: Array<{ cartId: string; email: string; status: string }> = [];

        // Limit to MAX_EMAILS_PER_RUN to avoid rate limits
        const cartsToProcess = carts.slice(0, MAX_EMAILS_PER_RUN);

        for (const cart of cartsToProcess) {
          // Skip if no email
          if (!cart.email) {
            logger.warn('Cart has no email, skipping', { cartId: cart.id });
            skippedCount++;
            details.push({
              cartId: cart.id,
              email: 'N/A',
              status: 'skipped - no email',
            });
            continue;
          }

          // Skip if cart is empty
          if (!cart.items || cart.items.length === 0) {
            logger.warn('Cart is empty, skipping', { cartId: cart.id });
            skippedCount++;
            details.push({
              cartId: cart.id,
              email: cart.email,
              status: 'skipped - empty cart',
            });
            continue;
          }

          try {
            const isSecondEmail = cart.emailsSent === 1;
            const discountCode = isSecondEmail ? generateDiscountCode() : undefined;
            const totalAmount = calculateCartTotal(cart.items);
            const recoveryUrl = generateRecoveryUrl(cart.id, cart.locale);

            // Generate email HTML
            const emailHTML = AbandonedCartEmailHTML({
              customerName: undefined, // We don't have name for anonymous carts
              items: cart.items,
              totalAmount,
              discountCode,
              discountPercentage: DISCOUNT_PERCENTAGE,
              locale: cart.locale,
              recoveryUrl,
              isSecondEmail,
            });

            const emailSubject = getAbandonedCartEmailSubject(cart.locale, isSecondEmail);

            logger.info('Sending abandoned cart email', {
              cartId: cart.id,
              email: cart.email,
              locale: cart.locale,
              isSecondEmail,
              hasDiscount: !!discountCode,
            });

            // Send email via Resend
            const { data, error } = await resend.emails.send({
              from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
              to: cart.email,
              subject: emailSubject,
              html: emailHTML,
              tags: [
                { name: 'type', value: 'abandoned-cart' },
                { name: 'cart_id', value: cart.id },
                { name: 'email_number', value: String(cart.emailsSent + 1) },
                { name: 'locale', value: cart.locale },
              ],
            });

            if (error) {
              logger.error('Failed to send abandoned cart email', {
                cartId: cart.id,
                email: cart.email,
                error: error.message,
              });
              errorCount++;
              details.push({
                cartId: cart.id,
                email: cart.email,
                status: `error - ${error.message}`,
              });
              continue;
            }

            // Record email sent
            await recordRecoveryEmailSent(cart.id);

            sentCount++;
            details.push({
              cartId: cart.id,
              email: cart.email,
              status: `sent - email #${cart.emailsSent + 1} - ${data?.id}`,
            });

            logger.info('Abandoned cart email sent successfully', {
              cartId: cart.id,
              email: cart.email,
              emailId: data?.id,
              emailNumber: cart.emailsSent + 1,
            });
          } catch (cartError) {
            Sentry.captureException(cartError);
            logger.error('Error processing cart for recovery email', {
              cartId: cart.id,
              error: cartError instanceof Error ? cartError.message : 'Unknown error',
            });
            errorCount++;
            details.push({
              cartId: cart.id,
              email: cart.email || 'N/A',
              status: `error - ${cartError instanceof Error ? cartError.message : 'Unknown'}`,
            });
          }
        }

        span.setAttribute('sentCount', sentCount);
        span.setAttribute('skippedCount', skippedCount);
        span.setAttribute('errorCount', errorCount);

        logger.info('Abandoned cart cron job completed', {
          sent: sentCount,
          skipped: skippedCount,
          errors: errorCount,
          cleanedUp,
        });

        return Response.json({
          success: true,
          sent: sentCount,
          skipped: skippedCount,
          errors: errorCount,
          cleanedUp,
          message: `Processed ${cartsToProcess.length} carts: ${sentCount} sent, ${skippedCount} skipped, ${errorCount} errors`,
          details,
        });
      } catch (error) {
        Sentry.captureException(error);
        logger.error('Abandoned cart cron job failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        return Response.json({
          success: false,
          message: error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 });
      }
    }
  );
}
