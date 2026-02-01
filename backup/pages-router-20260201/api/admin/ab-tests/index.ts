/**
 * A/B Tests Management API
 *
 * GET - List all A/B tests
 * POST - Create a new A/B test
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';
import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { calculateSignificance } from '@/lib/ab-testing';

interface ABTestResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ABTestResponse>
) {
  // Require admin authentication
  const auth = await requireAuth(req, res, ['admin']);
  if (!auth.authorized) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if (!prismaClient) {
    return res.status(500).json({
      success: false,
      error: 'Database not configured',
    });
  }

  if (req.method === 'GET') {
    try {
      const tests = await prismaClient.aBTest.findMany({
        orderBy: { createdAt: 'desc' },
      });

      // Add statistical analysis to each test
      const testsWithStats = tests.map((test) => {
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
        const improvement = controlRate > 0 ? ((variantRate - controlRate) / controlRate) * 100 : 0;

        return {
          ...test,
          stats: {
            controlRate: Math.round(controlRate * 100) / 100,
            variantRate: Math.round(variantRate * 100) / 100,
            improvement: Math.round(improvement * 100) / 100,
            confidence,
            winner,
          },
        };
      });

      return res.status(200).json({
        success: true,
        data: testsWithStats,
      });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        name,
        slug,
        description,
        targetPage,
        trafficSplit = 50,
        controlName = 'Control',
        variantName = 'Variant',
        controlConfig,
        variantConfig,
      } = req.body;

      if (!name || !slug || !targetPage) {
        return res.status(400).json({
          success: false,
          error: 'name, slug, and targetPage are required',
        });
      }

      // Check for duplicate slug
      const existing = await prismaClient.aBTest.findUnique({
        where: { slug },
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          error: 'A test with this slug already exists',
        });
      }

      const test = await prismaClient.aBTest.create({
        data: {
          name,
          slug,
          description,
          targetPage,
          trafficSplit,
          controlName,
          variantName,
          controlConfig,
          variantConfig,
          createdBy: auth.session?.user?.email || undefined,
        },
      });

      return res.status(201).json({
        success: true,
        data: test,
      });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed',
  });
}
