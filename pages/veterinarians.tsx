import { NextSeo } from 'next-seo';
import { useTranslation } from '../src/lib/translation-context';
import { SITE_NAME } from '../src/lib/constants';
import { buildLanguageAlternates, getLocalizedUrl } from '../src/lib/seo-utils';
import { VeterinarianHero } from '../src/components/sections/veterinarian-hero';
import { VeterinarianBenefits } from '../src/components/sections/veterinarian-benefits';

export default function VeterinariansPage() {
  const { t, locale } = useTranslation();
  const pageTitle = `${SITE_NAME} - ${t.veterinarians?.seo?.pageTitle || 'Veterinary Clinic Partners'}`;
  const pageDescription = t.veterinarians?.seo?.description || 'Partner with Purrify to recommend a health-focused, natural odor solution to your clients. Wholesale pricing, sample kits, and staff training included.';
  const canonicalUrl = getLocalizedUrl('/veterinarians', locale);
  const languageAlternates = buildLanguageAlternates('/veterinarians');

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          locale: locale === 'fr' ? 'fr_CA' : locale === 'zh' ? 'zh_CN' : 'en_CA',
          images: [
            {
              url: 'https://www.purrify.ca/purrify-logo.png',
              width: 1200,
              height: 630,
              alt: `${SITE_NAME} - ${t.veterinarians?.seo?.openGraphAlt || 'Veterinary Partners'}`,
              type: 'image/png',
            }
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: t.veterinarians?.seo?.keywords || 'veterinary clinic products, cat litter additive for vets, pet health products wholesale, vet recommended cat products, natural cat litter deodorizer',
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
        ]}
      />

      <main className="min-h-screen bg-white dark:bg-gray-900">
        <VeterinarianHero />
        <VeterinarianBenefits />
      </main>
    </>
  );
}
