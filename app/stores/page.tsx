import type { Metadata } from 'next';
import PageContent from './PageContent';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Find Purrify Near You - Store Locator | Purrify',
  description: 'Find pet stores selling Purrify near you. Discover our partner retailers across Quebec, Ontario, and British Columbia. 25+ locations across Canada.',
  keywords: ['Purrify stores', 'pet store locator', 'find Purrify', 'cat litter additive retailers', 'where to buy Purrify'],
  openGraph: {
    title: 'Find Purrify Near You - Store Locator',
    description: 'Find pet stores selling Purrify near you. Discover our partner retailers across Quebec, Ontario, and British Columbia.',
    url: 'https://www.purrify.ca/stores/',
    images: [
      {
        url: 'https://www.purrify.ca/images/purrify-logo.png/',
        width: 1200,
        height: 630,
        alt: 'Purrify Store Locator',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/stores/',
  },
  other: {
    'last-modified': '2026-02-03',
  },
};

// LocalBusiness schema for Store Locator
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `${SITE_NAME} Store Locator`,
  description: 'Find pet stores selling Purrify across Canada. 25+ retail locations in Quebec, Ontario, and British Columbia.',
  url: 'https://www.purrify.ca/stores/',
  logo: 'https://www.purrify.ca/images/purrify-logo.png',
  image: 'https://www.purrify.ca/images/purrify-logo.png',
  areaServed: [
    { '@type': 'State', name: 'Quebec' },
    { '@type': 'State', name: 'Ontario' },
    { '@type': 'State', name: 'British Columbia' },
  ],
  priceRange: '$$',
};

export default function StoresPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <PageContent />
    </>
  );
}
