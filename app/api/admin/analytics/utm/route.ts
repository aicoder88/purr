/**
 * UTM Attribution Analytics API
 *
 * Returns UTM campaign performance data for the admin dashboard.
 * Shows which traffic sources and campaigns drive the most revenue.
 */

import { requireAuth } from '@/lib/auth/session';
import prismaClient from '@/lib/prisma';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

interface UTMMetrics {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  orders: number;
  revenue: number;
  avgOrderValue: number;
}

interface UTMAnalyticsResponse {
  success: boolean;
  data?: {
    summary: {
      totalOrders: number;
      totalRevenue: number;
      attributedOrders: number;
      attributedRevenue: number;
      attributionRate: number;
    };
    bySource: UTMMetrics[];
    byCampaign: UTMMetrics[];
    byMedium: UTMMetrics[];
    topLandingPages: Array<{
      landingPage: string;
      orders: number;
      revenue: number;
    }>;
    recentOrders: Array<{
      id: string;
      total: number;
      source: string | null;
      campaign: string | null;
      createdAt: string;
    }>;
  };
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
    const { searchParams } = new URL(req.url);
    const days = searchParams.get('days') || '30';
    const daysInt = parseInt(days, 10) || 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysInt);

    // Get all completed orders in date range
    const orders = await prismaClient.order.findMany({
      where: {
        status: {
          in: ['PAID', 'SHIPPED', 'DELIVERED'],
        },
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        id: true,
        totalAmount: true,
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
        utmLandingPage: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate summary stats
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const attributedOrders = orders.filter((o) => o.utmSource).length;
    const attributedRevenue = orders
      .filter((o) => o.utmSource)
      .reduce((sum, o) => sum + o.totalAmount, 0);

    // Group by source
    const bySourceMap = new Map<string, { orders: number; revenue: number }>();
    orders.forEach((order) => {
      const key = order.utmSource || 'Direct/Unknown';
      const existing = bySourceMap.get(key) || { orders: 0, revenue: 0 };
      bySourceMap.set(key, {
        orders: existing.orders + 1,
        revenue: existing.revenue + order.totalAmount,
      });
    });

    const bySource: UTMMetrics[] = Array.from(bySourceMap.entries())
      .map(([source, data]) => ({
        source,
        medium: null,
        campaign: null,
        orders: data.orders,
        revenue: data.revenue,
        avgOrderValue: data.revenue / data.orders,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Group by campaign
    const byCampaignMap = new Map<string, { orders: number; revenue: number }>();
    orders
      .filter((o) => o.utmCampaign)
      .forEach((order) => {
        const key = order.utmCampaign!;
        const existing = byCampaignMap.get(key) || { orders: 0, revenue: 0 };
        byCampaignMap.set(key, {
          orders: existing.orders + 1,
          revenue: existing.revenue + order.totalAmount,
        });
      });

    const byCampaign: UTMMetrics[] = Array.from(byCampaignMap.entries())
      .map(([campaign, data]) => ({
        source: null,
        medium: null,
        campaign,
        orders: data.orders,
        revenue: data.revenue,
        avgOrderValue: data.revenue / data.orders,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Group by medium
    const byMediumMap = new Map<string, { orders: number; revenue: number }>();
    orders.forEach((order) => {
      const key = order.utmMedium || 'Unknown';
      const existing = byMediumMap.get(key) || { orders: 0, revenue: 0 };
      byMediumMap.set(key, {
        orders: existing.orders + 1,
        revenue: existing.revenue + order.totalAmount,
      });
    });

    const byMedium: UTMMetrics[] = Array.from(byMediumMap.entries())
      .map(([medium, data]) => ({
        source: null,
        medium,
        campaign: null,
        orders: data.orders,
        revenue: data.revenue,
        avgOrderValue: data.revenue / data.orders,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Top landing pages
    const landingPageMap = new Map<string, { orders: number; revenue: number }>();
    orders
      .filter((o) => o.utmLandingPage)
      .forEach((order) => {
        // Extract path from full URL
        let path = order.utmLandingPage!;
        try {
          const url = new URL(path);
          path = url.pathname;
        } catch {
          // Already a path
        }
        const existing = landingPageMap.get(path) || { orders: 0, revenue: 0 };
        landingPageMap.set(path, {
          orders: existing.orders + 1,
          revenue: existing.revenue + order.totalAmount,
        });
      });

    const topLandingPages = Array.from(landingPageMap.entries())
      .map(([landingPage, data]) => ({
        landingPage,
        ...data,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Recent orders with UTM data
    const recentOrders = orders.slice(0, 20).map((o) => ({
      id: o.id,
      total: o.totalAmount,
      source: o.utmSource,
      campaign: o.utmCampaign,
      createdAt: o.createdAt.toISOString(),
    }));

    const response: UTMAnalyticsResponse = {
      success: true,
      data: {
        summary: {
          totalOrders,
          totalRevenue,
          attributedOrders,
          attributedRevenue,
          attributionRate: totalOrders > 0 ? (attributedOrders / totalOrders) * 100 : 0,
        },
        bySource,
        byCampaign,
        byMedium,
        topLandingPages,
        recentOrders,
      },
    };

    return Response.json(response, { headers: rateLimitHeaders });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
