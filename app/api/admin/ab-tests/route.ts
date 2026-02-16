/**
 * A/B Tests Management API
 *
 * GET - List all A/B tests
 * POST - Create a new A/B test
 */

import * as Sentry from '@sentry/nextjs';
import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { calculateSignificance } from '@/lib/ab-testing-server';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

interface ABTestResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export async function GET(req: Request): Promise<Response> {
  // Apply rate limiting (generous: 100 req/min for reads)
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'generous');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { success: false, error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

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
      const controlOrderRate =
        test.controlViews > 0
          ? (test.controlOrders / test.controlViews) * 100
          : 0;
      const variantOrderRate =
        test.variantViews > 0
          ? (test.variantOrders / test.variantViews) * 100
          : 0;
      const controlRevenuePerVisitor =
        test.controlViews > 0
          ? test.controlRevenue / test.controlViews
          : 0;
      const variantRevenuePerVisitor =
        test.variantViews > 0
          ? test.variantRevenue / test.variantViews
          : 0;
      const controlAOV =
        test.controlOrders > 0
          ? test.controlRevenue / test.controlOrders
          : 0;
      const variantAOV =
        test.variantOrders > 0
          ? test.variantRevenue / test.variantOrders
          : 0;
      const revenueLift = test.controlRevenue > 0
        ? ((test.variantRevenue - test.controlRevenue) / test.controlRevenue) * 100
        : 0;

      return {
        ...test,
        stats: {
          controlRate: Math.round(controlRate * 100) / 100,
          variantRate: Math.round(variantRate * 100) / 100,
          improvement: Math.round(improvement * 100) / 100,
          controlOrderRate: Math.round(controlOrderRate * 100) / 100,
          variantOrderRate: Math.round(variantOrderRate * 100) / 100,
          controlRevenuePerVisitor: Math.round(controlRevenuePerVisitor * 100) / 100,
          variantRevenuePerVisitor: Math.round(variantRevenuePerVisitor * 100) / 100,
          controlAOV: Math.round(controlAOV * 100) / 100,
          variantAOV: Math.round(variantAOV * 100) / 100,
          revenueLift: Math.round(revenueLift * 100) / 100,
          confidence,
          winner,
        },
      };
    });

    const response: ABTestResponse = {
      success: true,
      data: testsWithStats,
    };

    return Response.json(response, { headers: rateLimitHeaders });
  } catch (error) {
    Sentry.captureException(error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}

export async function POST(req: Request): Promise<Response> {
  // Apply rate limiting (standard: 20 req/min for writes)
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { success: false, error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

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

  try {
    const body = await req.json();
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
    } = body;

    if (!name || !slug || !targetPage) {
      return Response.json(
        {
          success: false,
          error: 'name, slug, and targetPage are required',
        },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = await prismaClient.aBTest.findUnique({
      where: { slug },
    });

    if (existing) {
      return Response.json(
        {
          success: false,
          error: 'A test with this slug already exists',
        },
        { status: 400 }
      );
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

    const response: ABTestResponse = {
      success: true,
      data: test,
    };

    return Response.json(response, { status: 201, headers: rateLimitHeaders });
  } catch (error) {
    Sentry.captureException(error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
