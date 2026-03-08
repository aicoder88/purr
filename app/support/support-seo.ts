import type { Metadata } from 'next';
import { CONTACT_INFO, SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { buildLocalizedMetadataAlternates } from '@/lib/seo-utils';

export const SUPPORT_SOCIAL_IMAGE = `${SITE_URL}/optimized/blog/happy-cat-home-1200w.jpg`;
export const SUPPORT_LAST_MODIFIED = '2026-03-08';

type SupportedLocale = 'en' | 'fr';

const SUPPORT_COPY = {
  en: {
    title: `Customer Support - ${SITE_NAME} Help Center`,
    description:
      'Need help? Fast support for orders, shipping, returns. Email and phone support available for customers in Canada and the United States.',
    shortDescription: 'Need help? Fast support for orders, shipping, and returns across Canada and the United States.',
    imageAlt: `Customer Support - ${SITE_NAME} Help Center`,
  },
  fr: {
    title: `Support Client - Centre d'Aide ${SITE_NAME}`,
    description:
      "Besoin d'aide ? Support rapide pour commandes, expédition et retours. Support par courriel et téléphone pour les clients du Canada et des États-Unis.",
    shortDescription:
      "Besoin d'aide ? Support rapide pour commandes, expédition et retours au Canada et aux États-Unis.",
    imageAlt: `Support client - ${SITE_NAME}`,
  },
} satisfies Record<SupportedLocale, {
  title: string;
  description: string;
  shortDescription: string;
  imageAlt: string;
}>;

export function getSupportCopy(locale: SupportedLocale = 'en') {
  return SUPPORT_COPY[locale];
}

export function getSupportMetadata(locale: SupportedLocale = 'en'): Metadata {
  const copy = getSupportCopy(locale);
  const path = locale === 'fr' ? '/fr/support/' : '/support/';
  const alternates = locale === 'fr'
    ? buildLocalizedMetadataAlternates('/support/', 'fr')
    : {
      canonical: `${SITE_URL}/support/`,
      languages: {
        'en-CA': `${SITE_URL}/support/`,
        'fr-CA': `${SITE_URL}/fr/support/`,
        'en-US': `${SITE_URL}/support/`,
        'x-default': `${SITE_URL}/support/`,
      },
    };

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    path,
    alternates,
    image: SUPPORT_SOCIAL_IMAGE,
    imageAlt: copy.imageAlt,
    keywords:
      locale === 'fr'
        ? ['support client', 'centre aide', 'contact purrify', 'aide commande']
        : ['customer support', 'help center', 'contact purrify', 'order help'],
    openGraphLocale: locale === 'fr' ? 'fr_CA' : 'en_CA',
    openGraphDescription: copy.shortDescription,
    twitterTitle: locale === 'fr' ? `Support | ${SITE_NAME}` : `Support | ${SITE_NAME}`,
    twitterDescription: locale === 'fr' ? 'Aide pour commandes, expédition et retours.' : 'Help with orders, shipping, and returns.',
    lastModified: SUPPORT_LAST_MODIFIED,
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
  });
}

export function createCustomerServiceSchema(locale: SupportedLocale = 'en') {
  const copy = getSupportCopy(locale);
  const url = locale === 'fr' ? `${SITE_URL}/fr/support/` : `${SITE_URL}/support/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CustomerService',
    name: 'Purrify Customer Support',
    description: copy.shortDescription,
    url,
    image: SUPPORT_SOCIAL_IMAGE,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    contactType: 'customer support',
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phoneInternational,
    availableLanguage: ['en-CA', 'fr-CA'],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Canada',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
    ],
  };
}
