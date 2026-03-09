import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { passwordSchema } from '@/lib/auth/password-policy';
import { consumePasswordResetToken } from '@/lib/auth/password-reset';
import { ensurePrivilegedUserAccount } from '@/lib/auth/principals';

interface ResetPasswordRequest {
  token: string;
  password: string;
}

async function handler(req: NextRequest): Promise<Response> {
  try {
    if (!prisma) {
      return Response.json({ message: 'Password reset is temporarily unavailable.' }, { status: 503 });
    }

    const body = await req.json() as ResetPasswordRequest;
    const token = body.token?.trim();
    const password = body.password ?? '';

    if (!token || !password) {
      return Response.json({ message: 'Invalid password reset request.' }, { status: 400 });
    }

    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
      return Response.json({
        message: 'Password does not meet security requirements.',
        errors: passwordValidation.error.issues.map((issue) => issue.message),
      }, { status: 400 });
    }

    const target = await consumePasswordResetToken(token);
    if (!target) {
      return Response.json({ message: 'Reset link is invalid or has expired.' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (target.portal === 'retailer') {
      await prisma.retailer.update({
        where: { email: target.email },
        data: {
          password: passwordHash,
          lastLoginAt: null,
        },
      });
    } else {
      if (target.portal === 'admin') {
        await ensurePrivilegedUserAccount(target.email);
      }

      await prisma.user.update({
        where: { email: target.email },
        data: {
          passwordHash,
          passwordUpdatedAt: new Date(),
        },
      });
    }

    return Response.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Reset password error:', error);
    return Response.json({ message: 'Unable to reset password.' }, { status: 500 });
  }
}

export const POST = withRateLimit(RATE_LIMITS.AUTH, handler);
