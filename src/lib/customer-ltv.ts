/**
 * Customer LTV (Lifetime Value) Tracking
 *
 * Calculates and tracks customer metrics for segmentation and analytics.
 */

import prisma from './prisma';
import type { CustomerSegment } from '@/generated/client/client';

function requirePrisma() {
  if (!prisma) {
    throw new Error('Database not configured');
  }
  return prisma;
}

interface _CustomerOrderData {
  email: string;
  totalAmount: number;
  createdAt: Date;
}

/**
 * Calculate customer segment based on order history
 */
function calculateSegment(
  totalOrders: number,
  totalSpent: number,
  daysSinceLastOrder: number | null
): CustomerSegment {
  // Check for at-risk or churned first
  if (daysSinceLastOrder !== null) {
    if (daysSinceLastOrder >= 120) return 'CHURNED';
    if (daysSinceLastOrder >= 60) return 'AT_RISK';
  }

  // VIP: High spenders ($500+ or 6+ orders)
  if (totalSpent >= 500 || totalOrders >= 6) return 'VIP';

  // Loyal: 4-5 orders
  if (totalOrders >= 4) return 'LOYAL';

  // Returning: 2-3 orders
  if (totalOrders >= 2) return 'RETURNING';

  // New: 1 order
  return 'NEW';
}

/**
 * Calculate predicted LTV based on customer behavior
 * Simple model: Average order value * expected orders per year * years
 */
function calculatePredictedLTV(
  averageOrderValue: number,
  totalOrders: number,
  daysSinceFirstOrder: number
): number {
  if (daysSinceFirstOrder === 0 || totalOrders === 0) {
    // New customer: assume 2 orders per year for 2 years
    return averageOrderValue * 2 * 2;
  }

  // Calculate order frequency (orders per year)
  const yearsActive = Math.max(daysSinceFirstOrder / 365, 0.1);
  const ordersPerYear = totalOrders / yearsActive;

  // Predict 3 more years of purchases at current rate
  const predictedFutureOrders = ordersPerYear * 3;

  return averageOrderValue * predictedFutureOrders;
}

/**
 * Update customer metrics after an order is placed
 */
export async function updateCustomerMetrics(
  email: string
): Promise<void> {
  const db = requirePrisma();
  // Get all orders for this customer
  const orders = await db.order.findMany({
    where: {
      customer: {
        email: email,
      },
      status: {
        in: ['PAID', 'SHIPPED', 'DELIVERED'],
      },
    },
    select: {
      totalAmount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (orders.length === 0) return;

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const averageOrderValue = totalSpent / totalOrders;
  const firstOrderAt = orders[0].createdAt;
  const lastOrderAt = orders[orders.length - 1].createdAt;

  const now = new Date();
  const daysSinceLastOrder = Math.floor(
    (now.getTime() - lastOrderAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysSinceFirstOrder = Math.floor(
    (now.getTime() - firstOrderAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const segment = calculateSegment(totalOrders, totalSpent, daysSinceLastOrder);
  const predictedLTV = calculatePredictedLTV(
    averageOrderValue,
    totalOrders,
    daysSinceFirstOrder
  );

  // Upsert customer metrics
  await db.customerMetrics.upsert({
    where: { email },
    create: {
      email,
      totalOrders,
      totalSpent,
      averageOrderValue,
      firstOrderAt,
      lastOrderAt,
      daysSinceLastOrder,
      predictedLTV,
      segment,
    },
    update: {
      totalOrders,
      totalSpent,
      averageOrderValue,
      firstOrderAt,
      lastOrderAt,
      daysSinceLastOrder,
      predictedLTV,
      segment,
    },
  });
}

/**
 * Batch update all customer metrics (run daily via cron)
 */
export async function updateAllCustomerMetrics(): Promise<{
  updated: number;
  errors: number;
}> {
  const db = requirePrisma();
  // Get unique customer emails with orders
  const customers = await db.customer.findMany({
    where: {
      order: {
        status: {
          in: ['PAID', 'SHIPPED', 'DELIVERED'],
        },
      },
    },
    select: {
      email: true,
    },
    distinct: ['email'],
  });

  let updated = 0;
  let errors = 0;

  for (const customer of customers) {
    try {
      await updateCustomerMetrics(customer.email);
      updated++;
    } catch (error) {
      console.error(`Failed to update metrics for ${customer.email}:`, error);
      errors++;
    }
  }

  return { updated, errors };
}

/**
 * Get customers by segment for targeted marketing
 */
export async function getCustomersBySegment(
  segment: CustomerSegment,
  limit: number = 100
): Promise<Array<{ email: string; totalSpent: number; predictedLTV: number | null }>> {
  const db = requirePrisma();
  return db.customerMetrics.findMany({
    where: { segment },
    select: {
      email: true,
      totalSpent: true,
      predictedLTV: true,
    },
    orderBy: {
      predictedLTV: 'desc',
    },
    take: limit,
  });
}

/**
 * Get at-risk customers for re-engagement campaigns
 */
export async function getAtRiskCustomers(): Promise<
  Array<{
    email: string;
    lastOrderAt: Date | null;
    daysSinceLastOrder: number | null;
    totalOrders: number;
    totalSpent: number;
  }>
> {
  const db = requirePrisma();
  return db.customerMetrics.findMany({
    where: {
      segment: {
        in: ['AT_RISK', 'CHURNED'],
      },
    },
    select: {
      email: true,
      lastOrderAt: true,
      daysSinceLastOrder: true,
      totalOrders: true,
      totalSpent: true,
    },
    orderBy: {
      lastOrderAt: 'desc',
    },
  });
}

/**
 * Get LTV summary statistics for dashboard
 */
export async function getLTVSummary(): Promise<{
  totalCustomers: number;
  totalRevenue: number;
  averageLTV: number;
  segmentBreakdown: Record<CustomerSegment, number>;
  topCustomers: Array<{ email: string; totalSpent: number; segment: CustomerSegment }>;
}> {
  const db = requirePrisma();
  const metrics = await db.customerMetrics.findMany({
    select: {
      email: true,
      totalSpent: true,
      predictedLTV: true,
      segment: true,
    },
  });

  const totalCustomers = metrics.length;
  const totalRevenue = metrics.reduce((sum, m) => sum + m.totalSpent, 0);
  const averageLTV =
    totalCustomers > 0
      ? metrics.reduce((sum, m) => sum + (m.predictedLTV || 0), 0) / totalCustomers
      : 0;

  // Segment breakdown
  const segmentBreakdown: Record<CustomerSegment, number> = {
    NEW: 0,
    RETURNING: 0,
    LOYAL: 0,
    VIP: 0,
    AT_RISK: 0,
    CHURNED: 0,
  };

  for (const m of metrics) {
    segmentBreakdown[m.segment]++;
  }

  // Top 10 customers by spend
  const topCustomers = metrics
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 10)
    .map((m) => ({
      email: m.email,
      totalSpent: m.totalSpent,
      segment: m.segment,
    }));

  return {
    totalCustomers,
    totalRevenue,
    averageLTV,
    segmentBreakdown,
    topCustomers,
  };
}
