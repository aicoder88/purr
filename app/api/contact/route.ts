import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { createContactTicket, isZendeskConfigured } from '@/lib/zendesk';
import * as Sentry from '@sentry/nextjs';

// Define validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().trim().toLowerCase(),
  message: z.string().min(10).max(1000).trim(),
});

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Send email via Resend API
 */
async function sendEmailViaResend(
  name: string,
  email: string,
  message: string,
  subject: string
): Promise<{ success: boolean; message: string }> {
  if (!isResendConfigured()) {
    console.error('Resend not properly configured. Missing API key.');
    return {
      success: false,
      message: 'Email service not available. Please contact us directly at support@purrify.ca'
    };
  }

  try {
    const resend = new Resend(RESEND_CONFIG.apiKey);

    const { data, error } = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: RESEND_CONFIG.toEmail,
      replyTo: email,
      subject: subject || `Contact Form: ${name}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #FF3131; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #FF3131;">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Date: ${new Date().toLocaleString()}

Message:
${message}
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.'
      };
    }

    return {
      success: true,
      message: 'Message sent successfully!'
    };
  } catch (error) {
    console.error('Error sending email via Resend:', error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      message: 'An error occurred while sending your message.'
    };
  }
}

export async function POST(request: NextRequest) {
  // Set security headers
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Content-Security-Policy', "default-src 'self'");

  // Apply rate limiting
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const ipData = ipRequestCounts.get(clientIp);

  if (ipData) {
    if (now < ipData.resetTime) {
      if (ipData.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { success: false, message: 'Too many requests. Please try again later.' },
          { status: 429, headers }
        );
      }
      ipData.count += 1;
    } else {
      ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }
  } else {
    ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  try {
    const body = await request.json();
    
    // Validate form data with Zod
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data. Please check your inputs and try again.' },
        { status: 400, headers }
      );
    }

    const { name, email, message } = validationResult.data;

    // Try Zendesk first (primary), then fall back to Resend
    if (isZendeskConfigured()) {
      try {
        const acceptLanguage = request.headers.get('accept-language') || '';
        const ticketResponse = await createContactTicket({
          name,
          email,
          message,
          locale: acceptLanguage.includes('fr') ? 'fr' : acceptLanguage.includes('zh') ? 'zh' : 'en',
        });

        return NextResponse.json(
          { success: true, message: "Thank you for contacting us! We'll get back to you within 24 hours." },
          { status: 200, headers }
        );
      } catch (zendeskError) {
        console.error('Zendesk ticket creation failed:', zendeskError);
        Sentry.captureException(zendeskError);
        // Fall through to Resend as backup
      }
    }

    // Fallback: Send email via Resend
    const subject = `Contact Form Submission from ${name}`;
    const emailResult = await sendEmailViaResend(name, email, message, subject);

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, message: emailResult.message },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { success: true, message: "Thank you for contacting us! We'll get back to you within 24 hours." },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error processing contact form:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, message: 'An error occurred while sending your message.' },
      { status: 500, headers }
    );
  }
}
