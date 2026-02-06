export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `Using Cat Litter Deodorizers with Kittens: A Care Guide | ${SITE_NAME}`,
  description: 'Guidance on introducing fragrance-free, activated carbon deodorizers around kittens: considerations, timing, and how to minimize exposure.',
  keywords: ['cat litter deodorizer kittens', 'kitten litter box safety', 'activated carbon kittens', 'cat litter additive kittens safe'],
  alternates: {
    canonical: '/learn/using-deodorizers-with-kittens',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/using-deodorizers-with-kittens',
      'fr-CA': 'https://www.purrify.ca/fr/learn/using-deodorizers-with-kittens',
      'zh-CN': 'https://www.purrify.ca/zh/learn/using-deodorizers-with-kittens',
      'es': 'https://www.purrify.ca/es/learn/using-deodorizers-with-kittens',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/using-deodorizers-with-kittens',
    title: 'Using Cat Litter Deodorizers with Kittens: A Care Guide',
    description: 'Guidance on introducing fragrance-free, activated carbon deodorizers around kittens: considerations, timing, and how to minimize exposure.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=80',
        width: 1200,
        height: 800,
        alt: 'Using cat litter deodorizers with kittens - care guide',
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
  '@id': 'https://www.purrify.ca/learn/using-deodorizers-with-kittens',
  url: 'https://www.purrify.ca/learn/using-deodorizers-with-kittens',
  inLanguage: 'en-CA',
  headline: 'Using Cat Litter Deodorizers with Kittens: A Care Guide',
  description: 'Guidance on introducing fragrance-free, activated carbon deodorizers around kittens: considerations, timing, and how to minimize exposure.',
  image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=80',
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
      url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
      width: 400,
      height: 400,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.purrify.ca/learn/using-deodorizers-with-kittens',
  },
  articleSection: 'Pet Care Education',
  keywords: ['kitten litter care', 'cat litter deodorizer kittens', 'kitten safety'],
};

// Client component for the interactive parts
import UsingDeodorizersWithKittensClient from './UsingDeodorizersWithKittensClient';

export default function UsingDeodorizersWithKittensPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <UsingDeodorizersWithKittensClient />
    </>
  );
}
