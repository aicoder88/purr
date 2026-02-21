"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useCurrency } from '@/lib/currency-context';
import {
  CheckCircle,
  ChevronRight,
  Home,
  Zap,
  Shield,
  Droplets,
  Leaf,
  Cat,
  Sparkles,
  MapPin,
  Quote,
  Star,
  Users,
} from 'lucide-react';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { ProductsHero } from '@/components/products/ProductsHero';
import { EnhancedProductComparison } from '@/components/sections/enhanced-product-comparison';
import { buildAvailabilityUrl, getPriceValidityDate, generateWebsiteSchema, stripContext } from '@/lib/seo-utils';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';

export default function ProductsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { currency } = useCurrency();
  const breadcrumbAriaLabel =
    locale === 'fr'
      ? 'Fil d Ariane'
      : 'Breadcrumb';
  const useEnglishVariantCtaCopy = false;

  const trialPrice = formatProductPrice('trial', currency, locale);
  const standardPrice = formatProductPrice('standard', currency, locale);
  const standardAutoshipPrice = formatProductPrice('standardAutoship', currency, locale);
  const familyPrice = formatProductPrice('family', currency, locale);
  const familyAutoshipPrice = formatProductPrice('familyAutoship', currency, locale);

  const standardAutoshipAmount = getProductPrice('standardAutoship', currency);
  const familyAutoshipAmount = getProductPrice('familyAutoship', currency);

  const priceDetails = {
    trial: {
      price: trialPrice,
      originalPrice: null as string | null,
      savings: null as string | null,
      monthlyPrice: null as string | null,
      autoshipPrice: null as string | null,
    },
    regular: {
      price: standardPrice,
      originalPrice: null as string | null,
      savings: null as string | null,
      monthlyPrice: formatCurrencyValue(standardAutoshipAmount / 3, locale),
      autoshipPrice: standardAutoshipPrice,
    },
    large: {
      price: familyPrice,
      originalPrice: null as string | null,
      savings: null as string | null,
      monthlyPrice: formatCurrencyValue(familyAutoshipAmount / 3, locale),
      autoshipPrice: familyAutoshipPrice,
    },
  } as const;

  const productIdAlias: Record<string, keyof typeof priceDetails> = {
    trial: 'trial',
    regular: 'regular',
    large: 'large',
  };

  const paymentLinks: Record<string, string | null> = {
    trial: getPaymentLink('trialSingle'),
    regular: getPaymentLink('standardAutoship'),
    large: getPaymentLink('familyAutoship'),
  };

  // Product images matching the homepage
  const productImages: Record<string, { src: string; size: 'sm' | 'md' | 'lg' }> = {
    trial: { src: '/optimized/products/17g-transparent-v2.webp', size: 'sm' },
    regular: { src: '/optimized/products/60g-transparent.webp', size: 'md' },
    large: { src: '/optimized/products/60g-transparent.webp', size: 'lg' },
  };

  // Display names that de-emphasize grams
  const productDisplayNames: Record<string, { name: string; nameFr: string; subtitle: string; subtitleFr: string }> = {
    trial: {
      name: "Free Trial",
      nameFr: 'Format Essai',
      subtitle: '12g · One Week of Proof',
      subtitleFr: '12g · Une semaine de preuve'
    },
    regular: {
      name: 'The Goldilocks Bag',
      nameFr: 'Le Format Parfait',
      subtitle: '50g · Regular Size',
      subtitleFr: '50g · Format Standard'
    },
    large: {
      name: 'Family Size',
      nameFr: 'Format Famille',
      subtitle: '120g · Best Value Per Gram',
      subtitleFr: '120g · Meilleur rapport qualité-prix'
    },
  };

  const _products = ([] as any[]).map((product: any) => {
    const priceKey = productIdAlias[product.id] ?? 'regular';
    const displayName = productDisplayNames[product.id] || { name: product.name, nameFr: product.name, subtitle: product.subtitle, subtitleFr: product.subtitle };
    const imageData = productImages[product.id] || { src: '/optimized/products/60g-transparent.webp', size: 'md' as const };

    return {
      ...product,
      displayName: locale === 'fr' ? displayName.nameFr : displayName.name,
      displaySubtitle: locale === 'fr' ? displayName.subtitleFr : displayName.subtitle,
      image: imageData.src,
      imageSize: imageData.size,
      price: priceDetails[priceKey].price,
      originalPrice: priceDetails[priceKey].originalPrice,
      savings: priceDetails[priceKey].savings,
      monthlyPrice: priceDetails[priceKey].monthlyPrice,
      autoshipPrice: priceDetails[priceKey].autoshipPrice,
      popular: product.id === 'regular',
      recommended: product.id === 'large',
      ctaLink: paymentLinks[product.id] || '/#products',
      color: product.id === 'trial' ? 'from-green-500 to-green-600' : product.id === 'regular' ? 'from-deep-coral to-rose-600' : 'from-electric-indigo to-purple-600'
    };
  });

  const _comparisonFeatures = ([] as any[]).map((item: any, index: number) => ({
    feature: item.feature,
    trial: index < 4,
    regular: true,
    large: true
  }));

  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();

  const usageCalculator = [
    {
      cats: 1,
      litterChanges: t('productComparison.units.weekly'),
      trial: `1 ${t('productComparison.units.week')}`,
      regular: `30 ${t('productComparison.units.days')}`,
      large: `10-12 ${t('productComparison.units.weeks')}`
    },
    {
      cats: 2,
      litterChanges: `2x ${t('productComparison.units.perWeek')}`,
      trial: `3-4 ${t('productComparison.units.days')}`,
      regular: `2-3 ${t('productComparison.units.weeks')}`,
      large: `5-6 ${t('productComparison.units.weeks')}`
    },
    {
      cats: 3,
      litterChanges: `3x ${t('productComparison.units.perWeek')}`,
      trial: `2-3 ${t('productComparison.units.days')}`,
      regular: `1-2 ${t('productComparison.units.weeks')}`,
      large: `3-4 ${t('productComparison.units.weeks')}`
    }
  ];

  // Quick decision helper data - using new copywriting translations
  const quickPicks = [
    {
      question: t('productsPage.quickDecision.trial.question') || "Skeptical? Good. Prove it to yourself.",
      answer: t('productsPage.quickDecision.trial.answer') || "The FREE Trial Bag",
      detail: t('productsPage.quickDecision.trial.detail') || "Just pay shipping. If your nose isn't convinced in 7 days, we've both learned something.",
      productId: "trial",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      question: t('productsPage.quickDecision.regular.question') || "One or two furry overlords at home?",
      answer: t('productsPage.quickDecision.regular.answer') || "The Regular Bag",
      detail: t('productsPage.quickDecision.regular.detail') || "3 months of 'wait, where's the litter box?' moments. Our most popular size for a reason.",
      productId: "regular",
      icon: <Cat className="w-6 h-6" />,
    },
    {
      question: t('productsPage.quickDecision.large.question') || "Running a cat hotel? (No judgment.)",
      answer: t('productsPage.quickDecision.large.answer') || "The Large Bag",
      detail: t('productsPage.quickDecision.large.detail') || "For multi-cat homes where odor control isn't optional. Free shipping. Maximum freshness.",
      productId: "large",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  // Trust signals - using new copywriting translations
  const trustSignals = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('productsPage.trustSignals.waterFilter.title') || "The Same Stuff in Your Brita",
      description: t('productsPage.trustSignals.waterFilter.description') || "Meets NSF/ANSI 61 standards. If it's good enough to make tap water drinkable, imagine what it does to ammonia.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t('productsPage.trustSignals.ingredients.title') || "Ingredients: Coconut Shells. That's It.",
      description: t('productsPage.trustSignals.ingredients.description') || "No fragrance to stress your cat. No chemicals to worry about. Just pure, activated carbon from coconut shells.",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: t('productsPage.trustSignals.science.title') || "Science, Not Perfume",
      description: t('productsPage.trustSignals.science.description') || "One gram has the surface area of a football field. Those microscopic tunnels trap odor molecules permanently. Gone. Not hiding.",
    },
  ];

  const pageTitle = locale === 'fr'
    ? "Produits Purrify - Additif Litière au Charbon Actif"
    : "Purrify Products - Activated Carbon Litter Additive";

  const pageDescription = locale === 'fr'
    ? "Découvrez tous les formats Purrify. Du format d'essai gratuit au format familial, trouvez la taille parfaite pour votre foyer."
    : "★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly. Ships to USA & Canada. 30-day guarantee.";

  // Enhanced SEO with breadcrumbs
  const { breadcrumb } = useEnhancedSEO({
    path: '/products',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter additive',
    keywords: ['Purrify products', 'cat litter additive', 'activated carbon', 'odor control', 'trial size', 'family pack'],
    image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
  });

  // Product data for complete structured data
  const productStructuredData = [
    {
      id: 'trial',
      name: 'Purrify 12g Trial - Natural Cat Litter Freshener',
      description: 'FREE trial of activated charcoal cat litter additive. Eliminates ammonia odors instantly.',
      sku: 'purrify-12g',
      mpn: 'PURRIFY-12G',
      image: 'https://www.purrify.ca/optimized/products/17g-transparent-v2.webp',
      url: `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/trial-size`,
      shippingRate: '4.76',
    },
    {
      id: 'regular',
      name: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
      description: '50g activated charcoal cat litter additive. One month of odor control. 100% natural.',
      sku: 'purrify-50g',
      mpn: 'PURRIFY-50G',
      image: 'https://www.purrify.ca/optimized/products/60g-transparent.webp',
      url: `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/#standard`,
      shippingRate: '6.99',
    },
    {
      id: 'large',
      name: 'Purrify 120g Family Size - Cat Litter Freshener for Multi-Cat Homes',
      description: 'Best value 120g activated charcoal cat litter additive. Perfect for multi-cat households.',
      sku: 'purrify-120g',
      mpn: 'PURRIFY-120G',
      image: 'https://www.purrify.ca/optimized/products/60g-transparent.webp',
      url: `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/#family-pack`,
      shippingRate: '0',
    },
  ];

  // Generate CollectionPage schema with ItemList (combining with breadcrumb)
  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": pageTitle,
        "description": pageDescription,
        "url": `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products`,
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
                "brand": {
                  "@type": "Brand",
                  "name": "Purrify",
                  "logo": "https://www.purrify.ca/optimized/logos/social-logo.webp"
                },
                "manufacturer": {
                  "@type": "Organization",
                  "name": "Purrify",
                  "url": "https://www.purrify.ca"
                },
                "category": "Pet Supplies > Cat Supplies > Cat Litter Additives",
                "offers": {
                  "@type": "Offer",
                  "url": product.url,
                  "price": priceValue,
                  "priceCurrency": currency,
                  "priceValidUntil": priceValidUntil,
                  "availability": availabilityUrl,
                  "itemCondition": "https://schema.org/NewCondition",
                  "seller": {
                    "@type": "Organization",
                    "name": "Purrify"
                  },
                  "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingRate": {
                      "@type": "MonetaryAmount",
                      "value": product.shippingRate,
                      "currency": currency
                    },
                    "shippingDestination": {
                      "@type": "DefinedRegion",
                      "addressCountry": currency === 'USD' ? 'US' : 'CA'
                    },
                    "deliveryTime": {
                      "@type": "ShippingDeliveryTime",
                      "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 2,
                        "unitCode": "d"
                      },
                      "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 2,
                        "maxValue": 5,
                        "unitCode": "d"
                      }
                    }
                  },
                  "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
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
      {/* Combined CollectionPage + Breadcrumb + Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        {breadcrumb && breadcrumb.items.length > 1 && (
          <nav
            aria-label={breadcrumbAriaLabel}
            className="py-4 border-b border-brand-light dark:border-gray-800"
          >
            <Container>
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumb.items.map((item, index) => {
                  const isLast = index === breadcrumb.items.length - 1;
                  return (
                    <li key={item.path} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                      )}
                      {index === 0 ? (
                        <Link
                          href={item.path}
                          className="text-gray-600 dark:text-gray-400 hover:text-brand-red dark:hover:text-red-400 transition-colors"
                        >
                          <Home className="h-4 w-4" />
                          <span className="sr-only">{item.name}</span>
                        </Link>
                      ) : isLast ? (
                        <span
                          className="font-medium text-gray-900 dark:text-gray-100"
                          aria-current="page"
                        >
                          {item.name}
                        </span>
                      ) : (
                        <Link
                          href={item.path}
                          className="text-gray-600 dark:text-gray-400 hover:text-brand-red dark:hover:text-red-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </Container>
          </nav>
        )}

        {/* Hero Section - Hook with Problem + Promise */}
        <ProductsHero />

        {/* Social Proof FIRST - The "Don't take our word for it" payoff */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-brand-light to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-brand-light dark:border-gray-700">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-purple/20 dark:text-purple-400/20" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Testimonial Content */}
                  <div className="md:col-span-2">
                    <h2 className="font-heading text-2xl font-bold text-brand-purple dark:text-purple-400 mb-4">
                      “{t('productsPage.testimonial.headline') || "Game changer for my apartment!"}”
                    </h2>
                    <blockquote className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      “{t('productsPage.testimonial.quote') || "I live in a small studio apartment with two cats, and the litter box smell was becoming unbearable. Purrify completely eliminated the odor within 24 hours. I was skeptical about the price at first, but it lasts so much longer than other products I've tried. Worth every penny!"}”
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">
                        — <span className="font-semibold">{t('productsPage.testimonial.author') || "Sarah M."}</span>, {t('productsPage.testimonial.location') || "Montreal, QC"} ({t('productsPage.testimonial.details') || "2 cats, small apartment"})
                      </span>
                    </div>
                  </div>
                  {/* Image */}
                  <div className="relative hidden md:block">
                    <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src="/optimized/marketing/sarah-montreal-testimonial.png"
                        alt={locale === 'fr' ? "Sarah de Montréal avec ses chats dans son appartement" : "Sarah from Montreal with her cats in her apartment"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transition: Curiosity hook to science */}
              <p className="text-center mt-8 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                {locale === 'fr'
                  ? "Comment un simple sachet peut-il éliminer une odeur aussi tenace? La réponse tient dans un seul grain..."
                  : "How does a simple pouch eliminate such a stubborn smell? The answer fits in a single grain..."}
              </p>
            </div>
          </Container>
        </section>

        {/* Science Hook - The "Football Field" Revelation */}
        <section className="py-12 bg-brand-purple/5 dark:bg-brand-purple/10">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-brand-purple/20 shadow-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-8 h-8 text-brand-purple" />
                      <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-gray-100">
                        {locale === 'fr'
                          ? "Un grain. La superficie d'un demi-terrain de football."
                          : "One Gram. Half a Football Field of Surface Area."}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      {locale === 'fr'
                        ? "À l'intérieur de chaque grain de charbon actif se trouvent des millions de tunnels microscopiques. Quand les molécules d'ammoniac passent à côté, elles sont piégées de façon permanente."
                        : "Inside every grain of activated carbon are millions of microscopic tunnels. When ammonia molecules float past, they get trapped permanently."}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-base border-l-4 border-brand-purple/30 pl-4 italic">
                      {locale === 'fr'
                        ? "Ce n'est pas du camouflage. C'est de la capture moléculaire — la même technologie utilisée dans les masques à gaz, les usines de traitement d'eau et la filtration d'air des hôpitaux."
                        : "This isn't masking. It's molecular capture — the same technology used in gas masks, water treatment plants, and hospital air filtration."}
                    </p>
                  </div>
                  <div className="relative h-64 md:h-auto min-h-[300px]">
                    <Image
                      src="/optimized/blog/microscopic-carbon-structure.png"
                      alt={locale === 'fr' ? "Structure microscopique du charbon actif piégeant les molécules" : "Microscopic structure of activated carbon trapping molecules"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                      <span className="text-sm font-medium drop-shadow-md" style={{ color: 'white' }}>
                        {locale === 'fr' ? "Vue microscopique" : "Microscopic View"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transition to trust signals */}
              <p className="text-center mt-10 text-gray-600 dark:text-gray-300">
                {locale === 'fr'
                  ? "La science est impressionnante. Mais voici ce qui compte vraiment pour vous et votre chat:"
                  : "The science is impressive. But here's what actually matters for you and your cat:"}
              </p>
            </div>
          </Container>
        </section>

        {/* Trust Signals - Now positioned as "what matters" */}
        <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {trustSignals.map((signal, index) => (
                <div key={index} className="text-center">
                  <div className="text-brand-purple dark:text-purple-400 mb-3 flex justify-center">
                    {signal.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {signal.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {signal.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Transition to size selection */}
            <p className="text-center mt-12 text-xl font-medium text-gray-800 dark:text-gray-200">
              {locale === 'fr'
                ? "Maintenant, quelle taille vous convient le mieux?"
                : "Now, which size is right for you?"}
            </p>
          </Container>
        </section>

        {/* Quick Decision Helper - Now flows naturally after "which size?" */}
        <section className="py-12 bg-brand-light/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {locale === 'fr'
                  ? "Répondez à une question. Trouvez votre format."
                  : "Answer One Question. Find Your Size."}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {quickPicks.map((pick, index) => (
                <Link
                  key={index}
                  href={`${locale === 'fr' ? '/fr' : ''}/stores`}
                  className="group bg-white dark:bg-gray-700 rounded-xl p-6 hover:bg-brand-light dark:hover:bg-gray-600 transition-all hover:shadow-lg border-2 border-transparent hover:border-brand-purple"
                >
                  <div className="text-brand-purple dark:text-purple-400 mb-3">
                    {pick.icon}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{pick.question}</p>
                  <p className="font-heading font-bold text-xl text-gray-900 dark:text-gray-100 mb-2 group-hover:text-brand-purple transition-colors">
                    {pick.answer} <MapPin className="inline w-4 h-4 ml-1" />
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{pick.detail}</p>
                </Link>
              ))}
            </div>

            {/* Transition to detailed comparison */}
            <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
              {locale === 'fr'
                ? "Vous voulez tous les détails? Comparez côte à côte:"
                : "Want all the details? Compare side by side:"}
            </p>
          </Container>
        </section>

        {/* Product Comparison Cards - Using Shared Component */}
        <EnhancedProductComparison />

        {/* What You Get Section - Streamlined (science already covered above) */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {locale === 'fr'
                    ? "En résumé: Ce que vous obtenez"
                    : "The Bottom Line: What You Get"}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {locale === 'fr'
                    ? "(Votre chat ne remarquera rien. C'est le but.)"
                    : "(Your cat won't notice a thing. That's the point.)"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {([
                  { title: t('productsPage.whatYouGet.benefits.0.title') || "Water-Filter Grade Activated Carbon", description: t('productsPage.whatYouGet.benefits.0.description') || "The exact same material used in Brita filters and hospital air purification. Not 'similar to.' The same." },
                  { title: t('productsPage.whatYouGet.benefits.1.title') || "Zero Fragrances. Zero Chemicals. Zero Worries.", description: t('productsPage.whatYouGet.benefits.1.description') || "Cats have 200 million scent receptors. Artificial fragrances stress them. Purrify works invisibly." },
                  { title: t('productsPage.whatYouGet.benefits.2.title') || "Clay, Crystal, Clumping, Natural... We Don't Judge", description: t('productsPage.whatYouGet.benefits.2.description') || "Works with whatever litter your cat has trained you to buy. No switching drama." },
                  { title: t('productsPage.whatYouGet.benefits.3.title') || "Open. Sprinkle. Done.", description: t('productsPage.whatYouGet.benefits.3.description') || "A thin layer on top. 30 seconds of effort for 7 days of results." }
                ]).map((benefit: { title: string; description: string }, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transition to calculator */}
              <p className="text-center mt-12 text-lg text-gray-700 dark:text-gray-300">
                {locale === 'fr'
                  ? "Combien de temps chaque format dure-t-il? Ça dépend de vos chats..."
                  : "How long will each size last? That depends on your cats..."}
              </p>
            </div>
          </Container>
        </section>

        {/* Usage Calculator */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t('productComparison.howLongWillEachSizeLast')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t('productComparison.usageCalculator.subtitle')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-brand-purple to-brand-red text-white dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">{t('productComparison.usageCalculator.numberOfCats')}</th>
                      <th className="px-6 py-4 text-center font-bold">{t('productComparison.usageCalculator.typicalChanges')}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Format Essai' : 'Trial Bag'}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Format Régulier' : 'Regular Bag'}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Grand Format' : 'Large Bag'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageCalculator.map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="px-6 py-4 font-bold text-brand-purple">
                          {row.cats} {row.cats > 1 ? t('productComparison.units.cats') : t('productComparison.units.cat')}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {row.litterChanges}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.trial}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.regular}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.large}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transition to CTA - Natural conclusion */}
            <p className="text-center mt-10 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {locale === 'fr'
                ? "Vous avez vu la science. Vous avez entendu les témoignages. Vous savez quel format vous convient. Il ne reste plus qu'une chose à faire..."
                : "You've seen the science. You've heard the testimonials. You know which size fits. There's only one thing left to do..."}
            </p>
          </Container>
        </section>

        {/* CTA Section - B2B: Find a Store */}
        <section className="py-16 bg-gradient-to-br from-brand-purple to-brand-red cv-auto cis-720">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <MapPin className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {useEnglishVariantCtaCopy
                  ? 'Ready to Get Odor Control Working This Week?'
                  : locale === 'fr'
                    ? 'Trouvez Purrify près de chez vous'
                    : 'Get Purrify Near You'}
              </h2>
              <p className="text-xl mb-4 opacity-90">
                {useEnglishVariantCtaCopy
                  ? 'Find a nearby retailer or contact us for the fastest way to start.'
                  : locale === 'fr'
                    ? 'Disponible dans les animaleries à travers le Canada. Demandez Purrify à votre magasin préféré.'
                    : 'Available at pet stores across Canada. Ask for Purrify at your favorite store.'}
              </p>
              <p className="text-base mb-8 opacity-80">
                {locale === 'fr'
                  ? "Votre magasin ne l'a pas encore? Dites-le nous et nous les contacterons."
                  : "Your store doesn't carry it yet? Tell us and we'll reach out."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/stores`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-brand-purple hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                    <MapPin className="w-5 h-5 mr-2" />
                    {useEnglishVariantCtaCopy
                      ? 'Find Nearby Availability'
                      : locale === 'fr'
                        ? 'Trouver un magasin'
                        : 'Find a Store'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/contact`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                    {useEnglishVariantCtaCopy
                      ? 'Talk to Product Support'
                      : locale === 'fr'
                        ? 'Des questions? Contactez-nous'
                        : 'Questions? Contact Us'}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
                {t.rich('productsPage.relatedIntro', {
                  guide: (chunks) => (
                    <Link href="/learn/cat-litter-guide" className="text-brand-purple dark:text-purple-400 hover:underline font-medium">
                      {chunks}
                    </Link>
                  ),
                  calculator: (chunks) => (
                    <Link href="/tools/cat-litter-calculator" className="text-brand-purple dark:text-purple-400 hover:underline font-medium">
                      {chunks}
                    </Link>
                  ),
                  solutions: (chunks) => (
                    <Link href="/blog/how-to-neutralize-ammonia-cat-litter" className="text-brand-purple dark:text-purple-400 hover:underline font-medium">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {locale === 'fr' ? "En savoir plus" : "Learn More"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {((t.raw('productsPage.relatedPages') || t.raw('productComparison.relatedPages')) as Array<{ link: string; title: string; description: string }>).map((page: { link: string; title: string; description: string }, index: number) => (
                <Link href={`${locale === 'fr' ? '/fr' : ''}${page.link}`} key={index} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-brand-light dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-brand-purple transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {page.description}
                    </p>
                  </div>
                </Link>
              ))}
              <Link href="/blog/activated-carbon-vs-baking-soda-comparison" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-brand-light dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-brand-purple transition-colors">
                    {t('nav.carbonVsBakingSoda')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('nav.carbonVsBakingSodaDesc')}
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedContent currentUrl="/products" />
          </Container>
        </section>
      </main>
    </>
  );
}
