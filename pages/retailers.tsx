import { NextSeo } from 'next-seo';
import { useTranslation } from '../src/lib/translation-context';
import { SITE_NAME } from '../src/lib/constants';

// Retailer-specific components
import { RetailerHero } from '../src/components/sections/retailer-hero';
import { WholesalePricing } from '../src/components/sections/wholesale-pricing';
import { RetailerContact } from '../src/components/sections/retailer-contact';
import { ClientLocationsMap } from '../src/components/maps/ClientLocationsMap';
import { buildLanguageAlternates, getLocalizedUrl } from '../src/lib/seo-utils';
import { Stores } from '../src/components/sections/stores';

export default function RetailersPage() {
  const { t, locale } = useTranslation();
  const pageTitle = `${SITE_NAME} - ${t.retailers?.seo?.pageTitle || 'Wholesale & Retail Partners'}`;
  const pageDescription = t.retailers?.seo?.description || 'Join our retail network. Wholesale pricing, marketing support, and proven products for pet stores and retailers across Canada.';
  const canonicalUrl = getLocalizedUrl('/retailers', locale);
  const languageAlternates = buildLanguageAlternates('/retailers');

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
              alt: `${SITE_NAME} - Wholesale Partners`,
              type: 'image/png',
            }
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'wholesale cat litter additive, pet store products, retail partnership, bulk orders, wholesale pricing, marketing support',
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
        ]}
      />

      <main className="min-h-screen bg-white dark:bg-gray-900">
        <RetailerHero />

        <WholesalePricing />

        <RetailerContact />

        {/* Client Locations Map */}
        <ClientLocationsMap
          className="bg-gray-50 dark:bg-gray-900/50"
          height="400"
          headerTitle={locale === 'fr'
            ? 'Nos Partenaires Détaillants et Clients | Réseau Purrify'
            : 'Our Retail Partners and Clients | Purrify Network'
          }
          headerDescription={locale === 'fr'
            ? 'Découvrez notre réseau grandissant de détaillants et clients satisfaits à travers le Canada. Rejoignez notre famille de partenaires prospères.'
            : 'Discover our growing network of retailers and satisfied clients across Canada. Join our family of successful partners.'
          }
        />

        {/* Retail Store Locations with Logos */}
        <Stores />
      </main>
    </>
  );
}
