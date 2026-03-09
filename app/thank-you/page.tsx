import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import ThankYouClient from './ThankYouClient';
import Stripe from 'stripe';
import { SITE_NAME } from '@/lib/constants';
import { getFreshnessProfileBySessionId } from '@/lib/freshness-profile';

const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-08-27.basil',
  });
};

interface OrderDetails {
  customerEmail?: string;
  customerName?: string;
  productName?: string;
  quantity?: number;
  amount?: number;
  orderNumber?: string;
  isSubscription?: boolean;
  shippingCountry?: string;
  freshnessSessionId?: string;
  riskLevel?: string;
  score?: number;
  recommendedProductId?: string;
  catCount?: number;
  homeType?: string;
  odorSeverity?: string;
  currentRemedy?: string;
}

async function getOrderDetails(sessionId: string | undefined): Promise<{ orderDetails: OrderDetails | null; error?: string }> {
  if (!sessionId) {
    return { orderDetails: null };
  }

  try {
    let stripe;
    try {
      stripe = getStripeInstance();
    } catch {
      return {
        orderDetails: null,
        error: 'Unable to load order details due to configuration issue'
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['shipping_details', 'line_items']
    });
    const freshnessSessionId = session.metadata?.freshnessSessionId || undefined;
    const freshnessProfile = freshnessSessionId
      ? await getFreshnessProfileBySessionId(freshnessSessionId)
      : null;

    const orderDetails: OrderDetails = {
      customerEmail: session.customer_details?.email || session.customer_email || undefined,
      customerName: session.customer_details?.name || undefined,
      amount: session.amount_total || undefined,
      orderNumber: session.metadata?.orderId || sessionId.slice(-8).toUpperCase(),
      isSubscription: session.mode === 'subscription',
      shippingCountry: (session as unknown as { shipping_details?: { address?: { country?: string } } }).shipping_details?.address?.country || session.customer_details?.address?.country || undefined,
      freshnessSessionId,
      riskLevel: freshnessProfile?.riskLevel || session.metadata?.freshnessRiskLevel || undefined,
      score: freshnessProfile?.score ?? (session.metadata?.freshnessScore ? Number(session.metadata.freshnessScore) : undefined),
      recommendedProductId: freshnessProfile?.recommendedProductId || session.metadata?.freshnessRecommendedProductId || undefined,
      catCount: freshnessProfile?.catCount ?? undefined,
      homeType: freshnessProfile?.homeType ?? undefined,
      odorSeverity: freshnessProfile?.odorSeverity ?? undefined,
      currentRemedy: freshnessProfile?.currentRemedy ?? undefined,
    };

    const firstLineItem = (
      session as Stripe.Checkout.Session & {
        line_items?: { data?: Array<{ description?: string | null; quantity?: number | null }> };
      }
    ).line_items?.data?.[0];

    if (firstLineItem) {
      orderDetails.productName = firstLineItem.description || 'Purrify';
      orderDetails.quantity = firstLineItem.quantity || 1;
    }

    return { orderDetails };
  } catch {
    return {
      orderDetails: null,
      error: 'Unable to load order details'
    };
  }
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateMetadata(): Metadata {
  const title = 'Thank You for Your Order! - Purrify';

  const description = 'Your Purrify order has been confirmed. Get ready to experience an odor-free home!';

  return {
    title,
    description,
    keywords: ['Purrify order confirmation', 'thank you', 'order complete'],
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: 'https://www.purrify.ca/thank-you/',
      languages: {
        'en-CA': 'https://www.purrify.ca/thank-you/',
        'fr-CA': 'https://www.purrify.ca/fr/thank-you/',
        'x-default': 'https://www.purrify.ca/thank-you/',
      },
    },
    openGraph: {
      url: 'https://www.purrify.ca/thank-you/',
      siteName: SITE_NAME,
      locale: 'en_CA',
      title,
      description,
      images: [
        {
          url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
          width: 1200,
          height: 630,
          alt: 'Purrify',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title,
      description,
      images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'],
    },
  };
}

export default async function ThankYouPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === 'string' ? params.session_id : undefined;
  const { orderDetails, error } = await getOrderDetails(sessionId);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Container>
        <ThankYouClient
          orderDetails={orderDetails}
          error={error}
        />
      </Container>
    </main>
  );
}
