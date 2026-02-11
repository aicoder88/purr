export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME, TESTIMONIALS } from '@/lib/constants';
import { ResultsContent } from './ResultsContent';

export const metadata: Metadata = {
  title: `Real Results From Real Cat Parents | ${SITE_NAME}`,
  description: 'See how 1,000+ cat owners eliminated litter box odor with Purrify. Real testimonials and verified reviews from happy cat parents across Canada.',
  keywords: ['purrify results', 'cat litter reviews', 'testimonials', 'before after', 'customer reviews', 'verified reviews'],
  openGraph: {
    title: `Real Results From Real Cat Parents | ${SITE_NAME}`,
    description: 'See how 1,000+ cat owners eliminated litter box odor with Purrify. Real testimonials, verified reviews, and proven results from happy cat parents across Canada.',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResultsPage() {
  // Use first 9 testimonials
  const testimonials = TESTIMONIALS.slice(0, 9);

  // Product schema for structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Purrify Cat Litter Deodorizer',
    description: 'Activated carbon cat litter additive that eliminates odors naturally',
    image: [
      'https://www.purrify.ca/optimized/60g-transparent.webp',
      'https://www.purrify.ca/optimized/120g-transparent.webp',
      'https://www.purrify.ca/images/Logos/purrify-logo.png',
    ],
    brand: {
      '@type': 'Brand',
      name: 'Purrify',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CAD',
      price: '4.76',
      availability: 'https://schema.org/InStock',
      url: 'https://www.purrify.ca',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <>
      {/* Product Schema with Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <ResultsContent testimonials={testimonials} />
    </>
  );
}
