import type { NextApiRequest, NextApiResponse } from 'next';
import * as bcrypt from 'bcryptjs';
import { z } from 'zod';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import prisma from '@/lib/prisma';

interface RegisterRequest {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  password: string;
  taxId?: string;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country?: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country?: string;
  };
}

// Password strength validation schema
const passwordSchema = z.string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      businessName,
      contactName,
      email,
      phone,
      password,
      taxId,
      shippingAddress,
      billingAddress,
    }: RegisterRequest = req.body;

    // Validation
    if (!businessName || !contactName || !email || !password || !shippingAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate password strength
    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
      return res.status(400).json({
        message: 'Password does not meet security requirements',
        errors: passwordValidation.error.issues.map((err: { message: string }) => err.message)
      });
    }

    // Check database connection
    if (!prisma) {
      return res.status(500).json({ message: 'Database unavailable. Please try again later.' });
    }

    // Check if email already exists
    const existingRetailer = await prisma.retailer.findUnique({
      where: { email },
    });

    if (existingRetailer) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create retailer with addresses
    const retailer = await prisma.retailer.create({
      data: {
        businessName,
        contactName,
        email,
        phone,
        password: hashedPassword,
        taxId,
        status: 'PENDING', // Requires admin approval
        shippingAddress: {
          create: {
            street: shippingAddress.street,
            city: shippingAddress.city,
            province: shippingAddress.province,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country || 'CA',
          },
        },
        billingAddress: billingAddress
          ? {
              create: {
                street: billingAddress.street,
                city: billingAddress.city,
                province: billingAddress.province,
                postalCode: billingAddress.postalCode,
                country: billingAddress.country || 'CA',
              },
            }
          : undefined,
      },
      include: {
        shippingAddress: true,
        billingAddress: true,
      },
    });

    // Send notification email to admin (implement later)
    // await sendAdminNotification(retailer);

    // Send welcome email to retailer (implement later)
    // await sendRetailerWelcomeEmail(retailer);

    return res.status(201).json({
      message: 'Registration successful. Your account is pending approval.',
      retailer: {
        id: retailer.id,
        businessName: retailer.businessName,
        contactName: retailer.contactName,
        email: retailer.email,
        status: retailer.status,
      },
    });
  } catch (error) {
    console.error('Retailer registration error:', error);
    return res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
}

// Apply rate limiting for registration
export default withRateLimit(RATE_LIMITS.CREATE, handler);
