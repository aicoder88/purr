import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { getFreshnessSnapshotBySessionId } from '@/lib/freshness-profile';
import { FRESHNESS_SESSION_COOKIE } from '@/lib/freshness-session';
import { REFERRAL_COOKIE_NAME } from '@/lib/referral-cookie';
import {
  getCheckoutProductConfig,
  isCheckoutProductId,
} from '@/lib/checkout-catalog';
import { getClientIp, checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-08-27.basil',
    });
  }

  return stripeInstance;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ productId: string }> }
): Promise<Response> {
  const clientIp = getClientIp(request);
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many checkout attempts. Please try again later.' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  if (!prisma) {
    return NextResponse.json(
      { error: 'Database not available' },
      { status: 503, headers: rateLimitHeaders }
    );
  }

  const { productId } = await context.params;
  if (!isCheckoutProductId(productId)) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  const product = getCheckoutProductConfig(productId);
  if (!product) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  const localeParam = request.nextUrl.searchParams.get('locale');
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  const locale = localeParam === 'fr' || localeCookie === 'fr' ? 'fr' : 'en';
  const sessionId = request.cookies.get(FRESHNESS_SESSION_COOKIE)?.value;
  const referralCode = request.cookies.get(REFERRAL_COOKIE_NAME)?.value;
  const freshness = sessionId
    ? await getFreshnessSnapshotBySessionId(sessionId)
    : null;

  const order = await prisma.order.create({
    data: {
      totalAmount: product.price,
      currency: 'CAD',
      status: 'PENDING',
      referralCodeUsed: referralCode || undefined,
      freshnessSessionId: freshness?.sessionId,
      freshnessSource: freshness?.source,
      freshnessScore: freshness?.score,
      freshnessRiskLevel: freshness?.riskLevel,
      freshnessRecommendedProductId: freshness?.recommendedProductId ?? product.productId,
    },
  });

  try {
    const origin = request.nextUrl.origin;
    const checkoutSession = await getStripe().checkout.sessions.create({
      mode: product.mode,
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      line_items: [
        {
          quantity: product.quantity,
          price_data: {
            currency: 'cad',
            unit_amount: Math.round(product.price * 100),
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${origin}${product.image}`],
            },
            recurring:
              product.mode === 'subscription' &&
              product.recurringInterval &&
              product.recurringIntervalCount
                ? {
                    interval: product.recurringInterval,
                    interval_count: product.recurringIntervalCount,
                  }
                : undefined,
          },
        },
      ],
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
      metadata: {
        orderId: order.id,
        locale,
        type: 'consumer_order',
        productId: product.productId,
        freshnessSessionId: freshness?.sessionId ?? '',
        freshnessSource: freshness?.source ?? '',
        freshnessScore: String(freshness?.score ?? ''),
        freshnessRiskLevel: freshness?.riskLevel ?? '',
        freshnessRecommendedProductId:
          freshness?.recommendedProductId ?? product.productId,
        referralCodeUsed: referralCode ?? '',
      },
    });

    if (!checkoutSession.url) {
      throw new Error('Missing checkout session URL');
    }

    const headers = new Headers(rateLimitHeaders);
    headers.set('Location', checkoutSession.url);
    return new NextResponse(null, { status: 303, headers });
  } catch (error) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'CANCELLED' },
    }).catch(() => null);

    console.error('Quick checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to start checkout' },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
