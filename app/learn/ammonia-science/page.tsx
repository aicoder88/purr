import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `Why Cat Urine Smells Like Ammonia (The Chemistry + How to Stop It) | ${SITE_NAME}`,
  description: "Bacteria convert urea to ammonia gas within 2-4 hours. By hour 24, it's unbearable. Here's the chemistry behind the stink—and how to break the cycle.",
  keywords: ['why cat urine smells like ammonia', 'cat pee ammonia smell', 'urea to ammonia', 'cat litter ammonia science', 'why cat litter smells', 'ammonia from cat urine'],
  alternates: {
    canonical: '/learn/ammonia-science',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/ammonia-science',
      'fr-CA': 'https://www.purrify.ca/fr/learn/ammonia-science',
      'zh-CN': 'https://www.purrify.ca/zh/learn/ammonia-science',
      'es': 'https://www.purrify.ca/es/learn/ammonia-science',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/ammonia-science',
    title: `Why Cat Urine Smells Like Ammonia (The Chemistry + How to Stop It) | ${SITE_NAME}`,
    description: "Bacteria convert urea to ammonia gas within 2-4 hours. Here's the chemistry behind the stink—and how to break the cycle.",
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/ammonia-science.webp',
        width: 1200,
        height: 675,
        alt: 'The science of ammonia production in cat litter',
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
  '@id': 'https://www.purrify.ca/learn/ammonia-science',
  url: 'https://www.purrify.ca/learn/ammonia-science',
  inLanguage: 'en-CA',
  headline: `Why Cat Urine Smells Like Ammonia (The Chemistry + How to Stop It) | ${SITE_NAME}`,
  description: "Bacteria convert urea to ammonia gas within 2-4 hours. By hour 24, it's unbearable. Here's the chemistry behind the stink—and how to break the cycle.",
  image: 'https://www.purrify.ca/images/ammonia-science.webp',
  datePublished: '2024-01-20T12:00:00Z',
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
    '@id': 'https://www.purrify.ca/learn/ammonia-science',
  },
  articleSection: 'Pet Science',
  wordCount: 2000,
  keywords: ['ammonia', 'cat urine', 'urea', 'bacteria', 'odor science'],
};

// HowTo schema for the ammonia reduction steps
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Reduce Ammonia in Your Litter Box',
  description: 'Follow these steps to minimize ammonia production and keep your home smelling fresh.',
  totalTime: 'PT15M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'CAD',
    value: '0',
  },
  step: [
    {
      '@type': 'HowToStep',
      name: 'Understand the timeline',
      text: 'Ammonia production begins 2-4 hours after urination as bacteria colonize the urine. The smell intensifies over 24-48 hours as more urea is converted.',
      tip: 'This is why daily scooping is critical—remove waste before ammonia peaks.',
    },
    {
      '@type': 'HowToStep',
      name: 'Remove urine quickly',
      text: 'Scoop urine clumps as soon as possible after your cat uses the litter box. The less time bacteria have to work, the less ammonia is produced.',
    },
    {
      '@type': 'HowToStep',
      name: 'Control moisture and temperature',
      text: 'Bacteria thrive in warm, moist conditions. Keep litter boxes in cool, well-ventilated areas and use litter that clumps well to isolate moisture.',
    },
    {
      '@type': 'HowToStep',
      name: 'Add activated carbon',
      text: 'Activated carbon traps ammonia molecules as they\'re released, preventing them from reaching your nose. Add 2-3 tablespoons to your litter and refresh weekly.',
    },
    {
      '@type': 'HowToStep',
      name: 'Deep clean regularly',
      text: 'Empty and wash the litter box with enzyme cleaner every 1-2 weeks. This removes bacterial colonies that produce ammonia even without fresh urine.',
      tip: 'Never use bleach—it reacts with ammonia to create toxic chloramine gas.',
    },
  ],
};

// Client component for the interactive parts
import AmmoniaSciencePageClient from './AmmoniaSciencePageClient';

export default function AmmoniaSciencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <AmmoniaSciencePageClient />
    </>
  );
}
