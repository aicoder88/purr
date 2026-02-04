import type { Metadata } from 'next';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';
import CatCafesClientPage from './_components/CatCafesClientPage';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Cat Cafe Odor Solutions`,
  description: 'Keep your cat cafe fresh all day. Purrify activated carbon eliminates litter box odors without fragrances. Wholesale programs for cat cafes.',
  keywords: [
    'cat cafe odor control',
    'cat cafe supplies',
    'commercial cat litter',
    'cat cafe freshness',
    'cat cafe partnership',
    'wholesale cat litter',
    'odor elimination',
  ],
  alternates: {
    canonical: '/cat-cafes',
  },
  openGraph: {
    title: `${SITE_NAME} - Cat Cafe Odor Solutions`,
    description: 'Keep your cat cafe fresh all day. Purrify activated carbon eliminates litter box odors without fragrances.',
    url: 'https://www.purrify.ca/cat-cafes',
    type: 'website',
  },
};

// Organization schema for structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description: 'Premium activated carbon cat litter additive manufacturer offering wholesale programs for cat cafes and commercial establishments',
  url: 'https://www.purrify.ca',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
    width: 400,
    height: 400,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT_INFO.phone,
    contactType: 'sales',
    email: 'partners@purrify.ca',
  },
};

export default function CatCafesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <CatCafesClientPage />
    </>
  );
}
