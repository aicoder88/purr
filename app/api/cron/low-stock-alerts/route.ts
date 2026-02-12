/**
 * Cron Job: Low Stock Alert Notifications
 *
 * Runs daily to check inventory levels and send alerts to admin
 * when products fall below their low stock threshold.
 *
 * Vercel cron schedule: 0 9 * * * (daily at 9 AM)
 * Security: Requires CRON_SECRET header for authorization
 */

import type { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { getLowStockProducts } from '@/lib/inventory';
import { extractCronSecret } from '@/lib/security/cron-secret';
import {
  LowStockAlertEmailHTML,
  getLowStockAlertSubject,
} from '@/emails/low-stock-alert';

// Admin email to receive notifications (can be comma-separated for multiple)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@purrify.ca';

export async function GET(req: NextRequest): Promise<Response> {
  return handleLowStockAlerts(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleLowStockAlerts(req);
}

async function handleLowStockAlerts(req: NextRequest): Promise<Response> {
  return Sentry.startSpan(
    {
      op: 'cron.job',
      name: 'Low Stock Alerts',
    },
    async (span) => {
      const { logger } = Sentry;

      logger.info('Low stock alert cron job started', {
        timestamp: new Date().toISOString(),
      });

      // Verify cron secret
      const cronSecret = extractCronSecret(req);
      const expectedSecret = process.env.CRON_SECRET;

      if (!expectedSecret || cronSecret !== expectedSecret) {
        logger.warn('Unauthorized low stock alert cron attempt');
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

      try {
        // Get all low stock products
        const lowStockProducts = await getLowStockProducts();

        span.setAttribute('lowStockCount', lowStockProducts.length);

        logger.info('Checked inventory levels', {
          lowStockCount: lowStockProducts.length,
        });

        if (lowStockProducts.length === 0) {
          return Response.json({
            success: true,
            lowStockCount: 0,
            outOfStockCount: 0,
            emailSent: false,
            message: 'All products have adequate stock levels',
          });
        }

        // Separate out-of-stock from low stock
        const outOfStockProducts = lowStockProducts.filter(
          (p) => p.stockQuantity === 0
        );
        const lowStockOnly = lowStockProducts.filter(
          (p) => p.stockQuantity > 0
        );

        // Send alert email
        const resend = new Resend(RESEND_CONFIG.apiKey);
        const adminUrl =
          process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';

        const emailHTML = LowStockAlertEmailHTML({
          products: lowStockProducts,
          adminUrl: `${adminUrl}/admin`,
        });

        const emailSubject = getLowStockAlertSubject(
          outOfStockProducts.length,
          lowStockOnly.length
        );

        // Parse admin emails (support comma-separated list)
        const adminEmails = ADMIN_EMAIL.split(',').map((e) => e.trim());

        const { data, error } = await resend.emails.send({
          from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
          to: adminEmails,
          subject: emailSubject,
          html: emailHTML,
          tags: [
            { name: 'type', value: 'low-stock-alert' },
            { name: 'out_of_stock_count', value: String(outOfStockProducts.length) },
            { name: 'low_stock_count', value: String(lowStockOnly.length) },
          ],
        });

        if (error) {
          logger.error('Failed to send low stock alert email', {
            error: error.message,
          });
          return Response.json({
            success: false,
            message: `Failed to send email: ${error.message}`,
          }, { status: 500 });
        }

        logger.info('Low stock alert email sent', {
          emailId: data?.id,
          outOfStockCount: outOfStockProducts.length,
          lowStockCount: lowStockOnly.length,
          recipients: adminEmails.length,
        });

        return Response.json({
          success: true,
          productsChecked: lowStockProducts.length,
          lowStockCount: lowStockOnly.length,
          outOfStockCount: outOfStockProducts.length,
          emailSent: true,
          message: `Alert sent for ${lowStockProducts.length} products`,
        });
      } catch (error) {
        Sentry.captureException(error);
        logger.error('Low stock alert cron job failed', {
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
