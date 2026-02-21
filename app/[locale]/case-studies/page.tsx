import type { Metadata } from 'next';

import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';

interface LocalizedCaseStudiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedCaseStudiesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/case-studies/`;

  return {
    title: isFrench
      ? `Histoires de Réussite - Résultats Clients | ${SITE_NAME}`
      : `Success Stories - Real Customer Results | ${SITE_NAME}`,
    description: isFrench
      ? "Avant/Après : Voyez comment 1000+ propriétaires de chats ont éliminé les odeurs de litière. Vraies photos, vrais résultats. '95% de réduction des odeurs en 24h'."
      : "Before & After: See how 1,000+ cat owners eliminated litter box odors. Real photos, real results. '95% odor reduction in 24 hours.'",
    keywords: isFrench
      ? ['études de cas purrify', 'histoires succès odeur chat', 'résultats clients', 'avant après']
      : ['Purrify case studies', 'cat odor success stories', 'customer results', 'before and after'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/case-studies/`,
        'fr-CA': `${baseUrl}/fr/case-studies/`,
        'en-US': `${baseUrl}/case-studies/`,
        'x-default': `${baseUrl}/case-studies/`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Histoires de Réussite | ${SITE_NAME}`
        : `Success Stories | ${SITE_NAME}`,
      description: isFrench
        ? 'Vrais résultats de clients satisfaits.'
        : 'Real results from satisfied customers.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/products/three-bags-no-bg.webp`,
          width: 1200,
          height: 630,
          alt: isFrench ? 'Histoires de réussite' : 'Customer success stories',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Réussites Clients | ${SITE_NAME}`
        : `Customer Success | ${SITE_NAME}`,
      description: isFrench
        ? 'Résultats réels de propriétaires de chats.'
        : 'Real results from cat owners.',
      images: [`${baseUrl}/optimized/products/three-bags-no-bg.webp`],
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
}

// Re-export the English page component
export { default } from '@/app/case-studies/page';
