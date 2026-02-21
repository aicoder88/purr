export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `The Science of Activated Carbon - ${SITE_NAME}`,
  description: 'Explore molecular science behind activated carbon. Learn how micropores, mesopores, and macropores eliminate cat litter odors at the source.',
  keywords: ['activated carbon science', 'cat litter odor control', 'micropores', 'ammonia elimination', 'mercaptan removal'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/science/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/science/',
      'fr-CA': 'https://www.purrify.ca/fr/learn/science/',
      'en-US': 'https://www.purrify.ca/learn/science/',
      'x-default': 'https://www.purrify.ca/learn/science/',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/science/',
    siteName: SITE_NAME,
    title: `The Science of Activated Carbon - ${SITE_NAME}`,
    description: 'Explore the molecular science behind activated carbon.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/blog/benefits-hero-science.webp',
        width: 1200,
        height: 800,
        alt: 'The Science of Activated Carbon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `The Science of Activated Carbon - ${SITE_NAME}`,
    description: 'Explore the molecular science behind activated carbon.',
    images: ['https://www.purrify.ca/optimized/blog/benefits-hero-science.webp'],
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

// JSON-LD Schema for Article
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.purrify.ca/learn/science',
  url: 'https://www.purrify.ca/learn/science/',
  inLanguage: 'en-CA',
  headline: `The Science of Activated Carbon - ${SITE_NAME}`,
  description: 'Explore the molecular science behind activated carbon. Learn how micropores, mesopores, and macropores work together to eliminate cat litter odors at the source.',
  image: 'https://www.purrify.ca/optimized/blog/benefits-hero-science.webp',
  datePublished: '2024-01-15T10:00:00Z',
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
      url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
      width: 400,
      height: 400,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.purrify.ca/learn/science',
  },
  articleSection: 'Pet Care Science',
  keywords: ['activated carbon science', 'cat litter odor control', 'micropores', 'ammonia elimination', 'mercaptan removal'],
  wordCount: 3200,
};

// Client component for the interactive parts
import SciencePageClient from './SciencePageClient';

export default function SciencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SciencePageClient />
    </>
  );
}
