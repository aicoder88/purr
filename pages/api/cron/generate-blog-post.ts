import type { NextApiRequest, NextApiResponse } from 'next';
import { AutomatedContentGenerator } from '../../../src/lib/blog/automated-content-generator';
import { ContentStore } from '../../../src/lib/blog/content-store';

const THREE_DAYS_IN_MS = (Number(process.env.AUTOBLOG_INTERVAL_DAYS ?? '3') || 3) * 24 * 60 * 60 * 1000;

function extractSecret(req: NextApiRequest) {
  const headerSecret = req.headers['x-cron-secret'];
  if (typeof headerSecret === 'string') return headerSecret;
  if (Array.isArray(headerSecret)) return headerSecret[0];
  const querySecret = req.query.secret;
  if (typeof querySecret === 'string') return querySecret;
  if (Array.isArray(querySecret)) return querySecret[0];
  return undefined;
}

function isMethodAllowed(method?: string) {
  return method === 'POST' || method === 'GET';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isMethodAllowed(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const expectedSecret = process.env.AUTOBLOG_CRON_SECRET;
  if (expectedSecret) {
    const providedSecret = extractSecret(req);
    if (providedSecret !== expectedSecret) {
      return res.status(401).json({ error: 'Invalid cron secret' });
    }
  }

  const forceRun = req.query.force === 'true' || req.query.force === '1';

  // Check interval using filesystem instead of database
  if (!forceRun) {
    const latestPostDate = await getLatestPostDate();
    if (latestPostDate) {
      const elapsed = Date.now() - latestPostDate.getTime();
      if (elapsed < THREE_DAYS_IN_MS) {
        return res.status(200).json({
          skipped: true,
          reason: 'Interval not reached',
          nextRunInHours: Math.round((THREE_DAYS_IN_MS - elapsed) / (1000 * 60 * 60)),
        });
      }
    }
  }

  try {
    // Use new ContentStore-based generator by default (filesystem, no database required)
    const useLegacyGenerator = process.env.USE_LEGACY_BLOG_GENERATOR === 'true';

    // Legacy generator requires database - only use if explicitly enabled
    if (useLegacyGenerator) {
      const { generateAutomatedBlogPost } = await import('../../../src/lib/blog/generator');
      const result = await generateAutomatedBlogPost();
      return res.status(200).json({
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

    console.log(`🤖 Generating blog post: ${selectedTopic}`);

    const result = await generator.generateBlogPost(selectedTopic);

    if (!result.success || !result.post) {
      throw new Error(`Generation failed: ${result.validation.errors.map(e => e.message).join(', ')}`);
    }

    await generator.publishPost(result.post);

    return res.status(200).json({
      success: true,
      postId: result.post.id,
      slug: result.post.slug,
      title: result.post.title,
      topic: selectedTopic,
      generator: 'filesystem',
      attempts: result.attempts
    });
  } catch (error) {
    console.error('[auto-blog] generation failed', error);
    return res.status(500).json({
      error: 'Failed to generate blog post',
      details: (error as Error).message,
    });
  }
}
