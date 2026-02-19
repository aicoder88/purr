import { requireAuth } from '@/lib/auth/session';
import { SitemapGenerator } from '@/lib/blog/sitemap-generator';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

export async function POST(req: Request) {
  // Apply rate limiting (standard: 20 req/min for writes)
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
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
    const generator = new SitemapGenerator();
    await generator.updateAllSitemaps();

    return Response.json({
      success: true,
      message: 'Sitemaps updated successfully'
    }, { headers: rateLimitHeaders });
  } catch (_error) {
    return Response.json({
      error: 'Failed to update sitemaps'
    }, { status: 500, headers: rateLimitHeaders });
  }
}
