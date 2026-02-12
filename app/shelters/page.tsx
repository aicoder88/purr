import type { Metadata } from 'next';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';
import SheltersClientPage from './_components/SheltersClientPage';

export const metadata: Metadata = {
  title: `Purrify for Shelters | Partner Program | ${SITE_NAME}`,
  description: 'Exclusive program for animal shelters and rescue organizations. Volume discounts, donation matching, and support for shelters across Canada.',
  keywords: [
    'Purrify shelters',
    'activated carbon shelter',
    'shelter litter additive',
    'shelter program',
    'cat rescue donation',
    'shelter partnership',
    'animal shelter supplies',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/shelters/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/shelters/',
    siteName: SITE_NAME,
    title: `Purrify for Shelters | Partner Program | ${SITE_NAME}`,
    description: 'Exclusive program for animal shelters and rescue organizations. Volume discounts, donation matching, and support for shelters.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png/',
        width: 1200,
        height: 800,
        alt: `${SITE_NAME} for Shelters`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Purrify for Shelters | Partner Program | ${SITE_NAME}`,
    description: 'Exclusive program for animal shelters and rescue organizations. Volume discounts, donation matching, and support.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
  other: {
    'last-modified': '2025-12-26',
  },
};

// Organization schema for structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description: 'Premium activated carbon cat litter additive manufacturer offering special programs for animal shelters and rescue organizations',
  url: 'https://www.purrify.ca',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.purrify.ca/images/purrify-logo.png/',
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

export default function SheltersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SheltersClientPage />
    </>
  );
}
