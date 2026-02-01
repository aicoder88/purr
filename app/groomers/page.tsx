import type { Metadata } from 'next';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';
import GroomersClientPage from './_components/GroomersClientPage';

export const metadata: Metadata = {
  title: `${SITE_NAME} - For Pet Groomers | Add Purrify to Your Services`,
  description: 'Pet groomers: offer more value with Purrify. Easy add-on sale, wholesale pricing, and retail display materials included.',
  keywords: [
    'pet groomer wholesale',
    'grooming salon products',
    'cat litter additive wholesale',
    'groomer retail partnership',
    'pet groomer partnership',
    'grooming supplies wholesale',
  ],
  alternates: {
    canonical: '/groomers',
  },
  openGraph: {
    title: `${SITE_NAME} - For Pet Groomers | Add Purrify to Your Services`,
    description: 'Pet groomers: offer more value with Purrify. Easy add-on sale, wholesale pricing, and retail display materials included.',
    url: 'https://www.purrify.ca/groomers',
    type: 'website',
  },
};

// Organization schema for structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description: 'Premium activated carbon cat litter additive manufacturer offering wholesale partnership programs for pet groomers',
  url: 'https://www.purrify.ca',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.purrify.ca/images/purrify-logo.png',
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

export default function GroomersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <GroomersClientPage />
    </>
  );
}
