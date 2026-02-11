import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import HospitalityClientPage from './_components/HospitalityClientPage';

export const metadata: Metadata = {
  title: `Pet-Friendly Rentals Without Smell | ${SITE_NAME}`,
  description: 'Airbnb hosts & vacation rental owners: Accept pets confidently. Purrify eliminates pet odors between guests for better reviews and more bookings.',
  keywords: [
    'pet friendly airbnb',
    'vacation rental pet odor',
    'airbnb pet policy',
    'rental property odor control',
    'pet friendly vacation rental',
    'hospitality odor solutions',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/hospitality',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/hospitality',
    siteName: SITE_NAME,
    title: `Pet-Friendly Rentals Without Smell | ${SITE_NAME}`,
    description: 'Airbnb hosts & vacation rental owners: Accept pets confidently. Purrify eliminates pet odors between guests.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: `${SITE_NAME} for Hospitality`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Pet-Friendly Rentals Without Smell | ${SITE_NAME}`,
    description: 'Airbnb hosts & vacation rental owners: Accept pets confidently. Purrify eliminates pet odors between guests.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
  other: {
    'last-modified': '2026-01-25',
  },
};

// Organization schema for structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description: 'Premium activated carbon cat litter additive for hospitality and vacation rentals',
  url: 'https://www.purrify.ca',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.purrify.ca/images/purrify-logo.png',
    width: 400,
    height: 400,
  },
  offers: {
    '@type': 'Offer',
    name: 'Hospitality Volume Program',
    description: 'Bulk ordering program for Airbnb hosts, vacation rentals, and property managers',
    category: 'B2B Hospitality Program',
  },
};

export default function HospitalityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HospitalityClientPage />
    </>
  );
}
