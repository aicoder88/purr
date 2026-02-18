export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../../src/lib/constants';
import { stripContext } from '@/lib/seo-utils';
import LitterBoxSmellPageClient from './LitterBoxSmellPageClient';

const pageTitle = `Litter Box Stinks After Cleaning? Here's Why (And How to Fix It) | ${SITE_NAME}`;
const pageDescription = 'Why does your litter box smell bad even after cleaning? Bacteria create ammonia within hours. Activated carbon traps odor molecules at the source—works 10x longer than baking soda.';
const canonicalUrl = 'https://www.purrify.ca/learn/solutions/litter-box-smell-elimination/';
const heroImage = 'https://www.purrify.ca/images/litter-box-hero.webp';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ['litter box stinks after cleaning', 'why does my litter box smell', 'litter box smell won\'t go away', 'cat litter smells bad after cleaning', 'how to stop litter box smell', 'activated carbon cat litter'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/solutions/litter-box-smell-elimination/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/solutions/litter-box-smell-elimination',
      'fr-CA': 'https://www.purrify.ca/fr/learn/solutions/litter-box-smell-elimination',
      'en-US': 'https://www.purrify.ca/es/learn/solutions/litter-box-smell-elimination',
      'x-default': 'https://www.purrify.ca/es/learn/solutions/litter-box-smell-elimination',
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
        alt: 'Complete litter box odor elimination solution',
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
  articleSection: 'Pet Odor Solutions',
  keywords: ['litter box odor', 'smell elimination', 'activated carbon', 'natural solutions'],
  wordCount: 900,
};

// HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Stop Your Litter Box From Smelling After Cleaning',
  description: 'Follow these 5 steps to eliminate persistent litter box odor and keep your home fresh between cleanings.',
  totalTime: 'PT15M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Empty and clean the litter box completely',
      text: 'Remove all old litter and wash the box with mild soap and water. Avoid harsh chemicals that can leave residue or odors cats dislike.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Let the box dry completely',
      text: 'Moisture trapped under litter accelerates bacterial growth and ammonia production. Ensure the box is fully dry before adding fresh litter.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add 2-3 inches of fresh litter',
      text: "Pour clean litter to the recommended depth. Too little litter means odors aren't absorbed; too much is wasteful.",
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Sprinkle activated carbon additive on top',
      text: 'Add 2-3 tablespoons of Purrify activated carbon and mix it into the top layer. The carbon begins trapping odor molecules immediately.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Scoop daily and refresh carbon weekly',
      text: 'Daily scooping removes waste before ammonia forms. Add a tablespoon of Purrify every few days to maintain odor control between full changes.',
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
      name: 'Why does my litter box smell even after I just cleaned it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bacteria convert urea in cat urine to ammonia gas within 2-4 hours. Even with daily scooping, ammonia has already formed. The smell you notice isn't from visible waste—it's ammonia that's been released into the air. Activated carbon traps these molecules continuously between cleanings.",
      },
    },
    {
      '@type': 'Question',
      name: 'How often should I completely change the litter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With regular scooping and activated carbon additive, you can extend full litter changes to every 2-3 weeks instead of weekly. The carbon continues neutralizing odors, keeping litter fresher longer and reducing waste.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will activated carbon change my cat\'s litter box behavior?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. Activated carbon is odorless and has a similar texture to litter. Unlike scented additives that can cause litter box avoidance, cats don't notice the carbon. Many cats actually prefer the cleaner environment.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is activated carbon safe if my cat ingests some?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Food-grade activated carbon is non-toxic and has been safely used in water filtration and even human supplements. Small amounts accidentally ingested during grooming pose no health risk to cats.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use activated carbon with any type of litter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Activated carbon works with clay, clumping, crystal, wood, paper, corn, and wheat litters. Simply mix it into your existing litter—no need to switch brands or types.',
      },
    },
  ],
};

export default function LitterBoxSmellEliminationPage() {
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
      <LitterBoxSmellPageClient />
    </>
  );
}
