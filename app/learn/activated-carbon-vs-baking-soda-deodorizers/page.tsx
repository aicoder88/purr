import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `Baking Soda for Cat Litter? It Fails After 48 Hours (Try This Instead) | ${SITE_NAME}`,
  description: "You sprinkled baking soda. Two days later, the smell's back. That's because baking soda can't trap ammonia—it just masks it. Activated carbon works 3x longer.",
  keywords: ['does baking soda help cat litter smell', 'baking soda vs charcoal for odor', 'activated carbon cat litter deodorizer', 'baking soda cat litter comparison'],
  alternates: {
    canonical: '/learn/activated-carbon-vs-baking-soda-deodorizers',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
      'fr-CA': 'https://www.purrify.ca/fr/learn/activated-carbon-vs-baking-soda-deodorizers',
      'zh-CN': 'https://www.purrify.ca/zh/learn/activated-carbon-vs-baking-soda-deodorizers',
      'es': 'https://www.purrify.ca/es/learn/activated-carbon-vs-baking-soda-deodorizers',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
    title: 'Baking Soda for Cat Litter? It Fails After 48 Hours (Try This Instead)',
    description: "You sprinkled baking soda. Two days later, the smell's back. That's because baking soda can't trap ammonia—it just masks it.",
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/activated-carbon-vs-baking-soda.jpg',
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
  description: "You sprinkled baking soda. Two days later, the smell's back. That's because baking soda can't trap ammonia—it just masks it. Activated carbon works 3x longer.",
  image: 'https://www.purrify.ca/images/activated-carbon-vs-baking-soda.jpg',
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
      url: 'https://www.purrify.ca/images/purrify-logo.png',
      width: 400,
      height: 400,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.purrify.ca/learn/activated-carbon-vs-baking-soda-deodorizers',
  },
  articleSection: 'Pet Care Comparison',
  keywords: ['baking soda cat litter', 'activated carbon vs baking soda', 'cat litter deodorizer comparison'],
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
      <ActivatedCarbonVsBakingSodaClient />
    </>
  );
}
