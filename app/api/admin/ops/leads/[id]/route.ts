import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import * as Sentry from '@sentry/nextjs';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
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

    return Response.json(lead, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { logger } = Sentry;

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

    logger.info('Lead updated', { leadId: id, updates: Object.keys(updateData) });

    return Response.json({ success: true, lead }, { status: 200 });
  } catch (error) {
    if ((error as { code?: string }).code === 'P2025') {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }
    Sentry.captureException(error);
    logger.error('Lead API error', { error: error instanceof Error ? error.message : 'Unknown error', leadId: id });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: RouteParams) {
  return PUT(req, { params });
}

export async function DELETE(req: Request, { params }: RouteParams) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { logger } = Sentry;

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

    logger.info('Lead deleted', { leadId: id });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    if ((error as { code?: string }).code === 'P2025') {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }
    Sentry.captureException(error);
    logger.error('Lead API error', { error: error instanceof Error ? error.message : 'Unknown error', leadId: id });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
