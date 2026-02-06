export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import PortalPageClient from './PortalPageClient';

export const metadata: Metadata = {
  title: `Customer Portal - Manage Orders & Subscriptions | ${SITE_NAME}`,
  description: 'Access your Purrify customer portal to track orders, manage subscriptions, and update your account information. Easy order tracking and subscription management.',
  keywords: [
    'customer portal',
    'order tracking',
    'subscription management',
    'Purrify account',
    'customer service',
  ],
  alternates: {
    canonical: '/customer/portal',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/customer/portal',
    title: `Customer Portal - Manage Orders & Subscriptions | ${SITE_NAME}`,
    description: 'Access your Purrify customer portal to track orders, manage subscriptions, and update your account information.',
  },
};

export default function CustomerPortalPage() {
  return <PortalPageClient />;
}
