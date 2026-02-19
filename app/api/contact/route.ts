import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { createContactTicket, isZendeskConfigured } from '@/lib/zendesk';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

/**
 * Sanitize string to prevent email header injection attacks
 * Removes newlines and carriage returns that could be used to inject headers
 */
function sanitizeForEmail(input: string): string {
  if (!input) return '';

  // Remove newlines, carriage returns, and null bytes
  // These are the primary vectors for email header injection
  return input
    .replace(/[\r\n\0]/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .trim();
}

/**
 * Validate email address format more strictly
 * Prevents encoded characters and suspicious patterns
 */
function isValidEmailFormat(email: string): boolean {
  // Check for encoded characters that might be used for header injection
  if (/%[0-9a-fA-F]{2}/.test(email)) {
    return false;
  }

  // Check for suspicious characters in the local part
  const suspiciousPatterns = /[()<>,;:\\"\[\]]/;
  if (suspiciousPatterns.test(email)) {
    return false;
  }

  // Standard email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Sanitize HTML content for email display
 * Removes potentially dangerous tags and attributes
 */
function sanitizeEmailHtml(input: string): string {
  if (!input) return '';

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Define validation schema with Zod
const contactFormSchema = z.object({
  name: z.string()
    .min(2)
    .max(50)
    .trim()
    .transform(sanitizeForEmail)
    .refine(
      (val) => !/[<>\"'&]/.test(val),
      { message: 'Name contains invalid characters' }
    ),
  email: z.string()
    .email()
    .trim()
    .toLowerCase()
    .max(100)
    .refine(
      isValidEmailFormat,
      { message: 'Invalid email format' }
    ),
  message: z.string()
    .min(10)
    .max(1000)
    .trim()
    .transform(sanitizeForEmail)
    .refine(
      (val) => !/[<>\"'&]/.test(val),
      { message: 'Message contains invalid characters' }
    ),
});

// Note: Rate limiting is now handled by centralized rate-limit.ts module

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
    return {
      success: false,
      message: 'Email service not available. Please contact us directly at support@purrify.ca'
    };
  }

  try {
    const resend = new Resend(RESEND_CONFIG.apiKey);

    // CRITICAL SECURITY FIX: Sanitize all inputs before including in email
    const sanitizedName = sanitizeEmailHtml(name);
    const sanitizedEmail = sanitizeForEmail(email);
    const sanitizedMessage = sanitizeEmailHtml(message);
    const sanitizedSubject = sanitizeForEmail(subject);

    // Additional validation: ensure sanitized values are not empty
    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return {
        success: false,
        message: 'Invalid input data after sanitization'
      };
    }

    const { error } = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: RESEND_CONFIG.toEmail,
      replyTo: sanitizedEmail,
      subject: sanitizedSubject || `Contact Form: ${sanitizedName}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #FF3131; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${sanitizedName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: #FF3131;">${sanitizedEmail}</a></p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${sanitizedName}
Email: ${sanitizedEmail}
Date: ${new Date().toLocaleString()}

Message:
${sanitizedMessage}
      `,
    });

    if (error) {
      return {
        success: false,
        message: 'Failed to send email. Please try again later.'
      };
    }

    return {
      success: true,
      message: 'Message sent successfully!'
    };
  } catch (_error) {
    return {
      success: false,
      message: 'An error occurred while sending your message.'
    };
  }
}



export async function POST(request: NextRequest) {
  // Get client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  // Apply rate limiting (sensitive: 5 req/min)
  const rateLimitResult = await checkRateLimit(clientIp, 'sensitive');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  // Create security headers
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Content-Security-Policy', "default-src 'self'");

  // Add rate limit headers
  Object.entries(rateLimitHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429, headers }
    );
  }

  try {
    const body = await request.json();

    // CRITICAL SECURITY FIX: Validate form data with Zod (with enhanced sanitization)
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data. Please check your inputs and try again.' },
        { status: 400, headers }
      );
    }

    const { name, email, message } = validationResult.data;

    // Additional security: Check for suspicious patterns in the message
    const suspiciousPatterns = [
      /bcc\s*:/i,
      /cc\s*:/i,
      /to\s*:/i,
      /from\s*:/i,
      /subject\s*:/i,
      /content-type\s*:/i,
      /mime-version\s*:/i,
      /\n[\w-]+\s*:/i  // Header-like patterns
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(message)) {
        return NextResponse.json(
          { success: false, message: 'Invalid message format.' },
          { status: 400, headers }
        );
      }
    }

    // Try Zendesk first (primary), then fall back to Resend
    if (isZendeskConfigured()) {
      try {
        const acceptLanguage = request.headers.get('accept-language') || '';
        const _ticketResponse = await createContactTicket({
          name,
          email,
          message,
          locale: acceptLanguage.includes('fr') ? 'fr' : acceptLanguage.includes('zh') ? 'zh' : 'en',
        });

        return NextResponse.json(
          { success: true, message: "Thank you for contacting us! We'll get back to you within 24 hours." },
          { status: 200, headers }
        );
      } catch (_zendeskError) {
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
  } catch (_error) {
    return NextResponse.json(
      { success: false, message: 'An error occurred while sending your message.' },
      { status: 500, headers }
    );
  }
}
