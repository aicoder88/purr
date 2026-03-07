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

  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}/support/shipping/`;

  return {
    title: `Shipping Information - ${SITE_NAME} Help Center`,
    description: 'Learn about Purrify shipping options, delivery times, costs, and tracking. We ship to USA and Canada with fast, reliable delivery.',
    keywords: ['shipping', 'delivery', 'tracking', 'shipping costs', 'international shipping'],
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
      title: `Shipping - ${SITE_NAME}`,
      description: 'Shipping options, delivery times and costs.',
      locale: 'en_CA',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: `Shipping | ${SITE_NAME}`,
      description: 'Delivery information.',
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

// Locale-prefixed shipping routes reuse the English body copy until translation lands.
// Keep them accessible for navigation, but out of the index and canonicalized to English.
export { default } from '@/app/support/shipping/page';
