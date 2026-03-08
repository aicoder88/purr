import type { Metadata } from 'next';
import DocumentsPageClient from './DocumentsPageClient';
import { SITE_URL } from '@/lib/constants';

const DOCUMENTS_CANONICAL_URL = `${SITE_URL}/documents/`;
const DOCUMENTS_SOCIAL_IMAGE_URL = `${SITE_URL}/optimized/logos/purr-pink-og-1200w.jpg`;
const DOCUMENTS_TITLE = 'Purrify Resource Center - Retail Training Materials';
const DOCUMENTS_DESCRIPTION = 'Access exclusive Purrify resources for retail partners: training guides, POS materials, profit calculators, and marketing assets to boost your sales.';

export const metadata: Metadata = {
  title: DOCUMENTS_TITLE,
  description: DOCUMENTS_DESCRIPTION,
  keywords: ['training materials', 'retail resources', 'staff guide', 'pos materials'],
  alternates: {
    canonical: DOCUMENTS_CANONICAL_URL,
  },
  openGraph: {
    type: 'website',
    url: DOCUMENTS_CANONICAL_URL,
    siteName: 'Purrify',
    locale: 'en_CA',
    title: DOCUMENTS_TITLE,
    description: DOCUMENTS_DESCRIPTION,
    images: [
      {
        url: DOCUMENTS_SOCIAL_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: DOCUMENTS_TITLE,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: DOCUMENTS_TITLE,
    description: DOCUMENTS_DESCRIPTION,
    images: [DOCUMENTS_SOCIAL_IMAGE_URL],
  },
  other: {
    'last-modified': '2025-11-25T10:30:00Z',
  },
};

export default function DocumentsPage() {
  return <DocumentsPageClient />;
}
