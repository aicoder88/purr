import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import {
  createContactTicket,
  createB2BTicket,
  createRefundTicket,
  isZendeskConfigured,
} from '../../../src/lib/zendesk';
import { withCSRFProtection } from '../../../src/lib/security/csrf';

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
// API HANDLER
// ============================================================================

type ResponseData = {
  success: boolean;
  message: string;
  ticketId?: number;
  ticketUrl?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  // Rate limiting
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    });
  }

  // Check Zendesk configuration
  if (!isZendeskConfigured()) {
    console.error('Zendesk not configured');
    Sentry.captureMessage('Zendesk API not configured', 'error');
    return res.status(500).json({
      success: false,
      message: 'Support system temporarily unavailable. Please email support@purrify.ca directly.',
    });
  }

  try {
    // Validate request body
    const validationResult = ticketSchema.safeParse(req.body);

    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.issues);
      return res.status(400).json({
        success: false,
        message: 'Invalid form data. Please check your inputs and try again.',
      });
    }

    const data = validationResult.data;

    // Create ticket based on type
    let ticketResponse;

    switch (data.type) {
      case 'contact':
        console.log('Creating contact ticket:', {
          name: data.name,
          email: data.email,
          locale: data.locale,
        });
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
        console.log('Creating B2B ticket:', {
          businessName: data.businessName,
          email: data.email,
          businessType: data.businessType,
        });
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
        console.log('Creating refund ticket:', {
          name: data.name,
          email: data.email,
          orderNumber: data.orderNumber,
        });
        ticketResponse = await createRefundTicket({
          name: data.name,
          email: data.email,
          orderNumber: data.orderNumber,
          reason: data.reason,
          product: data.product,
        });
        break;
    }

    console.log('Ticket created successfully:', {
      id: ticketResponse.ticket.id,
      status: ticketResponse.ticket.status,
    });

    return res.status(200).json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you within 24 hours.",
      ticketId: ticketResponse.ticket.id,
    });
  } catch (error) {
    console.error('Error creating Zendesk ticket:', error);
    Sentry.captureException(error);

    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your request. Please try again or email support@purrify.ca directly.',
    });
  }
}

// Apply CSRF protection
export default withCSRFProtection(handler);
