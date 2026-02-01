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
    canonical: '/customer/referrals',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/customer/referrals',
    title: `Your Referral Dashboard - ${SITE_NAME}`,
    description: 'Track your referral performance, manage your rewards, and share Purrify with friends.',
  },
};

export default function CustomerReferralsPage() {
  return <ReferralsPageClient />;
}
