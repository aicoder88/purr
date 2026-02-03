import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';

interface Params {
  slug: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  const store = new ContentStore();

  try {
    // Get single post (including unpublished)
    const post = await store.getPost(slug, locale);
    
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    return Response.json(post);
  } catch (error) {
    console.error('Error handling post request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  const store = new ContentStore();
  const logger = new AuditLogger();

  try {
    // Delete post
    const post = await store.getPost(slug, locale);
    
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    await store.deletePost(slug, locale);

    // Log the deletion
    await logger.log({
      userId: session.user?.email || 'unknown',
      userEmail: session.user?.email || 'unknown',
      action: 'delete',
      resourceType: 'post',
      resourceId: slug,
      details: {
        title: post.title,
        locale
      }
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error handling post request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
