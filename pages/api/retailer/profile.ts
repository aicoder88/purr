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
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    // Get retailer profile
    const retailer = await prisma.retailer.findUnique({
      where: { id: decoded.retailerId },
      include: {
        shippingAddress: true,
        billingAddress: true,
      },
    });

    if (!retailer) {
      return res.status(404).json({ message: 'Retailer not found' });
    }

    return res.status(200).json({
      retailer: {
        id: retailer.id,
        businessName: retailer.businessName,
        contactName: retailer.contactName,
        email: retailer.email,
        phone: retailer.phone,
        status: retailer.status,
        taxId: retailer.taxId,
        shippingAddress: retailer.shippingAddress,
        billingAddress: retailer.billingAddress,
        createdAt: retailer.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error('Profile fetch error:', error);
    return res.status(500).json({ message: 'Failed to fetch profile' });
  } finally {
    await prisma.$disconnect();
  }
}
