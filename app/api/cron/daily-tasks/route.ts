import type { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';

// Import handlers from other cron tasks
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';
import { SitemapGenerator } from '@/lib/blog/sitemap-generator';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

interface TaskResult {
  task: string;
  success: boolean;
  message?: string;
  details?: Record<string, unknown>;
}

/**
 * Extract cron secret from request headers or query params
 */
function extractCronSecret(req: NextRequest): string | null {
  // Check header first
  const headerSecret = req.headers.get('x-cron-secret');
  if (headerSecret) return headerSecret;
  
  // Check query params
  const { searchParams } = new URL(req.url);
  return searchParams.get('secret');
}

export async function GET(req: NextRequest): Promise<Response> {
  return handleDailyTasks(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleDailyTasks(req);
}

async function handleDailyTasks(req: NextRequest): Promise<Response> {
  return Sentry.startSpan(
    {
      op: 'cron.job',
      name: 'Daily Tasks',
    },
    async (span) => {
      const { logger: sentryLogger } = Sentry;

      sentryLogger.info('Daily tasks cron started', {
        method: req.method
      });

      // Verify cron secret
      const cronSecret = extractCronSecret(req);

      if (cronSecret !== process.env.CRON_SECRET) {
        sentryLogger.warn('Unauthorized cron job attempt', {
          hasSecret: !!cronSecret
        });
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      if (!prisma) {
        sentryLogger.error('Prisma client not initialized');
        return Response.json({ error: 'Database connection unavailable' }, { status: 500 });
      }

      const results: TaskResult[] = [];
      const now = new Date();

      // Task 1: Publish Scheduled Posts
      try {
        sentryLogger.info('Running task: Publish Scheduled Posts');
        const store = new ContentStore();
        const logger = new AuditLogger();
        const sitemapGenerator = new SitemapGenerator();
        const published: string[] = [];

        const locales = ['en', 'fr', 'zh'];
        for (const locale of locales) {
          const posts = await store.getAllPosts(locale, true);
          const toPublish = posts.filter(post =>
            post.status === 'scheduled' &&
            post.scheduledDate &&
            new Date(post.scheduledDate) <= now
          );

          for (const post of toPublish) {
            post.status = 'published';
            post.modifiedDate = now.toISOString();
            await store.savePost(post);
            await logger.log({
              userId: 'system',
              userEmail: 'system@cron',
              action: 'publish',
              resourceType: 'post',
              resourceId: post.slug,
              details: { scheduledDate: post.scheduledDate, locale: post.locale }
            });
            published.push(`${post.slug} (${locale})`);
          }
        }

        if (published.length > 0) {
          await sitemapGenerator.updateAllSitemaps();
        }

        results.push({
          task: 'publishScheduledPosts',
          success: true,
          details: { published: published.length, posts: published }
        });
      } catch (error) {
        Sentry.captureException(error);
        results.push({
          task: 'publishScheduledPosts',
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      // Task 2: Low Stock Alerts
      try {
        sentryLogger.info('Running task: Low Stock Alerts');
        const lowStockProducts = await prisma.product.findMany({
          where: {
            stockQuantity: { lte: 10 },
            trackInventory: true
          },
          select: {
            id: true,
            name: true,
            stockQuantity: true,
            sku: true
          }
        });

        if (lowStockProducts.length > 0 && process.env.ADMIN_EMAIL) {
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: 'Purrify Alerts <alerts@purrify.ca>',
            to: process.env.ADMIN_EMAIL,
            subject: `Low Stock Alert: ${lowStockProducts.length} products need attention`,
            html: `
              <h2>Low Stock Alert</h2>
              <p>The following products have low stock (≤10 units):</p>
              <ul>
                ${lowStockProducts.map(p =>
                  `<li><strong>${p.name}</strong> (SKU: ${p.sku || 'N/A'}) - ${p.stockQuantity} remaining</li>`
                ).join('')}
              </ul>
            `
          });
        }

        results.push({
          task: 'lowStockAlerts',
          success: true,
          details: { alertsSent: lowStockProducts.length > 0 ? 1 : 0, products: lowStockProducts.length }
        });
      } catch (error) {
        Sentry.captureException(error);
        results.push({
          task: 'lowStockAlerts',
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      // Task 3: Review Requests (7 days after delivery)
      try {
        sentryLogger.info('Running task: Review Requests');
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const ordersForReview = await prisma.order.findMany({
          where: {
            status: 'DELIVERED',
            updatedAt: {
              gte: new Date(sevenDaysAgo.getTime() - 24 * 60 * 60 * 1000),
              lte: sevenDaysAgo
            },
            reviewRequestSent: false
          },
          include: {
            user: true
          }
        });

        let emailsSent = 0;
        if (ordersForReview.length > 0) {
          const resend = new Resend(process.env.RESEND_API_KEY);

          for (const order of ordersForReview) {
            if (order.user?.email) {
              try {
                await resend.emails.send({
                  from: 'Purrify <hello@purrify.ca>',
                  to: order.user.email,
                  subject: 'How is your cat enjoying Purrify?',
                  html: `
                    <h2>We'd love your feedback!</h2>
                    <p>Hi ${order.user.name || 'there'},</p>
                    <p>It's been a week since your Purrify order was delivered. We hope your cat is enjoying it!</p>
                    <p>Would you mind taking a moment to share your experience?</p>
                    <a href="https://purrify.ca/review?order=${order.id}" style="display:inline-block;background:#7c3aed;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">Leave a Review</a>
                    <p>Thank you for being part of the Purrify family!</p>
                  `
                });

                await prisma.order.update({
                  where: { id: order.id },
                  data: { reviewRequestSent: true }
                });

                emailsSent++;
              } catch (emailError) {
                Sentry.captureException(emailError);
              }
            }
          }
        }

        results.push({
          task: 'reviewRequests',
          success: true,
          details: { emailsSent, ordersChecked: ordersForReview.length }
        });
      } catch (error) {
        Sentry.captureException(error);
        results.push({
          task: 'reviewRequests',
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      // Task 4: Subscription Reminders (3 days before next delivery)
      try {
        sentryLogger.info('Running task: Subscription Reminders');
        const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        const fourDaysFromNow = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);

        const upcomingSubscriptions = await prisma.subscription.findMany({
          where: {
            status: 'ACTIVE',
            nextDeliveryDate: {
              gte: threeDaysFromNow,
              lt: fourDaysFromNow
            },
            reminderSent: false
          }
        });

        let remindersSent = 0;
        if (upcomingSubscriptions.length > 0) {
          const resend = new Resend(process.env.RESEND_API_KEY);

          for (const subscription of upcomingSubscriptions) {
            if (subscription.email) {
              try {
                await resend.emails.send({
                  from: 'Purrify <hello@purrify.ca>',
                  to: subscription.email,
                  subject: 'Your Purrify delivery is coming soon!',
                  html: `
                    <h2>Heads up!</h2>
                    <p>Hi there,</p>
                    <p>Your next Purrify delivery is scheduled for ${subscription.nextDeliveryDate?.toLocaleDateString()}.</p>
                    <p>Need to make changes? You can update your subscription anytime.</p>
                    <a href="https://purrify.ca/account/subscriptions" style="display:inline-block;background:#7c3aed;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">Manage Subscription</a>
                  `
                });

                await prisma.subscription.update({
                  where: { id: subscription.id },
                  data: { reminderSent: true }
                });

                remindersSent++;
              } catch (emailError) {
                Sentry.captureException(emailError);
              }
            }
          }
        }

        results.push({
          task: 'subscriptionReminders',
          success: true,
          details: { remindersSent, subscriptionsChecked: upcomingSubscriptions.length }
        });
      } catch (error) {
        Sentry.captureException(error);
        results.push({
          task: 'subscriptionReminders',
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      const successCount = results.filter(r => r.success).length;
      span.setAttribute('tasksCompleted', successCount);
      span.setAttribute('totalTasks', results.length);

      sentryLogger.info('Daily tasks completed', {
        successCount,
        totalTasks: results.length,
        results
      });

      return Response.json({
        success: successCount === results.length,
        tasksRun: results.length,
        tasksSucceeded: successCount,
        results,
        timestamp: now.toISOString()
      });
    }
  );
}
