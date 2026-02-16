export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../../src/lib/constants';
import ApartmentCatSmellPageClient from './ApartmentCatSmellPageClient';
import { stripContext } from '../../../../src/lib/seo-utils';

const pageTitle = `Cat in a 400 Sq Ft Apartment? How to Eliminate Litter Smell Completely | ${SITE_NAME}`;
const pageDescription = 'No windows near your litter box. No ventilation. Roommates complaining. Here are 5 solutions that work in small apartments—guests will never know you have a cat.';
const canonicalUrl = 'https://www.purrify.ca/learn/solutions/apartment-cat-smell-solution/';
const heroImage = 'https://www.purrify.ca/images/apartment-hero.webp';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ['best litter for apartments with no ventilation', 'how to get rid of cat litter smell in apartment', 'odor control cat litter small apartment', 'apartment cat smell solution', 'cat litter for small spaces'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/solutions/apartment-cat-smell-solution/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/solutions/apartment-cat-smell-solution',
      'fr-CA': 'https://www.purrify.ca/fr/learn/solutions/apartment-cat-smell-solution',
      'zh-CN': 'https://www.purrify.ca/zh/learn/solutions/apartment-cat-smell-solution',
      'es-US': 'https://www.purrify.ca/es/learn/solutions/apartment-cat-smell-solution',
      'en-US': 'https://www.purrify.ca/es/learn/solutions/apartment-cat-smell-solution',
      'x-default': 'https://www.purrify.ca/es/learn/solutions/apartment-cat-smell-solution',
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
        alt: 'Modern apartment living with cats - odor-free solution',
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
    '@id': canonicalUrl,
  },
  articleSection: 'Pet Care Solutions',
  keywords: ['apartment living', 'cat odor control', 'small space solutions', 'activated carbon'],
  wordCount: 800,
};

// HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Eliminate Cat Smell in Your Apartment',
  description: 'Follow this 5-step system to keep your apartment odor-free, even with limited ventilation or small square footage.',
  totalTime: 'PT15M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Choose an optimal litter box location',
      text: 'In apartments, placement matters more than ever. Choose a spot with some airflow—bathroom with exhaust fan, near a window, or in a closet with ventilation. Avoid bedrooms and kitchens.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Use a high-quality clumping litter',
      text: 'Clumping litter isolates urine into removable clumps, preventing it from spreading through the box. This reduces the surface area producing ammonia.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add activated carbon additive',
      text: 'Sprinkle 2-3 tablespoons of activated carbon onto the litter and mix it in. For studios or apartments under 600 sq ft, consider using 3-4 tablespoons for extra protection.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Scoop twice daily in small spaces',
      text: 'In apartments, odors concentrate faster due to limited air volume. Scooping morning and evening prevents ammonia buildup between cleanings.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Refresh carbon and ventilate regularly',
      text: 'Add a tablespoon of fresh carbon every 2-3 days. Open windows when possible, and run bathroom exhaust fans during and after scooping to help clear any airborne odor.',
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
      name: 'How do I control litter box smell in a studio apartment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In studios under 500 sq ft, odor control is critical. Use activated carbon additive, scoop twice daily, and place the box in the bathroom where you can run the exhaust fan. Consider a covered box with a carbon filter. With these measures, even a 400 sq ft studio can be odor-free.",
      },
    },
    {
      '@type': 'Question',
      name: 'Will my neighbors be able to smell my cat\'s litter box?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "With proper odor control, no. Ammonia is the main odor that travels through apartment walls and hallways. Activated carbon traps ammonia molecules before they can spread. Multiple apartments in your building probably have cats you've never smelled.",
      },
    },
    {
      '@type': 'Question',
      name: 'What\'s the best litter box location for apartments with no windows?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The bathroom is ideal because exhaust fans help circulate air. If that's not possible, any area with an air vent works. Avoid closets without ventilation—they become odor chambers. A small fan near the litter box can help if no natural ventilation exists.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use air fresheners to help with apartment cat smell?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Air fresheners mask odor but don\'t eliminate it—the ammonia is still present and can bother neighbors. Worse, many cats dislike artificial fragrances and may avoid the litter box. Activated carbon eliminates odor without adding scent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should I change litter completely in a small apartment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With activated carbon and daily scooping, every 2 weeks is usually sufficient. However, in very small spaces (under 500 sq ft), you might change weekly for extra freshness. Monitor the box—if odor breaks through, change sooner.',
      },
    },
  ],
};

export default function ApartmentCatSmellSolutionPage() {
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
      <ApartmentCatSmellPageClient />
    </>
  );
}
