export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../src/lib/constants';
import LearnPageClient from './LearnPageClient';

export const metadata: Metadata = {
  title: `Cat Litter Odor Guides & Science | ${SITE_NAME}`,
  description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify science.',
  keywords: [
    'cat litter odor control',
    'activated carbon guide',
    'how to eliminate litter box smell',
    'cat litter tips',
    'ammonia smell solutions',
    'multi-cat odor control',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/learn',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn',
      'fr-CA': 'https://www.purrify.ca/fr/learn',
      'zh-CN': 'https://www.purrify.ca/zh/learn',
      'es-US': 'https://www.purrify.ca/es/learn',
      'en-US': 'https://www.purrify.ca/learn',
      'x-default': 'https://www.purrify.ca/learn',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/learn',
    siteName: SITE_NAME,
    title: `Cat Litter Odor Guides & Science | ${SITE_NAME}`,
    description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/micropores_magnified_view.webp',
        width: 1200,
        height: 800,
        alt: 'Learn about cat litter odor control with Purrify',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Cat Litter Odor Guides & Science | ${SITE_NAME}`,
    description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify.',
    images: ['https://www.purrify.ca/optimized/micropores_magnified_view.webp'],
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

// JSON-LD Schema for CollectionPage
const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `Learn - Cat Litter Odor Control Guides & Science | ${SITE_NAME}`,
  description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover the science behind Purrify.',
  url: 'https://www.purrify.ca/learn',
  inLanguage: 'en-CA',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://www.purrify.ca/learn/how-it-works',
        name: 'How It Works',
        description: "Discover the science behind Purrify's activated carbon technology.",
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: 'https://www.purrify.ca/learn/faq',
        name: 'FAQ',
        description: 'Get answers to the most common questions about Purrify.',
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: 'https://www.purrify.ca/learn/science',
        name: 'The Science',
        description: 'Deep dive into the scientific principles behind activated carbon.',
      },
      {
        '@type': 'ListItem',
        position: 4,
        url: 'https://www.purrify.ca/learn/safety',
        name: 'Safety Information',
        description: 'Learn why Purrify is safe for cats, kittens, and humans.',
      },
      {
        '@type': 'ListItem',
        position: 5,
        url: 'https://www.purrify.ca/learn/activated-carbon-benefits',
        name: 'Activated Carbon Benefits',
        description: 'Explore all the benefits of activated carbon for cat litter odor control.',
      },
      {
        '@type': 'ListItem',
        position: 6,
        url: 'https://www.purrify.ca/learn/cat-litter-guide',
        name: 'Cat Litter Guide',
        description: 'The complete guide to choosing and using cat litter.',
      },
      {
        '@type': 'ListItem',
        position: 7,
        url: 'https://www.purrify.ca/learn/how-to-use-deodorizer',
        name: 'How to Use',
        description: 'Step-by-step instructions for getting the most out of Purrify.',
      },
      {
        '@type': 'ListItem',
        position: 8,
        url: 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
        name: 'Technology Comparison',
        description: 'See how activated carbon compares to baking soda and other deodorizers.',
      },
      {
        '@type': 'ListItem',
        position: 9,
        url: 'https://www.purrify.ca/learn/solutions',
        name: 'All Solutions',
        description: 'Targeted solutions for every cat litter odor problem.',
      },
    ],
  },
};

// Breadcrumb Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.purrify.ca',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Learn',
      item: 'https://www.purrify.ca/learn',
    },
  ],
};

export default function LearnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LearnPageClient />
    </>
  );
}
