export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';
import { stripContext } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: `How Does Activated Carbon Work? Science Guide | ${SITE_NAME}`,
  description: "Activated carbon traps odor molecules through adsorption. One gram has 3,000 m² surface area for maximum odor elimination power.",
  keywords: ['how does activated carbon work', 'activated carbon adsorption', 'activated carbon surface area', 'how activated carbon removes odors', 'activated carbon for cat litter', 'coconut shell activated carbon'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/how-activated-carbon-works/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/how-activated-carbon-works',
      'fr-CA': 'https://www.purrify.ca/fr/learn/how-activated-carbon-works',
      'en-US': 'https://www.purrify.ca/learn/how-activated-carbon-works',
      'x-default': 'https://www.purrify.ca/learn/how-activated-carbon-works',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/how-activated-carbon-works/',
    title: 'How Does Activated Carbon Work? Complete Science Guide',
    description: "Activated carbon traps odor molecules through adsorption—a physical process where molecules stick to its massive surface area.",
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/ammonia-science.webp',
        width: 1200,
        height: 675,
        alt: 'How activated carbon works - molecular diagram',
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
  '@id': 'https://www.purrify.ca/learn/how-activated-carbon-works',
  url: 'https://www.purrify.ca/learn/how-activated-carbon-works/',
  inLanguage: 'en-CA',
  headline: 'How Does Activated Carbon Work? Complete Science Guide',
  description: "Activated carbon traps odor molecules through adsorption—a physical process where molecules stick to its massive surface area. One gram = 3,000 m² surface. Here's exactly how it works.",
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
    '@id': 'https://www.purrify.ca/learn/how-activated-carbon-works',
  },
  articleSection: 'Science & Technology',
  keywords: ['activated carbon', 'adsorption', 'odor removal', 'surface area'],
};

// HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use Activated Carbon for Odor Control',
  description: 'Follow these steps to maximize the effectiveness of activated carbon in any odor control application.',
  image: 'https://www.purrify.ca/images/ammonia-science.webp',
  totalTime: 'PT10M',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Understand what activated carbon is',
      text: 'Activated carbon is regular carbon that has been processed at high temperatures to create millions of microscopic pores.',
    },
    {
      '@type': 'HowToStep',
      name: 'Learn about the adsorption process',
      text: 'When air passes through activated carbon, odor molecules are attracted to the carbon surface by Van der Waals forces.',
    },
    {
      '@type': 'HowToStep',
      name: 'Maximize surface area contact',
      text: 'Mix activated carbon into the top layer of litter where it will contact fresh waste.',
    },
  ],
};

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does activated carbon work to remove odors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Activated carbon removes odors through adsorption—a physical process where odor molecules stick to the carbon\'s surface. The carbon\'s massive internal surface area provides billions of binding sites where molecules like ammonia become permanently trapped.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between adsorption and absorption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Adsorption is a surface phenomenon where molecules stick to the outside of a material. Absorption means molecules are soaked up and distributed throughout a material. Activated carbon uses adsorption.',
      },
    },
  ],
};

// Client component for the interactive parts
import HowActivatedCarbonWorksClient from './HowActivatedCarbonWorksClient';

export default function HowActivatedCarbonWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              stripContext(articleSchema),
              stripContext(howToSchema),
              stripContext(faqSchema),
            ],
          }),
        }}
      />
      <HowActivatedCarbonWorksClient />
    </>
  );
}
