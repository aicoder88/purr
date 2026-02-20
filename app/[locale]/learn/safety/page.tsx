import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import SafetyPageClient from '@/app/learn/safety/SafetyPageClient';

interface LocalizedSafetyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedSafetyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/learn/safety/`;

  return {
    title: isFrench
      ? `Le Carbone Actif est-il Sûr pour les Chats ? | ${SITE_NAME}`
      : `Is Activated Carbon Safe for Cats? | ${SITE_NAME}`,
    description: isFrench
      ? "Fiche technique complète et informations de sécurité pour le carbone actif Purrify. Découvrez les certifications, spécifications et lignes directrices d'utilisation sécuritaire."
      : 'Comprehensive technical datasheet and safety information for Purrify Activated Carbon. Learn about certifications, specs, and safe usage guidelines.',
    keywords: isFrench
      ? ['sécurité carbone actif', 'désodorisant sûr animaux', 'carbone qualité alimentaire', 'certifié NSF']
      : ['activated carbon safety', 'pet-safe deodorizer', 'food grade carbon', 'NSF certified'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/learn/safety/`,
        'fr-CA': `${baseUrl}/fr/learn/safety/`,
        'en-US': `${baseUrl}/learn/safety/`,
        'x-default': `${baseUrl}/learn/safety/`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Le Carbone Actif est-il Sûr pour les Chats ? | ${SITE_NAME}`
        : `Is Activated Carbon Safe for Cats? | ${SITE_NAME}`,
      description: isFrench
        ? 'Fiche technique et informations de sécurité pour le carbone actif Purrify.'
        : 'Comprehensive technical datasheet and safety information.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/marketing/quality-control-lab.webp`,
          width: 1600,
          height: 1067,
          alt: isFrench ? 'Laboratoire de contrôle qualité' : 'Quality control laboratory',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Sécurité Carbone Actif | ${SITE_NAME}`
        : `Activated Carbon Safety | ${SITE_NAME}`,
      description: isFrench
        ? 'Informations de sécurité pour le carbone actif Purrify.'
        : 'Safety information for Purrify Activated Carbon.',
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

export default async function LocalizedSafetyPage({ params }: LocalizedSafetyPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <SafetyPageClient />;
}
