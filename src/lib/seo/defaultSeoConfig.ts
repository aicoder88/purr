import { DefaultSeoProps } from 'next-seo';

import { SITE_NAME, SITE_DESCRIPTION } from '../constants';

const OG_LOCALE_MAP: Record<string, string> = {
  fr: 'fr_CA',
  zh: 'zh_CN',
  en: 'en_CA',
};

const getOpenGraphLocale = (locale: string | undefined): string =>
  OG_LOCALE_MAP[locale ?? 'en'] ?? OG_LOCALE_MAP.en;

export const buildDefaultSeoConfig = (locale: string | undefined, canonicalUrl: string): DefaultSeoProps => ({
  titleTemplate: `%s | ${SITE_NAME}`,
  defaultTitle: `${SITE_NAME} - Cat Litter Odor Control`,
  openGraph: {
    type: 'website',
    locale: getOpenGraphLocale(locale),
    url: canonicalUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Cat Litter Odor Control`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: 'https://www.purrify.ca/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: SITE_NAME,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@purrify',
    site: '@purrify',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'cat litter, odor control, activated carbon, cat litter additive, pet odor, cat odor elimination, natural odor control, cat care, pet supplies',
    },
    {
      name: 'author',
      content: SITE_NAME,
    },
    {
      name: 'application-name',
      content: SITE_NAME,
    },
    {
      property: 'og:site_name',
      content: SITE_NAME,
    },
    {
      name: 'apple-mobile-web-app-title',
      content: SITE_NAME,
    },
  ],
  additionalLinkTags: [{ rel: 'manifest', href: '/manifest.json' }],
});

