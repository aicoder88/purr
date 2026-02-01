import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { VeterinarianHero } from '@/components/sections/veterinarian-hero';
import { VeterinarianBenefits } from '@/components/sections/veterinarian-benefits';
import { VeterinarianPartnership } from '@/components/sections/veterinarian-partnership';
import { VeterinarianContact } from '@/components/sections/veterinarian-contact';
import { B2BCaseStudies } from '@/components/sections/b2b-case-studies';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Veterinary Clinic Partners`,
  description: 'Partner with Purrify to recommend a health-focused, natural odor solution to your clients. Wholesale pricing, sample kits, and staff training included.',
  keywords: [
    'veterinary clinic products',
    'vet recommended cat products',
    'pet health products wholesale',
    'veterinary partnership',
    'clinic odor control',
  ],
  alternates: {
    canonical: '/veterinarians',
  },
  openGraph: {
    title: `${SITE_NAME} - Veterinary Clinic Partners`,
    description: 'Partner with Purrify to recommend a health-focused, natural odor solution to your clients.',
    url: 'https://www.purrify.ca/veterinarians',
    type: 'website',
  },
};

// Organization schema for structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description: 'Premium activated carbon cat litter additive manufacturer offering wholesale partnership programs for veterinary clinics',
  url: 'https://www.purrify.ca',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.purrify.ca/images/purrify-logo.png',
    width: 400,
    height: 400,
  },
};

export default function VeterinariansPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <VeterinarianHero />
        <VeterinarianBenefits />
        <VeterinarianPartnership />
        <B2BCaseStudies businessType="veterinarian" limit={1} />
        <VeterinarianContact />
      </main>
    </>
  );
}
