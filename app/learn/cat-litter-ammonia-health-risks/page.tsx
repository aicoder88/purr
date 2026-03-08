export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import {
  createBreadcrumbSchema,
  serializeSchemaGraph,
} from '@/lib/seo/indexed-content-schema';

export const metadata: Metadata = {
  title: `Is Cat Litter Ammonia Dangerous? Health Guide | ${SITE_NAME}`,
  description: "Cat litter ammonia health risks: that burning smell isn't just unpleasant. At 25+ ppm it irritates airways — here's when to worry and what actually fixes it.",
  keywords: ['cat litter ammonia health risks', 'ammonia cat litter dangerous', 'is ammonia from cat litter harmful', 'cat litter fumes dangerous', 'ammonia exposure levels ppm', 'cat litter respiratory problems', 'ammonia cat litter symptoms', 'litter box ammonia reduction', 'safe ammonia level cats', 'cat litter babies health risk', 'baking soda ammonia cat litter'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/cat-litter-ammonia-health-risks',
      'fr-CA': 'https://www.purrify.ca/fr/learn/cat-litter-ammonia-health-risks',
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
  description: "Cat litter ammonia health risks: that burning smell isn't just unpleasant. At 25+ ppm it irritates airways — here's when to worry and what actually fixes it.",
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
  keywords: ['cat litter ammonia health risks', 'ammonia exposure levels ppm', 'cat litter respiratory problems', 'ammonia cat litter dangerous', 'litter box ammonia reduction', 'safe ammonia level cats', 'baking soda ammonia myth', 'activated carbon ammonia'],
};

// Client component for the interactive parts
import CatLitterAmmoniaHealthRisksClient from './CatLitterAmmoniaHealthRisksClient';

const breadcrumbSchema = createBreadcrumbSchema('en', [
  { name: 'Home', path: '/' },
  { name: 'Learn', path: '/learn/' },
  { name: 'Cat Litter Ammonia Health Risks', path: '/learn/cat-litter-ammonia-health-risks/' },
]);

export default function CatLitterAmmoniaHealthRisksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchemaGraph(breadcrumbSchema) }}
      />
      <CatLitterAmmoniaHealthRisksClient />
    </>
  );
}
