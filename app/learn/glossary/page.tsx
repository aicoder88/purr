export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';

export const metadata: Metadata = {
  title: `Cat Litter & Activated Carbon Glossary - ${SITE_NAME}`,
  description: 'Learn key terms about activated carbon, cat litter odor control, and pet care science. Definitions of adsorption, ammonia, activated carbon, and more.',
  keywords: ['activated carbon glossary', 'cat litter terms', 'adsorption definition', 'ammonia science', 'coconut shell carbon', 'VOCs', 'pet care science'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/glossary/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/glossary',
      'fr-CA': 'https://www.purrify.ca/fr/learn/glossary',
      'en-US': 'https://www.purrify.ca/es/learn/glossary',
      'x-default': 'https://www.purrify.ca/es/learn/glossary',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/glossary/',
    siteName: SITE_NAME,
    title: `Cat Litter & Activated Carbon Glossary - ${SITE_NAME}`,
    description: 'Learn key terms about activated carbon, cat litter odor control, and pet care science.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/carbon-microscopic.webp',
        width: 1200,
        height: 800,
        alt: 'Cat Litter and Activated Carbon Glossary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Cat Litter & Activated Carbon Glossary - ${SITE_NAME}`,
    description: 'Learn key terms about activated carbon, cat litter odor control, and pet care science. Definitions of adsorption, ammonia, activated carbon, and more.',
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

// JSON-LD Schema for DefinedTermSet (Glossary)
const definedTermSetSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': 'https://www.purrify.ca/learn/glossary#glossary',
  name: 'Cat Litter and Activated Carbon Glossary',
  description: 'Comprehensive glossary of terms related to activated carbon, cat litter odor control, and pet care science.',
  url: 'https://www.purrify.ca/learn/glossary/',
};

// JSON-LD Schema for Article
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.purrify.ca/learn/glossary',
  url: 'https://www.purrify.ca/learn/glossary/',
  inLanguage: 'en-CA',
  headline: `Cat Litter & Activated Carbon Glossary - ${SITE_NAME}`,
  description: 'Learn key terms about activated carbon, cat litter odor control, and pet care science.',
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
    '@id': 'https://www.purrify.ca/learn/glossary',
  },
  articleSection: 'Pet Care Science',
  keywords: ['activated carbon glossary', 'cat litter terms', 'adsorption definition', 'ammonia science'],
};

// Speakable schema for voice search
const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `Cat Litter & Activated Carbon Glossary - ${SITE_NAME}`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.term-definition', '.term-name', '.speakable-content'],
  },
  url: 'https://www.purrify.ca/learn/glossary/',
};

// Client component for the interactive parts
import GlossaryPageClient from './GlossaryPageClient';

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <GlossaryPageClient />
    </>
  );
}
