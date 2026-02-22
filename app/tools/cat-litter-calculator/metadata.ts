import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Cat Litter Cost Calculator - Compare Litter Types & Annual Costs | ${SITE_NAME}`,
  description: 'Free cat litter cost calculator. Compare annual costs of clay, crystal, wood, tofu, and natural litters. Find out how much you spend on cat litter per year and discover ways to save.',
  alternates: {
    canonical: 'https://www.purrify.ca/tools/cat-litter-calculator/',
    languages: {
      'en-CA': `${SITE_URL}/tools/cat-litter-calculator/`,
      'fr-CA': `${SITE_URL}/fr/tools/cat-litter-calculator/`,
      'en-US': `${SITE_URL}/tools/cat-litter-calculator/`,
      'x-default': `${SITE_URL}/tools/cat-litter-calculator/`,
    },
  },
  openGraph: {
    title: 'Cat Litter Cost Calculator - Compare Litter Types & Annual...',
    description: 'Free cat litter cost calculator. Compare annual costs of clay, crystal, wood, tofu, and natural litters. Find out how much you spend on cat litter per year.',
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
    title: 'Cat Litter Cost Calculator',
    description: 'Calculate your annual cat litter costs and compare different litter types.',
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
