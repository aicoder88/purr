import type { Metadata } from 'next';

import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';

interface LocalizedShippingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedShippingPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/support/shipping/`;

  return {
    title: isFrench
      ? `Informations d'Expédition - Centre d'Aide ${SITE_NAME}`
      : `Shipping Information - ${SITE_NAME} Help Center`,
    description: isFrench
      ? "Informations sur les options d'expédition Purrify, délais de livraison, coûts et suivi. Nous expédions aux USA et au Canada avec livraison rapide et fiable."
      : 'Learn about Purrify shipping options, delivery times, costs, and tracking. We ship to USA and Canada with fast, reliable delivery.',
    keywords: isFrench
      ? ['expédition', 'livraison', 'suivi', 'coûts expédition', 'expédition internationale']
      : ['shipping', 'delivery', 'tracking', 'shipping costs', 'international shipping'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/support/shipping/`,
        'fr-CA': `${baseUrl}/fr/support/shipping/`,
        'en-US': `${baseUrl}/support/shipping/`,
        'x-default': `${baseUrl}/support/shipping/`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Expédition - ${SITE_NAME}`
        : `Shipping - ${SITE_NAME}`,
      description: isFrench
        ? "Options d'expédition, délais et coûts."
        : 'Shipping options, delivery times and costs.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Expédition | ${SITE_NAME}`
        : `Shipping | ${SITE_NAME}`,
      description: isFrench
        ? 'Informations de livraison.'
        : 'Delivery information.',
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

// Re-export the English page component since content is the same
// The page will be translated later
export { default } from '@/app/support/shipping/page';
