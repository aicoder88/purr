import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Activated Carbon Cat Litter - Purrify',
  description: 'Get expert answers about activated carbon cat litter additives: how they work, activated carbon vs baking soda comparison, usage tips, safety information, and troubleshooting. Learn why coconut shell activated carbon eliminates cat litter odors better than fragrances or baking soda.',
  keywords: [
    'activated carbon cat litter FAQ',
    'activated carbon vs baking soda',
    'coconut shell activated carbon',
    'cat litter odor control',
    'how does activated carbon work',
    'is activated carbon safe for cats',
    'cat litter deodorizer comparison',
    'natural cat litter additive',
    'ammonia odor elimination',
    'best cat litter odor control',
  ],
  alternates: {
    canonical: '/learn/faq',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/faq',
      'fr-CA': 'https://www.purrify.ca/fr/learn/faq',
      'zh-CN': 'https://www.purrify.ca/zh/learn/faq',
      'es': 'https://www.purrify.ca/es/learn/faq',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/learn/faq',
    title: 'Frequently Asked Questions About Activated Carbon Cat Litter - Purrify',
    description: 'Get expert answers about activated carbon cat litter additives: how they work, usage tips, safety information, and troubleshooting.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/replacements/cat-owner-questions-ghibli.png',
        width: 1200,
        height: 800,
        alt: 'Cat owner with questions about Purrify activated carbon cat litter additive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
  },
  other: {
    'last-modified': '2025-01-09',
  },
};

// Client component for the interactive parts
import FAQPageClient from './FAQPageClient';

export default function FAQPage() {
  return <FAQPageClient />;
}
