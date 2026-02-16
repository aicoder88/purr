import { requireAuth } from '@/lib/auth/session';
import { ContentTemplateManager } from '@/lib/blog/content-templates';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

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

  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const manager = new ContentTemplateManager();
    const templates = manager.getTemplates();

    return Response.json(templates, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Templates API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}
