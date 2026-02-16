import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';
import { RevisionManager } from '@/lib/blog/revision-manager';
import { SitemapGenerator } from '@/lib/blog/sitemap-generator';
import { sanitizeBlogPost } from '@/lib/security/sanitize';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';
import { z } from 'zod';
import type { BlogPost } from '@/types/blog';

// Zod schema for POST body validation
const postSchema = z.object({
  title: z.string().max(200, 'Title must be at most 200 characters'),
  slug: z.string()
    .max(100, 'Slug must be at most 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().max(100000, 'Content must be at most 100,000 characters'),
});

export async function GET(request: Request) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const store = new ContentStore();

  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    
    const posts = await store.getAllPosts(locale, includeUnpublished);
    return Response.json(posts);
  } catch (error) {
    console.error('Error handling posts request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Apply rate limiting (standard: 20 req/min)
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);
  
  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429, 
        headers: {
          ...rateLimitHeaders,
          'Retry-After': rateLimitHeaders['Retry-After'] || '60',
        }
      }
    );
  }

  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json(
      { error: 'Unauthorized' }, 
      { status: 401, headers: rateLimitHeaders }
    );
  }

  const store = new ContentStore();
  const logger = new AuditLogger();
  const revisionManager = new RevisionManager();
  const sitemapGenerator = new SitemapGenerator();

  try {
    const body = await request.json();
    
    // Validate with Zod schema
    const validationResult = postSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      return Response.json(
        { error: 'Validation failed', details: errors },
        { status: 400, headers: rateLimitHeaders }
      );
    }
    
    let post: BlogPost = body;

    // Validate required fields (additional check for fields not in schema)
    if (!post.title || !post.content || !post.slug) {
      return Response.json(
        { error: 'Missing required fields' }, 
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // Sanitize post content to prevent XSS
    post = sanitizeBlogPost(post as unknown as Parameters<typeof sanitizeBlogPost>[0]) as BlogPost;

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

    return Response.json({ success: true, post }, { status: 201, headers: rateLimitHeaders });
  } catch (error) {
    console.error('Error handling posts request:', error);
    return Response.json(
      { error: 'Internal server error' }, 
      { status: 500, headers: rateLimitHeaders }
    );
  }
}

export async function PUT(request: Request) {
  // Apply rate limiting (standard: 20 req/min)
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);
  
  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429, 
        headers: {
          ...rateLimitHeaders,
          'Retry-After': rateLimitHeaders['Retry-After'] || '60',
        }
      }
    );
  }

  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json(
      { error: 'Unauthorized' }, 
      { status: 401, headers: rateLimitHeaders }
    );
  }

  const store = new ContentStore();
  const logger = new AuditLogger();
  const revisionManager = new RevisionManager();
  const sitemapGenerator = new SitemapGenerator();

  try {
    let post: BlogPost = await request.json();

    if (!post.slug) {
      return Response.json(
        { error: 'Missing slug' }, 
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // Sanitize post content to prevent XSS
    post = sanitizeBlogPost(post as unknown as Parameters<typeof sanitizeBlogPost>[0]) as BlogPost;

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

    return Response.json({ success: true, post }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Error handling posts request:', error);
    return Response.json(
      { error: 'Internal server error' }, 
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
