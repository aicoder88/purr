import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { AffiliateApplicationStatus } from '@prisma/client';

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
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: {
      status?: AffiliateApplicationStatus;
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' };
        email?: { contains: string; mode: 'insensitive' };
      }>;
    } = {};

    if (status && status !== 'ALL') {
      where.status = status as AffiliateApplicationStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Fetch applications with pagination
    const [applications, total] = await Promise.all([
      prisma.affiliateApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        select: {
          id: true,
          name: true,
          email: true,
          website: true,
          audience: true,
          trafficSource: true,
          monthlyVisitors: true,
          experience: true,
          message: true,
          status: true,
          reviewedAt: true,
          reviewedBy: true,
          rejectionReason: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.affiliateApplication.count({ where }),
    ]);

    return res.status(200).json({
      applications,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    return res.status(500).json({ error: 'Failed to fetch applications' });
  }
}
