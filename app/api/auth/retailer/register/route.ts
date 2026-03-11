import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { passwordSchema } from '@/lib/auth/password-policy';
import { normalizeEmail } from '@/lib/auth/roles';

interface RetailerAddressInput {
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
}

interface RetailerRegisterRequest {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  password: string;
  taxId?: string;
  shippingAddress: RetailerAddressInput;
  billingAddress?: RetailerAddressInput;
}

interface NormalizedRetailerAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

function normalizeAddress(address?: RetailerAddressInput | null) {
  if (!address) {
    return null;
  }

  return {
    street: address.street?.trim() ?? '',
    city: address.city?.trim() ?? '',
    province: address.province?.trim().toUpperCase() ?? '',
    postalCode: address.postalCode?.trim().toUpperCase() ?? '',
    country: address.country?.trim().toUpperCase() || 'CA',
  };
}

function hasCompleteAddress(address: NormalizedRetailerAddress | null): address is NormalizedRetailerAddress {
  return !!address?.street && !!address.city && !!address.province && !!address.postalCode;
}

async function handler(req: NextRequest): Promise<Response> {
  try {
    if (!prisma) {
      return Response.json({ message: 'Registration is temporarily unavailable.' }, { status: 503 });
    }

    const body = await req.json() as RetailerRegisterRequest;
    const businessName = body.businessName?.trim();
    const contactName = body.contactName?.trim();
    const email = body.email ? normalizeEmail(body.email) : '';
    const phone = body.phone?.trim() || null;
    const password = body.password ?? '';
    const taxId = body.taxId?.trim() || null;
    const shippingAddress = normalizeAddress(body.shippingAddress);
    const billingAddress = normalizeAddress(body.billingAddress);

    if (
      !businessName
      || !contactName
      || !email
      || !password
      || !hasCompleteAddress(shippingAddress)
    ) {
      return Response.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
      return Response.json({
        message: 'Password does not meet security requirements.',
        errors: passwordValidation.error.issues.map((issue) => issue.message),
      }, { status: 400 });
    }

    const existingRetailer = await prisma.retailer.findUnique({
      where: { email },
    });

    if (existingRetailer) {
      return Response.json({ message: 'An account already exists for this email.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const retailer = await prisma.retailer.create({
      data: {
        businessName,
        contactName,
        email,
        phone,
        password: hashedPassword,
        taxId,
        status: 'PENDING',
        shippingAddress: {
          create: shippingAddress,
        },
        billingAddress: hasCompleteAddress(billingAddress)
          ? {
              create: billingAddress,
            }
          : undefined,
      },
      select: {
        id: true,
        businessName: true,
        contactName: true,
        email: true,
        status: true,
      },
    });

    return Response.json({
      message: 'Registration successful. Your account is pending approval.',
      retailer,
    }, { status: 201 });
  } catch (error) {
    console.error('Retailer registration error:', error);
    return Response.json({ message: 'Registration failed. Please try again.' }, { status: 500 });
  }
}

export const POST = withRateLimit(RATE_LIMITS.CREATE, handler);
