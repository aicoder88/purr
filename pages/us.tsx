/**
 * /us - USA-targeted landing page
 * Addresses low CTR (0.37% vs 1.07% Canada) despite high impressions (2,143)
 * Sprint 6A: USA Market Expansion
 */
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { Button } from '../src/components/ui/button';
import { useTranslation } from '../src/lib/translation-context';
import Image from 'next/image';
import Link from 'next/link';
import {
  Check,
  Star,
  Truck,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Leaf,
  Globe,
  Users,
  Package
} from 'lucide-react';
import { buildLanguageAlternates, getLocalizedUrl } from '../src/lib/seo-utils';

export default function USALandingPage() {
  const { locale } = useTranslation();

  // USD pricing (approximate conversion from CAD)
  const usdPricing = {
    trial: '$3.49',
    standard: '$10.99',
    family: '$18.99',
    shipping: '$9.99'
  };

  const pageTitle = 'Purrify Cat Litter Deodorizer | Ships to USA | Activated Carbon Odor Control';
  const pageDescription = 'America\'s choice for natural cat litter odor control. Purrify activated carbon eliminates litter box smell instantly. Ships to all 50 states. Free trial available.';
  const canonicalUrl = getLocalizedUrl('/us', locale);
  const languageAlternates = buildLanguageAlternates('/us');

  const benefits = [
    { icon: Sparkles, title: 'Instant Odor Elimination', desc: 'Works in seconds, not hours' },
    { icon: Leaf, title: '100% Natural Formula', desc: 'Coconut shell activated carbon' },
    { icon: ShieldCheck, title: 'Non-Toxic & Pet-Friendly', desc: 'No chemicals or fragrances' },
    { icon: Clock, title: '7+ Days Freshness', desc: 'One application lasts all week' },
  ];

  const usTestimonials = [
    {
      name: 'Jennifer M.',
      location: 'California',
      text: 'Finally found something that actually works! My apartment doesn\'t smell like cats anymore. My roommates are so relieved.',
      stars: 5,
    },
    {
      name: 'Michael T.',
      location: 'Texas',
      text: 'I was skeptical about ordering from Canada but shipping was fast and the product is amazing. Worth every penny.',
      stars: 5,
    },
    {
      name: 'Amanda R.',
      location: 'New York',
      text: 'We have 3 cats in a NYC apartment. This stuff is a game changer. Guest actually commented that they couldn\'t tell we had cats!',
      stars: 5,
    },
  ];

  const usStates = [
    'California', 'Texas', 'Florida', 'New York', 'Pennsylvania',
    'Illinois', 'Ohio', 'Georgia', 'Michigan', 'Arizona'
  ];

  const faqs = [
    {
      q: 'Do you ship to the United States?',
      a: 'Yes! We ship to all 50 states via USPS Priority Mail. Most orders arrive within 7-14 business days.'
    },
    {
      q: 'What are the shipping costs to the USA?',
      a: 'Flat rate shipping to the USA is $12.99 USD. We\'re working on free shipping thresholds for US customers.'
    },
    {
      q: 'Will I have to pay customs or duties?',
      a: 'Most orders under $800 USD enter the US duty-free. You may be responsible for applicable state sales taxes.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, Mastercard, Amex) as well as Apple Pay and Google Pay. All payments are processed securely in USD.'
    },
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
          type: 'website',
          locale: 'en_US',
          images: [
            {
              url: 'https://www.purrify.ca/optimized/three_bags_no_bg.webp',
              width: 1200,
              height: 630,
              alt: 'Purrify Cat Litter Deodorizer - Available in USA',
              type: 'image/webp',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter deodorizer USA, best cat litter odor eliminator, activated carbon cat litter, natural litter box deodorizer, ships to USA, cat litter smell solution',
          },
          {
            name: 'geo.region',
            content: 'US',
          },
          {
            name: 'geo.placename',
            content: 'United States',
          },
        ]}
      />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          {/* USA-themed subtle background */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

          {/* US Flag accent */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
            <span className="text-lg">🇺🇸</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Ships to USA</span>
          </div>

          <Container>
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: Content */}
              <div className="order-2 md:order-1 text-center md:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Globe className="h-4 w-4" />
                  Now Shipping to All 50 States
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4 leading-tight">
                  America&apos;s Natural{' '}
                  <span className="text-[#03E46A]">Cat Litter Deodorizer</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
                  Join thousands of US cat owners who eliminated litter box odor with
                  <strong className="text-gray-900 dark:text-gray-100"> water-filter grade activated carbon</strong>.
                  No perfumes. No chemicals. Just science.
                </p>

                {/* Key benefits list */}
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-[#03E46A] flex-shrink-0" />
                    <span>Eliminates ammonia smell instantly</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-[#03E46A] flex-shrink-0" />
                    <span>Works with ANY litter brand</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-[#03E46A] flex-shrink-0" />
                    <span>100% natural coconut shell carbon</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-[#03E46A] flex-shrink-0" />
                    <span>Ships fast to all 50 US states</span>
                  </li>
                </ul>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#03E46A] hover:bg-[#02C55A] text-white dark:text-gray-900 font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/products/trial-size">
                      Try FREE - Just Pay {usdPricing.shipping} Shipping
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-6 rounded-xl"
                  >
                    <Link href="/#products">
                      View All Products
                    </Link>
                  </Button>
                </div>

                {/* Trust badge */}
                <div className="mt-6 flex items-center gap-4 justify-center md:justify-start">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white dark:text-gray-100 text-xs font-bold"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-gray-200">500+ US customers</strong> trust Purrify
                  </p>
                </div>
              </div>

              {/* Right: Image */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-72 md:w-96">
                  <Image
                    src="/optimized/three_bags_no_bg.webp"
                    alt="Purrify Cat Litter Deodorizer - Ships to USA"
                    width={400}
                    height={400}
                    sizes="(max-width: 768px) 288px, 384px"
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                  {/* Shipping badge overlay */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[#03E46A]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">7-14 Day US Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* US Shipping Info Banner */}
        <section className="py-8 bg-blue-600 dark:bg-blue-800">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-white dark:text-gray-100">
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6" />
                <span className="font-medium">USPS Priority Mail</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6" />
                <span className="font-medium">7-14 Business Days</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6" />
                <span className="font-medium">$12.99 Flat Rate</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6" />
                <span className="font-medium">All 50 States</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                Why American Cat Owners Choose Purrify
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The same activated carbon technology used in water filters and air purifiers,
                now engineered for your litter box.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-14 h-14 bg-[#03E46A]/10 dark:bg-[#03E46A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-7 w-7 text-[#03E46A]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                Simple as 1-2-3
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No complicated process. Just sprinkle and forget.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Sprinkle', desc: 'Add to any litter your cat already uses' },
                { step: '2', title: 'Trap', desc: 'Activated carbon traps ammonia at the source' },
                { step: '3', title: 'Enjoy', desc: 'Breathe easy for 7+ days of freshness' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 bg-[#03E46A] text-white dark:text-gray-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* US Testimonials */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                What US Customers Are Saying
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Real reviews from verified American cat parents
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {usTestimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.stars)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white dark:text-gray-100 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/reviews"
                className="text-[#03E46A] hover:text-[#02C55A] font-medium inline-flex items-center gap-2"
              >
                Read all 138+ reviews
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* We Ship Nationwide */}
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                We Ship to Your State
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Fast, reliable delivery to all 50 states via USPS Priority Mail
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {usStates.map((state, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {state}
                </span>
              ))}
              <span className="px-4 py-2 bg-[#03E46A]/10 dark:bg-[#03E46A]/20 rounded-full border border-[#03E46A] text-sm font-medium text-[#03E46A]">
                + 40 More States
              </span>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                US Shipping FAQ
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about ordering from the USA
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-[#03E46A] to-[#02C55A]">
          <Container>
            <div className="text-center text-white dark:text-gray-900 max-w-3xl mx-auto">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-white text-white dark:fill-gray-900 dark:text-gray-900" />
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Eliminate Litter Box Odor?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Join 500+ US customers who said goodbye to embarrassing cat smells.
                Try Purrify risk-free with our 30-day money-back guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white dark:bg-gray-900 text-[#03E46A] hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
                >
                  <Link href="/products/trial-size">
                    Get FREE Trial - {usdPricing.shipping} Shipping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-sm opacity-80">
                <ShieldCheck className="inline h-4 w-4 mr-1" />
                30-day money-back guarantee &bull; Ships to all 50 states
              </p>
            </div>
          </Container>
        </section>

        {/* Schema.org structured data for US market */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Purrify Cat Litter Deodorizer - Ships to USA",
              "description": pageDescription,
              "url": "https://www.purrify.ca/us",
              "inLanguage": "en-US",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Purrify",
                "url": "https://www.purrify.ca"
              },
              "about": {
                "@type": "Product",
                "name": "Purrify Cat Litter Deodorizer",
                "description": "Activated carbon cat litter additive that eliminates odor naturally",
                "brand": {
                  "@type": "Brand",
                  "name": "Purrify"
                },
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "USD",
                  "lowPrice": "3.49",
                  "highPrice": "18.99",
                  "offerCount": "3",
                  "availability": "https://schema.org/InStock",
                  "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingDestination": {
                      "@type": "DefinedRegion",
                      "addressCountry": "US"
                    },
                    "shippingRate": {
                      "@type": "MonetaryAmount",
                      "currency": "USD",
                      "value": "12.99"
                    },
                    "deliveryTime": {
                      "@type": "ShippingDeliveryTime",
                      "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 7,
                        "maxValue": 14,
                        "unitCode": "DAY"
                      }
                    }
                  }
                }
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              }
            })
          }}
        />
      </main>
    </>
  );
}
