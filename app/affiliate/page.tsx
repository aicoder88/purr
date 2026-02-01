import type { Metadata } from 'next';
import AffiliateContent from './AffiliateContent';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Purrify Affiliate Program - Earn Up to 30% Commission',
  description: 'Join the Purrify affiliate program and earn up to 30% commission promoting our activated carbon cat litter additive. Free to join with instant approval.',
  keywords: ['affiliate program', 'pet products affiliate', 'cat litter affiliate', 'earn commission', 'partner program'],
  alternates: {
    canonical: '/affiliate',
  },
  openGraph: {
    title: 'Purrify Affiliate Program - Earn Up to 30% Commission',
    description: 'Join the Purrify affiliate program and earn up to 30% commission promoting our activated carbon cat litter additive.',
    url: 'https://www.purrify.ca/affiliate',
    type: 'website',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/purrify-affiliate-program.webp',
        width: 1200,
        height: 630,
        alt: 'Purrify Affiliate Program',
      },
    ],
  },
};

export default function AffiliatePage() {
  return <AffiliateContent />;
}
