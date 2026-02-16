import { requireAuth } from '@/lib/auth/session';
import { GenerationHistoryManager } from '@/lib/blog/generation-history';
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

  const historyManager = new GenerationHistoryManager();

  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '10');
    const history = await historyManager.getRecentGenerations(count);

    return Response.json(history, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('History API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
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

  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const historyManager = new GenerationHistoryManager();

  try {
    const body = await request.json();
    const record = await historyManager.saveGeneration(body);
    return Response.json(record, { status: 201, headers: rateLimitHeaders });
  } catch (error) {
    console.error('History save error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}
