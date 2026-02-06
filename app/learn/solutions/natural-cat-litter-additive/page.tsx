export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../../src/lib/constants';
import NaturalCatLitterAdditivePageClient from './NaturalCatLitterAdditivePageClient';

const pageTitle = `Non-Toxic Cat Litter Deodorizer: Safe for Cats, Effective for Odor | ${SITE_NAME}`;
const pageDescription = 'Looking for a non-toxic cat litter deodorizer? Activated carbon is food-grade, fragrance-free, and safe if ingested. Works 10x longer than baking soda without chemicals.';
const canonicalUrl = 'https://www.purrify.ca/learn/solutions/natural-cat-litter-additive';
const heroImage = 'https://www.purrify.ca/images/litter-box-hero.webp';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ['non-toxic cat litter deodorizer', 'safe cat litter deodorizer', 'natural litter deodorizer', 'fragrance-free cat litter', 'chemical-free cat odor control', 'pet-safe litter additive'],
  alternates: {
    canonical: '/learn/solutions/natural-cat-litter-additive',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/solutions/natural-cat-litter-additive',
      'fr-CA': 'https://www.purrify.ca/fr/learn/solutions/natural-cat-litter-additive',
      'zh-CN': 'https://www.purrify.ca/zh/learn/solutions/natural-cat-litter-additive',
      'es': 'https://www.purrify.ca/es/learn/solutions/natural-cat-litter-additive',
    },
  },
  openGraph: {
    type: 'article',
    url: canonicalUrl,
    title: pageTitle,
    description: pageDescription,
    locale: 'en_CA',
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 675,
        alt: 'Natural cat litter additive made from coconut shells',
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
  '@id': canonicalUrl,
  url: canonicalUrl,
  inLanguage: 'en-CA',
  headline: pageTitle,
  description: pageDescription,
  image: heroImage,
  datePublished: '2024-01-15T12:00:00Z',
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
    '@id': canonicalUrl,
  },
  articleSection: 'Pet Safety',
  keywords: ['non-toxic', 'cat safe', 'natural deodorizer', 'fragrance-free'],
  wordCount: 1200,
};

// HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use Non-Toxic Cat Litter Deodorizer',
  description: 'Follow these steps to safely and effectively control litter box odor without chemicals or fragrances.',
  totalTime: 'PT10M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Choose a food-grade activated carbon additive',
      text: 'Look for activated carbon made from natural sources like coconut shells. Avoid products with added fragrances, dyes, or chemical additives that could harm your cat.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Start with a clean litter box',
      text: 'Empty old litter and wash the box with mild dish soap and water. Rinse thoroughly—cats can detect soap residue and may avoid the box.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add fresh litter and sprinkle carbon on top',
      text: 'Pour 2-3 inches of your regular litter, then add 2-3 tablespoons of activated carbon. Mix it into the top layer so it contacts waste immediately.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Maintain with daily scooping',
      text: 'Scoop daily as normal. The carbon continues working between cleanings, trapping ammonia molecules as they form from bacterial breakdown of urine.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Replace completely every 2-3 weeks',
      text: 'With activated carbon, you can extend full litter changes from weekly to every 2-3 weeks. The carbon keeps odor under control longer than untreated litter.',
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
      name: 'Is activated carbon safe if my cat eats some?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, completely safe. Food-grade activated carbon is non-toxic and has been used safely in water filters, air purifiers, and even human digestive supplements. If your cat accidentally ingests small amounts during grooming, there's no health risk.",
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a cat litter deodorizer "non-toxic"?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A truly non-toxic deodorizer contains no synthetic fragrances, no chemical odor neutralizers, no artificial dyes, and no ingredients that could harm cats through skin contact, inhalation, or ingestion. Activated carbon from coconut shells meets all these criteria.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why are scented litter deodorizers harmful to cats?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Cats have 200 million scent receptors (humans have 5 million). Artificial fragrances can overwhelm their senses, cause respiratory irritation, and trigger litter box avoidance. Some scented products contain essential oils that are toxic to cats.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does activated carbon compare to baking soda for safety?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both are safe, but activated carbon is more effective. Baking soda only works for 1-2 days and can cause digestive upset if cats ingest large amounts. Activated carbon works 5-7 days and passes through safely even if ingested.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use non-toxic deodorizer with kittens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Activated carbon is safe for cats of all ages, including curious kittens who may dig in and accidentally ingest litter. Unlike chemical deodorizers, there\'s no risk of toxicity.',
      },
    },
  ],
};

export default function NaturalCatLitterAdditivePage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NaturalCatLitterAdditivePageClient />
    </>
  );
}
