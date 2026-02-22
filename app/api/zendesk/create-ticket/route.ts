import { z } from 'zod';
import {
  createContactTicket,
  createB2BTicket,
  createRefundTicket,
  isZendeskConfigured,
} from '@/lib/zendesk';

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const contactTicketSchema = z.object({
  type: z.literal('contact'),
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  message: z.string().min(10).max(5000).trim(),
  locale: z.enum(['en', 'fr', 'zh']).optional().default('en'),
  orderNumber: z.string().max(50).optional(),
  product: z.string().max(100).optional(),
});

const b2bTicketSchema = z.object({
  type: z.literal('b2b'),
  businessName: z.string().min(2).max(200).trim(),
  contactName: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  phone: z.string().max(20).optional(),
  businessType: z.string().min(2).max(50).trim(),
  location: z.string().max(200).optional(),
  catCount: z.number().min(0).max(10000).optional(),
  message: z.string().min(10).max(5000).trim(),
  locale: z.enum(['en', 'fr', 'zh']).optional().default('en'),
});

const refundTicketSchema = z.object({
  type: z.literal('refund'),
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  orderNumber: z.string().min(1).max(50).trim(),
  reason: z.string().min(10).max(2000).trim(),
  product: z.string().max(100).optional(),
});

const ticketSchema = z.discriminatedUnion('type', [
  contactTicketSchema,
  b2bTicketSchema,
  refundTicketSchema,
]);

// ============================================================================
// RATE LIMITING
// ============================================================================

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

// ============================================================================
// CSRF PROTECTION
// ============================================================================

const CSRF_COOKIE_NAME = 'csrf-token';

function verifyOrigin(req: Request): boolean {
  const origin = req.headers.get('origin') || req.headers.get('referer');

  // SECURITY: Reject requests without origin/referer for state-changing operations
  if (!origin) {
    return false;
  }

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca',
    'https://purrify.ca',
    'https://www.purrify.ca/',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

  // Check if origin matches any allowed origin
  return allowedOrigins.some(allowed => origin.startsWith(allowed));
}

function verifyCSRFToken(req: Request): boolean {
  // Get token from cookie
  const cookieHeader = req.headers.get('cookie');
  const cookies = new Map<string, string>();
  
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies.set(name, value);
      }
    });
  }
  
  const cookieToken = cookies.get(CSRF_COOKIE_NAME);
  
  // Get token from header
  const headerToken = req.headers.get('x-csrf-token');
  
  // Both must exist and match
  if (!cookieToken || !headerToken) {
    return false;
  }
  
  return cookieToken === headerToken;
}

// ============================================================================
// API HANDLER
// ============================================================================

export async function POST(req: Request): Promise<Response> {
  // Security headers
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Content-Security-Policy', "default-src 'self'");

  // CSRF protection - check origin for state-changing operations
  if (!verifyOrigin(req)) {
    return Response.json({
      success: false,
      message: 'Invalid origin',
    }, { status: 403, headers });
  }

  // Check CSRF token if one has been issued (cookie exists)
  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader && cookieHeader.includes(CSRF_COOKIE_NAME)) {
    if (!verifyCSRFToken(req)) {
      return Response.json({
        success: false,
        message: 'Invalid CSRF token',
      }, { status: 403, headers });
    }
  }

  // Rate limiting
  const forwardedFor = req.headers.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0] || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return Response.json({
      success: false,
      message: 'Too many requests. Please try again later.',
    }, { status: 429, headers });
  }

  // Check Zendesk configuration
  if (!isZendeskConfigured()) {
    // Zendesk not configured
    return Response.json({
      success: false,
      message: 'Support system temporarily unavailable. Please email support@purrify.ca directly.',
    }, { status: 500, headers });
  }

  try {
    // Validate request body
    const body = await req.json();
    const validationResult = ticketSchema.safeParse(body);

    if (!validationResult.success) {
      // Validation error
      return Response.json({
        success: false,
        message: 'Invalid form data. Please check your inputs and try again.',
      }, { status: 400, headers });
    }

    const data = validationResult.data;

    // Create ticket based on type
    let ticketResponse;

    switch (data.type) {
      case 'contact':
        ticketResponse = await createContactTicket({
          name: data.name,
          email: data.email,
          message: data.message,
          locale: data.locale,
          orderNumber: data.orderNumber,
          product: data.product,
        });
        break;

      case 'b2b':
        ticketResponse = await createB2BTicket({
          businessName: data.businessName,
          contactName: data.contactName,
          email: data.email,
          phone: data.phone,
          businessType: data.businessType,
          location: data.location,
          catCount: data.catCount,
          message: data.message,
          locale: data.locale,
        });
        break;

      case 'refund':
        ticketResponse = await createRefundTicket({
          name: data.name,
          email: data.email,
          orderNumber: data.orderNumber,
          reason: data.reason,
          product: data.product,
        });
        break;
    }

    return Response.json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you within 24 hours.",
      ticketId: ticketResponse.ticket.id,
    }, { headers });
  } catch {
    // Error creating ticket

    return Response.json({
      success: false,
      message: 'An error occurred while submitting your request. Please try again or email support@purrify.ca directly.',
    }, { status: 500, headers });
  }
}
