import { requireAuth } from '@/lib/auth/session';
import { ContentTemplateManager } from '@/lib/blog/content-templates';

export async function GET(request: Request) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const manager = new ContentTemplateManager();
    const templates = manager.getTemplates();

    return Response.json(templates);
  } catch (error) {
    console.error('Templates API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
