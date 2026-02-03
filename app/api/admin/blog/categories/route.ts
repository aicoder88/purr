import { requireAuth } from '@/lib/auth/session';
import { CategoryManager } from '@/lib/blog/category-manager';
import { AuditLogger } from '@/lib/blog/audit-logger';
import { sanitizeText } from '@/lib/security/sanitize';
import type { Category } from '@/types/blog';

export async function GET(request: Request) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const categoryManager = new CategoryManager();

  try {
    const { searchParams } = new URL(request.url);
    const withStats = searchParams.get('stats') === 'true';
    
    if (withStats) {
      const categories = await categoryManager.getCategoriesWithStats();
      return Response.json(categories);
    } else {
      const categories = await categoryManager.getCategoriesWithStats();
      return Response.json(categories);
    }
  } catch (error) {
    console.error('Category management error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const categoryManager = new CategoryManager();
  const logger = new AuditLogger();

  try {
    const body = await request.json();
    const category: Category = {
      ...body,
      name: sanitizeText(body.name || ''),
      description: sanitizeText(body.description || ''),
    };

    await categoryManager.createCategory(category);

    await logger.log({
      userId: session.user?.email || 'unknown',
      userEmail: session.user?.email || 'unknown',
      action: 'create',
      resourceType: 'category',
      resourceId: category.id,
      details: { name: category.name }
    });

    return Response.json({ success: true, category }, { status: 201 });
  } catch (error) {
    console.error('Category management error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
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
      ...(updates.description && { description: sanitizeText(updates.description) }),
    };

    await categoryManager.updateCategory(id, sanitizedUpdates);

    await logger.log({
      userId: session.user?.email || 'unknown',
      userEmail: session.user?.email || 'unknown',
      action: 'update',
      resourceType: 'category',
      resourceId: id,
      details: updates
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Category management error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const categoryManager = new CategoryManager();
  const logger = new AuditLogger();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const reassignTo = searchParams.get('reassignTo');

    if (!id) {
      return Response.json({ error: 'ID is required' }, { status: 400 });
    }

    await categoryManager.deleteCategory(id, reassignTo || undefined);

    await logger.log({
      userId: session.user?.email || 'unknown',
      userEmail: session.user?.email || 'unknown',
      action: 'delete',
      resourceType: 'category',
      resourceId: id,
      details: { reassignTo: reassignTo || undefined }
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Category management error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
