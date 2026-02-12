export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
  description: 'Comprehensive guide to cat litter types and maintenance tips. Learn how to choose the best litter for your cat and keep it fresh longer.',
  keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/cat-litter-guide/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/cat-litter-guide',
      'fr-CA': 'https://www.purrify.ca/fr/learn/cat-litter-guide',
      'zh-CN': 'https://www.purrify.ca/zh/learn/cat-litter-guide',
      'es-US': 'https://www.purrify.ca/es/learn/cat-litter-guide',
      'en-US': 'https://www.purrify.ca/es/learn/cat-litter-guide',
      'x-default': 'https://www.purrify.ca/es/learn/cat-litter-guide',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/cat-litter-guide/',
    title: `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
    description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/litter-guide-hero-setup.webp',
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
  },
};

// JSON-LD Schema for Article
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.purrify.ca/learn/cat-litter-guide',
  url: 'https://www.purrify.ca/learn/cat-litter-guide/',
  inLanguage: 'en-CA',
  headline: `Complete Cat Litter Guide - Types, Tips & Best Practices | ${SITE_NAME}`,
  description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems. Learn how to choose the best litter for your cat and keep it fresh longer.',
  image: 'https://www.purrify.ca/optimized/litter-guide-hero-setup.webp',
  datePublished: '2024-01-01T10:00:00Z',
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
    '@id': 'https://www.purrify.ca/learn/cat-litter-guide',
  },
  articleSection: 'Pet Care Guides',
  keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
};

// Client component for the interactive parts
import CatLitterGuidePageClient from './CatLitterGuidePageClient';

export default function CatLitterGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CatLitterGuidePageClient />
    </>
  );
}
