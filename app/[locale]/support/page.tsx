import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { CONTACT_INFO, SITE_NAME } from '@/lib/constants';
import { buildLocalizedMetadataAlternates } from '@/lib/seo-utils';
import SupportPageClient from '@/app/support/SupportPageClient';
import {
  createBreadcrumbSchema,
  createIndexedWebPageSchema,
  serializeSchemaGraph,
} from '@/lib/seo/indexed-content-schema';

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
  const alternates = buildLocalizedMetadataAlternates('/support/', locale);
  const canonicalPath = alternates.canonical;

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
    alternates,
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

  const isFrench = locale === 'fr';
  const webPageSchema = createIndexedWebPageSchema({
    locale,
    path: '/support/',
    title: isFrench
      ? `Support Client - ${SITE_NAME} Help Center`
      : `Customer Support - ${SITE_NAME} Help Center`,
    description: isFrench
      ? "Besoin d'aide ? Support rapide pour commandes, expédition, retours. Email, téléphone ou WhatsApp disponibles 7 jours/semaine. Réponse sous 24 heures."
      : 'Need help? Fast support for orders, shipping, returns. Email, phone, or WhatsApp available 7 days/week. Response within 24 hours.',
    image: 'https://www.purrify.ca/customer-support-hero.jpg',
  });

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: isFrench ? 'Accueil' : 'Home', path: '/' },
    { name: 'Support', path: '/support/' },
  ]);

  const customerServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'CustomerService',
    name: 'Purrify Customer Support',
    description: isFrench
      ? "Support rapide pour commandes, expédition, retours. Email, téléphone ou WhatsApp disponibles 7 jours/semaine."
      : 'Fast support for orders, shipping, returns. Email, phone, or WhatsApp available 7 days/week.',
    url: locale === 'fr'
      ? 'https://www.purrify.ca/fr/support/'
      : 'https://www.purrify.ca/support/',
    provider: {
      '@type': 'Organization',
      name: 'Purrify',
    },
    availableChannel: [
      {
        '@type': 'ServiceChannel',
        serviceType: 'Email Support',
        serviceSmsNumber: CONTACT_INFO.email,
      },
      {
        '@type': 'ServiceChannel',
        serviceType: 'Phone Support',
        servicePhone: CONTACT_INFO.phone,
      },
    ],
    areaServed: ['CA', 'US'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchemaGraph(webPageSchema, breadcrumbSchema, customerServiceSchema),
        }}
      />
      <SupportPageClient />
    </>
  );
}
