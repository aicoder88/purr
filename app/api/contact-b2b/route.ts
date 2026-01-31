import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isZendeskConfigured, createB2BTicket } from '@/lib/zendesk';
import * as Sentry from '@sentry/nextjs';

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

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

export async function POST(request: NextRequest) {
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');

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
    const validationResult = b2bContactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data. Please check your inputs and try again.' },
        { status: 400, headers }
      );
    }

    const data = validationResult.data;

    // Try Zendesk if configured
    if (isZendeskConfigured()) {
      try {
        await createB2BTicket({
          businessName: data.businessName,
          contactName: data.contactName,
          email: data.email,
          phone: data.phone,
          businessType: data.businessType,
          location: data.location,
          catCount: data.catCount ? parseInt(data.catCount, 10) : undefined,
          message: data.message || '',
        });

        return NextResponse.json(
          { success: true, message: 'Thank you! We will contact you within 1 business day.' },
          { status: 200, headers }
        );
      } catch (zendeskError) {
        console.error('Zendesk error:', zendeskError);
        Sentry.captureException(zendeskError);
      }
    }

    // Fallback response
    return NextResponse.json(
      { success: true, message: 'Thank you! We will contact you within 1 business day.' },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('B2B contact error:', error);
    Sentry.captureException(error);

    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500, headers }
    );
  }
}
