import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { LeadStatus } from '@/generated/client/client';
import * as Sentry from '@sentry/nextjs';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

interface CSVLead {
  store_name: string;
  phone?: string;
  owner_manager?: string;
  notes?: string;
  status?: string;
  email_primary?: string;
  email_secondary?: string;
  email_quality?: string;
  email_result?: string;
  email_is_free?: string;
  email_is_role?: string;
  street?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  neighborhood?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
  opening_hours?: string;
  category?: string;
  'sent status'?: string;
}

// Map CSV status values to LeadStatus enum
function mapStatus(csvStatus: string | undefined): LeadStatus {
  if (!csvStatus) return 'NEW';
  
  const statusMap: Record<string, LeadStatus> = {
    'new': 'NEW',
    'contacted': 'CONTACTED',
    'sample sent': 'SAMPLE_SENT',
    'sample_sent': 'SAMPLE_SENT',
    'following up': 'FOLLOWING_UP',
    'following_up': 'FOLLOWING_UP',
    'converted': 'CONVERTED',
    'not interested': 'NOT_INTERESTED',
    'not_interested': 'NOT_INTERESTED',
    'no response': 'NO_RESPONSE',
    'no_response': 'NO_RESPONSE'
  };

  return statusMap[csvStatus.toLowerCase()] || 'NEW';
}

const MAX_CONTENT_LENGTH = 5 * 1024 * 1024; // 5MB
const MAX_COMPANY_NAME_LENGTH = 200;

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

  if (!prismaClient) {
    return Response.json({ error: 'Database not configured' }, { status: 503 });
  }

  // Check content length
  const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
  if (contentLength > MAX_CONTENT_LENGTH) {
    return Response.json({ error: 'Request body too large. Maximum 5MB allowed.' }, { status: 413 });
  }

  // Store reference to avoid null checks in async callbacks
  const prisma = prismaClient;

  try {
    const { leads, mode = 'skip' } = await req.json() as {
      leads: CSVLead[];
      mode: 'skip' | 'update' | 'replace';
    };

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      return Response.json({ error: 'No leads provided' }, { status: 400 });
    }

    if (leads.length > 5000) {
      return Response.json({ error: 'Maximum 5000 leads can be imported at once' }, { status: 400 });
    }

    const results = {
      created: 0,
      updated: 0,
      skipped: 0,
      errors: [] as { row: number; error: string; companyName?: string }[]
    };

    // Process leads in batches of 50
    const batchSize = 50;
    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (csvLead, batchIndex) => {
          const rowNum = i + batchIndex + 1;
          
          try {
            if (!csvLead.store_name) {
              results.errors.push({ row: rowNum, error: 'Missing store name' });
              return;
            }

            const companyName = csvLead.store_name.trim();
            
            // Validate company name length
            if (companyName.length > MAX_COMPANY_NAME_LENGTH) {
              results.errors.push({ 
                row: rowNum, 
                error: `Company name exceeds maximum length of ${MAX_COMPANY_NAME_LENGTH} characters`,
                companyName: companyName.substring(0, 50) + '...'
              });
              return;
            }

            const leadData = {
              companyName: companyName,
              phone: csvLead.phone?.trim() || null,
              contactName: csvLead.owner_manager?.trim() || null,
              notes: csvLead.notes?.trim() || null,
              status: mapStatus(csvLead.status),
              email: csvLead.email_primary?.trim() || null,
              emailSecondary: csvLead.email_secondary?.trim() || null,
              emailQuality: csvLead.email_quality?.trim() || null,
              emailResult: csvLead.email_result?.trim() || null,
              emailIsFree: csvLead.email_is_free?.toLowerCase() === 'true' ? true : 
                          csvLead.email_is_free?.toLowerCase() === 'false' ? false : null,
              emailIsRole: csvLead.email_is_role?.toLowerCase() === 'true' ? true :
                          csvLead.email_is_role?.toLowerCase() === 'false' ? false : null,
              street: csvLead.street?.trim() || null,
              city: csvLead.city?.trim() || null,
              province: csvLead.province?.trim() || null,
              postalCode: csvLead.postal_code?.trim() || null,
              neighborhood: csvLead.neighborhood?.trim() || null,
              website: csvLead.website?.trim() || null,
              facebook: csvLead.facebook?.trim() || null,
              instagram: csvLead.instagram?.trim() || null,
              tiktok: csvLead.tiktok?.trim() || null,
              youtube: csvLead.youtube?.trim() || null,
              twitter: csvLead.twitter?.trim() || null,
              openingHours: csvLead.opening_hours?.trim() || null,
              category: csvLead.category?.trim() || null,
              sentStatus: csvLead['sent status']?.trim() || null,
              source: 'csv-import',
              lastSyncedAt: new Date()
            };

            // Check for existing lead
            const existing = await prisma.lead.findFirst({
              where: {
                companyName: leadData.companyName,
                city: leadData.city
              }
            });

            if (existing) {
              if (mode === 'skip') {
                results.skipped++;
              } else if (mode === 'update') {
                await prisma.lead.update({
                  where: { id: existing.id },
                  data: leadData
                });
                results.updated++;
              }
            } else {
              await prisma.lead.create({ data: leadData });
              results.created++;
            }
          } catch (error) {
            results.errors.push({
              row: rowNum,
              error: error instanceof Error ? error.message : 'Unknown error',
              companyName: csvLead.store_name
            });
          }
        })
      );
    }

    logger.info('CSV import completed', {
      created: results.created,
      updated: results.updated,
      skipped: results.skipped,
      errors: results.errors.length
    });

    return Response.json({
      success: true,
      results
    }, { status: 200, headers: rateLimitHeaders });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('CSV import error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}
