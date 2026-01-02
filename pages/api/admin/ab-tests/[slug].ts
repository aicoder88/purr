/**
 * Individual A/B Test Management API
 *
 * GET - Get test details
 * PUT - Update test configuration
 * POST - Control test (start, pause, complete)
 * DELETE - Archive test
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

  const { slug } = req.query;
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid slug',
    });
  }

  // GET - Get test details
  if (req.method === 'GET') {
    try {
      const test = await prismaClient.aBTest.findUnique({
        where: { slug },
      });

      if (!test) {
        return res.status(404).json({
          success: false,
          error: 'Test not found',
        });
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

      return res.status(200).json({
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
      });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  // PUT - Update test configuration
  if (req.method === 'PUT') {
    try {
      const test = await prismaClient.aBTest.findUnique({
        where: { slug },
      });

      if (!test) {
        return res.status(404).json({
          success: false,
          error: 'Test not found',
        });
      }

      // Only allow editing draft or paused tests
      if (test.status === 'RUNNING') {
        return res.status(400).json({
          success: false,
          error: 'Cannot edit a running test. Pause it first.',
        });
      }

      const {
        name,
        description,
        targetPage,
        trafficSplit,
        controlName,
        variantName,
        controlConfig,
        variantConfig,
      } = req.body;

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

      return res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  // POST - Control test (start, pause, complete, reset)
  if (req.method === 'POST') {
    try {
      const { action } = req.body;

      if (!['start', 'pause', 'complete', 'reset'].includes(action)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid action. Use: start, pause, complete, or reset',
        });
      }

      const test = await prismaClient.aBTest.findUnique({
        where: { slug },
      });

      if (!test) {
        return res.status(404).json({
          success: false,
          error: 'Test not found',
        });
      }

      let updateData: Record<string, unknown> = {};

      switch (action) {
        case 'start':
          if (test.status === 'COMPLETED' || test.status === 'ARCHIVED') {
            return res.status(400).json({
              success: false,
              error: 'Cannot start a completed or archived test',
            });
          }
          updateData = {
            status: 'RUNNING',
            startedAt: test.startedAt || new Date(),
          };
          break;

        case 'pause':
          if (test.status !== 'RUNNING') {
            return res.status(400).json({
              success: false,
              error: 'Can only pause a running test',
            });
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
            return res.status(400).json({
              success: false,
              error: 'Cannot reset a running test. Pause it first.',
            });
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

      return res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  // DELETE - Archive test
  if (req.method === 'DELETE') {
    try {
      const test = await prismaClient.aBTest.findUnique({
        where: { slug },
      });

      if (!test) {
        return res.status(404).json({
          success: false,
          error: 'Test not found',
        });
      }

      if (test.status === 'RUNNING') {
        return res.status(400).json({
          success: false,
          error: 'Cannot archive a running test. Complete it first.',
        });
      }

      const updated = await prismaClient.aBTest.update({
        where: { slug },
        data: { status: 'ARCHIVED' },
      });

      return res.status(200).json({
        success: true,
        data: updated,
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
