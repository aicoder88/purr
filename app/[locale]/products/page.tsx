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
  };
}

export default async function LocalizedProductsPage({ params }: LocalizedProductsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <PageContent />;
}
