import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { AffiliateStatus } from '@/generated/client/client';

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

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  try {
    const {
      status,
      page = '1',
      limit = '20',
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: {
      status?: AffiliateStatus;
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' };
        email?: { contains: string; mode: 'insensitive' };
        code?: { contains: string; mode: 'insensitive' };
      }>;
    } = {};

    if (status && status !== 'ALL') {
      where.status = status as AffiliateStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { code: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Build orderBy
    const validSortFields = [
      'createdAt',
      'name',
      'totalClicks',
      'totalConversions',
      'totalEarnings',
      'lastLoginAt',
    ];
    const sortField = validSortFields.includes(sortBy as string)
      ? (sortBy as string)
      : 'createdAt';
    const order = sortOrder === 'asc' ? 'asc' : 'desc';

    // Fetch affiliates with pagination
    const [affiliates, total] = await Promise.all([
      prisma.affiliate.findMany({
        where,
        orderBy: { [sortField]: order },
        skip,
        take: limitNum,
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
      }),
      prisma.affiliate.count({ where }),
    ]);

    return res.status(200).json({
      affiliates,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Failed to fetch affiliates:', error);
    return res.status(500).json({ error: 'Failed to fetch affiliates' });
  }
}
