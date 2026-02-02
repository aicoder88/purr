/**
 * Customer Analytics API
 *
 * Returns customer segmentation and LTV data for the admin dashboard.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';
import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import type { CustomerSegment } from '@/generated/client/client';

interface CustomerAnalyticsResponse {
  success: boolean;
  data?: {
    summary: {
      totalCustomers: number;
      totalRevenue: number;
      averageLTV: number;
      averageOrderValue: number;
    };
    segmentBreakdown: Array<{
      segment: CustomerSegment;
      count: number;
      revenue: number;
      avgLTV: number;
      percentage: number;
    }>;
    topCustomers: Array<{
      email: string;
      totalOrders: number;
      totalSpent: number;
      segment: CustomerSegment;
      lastOrderAt: string | null;
      predictedLTV: number | null;
    }>;
    atRiskCustomers: Array<{
      email: string;
      totalSpent: number;
      daysSinceLastOrder: number | null;
      segment: CustomerSegment;
    }>;
    cohortAnalysis: Array<{
      month: string;
      newCustomers: number;
      revenue: number;
      avgOrderValue: number;
    }>;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomerAnalyticsResponse>
) {
  // Require admin authentication
  const auth = await requireAuth(req, res, ['admin']);
  if (!auth.authorized) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  if (!prismaClient) {
    return res.status(500).json({
      success: false,
      error: 'Database not configured',
    });
  }

  try {
    // Get all customer metrics
    const metrics = await prismaClient.customerMetrics.findMany({
      orderBy: {
        totalSpent: 'desc',
      },
    });

    // Calculate summary stats
    const totalCustomers = metrics.length;
    const totalRevenue = metrics.reduce((sum, m) => sum + m.totalSpent, 0);
    const averageLTV =
      totalCustomers > 0
        ? metrics.reduce((sum, m) => sum + (m.predictedLTV || 0), 0) / totalCustomers
        : 0;
    const averageOrderValue =
      totalCustomers > 0 ? metrics.reduce((sum, m) => sum + m.averageOrderValue, 0) / totalCustomers : 0;

    // Segment breakdown
    const segmentMap = new Map<
      CustomerSegment,
      { count: number; revenue: number; ltvSum: number }
    >();

    const allSegments: CustomerSegment[] = [
      'NEW',
      'RETURNING',
      'LOYAL',
      'VIP',
      'AT_RISK',
      'CHURNED',
    ];

    allSegments.forEach((seg) => {
      segmentMap.set(seg, { count: 0, revenue: 0, ltvSum: 0 });
    });

    metrics.forEach((m) => {
      const existing = segmentMap.get(m.segment)!;
      segmentMap.set(m.segment, {
        count: existing.count + 1,
        revenue: existing.revenue + m.totalSpent,
        ltvSum: existing.ltvSum + (m.predictedLTV || 0),
      });
    });

    const segmentBreakdown = allSegments.map((segment) => {
      const data = segmentMap.get(segment)!;
      return {
        segment,
        count: data.count,
        revenue: data.revenue,
        avgLTV: data.count > 0 ? data.ltvSum / data.count : 0,
        percentage: totalCustomers > 0 ? (data.count / totalCustomers) * 100 : 0,
      };
    });

    // Top 20 customers by spend
    const topCustomers = metrics.slice(0, 20).map((m) => ({
      email: m.email,
      totalOrders: m.totalOrders,
      totalSpent: m.totalSpent,
      segment: m.segment,
      lastOrderAt: m.lastOrderAt?.toISOString() || null,
      predictedLTV: m.predictedLTV,
    }));

    // At-risk customers (AT_RISK or CHURNED segments)
    const atRiskCustomers = metrics
      .filter((m) => m.segment === 'AT_RISK' || m.segment === 'CHURNED')
      .slice(0, 20)
      .map((m) => ({
        email: m.email,
        totalSpent: m.totalSpent,
        daysSinceLastOrder: m.daysSinceLastOrder,
        segment: m.segment,
      }));

    // Cohort analysis - new customers by month
    const cohortMap = new Map<
      string,
      { newCustomers: number; revenue: number; totalOrders: number }
    >();

    metrics.forEach((m) => {
      if (m.firstOrderAt) {
        const monthKey = `${m.firstOrderAt.getFullYear()}-${String(m.firstOrderAt.getMonth() + 1).padStart(2, '0')}`;
        const existing = cohortMap.get(monthKey) || {
          newCustomers: 0,
          revenue: 0,
          totalOrders: 0,
        };
        cohortMap.set(monthKey, {
          newCustomers: existing.newCustomers + 1,
          revenue: existing.revenue + m.totalSpent,
          totalOrders: existing.totalOrders + m.totalOrders,
        });
      }
    });

    const cohortAnalysis = Array.from(cohortMap.entries())
      .map(([month, data]) => ({
        month,
        newCustomers: data.newCustomers,
        revenue: data.revenue,
        avgOrderValue: data.totalOrders > 0 ? data.revenue / data.totalOrders : 0,
      }))
      .sort((a, b) => b.month.localeCompare(a.month))
      .slice(0, 12); // Last 12 months

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          totalCustomers,
          totalRevenue,
          averageLTV,
          averageOrderValue,
        },
        segmentBreakdown,
        topCustomers,
        atRiskCustomers,
        cohortAnalysis,
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
