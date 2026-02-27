import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.RETAILER_JWT_SECRET;

interface LoginRequest {
  email: string;
  password: string;
}

async function handler(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const { email, password }: LoginRequest = body;

    // Validation
    if (!email || !password) {
      return Response.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Check database connection
    if (!prisma) {
      return Response.json({ message: 'Database unavailable. Please try again later.' }, { status: 500 });
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
      return Response.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check if account is active
    if (retailer.status !== 'ACTIVE') {
      return Response.json({
        message: `Your account is ${retailer.status.toLowerCase()}. Please contact support.`,
        status: retailer.status,
      }, { status: 403 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, retailer.password);

    if (!isPasswordValid) {
      return Response.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Update last login
    await prisma.retailer.update({
      where: { id: retailer.id },
      data: { lastLoginAt: new Date() },
    });

    if (!JWT_SECRET) {
      console.error('Retailer login blocked: RETAILER_JWT_SECRET is not configured.');
      return Response.json({ message: 'Login unavailable. Please contact support.' }, { status: 500 });
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

    return Response.json({
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
    return Response.json({ message: 'Login failed. Please try again.' }, { status: 500 });
  }
}

export const POST = withRateLimit(RATE_LIMITS.AUTH, handler);
