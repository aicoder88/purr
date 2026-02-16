import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LearnPageClient from '@/app/learn/LearnPageClient';
import { locales, isValidLocale } from '@/i18n/config';

interface LocalizedLearnPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedLearnPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  return {
    title: 'Cat Litter Odor Guides & Science | Purrify',
    description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify science.',
    alternates: {
      canonical: locale === 'en'
        ? 'https://www.purrify.ca/learn/'
        : `https://www.purrify.ca/${locale}/learn/`,
      languages: {
        'en-CA': 'https://www.purrify.ca/learn/',
        'fr-CA': 'https://www.purrify.ca/fr/learn/',
        'zh-CN': 'https://www.purrify.ca/zh/learn/',
        'es-US': 'https://www.purrify.ca/es/learn/',
        'en-US': 'https://www.purrify.ca/learn/',
        'x-default': 'https://www.purrify.ca/learn/',
      },
    },
  };
}

export default async function LocalizedLearnPage({ params }: LocalizedLearnPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <LearnPageClient />;
}
