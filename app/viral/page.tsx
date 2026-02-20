import type { Metadata } from 'next';
import ViralContent from './ViralContent';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'The Viral Odour Vault: Purrify Profit Report',
  description: 'Stop guessing why your videos die in obscurity. We have dissected the Viral Anchors of the pet care world to build your profit machine.',
  alternates: {
    canonical: 'https://www.purrify.ca/viral/'
  },
  openGraph: {
    url: '/viral',
    title: 'The Viral Odour Vault: Purrify Profit Report',
    description: 'Dissecting the Viral Anchors of the pet care world.',
  },
  other: {
    'last-modified': '2026-01-19',
  },
};

// Article schema for Viral Report
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Viral Odour Vault: Purrify Profit Report',
  description: 'Stop guessing why your videos die in obscurity. We have dissected the Viral Anchors of the pet care world.',
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
    },
  },
  datePublished: '2026-01-19',
  url: 'https://www.purrify.ca/viral/',
};

export default function ViralReportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ViralContent />
    </>
  );
}
