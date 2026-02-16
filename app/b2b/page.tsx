import type { Metadata } from 'next';
import { CONTACT_INFO,  SITE_NAME } from '@/lib/constants';
import B2BClientPage from './_components/B2BClientPage';
export const metadata: Metadata = {
  title: `Purrify B2B Wholesale | Retail Partnerships`,
  description: 'Become a Purrify retail partner. Wholesale program for pet stores and distributors across Canada. Attractive margins and marketing support.',
  keywords: [
    'Purrify wholesale',
    'pet store wholesale Canada',
    'cat litter wholesale',
    'retail partnership program',
    'pet product distributor',
    'wholesale pet supplies',
    'B2B pet products',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/b2b/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/b2b/',
    siteName: SITE_NAME,
    title: `Purrify B2B Wholesale | Retail Partnerships`,
    description: 'Become a Purrify retail partner. Wholesale program for pet stores and distributors across Canada. Attractive margins and marketing support.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: `${SITE_NAME} B2B Wholesale`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Purrify B2B Wholesale | Retail Partnerships`,
    description: 'Become a Purrify retail partner. Wholesale program for pet stores and distributors across Canada.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
  other: {
    'last-modified': '2026-01-08',
  },
};
// Organization schema for structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description: 'Premium activated carbon cat litter additive manufacturer seeking retail partners across Canada',
  url: 'https://www.purrify.ca',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.purrify.ca/images/purrify-logo.png',
    width: 400,
    height: 400,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT_INFO.phone,
    contactType: 'sales',
    email: 'partners@purrify.ca',
  },
};
export default function B2BPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <B2BClientPage />
    </>
  );
}