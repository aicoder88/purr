import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TryFreeClient } from '@/app/try-free/TryFreeClient';
import { locales, isValidLocale } from '@/i18n/config';

interface LocalizedTryFreePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedTryFreePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  return {
    title: 'FREE Purrify Trial | Just Pay Shipping | Eliminates Odors',
    description: 'FREE Purrify Trial | Just Pay Shipping | Eliminates cat litter smell instantly with water-filter grade carbon. ★ 4.8 rating. Ships USA & Canada.',
    openGraph: {
      type: 'website',
      url: locale === 'en'
        ? 'https://www.purrify.ca/try-free/'
        : `https://www.purrify.ca/${locale}/try-free/`,
      title: 'FREE Purrify Trial | Just Pay Shipping | Eliminates Odors',
      description: 'FREE Purrify Trial | Just Pay Shipping | Eliminates cat litter smell instantly with water-filter grade carbon. ★ 4.8 rating. Ships USA & Canada.',
    },
    alternates: {
      canonical: locale === 'en'
        ? 'https://www.purrify.ca/try-free/'
        : `https://www.purrify.ca/${locale}/try-free/`,
      languages: {
        'en-CA': 'https://www.purrify.ca/try-free/',
        'fr-CA': 'https://www.purrify.ca/fr/try-free/',
        'en-US': 'https://www.purrify.ca/try-free/',
        'x-default': 'https://www.purrify.ca/try-free/',
      },
    },
  };
}

export default async function LocalizedTryFreePage({ params }: LocalizedTryFreePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <TryFreeClient />;
}
