export const dynamic = 'force-static';

import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Free Cat Litter Freshener Trial | Purrify',
  description: 'FREE Cat Litter Deodorizer Trial | Just Pay $4.76 Shipping | 87% upgrade within 7 days. ★ 4.8 rating. Ships USA & Canada. Risk-free.',
  keywords: ['cat litter freshener', 'free trial', 'charcoal litter additive', 'cat litter deodorizer', 'activated carbon trial'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/products/trial-size/',
    siteName: 'Purrify',
    title: 'Free Cat Litter Freshener Trial | Purrify',
    description: 'FREE trial of our activated charcoal cat litter additive. Natural coconut shell carbon litter freshener eliminates ammonia odors instantly.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/17g-transparent-v2.webp',
        width: 1200,
        height: 1200,
        alt: 'Purrify 12g Trial Size',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Free Cat Litter Freshener Trial | Purrify',
    description: 'FREE trial of our activated charcoal cat litter additive. Natural coconut shell carbon litter freshener.',
    images: ['https://www.purrify.ca/optimized/17g-transparent-v2.webp'],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/products/trial-size/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function TrialSizePage() {
  return <PageContent />;
}
