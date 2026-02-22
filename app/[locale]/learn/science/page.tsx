import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import SciencePageClient from '@/app/learn/science/SciencePageClient';

interface LocalizedSciencePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedSciencePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca/';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/learn/science/`;

  return {
    title: isFrench
      ? `La Science du Carbone Actif | ${SITE_NAME}`
      : `The Science of Activated Carbon | ${SITE_NAME}`,
    description: isFrench
      ? "Explorez la science du carbone actif : structure microporeuse, chimie d'adsorption et applications pour le contrôle des odeurs de litière."
      : 'Explore the science of activated carbon: microporous structure, adsorption chemistry, and applications for cat litter odor control.',
    keywords: isFrench
      ? ['science carbone actif', 'structure microporeuse', 'chimie adsorption', 'carbone noix de coco']
      : ['activated carbon science', 'microporous structure', 'adsorption chemistry', 'coconut shell carbon'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/learn/science/`,
        'fr-CA': `${baseUrl}/fr/learn/science/`,
        'en-US': `${baseUrl}/learn/science/`,
        'x-default': `${baseUrl}/learn/science/`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `La Science du Carbone Actif | ${SITE_NAME}`
        : `The Science of Activated Carbon | ${SITE_NAME}`,
      description: isFrench
        ? 'La science derrière le carbone actif pour le contrôle des odeurs.'
        : 'The science behind activated carbon for odor control.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Science du carbone actif' : 'Activated carbon science',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Science du Carbone Actif | ${SITE_NAME}`
        : `Science of Activated Carbon | ${SITE_NAME}`,
      description: isFrench
        ? 'Structure microporeuse et chimie.'
        : 'Microporous structure and chemistry.',
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

export default async function LocalizedSciencePage({ params }: LocalizedSciencePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <SciencePageClient />;
}
