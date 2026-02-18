export const dynamic = 'force-static';

import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import PageContent from '@/app/products/PageContent';
import { isValidLocale } from '@/i18n/config';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
};

interface StandardSizePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: StandardSizePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const localizedPath = locale === 'en'
    ? 'https://www.purrify.ca/products/standard/'
    : `https://www.purrify.ca/${locale}/products/standard/`;

  return {
    title: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
    description: 'Best cat litter freshener for single-cat homes. 50g activated charcoal eliminates ammonia for 4-6 weeks. Natural, works with any litter.',
    keywords: ['cat litter freshener', 'charcoal litter additive', 'cat litter deodorizer', 'odor eliminator', '50g', 'standard size'],
    openGraph: {
      type: 'website',
      url: localizedPath,
      siteName: 'Purrify',
      title: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
      description: 'Best-selling cat litter freshener for single-cat homes. 50g activated charcoal from coconut shells. Eliminates ammonia for 4-6 weeks.',
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: 'https://www.purrify.ca/optimized/60g-transparent.webp',
          width: 1200,
          height: 1200,
          alt: 'Purrify 50g Standard Size',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
      description: 'Best-selling cat litter freshener for single-cat homes. 50g activated charcoal additive from coconut shells.',
      images: ['https://www.purrify.ca/optimized/60g-transparent.webp'],
    },
    alternates: {
      canonical: localizedPath,
      languages: {
        'en-CA': 'https://www.purrify.ca/products/standard/',
        'fr-CA': 'https://www.purrify.ca/fr/products/standard/',
        'en-US': 'https://www.purrify.ca/products/standard/',
        'x-default': 'https://www.purrify.ca/products/standard/',
      },
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

export default async function StandardSizePage({ params }: StandardSizePageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <PageContent />;
}
