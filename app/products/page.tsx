import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import PageContent from '@/app/products/PageContent';
import { locales, isValidLocale } from '@/i18n/config';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
};

interface LocalizedProductsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Map locale to OpenGraph locale format
function getOgLocale(locale: string): string {
  const localeMap: Record<string, string> = {
    'en': 'en_CA',
    'fr': 'fr_CA',
  };
  return localeMap[locale] || 'en_CA';
}

export async function generateMetadata({ params }: LocalizedProductsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const localizedPath = locale === 'en'
    ? 'https://www.purrify.ca/products/'
    : `https://www.purrify.ca/${locale}/products/`;

  return {
    title: 'Purrify Products - Activated Carbon Litter Additive',
    description: 'Shop Purrify activated carbon litter additives. Compare the trial, regular, and multi-cat options with current pricing and shipping details.',
    keywords: ['Purrify products', 'cat litter additive', 'activated carbon', 'odor control', 'trial size', 'family pack'],
    openGraph: {
      type: 'website',
      url: localizedPath,
      siteName: 'Purrify',
      title: 'Purrify Products - Activated Carbon Litter Additive',
      description: 'Compare current Purrify sizes, pricing, and shipping details for every household.',
      locale: getOgLocale(locale),
      images: [
        {
          url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
          width: 1200,
          height: 800,
          alt: 'Purrify Products',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: 'Purrify Products - Activated Carbon Litter Additive',
      description: 'Compare current Purrify sizes, pricing, and shipping details for every household.',
      images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'],
    },
    alternates: {
      canonical: localizedPath,
      languages: {
        'en-CA': 'https://www.purrify.ca/products/',
        'fr-CA': 'https://www.purrify.ca/fr/products/',
        'x-default': 'https://www.purrify.ca/products/',
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

export default async function LocalizedProductsPage({ params }: LocalizedProductsPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <PageContent />;
}
