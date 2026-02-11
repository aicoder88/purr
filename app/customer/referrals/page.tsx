export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import ReferralsPageClient from './ReferralsPageClient';

export const metadata: Metadata = {
  title: `Your Referral Dashboard - ${SITE_NAME}`,
  description: 'Share Purrify with friends and earn rewards. Track your referral performance, manage your rewards, and help other cat parents eliminate litter box odors.',
  keywords: [
    'referral program',
    'share Purrify',
    'referral rewards',
    'cat litter referral',
    'earn discounts',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/customer/referrals',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/customer/referrals',
    siteName: SITE_NAME,
    title: `Your Referral Dashboard - ${SITE_NAME}`,
    description: 'Track your referral performance, manage your rewards, and share Purrify with friends.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: `${SITE_NAME} Referral Dashboard`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Your Referral Dashboard - ${SITE_NAME}`,
    description: 'Track your referral performance, manage your rewards, and share Purrify with friends.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CustomerReferralsPage() {
  return <ReferralsPageClient />;
}
