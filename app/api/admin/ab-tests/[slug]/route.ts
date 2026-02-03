/**
 * Individual A/B Test Management API
 *
 * GET - Get test details
 * PUT - Update test configuration
 * POST - Control test (start, pause, complete)
 * DELETE - Archive test
 */

import * as Sentry from '@sentry/nextjs';
import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { calculateSignificance } from '@/lib/ab-testing';

interface ABTestResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: RouteParams): Promise<Response> {
  // Require admin authentication
  const auth = await requireAuth(undefined, undefined, ['admin']);
  if (!auth.authorized) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!prismaClient) {
    return Response.json(
      { success: false, error: 'Database not configured' },
      { status: 500 }
    );
  }

  const { slug } = await params;
  if (!slug) {
    return Response.json(
      { success: false, error: 'Invalid slug' },
      { status: 400 }
    );
  }

  try {
    const test = await prismaClient.aBTest.findUnique({
      where: { slug },
    });

    if (!test) {
      return Response.json(
        { success: false, error: 'Test not found' },
        { status: 404 }
      );
    }

    const { confidence, winner } = calculateSignificance(
      test.controlViews,
      test.controlConversions,
      test.variantViews,
      test.variantConversions
    );

    const controlRate =
      test.controlViews > 0
        ? (test.controlConversions / test.controlViews) * 100
        : 0;
    const variantRate =
      test.variantViews > 0
        ? (test.variantConversions / test.variantViews) * 100
        : 0;
    const improvement =
      controlRate > 0 ? ((variantRate - controlRate) / controlRate) * 100 : 0;

    const response: ABTestResponse = {
      success: true,
      data: {
        ...test,
        stats: {
          controlRate: Math.round(controlRate * 100) / 100,
          variantRate: Math.round(variantRate * 100) / 100,
          improvement: Math.round(improvement * 100) / 100,
          confidence,
          winner,
        },
      },
    };

    return Response.json(response);
  } catch (error) {
    Sentry.captureException(error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: RouteParams): Promise<Response> {
  // Require admin authentication
  const auth = await requireAuth(undefined, undefined, ['admin']);
  if (!auth.authorized) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!prismaClient) {
    return Response.json(
      { success: false, error: 'Database not configured' },
      { status: 500 }
    );
  }

  const { slug } = await params;
  if (!slug) {
    return Response.json(
      { success: false, error: 'Invalid slug' },
      { status: 400 }
    );
  }

  try {
    const test = await prismaClient.aBTest.findUnique({
      where: { slug },
    });

    if (!test) {
      return Response.json(
        { success: false, error: 'Test not found' },
        { status: 404 }
      );
    }

    // Only allow editing draft or paused tests
    if (test.status === 'RUNNING') {
      return Response.json(
        {
          success: false,
          error: 'Cannot edit a running test. Pause it first.',
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      name,
      description,
      targetPage,
      trafficSplit,
      controlName,
      variantName,
      controlConfig,
      variantConfig,
    } = body;

    const updated = await prismaClient.aBTest.update({
      where: { slug },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(targetPage && { targetPage }),
        ...(trafficSplit !== undefined && { trafficSplit }),
        ...(controlName && { controlName }),
        ...(variantName && { variantName }),
        ...(controlConfig !== undefined && { controlConfig }),
        ...(variantConfig !== undefined && { variantConfig }),
      },
    });

    const response: ABTestResponse = {
      success: true,
      data: updated,
    };

    return Response.json(response);
  } catch (error) {
    Sentry.captureException(error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: RouteParams): Promise<Response> {
  // Require admin authentication
  const auth = await requireAuth(undefined, undefined, ['admin']);
  if (!auth.authorized) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!prismaClient) {
    return Response.json(
      { success: false, error: 'Database not configured' },
      { status: 500 }
    );
  }

  const { slug } = await params;
  if (!slug) {
    return Response.json(
      { success: false, error: 'Invalid slug' },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (!['start', 'pause', 'complete', 'reset'].includes(action)) {
      return Response.json(
        {
          success: false,
          error: 'Invalid action. Use: start, pause, complete, or reset',
        },
        { status: 400 }
      );
    }

    const test = await prismaClient.aBTest.findUnique({
      where: { slug },
    });

    if (!test) {
      return Response.json(
        { success: false, error: 'Test not found' },
        { status: 404 }
      );
    }

    let updateData: Record<string, unknown> = {};

    switch (action) {
      case 'start':
        if (test.status === 'COMPLETED' || test.status === 'ARCHIVED') {
          return Response.json(
            {
              success: false,
              error: 'Cannot start a completed or archived test',
            },
            { status: 400 }
          );
        }
        updateData = {
          status: 'RUNNING',
          startedAt: test.startedAt || new Date(),
        };
        break;

      case 'pause':
        if (test.status !== 'RUNNING') {
          return Response.json(
            {
              success: false,
              error: 'Can only pause a running test',
            },
            { status: 400 }
          );
        }
        updateData = { status: 'PAUSED' };
        break;

      case 'complete':
        updateData = {
          status: 'COMPLETED',
          endedAt: new Date(),
        };
        break;

      case 'reset':
        if (test.status === 'RUNNING') {
          return Response.json(
            {
              success: false,
              error: 'Cannot reset a running test. Pause it first.',
            },
            { status: 400 }
          );
        }
        updateData = {
          controlViews: 0,
          variantViews: 0,
          controlConversions: 0,
          variantConversions: 0,
          startedAt: null,
          endedAt: null,
          status: 'DRAFT',
        };
        break;
    }

    const updated = await prismaClient.aBTest.update({
      where: { slug },
      data: updateData,
    });

    const response: ABTestResponse = {
      success: true,
      data: updated,
    };

    return Response.json(response);
  } catch (error) {
    Sentry.captureException(error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: RouteParams): Promise<Response> {
  // Require admin authentication
  const auth = await requireAuth(undefined, undefined, ['admin']);
  if (!auth.authorized) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!prismaClient) {
    return Response.json(
      { success: false, error: 'Database not configured' },
      { status: 500 }
    );
  }

  const { slug } = await params;
  if (!slug) {
    return Response.json(
      { success: false, error: 'Invalid slug' },
      { status: 400 }
    );
  }

  try {
    const test = await prismaClient.aBTest.findUnique({
      where: { slug },
    });

    if (!test) {
      return Response.json(
        { success: false, error: 'Test not found' },
        { status: 404 }
      );
    }

    if (test.status === 'RUNNING') {
      return Response.json(
        {
          success: false,
          error: 'Cannot archive a running test. Complete it first.',
        },
        { status: 400 }
      );
    }

    const updated = await prismaClient.aBTest.update({
      where: { slug },
      data: { status: 'ARCHIVED' },
    });

    const response: ABTestResponse = {
      success: true,
      data: updated,
    };

    return Response.json(response);
  } catch (error) {
    Sentry.captureException(error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
