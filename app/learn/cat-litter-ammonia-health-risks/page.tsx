export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Is Cat Litter Ammonia Dangerous? Health Guide | ${SITE_NAME}`,
  description: "That burning sensation when you scoop? That's ammonia. At high levels, it's harmful to you AND your cat. Here's when to worry—and how to fix it fast.",
  keywords: ['ammonia cat litter dangerous', 'cat litter ammonia health risks', 'is ammonia from cat litter harmful', 'cat litter fumes dangerous'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks',
      'fr-CA': 'https://www.purrify.ca/fr/learn/cat-litter-ammonia-health-risks',
      'en-US': 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks',
      'x-default': 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks/',
    title: 'Is Ammonia From Cat Litter Dangerous? Safe Levels Explained',
    description: "That burning sensation when you scoop? That's ammonia. At high levels, it's harmful to you AND your cat.",
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/blog/ammonia-hero.webp',
        width: 1200,
        height: 800,
        alt: 'Cat litter ammonia health risks - safety guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
  },
};

// JSON-LD Schema for Article
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks',
  url: 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks/',
  inLanguage: 'en-CA',
  headline: 'Is Ammonia From Cat Litter Dangerous? Safe Levels Explained',
  description: "That burning sensation when you scoop? That's ammonia. At high levels, it's harmful to you AND your cat. Here's when to worry—and how to fix it fast.",
  image: 'https://www.purrify.ca/optimized/blog/ammonia-hero.webp',
  datePublished: '2025-01-22T10:00:00Z',
  dateModified: new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: 'https://www.purrify.ca/',
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
      width: 400,
      height: 400,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks',
  },
  articleSection: 'Pet Health & Safety',
  keywords: ['ammonia cat litter', 'cat litter health risks', 'ammonia exposure safety'],
};

// Client component for the interactive parts
import CatLitterAmmoniaHealthRisksClient from './CatLitterAmmoniaHealthRisksClient';

export default function CatLitterAmmoniaHealthRisksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CatLitterAmmoniaHealthRisksClient />
    </>
  );
}
