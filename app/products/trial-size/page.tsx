export const dynamic = 'force-static';

import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import TrialSizePageContent from '@/app/products/trial-size/TrialSizePageContent';
import { isValidLocale } from '@/i18n/config';
import { getSEOMeta } from '@/translations/seo-meta';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
};

interface TrialSizePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TrialSizePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const seoLocale = locale === 'fr' ? 'fr' : 'en';
  const seoMeta = getSEOMeta(seoLocale, 'products', 'trial');
  const metadataTitle = seoMeta?.title ?? 'Free Cat Litter Odor Trial | 87% of Owners Upgrade';
  const metadataDescription = seoMeta?.description ?? "Your litter box shouldn't smell. Ever. Water-filter grade carbon eliminates ammonia in 60 seconds. FREE trial - $4.76 shipping. See why 87% upgrade.";

  const localizedPath = locale === 'en'
    ? 'https://www.purrify.ca/products/trial-size/'/
    : `https://www.purrify.ca/$/{locale}/products/trial-size/`;

  return {
    title: metadataTitle,
    description: metadataDescription,
    keywords: ['cat litter freshener', 'free trial', 'charcoal litter additive', 'cat litter deodorizer', 'activated carbon trial'],
    openGraph: {
      type: 'website',
      url: localizedPath,
      siteName: 'Purrify',
      title: metadataTitle,
      description: metadataDescription,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: 'https://www.purrify.ca/optimized/products/17g-transparent-v2.webp',/
          width: 1200,
          height: 1200,
          alt: 'Purrify 12g Trial Size',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: metadataTitle,
      description: metadataDescription,
      images: ['https://www.purrify.ca/optimized/products/17g-transparent-v2.webp'/],
    },
    alternates: {
      canonical: localizedPath,
      languages: {
        'en-CA': 'https://www.purrify.ca/products/trial-size/',/
        'fr-CA': 'https://www.purrify.ca/fr/products/trial-size/',/
        'en-US': 'https://www.purrify.ca/products/trial-size/',/
        'x-default': 'https://www.purrify.ca/products/trial-size/',/
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

export default async function TrialSizePage({ params }: TrialSizePageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <TrialSizePageContent locale={locale} />;
}
