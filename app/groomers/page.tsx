import type { Metadata } from 'next';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';
import GroomersClientPage from './_components/GroomersClientPage';

export const metadata: Metadata = {
  title: `Purrify for Pet Groomers | Wholesale Program`,
  description: 'Pet groomers: offer more value with Purrify. Easy add-on sale, wholesale pricing, and retail display materials included.',
  keywords: [
    'pet groomer wholesale',
    'grooming salon products',
    'cat litter additive wholesale',
    'groomer retail partnership',
    'pet groomer partnership',
    'grooming supplies wholesale',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/groomers/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/groomers/',
    siteName: SITE_NAME,
    title: `Purrify for Pet Groomers | Wholesale Program`,
    description: 'Pet groomers: offer more value with Purrify. Easy add-on sale, wholesale pricing, and retail display materials included.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png/',
        width: 1200,
        height: 800,
        alt: `${SITE_NAME} for Pet Groomers`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Purrify for Pet Groomers | Wholesale Program`,
    description: 'Pet groomers: offer more value with Purrify. Easy add-on sale, wholesale pricing, and retail display materials included.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
  other: {
    'last-modified': '2026-02-03',
  },
};

// Organization schema for structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description: 'Premium activated carbon cat litter additive manufacturer offering wholesale partnership programs for pet groomers',
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

export default function GroomersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <GroomersClientPage />
    </>
  );
}
