import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, CONTACT_INFO } from '@/lib/constants';
import SellSheetClientPage from './_components/SellSheetClientPage';

export const metadata: Metadata = {
  title: `${SITE_NAME} B2B Sell Sheet - Wholesale Partner Information`,
  description: 'Download our B2B sell sheet with wholesale pricing and partnership opportunities. Perfect for retailers, veterinarians, and pet professionals.',
  keywords: ['wholesale', 'b2b', 'sell sheet', 'partner program'],
  alternates: {
    canonical: '/b2b/sell-sheet/',
  },
  openGraph: {
    title: `${SITE_NAME} B2B Sell Sheet - Wholesale Partner Information`,
    description: 'Download our B2B sell sheet with wholesale pricing and partnership opportunities. Perfect for retailers, veterinarians, and pet professionals.',
    url: `${SITE_URL}/b2b/sell-sheet`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} B2B Sell Sheet`,
      },
    ],
  },
  other: {
    'last-modified': '2026-01-23',
  },
};

// Organization + Service schema for B2B Sell Sheet
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Purrify',
      url: 'https://www.purrify.ca',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.purrify.ca/images/purrify-logo.png/',
        width: 400,
        height: 400,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phone,
        contactType: 'sales',
        email: 'partners@purrify.ca',
      },
    },
    {
      '@type': 'Service',
      name: 'Purrify B2B Sell Sheet',
      description: 'Wholesale pricing, product specifications, and partnership information for retailers',
      provider: { '@type': 'Organization', name: 'Purrify' },
      serviceType: 'B2B Documentation',
    },
  ],
};

export default function SellSheetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SellSheetClientPage />
    </>
  );
}
