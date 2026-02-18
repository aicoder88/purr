/**
 * Cron Job: Send Review Request Emails
 *
 * Runs daily at 10 AM to send review request emails to customers
 * whose orders were delivered 7+ days ago and haven't received a review request yet.
 *
 * Security: Requires CRON_SECRET header for authorization
 */

import type { NextRequest } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { ReviewRequestEmailHTML, getReviewRequestEmailSubject } from '@/emails/review-request';
import { extractCronSecret } from '@/lib/security/cron-secret';

// Number of days after delivery to send review request
const DAYS_AFTER_DELIVERY = 7;

// Maximum emails to send per cron run (to avoid rate limits)
const MAX_EMAILS_PER_RUN = 50;

/**
 * Determine locale from customer data or default
 */
function determineLocale(customer: { province?: string } | null): string {
  // Default to English, but French for Quebec
  if (customer?.province) {
    const province = customer.province.toLowerCase();
    if (province === 'qc' || province === 'quebec' || province === 'québec') {
      return 'fr';
    }
  }
  return 'en';
}

export async function GET(req: NextRequest): Promise<Response> {
  return handleReviewRequests(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleReviewRequests(req);
}

async function handleReviewRequests(req: NextRequest): Promise<Response> {
  // Removed Sentry.startSpan wrapper
// async (span) => {
      
      console.info('Review request cron job started', {
        method: req.method,
        timestamp: new Date().toISOString()
      });

      // Verify cron secret
      const cronSecret = extractCronSecret(req);
      const expectedSecret = process.env.CRON_SECRET;

      if (!expectedSecret || cronSecret !== expectedSecret) {
        console.warn('Unauthorized review request cron attempt', {
          hasSecret: !!cronSecret
        });
        return Response.json({
          success: false,
          message: 'Unauthorized'
        }, { status: 401 });
      }

      // Check if database is configured
      if (!prisma) {
        console.error('Database not configured for review request cron');
        return Response.json({
          success: false,
          message: 'Database not configured'
        }, { status: 500 });
      }

      // Check if Resend is configured
      if (!isResendConfigured()) {
        console.error('Resend email service not configured');
        return Response.json({
          success: false,
          message: 'Email service not configured'
        }, { status: 500 });
      }

      const resend = new Resend(RESEND_CONFIG.apiKey);

      try {
        // Calculate the cutoff date (7+ days ago)
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - DAYS_AFTER_DELIVERY);

        console.info('Querying orders for review requests', {
          cutoffDate: cutoffDate.toISOString(),
          daysAfterDelivery: DAYS_AFTER_DELIVERY
        });

        // Find delivered orders that haven't received a review request
        const eligibleOrders = await prisma.order.findMany({
          where: {
            status: 'DELIVERED',
            reviewRequestSent: false,
            updatedAt: {
              lte: cutoffDate
            }
          },
          include: {
            customer: true,
            items: {
              include: {
                product: true
              }
            }
          },
          take: MAX_EMAILS_PER_RUN,
          orderBy: {
            updatedAt: 'asc' // Process oldest first
          }
        });

        console.info('Found eligible orders for review requests', {
          count: eligibleOrders.length,
          maxPerRun: MAX_EMAILS_PER_RUN
        });

        // // // // span.setAttribute('eligibleOrdersCount', eligibleOrders.length);

        if (eligibleOrders.length === 0) {
          return Response.json({
            success: true,
            sent: 0,
            skipped: 0,
            errors: 0,
            message: 'No orders eligible for review requests'
          });
        }

        let sentCount = 0;
        let skippedCount = 0;
        let errorCount = 0;
        const details: Array<{ orderId: string; email: string; status: string }> = [];

        for (const order of eligibleOrders) {
          const customer = order.customer;

          // Skip if no customer email
          if (!customer?.email) {
            console.warn('Order has no customer email, skipping', {
              orderId: order.id
            });
            skippedCount++;
            details.push({
              orderId: order.id,
              email: 'N/A',
              status: 'skipped - no email'
            });
            continue;
          }

          try {
            // Determine locale based on customer province
            const locale = determineLocale(customer);

            // Get product name from first order item
            const productName = order.items[0]?.product?.name || 'Purrify';

            // Get customer name
            const customerName = customer.firstName
              ? `${customer.firstName}${customer.lastName ? ' ' + customer.lastName : ''}`
              : 'Valued Customer';

            // Generate email HTML
            const emailHTML = ReviewRequestEmailHTML({
              customerName,
              customerEmail: customer.email,
              orderNumber: order.id,
              productName,
              locale
            });

            const emailSubject = getReviewRequestEmailSubject(locale);

            console.info('Sending review request email', {
              orderId: order.id,
              email: customer.email,
              locale,
              productName
            });

            // Send email via Resend
            const { data, error } = await resend.emails.send({
              from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
              to: customer.email,
              subject: emailSubject,
              html: emailHTML,
              tags: [
                { name: 'type', value: 'review-request' },
                { name: 'order_id', value: order.id },
                { name: 'locale', value: locale }
              ]
            });

            if (error) {
              console.error('Failed to send review request email', {
                orderId: order.id,
                email: customer.email,
                error: error.message
              });
              errorCount++;
              details.push({
                orderId: order.id,
                email: customer.email,
                status: `error - ${error.message}`
              });
              continue;
            }

            // Update order to mark review request as sent
            await prisma.order.update({
              where: { id: order.id },
              data: {
                reviewRequestSent: true,
                reviewRequestAt: new Date()
              }
            });

            sentCount++;
            details.push({
              orderId: order.id,
              email: customer.email,
              status: `sent - ${data?.id}`
            });

            console.info('Review request email sent successfully', {
              orderId: order.id,
              email: customer.email,
              emailId: data?.id
            });

          } catch (orderError) {
            console.error('Error processing order for review request', {
              orderId: order.id,
              error: orderError instanceof Error ? orderError.message : 'Unknown error'
            });
            errorCount++;
            details.push({
              orderId: order.id,
              email: customer?.email || 'N/A',
              status: `error - ${orderError instanceof Error ? orderError.message : 'Unknown'}`
            });
          }
        }

        // // // // span.setAttribute('sentCount', sentCount);
        // // // // span.setAttribute('skippedCount', skippedCount);
        // // // // span.setAttribute('errorCount', errorCount);

        console.info('Review request cron job completed', {
          sent: sentCount,
          skipped: skippedCount,
          errors: errorCount
        });

        return Response.json({
          success: true,
          sent: sentCount,
          skipped: skippedCount,
          errors: errorCount,
          message: `Processed ${eligibleOrders.length} orders: ${sentCount} sent, ${skippedCount} skipped, ${errorCount} errors`,
          details
        });

      } catch (error) {
        console.error('Review request cron job failed', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });

        return Response.json({
          success: false,
          message: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
      }
    }
