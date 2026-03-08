import type { Metadata } from 'next';
import ViralContent from './ViralContent';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo/page-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'The Viral Odour Vault: Purrify Profit Report',
  description:
    'Stop guessing why your videos die in obscurity. We have dissected the Viral Anchors of the pet care world to build your profit machine.',
  path: '/viral/',
  image: `${SITE_URL}/optimized/logos/purrify-logo.png`,
  imageAlt: 'Purrify Viral Odour Vault report',
  openGraphDescription: 'Dissecting the Viral Anchors of the pet care world.',
  twitterDescription: 'Dissecting the Viral Anchors of the pet care world.',
  lastModified: '2026-01-19',
});

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
      url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
    },
  },
  datePublished: '2026-01-19',
  url: `${SITE_URL}/viral/`,
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
