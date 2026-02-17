import { requireAuth } from '@/lib/auth/session';
import { CategoryManager } from '@/lib/blog/category-manager';
import { AuditLogger } from '@/lib/blog/audit-logger';
import { sanitizeText } from '@/lib/security/sanitize';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';
import type { Tag } from '@/types/blog';

export async function GET(request: Request) {
  // Apply rate limiting (generous: 100 req/min for reads)
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'generous');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const categoryManager = new CategoryManager();

  try {
    const tags = await categoryManager.getTagsWithStats();
    return Response.json(tags, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Tag management error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500, headers: rateLimitHeaders });
  }
}

export async function POST(request: Request) {
  // Apply rate limiting (standard: 20 req/min for writes)
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const categoryManager = new CategoryManager();
  const logger = new AuditLogger();

  try {
    const body = await request.json();
    const action = body.action;

    if (action === 'merge') {
      const { sourceIds, targetId } = body;
      await categoryManager.mergeTags(sourceIds, targetId);

      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'update',
        resourceType: 'tag',
        resourceId: targetId,
        details: { action: 'merge', sourceIds }
      });

      return Response.json({ success: true }, { headers: rateLimitHeaders });
    }

    // Create new tag with sanitized name
    const tag: Tag = {
      ...body,
      name: sanitizeText(body.name || ''),
    };
    await categoryManager.createTag(tag);

    await logger.log({
      userId: session.user?.email || 'unknown',
      userEmail: session.user?.email || 'unknown',
      action: 'create',
      resourceType: 'tag',
      resourceId: tag.id,
      details: { name: tag.name }
    });

    return Response.json({ success: true, tag }, { status: 201, headers: rateLimitHeaders });
  } catch (error) {
    console.error('Tag management error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500, headers: rateLimitHeaders });
  }
}

export async function PUT(request: Request) {
  // Apply rate limiting (standard: 20 req/min for writes)
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const categoryManager = new CategoryManager();
  const logger = new AuditLogger();

  try {
    const { id, ...updates } = await request.json();
    const sanitizedUpdates = {
      ...updates,
      ...(updates.name && { name: sanitizeText(updates.name) }),
    };

    await categoryManager.updateTag(id, sanitizedUpdates);

    await logger.log({
      userId: session.user?.email || 'unknown',
      userEmail: session.user?.email || 'unknown',
      action: 'update',
      resourceType: 'tag',
      resourceId: id,
      details: updates
    });

    return Response.json({ success: true }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Tag management error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500, headers: rateLimitHeaders });
  }
}

export async function DELETE(request: Request) {
  // Apply rate limiting (standard: 20 req/min for writes)
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const categoryManager = new CategoryManager();
  const logger = new AuditLogger();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'ID is required' }, { status: 400 });
    }

    await categoryManager.deleteTag(id);

    await logger.log({
      userId: session.user?.email || 'unknown',
      userEmail: session.user?.email || 'unknown',
      action: 'delete',
      resourceType: 'tag',
      resourceId: id,
      details: {}
    });

    return Response.json({ success: true }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Tag management error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500, headers: rateLimitHeaders });
  }
}
