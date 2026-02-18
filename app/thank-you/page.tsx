import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import ThankYouClient from './ThankYouClient';
import Stripe from 'stripe';
import { SITE_NAME } from '@/lib/constants';

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
}

async function getOrderDetails(sessionId: string | undefined): Promise<{ orderDetails: OrderDetails | null; error?: string }> {
  if (!sessionId) {
    return { orderDetails: null };
  }

  try {
    let stripe;
    try {
      stripe = getStripeInstance();
    } catch (stripeError) {
      console.error('Stripe configuration error:', stripeError);
      return {
        orderDetails: null,
        error: 'Unable to load order details due to configuration issue'
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['shipping_details', 'line_items']
    });

    const orderDetails: OrderDetails = {
      customerEmail: session.customer_details?.email || session.customer_email || undefined,
      customerName: session.customer_details?.name || undefined,
      amount: session.amount_total || undefined,
      orderNumber: session.metadata?.orderId || sessionId.slice(-8).toUpperCase(),
      isSubscription: session.mode === 'subscription',
      shippingCountry: (session as unknown as { shipping_details?: { address?: { country?: string } } }).shipping_details?.address?.country || session.customer_details?.address?.country || undefined,
    };

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 1 });
      if (lineItems.data.length > 0) {
        const item = lineItems.data[0];
        orderDetails.productName = item.description || 'Purrify';
        orderDetails.quantity = item.quantity || 1;
      }
    } catch (err) {
      console.error('Error fetching line items:', err);
    }

    return { orderDetails };
  } catch (error) {
    console.error('Error fetching Stripe session:', error);
    return {
      orderDetails: null,
      error: 'Unable to load order details'
    };
  }
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const sessionId = typeof params.session_id === 'string' ? params.session_id : undefined;
  const { orderDetails } = await getOrderDetails(sessionId);

  const firstName = orderDetails?.customerName?.split(' ')[0];
  const title = firstName
    ? `Thank You for Your Order, ${firstName}! - Purrify`
    : 'Thank You for Your Order! - Purrify';

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
        'en-US': 'https://www.purrify.ca/thank-you/',
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
          url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
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
      images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
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
          sessionId={sessionId}
        />
      </Container>
    </main>
  );
}
