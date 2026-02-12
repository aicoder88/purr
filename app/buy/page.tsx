export const dynamic = 'force-static';

import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Buy Purrify | Redirecting...',
  description: 'Redirecting to Purrify products page.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://www.purrify.ca/buy/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/buy/',
    siteName: SITE_NAME,
    title: 'Buy Purrify | Redirecting...',
    description: 'Redirecting to Purrify products page.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png/',
        width: 1200,
        height: 800,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Buy Purrify | Redirecting...',
    description: 'Redirecting to Purrify products page.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
};

/**
 * /buy - Redirect to products page
 * Handles common user search intent for buying
 */
export default function BuyPage() {
  redirect('/products');
}
