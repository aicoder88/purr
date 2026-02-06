export const dynamic = 'force-static';

import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
  description: 'Best cat litter freshener for single-cat homes. 50g activated charcoal cat litter additive eliminates ammonia odors for 4-6 weeks. Natural, fragrance-free, works with any litter. Ships to USA & Canada.',
  keywords: ['cat litter freshener', 'charcoal litter additive', 'cat litter deodorizer', 'odor eliminator', '50g', 'standard size'],
  openGraph: {
    title: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
    description: 'Best-selling cat litter freshener for single-cat homes. 50g activated charcoal cat litter additive made from coconut shells. Eliminates ammonia for 4-6 weeks.',
    url: 'https://www.purrify.ca/products/standard',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/60g-transparent.webp',
        width: 600,
        height: 600,
        alt: 'Purrify 50g Standard Size',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/products/standard',
  },
};

export default function StandardSizePage() {
  return <PageContent />;
}
