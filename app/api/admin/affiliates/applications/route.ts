import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { AffiliateApplicationStatus } from '@/generated/client/client';

export async function GET(req: Request) {
  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';
    const search = searchParams.get('search');

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
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
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
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

    return Response.json({
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
    return Response.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
