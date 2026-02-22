import type { Metadata } from 'next';
import PageContent from './PageContent';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Find Purrify Near You - Store Locator',
  description: 'Find pet stores selling Purrify near you. Discover our partner retailers across Quebec, Ontario, and British Columbia. 25+ locations across Canada.',
  keywords: ['Purrify stores', 'pet store locator', 'find Purrify', 'cat litter additive retailers', 'where to buy Purrify'],
  openGraph: {
    title: 'Find Purrify Near You - Store Locator',
    description: 'Find pet stores selling Purrify near you. Discover our partner retailers across Quebec, Ontario, and British Columbia.',
    url: 'https://www.purrify.ca/stores/',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
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

// Organization schema for Store Locator (using Organization instead of LocalBusiness since this is a digital store locator, not a physical location)
const storeLocatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.purrify.ca/stores/#webpage',
  name: `${SITE_NAME} Store Locator`,
  description: 'Find pet stores selling Purrify across Canada. 25+ retail locations in Quebec, Ontario, and British Columbia.',
  url: 'https://www.purrify.ca/stores/',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Purrify Retail Locations',
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: { '@type': 'LocalBusiness', name: 'Quebec', address: { '@type': 'PostalAddress', addressRegion: 'QC', addressCountry: 'CA' } } },
      { '@type': 'ListItem', position: 2, item: { '@type': 'LocalBusiness', name: 'Ontario', address: { '@type': 'PostalAddress', addressRegion: 'ON', addressCountry: 'CA' } } },
      { '@type': 'ListItem', position: 3, item: { '@type': 'LocalBusiness', name: 'British Columbia', address: { '@type': 'PostalAddress', addressRegion: 'BC', addressCountry: 'CA' } } },
    ]
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: 'https://www.purrify.ca/',
    logo: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phoneInternational,
      contactType: 'customer service',
      email: CONTACT_INFO.email,
    }
  }
};

export default function StoresPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeLocatorSchema) }}
      />
      <PageContent />
    </>
  );
}
