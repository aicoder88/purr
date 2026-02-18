import type { Metadata } from 'next';
import { SITE_NAME } from '../../src/lib/constants';
import LearnPageContent from './LearnPageContent';

export const metadata: Metadata = {
  title: `Cat Litter Odor Guides & Science | ${SITE_NAME}`,
  description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify science.',
  keywords: [
    'cat litter odor control',
    'activated carbon guide',
    'how to eliminate litter box smell',
    'cat litter tips',
    'ammonia smell solutions',
    'multi-cat odor control',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/',
      'fr-CA': 'https://www.purrify.ca/fr/learn/',
      'en-US': 'https://www.purrify.ca/learn/',
      'x-default': 'https://www.purrify.ca/learn/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/learn/',
    siteName: SITE_NAME,
    title: `Cat Litter Odor Guides & Science | ${SITE_NAME}`,
    description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/micropores_magnified_view.webp',
        width: 1200,
        height: 800,
        alt: 'Learn about cat litter odor control with Purrify',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Cat Litter Odor Guides & Science | ${SITE_NAME}`,
    description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify.',
    images: ['https://www.purrify.ca/optimized/micropores_magnified_view.webp'],
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

export default function LearnPage() {
  return <LearnPageContent />;
}
