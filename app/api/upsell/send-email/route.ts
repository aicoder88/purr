import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { UpsellDeclinedEmailHTML, getUpsellDeclinedEmailSubject } from '@/emails/upsell-declined';
import { UpsellExpiredEmailHTML, getUpsellExpiredEmailSubject } from '@/emails/upsell-expired';
import { auth } from '@/auth';

type EmailType = 'declined' | 'expired';

interface SendUpsellEmailRequest {
  email: string;
  type: EmailType;
  customerName?: string;
  locale?: string;
  sessionId?: string;
}

interface SendUpsellEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
  emailId?: string;
}

// Strict rate limit for email sending: 5 per minute per IP
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

export async function POST(req: Request): Promise<Response> {
  const headers = new Headers();

  // Check authorization: require either admin auth OR internal API key
  const authHeader = req.headers.get('authorization');
  const internalSecret = process.env.CRON_SECRET;
  const isInternalCall = internalSecret && authHeader === `Bearer ${internalSecret}`;

  if (!isInternalCall) {
    // Check for admin session using App Router compatible auth
    const session = await auth();
    
    if (!session?.user) {
      return Response.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Check if user has admin role
    const userRole = (session.user as { role?: string }).role || '';
    const isAdmin = ['admin', 'superadmin'].includes(userRole);
    
    if (!isAdmin) {
      return Response.json({
        success: false,
        error: 'Unauthorized: Admin access required'
      }, { status: 401 });
    }
  }

  // Get client IP for rate limiting
  const forwardedFor = req.headers.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0] || 'unknown';

  // Apply rate limiting
  const { allowed, remaining } = checkRateLimit(clientIp);
  headers.set('X-RateLimit-Remaining', remaining.toString());

  if (!allowed) {
    return Response.json({
      success: false,
      error: 'Too many email requests. Please try again later.'
    }, { status: 429, headers });
  }

  // Verify Resend is configured
  if (!isResendConfigured()) {
    console.error('[Upsell Email] Resend is not configured');
    return Response.json({
      success: false,
      error: 'Email service not configured'
    }, { status: 500, headers });
  }

  try {
    const { email, type, customerName, locale = 'en', sessionId }: SendUpsellEmailRequest = await req.json();

    // Validate required fields
    if (!email || !type) {
      return Response.json({
        success: false,
        error: 'Missing required fields: email and type'
      }, { status: 400, headers });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400, headers });
    }

    // Validate type
    if (!['declined', 'expired'].includes(type)) {
      return Response.json({
        success: false,
        error: 'Invalid email type. Must be "declined" or "expired"'
      }, { status: 400, headers });
    }

    // Initialize Resend
    const resend = new Resend(RESEND_CONFIG.apiKey);

    // Get email content based on type
    let htmlContent: string;
    let subject: string;

    if (type === 'declined') {
      htmlContent = UpsellDeclinedEmailHTML({ customerName, locale });
      subject = getUpsellDeclinedEmailSubject(locale);
    } else {
      htmlContent = UpsellExpiredEmailHTML({ customerName, locale });
      subject = getUpsellExpiredEmailSubject(locale);
    }

    // Send email
    const result = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: email,
      subject,
      html: htmlContent,
      tags: [
        { name: 'type', value: 'upsell' },
        { name: 'email_type', value: type },
        { name: 'locale', value: locale },
        ...(sessionId ? [{ name: 'session_id', value: sessionId }] : [])
      ]
    });

    // Check for errors
    if (result.error) {
      console.error(`[Upsell Email] Error sending ${type} email:`, result.error);
      return Response.json({
        success: false,
        error: result.error.message || 'Failed to send email'
      }, { status: 500, headers });
    }

    // Log success
    console.log(`[Upsell Email] Sent ${type} email to ${email}`, {
      emailId: result.data?.id,
      locale,
      customerName
    });

    return Response.json({
      success: true,
      message: `${type} email sent successfully`,
      emailId: result.data?.id
    }, { headers });

  } catch (error) {
    console.error('[Upsell Email] Error sending email:', error);

    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    }, { status: 500, headers });
  }
}
