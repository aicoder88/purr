import type { Metadata } from 'next';

import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';

interface LocalizedReferralPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedReferralPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca/';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/referral/`;

  return {
    title: isFrench
      ? `Programme de Parrainage - Donnez 5$, Recevez 5$ | ${SITE_NAME}`
      : `Referral Program - Give $5, Get $5 | ${SITE_NAME}`,
    description: isFrench
      ? 'Partagez Purrify avec vos amis et gagnez des récompenses. Offrez 5$ de réduction à vos amis et recevez 5$ de crédit lors de leur premier achat.'
      : 'Share Purrify with friends and earn rewards. Give $5 off to your friends and get $5 credit when they make their first purchase.',
    keywords: isFrench
      ? ['parrainage purrify', 'programme parrainage', 'donnez 5 recevez 5', 'récompenses']
      : ['purrify referral', 'referral program', 'give 5 get 5', 'rewards'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/referral/`,
        'fr-CA': `${baseUrl}/fr/referral/`,
        'en-US': `${baseUrl}/referral/`,
        'x-default': `${baseUrl}/referral/`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Parrainage - Donnez 5$, Recevez 5$ | ${SITE_NAME}`
        : `Referral - Give $5, Get $5 | ${SITE_NAME}`,
      description: isFrench
        ? 'Partagez et gagnez des récompenses.'
        : 'Share and earn rewards.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Programme de parrainage' : 'Referral program',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Parrainage | ${SITE_NAME}`
        : `Referral | ${SITE_NAME}`,
      description: isFrench
        ? 'Donnez 5$, recevez 5$.'
        : 'Give $5, get $5.',
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

// Re-export the English page component
export { default } from '@/app/referral/page';
