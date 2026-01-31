import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';
import { getSession } from 'next-auth/react';
import { checkRateLimit } from '../../src/lib/security/rate-limit';

interface CartItem {
  id: string;
  quantity: number;
  price: number;
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Apply rate limiting to prevent abuse
  const { allowed, remaining } = checkRateLimit(req, ORDER_RATE_LIMIT);
  res.setHeader('X-RateLimit-Remaining', remaining.toString());

  if (!allowed) {
    return res.status(429).json({ message: ORDER_RATE_LIMIT.message });
  }

  try {
    const session = await getSession({ req });
    const { items, customer, currency = 'CAD' } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart items are required' });
    }

    if (!customer || !customer.email) {
      return res.status(400).json({ message: 'Customer information is required' });
    }

    // Create order in database
    if (!prisma) {
      return res.status(503).json({ message: 'Database not available' });
    }

    // Recalculate total server-side to prevent price tampering
    const { total: serverTotal, validatedItems } = await recalculateOrderTotal(items, currency);

    // Log if there's a significant discrepancy (for security monitoring)
    const clientTotal = Number(req.body.total);
    if (clientTotal && Math.abs(clientTotal - serverTotal) > 0.01) {
      console.warn(`[SECURITY] Price tampering detected: Client total ${clientTotal} != Server total ${serverTotal}`, {
        userId: session?.user?.email || 'anonymous',
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
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
            firstName: customer.firstName,
            lastName: customer.lastName,
            address: customer.address,
            city: customer.city,
            province: customer.province,
            postalCode: customer.postalCode,
            phone: customer.phone,
          },
        },
        items: {
          create: validatedItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price, // Server-verified price
          })),
        },
        userId: session?.user?.email,
      },
    });

    return res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Product not found') || 
          error.message.includes('Insufficient stock')) {
        return res.status(400).json({ message: error.message });
      }
    }
    
    return res.status(500).json({ message: 'Error creating order' });
  }
}
