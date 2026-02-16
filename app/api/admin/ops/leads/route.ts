import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { LeadStatus } from '@/generated/client/client';
import * as Sentry from '@sentry/nextjs';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

interface LeadsQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  status?: LeadStatus | 'ALL';
  city?: string;
  province?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function GET(req: Request) {
  // Apply rate limiting (generous: 100 req/min for reads)
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'generous');
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

  try {
    const url = new URL(req.url);
    const {
      page = '1',
      limit = '25',
      search = '',
      status = 'ALL',
      city = '',
      province = '',
      category = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = Object.fromEntries(url.searchParams) as LeadsQueryParams;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { companyName: { contains: search, mode: 'insensitive' } },
        { contactName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (province) {
      where.province = province;
    }

    if (category) {
      where.category = { contains: category, mode: 'insensitive' };
    }

    // Build orderBy
    const orderBy: Record<string, string> = {};
    const validSortFields = ['companyName', 'city', 'status', 'createdAt', 'lastContact'];
    if (validSortFields.includes(sortBy)) {
      orderBy[sortBy] = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }

    if (!prismaClient) {
      return Response.json({ error: 'Database not configured' }, { status: 503 });
    }

    // Execute queries in parallel
    const [leads, totalCount, statusCounts] = await Promise.all([
      prismaClient.lead.findMany({
        where,
        orderBy,
        skip,
        take: limitNum
      }),
      prismaClient.lead.count({ where }),
      prismaClient.lead.groupBy({
        by: ['status'],
        _count: { status: true }
      })
    ]);

    // Transform status counts to object
    const statusCountsObj = statusCounts.reduce(
      (acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      },
      {} as Record<LeadStatus, number>
    );

    logger.info('Leads fetched', {
      count: leads.length,
      page: pageNum,
      totalCount
    });

    return Response.json({
      leads,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages: Math.ceil(totalCount / limitNum)
      },
      statusCounts: statusCountsObj
    }, { status: 200, headers: rateLimitHeaders });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Leads API error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
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

  try {
    const leadData = await req.json();

    // Validate required fields
    if (!leadData.companyName) {
      return Response.json({ error: 'Company name is required' }, { status: 400 });
    }

    if (!prismaClient) {
      return Response.json({ error: 'Database not configured' }, { status: 503 });
    }

    // Check for duplicate
    const existing = await prismaClient.lead.findFirst({
      where: {
        companyName: leadData.companyName,
        city: leadData.city || null
      }
    });

    if (existing) {
      return Response.json({
        error: 'A lead with this company name and city already exists',
        existingId: existing.id
      }, { status: 409 });
    }

    const lead = await prismaClient.lead.create({
      data: {
        companyName: leadData.companyName,
        contactName: leadData.contactName || null,
        phone: leadData.phone || null,
        email: leadData.email || null,
        emailSecondary: leadData.emailSecondary || null,
        street: leadData.street || null,
        city: leadData.city || null,
        province: leadData.province || null,
        postalCode: leadData.postalCode || null,
        neighborhood: leadData.neighborhood || null,
        website: leadData.website || null,
        facebook: leadData.facebook || null,
        instagram: leadData.instagram || null,
        tiktok: leadData.tiktok || null,
        youtube: leadData.youtube || null,
        twitter: leadData.twitter || null,
        category: leadData.category || null,
        notes: leadData.notes || null,
        openingHours: leadData.openingHours || null,
        status: leadData.status || 'NEW',
        source: 'manual'
      }
    });

    logger.info('Lead created', { leadId: lead.id, companyName: lead.companyName });

    return Response.json({ success: true, lead }, { status: 201, headers: rateLimitHeaders });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Leads API error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}
