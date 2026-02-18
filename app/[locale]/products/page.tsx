import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContent from '@/app/products/PageContent';
import { locales, isValidLocale } from '@/i18n/config';

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
    'zh': 'zh_CN',
    'es': 'es_US',
  };
  return localeMap[locale] || 'en_CA';
}

export async function generateMetadata({ params }: LocalizedProductsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const localizedPath = locale === 'en'
    ? 'https://www.purrify.ca/products/'
    : `https://www.purrify.ca/${locale}/products/`;

  return {
    title: 'Purrify Products - Activated Carbon Litter Additive',
    description: '★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly. Ships to USA & Canada. 30-day guarantee.',
    keywords: ['Purrify products', 'cat litter additive', 'activated carbon', 'odor control', 'trial size', 'family pack'],
    openGraph: {
      type: 'website',
      url: localizedPath,
      siteName: 'Purrify',
      title: 'Purrify Products - Activated Carbon Litter Additive',
      description: '★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly.',
      locale: getOgLocale(locale),
      images: [
        {
          url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
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
      description: '★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly.',
      images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
    },
    alternates: {
      canonical: localizedPath,
      languages: {
        'en-CA': 'https://www.purrify.ca/products/',
        'fr-CA': 'https://www.purrify.ca/fr/products/',
        'zh-CN': 'https://www.purrify.ca/zh/products/',
        'es-US': 'https://www.purrify.ca/es/products/',
        'en-US': 'https://www.purrify.ca/products/',
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
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <PageContent />;
}
