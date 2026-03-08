import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

const CALCULATOR_METADATA_TITLE = 'Cat Litter Cost Calculator | Annual Cost Comparison';
const CALCULATOR_METADATA_DESCRIPTION =
  'Use this free calculator to compare annual cat litter costs across clay, crystal, tofu, wood, and natural litters and estimate savings.';

export const metadata: Metadata = {
  title: CALCULATOR_METADATA_TITLE,
  description: CALCULATOR_METADATA_DESCRIPTION,
  alternates: {
    canonical: 'https://www.purrify.ca/tools/cat-litter-calculator/',
    languages: {
      'en-CA': `${SITE_URL}/tools/cat-litter-calculator/`,
      'fr-CA': `${SITE_URL}/fr/tools/cat-litter-calculator/`,
      'x-default': `${SITE_URL}/tools/cat-litter-calculator/`,
    },
  },
  openGraph: {
    title: CALCULATOR_METADATA_TITLE,
    description: CALCULATOR_METADATA_DESCRIPTION,
    url: `${SITE_URL}/tools/cat-litter-calculator/`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/optimized/blog/frequency-hero.webp`,
        width: 1200,
        height: 630,
        alt: 'Cat Litter Cost Calculator - Compare annual costs of different litter types',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: CALCULATOR_METADATA_TITLE,
    description: CALCULATOR_METADATA_DESCRIPTION,
    images: [`${SITE_URL}/optimized/blog/frequency-hero.webp`],
  },
  keywords: [
    'cat litter calculator',
    'litter cost comparison',
    'cat litter budget',
    'annual cat litter cost',
    'cat litter savings calculator',
    'clay litter cost',
    'natural litter cost',
    'cat litter expense calculator',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
