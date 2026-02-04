import type { Metadata } from 'next';
import { CONTACT_INFO, PHONE_MESSAGING, SITE_NAME } from '@/lib/constants';
import B2BClientPage from './_components/B2BClientPage';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Purrify B2B - Retail Partnership & Wholesale Canada`,
  description: 'Become a Purrify retail partner. Exclusive wholesale program for pet stores, animal boutiques, and distributors across Canada. Attractive margins and comprehensive marketing support.',
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
    canonical: '/b2b',
  },
  openGraph: {
    title: `${SITE_NAME} - Purrify B2B - Retail Partnership & Wholesale Canada`,
    description: 'Become a Purrify retail partner. Exclusive wholesale program for pet stores, animal boutiques, and distributors across Canada.',
    url: 'https://www.purrify.ca/b2b',
    type: 'website',
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
    url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
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
