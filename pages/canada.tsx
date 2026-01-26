import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../src/lib/translation-context';
import { formatProductPrice } from '../src/lib/pricing';
import { buildLanguageAlternates, getLocalizedUrl } from '../src/lib/seo-utils';
import { useEnhancedSEO } from '../src/hooks/useEnhancedSEO';
import { Check, MapPin, Truck, Leaf, Shield, Star, ChevronRight, Home } from 'lucide-react';

export default function CanadaLandingPage() {
  const { locale } = useTranslation();
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);

  const pageTitle = 'Best Cat Litter Deodorizer in Canada | Made in Canada | Purrify';
  const pageDescription = 'Looking for cat litter odor control in Canada? Purrify is proudly made in Canada with premium coconut shell activated carbon. Free shipping across Canada on orders over $35.';

  const { nextSeoProps, schema } = useEnhancedSEO({
    path: '/canada',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter deodorizer Canada',
    schemaType: 'product',
    schemaData: {
      name: 'Purrify Activated Carbon Cat Litter Deodorizer',
      description: 'Premium coconut shell activated carbon litter additive made in Canada',
      brand: 'Purrify',
      category: 'Pet Supplies > Cat Supplies > Cat Litter Accessories',
    },
    image: 'https://www.purrify.ca/images/products/purrify-standard-bag.png',
    keywords: [
      'cat litter deodorizer Canada',
      'best cat litter deodorizer Canada',
      'cat litter odor control Canada',
      'Canadian made cat litter additive',
      'buy Purrify Canada',
      'activated carbon cat litter Canada',
      'natural cat litter deodorizer Canada',
    ],
  });

  const canadianBenefits = [
    {
      icon: MapPin,
      title: 'Made in Canada',
      description: 'Proudly manufactured in Canada using premium coconut shell activated carbon.',
    },
    {
      icon: Truck,
      title: 'Free Canadian Shipping',
      description: 'Free shipping on orders over $35 anywhere in Canada. Fast delivery coast to coast.',
    },
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'Water-filter grade activated carbon. No fragrances, no chemicals, no fillers.',
    },
    {
      icon: Shield,
      title: 'Canadian Customer Support',
      description: 'Real support from a Canadian team who understands Canadian pet owners.',
    },
  ];

  const majorCities = [
    { name: 'Toronto', province: 'ON' },
    { name: 'Vancouver', province: 'BC' },
    { name: 'Montreal', province: 'QC' },
    { name: 'Calgary', province: 'AB' },
    { name: 'Ottawa', province: 'ON' },
    { name: 'Edmonton', province: 'AB' },
    { name: 'Winnipeg', province: 'MB' },
    { name: 'Halifax', province: 'NS' },
  ];

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* LocalBusiness Schema for Canadian presence */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Purrify',
            description: 'Canadian manufacturer of activated carbon cat litter deodorizer',
            url: 'https://www.purrify.ca',
            logo: 'https://www.purrify.ca/images/icon-512.png',
            image: 'https://www.purrify.ca/images/products/purrify-standard-bag.png',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'CA',
            },
            areaServed: {
              '@type': 'Country',
              name: 'Canada',
            },
            priceRange: '$$',
            paymentAccepted: 'Credit Card, PayPal',
            currenciesAccepted: 'CAD',
          }),
        }}
      />

      <div className="bg-cream-50 dark:bg-gray-900 min-h-screen">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto pt-6 pb-4 px-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 dark:text-gray-100 font-medium">Canada</span>
        </nav>

        {/* Hero Section */}
        <header className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                <span>Proudly Made in Canada</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
                Canada&apos;s Best Cat Litter Deodorizer
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Canadian cat owners trust Purrify to eliminate litter box odours. Made in Canada with premium
                coconut shell activated carbon—the same filtration-grade material used in water purifiers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/products/trial-size"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF3131] text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E02828] transition-all shadow-xl"
                >
                  Try for {trialPrice}
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                >
                  View All Products
                </Link>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping over $35</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>100% satisfaction guarantee</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/products/purrify-standard-bag.png"
                  alt="Purrify cat litter deodorizer - Made in Canada"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
              {/* Canadian flag badge */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-3xl">🇨🇦</div>
              </div>
            </div>
          </div>
        </header>

        {/* Why Canadian Section */}
        <section className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
              Why Canadian Cat Owners Choose Purrify
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Supporting Canadian businesses means faster shipping, local support, and products designed
              for Canadian homes.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {canadianBenefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Made in Canada Story */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800 rounded-2xl p-8 md:p-12 border border-red-100 dark:border-red-900/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🍁</div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-50">
                  Our Canadian Story
                </h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Purrify was born from a simple frustration: why couldn&apos;t we find a cat litter deodorizer
                  that actually worked without overpowering fragrances or questionable ingredients?
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  As Canadian cat parents, we set out to create something better. We source premium
                  coconut shell activated carbon—the same water-filter grade material used in municipal
                  water treatment—and manufacture right here in Canada.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  The result? A 100% natural, fragrance-free solution that eliminates odours at the
                  molecular level. No masking. No chemicals. Just clean air and happy cats.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Canadian Made</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">7+ Days</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Odour Control</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">0</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Added Fragrances</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Across Canada */}
        <section className="bg-gray-50 dark:bg-gray-800/50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
              Fast Shipping Across Canada
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              We ship to every province and territory. Most orders arrive within 3-7 business days.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {majorCities.map((city) => (
                <div
                  key={city.name}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700"
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100">{city.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{city.province}</div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
                Shipping Options
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">Free Standard Shipping</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">On orders over $35 CAD • 5-7 business days</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">Expedited Shipping</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Available at checkout • 2-4 business days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Canadian Reviews */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
              What Canadian Cat Parents Say
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Join thousands of Canadian cat owners who&apos;ve switched to Purrify.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  &quot;Finally, a Canadian product that actually works! No more embarrassing smells when
                  guests come over. Shipping from within Canada was fast too.&quot;
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">— Sarah M., Toronto, ON</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  &quot;I love supporting Canadian businesses, and Purrify is the real deal. Works way better
                  than the American brands I used to order. Plus no crazy shipping fees!&quot;
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">— Michael R., Vancouver, BC</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  &quot;Living in a Montreal condo, odour control is essential. Purrify solved the problem
                  without any fragrance. My neighbours have no idea I have three cats!&quot;
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">— Julie L., Montreal, QC</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#FF3131] to-[#FF5050] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center text-white dark:text-gray-100">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Try Canada&apos;s Best Cat Litter Deodorizer
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Made in Canada. Shipped from Canada. Loved by Canadian cat parents.
              Join the thousands who&apos;ve discovered the Purrify difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/products/trial-size"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-100 text-[#FF3131] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-all shadow-xl"
              >
                Start with Trial Size - {trialPrice}
              </Link>
              <Link
                href="/products/standard"
                className="inline-flex items-center justify-center gap-2 bg-white/20 dark:bg-white/10 text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 dark:hover:bg-white/20 transition-all border border-white/30 dark:border-white/20"
              >
                Standard Size - {standardPrice}
              </Link>
            </div>

            <p className="text-sm opacity-75">
              Free shipping on orders over $35 CAD • 100% satisfaction guarantee • Made in Canada 🇨🇦
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Is Purrify really made in Canada?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes! Purrify is proudly manufactured in Canada. We source premium coconut shell activated
                  carbon and produce our product domestically, supporting Canadian jobs and ensuring quality control.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Do you ship to all provinces and territories?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we ship to every province and territory in Canada. Free standard shipping is available
                  on orders over $35 CAD. Remote areas may have slightly longer delivery times.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  How long does shipping take within Canada?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Standard shipping typically takes 5-7 business days. Major cities (Toronto, Vancouver,
                  Montreal, Calgary, Ottawa) often receive orders within 3-5 days. Expedited shipping
                  (2-4 days) is available at checkout.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  What makes Purrify different from other cat litter deodorizers in Canada?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Unlike baking soda-based products (like Arm & Hammer), Purrify uses activated carbon
                  which physically traps ammonia molecules. It&apos;s 100% natural, fragrance-free, and lasts
                  3-7x longer than traditional deodorizers. Plus, you&apos;re supporting a Canadian business.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Can I buy Purrify in Canadian stores?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Currently, Purrify is available online at purrify.ca with free shipping across Canada.
                  We&apos;re working on expanding to Canadian retailers. Sign up for our newsletter to be
                  notified when we&apos;re available in stores near you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="bg-gray-50 dark:bg-gray-800/50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-8">
              Learn More About Cat Litter Odour Control
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/learn/how-activated-carbon-works"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
              >
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                  How Activated Carbon Works
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The science behind odour elimination
                </p>
              </Link>

              <Link
                href="/learn/solutions/apartment-cat-smell-solution"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
              >
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                  Odour Control for Apartments
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Perfect for Canadian condos and apartments
                </p>
              </Link>

              <Link
                href="/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
              >
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                  Arm & Hammer Alternative
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Why activated carbon works better than baking soda
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
