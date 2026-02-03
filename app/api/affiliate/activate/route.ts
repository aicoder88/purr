/**
 * Affiliate Activation - Starter Kit Checkout
 * Creates a Stripe checkout session for the affiliate starter kit
 */

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-08-27.basil',
});

// Starter Kit Price (in cents)
const STARTER_KIT_PRICE = 4900; // $49.00 CAD

export async function POST(): Promise<Response> {
  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    // Authenticate affiliate
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = session.user as { role?: string; affiliateId?: string };
    if (user.role !== 'affiliate' || !user.affiliateId) {
      return Response.json({ error: 'Not authorized as affiliate' }, { status: 403 });
    }

    const affiliateId = user.affiliateId;

    // Check if affiliate is already activated
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: affiliateId },
      select: {
        id: true,
        email: true,
        name: true,
        code: true,
        activatedAt: true,
      },
    });

    if (!affiliate) {
      return Response.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    if (affiliate.activatedAt) {
      return Response.json({ error: 'Account already activated' }, { status: 400 });
    }

    // Create Stripe Checkout session for the starter kit
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: affiliate.email,
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Purrify Affiliate Starter Kit',
              description: 'Includes 1 bag of Purrify (500g), marketing materials, and priority support',
              images: [`${process.env.NEXT_PUBLIC_SITE_URL}/optimized/three_bags_no_bg.webp`],
            },
            unit_amount: STARTER_KIT_PRICE,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: 'affiliate_starter_kit',
        affiliateId: affiliate.id,
        affiliateCode: affiliate.code,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/affiliate/dashboard?activated=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/affiliate/activate?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['CA'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'cad',
            },
            display_name: 'Free Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
    });

    return Response.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Failed to create starter kit checkout:', error);
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
