import { requireAuth } from '@/lib/auth/session';
import { AnalyticsService } from '@/lib/blog/analytics-service';

interface Params {
  slug: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '30d';

  if (!slug) {
    return Response.json({ error: 'Invalid slug' }, { status: 400 });
  }

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

    const analytics = await analyticsService.getPostAnalytics(slug, dateRange);

    if (!analytics) {
      return Response.json({ error: 'Analytics not found' }, { status: 404 });
    }

    return Response.json(analytics);
  } catch (error) {
    console.error('Analytics API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
