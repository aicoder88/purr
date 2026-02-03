import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';
import { RevisionManager } from '@/lib/blog/revision-manager';
import { SitemapGenerator } from '@/lib/blog/sitemap-generator';
import { sanitizeBlogPost } from '@/lib/security/sanitize';
import type { BlogPost } from '@/types/blog';

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
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const store = new ContentStore();
  const logger = new AuditLogger();
  const revisionManager = new RevisionManager();
  const sitemapGenerator = new SitemapGenerator();

  try {
    let post: BlogPost = await request.json();

    // Validate required fields
    if (!post.title || !post.content || !post.slug) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
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

    return Response.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error('Error handling posts request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const store = new ContentStore();
  const logger = new AuditLogger();
  const revisionManager = new RevisionManager();
  const sitemapGenerator = new SitemapGenerator();

  try {
    let post: BlogPost = await request.json();

    if (!post.slug) {
      return Response.json({ error: 'Missing slug' }, { status: 400 });
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

    return Response.json({ success: true, post });
  } catch (error) {
    console.error('Error handling posts request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
