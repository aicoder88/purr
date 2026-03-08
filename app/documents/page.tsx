import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import DocumentsPageClient from './DocumentsPageClient';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { normalizeLocale } from '@/lib/seo-utils';

const DOCUMENTS_METADATA = {
  en: {
    title: 'Purrify Resource Center for Retail Partners',
    description:
      'Browse Purrify retail partner resources, including training guides, POS materials, multilingual PDFs, and seasonal assets for store teams.',
  },
  fr: {
    title: 'Centre de ressources Purrify pour detaillants',
    description:
      'Consultez les ressources Purrify pour detaillants, dont des guides de formation, du materiel PDV et des PDF multilingues pour vos equipes.',
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = normalizeLocale(await getLocale());
  const seoCopy = DOCUMENTS_METADATA[locale];
  const canonicalUrl = `${SITE_URL}/documents/`;

  return {
    title: seoCopy.title,
    description: seoCopy.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: seoCopy.title,
      description: seoCopy.description,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${SITE_URL}/optimized/products/140g.webp`,
          width: 1200,
          height: 800,
          alt: seoCopy.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoCopy.title,
      description: seoCopy.description,
      images: [`${SITE_URL}/optimized/products/140g.webp`],
    },
    other: {
      'last-modified': '2026-03-08',
    },
  };
}

export default function DocumentsPage() {
  return <DocumentsPageClient />;
}
