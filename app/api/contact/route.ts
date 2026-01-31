import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { createContactTicket, isZendeskConfigured } from '@/lib/zendesk';
import * as Sentry from '@sentry/nextjs';

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

// Enhanced rate limiting setup with per-user tracking
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

interface RateLimitEntry {
  count: number;
  resetTime: number;
  blocked: boolean;
  blockExpiresAt?: number;
}

const ipRequestCounts = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipRequestCounts.entries()) {
    if (entry.blockExpiresAt && now > entry.blockExpiresAt) {
      ipRequestCounts.delete(ip);
    } else if (!entry.blockExpiresAt && entry.resetTime < now) {
      ipRequestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);

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

    const { data, error } = await resend.emails.send({
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

/**
 * Apply rate limiting with progressive penalties
 */
function applyRateLimit(clientIp: string): { allowed: boolean; headers: Headers } {
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Content-Security-Policy', "default-src 'self'");

  const now = Date.now();
  const ipData = ipRequestCounts.get(clientIp);

  // Check if IP is currently blocked
  if (ipData?.blocked && ipData.blockExpiresAt && now < ipData.blockExpiresAt) {
    const retryAfter = Math.ceil((ipData.blockExpiresAt - now) / 1000);
    headers.set('Retry-After', retryAfter.toString());
    return { allowed: false, headers };
  }

  if (ipData) {
    if (now < ipData.resetTime) {
      if (ipData.count >= MAX_REQUESTS_PER_WINDOW) {
        // Block this IP for 15 minutes due to abuse
        ipData.blocked = true;
        ipData.blockExpiresAt = now + (15 * 60 * 1000);
        console.warn(`[RATE LIMIT] IP ${clientIp} blocked for excessive requests`);
        return { allowed: false, headers };
      }
      ipData.count += 1;
    } else {
      ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW, blocked: false });
    }
  } else {
    ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW, blocked: false });
  }

  return { allowed: true, headers };
}

export async function POST(request: NextRequest) {
  // Get client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  // Apply rate limiting
  const { allowed, headers } = applyRateLimit(clientIp);

  if (!allowed) {
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
      console.warn(`[SECURITY] Invalid contact form submission from ${clientIp}:`, validationResult.error.issues);
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
        console.warn(`[SECURITY] Potential email injection attempt from ${clientIp}`);
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
