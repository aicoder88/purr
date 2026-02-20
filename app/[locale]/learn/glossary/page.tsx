import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import GlossaryPageClient from '@/app/learn/glossary/GlossaryPageClient';

interface LocalizedGlossaryPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedGlossaryPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/learn/glossary/`;

  return {
    title: isFrench
      ? `Glossaire Litière & Carbone Actif | ${SITE_NAME}`
      : `Cat Litter & Activated Carbon Glossary | ${SITE_NAME}`,
    description: isFrench
      ? 'Glossaire complet des termes liés à la litière pour chat et au carbone actif. Définitions claires de adsorption, micropores, BSA et plus.'
      : 'Comprehensive glossary of cat litter and activated carbon terms. Clear definitions of adsorption, micropores, BET, and more.',
    keywords: isFrench
      ? ['glossaire litière chat', 'termes carbone actif', 'définitions', 'guide vocabulaire']
      : ['cat litter glossary', 'activated carbon terms', 'definitions', 'vocabulary guide'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/learn/glossary/`,
        'fr-CA': `${baseUrl}/fr/learn/glossary/`,
        'en-US': `${baseUrl}/learn/glossary/`,
        'x-default': `${baseUrl}/learn/glossary/`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Glossaire Litière & Carbone Actif | ${SITE_NAME}`
        : `Cat Litter & Activated Carbon Glossary | ${SITE_NAME}`,
      description: isFrench
        ? 'Définitions des termes de litière et carbone actif.'
        : 'Definitions of cat litter and activated carbon terms.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Glossaire' : 'Glossary',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Glossaire | ${SITE_NAME}`
        : `Glossary | ${SITE_NAME}`,
      description: isFrench
        ? 'Termes de litière et carbone actif.'
        : 'Cat litter and activated carbon terms.',
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

export default async function LocalizedGlossaryPage({ params }: LocalizedGlossaryPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <GlossaryPageClient />;
}
