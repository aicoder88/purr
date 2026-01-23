import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { useCurrency } from '../../src/lib/currency-context';
import {
  CheckCircle,
  Package,
  Clock,
  Users,
  ChevronRight,
  Home,
  Star,
  Award,
  Zap,
  Shield,
  Droplets,
  Leaf,
  ArrowRight,
  Cat,
  Sparkles,
  MapPin,
  Quote,
} from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { buildAvailabilityUrl, getPriceValidityDate, generateWebsiteSchema } from '../../src/lib/seo-utils';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '../../src/lib/pricing';
import { getPaymentLink } from '../../src/lib/payment-links';

const ProductsPage: NextPage = () => {
  const { locale, t } = useTranslation();
  const { currency } = useCurrency();

  const trialPrice = formatProductPrice('trial', currency, locale);
  const familyPrice = formatProductPrice('family', currency, locale);
  const familyAutoshipPrice = formatProductPrice('familyAutoship', currency, locale);
  const jumboPrice = formatProductPrice('jumbo', currency, locale);
  const jumboAutoshipPrice = formatProductPrice('jumboAutoship', currency, locale);

  const familyAutoshipAmount = getProductPrice('familyAutoship', currency);
  const jumboAutoshipAmount = getProductPrice('jumboAutoship', currency);

  const priceDetails = {
    trial: {
      price: trialPrice,
      originalPrice: null as string | null,
      savings: null as string | null,
      monthlyPrice: null as string | null,
      autoshipPrice: null as string | null,
    },
    regular: {
      price: familyPrice,
      originalPrice: null as string | null,
      savings: null as string | null,
      monthlyPrice: formatCurrencyValue(familyAutoshipAmount / 3, locale),
      autoshipPrice: familyAutoshipPrice,
    },
    large: {
      price: jumboPrice,
      originalPrice: null as string | null,
      savings: null as string | null,
      monthlyPrice: formatCurrencyValue(jumboAutoshipAmount / 3, locale),
      autoshipPrice: jumboAutoshipPrice,
    },
  } as const;

  const productIdAlias: Record<string, keyof typeof priceDetails> = {
    trial: 'trial',
    regular: 'regular',
    large: 'large',
  };

  const paymentLinks: Record<string, string | null> = {
    trial: getPaymentLink('trialSingle'),
    regular: getPaymentLink('familyAutoship'),
    large: getPaymentLink('jumboAutoship'),
  };

  // Product images matching the homepage
  const productImages: Record<string, { src: string; size: 'sm' | 'md' | 'lg' }> = {
    trial: { src: '/optimized/17gpink.webp', size: 'sm' },
    regular: { src: '/optimized/60g.webp', size: 'md' },
    large: { src: '/optimized/140g-640w.avif', size: 'lg' },
  };

  // Display names that de-emphasize grams
  const productDisplayNames: Record<string, { name: string; nameFr: string; subtitle: string; subtitleFr: string }> = {
    trial: {
      name: 'The Skeptic\'s Sample',
      nameFr: 'Format Essai',
      subtitle: '12g · One Week of Proof',
      subtitleFr: '12g · Une semaine de preuve'
    },
    regular: {
      name: 'Regular Size',
      nameFr: 'Format Régulier',
      subtitle: '120g · The Goldilocks Bag',
      subtitleFr: '120g · Le format idéal'
    },
    large: {
      name: 'Family Size',
      nameFr: 'Format Famille',
      subtitle: '240g · Best Value Per Gram',
      subtitleFr: '240g · Meilleur rapport qualité-prix'
    },
  };

  const products = t.productComparison.products.map((product) => {
    const priceKey = productIdAlias[product.id] ?? 'regular';
    const displayName = productDisplayNames[product.id] || { name: product.name, nameFr: product.name, subtitle: product.subtitle, subtitleFr: product.subtitle };
    const imageData = productImages[product.id] || { src: '/optimized/60g.webp', size: 'md' as const };

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

  const comparisonFeatures = t.productComparison.comparisonFeatures.map((item, index) => ({
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
      litterChanges: t.productComparison.units.weekly,
      trial: `1 ${t.productComparison.units.week}`,
      regular: `10-12 ${t.productComparison.units.weeks}`,
      large: `20-24 ${t.productComparison.units.weeks}`
    },
    {
      cats: 2,
      litterChanges: `2x ${t.productComparison.units.perWeek}`,
      trial: `3-4 ${t.productComparison.units.days}`,
      regular: `5-6 ${t.productComparison.units.weeks}`,
      large: `10-12 ${t.productComparison.units.weeks}`
    },
    {
      cats: 3,
      litterChanges: `3x ${t.productComparison.units.perWeek}`,
      trial: `2-3 ${t.productComparison.units.days}`,
      regular: `3-4 ${t.productComparison.units.weeks}`,
      large: `6-8 ${t.productComparison.units.weeks}`
    }
  ];

  // Quick decision helper data - using new copywriting translations
  const quickPicks = [
    {
      question: t.productsPage?.quickDecision?.trial?.question || "Skeptical? Good. Prove it to yourself.",
      answer: t.productsPage?.quickDecision?.trial?.answer || "The FREE Trial Bag",
      detail: t.productsPage?.quickDecision?.trial?.detail || "Just pay shipping. If your nose isn't convinced in 7 days, we've both learned something.",
      productId: "trial",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      question: t.productsPage?.quickDecision?.regular?.question || "One or two furry overlords at home?",
      answer: t.productsPage?.quickDecision?.regular?.answer || "The Regular Bag",
      detail: t.productsPage?.quickDecision?.regular?.detail || "3 months of 'wait, where's the litter box?' moments. Our most popular size for a reason.",
      productId: "regular",
      icon: <Cat className="w-6 h-6" />,
    },
    {
      question: t.productsPage?.quickDecision?.large?.question || "Running a cat hotel? (No judgment.)",
      answer: t.productsPage?.quickDecision?.large?.answer || "The Large Bag",
      detail: t.productsPage?.quickDecision?.large?.detail || "For multi-cat homes where odor control isn't optional. Free shipping. Maximum freshness.",
      productId: "large",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  // Trust signals - using new copywriting translations
  const trustSignals = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t.productsPage?.trustSignals?.waterFilter?.title || "The Same Stuff in Your Brita",
      description: t.productsPage?.trustSignals?.waterFilter?.description || "Meets NSF/ANSI 61 standards. If it's good enough to make tap water drinkable, imagine what it does to ammonia.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t.productsPage?.trustSignals?.ingredients?.title || "Ingredients: Coconut Shells. That's It.",
      description: t.productsPage?.trustSignals?.ingredients?.description || "No fragrance to stress your cat. No chemicals to worry about. Just pure, activated carbon from coconut shells.",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: t.productsPage?.trustSignals?.science?.title || "Science, Not Perfume",
      description: t.productsPage?.trustSignals?.science?.description || "One gram has the surface area of a football field. Those microscopic tunnels trap odor molecules permanently. Gone. Not hiding.",
    },
  ];

  const pageTitle = locale === 'fr'
    ? "Produits Purrify - Additif Litière au Charbon Actif"
    : "Purrify Products - Activated Carbon Litter Additive";

  const pageDescription = locale === 'fr'
    ? "Découvrez tous les formats Purrify. Du format d'essai gratuit au format familial, trouvez la taille parfaite pour votre foyer."
    : "★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly. Ships to USA & Canada. 30-day guarantee.";

  // Enhanced SEO with breadcrumbs
  const { nextSeoProps, breadcrumb } = useEnhancedSEO({
    path: '/products',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter additive',
    keywords: ['Purrify products', 'cat litter additive', 'activated carbon', 'odor control', 'trial size', 'family pack'],
    image: 'https://www.purrify.ca/purrify-logo.png',
    includeBreadcrumb: true
  });

  // Product data for complete structured data
  const productStructuredData = [
    {
      id: 'trial',
      name: 'Purrify 12g Trial - Natural Cat Litter Freshener',
      description: 'FREE trial of activated charcoal cat litter additive. Eliminates ammonia odors instantly.',
      sku: 'purrify-12g',
      mpn: 'PURRIFY-12G',
      image: 'https://www.purrify.ca/optimized/17gpink.webp',
      url: `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/trial-size`,
      shippingRate: '4.76',
    },
    {
      id: 'regular',
      name: 'Purrify 50g - Best Cat Litter Freshener for Single-Cat Homes',
      description: '50g activated charcoal cat litter additive. 4-6 weeks of odor control. 100% natural.',
      sku: 'purrify-50g',
      mpn: 'PURRIFY-50G',
      image: 'https://www.purrify.ca/optimized/60g.webp',
      url: `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/standard`,
      shippingRate: '6.99',
    },
    {
      id: 'large',
      name: 'Purrify 240g Family Size - Cat Litter Freshener for Multi-Cat Homes',
      description: 'Best value 240g activated charcoal cat litter additive. Double the supply at less than double the price.',
      sku: 'purrify-240g',
      mpn: 'PURRIFY-240G',
      image: 'https://www.purrify.ca/optimized/140g-640w.avif',
      url: `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/family-pack`,
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
                  "logo": "https://www.purrify.ca/optimized/logo-icon-512.webp"
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
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "138",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }
            };
          })
        }
      },
      ...(breadcrumb ? [breadcrumb.schema] : []),
      generateWebsiteSchema(locale)
    ]
  };

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {/* Combined CollectionPage + Breadcrumb + Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        {breadcrumb && breadcrumb.items.length > 1 && (
          <nav
            aria-label="Breadcrumb"
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

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-brand-purple to-brand-red">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <Package className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                {t.productsPage?.hero?.headline || "Finally... A Way to Love Your Cat Without Apologizing for the Smell"}
              </h1>
              <p className="text-xl md:text-2xl mb-4 opacity-90">
                {t.productsPage?.hero?.subheadline || "The same activated carbon that makes drinking water clean now traps litter box odors at the source. No perfumes. No cover-ups. Just... nothing. (In the best way.)"}
              </p>
              <p className="text-lg opacity-80">
                {t.productsPage?.hero?.supporting || "Pick your size below. Same water-filter grade formula in every bag."}
              </p>
            </div>
          </Container>
        </section>

        {/* Quick Decision Helper */}
        <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Container>
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {t.productsPage?.quickDecision?.title || "Not Sure Which Size? Let Your Nose Decide."}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t.productsPage?.quickDecision?.subtitle || "(Spoiler: It'll thank you either way)"}
              </p>
            </div>

            {/* B2C: ORIGINAL QUICK PICKS WITH PAYMENT LINKS
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {quickPicks.map((pick, index) => {
                const product = products.find(p => p.id === pick.productId);
                return (
                  <a
                    key={index}
                    href={product?.ctaLink || '#'}
                    target={product?.ctaLink?.startsWith('http') ? '_blank' : undefined}
                    rel={product?.ctaLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:bg-brand-light dark:hover:bg-gray-600 transition-all hover:shadow-lg border-2 border-transparent hover:border-brand-purple"
                  >
                    <div className="text-brand-purple dark:text-purple-400 mb-3">
                      {pick.icon}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{pick.question}</p>
                    <p className="font-heading font-bold text-xl text-gray-900 dark:text-gray-100 mb-2 group-hover:text-brand-purple transition-colors">
                      {pick.answer} <ArrowRight className="inline w-4 h-4 ml-1" />
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{pick.detail}</p>
                  </a>
                );
              })}
            </div>
            */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {quickPicks.map((pick, index) => (
                <Link
                  key={index}
                  href={`${locale === 'fr' ? '/fr' : ''}/stores`}
                  className="group bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:bg-brand-light dark:hover:bg-gray-600 transition-all hover:shadow-lg border-2 border-transparent hover:border-brand-purple"
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
          </Container>
        </section>

        {/* Trust Signals */}
        <section className="py-12 bg-brand-light/30 dark:bg-gray-800/50">
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
          </Container>
        </section>

        {/* Social Proof Testimonial Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-brand-light to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-brand-light dark:border-gray-700">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-purple/20 dark:text-purple-400/20" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Testimonial Content */}
                  <div className="md:col-span-2">
                    <h3 className="font-heading text-2xl font-bold text-brand-purple dark:text-purple-400 mb-4">
                      &ldquo;{t.productsPage?.testimonial?.headline || "Game changer for my apartment!"}&rdquo;
                    </h3>
                    <blockquote className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      &ldquo;{t.productsPage?.testimonial?.quote || "I live in a small studio apartment with two cats, and the litter box smell was becoming unbearable. Purrify completely eliminated the odor within 24 hours. I was skeptical about the price at first, but it lasts so much longer than other products I've tried. Worth every penny!"}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">
                        — <span className="font-semibold">{t.productsPage?.testimonial?.author || "Sarah M."}</span>, {t.productsPage?.testimonial?.location || "Montreal, QC"} ({t.productsPage?.testimonial?.details || "2 cats, small apartment"})
                      </span>
                    </div>
                  </div>
                  {/* Image */}
                  <div className="relative hidden md:block">
                    <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src="/optimized/small-apartment-odor-control.webp"
                        alt={locale === 'fr' ? "Chat heureux dans un appartement frais" : "Happy cat in a fresh apartment"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Product Comparison Cards */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t.productComparison.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {locale === 'fr'
                  ? "Tous les formats contiennent exactement la même formule. Choisissez simplement la quantité dont vous avez besoin."
                  : "All sizes contain the exact same formula. Just pick how much you need."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 ${product.recommended
                    ? 'border-brand-red dark:border-red-500'
                    : 'border-brand-light dark:border-gray-700'
                    } overflow-hidden transform hover:scale-105 transition-transform duration-300`}
                >
                  {/* Popular Badge */}
                  {product.popular && (
                    <div className="absolute top-4 right-4 bg-green-500 dark:bg-green-600 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {t.productComparison.popular}
                    </div>
                  )}

                  {/* Recommended Badge */}
                  {product.recommended && (
                    <div className="absolute top-4 right-4 bg-brand-red text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {t.productComparison.bestValue}
                    </div>
                  )}

                  {/* Header with Image */}
                  <div className={`bg-gradient-to-r ${product.color} p-6 text-white dark:text-gray-100`}>
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className={`relative flex-shrink-0 ${product.imageSize === 'sm' ? 'w-20 h-24' :
                        product.imageSize === 'md' ? 'w-24 h-28' :
                          'w-28 h-32'
                        }`}>
                        <Image
                          src={product.image}
                          alt={product.displayName}
                          fill
                          className="object-contain drop-shadow-lg"
                          sizes="(max-width: 768px) 80px, 112px"
                        />
                      </div>
                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold mb-1">{product.displayName}</h3>
                        <p className="text-sm opacity-80 mb-3">{product.displaySubtitle}</p>
                        {/* B2C: HIDDEN PRICING DISPLAY
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold">{product.price}</span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm line-through opacity-70">{product.originalPrice}</span>
                          )}
                        </div>
                        {product.savings && (
                          <p className="text-sm mt-1 opacity-90">Save {product.savings}</p>
                        )}
                        */}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-brand-purple" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">{t.productComparison.duration}</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{product.duration}</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-brand-purple" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">{t.productComparison.idealFor}</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{product.cats}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-heading font-bold mb-3 text-gray-900 dark:text-gray-100">{t.productComparison.features}:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For */}
                    <div className="mb-6 p-4 bg-brand-light/30 dark:bg-gray-700/30 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">{t.productComparison.idealFor}:</span> {product.bestFor}
                      </p>
                    </div>

                    {/* B2C: ORIGINAL CTA BUTTONS
                    {product.ctaLink.startsWith('http') ? (
                      <a href={product.ctaLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                        <Button
                          size="lg"
                          className={`w-full ${product.recommended
                            ? 'bg-brand-red hover:bg-brand-red/90 text-white'
                            : 'bg-brand-purple hover:bg-brand-purple/90 text-white'
                            }`}
                        >
                          {product.cta}
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                        <p className="mt-3 text-[10px] text-center text-gray-500 dark:text-gray-400 font-bold italic uppercase tracking-tighter">
                          * {t.pricing?.stripeShippingNote}
                        </p>
                      </a>
                    ) : (
                      <Link href={`${locale === 'fr' ? '/fr' : ''}${product.ctaLink}`}>
                        <Button
                          size="lg"
                          className={`w-full ${product.recommended
                            ? 'bg-brand-red hover:bg-brand-red/90 text-white'
                            : 'bg-brand-purple hover:bg-brand-purple/90 text-white'
                            }`}
                        >
                          {product.cta}
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    )}
                    */}
                    {/* CTA Buttons */}
                    {product.id === 'trial' && product.ctaLink?.startsWith('http') ? (
                      // Trial product: Direct Stripe checkout with compelling CTA
                      <div className="space-y-3">
                        <a href={product.ctaLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                          <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white dark:text-white font-bold shadow-lg hover:shadow-xl transition-all"
                          >
                            <Sparkles className="w-5 h-5 mr-2" />
                            {locale === 'fr' ? "Envoyer Mon Essai GRATUIT" : "Send My FREE Trial"}
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </Button>
                        </a>
                        <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
                          {locale === 'fr' ? `Juste ${product.price} pour l'expédition partout au Canada` : `Just ${product.price} shipping anywhere in Canada`}
                        </p>
                      </div>
                    ) : (
                      // Other products: Find a Store (B2B)
                      <Link href={`${locale === 'fr' ? '/fr' : ''}/stores`}>
                        <Button
                          size="lg"
                          className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white dark:text-gray-100"
                        >
                          <MapPin className="w-5 h-5 mr-2" />
                          {t.nav?.findStore || "Get Purrify Near You"}
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* What You Get Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {t.productsPage?.whatYouGet?.title || "What's Actually in the Bag"}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {t.productsPage?.whatYouGet?.subtitle || "(And Why Your Cat Will Never Notice It)"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(t.productsPage?.whatYouGet?.benefits || [
                  { title: "Water-Filter Grade Activated Carbon", description: "The exact same material used in Brita filters and hospital air purification. Not 'similar to.' The same." },
                  { title: "Zero Fragrances. Zero Chemicals. Zero Worries.", description: "Cats have 200 million scent receptors. Artificial fragrances stress them. Purrify works invisibly." },
                  { title: "Clay, Crystal, Clumping, Natural... We Don't Judge", description: "Works with whatever litter your cat has trained you to buy. No switching drama." },
                  { title: "Open. Sprinkle. Done.", description: "A thin layer on top. 30 seconds of effort for 7 days of results." }
                ]).map((benefit, index) => (
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

              {/* The Football Field Fact */}
              <div className="mt-12 p-6 bg-brand-purple/5 dark:bg-brand-purple/10 rounded-xl border border-brand-purple/20">
                <div className="flex items-start space-x-4">
                  <Zap className="w-8 h-8 text-brand-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {t.productsPage?.didYouKnow?.title || "The Science Your Cat Doesn't Care About (But Your Nose Will)"}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
                      {t.productsPage?.didYouKnow?.body || "A single gram of activated carbon contains roughly 3,000 square meters of surface area. That's bigger than half a football field — in something smaller than a pea.\n\nInside are millions of microscopic pores and tunnels. When ammonia molecules float past, they get trapped permanently.\n\nThis isn't masking. It's molecular capture. The same technology used in gas masks, water treatment plants, and hospital air filtration. Now sitting on top of your cat's litter."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Usage Calculator */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t.productComparison.howLongWillEachSizeLast}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t.productComparison.usageCalculator.subtitle}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-brand-purple to-brand-red text-white dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">{t.productComparison.usageCalculator.numberOfCats}</th>
                      <th className="px-6 py-4 text-center font-bold">{t.productComparison.usageCalculator.typicalChanges}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Format Essai' : 'Trial Bag'}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Format Régulier' : 'Regular Bag'}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Grand Format' : 'Large Bag'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageCalculator.map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="px-6 py-4 font-bold text-brand-purple">
                          {row.cats} {row.cats > 1 ? t.productComparison.units.cats : t.productComparison.units.cat}
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
          </Container>
        </section>

        {/* B2C: ORIGINAL CTA SECTION
        <section className="py-16 bg-gradient-to-br from-brand-purple to-brand-red cv-auto cis-720">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <Zap className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {t.productComparison.stillUnsure}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t.productComparison.stillUnsureDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-brand-purple hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                    {t.productComparison.tryRiskFree}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/contact`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                    {t.productComparison.getPersonalizedAdvice}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
        */}
        {/* CTA Section - B2B: Find a Store */}
        <section className="py-16 bg-gradient-to-br from-brand-purple to-brand-red cv-auto cis-720">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <MapPin className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {t.productsPage?.cta?.title || "Your Nose Deserves Better. So Does Your Cat."}
              </h2>
              <p className="text-xl mb-4 opacity-90">
                {t.productsPage?.cta?.subtitle || "Ask for Purrify at your favorite pet store. If they don't carry it yet, they should."}
              </p>
              <p className="text-base mb-8 opacity-80">
                {t.productsPage?.cta?.secondary || "Not seeing your store? Let us know. We'll reach out and make it happen."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/stores`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-brand-purple hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                    <MapPin className="w-5 h-5 mr-2" />
                    {t.nav?.findStore || "Find a Store"}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/contact`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                    {t.productComparison.getPersonalizedAdvice}
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t.productComparison.learnMoreAboutPurrify}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(t.productsPage?.relatedPages || t.productComparison.relatedPages).map((page, index) => (
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
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/products" />
          </Container>
        </section>
      </main>
    </>
  );
};

export default ProductsPage;
