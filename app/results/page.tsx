export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { ResultsContent } from './ResultsContent';

export const metadata: Metadata = buildPageMetadata({
  title: `Real Results From Real Cat Parents | ${SITE_NAME}`,
  description:
    'See practical ways cat owners use an activated carbon additive to reduce litter box odor, with tips and examples.',
  path: '/results/',
  keywords: ['purrify results', 'cat litter odor', 'odor control tips', 'activated carbon additive', 'before after'],
  image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
  imageAlt: 'Purrify customer results',
  lastModified: '2026-03-08',
  robots: {
    index: true,
    follow: true,
  },
});

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
