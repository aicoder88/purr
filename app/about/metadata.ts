import type { Metadata } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.purrify.ca';

export const metadata: Metadata = {
  title: 'About Purrify',
  description: 'Redirecting to the Purrify company story.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${SITE_URL}/about/`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/about/`,
    title: 'About Purrify',
    description: 'Redirecting to the Purrify company story.',
  },
};
