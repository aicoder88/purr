import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';
import { RevisionManager } from '@/lib/blog/revision-manager';
import { SitemapGenerator } from '@/lib/blog/sitemap-generator';
import { sanitizeBlogPost } from '@/lib/security/sanitize';
import { withRateLimit, RATE_LIMITS, combineMiddleware } from '@/lib/security/rate-limit';
import { withCSRFProtection } from '@/lib/security/csrf';
import type { BlogPost } from '@/types/blog';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized, session } = await requireAuth(req, res);

  if (!authorized || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const store = new ContentStore();
  const logger = new AuditLogger();
  const revisionManager = new RevisionManager();
  const sitemapGenerator = new SitemapGenerator();

  try {
    if (req.method === 'GET') {
      // Get all posts
      const locale = (req.query.locale as string) || 'en';
      const includeUnpublished = req.query.includeUnpublished === 'true';
      
      const posts = await store.getAllPosts(locale, includeUnpublished);
      return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
      // Create new post
      let post: BlogPost = req.body;

      // Validate required fields
      if (!post.title || !post.content || !post.slug) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Sanitize post content to prevent XSS
      post = sanitizeBlogPost(post);

      // Save post
      await store.savePost(post);

      // Create initial revision
      await revisionManager.createRevision(
        post,
        session.user?.email || 'unknown',
        'Initial post creation'
      );

      // Log the creation
      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'create',
        resourceType: 'post',
        resourceId: post.slug,
        details: {
          title: post.title,
          status: post.status,
          locale: post.locale
        }
      });

      // Update sitemap if post is published
      if (post.status === 'published') {
        try {
          await sitemapGenerator.updateAllSitemaps();
        } catch (error) {
          console.error('Failed to update sitemap:', error);
          // Don't fail the request if sitemap update fails
        }
      }

      return res.status(201).json({ success: true, post });
    }

    if (req.method === 'PUT') {
      // Update existing post
      let post: BlogPost = req.body;

      if (!post.slug) {
        return res.status(400).json({ error: 'Missing slug' });
      }

      // Sanitize post content to prevent XSS
      post = sanitizeBlogPost(post);

      // Update modified date
      post.modifiedDate = new Date().toISOString();

      await store.savePost(post);

      // Create revision
      await revisionManager.createRevision(
        post,
        session.user?.email || 'unknown',
        'Post updated'
      );

      // Log the update
      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'update',
        resourceType: 'post',
        resourceId: post.slug,
        details: {
          title: post.title,
          status: post.status,
          locale: post.locale
        }
      });

      // Update sitemap if post is published
      if (post.status === 'published') {
        try {
          await sitemapGenerator.updateAllSitemaps();
        } catch (error) {
          console.error('Failed to update sitemap:', error);
          // Don't fail the request if sitemap update fails
        }
      }

      return res.status(200).json({ success: true, post });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling posts request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply security middleware
const withRateLimitMiddleware = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  withRateLimit(RATE_LIMITS.CREATE, handler);

export default combineMiddleware(
  withCSRFProtection,
  withRateLimitMiddleware
)(handler);
