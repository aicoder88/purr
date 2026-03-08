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

  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}/referral/`;

  return {
    title: `Referral Program - Give $5, Get $5 | ${SITE_NAME}`,
    description: 'Share Purrify with friends and earn rewards. Give $5 off on qualifying orders over $50 and get $5 credit after that qualifying order is paid.',
    keywords: ['purrify referral', 'referral program', 'give 5 get 5', 'rewards'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': canonicalPath,
        'en-US': canonicalPath,
        'x-default': canonicalPath,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: `Referral - Give $5, Get $5 | ${SITE_NAME}`,
      description: 'Give $5 off on qualifying orders over $50 and earn $5 credit after payment.',
      locale: 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 800,
          alt: 'Referral program',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: `Referral | ${SITE_NAME}`,
      description: 'Give $5 off on qualifying orders over $50, get $5 credit after payment.',
      images: [`${baseUrl}/optimized/logos/purrify-logo.png`],
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Locale-prefixed referral routes share the main referral page implementation.
// Keep them accessible, but canonicalize to English and exclude them from indexing.
export { default } from '@/app/referral/page';
