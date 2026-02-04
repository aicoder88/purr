import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    if (existingApplication) {
      if (existingApplication.status === 'PENDING') {
        return Response.json({
          error: 'An application with this email is already pending review',
        }, { status: 400 });
      }
      if (existingApplication.status === 'APPROVED') {
        return Response.json({
          error: 'An account with this email already exists. Please log in.',
        }, { status: 400 });
      }
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
          reviewedAt: null,
          reviewedBy: null,
          rejectionReason: null,
        },
      });
    } else {
      // Create new application in database
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
        },
      });
    }

    // Send emails if Resend is configured
    if (isResendConfigured()) {
      // Send admin notification email
      const adminEmailContent = `
        <h2>New Affiliate Application</h2>
        <p>A new affiliate has applied to join the Purrify affiliate program.</p>

        <h3>Applicant Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${normalizedEmail}</li>
          <li><strong>Website/Social:</strong> ${data.website || 'Not provided'}</li>
          <li><strong>Audience:</strong> ${data.audience}</li>
          <li><strong>Primary Traffic Source:</strong> ${data.trafficSource}</li>
          <li><strong>Monthly Visitors/Followers:</strong> ${data.monthlyVisitors}</li>
          <li><strong>Affiliate Experience:</strong> ${data.experience}</li>
        </ul>

        ${data.message ? `
          <h3>Message:</h3>
          <p>${data.message}</p>
        ` : ''}

        <hr />
        <p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/ops/affiliates/applications">
            Review Applications in Admin Dashboard
          </a>
        </p>
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Purrify affiliate signup form at ${new Date().toLocaleString()}
        </p>
      `;

      // Send notification to admin
      await resend.emails.send({
        from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
        to: process.env.ADMIN_EMAIL || RESEND_CONFIG.toEmail,
        replyTo: normalizedEmail,
        subject: `New Affiliate Application: ${data.name}`,
        html: adminEmailContent,
      });

      // Send confirmation email to applicant
      const applicantEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Thank You for Applying!</h2>

          <p>Hi ${data.name},</p>

          <p>We've received your application to join the Purrify Affiliate Program. Thank you for your interest in partnering with us!</p>

          <h3 style="color: #1a1a1a;">What's Next?</h3>
          <p>Our team will review your application within 2-3 business days. We'll send you an email with your login credentials once approved.</p>

          <h3 style="color: #1a1a1a;">Your Application Details:</h3>
          <ul style="line-height: 1.8;">
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${normalizedEmail}</li>
            <li><strong>Website/Social:</strong> ${data.website || 'Not provided'}</li>
            <li><strong>Primary Traffic Source:</strong> ${data.trafficSource}</li>
          </ul>

          <h3 style="color: #1a1a1a;">Program Highlights:</h3>
          <ul style="line-height: 1.8;">
            <li>Up to 30% commission on every sale</li>
            <li>90-day cookie duration</li>
            <li>Real-time tracking dashboard</li>
            <li>Marketing materials provided</li>
          </ul>

          <p>If you have any questions in the meantime, feel free to reply to this email.</p>

          <p>Best regards,<br/>The Purrify Team</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #666; font-size: 12px;">
            You received this email because you applied to the Purrify Affiliate Program.
          </p>
        </div>
      `;

      await resend.emails.send({
        from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
        to: normalizedEmail,
        subject: 'Your Purrify Affiliate Application Has Been Received',
        html: applicantEmailContent,
      });

    }

    return Response.json(
      {
        success: true,
        message: 'Application submitted successfully',
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
