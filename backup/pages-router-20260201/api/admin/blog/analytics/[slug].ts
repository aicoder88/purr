import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { AnalyticsService } from '@/lib/blog/analytics-service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;
  const range = (req.query.range as string) || '30d';

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
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
      return res.status(404).json({ error: 'Analytics not found' });
    }

    return res.status(200).json(analytics);
  } catch (error) {
    console.error('Analytics API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
