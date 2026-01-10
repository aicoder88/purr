import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '../../src/lib/resend-config';
import {
  B2BLeadEmailHTML,
  getB2BLeadEmailSubject,
  B2BLeadConfirmationEmailHTML,
  getB2BLeadConfirmationSubject,
} from '../../src/emails/b2b-lead';
import { createB2BTicket, isZendeskConfigured } from '../../src/lib/zendesk';
import * as Sentry from '@sentry/nextjs';

const resend = new Resend(process.env.RESEND_API_KEY);

// Define validation schema for B2B contact form
const b2bContactSchema = z.object({
  businessName: z.string().min(2).max(100).trim(),
  contactName: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  phone: z.string().min(10).max(20).trim().optional(),
  businessType: z.enum(['veterinarian', 'catCafe', 'shelter', 'groomer', 'hospitality', 'retailer']),
  location: z.string().max(200).trim().optional(),
  catCount: z.string().max(20).trim().optional(),
  message: z.string().max(2000).trim().optional(),
  locale: z.enum(['en', 'fr', 'zh']).optional().default('en'),
});

type ResponseData = {
  success: boolean;
  message: string;
};

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

// B2B team email
const B2B_TEAM_EMAIL = 'wholesale@purrify.ca';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Apply rate limiting
  const clientIp = (req.headers['x-forwarded-for'] as string) || 'unknown';
  const now = Date.now();
  const ipData = ipRequestCounts.get(clientIp);

  if (ipData) {
    if (now < ipData.resetTime) {
      if (ipData.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests. Please try again later.',
        });
      }
      ipData.count += 1;
    } else {
      ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }
  } else {
    ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  try {
    // Validate form data with Zod
    const validationResult = b2bContactSchema.safeParse(req.body);

    if (!validationResult.success) {
      console.error('[B2B Contact] Validation error:', validationResult.error.issues);
      return res.status(400).json({
        success: false,
        message: 'Invalid form data. Please check your inputs and try again.',
      });
    }

    const data = validationResult.data;
    const submittedAt = new Date().toLocaleString('en-CA', {
      timeZone: 'America/Toronto',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    console.log('[B2B Contact] Processing lead:', {
      businessName: data.businessName,
      businessType: data.businessType,
      email: data.email,
      timestamp: submittedAt,
    });

    // Create Zendesk ticket first (primary system)
    if (isZendeskConfigured()) {
      try {
        console.log('[B2B Contact] Creating Zendesk ticket...');
        const ticketResponse = await createB2BTicket({
          businessName: data.businessName,
          contactName: data.contactName,
          email: data.email,
          phone: data.phone,
          businessType: data.businessType,
          location: data.location,
          catCount: data.catCount ? parseInt(data.catCount, 10) : undefined,
          message: data.message || `B2B inquiry from ${data.businessName}`,
          locale: data.locale,
        });

        console.log('[B2B Contact] Zendesk ticket created:', {
          ticketId: ticketResponse.ticket.id,
          status: ticketResponse.ticket.status,
        });
      } catch (zendeskError) {
        console.error('[B2B Contact] Zendesk ticket creation failed:', zendeskError);
        Sentry.captureException(zendeskError);
        // Continue with email notification as fallback
      }
    }

    // Check if Resend is configured for additional email notifications
    if (!isResendConfigured()) {
      console.warn('[B2B Contact] Resend not configured, Zendesk ticket only');
      return res.status(200).json({
        success: true,
        message: 'Thank you for your interest! We will contact you within 1-2 business days.',
      });
    }

    // Send notification email to B2B team
    const notificationHtml = B2BLeadEmailHTML({
      businessName: data.businessName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      businessType: data.businessType,
      location: data.location,
      catCount: data.catCount,
      message: data.message,
      submittedAt,
    });

    const notificationSubject = getB2BLeadEmailSubject(data.businessName, data.businessType);

    const { error: notificationError } = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: B2B_TEAM_EMAIL,
      replyTo: data.email,
      subject: notificationSubject,
      html: notificationHtml,
    });

    if (notificationError) {
      console.error('[B2B Contact] Failed to send notification email:', notificationError);
      // Don't fail the whole request, continue to send confirmation
    } else {
      console.log('[B2B Contact] Notification email sent to B2B team');
    }

    // Send confirmation email to the lead
    const confirmationHtml = B2BLeadConfirmationEmailHTML({
      contactName: data.contactName,
      businessType: data.businessType,
      locale: data.locale,
    });

    const confirmationSubject = getB2BLeadConfirmationSubject(data.locale);

    const { error: confirmationError } = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: data.email,
      subject: confirmationSubject,
      html: confirmationHtml,
    });

    if (confirmationError) {
      console.error('[B2B Contact] Failed to send confirmation email:', confirmationError);
      // Don't fail the whole request
    } else {
      console.log('[B2B Contact] Confirmation email sent to lead:', data.email);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your interest! We will contact you within 1-2 business days.',
    });
  } catch (error) {
    console.error(
      '[B2B Contact] Error processing form:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return res.status(500).json({
      success: false,
      message: 'An error occurred while sending your message. Please try again.',
    });
  }
}
