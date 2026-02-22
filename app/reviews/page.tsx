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

// Product schema for Reviews page (no Review/AggregateRating schema)
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: SITE_NAME,
  description: 'Activated carbon cat litter deodorizer that eliminates odors at the molecular level',
  image: [
    'https://www.purrify.ca/optimized/products/60g-transparent.webp',
    'https://www.purrify.ca/optimized/products/140g-transparent.webp',
    'https://www.purrify.ca/optimized/logos/purrify-logo.png',
  ],
  brand: {
    '@type': 'Brand',
    name: SITE_NAME,
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

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <PageContent />
    </>
  );
}
