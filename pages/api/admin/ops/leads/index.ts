import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { withCSRFProtection } from '@/lib/security/csrf';
import { LeadStatus } from '@/generated/client/client';
import * as Sentry from '@sentry/nextjs';

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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized, session } = await requireAuth(req, res);

  if (!authorized || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { logger } = Sentry;

  try {
    if (req.method === 'GET') {
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
      } = req.query as LeadsQueryParams;

      const pageNum = parseInt(page, 10);
      const limitNum = Math.min(parseInt(limit, 10), 100);
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
        return res.status(503).json({ error: 'Database not configured' });
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

      return res.status(200).json({
        leads,
        pagination: {
          page: pageNum,
          limit: limitNum,
          totalCount,
          totalPages: Math.ceil(totalCount / limitNum)
        },
        statusCounts: statusCountsObj
      });
    }

    if (req.method === 'POST') {
      const leadData = req.body;

      // Validate required fields
      if (!leadData.companyName) {
        return res.status(400).json({ error: 'Company name is required' });
      }

      if (!prismaClient) {
        return res.status(503).json({ error: 'Database not configured' });
      }

      // Check for duplicate
      const existing = await prismaClient.lead.findFirst({
        where: {
          companyName: leadData.companyName,
          city: leadData.city || null
        }
      });

      if (existing) {
        return res.status(409).json({
          error: 'A lead with this company name and city already exists',
          existingId: existing.id
        });
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

      return res.status(201).json({ success: true, lead });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Leads API error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply middleware based on method
export default async function leadsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return withRateLimit(RATE_LIMITS.READ, handler)(req, res);
  }
  if (req.method === 'POST') {
    return withRateLimit(RATE_LIMITS.CREATE, withCSRFProtection(handler))(req, res);
  }
  return handler(req, res);
}
