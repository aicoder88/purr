/**
 * Inventory Management Utility
 *
 * Handles stock tracking, low stock alerts, and inventory operations.
 */

import prisma from './prisma';

function requirePrisma() {
  if (!prisma) {
    throw new Error('Database not configured');
  }
  return prisma;
}

export interface LowStockProduct {
  id: string;
  name: string;
  sku: string | null;
  stockQuantity: number;
  lowStockThreshold: number;
}

/**
 * Get all products that are below their low stock threshold
 */
export async function getLowStockProducts(): Promise<LowStockProduct[]> {
  const db = requirePrisma();
  // Prisma doesn't support field-to-field comparisons directly,
  // so we fetch all tracked products and filter in JavaScript
  const products = await db.product.findMany({
    where: {
      trackInventory: true,
    },
    select: {
      id: true,
      name: true,
      sku: true,
      stockQuantity: true,
      lowStockThreshold: true,
    },
    orderBy: {
      stockQuantity: 'asc', // Most urgent first
    },
  });

  // Filter to products below their individual thresholds
  return products.filter(
    (p) => p.stockQuantity <= p.lowStockThreshold
  ) as LowStockProduct[];
}

/**
 * Get products that are completely out of stock
 */
export async function getOutOfStockProducts(): Promise<LowStockProduct[]> {
  const db = requirePrisma();
  const products = await db.product.findMany({
    where: {
      trackInventory: true,
      stockQuantity: 0,
    },
    select: {
      id: true,
      name: true,
      sku: true,
      stockQuantity: true,
      lowStockThreshold: true,
    },
  });

  return products as LowStockProduct[];
}

/**
 * Update stock quantity for a product
 */
export async function updateStockQuantity(
  productId: string,
  quantity: number,
  operation: 'set' | 'increment' | 'decrement' = 'set'
): Promise<void> {
  const db = requirePrisma();
  if (operation === 'set') {
    await db.product.update({
      where: { id: productId },
      data: {
        stockQuantity: Math.max(0, quantity),
        lastRestockedAt: quantity > 0 ? new Date() : undefined,
      },
    });
  } else if (operation === 'increment') {
    await db.product.update({
      where: { id: productId },
      data: {
        stockQuantity: { increment: quantity },
        lastRestockedAt: new Date(),
      },
    });
  } else if (operation === 'decrement') {
    // Get current stock first to prevent negative values
    const product = await db.product.findUnique({
      where: { id: productId },
      select: { stockQuantity: true },
    });

    if (product) {
      const newQuantity = Math.max(0, product.stockQuantity - quantity);
      await db.product.update({
        where: { id: productId },
        data: { stockQuantity: newQuantity },
      });
    }
  }
}

/**
 * Decrement stock for order items (called after successful order)
 */
export async function decrementStockForOrder(
  items: Array<{ productId: string; quantity: number }>
): Promise<void> {
  for (const item of items) {
    await updateStockQuantity(item.productId, item.quantity, 'decrement');
  }
}

/**
 * Check if a product has sufficient stock
 */
export async function hasStock(
  productId: string,
  quantity: number = 1
): Promise<boolean> {
  const db = requirePrisma();
  const product = await db.product.findUnique({
    where: { id: productId },
    select: { stockQuantity: true, trackInventory: true },
  });

  if (!product) return false;
  if (!product.trackInventory) return true; // No inventory tracking = always available

  return product.stockQuantity >= quantity;
}

/**
 * Get inventory summary for dashboard
 */
export async function getInventorySummary(): Promise<{
  totalProducts: number;
  outOfStock: number;
  lowStock: number;
  inStock: number;
  totalValue: number;
}> {
  const db = requirePrisma();
  const products = await db.product.findMany({
    where: { trackInventory: true },
    select: {
      stockQuantity: true,
      lowStockThreshold: true,
      price: true,
    },
  });

  const outOfStock = products.filter((p) => p.stockQuantity === 0).length;
  const lowStock = products.filter(
    (p) => p.stockQuantity > 0 && p.stockQuantity <= p.lowStockThreshold
  ).length;
  const inStock = products.filter(
    (p) => p.stockQuantity > p.lowStockThreshold
  ).length;
  const totalValue = products.reduce(
    (sum, p) => sum + p.stockQuantity * p.price,
    0
  );

  return {
    totalProducts: products.length,
    outOfStock,
    lowStock,
    inStock,
    totalValue,
  };
}
