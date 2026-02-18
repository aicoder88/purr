export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `Is Activated Carbon Safe for Cats? | ${SITE_NAME}`,
  description: 'Comprehensive technical datasheet and safety information for Purrify Activated Carbon. Learn about certifications, specs, and safe usage guidelines.',
  keywords: ['activated carbon safety', 'pet-safe deodorizer', 'food grade carbon', 'NSF certified', 'technical specifications', 'coconut shell carbon safety'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/safety/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/safety',
      'fr-CA': 'https://www.purrify.ca/fr/learn/safety',
      'en-US': 'https://www.purrify.ca/es/learn/safety',
      'x-default': 'https://www.purrify.ca/es/learn/safety',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/safety/',
    siteName: SITE_NAME,
    title: `Is Activated Carbon Safe for Cats? | ${SITE_NAME}`,
    description: 'Comprehensive technical datasheet and safety information for Purrify Activated Carbon.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/quality-control-lab.webp',
        width: 1600,
        height: 1067,
        alt: 'Quality control laboratory testing for activated carbon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Is Activated Carbon Safe for Cats? | ${SITE_NAME}`,
    description: 'Comprehensive technical datasheet and safety information for Purrify Activated Carbon.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
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
  '@id': 'https://www.purrify.ca/learn/safety',
  url: 'https://www.purrify.ca/learn/safety/',
  inLanguage: 'en-CA',
  headline: `Is Activated Carbon Safe for Cats? | ${SITE_NAME}`,
  description: 'Comprehensive technical datasheet and safety information for Purrify Activated Carbon. Learn about certifications, specifications, and safe usage guidelines.',
  image: 'https://www.purrify.ca/optimized/quality-control-lab.webp',
  datePublished: '2024-01-10T10:00:00Z',
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
    '@id': 'https://www.purrify.ca/learn/safety',
  },
  articleSection: 'Product Safety & Specifications',
  wordCount: 2400,
  keywords: ['activated carbon safety', 'pet-safe deodorizer', 'food grade carbon', 'NSF certified', 'technical specifications'],
};

// Product schema for the activated carbon
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${SITE_NAME} Activated Carbon`,
  description: 'Premium granular activated carbon produced from sustainable coconut shell with highly microporous structure.',
  image: 'https://www.purrify.ca/optimized/activated-carbon-granules.webp',
  brand: {
    '@type': 'Brand',
    name: SITE_NAME,
  },
  material: 'Coconut Shell Activated Carbon',
  certifications: [
    'NSF/ANSI 61',
    'AWWA B604',
    'Food Chemicals Codex (FCC)',
    'Halal & Kosher',
  ],
};

// Client component for the interactive parts
import SafetyPageClient from './SafetyPageClient';

export default function SafetyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <SafetyPageClient />
    </>
  );
}
