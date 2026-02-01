import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';
import { SitemapGenerator } from '@/lib/blog/sitemap-generator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return Sentry.startSpan(
    {
      op: 'cron.job',
      name: 'Publish Scheduled Posts',
    },
    async (span) => {
      const { logger: sentryLogger } = Sentry;

      sentryLogger.info('Publish scheduled posts cron started', {
        method: req.method
      });

      // Verify cron secret
      const cronSecret = req.headers['x-cron-secret'] || req.query.secret;

      if (cronSecret !== process.env.CRON_SECRET) {
        sentryLogger.warn('Unauthorized cron job attempt', {
          hasSecret: !!cronSecret
        });
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (req.method !== 'POST' && req.method !== 'GET') {
        sentryLogger.warn('Invalid HTTP method for cron job', {
          method: req.method
        });
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const store = new ContentStore();
      const logger = new AuditLogger();
      const sitemapGenerator = new SitemapGenerator();
      const now = new Date();
      const published: string[] = [];

      try {
        // Check all locales
        const locales = ['en', 'fr', 'zh'];

        for (const locale of locales) {
          sentryLogger.debug(sentryLogger.fmt`Checking scheduled posts for locale: ${locale}`);
          const posts = await store.getAllPosts(locale, true); // Include unpublished

          const toPublish = posts.filter(post =>
            post.status === 'scheduled' &&
            post.scheduledDate &&
            new Date(post.scheduledDate) <= now
          );

          sentryLogger.info('Found scheduled posts ready to publish', {
            locale,
            count: toPublish.length
          });

          for (const post of toPublish) {
            try {
              // Update status to published
              post.status = 'published';
              post.modifiedDate = now.toISOString();

              await store.savePost(post);

              // Log the auto-publish
              await logger.log({
                userId: 'system',
                userEmail: 'system@cron',
                action: 'publish',
                resourceType: 'post',
                resourceId: post.slug,
                details: {
                  scheduledDate: post.scheduledDate,
                  publishedAt: now.toISOString(),
                  locale: post.locale
                }
              });

              published.push(`${post.slug} (${locale})`);
              sentryLogger.info('Post published successfully', {
                slug: post.slug,
                locale,
                scheduledDate: post.scheduledDate
              });
            } catch (error) {
              Sentry.captureException(error);
              sentryLogger.error('Failed to publish post', {
                slug: post.slug,
                locale,
                error: error instanceof Error ? error.message : 'Unknown error'
              });
            }
          }
        }

        // Update sitemaps if any posts were published
        if (published.length > 0) {
          try {
            sentryLogger.info('Updating sitemaps', {
              publishedCount: published.length
            });
            await sitemapGenerator.updateAllSitemaps();
            sentryLogger.info('Sitemaps updated successfully');
          } catch (error) {
            Sentry.captureException(error);
            sentryLogger.error('Failed to update sitemaps', {
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }

        span.setAttribute('publishedCount', published.length);
        sentryLogger.info('Cron job completed successfully', {
          publishedCount: published.length,
          posts: published
        });

        return res.status(200).json({
          success: true,
          published: published.length,
          posts: published,
          timestamp: now.toISOString()
        });
      } catch (error) {
        Sentry.captureException(error);
        sentryLogger.error('Cron job failed', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        return res.status(500).json({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  );
}
