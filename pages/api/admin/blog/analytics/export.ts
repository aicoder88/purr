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

  const range = (req.query.range as string) || '30d';
  const format = (req.query.format as 'csv' | 'pdf') || 'csv';

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

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    return res.status(200).send(report);
  } catch (error) {
    console.error('Export API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
