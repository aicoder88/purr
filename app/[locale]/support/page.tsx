import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';
import SupportPageClient from '@/app/support/SupportPageClient';

interface LocalizedSupportPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedSupportPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/support/`;

  return {
    title: isFrench
      ? `Support Client - Centre d'Aide ${SITE_NAME}`
      : `Customer Support - ${SITE_NAME} Help Center`,
    description: isFrench
      ? "Besoin d'aide ? Support rapide pour commandes, expédition, retours. Email, téléphone ou WhatsApp disponibles 7 jours/semaine. Réponse sous 24 heures."
      : 'Need help? Fast support for orders, shipping, returns. Email, phone, or WhatsApp available 7 days/week. Response within 24 hours.',
    keywords: isFrench
      ? ['support client', 'centre aide', 'contact purrify', 'aide commande']
      : ['customer support', 'help center', 'contact purrify', 'order help'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/support/`,
        'fr-CA': `${baseUrl}/fr/support/`,
        'en-US': `${baseUrl}/support/`,
        'x-default': `${baseUrl}/support/`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Support Client - ${SITE_NAME}`
        : `Customer Support - ${SITE_NAME}`,
      description: isFrench
        ? 'Support rapide pour commandes, expédition, retours.'
        : 'Fast support for orders, shipping, returns.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/customer-support-hero.jpg`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Support client' : 'Customer support',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Support | ${SITE_NAME}`
        : `Support | ${SITE_NAME}`,
      description: isFrench
        ? 'Aide pour commandes et expédition.'
        : 'Help with orders and shipping.',
      images: [`${baseUrl}/customer-support-hero.jpg`],
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

export default async function LocalizedSupportPage({ params }: LocalizedSupportPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <SupportPageClient />;
}
