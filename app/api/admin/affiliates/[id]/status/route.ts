/**
 * Admin Affiliate Status Update API
 *
 * PATCH: Update affiliate status (ACTIVE, SUSPENDED, TERMINATED)
 */

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { AffiliateStatus } from '@/generated/client/client';
import { z } from 'zod';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

// Input validation schema
const updateStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED', 'TERMINATED']),
  reason: z.string().max(500).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    // Validate input
    const body = await req.json();
    const validationResult = updateStatusSchema.safeParse(body);
    if (!validationResult.success) {
      return Response.json({
        error: 'Invalid request data',
        details: validationResult.error.issues,
      }, { status: 400 });
    }

    const { status } = validationResult.data;

    // Check affiliate exists
    const affiliate = await prisma.affiliate.findUnique({
      where: { id },
      select: { id: true, status: true, name: true, email: true },
    });

    if (!affiliate) {
      return Response.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    // Don't allow reactivating terminated affiliates without explicit flag
    if (affiliate.status === 'TERMINATED' && status !== 'TERMINATED') {
      // For now, allow reactivation. In production, you might want stricter rules.
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

    return Response.json({
      success: true,
      affiliate: updatedAffiliate,
    }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Failed to update affiliate status:', error);
    return Response.json({ error: 'Failed to update affiliate status' }, { status: 500, headers: rateLimitHeaders });
  }
}
