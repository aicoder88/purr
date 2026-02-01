import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { withCSRFProtection } from '@/lib/security/csrf';
import * as Sentry from '@sentry/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized, session } = await requireAuth(req, res);

  if (!authorized || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const { logger } = Sentry;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid lead ID' });
  }

  if (!prismaClient) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  try {
    if (req.method === 'GET') {
      const lead = await prismaClient.lead.findUnique({
        where: { id }
      });

      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }

      return res.status(200).json(lead);
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const updateData = req.body;

      // Remove id from update data
      delete updateData.id;
      delete updateData.createdAt;

      // Update lastContact if status is changing to CONTACTED
      if (updateData.status === 'CONTACTED') {
        updateData.lastContact = new Date();
      }

      const lead = await prismaClient.lead.update({
        where: { id },
        data: updateData
      });

      logger.info('Lead updated', { leadId: id, updates: Object.keys(updateData) });

      return res.status(200).json({ success: true, lead });
    }

    if (req.method === 'DELETE') {
      await prismaClient.lead.delete({
        where: { id }
      });

      logger.info('Lead deleted', { leadId: id });

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    if ((error as { code?: string }).code === 'P2025') {
      return res.status(404).json({ error: 'Lead not found' });
    }
    Sentry.captureException(error);
    logger.error('Lead API error', { error: error instanceof Error ? error.message : 'Unknown error', leadId: id });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply middleware based on method
export default async function leadHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return withRateLimit(RATE_LIMITS.READ, handler)(req, res);
  }
  if (req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
    return withRateLimit(RATE_LIMITS.CREATE, withCSRFProtection(handler))(req, res);
  }
  return handler(req, res);
}
