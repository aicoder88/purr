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
      name: 'Trial Bag',
      nameFr: 'Format Essai',
      subtitle: '12g · Perfect for trying',
      subtitleFr: '12g · Parfait pour essayer'
    },
    regular: {
      name: 'Regular Bag',
      nameFr: 'Format Régulier',
      subtitle: '120g · Most Popular',
      subtitleFr: '120g · Le plus populaire'
    },
    large: {
      name: 'Large Bag',
      nameFr: 'Grand Format',
      subtitle: '240g · Best Value',
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

  // Quick decision helper data
  const quickPicks = [
    {
      question: locale === 'fr' ? "Vous voulez essayer ?" : "Just want to try it?",
      answer: locale === 'fr' ? "Format Essai GRATUIT" : "FREE Trial Bag",
      detail: locale === 'fr' ? "Payez seulement les frais de port. Résultats visibles en quelques jours." : "Pay only shipping. See results in days.",
      productId: "trial",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      question: locale === 'fr' ? "1-2 chats à la maison ?" : "1-2 cats at home?",
      answer: locale === 'fr' ? "Format Régulier" : "Regular Bag",
      detail: locale === 'fr' ? "3 mois de fraîcheur. Le choix le plus populaire." : "3 months of freshness. Most popular choice.",
      productId: "regular",
      icon: <Cat className="w-6 h-6" />,
    },
    {
      question: locale === 'fr' ? "Plusieurs chats ?" : "Multi-cat household?",
      answer: locale === 'fr' ? "Grand Format" : "Large Bag",
      detail: locale === 'fr' ? "Meilleur rapport qualité-prix. Livraison gratuite." : "Best value. Free shipping.",
      productId: "large",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  // Trust signals
  const trustSignals = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Water-Filter Grade",
      description: "Same activated carbon used in drinking water filtration",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Natural",
      description: "Made from coconut shells. No chemicals or fragrances.",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Traps, Not Masks",
      description: "Eliminates odor molecules instead of covering them up",
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
          "itemListElement": products.map((product, index) => ({
            "@type": "Product",
            "position": index + 1,
            "name": product.name,
            "description": product.subtitle,
            "brand": {
              "@type": "Brand",
              "name": "Purrify"
            },
            "offers": {
              "@type": "Offer",
              "price": product.price.replace('$', '').replace(',', ''),
              "priceCurrency": currency,
              "priceValidUntil": priceValidUntil,
              "availability": availabilityUrl
            }
          }))
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
                {locale === 'fr' ? "Un produit. Trois formats." : "One Product. Three Sizes."}
              </h1>
              <p className="text-xl md:text-2xl mb-4 opacity-90">
                {locale === 'fr'
                  ? "Du charbon actif de qualité filtration, fabriqué à partir de coques de noix de coco."
                  : "Filtration-grade activated carbon, made from coconut shells."}
              </p>
              <p className="text-lg opacity-80">
                {locale === 'fr'
                  ? "La seule différence ? La quantité que vous recevez."
                  : "The only difference? How much you get."}
              </p>
            </div>
          </Container>
        </section>

        {/* Quick Decision Helper */}
        <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Container>
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {locale === 'fr' ? "Choisissez en 5 secondes" : "Pick in 5 Seconds"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === 'fr' ? "Répondez à une question, obtenez votre réponse." : "Answer one question, get your answer."}
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
                  href={`${locale === 'fr' ? '/fr' : ''}/stockists`}
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
                    {/* CTA Button - B2B: Find a Store */}
                    <Link href={`${locale === 'fr' ? '/fr' : ''}/stockists`}>
                      <Button
                        size="lg"
                        className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white dark:text-gray-100"
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        {t.nav?.findStore || "Find a Store"}
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
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
                  {locale === 'fr' ? "Ce que vous obtenez" : "What You Get"}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {locale === 'fr'
                    ? "Chaque format inclut la même qualité premium"
                    : "Every size includes the same premium quality"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {locale === 'fr' ? "Charbon actif de coque de noix de coco" : "Coconut Shell Activated Carbon"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {locale === 'fr'
                        ? "Le même matériau utilisé dans les filtres à eau résidentiels"
                        : "The same material used in residential drinking water filters"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {locale === 'fr' ? "Aucun parfum ni produit chimique" : "Zero Fragrances or Chemicals"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {locale === 'fr'
                        ? "Rien qui puisse irriter le système respiratoire sensible de votre chat"
                        : "Nothing that could irritate your cat's sensitive respiratory system"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {locale === 'fr' ? "Compatible avec toutes les litières" : "Works With Any Litter"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {locale === 'fr'
                        ? "Argile, cristal, naturelle - tout ce que votre chat utilise déjà"
                        : "Clay, crystal, natural - whatever your cat already uses"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {locale === 'fr' ? "Application simple" : "Simple Application"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {locale === 'fr'
                        ? "Saupoudrez une fine couche sur la litière. C'est tout."
                        : "Sprinkle a thin layer on top of litter. That's it."}
                    </p>
                  </div>
                </div>
              </div>

              {/* The Football Field Fact */}
              <div className="mt-12 p-6 bg-brand-purple/5 dark:bg-brand-purple/10 rounded-xl border border-brand-purple/20">
                <div className="flex items-start space-x-4">
                  <Zap className="w-8 h-8 text-brand-purple flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {locale === 'fr' ? "Le saviez-vous ?" : "Did You Know?"}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200">
                      {locale === 'fr'
                        ? "Un seul gramme de charbon actif a la surface d'un terrain de football. Ces tunnels microscopiques piègent les molécules d'odeur au contact - pas de masquage, juste de l'élimination pure."
                        : "One gram of activated carbon has the surface area of a football field. Those microscopic tunnels trap odor molecules on contact - no masking, just pure elimination."}
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
                {t.productsSection?.askYourStore || "Ask for Purrify at Your Local Store"}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t.productsSection?.availableAtStores || "Available at pet stores across Canada"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/stockists`}>
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
              {t.productComparison.relatedPages.map((page, index) => (
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
