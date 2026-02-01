import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `Activated Carbon Litter Additive Benefits - Complete Science Guide | ${SITE_NAME}`,
  description: 'Discover how activated carbon litter additive benefits your cat and home. Learn the science behind odor elimination, safety, and why activated carbon is the best cat litter deodorizer.',
  keywords: ['activated carbon cat litter', 'activated carbon litter additive benefits', 'cat litter deodorizer', 'activated carbon odor control', 'natural cat litter odor eliminator'],
  alternates: {
    canonical: '/learn/activated-carbon-benefits',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/activated-carbon-benefits',
      'fr-CA': 'https://www.purrify.ca/fr/learn/activated-carbon-benefits',
      'zh-CN': 'https://www.purrify.ca/zh/learn/activated-carbon-benefits',
      'es': 'https://www.purrify.ca/es/learn/activated-carbon-benefits',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/activated-carbon-benefits',
    title: 'Activated Carbon Litter Additive Benefits - Complete Science Guide',
    description: 'Discover how activated carbon litter additive benefits your cat and home. Learn the science behind odor elimination and safety.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/benefits-hero-science.webp',
        width: 1200,
        height: 800,
        alt: 'Activated carbon litter additive benefits - science guide',
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
  '@id': 'https://www.purrify.ca/learn/activated-carbon-benefits',
  url: 'https://www.purrify.ca/learn/activated-carbon-benefits',
  inLanguage: 'en-CA',
  headline: 'Activated Carbon Litter Additive Benefits - Complete Science Guide',
  description: 'Discover how activated carbon litter additive benefits your cat and home. Learn the science behind odor elimination, safety, and why activated carbon is the best cat litter deodorizer.',
  image: 'https://www.purrify.ca/optimized/benefits-hero-science.webp',
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
      url: 'https://www.purrify.ca/images/purrify-logo.png',
      width: 400,
      height: 400,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.purrify.ca/learn/activated-carbon-benefits',
  },
  articleSection: 'Pet Care Education',
  keywords: ['activated carbon cat litter', 'activated carbon benefits', 'cat litter deodorizer'],
};

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is activated carbon cat litter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Activated carbon cat litter refers to litter products that contain or are enhanced with activated carbon (also called activated charcoal). This carbon has been treated to create millions of tiny pores that trap odor molecules like ammonia and hydrogen sulfide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can activated carbon be used around kittens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Activated carbon is widely used in household filtration and is fragrance-free. Many households introduce it gradually once kittens reliably use the litter box. Consult your veterinarian for specific advice about your kitten.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does activated carbon last in cat litter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Activated carbon continues working until its pores are saturated with odor molecules. In a typical litter box, this ranges from 2-4 weeks depending on usage and the number of cats.',
      },
    },
  ],
};

// HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use Activated Carbon Cat Litter Additive',
  description: 'Learn how to use activated carbon litter additive for maximum odor control in your cat litter box.',
  image: 'https://www.purrify.ca/optimized/benefits-hero-science.webp',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Sprinkle the Activated Carbon',
      text: 'Add 1-2 tablespoons of activated carbon litter additive per litter box. Sprinkle evenly across the surface of the litter.',
    },
    {
      '@type': 'HowToStep',
      name: 'Mix Into the Litter',
      text: 'Gently stir the activated carbon into your existing litter. This ensures even distribution throughout the litter box for maximum odor control.',
    },
    {
      '@type': 'HowToStep',
      name: 'Enjoy Immediate Odor Control',
      text: 'Experience immediate and long-lasting odor elimination. The activated carbon begins trapping odor molecules right away and continues working for 2-4 weeks.',
    },
  ],
};

// Client component for the interactive parts
import ActivatedCarbonBenefitsClient from './ActivatedCarbonBenefitsClient';

export default function ActivatedCarbonBenefitsPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ActivatedCarbonBenefitsClient />
    </>
  );
}
