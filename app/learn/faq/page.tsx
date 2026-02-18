export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: 'Cat Litter Odor FAQ - Activated Carbon Questions | Purrify',
  description: 'Get expert answers about activated carbon cat litter additives: how they work, usage tips, safety, and troubleshooting. Coconut shell carbon works best.',
  keywords: [
    'activated carbon cat litter FAQ',
    'activated carbon vs baking soda',
    'coconut shell activated carbon',
    'cat litter odor control',
    'how does activated carbon work',
    'is activated carbon safe for cats',
    'cat litter deodorizer comparison',
    'natural cat litter additive',
    'ammonia odor elimination',
    'best cat litter odor control',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/faq/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/faq',
      'fr-CA': 'https://www.purrify.ca/fr/learn/faq',
      'en-US': 'https://www.purrify.ca/learn/faq',
      'x-default': 'https://www.purrify.ca/learn/faq',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/learn/faq/',
    siteName: SITE_NAME,
    title: 'Cat Litter Odor FAQ - Activated Carbon Questions | Purrify',
    description: 'Get expert answers about activated carbon cat litter additives: how they work, usage tips, safety, and troubleshooting.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/cat-owner-questions-ghibli.webp',
        width: 1200,
        height: 800,
        alt: 'Cat owner with questions about Purrify activated carbon cat litter additive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Cat Litter Odor FAQ - Activated Carbon Questions | Purrify',
    description: 'Get expert answers about activated carbon cat litter additives: how they work, usage tips, safety, and troubleshooting.',
    images: ['https://www.purrify.ca/optimized/cat-owner-questions-ghibli.webp'],
  },
  other: {
    'last-modified': '2025-01-09',
  },
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

// Client component for the interactive parts
import FAQPageClient from './FAQPageClient';

export default function FAQPage() {
  return <FAQPageClient />;
}
