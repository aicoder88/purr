import { requireAuth } from '@/lib/auth/session';
import { MediaLibrary } from '@/lib/blog/media-library';
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

  const mediaLibrary = new MediaLibrary();

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || undefined;
    
    const media = query
      ? await mediaLibrary.searchMedia(query)
      : await mediaLibrary.getAllMedia();

    return Response.json(media, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Error handling media request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}
