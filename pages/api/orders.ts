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
    const { items, customer, total } = req.body;

    // Create order in database
    if (!prisma) {
      return res.status(503).json({ message: 'Database not available' });
    }
    const order = await prisma.order.create({
      data: {
        totalAmount: total,
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
          create: items.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        userId: session?.user?.email,
      },
    });

    return res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order' });
  }
} 