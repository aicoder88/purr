export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';
import CatLitterGuidePageContent from './CatLitterGuidePageContent';

export const metadata: Metadata = {
  title: `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
  description: 'Comprehensive guide to cat litter types and maintenance tips. Learn how to choose the best litter for your cat and keep it fresh longer.',
  keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/cat-litter-guide/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/cat-litter-guide',
      'fr-CA': 'https://www.purrify.ca/fr/learn/cat-litter-guide',
      'zh-CN': 'https://www.purrify.ca/zh/learn/cat-litter-guide',
      'es-US': 'https://www.purrify.ca/es/learn/cat-litter-guide',
      'en-US': 'https://www.purrify.ca/es/learn/cat-litter-guide',
      'x-default': 'https://www.purrify.ca/es/learn/cat-litter-guide',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/cat-litter-guide/',
    siteName: SITE_NAME,
    title: `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
    description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/litter-guide-hero-setup.webp',
        width: 1600,
        height: 1067,
        alt: 'Modern cat litter box setup showing different litter types and maintenance tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
    description: 'Comprehensive guide to cat litter types and maintenance tips. Learn how to choose the best litter for your cat and keep it fresh longer.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CatLitterGuidePage() {
  return <CatLitterGuidePageContent />;
}
