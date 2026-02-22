import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LearnPageClient from '@/app/learn/LearnPageClient';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

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

  const title = 'Cat Litter Odor Guides & Science | Purrify';
  const description = 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify science.';
  const canonicalPath = locale === 'en' ? `${SITE_URL}/learn/` : `${SITE_URL}/${locale}/learn/`;

  return {
    title,
    description,
    keywords: ['cat litter odor control', 'activated carbon guide', 'Purrify science', 'litter box tips', 'odor elimination'],
    alternates: {
      canonical: locale === 'en'
        ? 'https://www.purrify.ca/learn/'/
        : `https://www.purrify.ca/$/{locale}/learn/`,
      languages: {
        'en-CA': 'https://www.purrify.ca/learn/',/
        'fr-CA': 'https://www.purrify.ca/fr/learn/',/
        'en-US': 'https://www.purrify.ca/learn/',/
        'x-default': 'https://www.purrify.ca/learn/',/
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [{
        url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
        width: 1200,
        height: 800,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title,
      description,
      images: [`${SITE_URL}/optimized/logos/purrify-logo.png`],
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

export default async function LocalizedLearnPage({ params }: LocalizedLearnPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <LearnPageClient />;
}
