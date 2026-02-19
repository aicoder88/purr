export const dynamic = 'force-static';

import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import TrialSizePageContent from '@/app/products/trial-size/TrialSizePageContent';
import { isValidLocale } from '@/i18n/config';

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

  const localizedPath = locale === 'en'
    ? 'https://www.purrify.ca/products/trial-size/'
    : `https://www.purrify.ca/${locale}/products/trial-size/`;

  return {
    title: 'Free Cat Litter Freshener Trial | Purrify',
    description: 'FREE Cat Litter Deodorizer Trial | Just Pay $4.76 Shipping | 87% upgrade within 7 days. ★ 4.8 rating. Ships USA & Canada. Risk-free.',
    keywords: ['cat litter freshener', 'free trial', 'charcoal litter additive', 'cat litter deodorizer', 'activated carbon trial'],
    openGraph: {
      type: 'website',
      url: localizedPath,
      siteName: 'Purrify',
      title: 'Free Cat Litter Freshener Trial | Purrify',
      description: 'FREE trial of our activated charcoal cat litter additive. Natural coconut shell carbon litter freshener eliminates ammonia odors instantly.',
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: 'https://www.purrify.ca/optimized/17g-transparent-v2.webp',
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
      title: 'Free Cat Litter Freshener Trial | Purrify',
      description: 'FREE trial of our activated charcoal cat litter additive. Natural coconut shell carbon litter freshener.',
      images: ['https://www.purrify.ca/optimized/17g-transparent-v2.webp'],
    },
    alternates: {
      canonical: localizedPath,
      languages: {
        'en-CA': 'https://www.purrify.ca/products/trial-size/',
        'fr-CA': 'https://www.purrify.ca/fr/products/trial-size/',
        'en-US': 'https://www.purrify.ca/products/trial-size/',
        'x-default': 'https://www.purrify.ca/products/trial-size/',
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
