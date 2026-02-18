export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `How to Use Cat Litter Deodorizer: Step Guide | ${SITE_NAME}`,
  description: 'Learn how to use activated carbon cat litter additive properly. Step-by-step instructions, common mistakes to avoid, and pro tips for maximum odor control.',
  keywords: ['how to use cat litter deodorizer', 'cat litter additive instructions', 'activated carbon how to use', 'litter box deodorizer guide', 'cat litter odor control tips'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/how-to-use-deodorizer/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/how-to-use-deodorizer',
      'fr-CA': 'https://www.purrify.ca/fr/learn/how-to-use-deodorizer',
      'en-US': 'https://www.purrify.ca/es/learn/how-to-use-deodorizer',
      'x-default': 'https://www.purrify.ca/es/learn/how-to-use-deodorizer',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/how-to-use-deodorizer/',
    title: 'How to Use Cat Litter Deodorizer: Step Guide',
    description: 'Learn how to use activated carbon cat litter additive properly. Step-by-step instructions for maximum odor control.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/cat-litter-usage-ghibli-828w.webp',
        width: 1200,
        height: 800,
        alt: 'How to use cat litter deodorizer - step by step guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
  },
};

// JSON-LD Schema for HowTo Article
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.purrify.ca/learn/how-to-use-deodorizer',
  url: 'https://www.purrify.ca/learn/how-to-use-deodorizer/',
  inLanguage: 'en-CA',
  headline: 'How to Use Cat Litter Deodorizer Additive - Complete Step-by-Step Guide',
  description: 'Learn how to use activated carbon cat litter additive properly. Step-by-step instructions for your litter box, common mistakes to avoid, and pro tips for maximum odor control.',
  image: 'https://www.purrify.ca/optimized/cat-litter-usage-ghibli-828w.webp',
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
    '@id': 'https://www.purrify.ca/learn/how-to-use-deodorizer',
  },
  articleSection: 'Pet Care Education',
  keywords: ['how to use cat litter deodorizer', 'activated carbon how to use', 'litter box guide'],
};

// HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use Activated Carbon Cat Litter Deodorizer',
  description: 'Step-by-step guide to using activated carbon litter additive for maximum odor control.',
  image: 'https://www.purrify.ca/optimized/cat-litter-usage-ghibli-828w.webp',
  totalTime: 'PT5M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'CAD',
    value: '15-25',
  },
  step: [
    {
      '@type': 'HowToStep',
      name: 'Clean the Slate',
      text: 'Start with a clean litter box. Remove all waste and clumps. If doing a deep clean, wash the box with mild soap.',
      url: 'https://www.purrify.ca/learn/how-to-use-deodorizer#step-1/',
    },
    {
      '@type': 'HowToStep',
      name: 'Precise Measurement',
      text: 'Use 1-2 tablespoons for a standard box. Multi-cat homes may need up to 3 tablespoons.',
      url: 'https://www.purrify.ca/learn/how-to-use-deodorizer#step-2/',
    },
    {
      '@type': 'HowToStep',
      name: 'Strategic Distribution',
      text: 'Sprinkle evenly across the litter surface. Corners and edges where odors concentrate benefit most.',
      url: 'https://www.purrify.ca/learn/how-to-use-deodorizer#step-3/',
    },
  ],
};

// Client component for the interactive parts
import HowToUseDeodorizerClient from './HowToUseDeodorizerClient';

export default function HowToUseDeodorizerPage() {
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
      <HowToUseDeodorizerClient />
    </>
  );
}
