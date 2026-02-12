export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `About Us - ${SITE_NAME}`,
  description: 'Learn about Purrify and our mission to eliminate cat litter odors naturally with activated carbon technology.',
  alternates: {
    canonical: 'https://www.purrify.ca/about/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/about/',
    siteName: SITE_NAME,
    title: `About Us - ${SITE_NAME}`,
    description: 'Learn about Purrify and our mission to eliminate cat litter odors naturally with activated carbon technology.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: `About ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `About Us - ${SITE_NAME}`,
    description: 'Learn about Purrify and our mission to eliminate cat litter odors naturally with activated carbon technology.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
};

export default function AboutRedirectPage() {
  redirect('/about/our-story');
}
