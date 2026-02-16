import { requireAuth } from '@/lib/auth/session';
import { AnalyticsService } from '@/lib/blog/analytics-service';
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

  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '30d';
  const format = (searchParams.get('format') as 'csv' | 'pdf') || 'csv';

  const analyticsService = new AnalyticsService();

  try {
    // Calculate date range
    const end = new Date();
    const start = new Date();
    
    switch (range) {
      case '7d':
        start.setDate(start.getDate() - 7);
        break;
      case '30d':
        start.setDate(start.getDate() - 30);
        break;
      case '90d':
        start.setDate(start.getDate() - 90);
        break;
      default:
        start.setDate(start.getDate() - 30);
    }

    const dateRange = {
      start: start.toISOString(),
      end: end.toISOString()
    };

    const report = await analyticsService.exportReport(format, dateRange);

    // Set appropriate headers
    const contentType = format === 'csv' ? 'text/csv' : 'application/pdf';
    const filename = `analytics-report-${range}.${format}`;

    return new Response(new Blob([new Uint8Array(report)]), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        ...rateLimitHeaders,
      },
    });
  } catch (error) {
    console.error('Export API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}
