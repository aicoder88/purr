import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, Heart, Users, Zap } from 'lucide-react';

import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
import { buildLanguageAlternates, getLocalizedUrl, generateFAQSchema } from '../../src/lib/seo-utils';
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '../../src/lib/pricing';
import { getPaymentLink } from '../../src/lib/payment-links';
import Image from 'next/image';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';

export default function FamilyPackPage() {
  const { t, locale } = useTranslation();

  const pageTitle = `${SITE_NAME} Family Pack - 120g Cat Litter Odor Control`;
  const pageDescription = "Perfect for multi-cat households. Two months of freshness with Purrify's 120g family pack litter deodorizer. Best value size.";
  const canonicalPath = '/products/family-pack';
  const canonicalUrl = getLocalizedUrl(canonicalPath, locale);
  const languageAlternates = buildLanguageAlternates(canonicalPath);
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);
  const familyPrice = formatProductPrice('family', locale);
  const familyAutoshipPrice = formatProductPrice('familyAutoship', locale);
  const standardPriceAmount = getProductPrice('standard');
  const familyPriceAmount = getProductPrice('family');
  const familyAutoshipAmount = getProductPrice('familyAutoship');
  const doubleStandardPrice = formatCurrencyValue(standardPriceAmount * 2, locale);
  const savingsComparedToStandard = formatCurrencyValue(standardPriceAmount * 2 - familyPriceAmount, locale);
  const familyAutoshipSavings = Math.max(
    0,
    Math.round((1 - familyAutoshipAmount / (familyPriceAmount * 3)) * 100)
  );
  const familyAutoshipPerMonth = formatCurrencyValue(familyAutoshipAmount / 3, locale);
  const familyAutoshipLink = getPaymentLink('familyAutoship');
  const checkoutUrl = getLocalizedUrl('/checkout', locale);

  // Family pack lifestyle images
  const heroImage = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80'; // Multiple cats happy home
  const sectionImage1 = 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1600&q=80'; // Multi-cat household
  const solutionImage = 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1600&q=80'; // Happy multi-cat family

  const benefits = [
    "Perfect for multi-cat households",
    "Two months of continuous odor control",
    "Best value per gram of activated carbon",
    "Handles heavy litter box usage",
    "Reduces ordering frequency"
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
      text: "Three cats in a small townhouse. You can imagine the chaos! The 120g size handles all three beautifully. My mother-in-law finally visits again! 😂",
      rating: 5,
      petName: "Muffin, Simba & Cleo"
    }
  ];

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
          images: [
            {
              url: 'https://www.purrify.ca/optimized/140g.webp',
              width: 1200,
              height: 630,
              alt: 'Purrify 120g Family Pack Package (WebP)',
              type: 'image/webp'
            },
            {
              url: 'https://www.purrify.ca/purrify-family-140g.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify 120g Family Pack Package',
              type: 'image/jpeg'
            }
          ]
        }}
      />

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(locale))
        }}
      />

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
                <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
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
                    src="/optimized/140g.webp"
                    alt="Purrify 120g Family Pack"
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
                    120g Cat Litter Odor Control
                  </p>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">(127 reviews)</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#3694FF]">
                      {familyPrice}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      + {t.pricing?.shippingCalculated || 'Shipping calculated at checkout'}
                    </p>
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

                {/* Purchase Options */}
                <div className="space-y-5">
                  <div className="rounded-2xl border border-[#03E46A]/30 bg-white dark:bg-gray-900/40 p-6 shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#03E46A]/15 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                    <div className="flex items-center justify-between mb-3 relative">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#03E46A] font-semibold">
                          {t.subscriptionOfferExtended?.bestValueBadge || 'Best Value'}
                        </p>
                        <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100">
                          {t.subscriptionOfferExtended?.familyPlanTitle || 'Best Value Autoship – 3 × 120g'}
                        </h3>
                      </div>
                      <span className="inline-flex items-center bg-[#03E46A]/10 text-[#03E46A] px-3 py-1 rounded-full text-xs font-semibold">
                        {t.subscriptionOfferExtended?.saveVsOneTime
                          ? t.subscriptionOfferExtended.saveVsOneTime.replace('{percent}', familyAutoshipSavings.toString())
                          : `Save ${familyAutoshipSavings}% vs one-time`}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3 mb-4 relative">
                      <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
                        {familyAutoshipPrice}
                      </div>
                      <div className="text-sm font-medium text-[#03E46A]">
                        {t.subscriptionOfferExtended?.perMonthLabel
                          ? t.subscriptionOfferExtended.perMonthLabel.replace('{price}', familyAutoshipPerMonth)
                          : `≈ ${familyAutoshipPerMonth}/month effective`}
                      </div>
                    </div>

                    {/* Prominent Shipping Savings Callout */}
                    <div className="bg-green-100 dark:bg-green-900/50 border-2 border-green-500 dark:border-green-400 rounded-lg p-4 mb-4 relative">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">✓ FREE SHIPPING</div>
                      </div>
                      <p className="text-sm font-semibold text-green-800 dark:text-green-200 mt-2">
                        Save $15–$20+ per order vs single purchases
                      </p>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 relative">
                      {t.subscriptionOfferExtended?.quarterlyBilling || 'Billed every 3 months'}
                    </p>
                    <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-2 mb-5 relative">
                      <li className="flex gap-2">
                        <Check className="w-4 h-4 text-[#03E46A] mt-0.5" />
                        {t.subscriptionOfferExtended?.includesThreeFamily || 'Includes 3 × Regular size 120g packs (delivered together)'}
                      </li>
                      <li className="flex gap-2">
                        <Check className="w-4 h-4 text-[#03E46A] mt-0.5" />
                        {t.subscriptionOfferExtended?.priorityCustomerSupport || 'Priority customer support'}
                      </li>
                    </ul>
                    <Button
                      asChild={Boolean(familyAutoshipLink)}
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#03E46A] to-[#03E46A]/80 hover:from-[#03E46A]/90 hover:to-[#03E46A] text-white dark:text-gray-100 font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative"
                      disabled={!familyAutoshipLink}
                    >
                      {familyAutoshipLink ? (
                        <a href={familyAutoshipLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <Zap className="w-5 h-5" />
                          {t.subscriptionOfferExtended?.startAutoship || 'Start Autoship'}
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Zap className="w-5 h-5" />
                          {t.subscriptionOfferExtended?.linkComingSoon || 'Payment link coming soon'}
                        </div>
                      )}
                    </Button>
                  </div>

                  <div className="rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900/30 p-6">
                    <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-2">
                      {t.pricing?.oneTimeLabel || 'One-time purchase'}
                    </p>
                    <div className="flex items-baseline gap-3 mb-3">
                      <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                        {familyPrice}
                      </div>
                    </div>

                    {/* Shipping Cost Warning */}
                    <div className="bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-500 dark:border-amber-400 rounded-lg p-3 mb-4 relative">
                      <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                        + Shipping: $15–$20+
                      </p>
                      <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                        Actual cost at checkout
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {t.pricing?.plusShipping || '+ shipping'} · One-time order
                    </p>
                    <Button asChild size="lg" className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-[#FF3131] hover:text-white dark:text-gray-100 text-gray-800 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-600 hover:border-[#FF3131] dark:hover:border-[#FF3131]">
                      <Link href={checkoutUrl} className="flex items-center justify-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        {t.homepage.enhancedComparison.chooseThisSize}
                      </Link>
                    </Button>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" size="lg" className="flex-1">
                      <Heart className="w-5 h-5 mr-2" />
                      Add to Wishlist
                    </Button>
                    <Link href={`${locale === 'fr' ? '/fr' : ''}/reviews`}>
                      <Button variant="outline" size="lg" className="flex-1">
                        <Users className="w-5 h-5 mr-2" />
                        Read Reviews
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="border-t pt-6 space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    30-day money-back guarantee
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Free shipping on autoship bundles
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Ships within 24 hours
                  </div>
                </div>
              </div>
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
                Our 120g family pack provides unbeatable value and convenience for households with multiple cats
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
                  Save 25% compared to buying two standard sizes
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

            {/* Value Comparison */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8">
              <h3 className="font-heading text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50">
                Family Pack Savings Calculator
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Two Standard Sizes (50g each)
                  </div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {doubleStandardPrice}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {`${standardPrice} × 2 = ${doubleStandardPrice}`}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    One Family Pack (120g)
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {familyPrice}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    {locale === 'fr'
                      ? `Vous économisez ${savingsComparedToStandard} !`
                      : `You Save ${savingsComparedToStandard}!`}
                  </div>
                </div>
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
                  <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-50">- {testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pet parent to {testimonial.petName}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/reviews`}>
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
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">{trialPrice}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">+ Shipping</p>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button variant="outline" className="w-full">View Trial Size</Button>
                </Link>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Standard Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">50g - One month supply</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">{standardPrice}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">+ Shipping</p>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/standard`}>
                  <Button variant="outline" className="w-full">View Standard Size</Button>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#03E46A]/10 to-[#5B2EFF]/10 dark:from-[#03E46A]/10 dark:to-[#3694FF]/10 p-6 rounded-xl shadow-lg text-center border-2 border-[#03E46A] dark:border-[#03E46A]">
                <div className="bg-[#03E46A] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  BEST VALUE
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Family Pack</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">120g - Two month supply</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">{familyPrice}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">+ Shipping · Free with autoship</p>
                <Button className="w-full">Currently Viewing</Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Back to Products */}
        <section className="py-8 cv-auto cis-480">
          <Container>
            <div className="text-center">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`}>
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
                  <p className="text-xl opacity-90">Best value for 2-3 months of freshness</p>
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
                  <p className="text-lg opacity-90">Save 25% with our Family Pack</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/products/family-pack" />
          </Container>
        </section>
      </main>
    </>
  );
}
