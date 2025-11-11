import type { NextApiRequest, NextApiResponse } from 'next';
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';
import { SitemapGenerator } from '@/lib/blog/sitemap-generator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret
  const cronSecret = req.headers['x-cron-secret'] || req.query.secret;
  
  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
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
      const posts = await store.getAllPosts(locale, true); // Include unpublished
      
      const toPublish = posts.filter(post => 
        post.status === 'scheduled' && 
        post.scheduledDate && 
        new Date(post.scheduledDate) <= now
      );

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
        } catch (error) {
          console.error(`Failed to publish ${post.slug}:`, error);
        }
      }
    }

    // Update sitemaps if any posts were published
    if (published.length > 0) {
      try {
        await sitemapGenerator.updateAllSitemaps();
      } catch (error) {
        console.error('Failed to update sitemaps:', error);
      }
    }

    return res.status(200).json({
      success: true,
      published: published.length,
      posts: published,
      timestamp: now.toISOString()
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
