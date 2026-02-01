import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { withCSRFProtection } from '@/lib/security/csrf';
import { LeadStatus } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';

interface BulkUpdateRequest {
  ids: string[];
  action: 'updateStatus' | 'delete';
  status?: LeadStatus;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized, session } = await requireAuth(req, res);

  if (!authorized || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { logger } = Sentry;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!prismaClient) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  try {
    const { ids, action, status } = req.body as BulkUpdateRequest;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'No lead IDs provided' });
    }

    if (ids.length > 100) {
      return res.status(400).json({ error: 'Maximum 100 leads can be updated at once' });
    }

    if (action === 'updateStatus') {
      if (!status || !Object.values(LeadStatus).includes(status)) {
        return res.status(400).json({ error: 'Invalid status provided' });
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

      return res.status(200).json({
        success: true,
        updatedCount: result.count
      });
    }

    if (action === 'delete') {
      const result = await prismaClient.lead.deleteMany({
        where: { id: { in: ids } }
      });

      logger.info('Bulk delete', { count: result.count });

      return res.status(200).json({
        success: true,
        deletedCount: result.count
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Bulk leads API error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withRateLimit(RATE_LIMITS.CREATE, withCSRFProtection(handler));
