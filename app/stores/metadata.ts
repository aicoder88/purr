import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purrify Stores - Find a Retailer Near You',
  description: 'Find pet stores selling Purrify near you. Discover our partner retailers across Quebec, Ontario, and British Columbia.',
  keywords: [
    'Purrify stores',
    'pet store locator Canada',
    'where to buy Purrify',
    'cat litter deodorizer retailers',
    'pet supply stores near me',
    'Purrify dealers',
    'animal boutique Quebec',
  ],
  openGraph: {
    title: 'Purrify Stores - Find a Retailer Near You',
    description: 'Find pet stores selling Purrify near you. Discover our partner retailers across Quebec, Ontario, and British Columbia.',
    images: ['https://www.purrify.ca/optimized/logos/logo-light-pink.webp'],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/stores/'
  },
  other: {
    'geo.region': 'CA',
    'geo.placename': 'Canada',
  },
};
