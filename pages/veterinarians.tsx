import { NextSeo } from 'next-seo';
import { useTranslation } from '../src/lib/translation-context';
import { SITE_NAME } from '../src/lib/constants';
import { buildLanguageAlternates, getLocalizedUrl } from '../src/lib/seo-utils';
import { VeterinarianHero } from '../src/components/sections/veterinarian-hero';
import { VeterinarianBenefits } from '../src/components/sections/veterinarian-benefits';
import { VeterinarianPartnership } from '../src/components/sections/veterinarian-partnership';
import { VeterinarianContact } from '../src/components/sections/veterinarian-contact';
import { B2BCaseStudies } from '../src/components/sections/b2b-case-studies';
import { useEnhancedSEO } from '../src/hooks/useEnhancedSEO';

export default function VeterinariansPage() {
  const { t, locale } = useTranslation();
  const pageTitle = `${SITE_NAME} - ${t.veterinarians?.seo?.pageTitle || 'Veterinary Clinic Partners'}`;
  const pageDescription = t.veterinarians?.seo?.description || 'Partner with Purrify to recommend a health-focused, natural odor solution to your clients. Wholesale pricing, sample kits, and staff training included.';

  // Use enhanced SEO hook
  const { nextSeoProps } = useEnhancedSEO({
    path: '/veterinarians',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'veterinary clinic pet products',
    image: 'https://www.purrify.ca/purrify-logo.png',
    keywords: ['veterinary clinic products', 'vet recommended cat products', 'pet health products wholesale'],
  });

  return (
    <>
      <NextSeo {...nextSeoProps} />

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
