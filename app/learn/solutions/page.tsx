export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';
import SolutionsPageClient from './SolutionsPageClient';

export const metadata: Metadata = {
  title: `Cat Litter Odor Solutions - Expert Guides | ${SITE_NAME}`,
  description: 'Find the right solution for your cat litter odor problem. Expert guides for ammonia smell, apartment living, multiple cats, senior cats, and more.',
  keywords: ['cat litter odor solutions', 'ammonia smell fix', 'apartment cat smell', 'multi-cat odor control', 'natural cat litter additive'],
  alternates: {
    canonical: '/learn/solutions',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/solutions',
      'fr-CA': 'https://www.purrify.ca/fr/learn/solutions',
      'zh-CN': 'https://www.purrify.ca/zh/learn/solutions',
      'es': 'https://www.purrify.ca/es/learn/solutions',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/learn/solutions',
    title: `Cat Litter Odor Solutions - Expert Guides | ${SITE_NAME}`,
    description: 'Find the right solution for your cat litter odor problem. Expert guides for ammonia smell, apartment living, multiple cats, senior cats, and more.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/ammonia-hero.png',
        width: 1200,
        height: 675,
        alt: 'Cat litter odor solutions guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
  },
};

// JSON-LD Schema for CollectionPage
const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `Cat Litter Odor Solutions - Expert Guides | ${SITE_NAME}`,
  description: 'Find the right solution for your cat litter odor problem. Expert guides for ammonia smell, apartment living, multiple cats, senior cats, and more.',
  url: 'https://www.purrify.ca/learn/solutions',
  inLanguage: 'en-CA',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://www.purrify.ca/learn/solutions/ammonia-smell-cat-litter',
        name: 'Ammonia Smell Solutions',
        description: 'That sharp ammonia smell? Learn why bacteria convert urine to ammonia gas and how activated carbon neutralizes it at the molecular level.',
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: 'https://www.purrify.ca/learn/solutions/how-to-neutralize-ammonia-cat-litter',
        name: 'How to Neutralize Ammonia',
        description: 'Step-by-step guide to neutralizing ammonia in your cat litter. Discover why baking soda fails and what actually works.',
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: 'https://www.purrify.ca/learn/solutions/apartment-cat-smell-solution',
        name: 'Apartment Cat Smell Solutions',
        description: 'Living in a small space with your cat? Specialized tips for keeping apartments fresh without overwhelming scents.',
      },
      {
        '@type': 'ListItem',
        position: 4,
        url: 'https://www.purrify.ca/learn/solutions/litter-box-smell-elimination',
        name: 'Litter Box Smell Elimination',
        description: 'Complete guide to eliminating litter box odors. From daily maintenance to deep cleaning strategies.',
      },
      {
        '@type': 'ListItem',
        position: 5,
        url: 'https://www.purrify.ca/learn/solutions/multiple-cats-odor-control',
        name: 'Multiple Cats Odor Control',
        description: 'Managing odor with multiple cats is challenging. Learn proven strategies that work for multi-cat households.',
      },
      {
        '@type': 'ListItem',
        position: 6,
        url: 'https://www.purrify.ca/learn/solutions/natural-cat-litter-additive',
        name: 'Natural Cat Litter Additives',
        description: 'Looking for natural solutions? Compare natural additives and learn which ones actually work for odor control.',
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
      item: 'https://www.purrify.ca/learn/how-it-works',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Solutions',
      item: 'https://www.purrify.ca/learn/solutions',
    },
  ],
};

export default function SolutionsPage() {
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
      <SolutionsPageClient />
    </>
  );
}
