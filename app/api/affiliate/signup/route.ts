
import prisma from '@/lib/prisma';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';
import { escapeHtml } from '@/lib/security/sanitize';
import { randomBytes } from 'crypto';

import { resend } from '@/lib/resend';

type AffiliateSignupData = {
  name: string;
  email: string;
  website: string;
  audience: string;
  trafficSource: string;
  monthlyVisitors: string;
  experience: string;
  message: string;
};

export async function POST(req: Request): Promise<Response> {
  // Apply rate limiting (standard: 20 req/min)
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          'Retry-After': rateLimitHeaders['Retry-After'] || '60',
        }
      }
    );
  }

  try {
    const data: AffiliateSignupData = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.audience || !data.trafficSource || !data.monthlyVisitors || !data.experience) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Normalize email
    const normalizedEmail = data.email.toLowerCase().trim();

    // Check if prisma is available
    if (!prisma) {
      console.error('Database connection not established');
      return Response.json({ error: 'Database connection error' }, { status: 500 });
    }

    // Check if email already has a pending or approved application
    const existingApplication = await prisma.affiliateApplication.findUnique({
      where: { email: normalizedEmail },
    });

    // Generate 32-byte hex token for email verification
    const verifyToken = randomBytes(32).toString('hex');
    const verifyExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    if (existingApplication) {
      if (existingApplication.status === 'PENDING') {
        // Update with new token for re-verification
        await prisma.affiliateApplication.update({
          where: { email: normalizedEmail },
          data: {
            name: data.name.trim(),
            website: data.website?.trim() || null,
            audience: data.audience.trim(),
            trafficSource: data.trafficSource,
            monthlyVisitors: data.monthlyVisitors,
            experience: data.experience,
            message: data.message?.trim() || null,
            emailVerified: false,
            verifyToken,
            verifyExpiresAt,
            reviewedAt: null,
            reviewedBy: null,
            rejectionReason: null,
          },
        });
      } else if (existingApplication.status === 'APPROVED') {
        return Response.json({
          error: 'An account with this email already exists. Please log in.',
        }, { status: 400 });
      } else {
        // If rejected, allow reapplication by updating the existing record
        await prisma.affiliateApplication.update({
          where: { email: normalizedEmail },
          data: {
            name: data.name.trim(),
            website: data.website?.trim() || null,
            audience: data.audience.trim(),
            trafficSource: data.trafficSource,
            monthlyVisitors: data.monthlyVisitors,
            experience: data.experience,
            message: data.message?.trim() || null,
            status: 'PENDING',
            emailVerified: false,
            verifyToken,
            verifyExpiresAt,
            reviewedAt: null,
            reviewedBy: null,
            rejectionReason: null,
          },
        });
      }
    } else {
      // Create new application in database with verification token
      await prisma.affiliateApplication.create({
        data: {
          name: data.name.trim(),
          email: normalizedEmail,
          website: data.website?.trim() || null,
          audience: data.audience.trim(),
          trafficSource: data.trafficSource,
          monthlyVisitors: data.monthlyVisitors,
          experience: data.experience,
          message: data.message?.trim() || null,
          status: 'PENDING',
          emailVerified: false,
          verifyToken,
          verifyExpiresAt,
        },
      });
    }

    // Send verification email if Resend is configured
    // Admin notification is sent after email verification via /api/affiliate/verify
    if (isResendConfigured()) {
      const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/affiliate/verify?token=${verifyToken}`;

      const verificationEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">Verify Your Email Address</h2>

          <p>Hi ${escapeHtml(data.name)},</p>

          <p>Thank you for applying to the Purrify Affiliate Program! To complete your application, please verify your email address by clicking the button below:</p>

          <div style="margin: 32px 0; text-align: center;">
            <a href="${verifyUrl}" style="display: inline-block; background-color: #0d9488; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Verify My Email
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #0d9488; font-size: 14px;">${verifyUrl}</p>

          <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>

          <h3 style="color: #1a1a1a; margin-top: 32px;">What's Next?</h3>
          <p>Once you verify your email, our team will review your application within 2-3 business days. We'll send you an email with your login credentials once approved.</p>

          <h3 style="color: #1a1a1a;">Program Highlights:</h3>
          <ul style="line-height: 1.8;">
            <li>Up to 30% commission on every sale</li>
            <li>90-day cookie duration</li>
            <li>Real-time tracking dashboard</li>
            <li>Marketing materials provided</li>
          </ul>

          <p>If you have any questions, feel free to reply to this email.</p>

          <p>Best regards,<br/>The Purrify Team</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #666; font-size: 12px;">
            You received this email because you applied to the Purrify Affiliate Program. 
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `;

      await resend.emails.send({
        from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
        to: normalizedEmail,
        subject: 'Verify Your Email - Purrify Affiliate Application',
        html: verificationEmailContent,
      });
    }

    return Response.json(
      {
        success: true,
        message: 'Application submitted successfully. Please check your email to verify your address.',
      },
      { headers: rateLimitHeaders }
    );
  } catch (error) {
    console.error('Affiliate signup error:', error);

    // Handle unique constraint error (email already exists)
    if ((error as { code?: string }).code === 'P2002') {
      return Response.json(
        { error: 'An application with this email already exists' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    return Response.json(
      { error: 'Failed to submit application. Please try again later.' },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
