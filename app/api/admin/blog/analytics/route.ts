import { requireAuth } from '@/lib/auth/session';
import { AnalyticsService } from '@/lib/blog/analytics-service';

export async function GET(request: Request) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const analyticsService = new AnalyticsService();
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '7d';

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
        start.setDate(start.getDate() - 7);
    }

    const dateRange = {
      start: start.toISOString(),
      end: end.toISOString()
    };

    const metrics = await analyticsService.getDashboardMetrics(dateRange);

    return Response.json(metrics);
  } catch (error) {
    console.error('Analytics API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
