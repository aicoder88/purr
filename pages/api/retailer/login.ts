import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.RETAILER_JWT_SECRET;

interface LoginRequest {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password }: LoginRequest = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find retailer
    const retailer = await prisma.retailer.findUnique({
      where: { email },
      include: {
        shippingAddress: true,
        billingAddress: true,
      },
    });

    if (!retailer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if account is active
    if (retailer.status !== 'ACTIVE') {
      return res.status(403).json({
        message: `Your account is ${retailer.status.toLowerCase()}. Please contact support.`,
        status: retailer.status,
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, retailer.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update last login
    await prisma.retailer.update({
      where: { id: retailer.id },
      data: { lastLoginAt: new Date() },
    });

    if (!JWT_SECRET) {
      console.error('Retailer login blocked: RETAILER_JWT_SECRET is not configured.');
      return res.status(500).json({ message: 'Login unavailable. Please contact support.' });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        retailerId: retailer.id,
        email: retailer.email,
        businessName: retailer.businessName,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      retailer: {
        id: retailer.id,
        businessName: retailer.businessName,
        contactName: retailer.contactName,
        email: retailer.email,
        phone: retailer.phone,
        status: retailer.status,
        shippingAddress: retailer.shippingAddress,
        billingAddress: retailer.billingAddress,
      },
    });
  } catch (error) {
    console.error('Retailer login error:', error);
    return res.status(500).json({ message: 'Login failed. Please try again.' });
  } finally {
    await prisma.$disconnect();
  }
}
