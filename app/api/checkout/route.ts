import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { attachEmailToFreshnessProfile, getFreshnessSnapshotBySessionId } from '@/lib/freshness-profile';
import { FRESHNESS_SESSION_COOKIE } from '@/lib/freshness-session';
import { REFERRAL_COOKIE_NAME } from '@/lib/referral-cookie';
import { validateReferralCodeForEmail } from '@/lib/referral-program';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';
import { verifyCheckoutToken, isOrderExpired } from '@/lib/security/checkout-token';

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

interface CheckoutOrderItem {
  quantity: number;
  price: number;
  product: {
    name: string;
    description: string;
    image: string;
  };
}

function buildCheckoutLineItems(
  order: { items: CheckoutOrderItem[] },
  currency: 'CAD' | 'USD',
  referralDiscount = 0
) {
  const expandedItems = order.items.flatMap((item) =>
    Array.from({ length: item.quantity }, () => ({
      product: item.product,
      unitAmountCents: Math.round(item.price * 100),
    }))
  );

  let remainingDiscountCents = Math.max(0, Math.round(referralDiscount * 100));
  const discountedUnits = expandedItems.map((item) => {
    if (remainingDiscountCents <= 0) {
      return item;
    }

    const appliedDiscount = Math.min(item.unitAmountCents, remainingDiscountCents);
    remainingDiscountCents -= appliedDiscount;

    return {
      ...item,
      unitAmountCents: item.unitAmountCents - appliedDiscount,
    };
  });

  return discountedUnits.map((item) => ({
    price_data: {
      currency: currency.toLowerCase(),
      product_data: {
        name: item.product.name,
        description: item.product.description,
        images: item.product.image ? [item.product.image] : undefined,
      },
      unit_amount: item.unitAmountCents,
    },
    quantity: 1,
  }));
}

// Input validation schema
const createCheckoutSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required').max(64, 'Invalid order ID format'),
  checkoutToken: z.string().min(1, 'Checkout token is required'),
  currency: z.enum(['CAD', 'USD'], { message: 'Currency must be CAD or USD' }),
  locale: z.enum(['en', 'fr']).default('en'),
  customer: z.object({
    email: z.string().email('Invalid email format').max(254, 'Email too long'),
    name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
  }),
  referralCode: z.string().trim().min(1).max(20).optional(),
  sessionId: z
    .string()
    .trim()
    .min(8)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/)
    .optional(),
});

export async function POST(request: NextRequest) {
  // Get client IP
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  
  // Apply rate limiting (sensitive: 5 req/min)
  const rateLimitResult = await checkRateLimit(clientIp, 'sensitive');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);
  
  // Create security headers
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  
  // Add rate limit headers
  Object.entries(rateLimitHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers }
    );
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

    const { orderId, checkoutToken, currency, locale, customer, referralCode, sessionId: bodySessionId } = validationResult.data;
    const sessionId = bodySessionId ?? request.cookies.get(FRESHNESS_SESSION_COOKIE)?.value;

    // Verify checkout token for ownership
    if (!verifyCheckoutToken(orderId, checkoutToken)) {
      return NextResponse.json(
        { error: 'Invalid checkout token' },
        { status: 403, headers }
      );
    }

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

    // Verify order status - only allow checkout for PENDING orders
    if (order.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Order already processed' },
        { status: 409, headers }
      );
    }

    // Verify order age - reject orders older than 1 hour
    if (isOrderExpired(order.createdAt)) {
      return NextResponse.json(
        { error: 'Order expired' },
        { status: 410, headers }
      );
    }

    const freshness = sessionId
      ? await getFreshnessSnapshotBySessionId(sessionId)
      : null;

    if (sessionId) {
      await attachEmailToFreshnessProfile(sessionId, customer.email.toLowerCase().trim());
    }

    if (freshness && !order.freshnessSessionId) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          freshnessSessionId: freshness.sessionId,
          freshnessSource: freshness.source,
          freshnessScore: freshness.score,
          freshnessRiskLevel: freshness.riskLevel,
          freshnessRecommendedProductId: freshness.recommendedProductId,
        },
      });
    }

    const referralCodeCandidate =
      order.referralCodeUsed ||
      referralCode ||
      request.cookies.get(REFERRAL_COOKIE_NAME)?.value ||
      undefined;
    let persistedReferralCode = order.referralCodeUsed || undefined;
    let persistedReferralDiscount = order.referralDiscount || undefined;

    if (referralCodeCandidate && !order.referralCodeUsed) {
      try {
        const referral = await validateReferralCodeForEmail(referralCodeCandidate, customer.email);
        persistedReferralCode = referral.code;
        persistedReferralDiscount = referral.discount;
        await prisma.order.update({
          where: { id: order.id },
          data: {
            referralCodeUsed: referral.code,
            referralDiscount: referral.discount,
          },
        });
      } catch {
        persistedReferralCode = undefined;
        persistedReferralDiscount = undefined;
      }
    }

    // Create Stripe checkout session
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: buildCheckoutLineItems(order, currency, persistedReferralDiscount || 0),
      mode: 'payment',
      success_url: `${process.env.APP_URL ?? process.env.NEXTAUTH_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL ?? process.env.NEXTAUTH_URL}/products`,
      customer_email: customer.email,
      metadata: {
        orderId: order.id,
        customerName: customer.name || '',
        locale,
        freshnessSessionId: order.freshnessSessionId ?? freshness?.sessionId ?? '',
        freshnessSource: order.freshnessSource ?? freshness?.source ?? '',
        freshnessScore: String(order.freshnessScore ?? freshness?.score ?? ''),
        freshnessRiskLevel: order.freshnessRiskLevel ?? freshness?.riskLevel ?? '',
        freshnessRecommendedProductId: order.freshnessRecommendedProductId ?? freshness?.recommendedProductId ?? '',
        referralCodeUsed: persistedReferralCode ?? '',
        referralDiscount: persistedReferralDiscount ? String(persistedReferralDiscount) : '',
      },
    });

    return NextResponse.json(
      { sessionId: session.id, url: session.url },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Checkout error:', error);

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500, headers }
    );
  }
}
