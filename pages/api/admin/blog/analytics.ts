import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { AnalyticsService } from '@/lib/blog/analytics-service';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';

async function handler(
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

  const analyticsService = new AnalyticsService();
  const range = (req.query.range as string) || '7d';

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

    return res.status(200).json(metrics);
  } catch (error) {
    console.error('Analytics API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply rate limiting for analytics reads
export default withRateLimit(RATE_LIMITS.READ, handler);
