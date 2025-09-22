import { NextSeo } from 'next-seo';
import { useTranslation } from '../src/lib/translation-context';
import { SITE_NAME } from '../src/lib/constants';

// Retailer-specific components
import { RetailerHero } from '../src/components/sections/retailer-hero';
import { WholesalePricing } from '../src/components/sections/wholesale-pricing';
import { RetailerContact } from '../src/components/sections/retailer-contact';

export default function RetailersPage() {
  const { t, locale } = useTranslation();
  const pageTitle = `${SITE_NAME} - ${t.retailers?.seo?.pageTitle || 'Wholesale & Retail Partners'}`;
  const pageDescription = t.retailers?.seo?.description || 'Join our retail network. Wholesale pricing, marketing support, and proven products for pet stores and retailers across Canada.';
  const canonicalUrl = `https://www.purrify.ca${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}/retailers`;

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={[
          { hrefLang: 'en-CA', href: 'https://www.purrify.ca/retailers' },
          { hrefLang: 'fr-CA', href: 'https://fr.purrify.ca/retailers' },
          { hrefLang: 'zh-CN', href: 'https://zh.purrify.ca/retailers' },
          { hrefLang: 'x-default', href: 'https://www.purrify.ca/retailers' },
        ]}
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
      </main>
    </>
  );
}
