import type { Metadata } from 'next';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';
import SheltersClientPage from './_components/SheltersClientPage';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Purrify for Shelters - Animal Shelter Partner Program`,
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
    canonical: '/shelters',
  },
  openGraph: {
    title: `${SITE_NAME} - Purrify for Shelters - Animal Shelter Partner Program`,
    description: 'Exclusive program for animal shelters and rescue organizations. Volume discounts, donation matching, and support for shelters.',
    url: 'https://www.purrify.ca/shelters',
    type: 'website',
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
