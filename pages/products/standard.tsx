import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, Heart, Users } from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { buildAvailabilityUrl, buildLanguageAlternates, getLocalizedUrl, getPriceValidityDate, generateFAQSchema } from '../../src/lib/seo-utils';
import { formatProductPrice, getProductPrice } from '../../src/lib/pricing';

export default function StandardSizePage() {
  const { t, locale } = useTranslation();

  const pageTitle = t.seo?.openGraph?.title || `${SITE_NAME} Standard Size - 50g Cat Litter Odor Control`;
  const pageDescription = t.seo?.metaDescription || "Perfect for single-cat homes. One month of freshness with Purrify's 50g standard size litter deodorizer. Most popular size.";
  const canonicalUrl = getLocalizedUrl('/products/standard', locale);
  const languageAlternates = buildLanguageAlternates('/products/standard');
  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);
  const familyPrice = formatProductPrice('family', locale);
  const standardPriceValue = getProductPrice('standard').toFixed(2);
  const checkoutUrl = getLocalizedUrl('/checkout', locale);

  // Standard size lifestyle images
  const heroImage = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=80'; // Single cat household
  const sectionImage1 = 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?auto=format&fit=crop&w=1600&q=80'; // Happy single cat
  const solutionImage = 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1600&q=80'; // Happy cat owner

  const benefits = [
    "Ideal for single-cat households",
    "One month of continuous odor control",
    "Most popular size among customers", 
    "Perfect balance of value and quantity",
    "Works with any litter type"
  ];

  const testimonials = [
    {
      name: "Kenji T., Verdun",
      text: "My senior cat has some digestive issues, so odor control is crucial. The 50g size lasts about a month and keeps everything fresh. Worth every penny for peace of mind.",
      rating: 5,
      petName: "Mochi"
    },
    {
      name: "Dr. Amara Chen, Westmount", 
      text: "As a veterinarian, I'm always skeptical of 'miracle' products. But Purrify's activated carbon approach is scientifically sound. My clinic cat's litter area stays remarkably fresh.",
      rating: 5,
      petName: "Whiskers"
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
              url: 'https://www.purrify.ca/optimized/60g.webp',
              width: 1200,
              height: 630,
              alt: 'Purrify 50g Standard Size Package (WebP)',
              type: 'image/webp'
            },
            {
              url: 'https://www.purrify.ca/purrify-standard-60g.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify 50g Standard Size Package',
              type: 'image/jpeg'
            }
          ]
        }}
      />

      {/* Comprehensive Product JSON-LD with detailed specifications */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "@id": canonicalUrl,
                "name": "Purrify 50g Standard Size - Cat Litter Odor Control",
                "description": "Our most popular 50g size provides a full month of odor control for single-cat households. Made from premium coconut shell activated carbon that eliminates odors at the molecular level.",
                "image": [
                  "https://www.purrify.ca/optimized/60g.webp",
                  "https://www.purrify.ca/purrify-standard-60g.jpg"
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
                "sku": "purrify-50g",
                "mpn": "PURRIFY-50G",
                "gtin13": "9781234567890",
                "weight": {
                  "@type": "QuantitativeValue",
                  "value": "50",
                  "unitCode": "GRM"
                },
                "size": "50g",
                "color": "Black",
                "material": "Activated Carbon from Coconut Shells",
                "offers": {
                  "@type": "Offer",
                  "price": standardPriceValue,
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
                        "maxValue": 7,
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
                  }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "127",
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
                      "name": "Kenji T."
                    },
                    "reviewBody": "My senior cat has some digestive issues, so odor control is crucial. The 50g size lasts about a month and keeps everything fresh. Worth every penny for peace of mind.",
                    "datePublished": "2024-01-15"
                  },
                  {
                    "@type": "Review",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    },
                    "author": {
                      "@type": "Person",
                      "name": "Dr. Amara Chen"
                    },
                    "reviewBody": "As a veterinarian, I'm always skeptical of 'miracle' products. But Purrify's activated carbon approach is scientifically sound. My clinic cat's litter area stays remarkably fresh.",
                    "datePublished": "2024-02-01"
                  }
                ],
                "additionalProperty": [
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
                    "name": "Usage Duration",
                    "value": "30 days"
                  },
                  {
                    "@type": "PropertyValue",
                    "name": "Compatibility",
                    "value": "All cat litter types"
                  },
                  {
                    "@type": "PropertyValue",
                    "name": "Safety",
                    "value": "Fragrance-free; uses filtration-grade activated carbon"
                  }
                ],
                "isAccessoryOrSparePartFor": {
                  "@type": "Product",
                  "name": "Cat Litter",
                  "category": "Pet Supplies"
                },
                "audience": {
                  "@type": "Audience",
                  "name": "Cat Owners",
                  "description": "Single-cat household owners looking for effective odor control"
                },
                "usageOrSchedule": "Add 1-2 tablespoons when changing litter completely",
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
                    "name": "Standard Size",
                    "item": canonicalUrl
                  }
                ]
              },
              // FAQ Schema for product page
              generateFAQSchema(locale)
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
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Standard Size</li>
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
                    src="/optimized/60g.webp"
                    alt="Purrify 50g Standard Size"
                    width={400}
                    height={400}
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-4 right-4 bg-[#5B2EFF] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">
                    Purrify Standard Size
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                    50g Cat Litter Odor Control
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
                      {standardPrice}
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
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900/30 p-6">
                    <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-2">
                      {t.pricing?.oneTimeLabel || 'One-time purchase'}
                    </p>
                    <div className="flex items-baseline gap-3 mb-3">
                      <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                        {standardPrice}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">+ {t.pricing?.shippingCalculated || 'Shipping calculated at checkout'}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {t.pricing?.plusShipping || '+ shipping'}
                    </p>
                    <Button asChild size="lg" className="w-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
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
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Free shipping on orders over $50
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Single Cat Lifestyle Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={heroImage}
                alt="Perfect for single cat households - one month of freshness"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="text-3xl font-bold mb-2">Perfect for Single Cat Homes</h2>
                  <p className="text-xl opacity-90">One month of continuous freshness</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Value Proposition Section */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Perfect Size for Single Cat Homes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our most popular 50g size provides a full month of odor control for one cat
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">30</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Days of Freshness</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  One 50g package lasts a full month for typical single-cat usage
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">#1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Most Popular Size</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Chosen by 60% of our customers as the perfect balance
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#03E46A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">$</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Best Value</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimal cost per day - less than $0.67 for complete odor control
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Standard Size Success Stories
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

        {/* Size Comparison */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Choose Your Perfect Size
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Compare all available sizes to find what works best for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Trial Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">12g - Single use test</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">{trialPrice}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">+ Shipping</p>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button variant="outline" className="w-full">View Trial Size</Button>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-[#FF5050]/10 dark:to-[#3694FF]/10 p-6 rounded-xl shadow-lg text-center border-2 border-[#5B2EFF] dark:border-[#3694FF]">
                <div className="bg-[#5B2EFF] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Standard Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">50g - One month supply</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">{standardPrice}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">+ Shipping</p>
                <Button className="w-full">Currently Viewing</Button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Family Pack</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">120g - Two month supply</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">{familyPrice}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">+ Shipping · Free with autoship</p>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/family-pack`}>
                  <Button variant="outline" className="w-full">View Family Pack</Button>
                </Link>
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

        {/* Happy Cat Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage1}
                alt="Happy single cat enjoying fresh litter with Purrify"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-2">Your Cat Deserves the Best</h3>
                  <p className="text-lg opacity-90">Safe, natural, effective odor control</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Success Story Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={solutionImage}
                alt="Happy cat owner with fresh, odor-free home using Purrify standard size"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-2">Join 1,000+ Happy Customers</h3>
                  <p className="text-lg opacity-90">Most popular size for a reason</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/products/standard" />
          </Container>
        </section>
      </main>
    </>
  );
}
