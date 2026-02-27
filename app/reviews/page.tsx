import type { Metadata } from 'next';
import PageContent from './PageContent';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Purrify Reviews - What Cat Owners Are Saying',
  description: 'Read customer feedback about Purrify and learn how cat owners use an activated carbon additive to reduce litter box odor.',
  keywords: ['Purrify reviews', 'cat litter deodorizer reviews', 'customer testimonials', 'cat owner feedback'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/reviews/',
    siteName: SITE_NAME,
    title: 'Purrify Reviews - What Cat Owners Are Saying',
    description: 'Read customer feedback about Purrify and learn how cat owners use an activated carbon additive to reduce litter box odor.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: 'Purrify Customer Reviews',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/reviews/',
    languages: {
      'en-CA': 'https://www.purrify.ca/reviews',
      'fr-CA': 'https://www.purrify.ca/fr/reviews',
      'en-US': 'https://www.purrify.ca/reviews',
      'x-default': 'https://www.purrify.ca/reviews',
    },
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
  other: {
    'last-modified': '2025-12-09',
  },
};

// WebPage schema for Reviews page (not a product page)
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.purrify.ca/reviews/',
  url: 'https://www.purrify.ca/reviews/',
  name: `Customer Reviews | ${SITE_NAME}`,
  description: 'Read verified customer reviews and testimonials about Purrify activated carbon cat litter deodorizer.',
  inLanguage: 'en-CA',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
    width: 400,
    height: 400,
  },
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://www.purrify.ca/#website',
  },
};

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <PageContent />
    </>
  );
}
