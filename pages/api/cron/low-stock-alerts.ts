/**
 * Cron Job: Low Stock Alert Notifications
 *
 * Runs daily to check inventory levels and send alerts to admin
 * when products fall below their low stock threshold.
 *
 * Vercel cron schedule: 0 9 * * * (daily at 9 AM)
 * Security: Requires CRON_SECRET header for authorization
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { getLowStockProducts, type LowStockProduct } from '@/lib/inventory';
import {
  LowStockAlertEmailHTML,
  getLowStockAlertSubject,
} from '@/emails/low-stock-alert';

// Admin email to receive notifications (can be comma-separated for multiple)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@purrify.ca';

interface CronResponse {
  success: boolean;
  productsChecked?: number;
  lowStockCount?: number;
  outOfStockCount?: number;
  emailSent?: boolean;
  message?: string;
}

/**
 * Extract cron secret from request headers or query
 */
function extractCronSecret(req: NextApiRequest): string | undefined {
  const headerSecret = req.headers['x-cron-secret'];
  if (typeof headerSecret === 'string') return headerSecret;
  if (Array.isArray(headerSecret)) return headerSecret[0];

  const querySecret = req.query.secret;
  if (typeof querySecret === 'string') return querySecret;
  if (Array.isArray(querySecret)) return querySecret[0];

  return undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CronResponse>
) {
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

      // Verify HTTP method
      if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({
          success: false,
          message: 'Method not allowed',
        });
      }

      // Verify cron secret
      const cronSecret = extractCronSecret(req);
      const expectedSecret = process.env.CRON_SECRET;

      if (!expectedSecret || cronSecret !== expectedSecret) {
        logger.warn('Unauthorized low stock alert cron attempt');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      // Check if Resend is configured
      if (!isResendConfigured()) {
        logger.error('Resend email service not configured');
        return res.status(500).json({
          success: false,
          message: 'Email service not configured',
        });
      }

      try {
        // Get all low stock products
        const lowStockProducts = await getLowStockProducts();

        span.setAttribute('lowStockCount', lowStockProducts.length);

        logger.info('Checked inventory levels', {
          lowStockCount: lowStockProducts.length,
        });

        if (lowStockProducts.length === 0) {
          return res.status(200).json({
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
          return res.status(500).json({
            success: false,
            message: `Failed to send email: ${error.message}`,
          });
        }

        logger.info('Low stock alert email sent', {
          emailId: data?.id,
          outOfStockCount: outOfStockProducts.length,
          lowStockCount: lowStockOnly.length,
          recipients: adminEmails.length,
        });

        return res.status(200).json({
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

        return res.status(500).json({
          success: false,
          message: error instanceof Error ? error.message : 'Internal server error',
        });
      }
    }
  );
}
