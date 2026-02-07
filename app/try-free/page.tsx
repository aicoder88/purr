import type { Metadata } from 'next';
import { TryFreeClient } from './TryFreeClient';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FREE Purrify Trial | Just Pay Shipping | Eliminates Odors',
  description: 'FREE Purrify Trial | Just Pay Shipping | Eliminates cat litter smell instantly with water-filter grade carbon. ★ 4.8 rating. Ships USA & Canada.',
  alternates: {
    canonical: 'https://www.purrify.ca/try-free',
  },
  keywords: ['free trial', 'cat litter freshener', 'odor eliminator sample', 'free shipping'],
  openGraph: {
    title: 'FREE Purrify Trial | Just Pay Shipping | Eliminates Odors',
    description: 'FREE Purrify Trial | Just Pay Shipping | Eliminates cat litter smell instantly with water-filter grade carbon. ★ 4.8 rating. Ships USA & Canada.',
    url: 'https://www.purrify.ca/try-free',
    siteName: SITE_NAME,
    images: [
      {
        url: 'https://www.purrify.ca/optimized/17gpink.webp',
        width: 1200,
        height: 800,
        alt: 'FREE Purrify Trial | Just Pay Shipping | Eliminates Odors',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    title: 'FREE Purrify Trial | Just Pay Shipping | Eliminates Odors',
    description: 'FREE Purrify Trial | Just Pay Shipping | Eliminates cat litter smell instantly with water-filter grade carbon. ★ 4.8 rating. Ships USA & Canada.',
    images: ['https://www.purrify.ca/optimized/17gpink.webp'],
  },
};

export default function TryFreePage() {
  return (
    <>
      <TryFreeClient />
    </>
  );
}
