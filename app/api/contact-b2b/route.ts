import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isZendeskConfigured, createB2BTicket } from '@/lib/zendesk';

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
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');

  // Apply rate limiting
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  const rateLimitResult = await checkRateLimit(clientIp, 'sensitive');

  if (!rateLimitResult.success) {
    headers.set('Retry-After', (rateLimitResult.retryAfter?.toString() || '60'));
    headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
    headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    headers.set('X-RateLimit-Reset', rateLimitResult.reset.toString());

    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429, headers }
    );
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
      }
    }

    // Fallback response
    return NextResponse.json(
      { success: true, message: 'Thank you! We will contact you within 1 business day.' },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('B2B contact error:', error);

    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500, headers }
    );
  }
}
