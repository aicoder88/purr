/**
 * Cron Job: Subscription Reminder Emails
 *
 * Runs daily to send reminder emails to subscribers 3 days before their
 * next delivery date, giving them time to modify or skip if needed.
 *
 * Vercel cron schedule: 0 10 * * * (daily at 10 AM)
 * Security: Requires CRON_SECRET header for authorization
 */

import type { NextRequest } from 'next/server';
import { Resend } from 'resend';
import prismaClient from '@/lib/prisma';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { extractCronSecret } from '@/lib/security/cron-secret';

import {
  SubscriptionReminderEmailHTML,
  getSubscriptionReminderSubject,
} from '@/emails/subscription-reminder';

// Ensure prisma is available
function getPrisma() {
  if (!prismaClient) {
    throw new Error('Database not configured');
  }
  return prismaClient;
}

// Days before delivery to send reminder
const REMINDER_DAYS_BEFORE = 3;

// Maximum emails to send per cron run
const MAX_EMAILS_PER_RUN = 50;

/**
 * Format date for display
 */
function formatDate(date: Date, locale: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const localeMap: Record<string, string> = {
    en: 'en-CA',
    fr: 'fr-CA',
    zh: 'zh-CN',
  };

  return date.toLocaleDateString(localeMap[locale] || 'en-CA', options);
}

/**
 * Get frequency display text
 */
function getFrequencyText(
  frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'BIMONTHLY',
  locale: string
): string {
  const texts: Record<string, Record<string, string>> = {
    en: {
      WEEKLY: 'weekly',
      BIWEEKLY: 'bi-weekly',
      MONTHLY: 'monthly',
      BIMONTHLY: 'bi-monthly',
    },
    fr: {
      WEEKLY: 'hebdomadaire',
      BIWEEKLY: 'bihebdomadaire',
      MONTHLY: 'mensuel',
      BIMONTHLY: 'bimestriel',
    },
    zh: {
      WEEKLY: '每周',
      BIWEEKLY: '每两周',
      MONTHLY: '每月',
      BIMONTHLY: '每两月',
    },
  };

  return texts[locale]?.[frequency] || texts.en[frequency];
}

export async function GET(req: NextRequest): Promise<Response> {
  return handleSubscriptionReminders(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleSubscriptionReminders(req);
}

async function handleSubscriptionReminders(req: NextRequest): Promise<Response> {
  // Removed Sentry.startSpan wrapper
// async (span) => {
      
      console.info('Subscription reminder cron job started', {
        timestamp: new Date().toISOString(),
      });

      // Verify cron secret
      const cronSecret = extractCronSecret(req);
      const expectedSecret = process.env.CRON_SECRET;

      if (!expectedSecret || cronSecret !== expectedSecret) {
        console.warn('Unauthorized subscription reminder cron attempt');
        return Response.json({
          success: false,
          message: 'Unauthorized',
        }, { status: 401 });
      }

      // Check if Resend is configured
      if (!isResendConfigured()) {
        console.error('Resend email service not configured');
        return Response.json({
          success: false,
          message: 'Email service not configured',
        }, { status: 500 });
      }

      try {
        const prisma = getPrisma();

        // Calculate the target date (3 days from now)
        const now = new Date();
        const targetDate = new Date(now);
        targetDate.setDate(targetDate.getDate() + REMINDER_DAYS_BEFORE);

        // Set to start and end of target day
        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);

        // Find subscriptions due for reminder
        const subscriptions = await prisma.subscription.findMany({
          where: {
            status: 'ACTIVE',
            reminderSent: false,
            nextDeliveryDate: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
          take: MAX_EMAILS_PER_RUN,
        });

        // // // // span.setAttribute('subscriptionsFound', subscriptions.length);

        console.info('Found subscriptions needing reminders', {
          count: subscriptions.length,
          targetDate: targetDate.toISOString(),
        });

        if (subscriptions.length === 0) {
          return Response.json({
            success: true,
            subscriptionsChecked: 0,
            remindersSent: 0,
            message: 'No subscriptions need reminders today',
          });
        }

        const resend = new Resend(RESEND_CONFIG.apiKey);
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';

        let sentCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        for (const subscription of subscriptions) {
          // Skip if no email
          if (!subscription.email) {
            skippedCount++;
            continue;
          }

          // Skip if no items
          if (subscription.items.length === 0) {
            skippedCount++;
            continue;
          }

          try {
            // Determine locale from email domain or default
            const locale = 'en'; // Could be enhanced to detect from subscription data

            // Format items for email
            const items = subscription.items.map((item) => ({
              productName: item.product.name,
              quantity: item.quantity,
              price: item.price,
              image: item.product.image,
            }));

            // Calculate total
            const totalAmount = items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            const formattedDate = formatDate(
              subscription.nextDeliveryDate,
              locale
            );
            const frequencyText = getFrequencyText(
              subscription.frequency,
              locale
            );

            // Generate email HTML
            const emailHTML = SubscriptionReminderEmailHTML({
              items,
              totalAmount,
              nextDeliveryDate: formattedDate,
              frequency: frequencyText,
              manageUrl: `${baseUrl}/account/subscriptions/${subscription.id}`,
              locale,
            });

            const emailSubject = getSubscriptionReminderSubject(
              locale,
              formattedDate
            );

            // Send email
            const { data, error } = await resend.emails.send({
              from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
              to: subscription.email,
              subject: emailSubject,
              html: emailHTML,
              tags: [
                { name: 'type', value: 'subscription-reminder' },
                { name: 'subscription_id', value: subscription.id },
                { name: 'frequency', value: subscription.frequency },
              ],
            });

            if (error) {
              console.error('Failed to send subscription reminder', {
                subscriptionId: subscription.id,
                error: error.message,
              });
              errorCount++;
              continue;
            }

            // Mark reminder as sent
            await prisma.subscription.update({
              where: { id: subscription.id },
              data: {
                reminderSent: true,
                reminderSentAt: new Date(),
              },
            });

            sentCount++;

            console.info('Subscription reminder sent', {
              subscriptionId: subscription.id,
              email: subscription.email,
              emailId: data?.id,
              nextDeliveryDate: subscription.nextDeliveryDate.toISOString(),
            });
          } catch (subError) {
            console.error('Error processing subscription reminder', {
              subscriptionId: subscription.id,
              error:
                subError instanceof Error ? subError.message : 'Unknown error',
            });
            errorCount++;
          }
        }

        // // // // span.setAttribute('sentCount', sentCount);
        // // // // span.setAttribute('errorCount', errorCount);

        console.info('Subscription reminder cron job completed', {
          sent: sentCount,
          skipped: skippedCount,
          errors: errorCount,
        });

        return Response.json({
          success: true,
          subscriptionsChecked: subscriptions.length,
          remindersSent: sentCount,
          skipped: skippedCount,
          errors: errorCount,
          message: `Sent ${sentCount} reminders, skipped ${skippedCount}, ${errorCount} errors`,
        });
      } catch (error) {
        console.error('Subscription reminder cron job failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        return Response.json({
          success: false,
          message:
            error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 });
      }
    
}
