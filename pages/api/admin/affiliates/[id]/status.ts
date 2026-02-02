/**
 * Admin Affiliate Status Update API
 *
 * PATCH: Update affiliate status (ACTIVE, SUSPENDED, TERMINATED)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { AffiliateStatus } from '@/generated/client/client';
import { z } from 'zod';

// Input validation schema
const updateStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED', 'TERMINATED']),
  reason: z.string().max(500).optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Affiliate ID required' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  try {
    // Validate input
    const validationResult = updateStatusSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: validationResult.error.issues,
      });
    }

    const { status } = validationResult.data;

    // Check affiliate exists
    const affiliate = await prisma.affiliate.findUnique({
      where: { id },
      select: { id: true, status: true, name: true, email: true },
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    // Don't allow reactivating terminated affiliates without explicit flag
    if (affiliate.status === 'TERMINATED' && status !== 'TERMINATED') {
      // For now, allow reactivation. In production, you might want stricter rules.
      console.log(`Reactivating terminated affiliate: ${affiliate.email}`);
    }

    // Update status
    const updatedAffiliate = await prisma.affiliate.update({
      where: { id },
      data: {
        status: status as AffiliateStatus,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        status: true,
        name: true,
        email: true,
      },
    });

    console.log(
      `Affiliate ${affiliate.email} status changed from ${affiliate.status} to ${status} by ${session.user?.email}`
    );

    return res.status(200).json({
      success: true,
      affiliate: updatedAffiliate,
    });
  } catch (error) {
    console.error('Failed to update affiliate status:', error);
    return res.status(500).json({ error: 'Failed to update affiliate status' });
  }
}
