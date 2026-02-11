export const dynamic = 'force-static';

import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
  description: 'Best cat litter freshener for single-cat homes. 50g activated charcoal eliminates ammonia for 4-6 weeks. Natural, works with any litter.',
  keywords: ['cat litter freshener', 'charcoal litter additive', 'cat litter deodorizer', 'odor eliminator', '50g', 'standard size'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/products/standard',
    siteName: 'Purrify',
    title: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
    description: 'Best-selling cat litter freshener for single-cat homes. 50g activated charcoal from coconut shells. Eliminates ammonia for 4-6 weeks.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/60g-transparent.webp',
        width: 1200,
        height: 1200,
        alt: 'Purrify 50g Standard Size',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
    description: 'Best-selling cat litter freshener for single-cat homes. 50g activated charcoal additive from coconut shells.',
    images: ['https://www.purrify.ca/optimized/60g-transparent.webp'],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/products/standard',
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

export default function StandardSizePage() {
  return <PageContent />;
}
