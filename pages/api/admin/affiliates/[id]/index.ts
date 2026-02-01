/**
 * Admin Affiliate Detail API
 *
 * GET: Fetch affiliate details with conversions and payouts
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
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
    // Fetch affiliate with related data
    const affiliate = await prisma.affiliate.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        name: true,
        email: true,
        website: true,
        status: true,
        totalClicks: true,
        totalConversions: true,
        totalEarnings: true,
        pendingEarnings: true,
        availableBalance: true,
        payoutMethod: true,
        payoutEmail: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    // Fetch recent conversions (last 20)
    const conversions = await prisma.affiliateConversion.findMany({
      where: { affiliateId: id },
      orderBy: { purchasedAt: 'desc' },
      take: 20,
      select: {
        id: true,
        orderId: true,
        orderSubtotal: true,
        commissionAmount: true,
        status: true,
        purchasedAt: true,
      },
    });

    // Fetch payout history (last 20)
    const payouts = await prisma.affiliatePayout.findMany({
      where: { affiliateId: id },
      orderBy: { requestedAt: 'desc' },
      take: 20,
      select: {
        id: true,
        amount: true,
        method: true,
        status: true,
        requestedAt: true,
        processedAt: true,
        transactionRef: true,
      },
    });

    // Transform dates to ISO strings
    const transformedAffiliate = {
      ...affiliate,
      lastLoginAt: affiliate.lastLoginAt?.toISOString() || null,
      createdAt: affiliate.createdAt.toISOString(),
      updatedAt: affiliate.updatedAt.toISOString(),
    };

    const transformedConversions = conversions.map((c) => ({
      ...c,
      purchasedAt: c.purchasedAt.toISOString(),
    }));

    const transformedPayouts = payouts.map((p) => ({
      ...p,
      requestedAt: p.requestedAt.toISOString(),
      processedAt: p.processedAt?.toISOString() || null,
    }));

    return res.status(200).json({
      affiliate: transformedAffiliate,
      conversions: transformedConversions,
      payouts: transformedPayouts,
    });
  } catch (error) {
    console.error('Failed to fetch affiliate:', error);
    return res.status(500).json({ error: 'Failed to fetch affiliate' });
  }
}
