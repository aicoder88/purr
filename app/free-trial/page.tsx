export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free Trial - Purrify',
  description: 'Get your free Purrify trial. Just pay shipping. Eliminate cat litter odors naturally with activated carbon.',
  alternates: {
    canonical: 'https://www.purrify.ca/free-trial/'/
  },
  openGraph: {
    url: '/free-trial',
    title: 'Free Trial - Purrify',
    description: 'Get your free Purrify trial. Just pay shipping.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function FreeTrialRedirectPage() {
  redirect('/try-free');
}
