import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, Heart, Zap, Truck } from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { ProductFAQ } from '../../src/components/product/ProductFAQ';
import { BNPLBadge } from '../../src/components/product/BNPLBadge';
import { StickyAddToCart } from '../../src/components/product/StickyAddToCart';
import { QuantitySelector } from '../../src/components/product/QuantitySelector';
import { GuaranteeBadge } from '../../src/components/ui/GuaranteeBadge';
import { buildLanguageAlternates, getLocalizedUrl, getPriceValidityDate, buildAvailabilityUrl } from '../../src/lib/seo-utils';
import { formatProductPrice, getProductPrice } from '../../src/lib/pricing';
import { getPaymentLink } from '../../src/lib/payment-links';
import { useEffect, useRef, useCallback, useState } from 'react';
import { trackTikTokClientEvent } from '../../src/lib/tiktok-tracking';

interface StandardSizePageProps {
  priceValidUntil: string;
}

export default function StandardSizePage({ priceValidUntil }: StandardSizePageProps) {
  const { t, locale } = useTranslation();
  const viewTracked = useRef(false);
  const purchaseCardsRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);

  const productKey = 'standard'; // 50g Standard Size
  const productName = t.products?.["purrify-50g"]?.name || "Purrify Standard Size (50g)";
  const productPrice = formatProductPrice(productKey, locale);
  const numericPrice = getProductPrice(productKey);

  // Track ViewContent on page load
  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;

    trackTikTokClientEvent('ViewContent', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      value: numericPrice,
      currency: 'CAD',
    });
  }, [productKey, productName, numericPrice]);

  // Track AddToCart + InitiateCheckout when user clicks buy
  const handleBuyClick = useCallback((isAutoship: boolean, quantity: number = 1) => {
    const price = isAutoship ? getProductPrice('standardAutoship') : numericPrice;
    const name = isAutoship ? `${productName} - Autoship` : productName;

    trackTikTokClientEvent('AddToCart', {
      content_id: productKey,
      content_name: name,
      content_type: 'product',
      quantity: quantity,
      value: price * quantity,
      currency: 'CAD',
    });

    trackTikTokClientEvent('InitiateCheckout', {
      content_id: productKey,
      content_name: name,
      content_type: 'product',
      quantity: quantity,
      value: price * quantity,
      currency: 'CAD',
    });
  }, [numericPrice, productName, productKey]);

  // Handler for sticky cart
  const handleStickyAddToCart = useCallback((quantity: number) => {
    handleBuyClick(false, quantity);
  }, [handleBuyClick]);

  const pageTitle = `${productName} - Cat Litter Freshener & Charcoal Additive | Purrify`;
  const pageDescription = "Best cat litter freshener for single-cat homes. 50g activated charcoal cat litter additive eliminates ammonia odors for 4-6 weeks. Natural, fragrance-free, works with any litter. Ships to USA & Canada.";

  const canonicalUrl = getLocalizedUrl('/products/standard', locale);
  const languageAlternates = buildLanguageAlternates('/products/standard');

  const singleCheckoutUrl = getPaymentLink('standardSingle') || '#';
  const autoshipCheckoutUrl = getPaymentLink('standardAutoship') || '#';

  // Optimized images
  const heroImage = "/optimized/60g.webp";
  const solutionImage = "/optimized/regular_size_solution.webp";
  const productImage = "/optimized/60g.webp";

  const benefits = [
    "Ideal for single-cat households",
    "4-6 weeks of continuous odor control",
    "Advanced activated carbon formula",
    "100% natural, fragrance-free, and safe",
    "Works instantly on litter box smells"
  ];

  const productFaqType = 'standard';
  const productFaqName = "Standard Size (50g)";


  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          type: 'product',
          locale: locale === 'fr' ? 'fr_CA' : locale === 'zh' ? 'zh_CN' : 'en_CA',
          images: [
            {
              url: 'https://www.purrify.ca' + productImage,
              width: 1200,
              height: 630,
              alt: productName,
              type: 'image/webp'
            }
          ]
        }}
      />

      {/* Product Schema for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": canonicalUrl,
            "name": "Purrify 50g - Natural Cat Litter Freshener & Charcoal Additive",
            "description": "Best-selling cat litter freshener for single-cat homes. 50g activated charcoal cat litter additive made from coconut shells. Eliminates ammonia for 4-6 weeks. 100% natural, fragrance-free deodorizer.",
            "image": [
              "https://www.purrify.ca/optimized/60g.webp"
            ],
            "brand": {
              "@type": "Brand",
              "name": "Purrify",
              "logo": "https://www.purrify.ca/optimized/purrify-logo-icon.webp"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "Purrify",
              "url": "https://www.purrify.ca"
            },
            "category": "Pet Supplies > Cat Supplies > Cat Litter Additives",
            "sku": "purrify-50g",
            "mpn": "PURRIFY-50G",
            "weight": {
              "@type": "QuantitativeValue",
              "value": "50",
              "unitCode": "GRM"
            },
            "size": "50g",
            "color": "Black",
            "material": "Activated Carbon (Coconut Shell)",
            "offers": {
              "@type": "Offer",
              "url": canonicalUrl,
              "priceCurrency": "CAD",
              "price": numericPrice.toFixed(2),
              "priceValidUntil": priceValidUntil,
              "availability": buildAvailabilityUrl('InStock'),
              "itemCondition": "https://schema.org/NewCondition",
              "seller": {
                "@type": "Organization",
                "name": "Purrify"
              },
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "6.99",
                  "currency": "CAD"
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
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "CA"
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
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Pet Type",
                "value": "Cat"
              },
              {
                "@type": "PropertyValue",
                "name": "Main Ingredient",
                "value": "Activated Carbon from Coconut Shells"
              },
              {
                "@type": "PropertyValue",
                "name": "Usage Duration",
                "value": "4-6 weeks per application"
              },
              {
                "@type": "PropertyValue",
                "name": "Compatibility",
                "value": "Works with all litter types"
              }
            ],
            "audience": {
              "@type": "Audience",
              "name": "Single-cat households"
            },
            "inLanguage": locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA'
          })
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-6 text-sm">
            <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <li>
                <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-deep-coral transition-colors">
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`} className="hover:text-deep-coral transition-colors">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-deep-coral font-semibold">{productName}</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="pb-16 pt-4">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Product Image Stage */}
              <div className="relative">
                <div className="absolute -inset-10 bg-gradient-to-tr from-electric-indigo/20 to-deep-coral/20 rounded-[40px] blur-3xl opacity-60 animate-pulse"></div>
                <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-[32px] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                  <Image
                    src={productImage}
                    alt={productName}
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-8 right-8">
                    <div className="bg-deep-coral text-white dark:text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="font-heading text-5xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                    <span className="bg-gradient-to-r from-deep-coral to-electric-indigo bg-clip-text text-transparent">
                      {productName}
                    </span>
                  </h1>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 dark:text-yellow-500" />
                      ))}
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">4.9</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">138+ Verified Home Stories</span>
                  </div>

                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                    The perfect solution for single-cat households. 50 grams of high-surface-area activated carbon that traps ammonia before it ever reaches your nose.
                  </p>
                </div>

                {/* Purchase Cards - This is the target element for sticky cart */}
                <div ref={purchaseCardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Autoship Option */}
                  <div className="relative group overflow-hidden bg-white dark:bg-gray-900 border-2 border-deep-coral rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-2 bg-deep-coral text-white dark:text-white text-[10px] font-black uppercase tracking-tighter rounded-bl-xl">
                      Save 30%
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Subscribe & Save</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-black text-gray-900 dark:text-white">{formatProductPrice('familyAutoship', locale)}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">/ 3 months</span>
                    </div>
                    <Button asChild className="w-full bg-deep-coral hover:bg-deep-coral/90 text-white dark:text-white font-bold py-6 rounded-2xl shadow-lg shadow-deep-coral/20">
                      <a href={autoshipCheckoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleBuyClick(true)} className="flex items-center gap-2">
                        Get Autoship <Zap className="w-4 h-4 fill-current" />
                      </a>
                    </Button>
                    {autoshipCheckoutUrl.startsWith('http') && (
                      <p className="mt-3 text-[10px] text-center text-gray-400 dark:text-gray-500 font-bold italic uppercase tracking-tighter">
                        * {t.pricing?.stripeShippingNote}
                      </p>
                    )}
                    <p className="text-[10px] text-center mt-3 text-gray-400 dark:text-gray-500 font-medium">Cancel anytime. Ships free.</p>
                  </div>

                  {/* One-time Option */}
                  <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">One-Time</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-black text-gray-900 dark:text-white">{productPrice}</span>
                      {quantity > 1 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                          × {quantity} = ${(numericPrice * quantity).toFixed(2)}
                        </span>
                      )}
                    </div>
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {t.productsSection?.quantity || 'Quantity'}
                      </span>
                      <QuantitySelector
                        quantity={quantity}
                        onChange={setQuantity}
                        min={1}
                        max={10}
                        size="md"
                      />
                    </div>
                    <Button asChild variant="outline" className="w-full border-2 border-gray-900 dark:border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 font-bold py-6 rounded-2xl">
                      <a href={singleCheckoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleBuyClick(false, quantity)}>
                        Buy Now
                      </a>
                    </Button>
                    {singleCheckoutUrl.startsWith('http') && (
                      <p className="mt-3 text-[10px] text-center text-gray-400 dark:text-gray-500 font-bold italic uppercase tracking-tighter leading-tight">
                        * {t.pricing?.stripeShippingNote}
                      </p>
                    )}
                    <p className="text-[10px] text-center mt-3 text-gray-400 dark:text-gray-500 font-medium">+ $6.99 Shipping</p>
                  </div>
                </div>

                <div className="pt-2">
                  <BNPLBadge price={getProductPrice(productKey)} locale={locale} />
                </div>

                {/* Quick Trust */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <GuaranteeBadge size="md" />
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 rounded-md">
                    <Truck className="w-4 h-4" />
                    Ships Next Business Day
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Product-Specific FAQ */}
        <section className="py-12 bg-white/30 dark:bg-gray-900/30">
          <Container>
            <div className="max-w-3xl mx-auto">
              <ProductFAQ productType={productFaqType} productName={productFaqName} />
            </div>
          </Container>
        </section>

        {/* Feature/Lifestyle Section 1 */}
        <section className="py-24 bg-white/50 dark:bg-black/20 overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
                <Image
                  src={heroImage}
                  alt="Purrify Regular Size in action"
                  width={800}
                  height={600}
                  className="relative rounded-[40px] shadow-2xl border-8 border-white dark:border-gray-800"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Scientifically Proven
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                  Stop Masking. <br />
                  <span className="text-electric-indigo">Start Eliminating.</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Most deodorizers use heavy perfumes to hide smells. Purrify works like a magnet—trapping ammonia gas molecules inside millions of microscopic pores. It's the same filtration-grade technology used in drinking water systems and hospital air purifiers.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-bold text-gray-700 dark:text-gray-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Values Block */}
        <section className="py-24">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-10 rounded-[32px] text-center space-y-4 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-electric-indigo/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-electric-indigo" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white">Professional Grade</h3>
                <p className="text-gray-600 dark:text-gray-400">Used by vets and professional cleaning services across Canada.</p>
              </div>
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-10 rounded-[32px] text-center space-y-4 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-deep-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-deep-coral" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white">100% Cat Safe</h3>
                <p className="text-gray-600 dark:text-gray-400">Fragrance-free, chemical-free, and safe if accidentally ingested.</p>
              </div>
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-10 rounded-[32px] text-center space-y-4 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-8 h-8 text-green-500 dark:text-green-400" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white">Best Value</h3>
                <p className="text-gray-600 dark:text-gray-400">One regular size replaces 4-5 spray cans or expensive plugins.</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Product Detail Image */}
        <section className="py-24 bg-gray-900 dark:bg-gray-900 text-white dark:text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-electric-indigo/20 to-deep-coral/20 opacity-40"></div>
          <Container className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="font-heading text-4xl md:text-5xl font-black leading-tight text-white dark:text-white">
                  High-Surface Area <br />
                  <span className="text-deep-coral">Molecular Filtration</span>
                </h2>
                <p className="text-xl text-gray-400 dark:text-gray-300 leading-relaxed">
                  Our activated carbon is sourced from premium coconut shells, processed to maximize the surface area that "captures" odor particles. Just one gram has a surface area equivalent to a tennis court.
                </p>
                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 dark:border-white/5">
                  <p className="text-deep-coral font-black mb-2 uppercase tracking-widest text-sm">Real Results</p>
                  <p className="italic text-lg text-white dark:text-white">"My husband used to complain the second he walked through the door. Since we started using the Regular Size, he doesn't even notice the litter area anymore! Game changer for our small apartment."</p>
                  <p className="mt-4 font-bold text-white dark:text-white">— Sarah L., Toronto</p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={solutionImage}
                  alt="Purrify carbon granules close-up"
                  width={800}
                  height={800}
                  className="rounded-[40px] shadow-2xl grayscale brightness-110 hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 bg-white dark:bg-gray-950">
          <Container>
            <div className="bg-gradient-to-r from-deep-coral/5 to-electric-indigo/5 border border-gray-100 dark:border-gray-800 rounded-[48px] p-12 md:p-24 text-center space-y-10">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="font-heading text-4xl md:text-6xl font-black text-gray-900 dark:text-white">
                  Experience Fresh Air Again
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Join 1,000+ happy Canadians who have reclaimed their homes from stubborn litter box odors.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="space-y-4 w-full sm:w-auto">
                  <Button asChild size="lg" className="h-20 px-12 text-xl font-black bg-deep-coral hover:bg-deep-coral/90 text-white dark:text-white rounded-[24px] shadow-2xl shadow-deep-coral/20 min-w-[280px]">
                    <a href={autoshipCheckoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleBuyClick(true)} className="flex items-center gap-3">
                      Start Your Fresh Journey <Zap className="w-5 h-5 fill-current" />
                    </a>
                  </Button>
                  {autoshipCheckoutUrl.startsWith('http') && (
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 italic">
                      * {t.pricing?.stripeShippingNote}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400 dark:text-gray-500">30-Day Happiness Guarantee • Free Shipping on Autoship</p>
            </div>
          </Container>
        </section>

        {/* Back navigation */}
        <section className="py-12 border-t border-gray-100 dark:border-gray-900">
          <Container className="text-center">
            <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`} className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-deep-coral font-bold gap-2 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to all sizes
            </Link>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-24 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/products/standard" />
          </Container>
        </section>
      </main>

      {/* Sticky Add to Cart */}
      <StickyAddToCart
        productName={productName}
        productSize="50g"
        price={productPrice}
        checkoutUrl={singleCheckoutUrl}
        onAddToCart={handleStickyAddToCart}
        targetRef={purchaseCardsRef}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<StandardSizePageProps> = async () => {
  // Calculate price valid date at build time to avoid hydration mismatch
  const priceValidUntil = getPriceValidityDate(90);

  return {
    props: {
      priceValidUntil,
    },
    // Revalidate every 24 hours to keep the date fresh
    revalidate: 86400,
  };
};
