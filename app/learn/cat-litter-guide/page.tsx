export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import CatLitterGuidePageContent from './CatLitterGuidePageContent';

export const metadata: Metadata = {
  title: `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
  description: 'Comprehensive guide to cat litter types and maintenance tips. Learn how to choose the best litter for your cat and keep it fresh longer.',
  keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/cat-litter-guide/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/cat-litter-guide/',
      'fr-CA': 'https://www.purrify.ca/fr/learn/cat-litter-guide/',
      'en-US': 'https://www.purrify.ca/learn/cat-litter-guide/',
      'x-default': 'https://www.purrify.ca/learn/cat-litter-guide/',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/cat-litter-guide/',
    siteName: SITE_NAME,
    title: `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
    description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/blog/litter-guide-hero-setup.webp',
        width: 1600,
        height: 1067,
        alt: 'Modern cat litter box setup showing different litter types and maintenance tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
    description: 'Comprehensive guide to cat litter types and maintenance tips. Learn how to choose the best litter for your cat and keep it fresh longer.',
    images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'],
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

const guideSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://www.purrify.ca/learn/cat-litter-guide/#article',
      url: 'https://www.purrify.ca/learn/cat-litter-guide/',
      inLanguage: 'en-CA',
      headline: `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
      description: 'Comprehensive guide to cat litter types and maintenance tips. Learn how to choose the best litter for your cat and keep it fresh longer.',
      image: 'https://www.purrify.ca/optimized/blog/litter-guide-hero-setup.webp',
      datePublished: '2024-01-01T10:00:00Z',
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
        },
      },
      articleSection: 'Cat Care',
      keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.purrify.ca/' },
        { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://www.purrify.ca/learn/' },
        { '@type': 'ListItem', position: 3, name: 'Cat Litter Guide', item: 'https://www.purrify.ca/learn/cat-litter-guide/' },
      ],
    },
  ],
};

export default function CatLitterGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
      />
      <CatLitterGuidePageContent />
    </>
  );
}
