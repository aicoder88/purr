export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `How Purrify Works - ${SITE_NAME} Activated Carbon Science`,
  description: "Discover the science behind Purrify's activated carbon technology. Learn how micropores trap odor molecules at the source for superior cat litter odor control.",
  keywords: ['how activated carbon works', 'cat litter odor control', 'activated carbon science', 'molecular adsorption', 'pet odor elimination'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/how-it-works',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/how-it-works',
      'fr-CA': 'https://www.purrify.ca/fr/learn/how-it-works',
      'zh-CN': 'https://www.purrify.ca/zh/learn/how-it-works',
      'es-US': 'https://www.purrify.ca/es/learn/how-it-works',
      'en-US': 'https://www.purrify.ca/es/learn/how-it-works',
      'x-default': 'https://www.purrify.ca/es/learn/how-it-works',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/how-it-works',
    siteName: SITE_NAME,
    title: `How Purrify Works - ${SITE_NAME} Activated Carbon Science`,
    description: "Discover the science behind Purrify's activated carbon technology.",
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/micropores_magnified_view.webp',
        width: 1200,
        height: 800,
        alt: 'How Purrify Works - Activated Carbon Science',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `How Purrify Works - ${SITE_NAME} Activated Carbon Science`,
    description: "Discover the science behind Purrify's activated carbon technology.",
    images: ['https://www.purrify.ca/optimized/micropores_magnified_view.webp'],
  },
};

// JSON-LD Schema for Article
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.purrify.ca/learn/how-it-works',
  url: 'https://www.purrify.ca/learn/how-it-works',
  inLanguage: 'en-CA',
  headline: `How Purrify Works - ${SITE_NAME} Activated Carbon Science`,
  description: "Discover the science behind Purrify's activated carbon technology. Learn how micropores trap odor molecules at the source for superior cat litter odor control.",
  image: 'https://www.purrify.ca/optimized/micropores_magnified_view.webp',
  datePublished: '2024-01-20T10:00:00Z',
  dateModified: new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: 'https://www.purrify.ca',
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
      width: 400,
      height: 400,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.purrify.ca/learn/how-it-works',
  },
  articleSection: 'Pet Care Science',
  keywords: ['how activated carbon works', 'cat litter odor control', 'activated carbon science', 'molecular adsorption', 'pet odor elimination'],
};

// Client component for the interactive parts
import HowItWorksPageClient from './HowItWorksPageClient';

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <HowItWorksPageClient />
    </>
  );
}
