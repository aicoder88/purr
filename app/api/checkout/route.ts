import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import prisma from '@/lib/prisma';

// Initialize Stripe lazily
let stripeInstance: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-08-27.basil',
    });
  }
  return stripeInstance;
}

// Input validation schema
const createCheckoutSchema = z.object({
  orderId: z.string().uuid('Invalid order ID format'),
  currency: z.enum(['CAD', 'USD'], { message: 'Currency must be CAD or USD' }),
  customer: z.object({
    email: z.string().email('Invalid email format').max(254, 'Email too long'),
    name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
  }),
});

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
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
          { error: 'Too many requests. Please try again later.' },
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
    const validationResult = createCheckoutSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400, headers }
      );
    }

    const { orderId, currency, customer } = validationResult.data;

    // Check prisma is available
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500, headers }
      );
    }

    // Fetch order from database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404, headers }
      );
    }

    // Create Stripe checkout session
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.items.map((item) => ({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: item.product.name,
            description: item.product.description,
            images: item.product.image ? [item.product.image] : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/products`,
      customer_email: customer.email,
      metadata: {
        orderId: order.id,
        customerName: customer.name || '',
      },
    });

    return NextResponse.json(
      { sessionId: session.id, url: session.url },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    Sentry.captureException(error);

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500, headers }
    );
  }
}
