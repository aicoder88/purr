/**
 * Cart Tracking Library
 *
 * Functions to save, update, and retrieve cart state for abandoned cart recovery.
 * Uses sessionId for anonymous users and stores email when captured.
 */

import prisma from './prisma';
import type { CartStatus } from '@prisma/client';

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number; // Price in cents
  image?: string;
}

export interface CartData {
  id: string;
  email: string | null;
  sessionId: string;
  items: CartItem[];
  status: CartStatus;
  locale: string;
  lastActivityAt: Date;
  emailsSent: number;
  lastEmailSentAt: Date | null;
  recoveredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Save or update cart state
 */
export async function saveCart({
  sessionId,
  items,
  email,
  locale = 'en',
}: {
  sessionId: string;
  items: CartItem[];
  email?: string;
  locale?: string;
}): Promise<CartData | null> {
  if (!prisma) {
    console.error('Database not configured for cart tracking');
    return null;
  }

  try {
    const cart = await prisma.cart.upsert({
      where: { sessionId },
      update: {
        items: items as unknown as object[],
        email: email || undefined,
        locale,
        lastActivityAt: new Date(),
        status: items.length > 0 ? 'ACTIVE' : 'EXPIRED',
      },
      create: {
        sessionId,
        items: items as unknown as object[],
        email: email || null,
        locale,
        status: items.length > 0 ? 'ACTIVE' : 'EXPIRED',
        lastActivityAt: new Date(),
      },
    });

    return {
      ...cart,
      items: cart.items as unknown as CartItem[],
    };
  } catch (error) {
    console.error('Error saving cart:', error);
    return null;
  }
}

/**
 * Get cart by session ID
 */
export async function getCartBySessionId(sessionId: string): Promise<CartData | null> {
  if (!prisma) {
    console.error('Database not configured for cart tracking');
    return null;
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
    });

    if (!cart) return null;

    return {
      ...cart,
      items: cart.items as unknown as CartItem[],
    };
  } catch (error) {
    console.error('Error getting cart:', error);
    return null;
  }
}

/**
 * Update cart email (when user enters email during checkout)
 */
export async function updateCartEmail(sessionId: string, email: string): Promise<boolean> {
  if (!prisma) {
    console.error('Database not configured for cart tracking');
    return false;
  }

  try {
    await prisma.cart.update({
      where: { sessionId },
      data: {
        email,
        lastActivityAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating cart email:', error);
    return false;
  }
}

/**
 * Mark cart as recovered (converted to order)
 */
export async function markCartAsRecovered(sessionId: string): Promise<boolean> {
  if (!prisma) {
    console.error('Database not configured for cart tracking');
    return false;
  }

  try {
    await prisma.cart.update({
      where: { sessionId },
      data: {
        status: 'CONVERTED',
        recoveredAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error('Error marking cart as recovered:', error);
    return false;
  }
}

/**
 * Mark cart as expired
 */
export async function markCartAsExpired(cartId: string): Promise<boolean> {
  if (!prisma) {
    console.error('Database not configured for cart tracking');
    return false;
  }

  try {
    await prisma.cart.update({
      where: { id: cartId },
      data: {
        status: 'EXPIRED',
      },
    });
    return true;
  } catch (error) {
    console.error('Error marking cart as expired:', error);
    return false;
  }
}

/**
 * Get abandoned carts that need recovery emails
 * First email: 1 hour after abandonment
 * Second email: 24 hours after abandonment (with discount)
 */
export async function getCartsNeedingRecoveryEmails(): Promise<CartData[]> {
  if (!prisma) {
    console.error('Database not configured for cart tracking');
    return [];
  }

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  try {
    // Get carts that:
    // 1. Have an email
    // 2. Are ACTIVE or ABANDONED status
    // 3. Last activity was more than 1 hour ago
    // 4. Haven't been sent 2 emails yet
    // 5. Created within the last 7 days (don't send to very old carts)
    const carts = await prisma.cart.findMany({
      where: {
        email: { not: null },
        status: { in: ['ACTIVE', 'ABANDONED'] },
        emailsSent: { lt: 2 },
        createdAt: { gte: sevenDaysAgo },
        OR: [
          // First email: Last activity > 1 hour ago, 0 emails sent
          {
            emailsSent: 0,
            lastActivityAt: { lte: oneHourAgo },
          },
          // Second email: Last activity > 24 hours ago, 1 email sent, last email sent > 23 hours ago
          {
            emailsSent: 1,
            lastActivityAt: { lte: twentyFourHoursAgo },
            lastEmailSentAt: {
              lte: new Date(now.getTime() - 23 * 60 * 60 * 1000), // Wait at least 23 hours between emails
            },
          },
        ],
      },
    });

    return carts.map((cart) => ({
      ...cart,
      items: cart.items as unknown as CartItem[],
    }));
  } catch (error) {
    console.error('Error getting carts needing recovery emails:', error);
    return [];
  }
}

/**
 * Update cart after sending recovery email
 */
export async function recordRecoveryEmailSent(cartId: string): Promise<boolean> {
  if (!prisma) {
    console.error('Database not configured for cart tracking');
    return false;
  }

  try {
    await prisma.cart.update({
      where: { id: cartId },
      data: {
        emailsSent: { increment: 1 },
        lastEmailSentAt: new Date(),
        status: 'ABANDONED', // Mark as abandoned once we start sending emails
      },
    });
    return true;
  } catch (error) {
    console.error('Error recording recovery email sent:', error);
    return false;
  }
}

/**
 * Generate a unique discount code for abandoned cart recovery
 */
export function generateDiscountCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'COMEBACK10-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Calculate cart total in cents
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Clean up old expired carts (older than 30 days)
 */
export async function cleanupOldCarts(): Promise<number> {
  if (!prisma) {
    console.error('Database not configured for cart tracking');
    return 0;
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  try {
    const result = await prisma.cart.deleteMany({
      where: {
        OR: [
          { status: 'EXPIRED', updatedAt: { lte: thirtyDaysAgo } },
          { status: 'CONVERTED', updatedAt: { lte: thirtyDaysAgo } },
        ],
      },
    });
    return result.count;
  } catch (error) {
    console.error('Error cleaning up old carts:', error);
    return 0;
  }
}
