/**
 * A/B Test Tracking API (Public)
 *
 * POST - Track views and conversions for A/B tests
 * Called from client-side JavaScript
 */

import prismaClient from '@/lib/prisma';

interface TrackResponse {
  success: boolean;
  error?: string;
}

export async function POST(req: Request): Promise<Response> {
  if (!prismaClient) {
    return Response.json({ success: true } as TrackResponse); // Silently succeed
  }

  try {
    const body = await req.json();
    const { testSlug, variant, type } = body;

    if (!testSlug || !variant || !type) {
      return Response.json({
        success: false,
        error: 'testSlug, variant, and type are required',
      } as TrackResponse, { status: 400 });
    }

    if (!['view', 'conversion'].includes(type)) {
      return Response.json({
        success: false,
        error: 'type must be "view" or "conversion"',
      } as TrackResponse, { status: 400 });
    }

    if (!['control', 'variant'].includes(variant)) {
      return Response.json({
        success: false,
        error: 'variant must be "control" or "variant"',
      } as TrackResponse, { status: 400 });
    }

    // Check if test exists and is running
    const test = await prismaClient.aBTest.findUnique({
      where: { slug: testSlug },
    });

    if (!test || test.status !== 'RUNNING') {
      // Silently succeed - don't expose test existence
      return Response.json({ success: true } as TrackResponse);
    }

    // Update the appropriate counter
    const updateField =
      variant === 'control'
        ? type === 'view'
          ? 'controlViews'
          : 'controlConversions'
        : type === 'view'
          ? 'variantViews'
          : 'variantConversions';

    await prismaClient.aBTest.update({
      where: { slug: testSlug },
      data: {
        [updateField]: { increment: 1 },
      },
    });

    return Response.json({ success: true } as TrackResponse);
  } catch {
    // Silently succeed on errors - don't break the page
    return Response.json({ success: true } as TrackResponse);
  }
}
