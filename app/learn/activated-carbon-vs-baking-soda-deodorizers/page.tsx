export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `Activated Carbon vs Baking Soda: Which Works? | ${SITE_NAME}`,
  description: "Stop wasting money on baking soda. Science reveals activated carbon traps ammonia molecules while baking soda only masks odors. See test results.",
  keywords: ['does baking soda help cat litter smell', 'baking soda vs charcoal for odor', 'activated carbon cat litter deodorizer', 'baking soda cat litter comparison', 'activated carbon vs baking soda cat litter'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
      'fr-CA': 'https://www.purrify.ca/fr/learn/activated-carbon-vs-baking-soda-deodorizers',
      'zh-CN': 'https://www.purrify.ca/zh/learn/activated-carbon-vs-baking-soda-deodorizers',
      'es-US': 'https://www.purrify.ca/es/learn/activated-carbon-vs-baking-soda-deodorizers',
      'en-US': 'https://www.purrify.ca/es/learn/activated-carbon-vs-baking-soda-deodorizers',
      'x-default': 'https://www.purrify.ca/es/learn/activated-carbon-vs-baking-soda-deodorizers',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
    title: 'Baking Soda for Cat Litter? It Fails (Try This) | Purrify',
    description: "You sprinkled baking soda. Two days later, the smell's back. That's because baking soda can't trap ammonia—it just masks it.",
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/activated-carbon-vs-baking-soda-comparison.webp',
        width: 1200,
        height: 800,
        alt: 'Activated carbon vs baking soda comparison for cat litter',
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
  '@id': 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
  url: 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
  inLanguage: 'en-CA',
  headline: 'Activated Carbon vs Baking Soda Cat Litter Deodorizers: Science-Based Comparison',
  description: "Stop wasting money on baking soda. Science reveals activated carbon traps ammonia molecules while baking soda just masks odors. See the 90-day test results.",
  image: 'https://www.purrify.ca/optimized/activated-carbon-vs-baking-soda-comparison.webp',
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
    '@id': 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
  },
  articleSection: 'Pet Care Comparison',
  keywords: ['baking soda cat litter', 'activated carbon vs baking soda', 'cat litter deodorizer comparison', 'activated carbon vs baking soda cat litter'],
};

// FAQ Schema for rich snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is activated carbon or baking soda better for cat litter odor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Activated carbon is scientifically superior for cat litter odor control. Lab tests show activated carbon reduces ammonia by 92% compared to 38% for baking soda. Carbon physically traps odor molecules in microscopic pores, while baking soda only neutralizes acidic odors chemically and requires frequent reapplication.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does baking soda fail to eliminate cat litter smell?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Baking soda only neutralizes acidic odor molecules through chemical reaction. Cat urine contains multiple odor compounds including ammonia and mercaptans that baking soda cannot eliminate. Once the surface layer saturates (24-48 hours), odors escape. This is why baking soda products often add synthetic fragrances to mask remaining smells.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is activated carbon safe for cats?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, activated carbon is completely safe for cats. The same grade used in premium cat litter deodorizers is found in medical treatments for poisoning and water filtration systems. It is non-toxic, fragrance-free, biologically inert, and passes through the digestive system unchanged if ingested.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does activated carbon last in cat litter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Activated carbon remains effective for 2-4 weeks in cat litter, depending on usage. Single-cat households typically see 3-4 weeks of odor control, while multi-cat homes should expect 2-3 weeks. This is 2-3x longer than baking soda products, which typically last 1-2 weeks before requiring reapplication.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use activated carbon and baking soda together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While using both together is safe, it is usually unnecessary. Activated carbon alone handles all odor types effectively through physical adsorption. Adding baking soda provides minimal additional benefit since carbon already outperforms it for all odor compounds. Save money by using quality activated carbon instead of combining products.',
      },
    },
  ],
};

// Client component for the interactive parts
import ActivatedCarbonVsBakingSodaClient from './ActivatedCarbonVsBakingSodaClient';

export default function ActivatedCarbonVsBakingSodaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ActivatedCarbonVsBakingSodaClient />
    </>
  );
}
