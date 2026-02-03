import { z } from 'zod';
import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';

// Define Zod schemas for validation
const bulkOperationTypeSchema = z.enum(['delete', 'changeStatus', 'assignCategories', 'assignTags']);

const bulkOperationSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('delete')
  }),
  z.object({
    type: z.literal('changeStatus'),
    status: z.enum(['draft', 'scheduled', 'published'])
  }),
  z.object({
    type: z.literal('assignCategories'),
    categories: z.array(z.string().min(1).max(50)).min(1).max(20)
  }),
  z.object({
    type: z.literal('assignTags'),
    tags: z.array(z.string().min(1).max(50)).min(1).max(30)
  })
]);

const bulkRequestSchema = z.object({
  operation: bulkOperationSchema,
  postSlugs: z.array(
    z.string()
      .min(1)
      .max(200)
      .regex(/^[a-z0-9_-]+$/, 'Slug must contain only lowercase letters, numbers, hyphens, and underscores')
  ).min(1).max(100) // Limit to 100 posts per bulk operation
});

// Type inference from Zod schema
type BulkRequest = z.infer<typeof bulkRequestSchema>;

export async function POST(request: Request) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // CRITICAL SECURITY FIX: Validate request body with Zod
  const body = await request.json();
  const parseResult = bulkRequestSchema.safeParse(body);
  
  if (!parseResult.success) {
    console.warn('[SECURITY] Invalid bulk operation request:', parseResult.error.issues);
    return Response.json({
      error: 'Invalid request data',
      details: parseResult.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    }, { status: 400 });
  }

  const { operation, postSlugs } = parseResult.data;

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
          // Validate categories don't contain malicious content
          const sanitizedCategories = operation.categories.map(cat => 
            cat.replace(/[<>"'&]/g, '').trim()
          ).filter(cat => cat.length > 0);
          
          post.categories = [...new Set([...post.categories, ...sanitizedCategories])];
          post.modifiedDate = new Date().toISOString();
          await store.savePost(post);
          await logger.log({
            userId: session.user?.email || 'unknown',
            userEmail: session.user?.email || 'unknown',
            action: 'bulk_assign_categories',
            resourceType: 'post',
            resourceId: slug,
            details: { categories: sanitizedCategories }
          });
        } else if (operation.type === 'assignTags') {
          // Validate tags don't contain malicious content
          const sanitizedTags = operation.tags.map(tag => 
            tag.replace(/[<>"'&]/g, '').trim()
          ).filter(tag => tag.length > 0);
          
          post.tags = [...new Set([...post.tags, ...sanitizedTags])];
          post.modifiedDate = new Date().toISOString();
          await store.savePost(post);
          await logger.log({
            userId: session.user?.email || 'unknown',
            userEmail: session.user?.email || 'unknown',
            action: 'bulk_assign_tags',
            resourceType: 'post',
            resourceId: slug,
            details: { tags: sanitizedTags }
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

    return Response.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Bulk operation error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
