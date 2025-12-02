import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, Heart, Users } from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { buildAvailabilityUrl, buildLanguageAlternates, getLocalizedUrl, getPriceValidityDate } from '../../src/lib/seo-utils';
import { PRODUCT_PRICES, formatProductPrice, getProductPrice } from '../../src/lib/pricing';

export default function TrialSizePage() {
  const { t, locale } = useTranslation();

  const pageTitle = t.seo?.openGraph?.title || `${SITE_NAME} Trial Size - 12g Cat Litter Odor Control`;
  const pageDescription = t.seo?.metaDescription || "Try Purrify risk-free with our 12g trial size. Perfect for one litter box change. See why 1,000+ cat owners love Purrify's odor elimination power.";
  const canonicalUrl = getLocalizedUrl('/products/trial-size', locale);
  const languageAlternates = buildLanguageAlternates('/products/trial-size');
  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);
  const familyPrice = formatProductPrice('family', locale);
  const trialPriceValue = getProductPrice('trial');
  const standardPriceValue = getProductPrice('standard');
  const familyPriceValue = getProductPrice('family');
  const trialPriceString = trialPriceValue.toFixed(2);
  const standardPriceString = standardPriceValue.toFixed(2);
  const familyPriceString = familyPriceValue.toFixed(2);
  const trialCoverageCopy = {
    en: 'Designed for one cat and up to one litter box cycle (approximately 7 days). Enough for 1-2 full cleanings or a week of maintenance scooping.',
    fr: 'Concu pour un chat et jusqua un cycle complet de litiere (environ 7 jours). Suffisant pour 1 a 2 nettoyages complets ou une semaine dentretien.',
    zh: '适用于一只猫，大约可覆盖 7 天的猫砂使用量，可支撑 1-2 次全面换砂或一周日常维护。'
  } as const;
  // Trial size lifestyle images
  const heroImage = '/images/trial/hero-lifestyle.jpg'; // Person trying new product
  const sectionImage1 = '/images/trial/curious-cat.jpg'; // Curious cat first time
  const sectionImage2 = '/images/trial/happy-customer.jpg'; // Happy customer with cat
  const solutionImage = '/images/trial/success-story.jpg'; // Success story

  const benefits = [
    "Perfect for testing with your cat",
    "Enough for one complete litter box change",
    "Risk-free way to experience Purrify",
    "Same powerful formula as full-size products",
    "Money-back guarantee if not satisfied"
  ];

  const testimonials = [
    {
      name: "Fatima R., Côte-des-Neiges",
      text: "Started with the 12g trial for my kitten Ziggy. Worked so well I immediately ordered the 50g! No more embarrassing smells when friends come over.",
      rating: 5,
      petName: "Ziggy"
    },
    {
      name: "Zara K., Plateau",
      text: "My rescue cat Biscuit is super picky about litter changes, but with Purrify I can keep his box fresh way longer. The trial size was perfect to test it out first.",
      rating: 5,
      petName: "Biscuit"
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
          locale: locale === 'fr' ? 'fr_CA' : locale === 'zh' ? 'zh_CN' : 'en_CA',
          images: [
            {
              url: 'https://www.purrify.ca/optimized/20g.webp',
              width: 1200,
              height: 630,
              alt: 'Purrify 12g Trial Size Package (WebP)',
              type: 'image/webp'
            },
            {
              url: 'https://www.purrify.ca/purrify-trial-17g.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify 12g Trial Size Package',
              type: 'image/jpeg'
            }
          ]
        }}
      />

      {/* Comprehensive Trial Product JSON-LD with detailed specifications */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "@id": canonicalUrl,
                "name": "Purrify 12g Trial Size - Cat Litter Odor Control",
                "description": "Risk-free trial size perfect for testing Purrify's odor elimination power. Single-use sample for one litter box change. Experience molecular-level odor control.",
                "image": [
                  "https://www.purrify.ca/optimized/20g.webp",
                  "https://www.purrify.ca/purrify-trial-17g.jpg"
                ],
                "brand": {
                  "@type": "Brand",
                  "name": "Purrify",
                  "logo": "https://www.purrify.ca/purrify-logo.png"
                },
                "manufacturer": {
                  "@type": "Organization",
                  "@id": "https://www.purrify.ca/#organization",
                  "name": "Purrify"
                },
                "category": "Pet Supplies > Cat Care > Litter Additives",
                "sku": "purrify-12g",
                "mpn": "PURRIFY-12G-TRIAL",
                "gtin13": "9781234567891",
                "weight": {
                  "@type": "QuantitativeValue",
                  "value": "12",
                  "unitCode": "GRM"
                },
                "size": "12g",
                "color": "Black",
                "material": "Activated Carbon from Coconut Shells",
                "offers": {
                  "@type": "Offer",
                  "price": "${trialPriceString}",
                  "priceCurrency": "CAD",
                  "priceValidUntil": priceValidUntil,
                  "availability": availabilityUrl,
                  "itemCondition": "https://schema.org/NewCondition",
                  "url": canonicalUrl,
                  "seller": {
                    "@type": "Organization",
                    "@id": "https://www.purrify.ca/#organization",
                    "name": "Purrify"
                  },
                  "eligibleQuantity": {
                    "@type": "QuantitativeValue",
                    "minValue": 1,
                    "maxValue": 5,
                    "unitText": "trial packs"
                  },
                  "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingRate": {
                      "@type": "MonetaryAmount",
                      "value": "0",
                      "currency": "CAD"
                    },
                    "deliveryTime": {
                      "@type": "ShippingDeliveryTime",
                      "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 2,
                        "unitCode": "DAY"
                      },
                      "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 2,
                        "maxValue": 5,
                        "unitCode": "DAY"
                      }
                    }
                  },
                  "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 30,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                  },
                  "businessFunction": "https://schema.org/Sell"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "89",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "review": [
                  {
                    "@type": "Review",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    },
                    "author": {
                      "@type": "Person",
                      "name": "Fatima R."
                    },
                    "reviewBody": "Started with the 12g trial for my kitten. Worked so well I immediately ordered the 50g! No more embarrassing smells when friends come over.",
                    "datePublished": "2024-02-10"
                  }
                ],
                "additionalProperty": [
                  {
                    "@type": "PropertyValue",
                    "name": "Usage",
                    "value": "Single litter box change"
                  },
                  {
                    "@type": "PropertyValue",
                    "name": "Purpose",
                    "value": "Trial/Testing"
                  },
                  {
                    "@type": "PropertyValue",
                    "name": "Pet Type",
                    "value": "Cat"
                  },
                  {
                    "@type": "PropertyValue",
                    "name": "Ingredient",
                    "value": "Activated Carbon from Coconut Shells"
                  },
                  {
                    "@type": "PropertyValue",
                    "name": "Risk Level",
                    "value": "Risk-Free Trial"
                  }
                ],
                "isVariantOf": {
                  "@type": "ProductGroup",
                  "name": "Purrify Cat Litter Odor Control Additive",
                  "hasVariant": [
                    {
                      "@type": "Product",
                      "name": "Purrify 12g Trial",
                      "offers": {
                        "@type": "Offer",
                        "price": "${trialPriceString}",
                        "priceCurrency": "CAD",
                        "priceValidUntil": priceValidUntil,
                        "availability": availabilityUrl
                      }
                    },
                    {
                      "@type": "Product",
                      "name": "Purrify 50g Standard",
                      "offers": {
                        "@type": "Offer",
                        "price": "${standardPriceString}",
                        "priceCurrency": "CAD",
                        "priceValidUntil": priceValidUntil,
                        "availability": availabilityUrl
                      }
                    },
                    {
                      "@type": "Product",
                      "name": "Purrify 120g Family Pack",
                      "offers": {
                        "@type": "Offer",
                        "price": "${familyPriceString}",
                        "priceCurrency": "CAD",
                        "priceValidUntil": priceValidUntil,
                        "availability": availabilityUrl
                      }
                    }
                  ]
                },
                "audience": {
                  "@type": "Audience",
                  "name": "First-time Customers",
                  "description": "Cat owners wanting to test Purrify before committing to a full-size purchase"
                },
                "usageOrSchedule": "Mix with litter during complete litter box change - enough for one application",
                "mainEntityOfPage": canonicalUrl,
                "inLanguage": "en-CA"
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.purrify.ca/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Products",
                    "item": "https://www.purrify.ca/#products"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Trial Size",
                    "item": canonicalUrl
                  }
                ]
              }
            ]
          })
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
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Trial Size</li>
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
                    src="/optimized/20g.webp"
                    alt="Purrify 12g Trial Size"
                    width={400}
                    height={400}
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-4 right-4 bg-[#FF3131] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">
                    TRIAL SIZE
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">
                    Purrify Trial Size
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                    12g Cat Litter Odor Control
                  </p>
                  <div className="bg-[#E0EFC7]/70 dark:bg-[#5B2EFF]/10 border border-[#E0EFC7] dark:border-[#5B2EFF]/30 rounded-xl p-4 text-left mb-4">
                    <h2 className="text-base sm:text-lg font-semibold text-[#5B2EFF] dark:text-[#5B9BFF] mb-1">
                      {locale === 'fr'
                        ? 'Conçu pour un chat • Couvre jusqu’à 1 semaine'
                        : locale === 'zh'
                          ? '适用于一只猫 • 约可使用 1 周'
                          : 'Sized for one cat • Covers up to 1 week'}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                      {trialCoverageCopy[locale as 'en' | 'fr' | 'zh'] ?? trialCoverageCopy.en}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">(127 reviews)</span>
                  </div>
                  <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-1">
                    {trialPrice}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    Shipping calculated at checkout
                  </p>
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

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Buy Trial Size Now
                  </Button>

                  <div className="flex space-x-3">
                    <Button variant="outline" size="lg" className="flex-1">
                      <Heart className="w-5 h-5 mr-2" />
                      Add to Wishlist
                    </Button>
                    <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`}>
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
                    Ships within 24 hours
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Hero Lifestyle Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={heroImage}
                alt="Cat owner trying Purrify trial size for the first time"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="text-3xl font-bold mb-2">Risk-Free Trial</h2>
                  <p className="text-xl opacity-90">See why 1,000+ cat owners love Purrify</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                How Trial Size Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-2xl mx-auto">
                Perfect for first-time users who want to test Purrify's effectiveness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Order Trial</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get your 12g trial size delivered to your door
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Test & Experience</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use for one complete litter box change and see the difference
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#03E46A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Love It & Reorder</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join 1,000+ satisfied customers with a full-size order
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`}>
                <Button variant="outline" size="lg">
                  Learn More About How Purrify Works
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Curious Cat Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage1}
                alt="Curious cat experiencing Purrify for the first time"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-2">Your Cat Will Love It Too</h3>
                  <p className="text-lg opacity-90">Gentle formula safe for all cats and kittens</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                What Trial Users Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300 dark:text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-50">- {testimonial.name}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`}>
                <Button variant="outline" size="lg">
                  Read All Customer Stories
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Compelling Conversion Section */}
        <section className="py-16 bg-gradient-to-br from-[#FF3131]/5 via-[#5B2EFF]/5 to-[#03E46A]/5 dark:from-[#FF5050]/10 dark:via-[#3694FF]/10 dark:to-[#03E46A]/10">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border-2 border-[#FF3131]/20 dark:border-[#FF5050]/30">
                  <div className="text-4xl font-bold text-[#FF3131] dark:text-[#FF5050] mb-2">87%</div>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Upgrade to Full Size</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Within 7 days</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
                  <div className="text-4xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-2">1,000+</div>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Trial Users</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Started with 12g</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border-2 border-[#03E46A]/20 dark:border-[#03E46A]/30">
                  <div className="text-4xl font-bold text-[#03E46A] dark:text-[#03E46A] mb-2">4.8★</div>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Average Rating</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">From trial users</p>
                </div>
              </div>

              {/* Compelling CTA Box */}
              <div className="bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] p-8 rounded-3xl shadow-2xl text-center">
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-3">
                    Try It Risk-Free Today
                  </h3>
                  <p className="text-xl text-white/90 dark:text-gray-200 mb-2">
                    Join 1,000+ cat owners who started with our trial size
                  </p>
                  <p className="text-white/80 dark:text-gray-300">
                    Most upgrade to full-size within days. Why wait?
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="bg-white text-[#FF3131] hover:bg-gray-100 dark:bg-gray-900 dark:text-[#FF5050] dark:hover:bg-gray-800 font-bold py-4 px-8 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
                  >
                    <ShoppingCart className="w-6 h-6 mr-2" />
                    {`Order Trial Size - ${trialPrice}`}
                  </Button>

                  <div className="flex items-center space-x-2 text-white dark:text-gray-100">
                    <Check className="w-5 h-5 text-[#03E46A]" />
                    <span className="text-sm">Ships to all of Canada</span>
                  </div>
                </div>

                {/* Urgency Element */}
                <div className="mt-6 inline-block bg-white/20 dark:bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-sm text-white dark:text-gray-200 font-semibold">
                    ⚡ Limited stock: Trial sizes sell out fast
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Happy Customer Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage2}
                alt="Happy cat owner with satisfied cat after trying Purrify"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-2">Join Happy Trial Users</h3>
                  <p className="text-lg opacity-90">Most trial users upgrade to full-size within days</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Ready for More?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300">
                Upgrade to our full-size products for ongoing odor control
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Regular Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">50g - Perfect for regular use</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">{standardPrice}</div>
                <Button className="w-full">View Regular Size</Button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Large Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">120g - Best value for multiple cats</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">{familyPrice}</div>
                <Button className="w-full">View Large Size</Button>
              </div>
            </div>

            {/* Success Story Image */}
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={solutionImage}
                  alt="Success story of cat owner enjoying fresh home with Purrify"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="text-2xl font-bold mb-2">Start Your Success Story</h3>
                    <p className="text-lg opacity-90">Risk-free trial, amazing results</p>
                  </div>
                </div>
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

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/products/trial-size" />
          </Container>
        </section>
      </main>
    </>
  );
}
