import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Read Purrify's Terms of Service, user agreements, and conditions for using our products and services.`,
  alternates: {
    canonical: 'https://www.purrify.ca/terms/',
  },
  openGraph: {
    title: `Terms of Service | ${SITE_NAME}`,
    description: `Read Purrify's Terms of Service, user agreements, and conditions for using our products and services.`,
    url: 'https://www.purrify.ca/terms/',
    type: 'website',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Terms of Service | ${SITE_NAME}`,
    description: `Read Purrify's Terms of Service, user agreements, and conditions for using our products and services.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export { default } from './TermsPageClient';
