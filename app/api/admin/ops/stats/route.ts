import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { LeadStatus, RetailerStatus, OrderStatus } from '@/generated/client/client';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

// Helper to ensure prisma is available
function getPrisma() {
  if (!prisma) {
    throw new Error('Database not configured');
  }
  return prisma;
}

interface LeadsByStatus {
  status: LeadStatus;
  count: number;
}

interface LeadsByProvince {
  province: string;
  count: number;
}

interface LeadsByMonth {
  month: string;
  count: number;
}

interface OpsStats {
  // Lead metrics
  totalLeads: number;
  leadsByStatus: LeadsByStatus[];
  leadsByProvince: LeadsByProvince[];
  leadsByMonth: LeadsByMonth[];
  newLeadsThisMonth: number;
  newLeadsLastMonth: number;
  leadsGrowth: number;

  // Retailer metrics
  totalRetailers: number;
  activeRetailers: number;
  pendingRetailers: number;

  // Order metrics
  totalOrders: number;
  recentOrders: number;
  totalRevenue: number;
  recentRevenue: number;
  revenueGrowth: number;

  // Conversion
  conversionRate: number;

  // Recent activity
  recentActivity: Array<{
    id: string;
    type: 'lead' | 'retailer' | 'order';
    action: string;
    subject: string;
    timestamp: string;
  }>;
}

export async function GET(req: Request) {
  // Apply rate limiting (generous: 100 req/min for reads)
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'generous');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  // Auth check
  const { authorized } = await requireAuth();
  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const db = getPrisma();

    // Run all queries in parallel
    const [
      totalLeads,
      leadsByStatusRaw,
      leadsByProvinceRaw,
      leadsByMonthRaw,
      newLeadsThisMonth,
      newLeadsLastMonth,
      convertedLeads,
      totalRetailers,
      activeRetailers,
      pendingRetailers,
      totalOrders,
      recentOrders,
      totalRevenue,
      recentRevenue,
      recentLeads,
      recentRetailerActivity,
      recentOrderActivity
    ] = await Promise.all([
      // Total leads
      db.lead.count(),

      // Leads by status
      db.lead.groupBy({
        by: ['status'],
        _count: { status: true }
      }),

      // Leads by province
      db.lead.groupBy({
        by: ['province'],
        _count: { province: true },
        where: { province: { not: null } },
        orderBy: { _count: { province: 'desc' } },
        take: 10
      }),

      // Leads by month (last 6 months)
      db.$queryRaw<Array<{ month: string; count: bigint }>>`
        SELECT
          TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon') as month,
          COUNT(*) as count
        FROM leads
        WHERE "createdAt" >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '5 months')
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY DATE_TRUNC('month', "createdAt") ASC
      `,

      // New leads this month
      db.lead.count({
        where: { createdAt: { gte: startOfMonth } }
      }),

      // New leads last month
      db.lead.count({
        where: {
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth }
        }
      }),

      // Converted leads
      db.lead.count({
        where: { status: LeadStatus.CONVERTED }
      }),

      // Total retailers
      db.retailer.count(),

      // Active retailers
      db.retailer.count({
        where: { status: RetailerStatus.ACTIVE }
      }),

      // Pending retailers
      db.retailer.count({
        where: { status: RetailerStatus.PENDING }
      }),

      // Total orders
      db.order.count(),

      // Recent orders (last week)
      db.order.count({
        where: { createdAt: { gte: oneWeekAgo } }
      }),

      // Total revenue
      db.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: { in: [OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED] } }
      }),

      // Recent revenue (this month)
      db.order.aggregate({
        _sum: { totalAmount: true },
        where: {
          createdAt: { gte: startOfMonth },
          status: { in: [OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED] }
        }
      }),

      // Recent lead activity
      db.lead.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: { id: true, companyName: true, status: true, updatedAt: true }
      }),

      // Recent retailer activity
      db.retailer.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: { id: true, businessName: true, status: true, updatedAt: true }
      }),

      // Recent order activity
      db.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, totalAmount: true, status: true, createdAt: true }
      })
    ]);

    // Calculate growth percentages
    const leadsGrowth = newLeadsLastMonth > 0
      ? Math.round(((newLeadsThisMonth - newLeadsLastMonth) / newLeadsLastMonth) * 100)
      : newLeadsThisMonth > 0 ? 100 : 0;

    // Calculate conversion rate
    const conversionRate = totalLeads > 0
      ? Math.round((convertedLeads / totalLeads) * 100 * 10) / 10
      : 0;

    // Format leads by status
    const leadsByStatus: LeadsByStatus[] = leadsByStatusRaw.map(item => ({
      status: item.status,
      count: item._count.status
    }));

    // Format leads by province
    const leadsByProvince: LeadsByProvince[] = leadsByProvinceRaw.map(item => ({
      province: item.province || 'Unknown',
      count: item._count.province
    }));

    // Format leads by month
    const leadsByMonth: LeadsByMonth[] = leadsByMonthRaw.map(item => ({
      month: item.month,
      count: Number(item.count)
    }));

    // Build recent activity feed
    const recentActivity: OpsStats['recentActivity'] = [];

    recentLeads.forEach(lead => {
      recentActivity.push({
        id: lead.id,
        type: 'lead',
        action: lead.status === LeadStatus.NEW ? 'created' : 'updated',
        subject: lead.companyName,
        timestamp: lead.updatedAt.toISOString()
      });
    });

    recentRetailerActivity.forEach(retailer => {
      recentActivity.push({
        id: retailer.id,
        type: 'retailer',
        action: retailer.status === RetailerStatus.PENDING ? 'applied' : 'updated',
        subject: retailer.businessName,
        timestamp: retailer.updatedAt.toISOString()
      });
    });

    recentOrderActivity.forEach(order => {
      recentActivity.push({
        id: order.id,
        type: 'order',
        action: 'placed',
        subject: `$${order.totalAmount.toFixed(2)}`,
        timestamp: order.createdAt.toISOString()
      });
    });

    // Sort by timestamp, most recent first
    recentActivity.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Calculate revenue growth (placeholder - would need last month's data)
    const revenueGrowth = 0; // TODO: Calculate properly

    const stats: OpsStats = {
      totalLeads,
      leadsByStatus,
      leadsByProvince,
      leadsByMonth,
      newLeadsThisMonth,
      newLeadsLastMonth,
      leadsGrowth,
      totalRetailers,
      activeRetailers,
      pendingRetailers,
      totalOrders,
      recentOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      recentRevenue: recentRevenue._sum.totalAmount || 0,
      revenueGrowth,
      conversionRate,
      recentActivity: recentActivity.slice(0, 10)
    };

    return Response.json(stats, { status: 200, headers: rateLimitHeaders });
  } catch {
    // Error fetching ops stats
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500, headers: rateLimitHeaders });
  }
}
