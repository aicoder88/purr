/**
 * A/B Test Tracking API (Public)
 *
 * POST - Track views and conversions for A/B tests
 * Called from client-side JavaScript
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '@/lib/prisma';

interface TrackResponse {
  success: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrackResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  if (!prismaClient) {
    return res.status(200).json({ success: true }); // Silently succeed
  }

  try {
    const { testSlug, variant, type } = req.body;

    if (!testSlug || !variant || !type) {
      return res.status(400).json({
        success: false,
        error: 'testSlug, variant, and type are required',
      });
    }

    if (!['view', 'conversion'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'type must be "view" or "conversion"',
      });
    }

    if (!['control', 'variant'].includes(variant)) {
      return res.status(400).json({
        success: false,
        error: 'variant must be "control" or "variant"',
      });
    }

    // Check if test exists and is running
    const test = await prismaClient.aBTest.findUnique({
      where: { slug: testSlug },
    });

    if (!test || test.status !== 'RUNNING') {
      // Silently succeed - don't expose test existence
      return res.status(200).json({ success: true });
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

    return res.status(200).json({ success: true });
  } catch {
    // Silently succeed on errors - don't break the page
    return res.status(200).json({ success: true });
  }
}
