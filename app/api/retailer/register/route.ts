import * as bcrypt from 'bcryptjs';
import { z } from 'zod';
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

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const {
      businessName,
      contactName,
      email,
      phone,
      password,
      taxId,
      shippingAddress,
      billingAddress,
    }: RegisterRequest = body;

    // Validation
    if (!businessName || !contactName || !email || !password || !shippingAddress) {
      return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Validate password strength
    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
      return Response.json({
        message: 'Password does not meet security requirements',
        errors: passwordValidation.error.issues.map((err: { message: string }) => err.message)
      }, { status: 400 });
    }

    // Check database connection
    if (!prisma) {
      return Response.json({ message: 'Database unavailable. Please try again later.' }, { status: 500 });
    }

    // Check if email already exists
    const existingRetailer = await prisma.retailer.findUnique({
      where: { email },
    });

    if (existingRetailer) {
      return Response.json({ message: 'Email already registered' }, { status: 400 });
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

    return Response.json({
      message: 'Registration successful. Your account is pending approval.',
      retailer: {
        id: retailer.id,
        businessName: retailer.businessName,
        contactName: retailer.contactName,
        email: retailer.email,
        status: retailer.status,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Retailer registration error:', error);
    return Response.json({ message: 'Registration failed. Please try again.' }, { status: 500 });
  }
}
