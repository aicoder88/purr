import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { passwordSchema } from '@/lib/auth/password-policy';
import { normalizeEmail } from '@/lib/auth/roles';

interface CustomerRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

async function handler(req: NextRequest): Promise<Response> {
  try {
    if (!prisma) {
      return Response.json({ message: 'Registration is temporarily unavailable.' }, { status: 503 });
    }

    const body = await req.json() as CustomerRegisterRequest;
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email ? normalizeEmail(body.email) : '';
    const phone = body.phone?.trim();
    const password = body.password ?? '';

    if (!firstName || !lastName || !email || !password) {
      return Response.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
      return Response.json({
        message: 'Password does not meet security requirements.',
        errors: passwordValidation.error.issues.map((issue) => issue.message),
      }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser?.passwordHash) {
      return Response.json({ message: 'An account already exists for this email.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const name = `${firstName} ${lastName}`.trim();

    const user = existingUser
      ? await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name,
          passwordHash,
          passwordUpdatedAt: new Date(),
          role: existingUser.role,
        },
      })
      : await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
          passwordUpdatedAt: new Date(),
          role: 'CUSTOMER',
        },
      });

    return Response.json({
      message: 'Account created successfully.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Customer registration error:', error);
    return Response.json({ message: 'Registration failed. Please try again.' }, { status: 500 });
  }
}

export const POST = withRateLimit(RATE_LIMITS.CREATE, handler);
