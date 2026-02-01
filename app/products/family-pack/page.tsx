"use client";

import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, Heart, Users, Zap, Truck, MapPin, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useCallback, useState } from 'react';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/translation-context';
import { useCurrency } from '@/lib/currency-context';
import { getSEOMeta } from '@/translations/seo-meta';
import { SITE_NAME } from '@/lib/constants';
import { getPriceValidityDate, generateFAQSchema } from '@/lib/seo-utils';
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import Image from 'next/image';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { ProductFAQ } from '@/components/product/ProductFAQ';
import { GuaranteeBadge } from '@/components/ui/GuaranteeBadge';
import { trackTikTokClientEvent } from '@/lib/tiktok-tracking';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { useAggregateReview } from '@/hooks/useAggregateReview';

export default function FamilyPackPage() {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();
  const viewTracked = useRef(false);
  const purchaseCardsRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);

  const priceValidUntil = getPriceValidityDate(90);
  const productKey = 'family';
  const productName = 'Purrify Family Size (240g)';

  // Track ViewContent on page load
  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;

    const numericPrice = getProductPrice(productKey, currency);
    trackTikTokClientEvent('ViewContent', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      value: numericPrice,
      currency: 'CAD',
    });
  }, [currency, productKey, productName]);

  // Track AddToCart + InitiateCheckout when user clicks buy
  const handleBuyClick = useCallback((isAutoship: boolean, quantity: number = 1) => {
    const price = isAutoship ? getProductPrice('familyAutoship', currency) : getProductPrice(productKey, currency);
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
  }, [currency, productKey, productName]);

  // Handler for sticky cart
  const handleStickyAddToCart = useCallback((quantity: number) => {
    handleBuyClick(false, quantity);
  }, [handleBuyClick]);

  // Use optimized SEO meta content
  const seoMeta = getSEOMeta(locale as 'en' | 'fr' | 'zh' | 'es', 'products', 'family');
  const pageTitle = seoMeta?.title || `${SITE_NAME} Family Pack - Best Cat Litter Freshener for Multi-Cat Homes`;
  const pageDescription = seoMeta?.description || "Best value cat litter freshener for multi-cat households. 240g activated charcoal additive provides 2 months of odor control. Natural coconut shell formula works with any litter. Ships to USA & Canada.";

  const trialPrice = formatProductPrice('trial', currency, locale);
  const standardPrice = formatProductPrice('standard', currency, locale);
  const standardPriceAmount = getProductPrice('standard', currency);
  const familyPrice = formatProductPrice('family', currency, locale);
  const familyAutoshipPrice = formatProductPrice('familyAutoship', currency, locale);
  const familyPriceAmount = getProductPrice('family', currency);
  const familyAutoshipAmount = getProductPrice('familyAutoship', currency);
  const familyAutoshipSavings = Math.max(
    0,
    Math.round((1 - familyAutoshipAmount / (familyPriceAmount * 3)) * 100)
  );
  const familyAutoshipPerMonth = formatCurrencyValue(familyAutoshipAmount / 3, locale);
  const familyAutoshipLink = getPaymentLink('familyAutoship');
  const checkoutUrl = locale === 'en' ? '/checkout' : `/${locale}/checkout`;

  // Get aggregate review data
  const { data: reviewData } = useAggregateReview(productKey, locale);

  // Use enhanced SEO hook for automated optimization
  const { nextSeoProps, schema } = useEnhancedSEO({
    path: '/products/family-pack',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter freshener family pack',
    schemaType: 'product',
    schemaData: {
      name: 'Purrify 240g Family Size - Cat Litter Freshener & Charcoal Additive',
      description: 'Best value cat litter freshener for multi-cat homes. 240g activated charcoal cat litter additive from coconut shells. Best value per gram. 100% natural, fragrance-free, pet-friendly deodorizer.',
      image: ['https://www.purrify.ca/optimized/140g-640w.avif'],
      price: familyPriceAmount.toFixed(2),
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      sku: 'purrify-240g',
      mpn: 'PURRIFY-240G',
      shippingRate: '0',
      rating: {
        value: reviewData.ratingValue,
        count: reviewData.reviewCount,
      },
    },
    image: 'https://www.purrify.ca/optimized/60g.webp',
  });

  // Family pack lifestyle images
  const heroImage = '/images/replacements/multi-cat-family-ghibli.png'; // Multiple cats happy home
  const sectionImage1 = '/images/replacements/multi-cat-home-ghibli.png'; // Multi-cat household
  const solutionImage = '/images/replacements/multi-cat-success-ghibli.png'; // Happy multi-cat family

  const benefits = [
    "Double the supply at less than double the price—the math just makes sense",
    "Lasts 7+ days per application across multiple litter boxes",
    "The go-to size for multi-cat homes that refuse to compromise on freshness",
    "Best value per gram for serious odor control without the premium price tag",
    "Stock up once, stay fresh longer—less reordering, more peace of mind"
  ];

  const testimonials = [
    {
      name: "Kai L., Outremont",
      text: "Eco-conscious cat parent here! Love that it's just activated charcoal - no weird chemicals for my cats to inhale. The 120g size is perfect for my two-cat household.",
      rating: 5,
      petName: "Luna & Shadow"
    },
    {
      name: "Noor A., West Island",
      text: "Three cats in a small townhouse. You can imagine the chaos! The 120g size handles all three beautifully. My mother-in-law finally visits again!",
      rating: 5,
      petName: "Muffin, Simba & Cleo"
    }
  ];

  return (
    <>
      {/* Enhanced Product JSON-LD from useEnhancedSEO hook */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                schema,
                // FAQ Schema for product page
                generateFAQSchema(locale),
              ],
            }),
          }}
        />
      )}

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <li>
                <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`${locale !== 'en' ? `/${locale}` : ''}/#products`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Family Pack</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                  <Image
                    src="/optimized/140g-640w.avif"
                    alt="Purrify 240g Family Size"
                    width={400}
                    height={400}
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-4 right-4 bg-[#03E46A] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">
                    BEST VALUE
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">
                    Purrify Family Pack
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                    240g Cat Litter Odor Control
                  </p>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">(127 reviews)</span>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#03E46A] flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* B2B: Find a Store CTA */}
                <div ref={purchaseCardsRef} className="space-y-5">
                  <div className="rounded-2xl border-2 border-[#FF3131] bg-white dark:bg-gray-900 p-8 shadow-xl">
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {t.productsSection?.askYourStore || "Ask for Purrify at Your Local Store"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {t.productsSection?.availableAtStores || "Available at pet stores across Canada"}
                    </p>
                    <Button asChild className="w-full bg-[#FF3131] hover:bg-[#FF3131]/90 text-white dark:text-white font-bold py-6 rounded-2xl shadow-lg">
                      <Link href={`${locale !== 'en' ? `/${locale}` : ''}/stores`} className="flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {t.nav?.findStore || "Find a Store"}
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="flex space-x-3">
                    <Link href={`${locale !== 'en' ? `/${locale}` : ''}/reviews`} className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        <Users className="w-5 h-5 mr-2" />
                        Read Reviews
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="border-t pt-6 space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <GuaranteeBadge size="md" />
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 rounded-md">
                      <Truck className="w-4 h-4" />
                      Ships within 24 hours
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Free shipping on autoship bundles
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Product-Specific FAQ */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900/30">
          <Container>
            <div className="max-w-3xl mx-auto">
              <ProductFAQ productType="family" productName="Family Size (240g)" />
            </div>
          </Container>
        </section>

        {/* Value Proposition Section */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Maximum Value for Multi-Cat Homes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our 240g family pack provides unbeatable value and convenience for households with multiple cats
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">60</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Days of Coverage</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Two full months of odor control for multi-cat households
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">25%</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Cost Savings</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.productPages?.save25vsStandard || 'Save 25% compared to buying two standard sizes'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#03E46A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">3+</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Perfect for 3+ Cats</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Handles the odor control needs of large cat families
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8">
              <h3 className="font-heading text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50">
                Family Pack Value Calculator
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Standard Size (50g)
                  </div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {standardPrice}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Cost per 10g: {(standardPriceAmount / 5).toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Family Pack (240g)
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {familyPrice}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    Cost per 10g: {(familyPriceAmount / 24).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {locale === 'fr'
                    ? "Vous obtenez 20 % de produit en plus et economisez sur le prix au gramme !"
                    : "You get 20% more product and save on price-per-gram!"}
                </p>
              </div>
            </div>

          </Container>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Multi-Cat Success Stories
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">&quot;{testimonial.text}&quot;</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-50">- {testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pet parent to {testimonial.petName}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={`${locale !== 'en' ? `/${locale}` : ''}/reviews`}>
                <Button variant="outline" size="lg">
                  Read All Multi-Cat Stories
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Size Comparison */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Find Your Perfect Size
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choose the right amount for your household
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Trial Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">12g - Single use test</p>
                <Link href={`${locale !== 'en' ? `/${locale}` : ''}/products/trial-size`}>
                  <Button variant="outline" className="w-full">View Trial Size</Button>
                </Link>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Standard Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">50g - One month supply</p>
                <Link href={`${locale !== 'en' ? `/${locale}` : ''}/products/standard`}>
                  <Button variant="outline" className="w-full">View Standard Size</Button>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#03E46A]/10 to-[#5B2EFF]/10 dark:from-[#03E46A]/10 dark:to-[#3694FF]/10 p-6 rounded-xl shadow-lg text-center border-2 border-[#03E46A] dark:border-[#03E46A]">
                <div className="bg-[#03E46A] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  BEST VALUE
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Family Pack</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">240g - Best value per gram</p>
                <Button className="w-full">Currently Viewing</Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Back to Products */}
        <section className="py-8 cv-auto cis-480">
          <Container>
            <div className="text-center">
              <Link href={`${locale !== 'en' ? `/${locale}` : ''}/#products`}>
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to All Products
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Multi-Cat Lifestyle Image 1 */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={heroImage}
                alt="Happy multiple cats in fresh, odor-free home with Purrify Family Pack"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="font-heading text-3xl font-bold mb-2">Perfect for Multi-Cat Families</h2>
                  <p className="text-xl opacity-90">Best value per gram. Lasts 7+ days per application—use more, stays fresh longer.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Multi-Cat Household Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage1}
                alt="Multi-cat household enjoying Purrify Family Pack odor control"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="font-heading text-2xl font-bold mb-2">Handles Heavy Usage</h3>
                  <p className="text-lg opacity-90">Powerful enough for 3+ cats</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Happy Family Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={solutionImage}
                alt="Happy cat family enjoying fresh home with Purrify Family Pack"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="font-heading text-2xl font-bold mb-2">Best Value, Happiest Cats</h3>
                  <p className="text-lg opacity-90">{t.productPages?.save25FamilyPack || 'Save 25% with our Family Pack'}</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedContent currentUrl="/products/family-pack" />
          </Container>
        </section>
      </main>
    </>
  );
}
