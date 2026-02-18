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

interface FamilyPackPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: FamilyPackPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const localizedPath = locale === 'en'
    ? 'https://www.purrify.ca/products/family-pack/'
    : `https://www.purrify.ca/${locale}/products/family-pack/`;

  return {
    title: 'Purrify Family Pack (240g) - Best Value for Multi-Cat Homes',
    description: 'Best value cat litter freshener for multi-cat homes. 240g activated charcoal provides 2 months of odor control. Natural, works with any litter.',
    keywords: ['cat litter freshener', 'family pack', 'multi-cat', 'activated charcoal', 'odor control', '240g', 'best value'],
    openGraph: {
      type: 'website',
      url: localizedPath,
      siteName: 'Purrify',
      title: 'Purrify Family Pack (240g) - Best Value for Multi-Cat Homes',
      description: 'Best value cat litter freshener for multi-cat homes. 240g activated charcoal from coconut shells. Best value per gram.',
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: 'https://www.purrify.ca/optimized/140g-640w.avif',
          width: 1200,
          height: 1200,
          alt: 'Purrify 240g Family Pack',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: 'Purrify Family Pack (240g) - Best Value for Multi-Cat Homes',
      description: 'Best value cat litter freshener for multi-cat homes. 240g activated charcoal additive.',
      images: ['https://www.purrify.ca/optimized/140g-640w.avif'],
    },
    alternates: {
      canonical: localizedPath,
      languages: {
        'en-CA': 'https://www.purrify.ca/products/family-pack/',
        'fr-CA': 'https://www.purrify.ca/fr/products/family-pack/',
        'en-US': 'https://www.purrify.ca/products/family-pack/',
        'x-default': 'https://www.purrify.ca/products/family-pack/',
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

export default async function FamilyPackPage({ params }: FamilyPackPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <PageContent />;
}
