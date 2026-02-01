/**
 * Admin Affiliate Payouts API
 *
 * GET: Fetch list of payout requests with stats
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { PayoutStatus } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  try {
    const { status, search } = req.query;

    // Build where clause for payouts
    interface PayoutWhereClause {
      status?: PayoutStatus;
      affiliate?: {
        OR: Array<{
          name?: { contains: string; mode: 'insensitive' };
          email?: { contains: string; mode: 'insensitive' };
          code?: { contains: string; mode: 'insensitive' };
        }>;
      };
    }

    const where: PayoutWhereClause = {};

    if (status && typeof status === 'string' && status !== '') {
      where.status = status as PayoutStatus;
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      where.affiliate = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { code: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    // Fetch payouts with affiliate info
    const payouts = await prisma.affiliatePayout.findMany({
      where,
      orderBy: [
        { status: 'asc' }, // PENDING first
        { requestedAt: 'desc' },
      ],
      include: {
        affiliate: {
          select: {
            id: true,
            name: true,
            email: true,
            code: true,
          },
        },
      },
    });

    // Transform for frontend
    const transformedPayouts = payouts.map((payout) => ({
      id: payout.id,
      affiliateId: payout.affiliateId,
      affiliateName: payout.affiliate.name,
      affiliateEmail: payout.affiliate.email,
      affiliateCode: payout.affiliate.code,
      amount: payout.amount,
      method: payout.method,
      payoutEmail: payout.payoutEmail,
      status: payout.status,
      requestedAt: payout.requestedAt.toISOString(),
      processedAt: payout.processedAt?.toISOString() || null,
      processedBy: payout.processedBy,
      transactionRef: payout.transactionRef,
      notes: payout.notes,
    }));

    // Calculate stats
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [pendingStats, processingStats, completedStats] = await Promise.all([
      prisma.affiliatePayout.aggregate({
        where: { status: 'PENDING' },
        _count: { id: true },
        _sum: { amount: true },
      }),
      prisma.affiliatePayout.aggregate({
        where: { status: 'PROCESSING' },
        _count: { id: true },
        _sum: { amount: true },
      }),
      prisma.affiliatePayout.aggregate({
        where: {
          status: 'COMPLETED',
          processedAt: { gte: startOfMonth },
        },
        _count: { id: true },
        _sum: { amount: true },
      }),
    ]);

    const stats = {
      pendingCount: pendingStats._count.id || 0,
      pendingAmount: pendingStats._sum.amount || 0,
      processingCount: processingStats._count.id || 0,
      processingAmount: processingStats._sum.amount || 0,
      completedThisMonth: completedStats._count.id || 0,
      completedAmountThisMonth: completedStats._sum.amount || 0,
    };

    return res.status(200).json({
      payouts: transformedPayouts,
      stats,
    });
  } catch (error) {
    console.error('Failed to fetch payouts:', error);
    return res.status(500).json({ error: 'Failed to fetch payouts' });
  }
}
