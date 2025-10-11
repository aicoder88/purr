import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.RETAILER_JWT_SECRET || 'your-secret-key-change-in-production';

interface JWTPayload {
  retailerId: string;
  email: string;
  businessName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    if (req.method === 'GET') {
      // Get all orders for this retailer
      const orders = await prisma.retailerOrder.findMany({
        where: { retailerId: decoded.retailerId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return res.status(200).json({ orders });
    }

    if (req.method === 'POST') {
      // Create new order
      const { items, notes } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Order must contain at least one item' });
      }

      // Verify retailer is active
      const retailer = await prisma.retailer.findUnique({
        where: { id: decoded.retailerId },
      });

      if (!retailer || retailer.status !== 'ACTIVE') {
        return res.status(403).json({ message: 'Account is not active' });
      }

      // Calculate totals
      let subtotal = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          return res.status(400).json({ message: `Product ${item.productId} not found` });
        }

        const unitPrice = product.wholesalePrice || product.price;
        const totalPrice = unitPrice * item.quantity;
        subtotal += totalPrice;

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          unitPrice,
          totalPrice,
        });
      }

      // Calculate tax (13% HST for Ontario - adjust based on province)
      const tax = subtotal * 0.13;

      // Calculate shipping (flat rate or based on weight - implement your logic)
      const shipping = 25.00; // Example flat rate

      const totalAmount = subtotal + tax + shipping;

      // Generate order number
      const orderCount = await prisma.retailerOrder.count();
      const orderNumber = `RO-${new Date().getFullYear()}-${String(orderCount + 1).padStart(4, '0')}`;

      // Create order
      const order = await prisma.retailerOrder.create({
        data: {
          orderNumber,
          retailerId: decoded.retailerId,
          subtotal,
          tax,
          shipping,
          totalAmount,
          notes,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return res.status(201).json({
        message: 'Order created successfully',
        order,
      });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error('Orders API error:', error);
    return res.status(500).json({ message: 'Failed to process request' });
  } finally {
    await prisma.$disconnect();
  }
}
