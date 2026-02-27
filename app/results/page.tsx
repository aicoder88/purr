export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { ResultsContent } from './ResultsContent';

export const metadata: Metadata = {
  title: `Real Results From Real Cat Parents | ${SITE_NAME}`,
  description: 'See practical ways cat owners use an activated carbon additive to reduce litter box odor, with tips and examples.',
  keywords: ['purrify results', 'cat litter odor', 'odor control tips', 'activated carbon additive', 'before after'],
  alternates: {
    canonical: 'https://www.purrify.ca/results/',
  },
  openGraph: {
    title: `Real Results From Real Cat Parents | ${SITE_NAME}`,
    description: 'See practical ways cat owners use an activated carbon additive to reduce litter box odor, with tips and examples.',
    type: 'website',
    url: 'https://www.purrify.ca/results/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResultsPage() {
  // WebPage schema for Results/Testimonials page (not a product page)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.purrify.ca/results/',
    url: 'https://www.purrify.ca/results/',
    name: 'Customer Results & Testimonials | Purrify',
    description: 'See real customer results and testimonials for Purrify activated carbon cat litter deodorizer.',
    inLanguage: 'en-CA',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://www.purrify.ca/#website',
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
