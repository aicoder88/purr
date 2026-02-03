import type { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { AutomatedContentGenerator } from '@/lib/blog/automated-content-generator';
import { ContentStore } from '@/lib/blog/content-store';

const THREE_DAYS_IN_MS = (Number(process.env.AUTOBLOG_INTERVAL_DAYS ?? '3') || 3) * 24 * 60 * 60 * 1000;

/**
 * Extract cron secret from request headers or query params
 */
function extractSecret(req: NextRequest): string | null {
  const headerSecret = req.headers.get('x-cron-secret');
  if (headerSecret) return headerSecret;
  
  const { searchParams } = new URL(req.url);
  return searchParams.get('secret');
}

/**
 * Get the most recent post from filesystem to check interval
 */
async function getLatestPostDate(): Promise<Date | null> {
  const store = new ContentStore();
  const posts = await store.getAllPosts('en', true);

  if (posts.length === 0) return null;

  // Sort by publishDate or modifiedDate, most recent first
  const sorted = posts.sort((a, b) => {
    const dateA = new Date(a.publishDate || a.modifiedDate || 0);
    const dateB = new Date(b.publishDate || b.modifiedDate || 0);
    return dateB.getTime() - dateA.getTime();
  });

  const latest = sorted[0];
  const latestDate = latest.publishDate || latest.modifiedDate;

  return latestDate ? new Date(latestDate) : null;
}

export async function GET(req: NextRequest): Promise<Response> {
  return handleGenerateBlogPost(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleGenerateBlogPost(req);
}

async function handleGenerateBlogPost(req: NextRequest): Promise<Response> {
  return Sentry.startSpan(
    {
      op: 'cron.job',
      name: 'Generate Blog Post',
    },
    async (span) => {
      const { logger } = Sentry;

      logger.info('Blog post generation cron started', {
        method: req.method,
        forceRun: new URL(req.url).searchParams.get('force')
      });

      const expectedSecret = process.env.AUTOBLOG_CRON_SECRET;
      if (expectedSecret) {
        const providedSecret = extractSecret(req);
        if (providedSecret !== expectedSecret) {
          logger.warn('Invalid cron secret provided');
          return Response.json({ error: 'Invalid cron secret' }, { status: 401 });
        }
      }

      const { searchParams } = new URL(req.url);
      const forceRun = searchParams.get('force') === 'true' || searchParams.get('force') === '1';
      span.setAttribute('forceRun', forceRun);

      // Check interval using filesystem instead of database
      if (!forceRun) {
        const latestPostDate = await getLatestPostDate();
        if (latestPostDate) {
          const elapsed = Date.now() - latestPostDate.getTime();
          if (elapsed < THREE_DAYS_IN_MS) {
            const nextRunInHours = Math.round((THREE_DAYS_IN_MS - elapsed) / (1000 * 60 * 60));
            logger.info('Interval not reached, skipping generation', {
              elapsed,
              nextRunInHours
            });
            return Response.json({
              skipped: true,
              reason: 'Interval not reached',
              nextRunInHours,
            });
          }
        }
      }

      try {
        // Use new ContentStore-based generator by default (filesystem, no database required)
        const useLegacyGenerator = process.env.USE_LEGACY_BLOG_GENERATOR === 'true';
        span.setAttribute('useLegacyGenerator', useLegacyGenerator);

        // Legacy generator requires database - only use if explicitly enabled
        if (useLegacyGenerator) {
          logger.info('Using legacy blog generator');
          const { generateAutomatedBlogPost } = await import('@/lib/blog/generator');
          const result = await generateAutomatedBlogPost();

          span.setAttribute('postId', result.post.id);
          span.setAttribute('slug', result.post.slug);
          logger.info('Legacy blog post generated successfully', {
            postId: result.post.id,
            slug: result.post.slug,
            topic: result.topic
          });

          return Response.json({
            success: true,
            postId: result.post.id,
            slug: result.post.slug,
            topic: result.topic,
            heroImage: result.heroImage,
            secondaryImageCount: result.secondaryImageCount,
            generator: 'legacy'
          });
        }

        // Default: Use filesystem-based generator (no database required)
        logger.info('Using filesystem-based blog generator');
        const generator = new AutomatedContentGenerator();

        // Topic rotation
        const topics = [
          'How to Eliminate Cat Litter Odor Naturally',
          'Best Practices for Multi-Cat Households',
          'Understanding Activated Carbon for Pet Odor Control',
          'Apartment Living with Cats: Odor Management Tips',
          'Eco-Friendly Cat Litter Solutions',
          'Cat Health and Litter Box Hygiene',
          'Seasonal Cat Care Tips',
          'DIY Cat Litter Box Maintenance',
          'Natural Ways to Keep Your Home Fresh with Cats',
          'The Science Behind Cat Litter Odor Control'
        ];

        const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
        const topicIndex = daysSinceEpoch % topics.length;
        const selectedTopic = topics[topicIndex];

        span.setAttribute('topic', selectedTopic);
        logger.info('Generating blog post', { topic: selectedTopic });

        const result = await generator.generateBlogPost(selectedTopic);

        if (!result.success || !result.post) {
          const errorMessage = `Generation failed: ${result.validation.errors.map(e => e.message).join(', ')}`;
          logger.error('Blog post generation validation failed', {
            errors: result.validation.errors.map(e => e.message)
          });
          throw new Error(errorMessage);
        }

        await generator.publishPost(result.post);

        span.setAttribute('postId', result.post.id);
        span.setAttribute('slug', result.post.slug);
        span.setAttribute('attempts', result.attempts || 0);

        logger.info('Blog post generated and published successfully', {
          postId: result.post.id,
          slug: result.post.slug,
          title: result.post.title,
          topic: selectedTopic,
          attempts: result.attempts
        });

        return Response.json({
          success: true,
          postId: result.post.id,
          slug: result.post.slug,
          title: result.post.title,
          topic: selectedTopic,
          generator: 'filesystem',
          attempts: result.attempts
        });
      } catch (error) {
        Sentry.captureException(error);
        logger.error('Blog post generation failed', {
          error: (error as Error).message
        });
        return Response.json({
          error: 'Failed to generate blog post',
          details: (error as Error).message,
        }, { status: 500 });
      }
    }
  );
}
