import prisma from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { escapeHtml } from '@/lib/security/sanitize';

type PrismaErrorLike = {
  code?: string;
  message?: string;
};

function isMissingVerificationColumnError(error: unknown): boolean {
  const prismaError = error as PrismaErrorLike;

  if (prismaError.code !== 'P2022') {
    return false;
  }

  const message = prismaError.message || '';
  return /emailVerified|verifyToken|verifyExpiresAt/i.test(message);
}

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';

    if (!token) {
      return Response.json(
        { error: 'Missing verification token' },
        { status: 400 }
      );
    }

    if (!prisma) {
      return Response.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }

    // Look up application by verifyToken
    let application;
    try {
      application = await prisma.affiliateApplication.findUnique({
        where: { verifyToken: token },
      });
    } catch (error) {
      if (isMissingVerificationColumnError(error)) {
        return Response.json(
          { error: 'Verification is temporarily unavailable. Please submit a new application.' },
          { status: 503 }
        );
      }
      throw error;
    }

    if (!application) {
      return Response.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (application.verifyExpiresAt && new Date() > application.verifyExpiresAt) {
      return Response.json(
        { error: 'Verification link has expired. Please submit a new application.' },
        { status: 400 }
      );
    }

    // Check if already verified
    if (application.emailVerified) {
      return Response.json(
        { success: true, message: 'Email already verified' },
        { status: 200 }
      );
    }

    // Update application: set emailVerified=true, clear verifyToken/verifyExpiresAt
    try {
      await prisma.affiliateApplication.update({
        where: { id: application.id },
        data: {
          emailVerified: true,
          verifyToken: null,
          verifyExpiresAt: null,
        },
      });
    } catch (error) {
      if (isMissingVerificationColumnError(error)) {
        return Response.json(
          { error: 'Verification is temporarily unavailable. Please submit a new application.' },
          { status: 503 }
        );
      }
      throw error;
    }

    // Send admin notification email
    if (isResendConfigured()) {
      const adminEmailContent = `
        <h2>New Verified Affiliate Application</h2>
        <p>An affiliate has verified their email and is awaiting review.</p>

        <h3>Applicant Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(application.name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(application.email)}</li>
          <li><strong>Website/Social:</strong> ${escapeHtml(application.website || 'Not provided')}</li>
          <li><strong>Audience:</strong> ${escapeHtml(application.audience)}</li>
          <li><strong>Primary Traffic Source:</strong> ${escapeHtml(application.trafficSource)}</li>
          <li><strong>Monthly Visitors/Followers:</strong> ${escapeHtml(application.monthlyVisitors)}</li>
          <li><strong>Affiliate Experience:</strong> ${escapeHtml(application.experience)}</li>
        </ul>

        ${application.message ? `
          <h3>Message:</h3>
          <p>${escapeHtml(application.message)}</p>
        ` : ''}

        <hr />
        <p>
          <a href="${siteUrl}/admin/ops/affiliates/applications">
            Review Applications in Admin Dashboard
          </a>
        </p>
        <p style="color: #666; font-size: 12px;">
          This email was sent because an affiliate verified their email at ${new Date().toLocaleString()}
        </p>
      `;

      try {
        const { error: emailError } = await resend.emails.send({
          from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
          to: process.env.ADMIN_EMAIL || RESEND_CONFIG.toEmail,
          replyTo: application.email,
          subject: `New Verified Affiliate Application: ${escapeHtml(application.name)}`,
          html: adminEmailContent,
        });

        if (emailError) {
          console.error('Affiliate verification admin email error:', emailError);
        }
      } catch (emailError) {
        console.error('Affiliate verification admin email send failed:', emailError);
      }
    }

    // Return success response with HTML for browser display
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Email Verified - Purrify Affiliate Program</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              padding: 48px;
              border-radius: 16px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              text-align: center;
              max-width: 480px;
              margin: 20px;
            }
            .checkmark {
              width: 80px;
              height: 80px;
              background: #10b981;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 24px;
            }
            .checkmark svg {
              width: 40px;
              height: 40px;
              fill: white;
            }
            h1 {
              color: #1a1a1a;
              margin-bottom: 16px;
              font-size: 28px;
            }
            p {
              color: #666;
              line-height: 1.6;
              margin-bottom: 24px;
            }
            .button {
              display: inline-block;
              background: #0d9488;
              color: white;
              padding: 14px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              transition: background 0.2s;
            }
            .button:hover {
              background: #0f766e;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="checkmark">
              <svg viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
            </div>
            <h1>Email Verified!</h1>
            <p>Thank you for verifying your email address. Your affiliate application has been submitted for review.</p>
            <p>We'll review your application within 2-3 business days and send you an email with your login credentials once approved.</p>
            <a href="${siteUrl}" class="button">Go to Purrify</a>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return Response.json(
      { error: 'Failed to verify email. Please try again later.' },
      { status: 500 }
    );
  }
}
