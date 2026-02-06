export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import dynamicImport from 'next/dynamic';

// Dynamically import the heavy client component to reduce initial bundle size
const HospitalityClientPage = dynamicImport(
  () => import('./_components/HospitalityClientPage'),
  {
    loading: () => (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: `${SITE_NAME} - Pet-Friendly Rentals Without the Smell | Purrify for Hospitality`,
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
    canonical: '/hospitality',
  },
  openGraph: {
    title: `${SITE_NAME} - Pet-Friendly Rentals Without the Smell`,
    description: 'Airbnb hosts & vacation rental owners: Accept pets confidently. Purrify eliminates pet odors between guests.',
    url: 'https://www.purrify.ca/hospitality',
    type: 'website',
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
    url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
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
