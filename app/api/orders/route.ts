import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/security/rate-limit-app';
import { signOrderId } from '@/lib/security/checkout-token';
import * as Sentry from '@sentry/nextjs';
interface CartItem {
  id: string;
  quantity: number;
  price: number;
}
interface CustomerData {
  email: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  phone?: string;
}
// Rate limit for order creation: 10 per minute per IP
const ORDER_RATE_LIMIT = {
  windowMs: 60 * 1000,
  maxRequests: 10,
  message: 'Too many order attempts. Please try again later.'
};
/**
 * Recalculate order total server-side to prevent price tampering
 * Fetches current product prices from database and calculates total
 */
async function recalculateOrderTotal(
  items: CartItem[],
  _currency: string
): Promise<{ total: number; validatedItems: Array<{ productId: string; quantity: number; price: number }> }> {
  if (!prisma) {
    throw new Error('Database not available');
  }
  // Fetch current product prices from database
  const productIds = items.map(item => item.id);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds }
    },
    select: {
      id: true,
      price: true,
      stockQuantity: true,
      trackInventory: true
    }
  });
  // Create a map for quick lookup
  const productMap = new Map(products.map(p => [p.id, p]));
  let total = 0;
  const validatedItems: Array<{ productId: string; quantity: number; price: number }> = [];
  for (const item of items) {
    const product = productMap.get(item.id);
    // Validate product exists
    if (!product) {
      throw new Error(`Product not found: ${item.id}`);
    }
    // Check inventory if tracking is enabled
    if (product.trackInventory && product.stockQuantity < item.quantity) {
      throw new Error(`Insufficient stock for product: ${item.id}`);
    }
    // Use server-side price, ignore client-side price
    const serverPrice = Number(product.price);
    const quantity = Math.max(1, Math.floor(item.quantity)); // Ensure positive integer
    total += serverPrice * quantity;
    validatedItems.push({
      productId: item.id,
      quantity,
      price: serverPrice // Use the verified server-side price
    });
  }
  // Round to 2 decimal places for currency
  total = Math.round(total * 100) / 100;
  return { total, validatedItems };
}
export async function POST(request: NextRequest) {
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  try {
    // Apply rate limiting to prevent abuse
    const { allowed, remaining } = checkRateLimit(request, ORDER_RATE_LIMIT);
    headers.set('X-RateLimit-Remaining', remaining.toString());
    if (!allowed) {
      return NextResponse.json(
        { message: ORDER_RATE_LIMIT.message },
        { status: 429, headers }
      );
    }
    const body = await request.json();
    const { items, customer, currency = 'CAD', total: clientTotal } = body as {
      items: CartItem[];
      customer: CustomerData;
      currency: string;
      total?: number;
    };
    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Cart items are required' },
        { status: 400, headers }
      );
    }
    if (!customer || !customer.email) {
      return NextResponse.json(
        { message: 'Customer information is required' },
        { status: 400, headers }
      );
    }
    // Create order in database
    if (!prisma) {
      return NextResponse.json(
        { message: 'Database not available' },
        { status: 503, headers }
      );
    }
    // Recalculate total server-side to prevent price tampering
    const { total: serverTotal, validatedItems } = await recalculateOrderTotal(items, currency);
    // Log if there's a significant discrepancy (for security monitoring)
    if (clientTotal && Math.abs(clientTotal - serverTotal) > 0.01) {
      const forwarded = request.headers.get('x-forwarded-for');
      console.warn(`[SECURITY] Price tampering detected: Client total ${clientTotal} != Server total ${serverTotal}`, {
        userEmail: customer.email || 'anonymous',
        ip: forwarded || 'unknown'
      });
      Sentry.captureMessage('Price tampering detected', {
        level: 'warning',
        extra: {
          clientTotal,
          serverTotal,
          userEmail: customer.email,
        },
      });
    }
    const order = await prisma.order.create({
      data: {
        totalAmount: serverTotal, // Use server-calculated total only
        currency: currency,
        status: 'PENDING',
        customer: {
          create: {
            email: customer.email,
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            address: customer.address || '',
            city: customer.city || '',
            province: customer.province || '',
            postalCode: customer.postalCode || '',
            phone: customer.phone || null,
          },
        },
        items: {
          create: validatedItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price, // Server-verified price
          })),
        },
      },
    });
    // Generate checkout token for ownership verification
    const checkoutToken = signOrderId(order.id);
    return NextResponse.json(
      { orderId: order.id, checkoutToken },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    Sentry.captureException(error);
    
    if (error instanceof Error) {
      if (error.message.includes('Product not found') || 
          error.message.includes('Insufficient stock')) {
        return NextResponse.json(
          { message: error.message },
          { status: 400, headers }
        );
      }
    }
    
    return NextResponse.json(
      { message: 'Error creating order' },
      { status: 500, headers }
    );
  }
}