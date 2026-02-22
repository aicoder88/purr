import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import CatLitterGuidePageContent from '@/app/learn/cat-litter-guide/CatLitterGuidePageContent';

interface LocalizedCatLitterGuidePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedCatLitterGuidePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca/';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/learn/cat-litter-guide/`;

  return {
    title: isFrench
      ? `Guide Litière pour Chat : Types & Meilleures Pratiques | ${SITE_NAME}`
      : `Cat Litter Guide: Types & Best Practices | ${SITE_NAME}`,
    description: isFrench
      ? 'Guide complet des types de litière pour chat et conseils de maintenance. Apprenez à choisir la meilleure litière et à la garder fraîche plus longtemps.'
      : 'Comprehensive guide to cat litter types and maintenance tips. Learn how to choose the best litter for your cat and keep it fresh longer.',
    keywords: isFrench
      ? ['guide litière chat', 'types litière', 'conseils maintenance litière', 'litière agglomérante']
      : ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clumping litter'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/learn/cat-litter-guide/`,
        'fr-CA': `${baseUrl}/fr/learn/cat-litter-guide/`,
        'en-US': `${baseUrl}/learn/cat-litter-guide/`,
        'x-default': `${baseUrl}/learn/cat-litter-guide/`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Guide Litière pour Chat | ${SITE_NAME}`
        : `Cat Litter Guide | ${SITE_NAME}`,
      description: isFrench
        ? 'Guide complet des types de litière et conseils de maintenance.'
        : 'Comprehensive guide to cat litter types and maintenance.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/blog/litter-guide-hero-setup.webp`,
          width: 1600,
          height: 1067,
          alt: isFrench ? 'Configuration litière moderne' : 'Modern cat litter box setup',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Guide Litière pour Chat | ${SITE_NAME}`
        : `Cat Litter Guide | ${SITE_NAME}`,
      description: isFrench
        ? 'Types de litière et conseils de maintenance.'
        : 'Cat litter types and maintenance tips.',
      images: [`${baseUrl}/optimized/logos/purrify-logo.png`],
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

export default async function LocalizedCatLitterGuidePage({ params }: LocalizedCatLitterGuidePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <CatLitterGuidePageContent />;
}
