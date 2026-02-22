export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../../src/lib/constants';
import { stripContext } from '@/lib/seo-utils';
import ArmAndHammerClient from './ArmAndHammerClient';

export const metadata: Metadata = {
  title: 'Arm & Hammer Not Working? Better Alternative',
  description: "Baking soda stops working after 48 hours. It can't neutralize ammonia (same pH). Here's the science-backed alternative that lasts 3x longer.",
  keywords: [
    'Arm & Hammer alternative',
    'baking soda cat litter',
    'cat litter deodorizer',
    'activated carbon vs baking soda',
    'ammonia neutralizer',
    'cat litter smell solution',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative',
      'fr-CA': 'https://www.purrify.ca/fr/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative',
      'en-US': 'https://www.purrify.ca/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative',
      'x-default': 'https://www.purrify.ca/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/',
    title: 'Arm & Hammer Not Working? Better Alternative',
    description: "Baking soda stops working after 48 hours. It can't neutralize ammonia (same pH). Here's the science-backed alternative that lasts 3x longer.",
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/blog/activated-carbon-vs-baking-soda-comparison.webp',
        width: 1200,
        height: 630,
        alt: 'Arm & Hammer cat litter deodorizer alternative - activated carbon comparison',
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
  '@id': 'https://www.purrify.ca/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative',
  url: 'https://www.purrify.ca/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/',
  inLanguage: 'en-CA',
  headline: 'Arm & Hammer Cat Litter Deodorizer Not Working? Try This Instead',
  description: "Baking soda stops working after 48 hours. It can't neutralize ammonia (same pH). Here's the science-backed alternative that lasts 3x longer.",
  image: 'https://www.purrify.ca/optimized/blog/activated-carbon-vs-baking-soda-comparison.webp',
  datePublished: '2025-01-25T10:00:00Z',
  dateModified: new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: 'https://www.purrify.ca/',
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
    '@id': 'https://www.purrify.ca/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative',
  },
  articleSection: 'Product Comparison',
  keywords: [
    'Arm & Hammer alternative',
    'baking soda cat litter',
    'cat litter deodorizer',
    'activated carbon vs baking soda',
  ],
};

// HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Switch from Arm & Hammer to Activated Carbon',
  description: "Making the switch is simple. You don't need to change your litter or routine dramatically.",
  totalTime: 'PT5M',
  url: 'https://www.purrify.ca/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Stop adding baking soda',
      text: "You don't need to remove existing baking soda from your litter. Just stop adding more. It won't interfere with activated carbon.",
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Add activated carbon to your litter',
      text: 'Sprinkle 2-3 tablespoons of activated carbon granules onto your litter and mix it in. The black granules will distribute throughout the litter.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Refresh weekly instead of daily',
      text: 'Unlike baking soda which needs daily reapplication, activated carbon lasts 7+ days. Add a fresh tablespoon once per week to maintain peak effectiveness.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Notice the difference within 24 hours',
      text: "Most cat owners report noticeable improvement within the first day. The ammonia smell that baking soda couldn't touch will be significantly reduced or eliminated.",
    },
  ],
};

// FAQPage Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Why doesn't Arm & Hammer work for ammonia smell?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Arm & Hammer's baking soda is alkaline (pH ~8.3), and ammonia is also alkaline (pH ~11.6). Chemical neutralization requires an acid-base reaction. Since both are bases, there's no reaction—the ammonia smell remains. Baking soda only works on acidic odors, not ammonia.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Arm & Hammer cat litter deodorizer pet-friendly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Arm & Hammer products are generally safe for cats. However, scented varieties may irritate cats with respiratory sensitivities. If your cat avoids the litter box after adding scented deodorizer, switch to a fragrance-free option like activated carbon.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Arm & Hammer and activated carbon together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, they work on different odor compounds. Baking soda handles acidic odors from feces while activated carbon traps ammonia from urine. However, if you\'re using both, activated carbon does most of the heavy lifting—you may find baking soda unnecessary.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does Arm & Hammer litter deodorizer last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Arm & Hammer baking soda products typically last 24-48 hours before becoming saturated. In humid conditions or multi-cat households, effectiveness drops even faster. You'll need to reapply every 1-2 days for consistent odor control.",
      },
    },
    {
      '@type': 'Question',
      name: "What's the best alternative to Arm & Hammer for cat litter smell?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Activated carbon (especially coconut shell-based) is the most effective alternative. It has 5,750x more surface area than baking soda, traps ammonia through physical adsorption regardless of pH, and lasts 3-7x longer per application.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my litter still smell after using Arm & Hammer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The main litter box odor is ammonia from urine. Baking soda cannot neutralize ammonia because both are alkaline. The initial improvement you noticed was likely from moisture absorption slowing bacterial growth temporarily. Once saturated (24-48 hours), baking soda stops working entirely.",
      },
    },
  ],
};

export default function ArmAndHammerAlternativePage() {
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
      <ArmAndHammerClient />
    </>
  );
}
