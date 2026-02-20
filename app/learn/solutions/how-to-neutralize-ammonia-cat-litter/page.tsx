export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../../src/lib/constants';
import HowToNeutralizeAmmoniaPageClient from './HowToNeutralizeAmmoniaPageClient';
import { stripContext } from '../../../../src/lib/seo-utils';

const pageTitle = `How to Neutralize Ammonia in Cat Litter (5 Methods That Actually Work) | ${SITE_NAME}`;
const pageDescription = 'Cat litter ammonia smell making you gag? Activated carbon neutralizes ammonia 10x better than baking soda. See the 5 proven methods ranked by effectiveness.';
const canonicalUrl = 'https://www.purrify.ca/learn/solutions/how-to-neutralize-ammonia-cat-litter/';
const heroImage = 'https://www.purrify.ca/optimized/blog/ammonia-hero.webp';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ['how to neutralize ammonia in cat litter', 'cat litter ammonia neutralizer', 'reduce ammonia in litter box', 'best cat litter for ammonia control', 'ammonia absorber for cat litter', 'cat urine ammonia smell'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/solutions/how-to-neutralize-ammonia-cat-litter/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/solutions/how-to-neutralize-ammonia-cat-litter',
      'fr-CA': 'https://www.purrify.ca/fr/learn/solutions/how-to-neutralize-ammonia-cat-litter',
      'en-US': 'https://www.purrify.ca/learn/solutions/how-to-neutralize-ammonia-cat-litter',
      'x-default': 'https://www.purrify.ca/learn/solutions/how-to-neutralize-ammonia-cat-litter',
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
        alt: 'How to neutralize ammonia smell in cat litter box',
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
      url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
      width: 400,
      height: 400,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': canonicalUrl,
  },
  articleSection: 'Pet Odor Solutions',
  keywords: ['ammonia neutralizer', 'cat litter ammonia', 'odor control', 'activated carbon'],
  wordCount: 1800,
};

// HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Step-by-Step: How to Neutralize Ammonia in Cat Litter',
  description: 'Follow this proven 5-step process to eliminate ammonia smell from your litter box using activated carbon.',
  totalTime: 'PT20M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Choose activated carbon as your primary solution',
      text: 'Activated carbon is the most effective ammonia neutralizer available. It traps ammonia molecules permanently through adsorption, with 92% reduction in lab tests.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Remove existing ammonia-soaked litter',
      text: 'Empty the litter box completely and dispose of old litter. Ammonia has already been released from this waste and cannot be recaptured.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Clean the box with enzyme cleaner',
      text: 'Use an enzyme-based cleaner (not bleach) to break down any urine residue in the box. Let it dry completely before adding fresh litter.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Add fresh litter with activated carbon mixed in',
      text: "Pour 2-3 inches of clean litter, then add 2-3 tablespoons of activated carbon additive. Mix thoroughly so the carbon contacts urine as soon as it's deposited.",
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Maintain with daily scooping and weekly carbon refresh',
      text: 'Scoop waste daily to remove the source of new ammonia. Add 1 tablespoon of fresh carbon every 2-3 days to maintain continuous protection.',
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
      name: 'Why does my litter box smell like ammonia even after cleaning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Ammonia forms within 2-4 hours of urination as bacteria break down urea. If you clean once daily, ammonia has already formed. Activated carbon neutralizes it continuously between cleanings, which is why it's more effective than just frequent scooping.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is the ammonia smell harmful to my cat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. High ammonia levels can irritate your cat's respiratory system, cause eye problems, and lead to litter box avoidance. Cats have sensitive noses—if you can smell it, it's overwhelming for them. Prolonged exposure can cause chronic respiratory issues.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much activated carbon should I use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a standard litter box, 2-3 tablespoons of activated carbon additive mixed into the litter is sufficient. For multi-cat households or larger boxes, use 3-4 tablespoons. Add more with each litter change or weekly top-up for best results.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does activated carbon work with all litter types?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Activated carbon additives work with clay, clumping, crystal, wood, paper, and natural litters. Simply mix it into your existing litter—no need to switch brands. The carbon works by trapping ammonia molecules regardless of litter type.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is activated carbon better than baking soda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Baking soda only provides 38% ammonia reduction and lasts 1-2 days. Activated carbon achieves 92% reduction and lasts 5-7 days. This is because carbon physically traps molecules through adsorption, while baking soda relies on a weak chemical reaction.',
      },
    },
  ],
};

export default function HowToNeutralizeAmmoniaCatLitterPage() {
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
      <HowToNeutralizeAmmoniaPageClient />
    </>
  );
}
