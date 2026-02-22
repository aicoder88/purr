export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { ResultsContent } from './ResultsContent';

export const metadata: Metadata = {
  title: `Real Results From Real Cat Parents | ${SITE_NAME}`,
  description: 'See practical ways cat owners use an activated carbon additive to reduce litter box odor, with tips and examples.',
  keywords: ['purrify results', 'cat litter odor', 'odor control tips', 'activated carbon additive', 'before after'],
  openGraph: {
    title: `Real Results From Real Cat Parents | ${SITE_NAME}`,
    description: 'See practical ways cat owners use an activated carbon additive to reduce litter box odor, with tips and examples.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResultsPage() {
  // Product schema for structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Purrify Cat Litter Deodorizer',
    description: 'Activated carbon cat litter additive that eliminates odors naturally',
    image: [
      'https://www.purrify.ca/optimized/products/60g-transparent.webp',
      'https://www.purrify.ca/optimized/products/140g-transparent.webp',
      'https://www.purrify.ca/optimized/logos/purrify-logo.png',
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
      url: 'https://www.purrify.ca/',
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

      <ResultsContent testimonials={[]} />
    </>
  );
}
