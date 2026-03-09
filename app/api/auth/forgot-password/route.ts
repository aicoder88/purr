import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { escapeHtml } from '@/lib/security/sanitize';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import {
  issuePasswordResetToken,
  type PasswordResetPortal,
} from '@/lib/auth/password-reset';
import { ensurePrivilegedUserAccount } from '@/lib/auth/principals';
import { normalizeEmail } from '@/lib/auth/roles';

interface ForgotPasswordRequest {
  email: string;
  portal: PasswordResetPortal;
}

function getPortalLabel(portal: PasswordResetPortal): string {
  switch (portal) {
    case 'admin':
      return 'admin';
    case 'retailer':
      return 'retailer portal';
    default:
      return 'customer portal';
  }
}

async function hasResettableAccount(email: string, portal: PasswordResetPortal) {
  if (!prisma) {
    return false;
  }

  if (portal === 'admin') {
    await ensurePrivilegedUserAccount(email);
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, role: true },
    });

    return user?.role === 'ADMIN' || user?.role === 'EDITOR';
  }

  if (portal === 'retailer') {
    const retailer = await prisma.retailer.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!retailer;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true },
  });

  return user?.role === 'CUSTOMER';
}

async function handler(req: NextRequest): Promise<Response> {
  try {
    if (!prisma) {
      return Response.json({ message: 'Password reset is temporarily unavailable.' }, { status: 503 });
    }

    if (!isResendConfigured()) {
      return Response.json({ message: 'Password reset email is not configured.' }, { status: 503 });
    }

    const body = await req.json() as ForgotPasswordRequest;
    const email = body.email ? normalizeEmail(body.email) : '';
    const portal = body.portal;

    if (!email || (portal !== 'customer' && portal !== 'retailer' && portal !== 'admin')) {
      return Response.json({ message: 'Invalid password reset request.' }, { status: 400 });
    }

    const accountExists = await hasResettableAccount(email, portal);
    if (accountExists) {
      const { token, expires } = await issuePasswordResetToken({ email, portal });
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';
      const resetUrl = `${siteUrl}/reset-password?token=${encodeURIComponent(token)}&portal=${portal}`;
      const portalLabel = getPortalLabel(portal);

      await resend.emails.send({
        from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
        to: email,
        subject: `Reset your Purrify ${portalLabel} password`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
            <h1 style="font-size: 20px;">Reset your password</h1>
            <p>We received a request to reset the password for your Purrify ${escapeHtml(portalLabel)} account.</p>
            <p>
              <a href="${resetUrl}" style="display: inline-block; padding: 12px 18px; background: #111827; color: #ffffff; text-decoration: none; border-radius: 8px;">
                Reset password
              </a>
            </p>
            <p>If the button does not work, open this link:</p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <p>This link expires on ${expires.toUTCString()}.</p>
            <p>If you did not request this change, you can ignore this email.</p>
          </div>
        `,
      });
    }

    return Response.json({
      message: 'If an account exists for that email, a reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return Response.json({ message: 'Unable to process password reset.' }, { status: 500 });
  }
}

export const POST = withRateLimit(RATE_LIMITS.AUTH, handler);
