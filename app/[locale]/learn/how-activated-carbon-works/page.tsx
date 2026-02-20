import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import HowActivatedCarbonWorksClient from '@/app/learn/how-activated-carbon-works/HowActivatedCarbonWorksClient';

interface LocalizedHowActivatedCarbonWorksPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedHowActivatedCarbonWorksPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/learn/how-activated-carbon-works/`;

  return {
    title: isFrench
      ? `Comment Fonctionne le Carbone Actif ? Guide Scientifique | ${SITE_NAME}`
      : `How Does Activated Carbon Work? Science Guide | ${SITE_NAME}`,
    description: isFrench
      ? "Guide scientifique complet sur le fonctionnement du carbone actif. Découvrez l'adsorption, la surface spécifique et les micropores."
      : 'Comprehensive science guide on how activated carbon works. Learn about adsorption, surface area, and micropores.',
    keywords: isFrench
      ? ['comment fonctionne carbone actif', 'guide scientifique', 'adsorption', 'surface spécifique']
      : ['how does activated carbon work', 'science guide', 'adsorption', 'surface area'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/learn/how-activated-carbon-works/`,
        'fr-CA': `${baseUrl}/fr/learn/how-activated-carbon-works/`,
        'en-US': `${baseUrl}/learn/how-activated-carbon-works/`,
        'x-default': `${baseUrl}/learn/how-activated-carbon-works/`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Comment Fonctionne le Carbone Actif | ${SITE_NAME}`
        : `How Does Activated Carbon Work | ${SITE_NAME}`,
      description: isFrench
        ? 'Guide scientifique sur le carbone actif.'
        : 'Science guide on activated carbon.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Carbone actif' : 'Activated carbon',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Fonctionnement Carbone Actif | ${SITE_NAME}`
        : `Activated Carbon Works | ${SITE_NAME}`,
      description: isFrench
        ? 'Science et mécanisme du carbone actif.'
        : 'Science and mechanism of activated carbon.',
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

export default async function LocalizedHowActivatedCarbonWorksPage({ params }: LocalizedHowActivatedCarbonWorksPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <HowActivatedCarbonWorksClient />;
}
