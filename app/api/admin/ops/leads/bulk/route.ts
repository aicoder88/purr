import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { LeadStatus } from '@/generated/client/client';
import * as Sentry from '@sentry/nextjs';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

interface BulkUpdateRequest {
  ids: string[];
  action: 'updateStatus' | 'delete';
  status?: LeadStatus;
}

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

  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { logger } = Sentry;

  if (!prismaClient) {
    return Response.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const { ids, action, status } = await req.json() as BulkUpdateRequest;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return Response.json({ error: 'No lead IDs provided' }, { status: 400 });
    }

    if (ids.length > 100) {
      return Response.json({ error: 'Maximum 100 leads can be updated at once' }, { status: 400 });
    }

    if (action === 'updateStatus') {
      if (!status || !Object.values(LeadStatus).includes(status)) {
        return Response.json({ error: 'Invalid status provided' }, { status: 400 });
      }

      const updateData: { status: LeadStatus; lastContact?: Date } = { status };

      // Update lastContact if changing to CONTACTED
      if (status === 'CONTACTED') {
        updateData.lastContact = new Date();
      }

      const result = await prismaClient.lead.updateMany({
        where: { id: { in: ids } },
        data: updateData
      });

      logger.info('Bulk status update', { count: result.count, status });

      return Response.json({
        success: true,
        updatedCount: result.count
      }, { status: 200, headers: rateLimitHeaders });
    }

    if (action === 'delete') {
      const result = await prismaClient.lead.deleteMany({
        where: { id: { in: ids } }
      });

      logger.info('Bulk delete', { count: result.count });

      return Response.json({
        success: true,
        deletedCount: result.count
      }, { status: 200, headers: rateLimitHeaders });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400, headers: rateLimitHeaders });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Bulk leads API error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}
