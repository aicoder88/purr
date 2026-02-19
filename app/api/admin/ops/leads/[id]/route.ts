import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
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

  const { id } = await params;

  if (!id || typeof id !== 'string') {
    return Response.json({ error: 'Invalid lead ID' }, { status: 400 });
  }

  if (!prismaClient) {
    return Response.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const lead = await prismaClient.lead.findUnique({
      where: { id }
    });

    if (!lead) {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }

    return Response.json(lead, { status: 200, headers: rateLimitHeaders });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
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

  const { id } = await params;
  
  if (!id || typeof id !== 'string') {
    return Response.json({ error: 'Invalid lead ID' }, { status: 400 });
  }

  if (!prismaClient) {
    return Response.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const updateData = await req.json();

    // Remove id from update data
    delete updateData.id;
    delete updateData.createdAt;

    // Update lastContact if status is changing to CONTACTED
    if (updateData.status === 'CONTACTED') {
      updateData.lastContact = new Date();
    }

    const lead = await prismaClient.lead.update({
      where: { id },
      data: updateData
    });

    console.info('Lead updated', { leadId: id, updates: Object.keys(updateData) });

    return Response.json({ success: true, lead }, { status: 200, headers: rateLimitHeaders });
  } catch (error) {
    if ((error as { code?: string }).code === 'P2025') {
      return Response.json({ error: 'Lead not found' }, { status: 404, headers: rateLimitHeaders });
    }
    console.error('Lead API error', { error: error instanceof Error ? error.message : 'Unknown error', leadId: id });
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}

export async function PATCH(req: Request, { params }: RouteParams) {
  return PUT(req, { params });
}

// Note: PATCH uses PUT which already has rate limiting

export async function DELETE(req: Request, { params }: RouteParams) {
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

  const { id } = await params;
  
  if (!id || typeof id !== 'string') {
    return Response.json({ error: 'Invalid lead ID' }, { status: 400 });
  }

  if (!prismaClient) {
    return Response.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    await prismaClient.lead.delete({
      where: { id }
    });

    console.info('Lead deleted', { leadId: id });

    return Response.json({ success: true }, { status: 200, headers: rateLimitHeaders });
  } catch (error) {
    if ((error as { code?: string }).code === 'P2025') {
      return Response.json({ error: 'Lead not found' }, { status: 404, headers: rateLimitHeaders });
    }
    console.error('Lead API error', { error: error instanceof Error ? error.message : 'Unknown error', leadId: id });
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}
