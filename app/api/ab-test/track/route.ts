/**
 * A/B Test Tracking API (Node.js Runtime with after())
 *
 * POST - Track views and conversions for A/B tests
 * Called from client-side JavaScript
 * Uses after() for non-blocking DB writes - returns response immediately
 */

import { after } from 'next/server';
import prismaClient from '@/lib/prisma';
import { getCommercialExperimentBySlug } from '@/lib/experiments/commercial';

interface TrackResponse {
  success: boolean;
  error?: string;
}

interface TrackBody {
  testSlug: string;
  variant: 'control' | 'variant';
  type: 'view' | 'conversion';
}

/**
 * Database update logic - runs after response is sent
 * This prevents the client from waiting for DB operations
 */
async function updateTestMetrics(body: TrackBody): Promise<void> {
  if (!prismaClient) {
    return;
  }

  try {
    const { testSlug, variant, type } = body;

    // Update the appropriate counter
    const updateField =
      variant === 'control'
        ? type === 'view'
          ? 'controlViews'
          : 'controlConversions'
        : type === 'view'
          ? 'variantViews'
          : 'variantConversions';

    const commercialExperiment = getCommercialExperimentBySlug(testSlug);

    if (commercialExperiment) {
      const existingTest = await prismaClient.aBTest.findUnique({
        where: { slug: testSlug },
        select: { status: true },
      });

      if (existingTest) {
        if (existingTest.status !== 'RUNNING') {
          return;
        }

        await prismaClient.aBTest.updateMany({
          where: {
            slug: testSlug,
            status: 'RUNNING',
          },
          data: {
            [updateField]: { increment: 1 },
          },
        });
        return;
      }

      try {
        await prismaClient.aBTest.create({
          data: {
            name: commercialExperiment.name,
            slug: commercialExperiment.slug,
            description: commercialExperiment.description,
            status: 'RUNNING',
            targetPage: commercialExperiment.targetPage,
            trafficSplit: commercialExperiment.trafficSplit,
            controlName: 'Control',
            variantName: 'Variant',
            createdBy: 'system-commercial-experiment',
            startedAt: new Date(),
            [updateField]: 1,
          },
        });
      } catch {
        // Another request may have created the row first; only count if still running.
        await prismaClient.aBTest.updateMany({
          where: {
            slug: testSlug,
            status: 'RUNNING',
          },
          data: {
            [updateField]: { increment: 1 },
          },
        });
      }
      return;
    }

    // Check if test exists and is running
    const test = await prismaClient.aBTest.findUnique({
      where: { slug: testSlug },
    });

    if (!test || test.status !== 'RUNNING') {
      return; // Silently skip - don't expose test existence
    }

    await prismaClient.aBTest.update({
      where: { slug: testSlug },
      data: {
        [updateField]: { increment: 1 },
      },
    });
  } catch {
    // Silently fail - tracking should never break the page
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as TrackBody;
    const { testSlug, variant, type } = body;

    // Validate required fields
    if (!testSlug || !variant || !type) {
      return Response.json(
        {
          success: false,
          error: 'testSlug, variant, and type are required',
        } as TrackResponse,
        { status: 400 }
      );
    }

    // Validate type
    if (!['view', 'conversion'].includes(type)) {
      return Response.json(
        {
          success: false,
          error: 'type must be "view" or "conversion"',
        } as TrackResponse,
        { status: 400 }
      );
    }

    // Validate variant
    if (!['control', 'variant'].includes(variant)) {
      return Response.json(
        {
          success: false,
          error: 'variant must be "control" or "variant"',
        } as TrackResponse,
        { status: 400 }
      );
    }

    // Schedule DB update to run after response is sent
    // This makes the API non-blocking for the client
    after(() => updateTestMetrics(body));

    // Return success immediately - don't wait for DB
    return Response.json({ success: true } as TrackResponse);
  } catch {
    // Silently succeed on errors - don't break the page
    return Response.json({ success: true } as TrackResponse);
  }
}
