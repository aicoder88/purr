"use client";

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useLocale } from 'next-intl';
import { useCurrency } from '@/lib/currency-context';
import { ProductsHero } from '@/components/products/ProductsHero';
import { EnhancedProductComparison } from '@/components/sections/enhanced-product-comparison';
import { buildAvailabilityUrl, getPriceValidityDate, generateWebsiteSchema, stripContext } from '@/lib/seo-utils';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { formatProductPrice } from '@/lib/pricing';

// Section components
import { SocialProofSection } from './components/SocialProofSection';
import { ScienceSection } from './components/ScienceSection';
import { TrustSignalsSection } from './components/TrustSignalsSection';
import { QuickDecisionSection } from './components/QuickDecisionSection';
import { WhatYouGetSection } from './components/WhatYouGetSection';
import { UsageCalculatorSection } from './components/UsageCalculatorSection';
import { ProductsCTASection } from './components/ProductsCTASection';
import { RelatedPagesSection } from './components/RelatedPagesSection';

interface PageContentProps {
  locale?: string;
}

export default function ProductsPage({ locale: localeProp }: PageContentProps = {}) {
  const detectedLocale = useLocale();
  const locale = localeProp || detectedLocale;
  const { currency } = useCurrency();
  const breadcrumbAriaLabel = locale === 'fr' ? 'Fil d Ariane' : 'Breadcrumb';

  const trialPrice = formatProductPrice('trial', currency, locale);
  const standardPrice = formatProductPrice('standard', currency, locale);
  const standardAutoshipPrice = formatProductPrice('standardAutoship', currency, locale);
  const familyPrice = formatProductPrice('family', currency, locale);
  const familyAutoshipPrice = formatProductPrice('familyAutoship', currency, locale);

  const priceDetails = {
    trial: { price: trialPrice },
    regular: { price: standardPrice, autoshipPrice: standardAutoshipPrice },
    large: { price: familyPrice, autoshipPrice: familyAutoshipPrice },
  } as const;

  const productIdAlias: Record<string, keyof typeof priceDetails> = {
    trial: 'trial',
    regular: 'regular',
    large: 'large',
  };

  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();

  const pageTitle = locale === 'fr'
    ? "Produits Purrify - Additif Litière au Charbon Actif"
    : "Purrify Products - Activated Carbon Litter Additive";

  const pageDescription = locale === 'fr'
    ? "Découvrez tous les formats Purrify. Du format d'essai gratuit au format familial, trouvez la taille parfaite pour votre foyer."
    : "★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly. Ships to USA & Canada. 30-day guarantee.";

  const { breadcrumb } = useEnhancedSEO({
    path: '/products',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter additive',
    keywords: ['Purrify products', 'cat litter additive', 'activated carbon', 'odor control', 'trial size', 'family pack'],
    image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
  });

  const productStructuredData = [
    {
      id: 'trial',
      name: 'Purrify 12g Trial - Natural Cat Litter Freshener',
      description: 'FREE trial of activated charcoal cat litter additive. Eliminates ammonia odors instantly.',
      sku: 'purrify-12g',
      mpn: 'PURRIFY-12G',
      image: 'https://www.purrify.ca/optimized/products/17g-transparent-v2.webp',
      url: `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}products/trial-size`,
      shippingRate: '4.76',
    },
    {
      id: 'regular',
      name: 'Purrify 120g - Regular Size Cat Litter Freshener for 1-2 Cats',
      description: '120g activated charcoal cat litter additive. Flexible dosing for single and dual-cat homes.',
      sku: 'purrify-120g',
      mpn: 'PURRIFY-120G',
      image: 'https://www.purrify.ca/optimized/products/60g-transparent.webp',
      url: `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}products/#standard`,
      shippingRate: '6.99',
    },
    {
      id: 'large',
      name: 'Purrify 240g Family Size - Cat Litter Freshener for Multi-Cat Homes',
      description: 'Best value 240g activated charcoal cat litter additive. Built for multi-cat households.',
      sku: 'purrify-240g',
      mpn: 'PURRIFY-240G',
      image: 'https://www.purrify.ca/optimized/products/140g-transparent.webp',
      url: `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}products/#family-pack`,
      shippingRate: '0',
    },
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": pageTitle,
        "description": pageDescription,
        "url": `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}products`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": productStructuredData.map((product, index) => {
            const priceKey = productIdAlias[product.id] ?? 'regular';
            const priceValue = priceDetails[priceKey].price.replace('$', '').replace(',', '');
            return {
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "@id": product.url,
                "name": product.name,
                "description": product.description,
                "image": [product.image],
                "sku": product.sku,
                "mpn": product.mpn,
                "brand": { "@type": "Brand", "name": "Purrify", "logo": "https://www.purrify.ca/optimized/logos/social-logo.webp" },
                "manufacturer": { "@type": "Organization", "name": "Purrify", "url": "https://www.purrify.ca/" },
                "category": "Pet Supplies > Cat Supplies > Cat Litter Additives",
                "offers": {
                  "@type": "Offer",
                  "url": product.url,
                  "price": priceValue,
                  "priceCurrency": currency,
                  "priceValidUntil": priceValidUntil,
                  "availability": availabilityUrl,
                  "itemCondition": "https://schema.org/NewCondition",
                  "seller": { "@type": "Organization", "name": "Purrify" },
                  "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingRate": { "@type": "MonetaryAmount", "value": product.shippingRate, "currency": currency },
                    "shippingDestination": { "@type": "DefinedRegion", "addressCountry": currency === 'USD' ? 'US' : 'CA' },
                    "deliveryTime": {
                      "@type": "ShippingDeliveryTime",
                      "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "d" },
                      "transitTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 5, "unitCode": "d" }
                    }
                  },
                  "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": ["CA", "US"],
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 30,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                  }
                }
              }
            };
          })
        }
      },
      ...(breadcrumb ? [stripContext(breadcrumb.schema)] : []),
      stripContext(generateWebsiteSchema(locale))
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <main className="min-h-screen bg-[#FFFFF5] bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        {breadcrumb && breadcrumb.items.length > 1 && (
          <nav aria-label={breadcrumbAriaLabel} className="py-4 border-b border-brand-light border-gray-800">
            <Container>
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumb.items.map((item, index) => {
                  const isLast = index === breadcrumb.items.length - 1;
                  return (
                    <li key={item.path} className="flex items-center">
                      {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400 text-gray-500" />}
                      {index === 0 ? (
                        <Link href={item.path} className="text-gray-600 text-gray-400 hover:text-brand-red hover:text-red-400 transition-colors">
                          <Home className="h-4 w-4" />
                          <span className="sr-only">{item.name}</span>
                        </Link>
                      ) : isLast ? (
                        <span className="font-medium text-gray-900 text-gray-100" aria-current="page">{item.name}</span>
                      ) : (
                        <Link href={item.path} className="text-gray-600 text-gray-400 hover:text-brand-red hover:text-red-400 transition-colors">{item.name}</Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </Container>
          </nav>
        )}

        <ProductsHero />
        <SocialProofSection />
        <ScienceSection />
        <TrustSignalsSection />
        <QuickDecisionSection />
        <EnhancedProductComparison />
        <WhatYouGetSection />
        <UsageCalculatorSection />
        <ProductsCTASection />
        <RelatedPagesSection />
      </main>
    </>
  );
}
