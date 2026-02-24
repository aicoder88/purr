import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import { buildLanguageAlternates, getLocalizedUrl } from '@/lib/seo-utils';
import HowItWorksPageClient from '@/app/learn/how-it-works/HowItWorksPageClient';

interface LocalizedHowItWorksPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedHowItWorksPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = getLocalizedUrl('/learn/how-it-works/', locale);

  return {
    title: isFrench
      ? `Comment Fonctionne Purrify - Science du Carbone Actif | ${SITE_NAME}`
      : `How Purrify Works - ${SITE_NAME} Activated Carbon Science`,
    description: isFrench
      ? "Découvrez la science derrière la technologie du carbone actif de Purrify. Apprenez comment les micropores piègent les molécules d'odeur pour un contrôle supérieur des odeurs de litière."
      : "Discover the science behind Purrify's activated carbon technology. Learn how micropores trap odor molecules at the source for superior cat litter odor control.",
    keywords: isFrench
      ? ['comment fonctionne carbone actif', 'contrôle odeur litière', 'science carbone actif', 'adsorption moléculaire']
      : ['how activated carbon works', 'cat litter odor control', 'activated carbon science', 'molecular adsorption'],
    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(
        buildLanguageAlternates('/learn/how-it-works/').map((alt) => [alt.hrefLang, alt.href])
      ),
    },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Comment Fonctionne Purrify | ${SITE_NAME}`
        : `How Purrify Works | ${SITE_NAME}`,
      description: isFrench
        ? 'La science derrière la technologie du carbone actif.'
        : 'The science behind activated carbon technology.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/marketing/micropores-magnified-view.webp`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Vue grossie des micropores' : 'Micropores magnified view',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Comment Fonctionne Purrify | ${SITE_NAME}`
        : `How Purrify Works | ${SITE_NAME}`,
      description: isFrench
        ? 'La science du carbone actif pour la litière.'
        : 'The science of activated carbon for cat litter.',
      images: [`${baseUrl}/optimized/marketing/micropores-magnified-view.webp`],
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

export default async function LocalizedHowItWorksPage({ params }: LocalizedHowItWorksPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <HowItWorksPageClient />;
}
