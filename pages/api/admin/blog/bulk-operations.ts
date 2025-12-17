import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';
import { withRateLimit, RATE_LIMITS, combineMiddleware } from '@/lib/security/rate-limit';
import { withCSRFProtection } from '@/lib/security/csrf';
import type { BulkOperation } from '@/components/admin/BulkActionsToolbar';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorized, session } = await requireAuth(req, res);

  if (!authorized || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { operation, postSlugs } = req.body as {
    operation: BulkOperation;
    postSlugs: string[];
  };

  if (!operation || !postSlugs || postSlugs.length === 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const store = new ContentStore();
  const logger = new AuditLogger();
  const results = {
    successful: [] as string[],
    failed: [] as Array<{ slug: string; error: string }>
  };

  try {
    // Get all posts across all locales
    const locales = ['en', 'fr', 'zh'];
    
    for (const slug of postSlugs) {
      try {
        // Find the post in any locale
        let post = null;
        let postLocale = 'en';
        
        for (const locale of locales) {
          const p = await store.getPost(slug, locale);
          if (p) {
            post = p;
            postLocale = locale;
            break;
          }
        }

        if (!post) {
          results.failed.push({ slug, error: 'Post not found' });
          continue;
        }

        // Apply operation
        if (operation.type === 'delete') {
          await store.deletePost(slug, postLocale);
          await logger.log({
            userId: session.user?.email || 'unknown',
            userEmail: session.user?.email || 'unknown',
            action: 'bulk_delete',
            resourceType: 'post',
            resourceId: slug,
            details: { locale: postLocale }
          });
        } else if (operation.type === 'changeStatus') {
          post.status = operation.status;
          post.modifiedDate = new Date().toISOString();
          await store.savePost(post);
          await logger.log({
            userId: session.user?.email || 'unknown',
            userEmail: session.user?.email || 'unknown',
            action: 'bulk_status_change',
            resourceType: 'post',
            resourceId: slug,
            details: { newStatus: operation.status }
          });
        } else if (operation.type === 'assignCategories') {
          post.categories = [...new Set([...post.categories, ...operation.categories])];
          post.modifiedDate = new Date().toISOString();
          await store.savePost(post);
          await logger.log({
            userId: session.user?.email || 'unknown',
            userEmail: session.user?.email || 'unknown',
            action: 'bulk_assign_categories',
            resourceType: 'post',
            resourceId: slug,
            details: { categories: operation.categories }
          });
        } else if (operation.type === 'assignTags') {
          post.tags = [...new Set([...post.tags, ...operation.tags])];
          post.modifiedDate = new Date().toISOString();
          await store.savePost(post);
          await logger.log({
            userId: session.user?.email || 'unknown',
            userEmail: session.user?.email || 'unknown',
            action: 'bulk_assign_tags',
            resourceType: 'post',
            resourceId: slug,
            details: { tags: operation.tags }
          });
        }

        results.successful.push(slug);
      } catch (error) {
        console.error(`Failed to process ${slug}:`, error);
        results.failed.push({
          slug,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return res.status(200).json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Bulk operation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply security middleware (CSRF + rate limiting)
const withRateLimitMiddleware = (handler: any) => withRateLimit(RATE_LIMITS.CREATE, handler);

export default combineMiddleware(
  withCSRFProtection,
  withRateLimitMiddleware
)(handler);
