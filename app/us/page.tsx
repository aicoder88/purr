import Link from 'next/link';
import Image from 'next/image';
import { formatProductPrice } from '@/lib/pricing';
import { Check, MapPin, Truck, Leaf, Shield, Star, ChevronRight, Home, Zap, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Cat Litter Odor Control USA | Shipping Q1 2026 | Purrify',
  description: 'Eliminate cat litter odors at the source. Purrify is coming to the USA in Q1 2026! Premium activated carbon cat litter deodorizer for ultimate odor control.',
  keywords: [
    'cat litter odor control',
    'best cat litter odor control USA',
    'litter box odor eliminator',
    'activated carbon cat litter additive',
    'how to stop cat litter smell',
    'natural cat litter deodorizer USA',
    'Purrify USA shipping',
  ],
  openGraph: {
    title: 'Best Cat Litter Odor Control USA | Shipping Q1 2026 | Purrify',
    description: 'Eliminate cat litter odors at the source. Purrify is coming to the USA in Q1 2026!',
    images: ['https://www.purrify.ca/images/us/realistic-modern-living.webp'],
  },
  alternates: {
    canonical: '/us',
    languages: {
      'en-US': '/us',
      'en-CA': '/',
      'fr-CA': '/fr',
      'zh-CN': '/zh',
      'es-US': '/es',
      'x-default': '/',
    },
  },
};

// JSON-LD structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Purrify Activated Carbon Cat Litter Deodorizer - USA Edition',
  description: 'Premium activated carbon litter additive for extreme odor control, launching in USA Q1 2026.',
  brand: {
    '@type': 'Brand',
    name: 'Purrify',
  },
  category: 'Pet Supplies > Cat Supplies > Cat Litter Accessories',
  image: 'https://www.purrify.ca/images/us/realistic-modern-living.webp',
};

interface USALandingPageProps {
  params: Promise<{ locale?: string }>;
}

export default async function USALandingPage({ params }: USALandingPageProps) {
  const { locale = 'en' } = await params;
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);

  const usBenefits = [
    {
      icon: Clock,
      title: 'USA Shipping Q1 2026',
      description: 'We are expanding! USA customers can start ordering our premium deodorizer starting January 2026.',
    },
    {
      icon: Zap,
      title: 'Extreme Odor Control',
      description: 'Our proprietary activated carbon technology traps ammonia molecules instantly.',
    },
    {
      icon: Leaf,
      title: '100% Eco-Friendly',
      description: 'Sustainable coconut-shell carbon. Safe for cats, humans, and the planet.',
    },
    {
      icon: Truck,
      title: 'Fast Domestic Shipping',
      description: 'Once launched, we will ship from US-based warehouses for rapid 2-day delivery.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-cream-50 dark:bg-gray-900 min-h-screen">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto pt-6 pb-4 px-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 dark:text-gray-100 font-medium">USA</span>
        </nav>

        {/* Hero Section */}
        <header className="max-w-6xl mx-auto px-4 py-12 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 animate-pulse">
                <MapPin className="w-4 h-4" />
                <span>Launching USA Shipping Q1 2026</span>
              </div>

              <h1 className="font-heading text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
                The Science of <span className="text-forest-600 dark:text-forest-400">Odorless</span> Living
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl">
                Tired of masking cat litter smells? Purrify uses high-grade activated carbon to eliminate
                odors at the molecular level. Fresh air is coming to American homes in 2026.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF3131] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#E02828] transition-all transform hover:scale-105 shadow-2xl hover:shadow-red-500/20"
                >
                  Join the Waitlist
                </Link>
                <div className="flex flex-col justify-center text-sm">
                  <span className="font-bold text-gray-900 dark:text-gray-100">Coming Soon</span>
                  <span className="text-gray-500 dark:text-gray-400">Shipping starts Q1 2026</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Fragrance Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Dust Free</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] group">
                <Image
                  src="/images/us/realistic-modern-living.webp"
                  alt="Fresh American living room with happy cat"
                  width={800}
                  height={1000}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <p className="text-white text-sm font-medium italic">
                    &quot;Finally, a home that smells like home, not like a litter box.&quot;
                  </p>
                </div>
              </div>
              {/* USA Flag Badge */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-full p-4 shadow-2xl border-4 border-white dark:border-gray-900 transform rotate-12 transition-transform hover:rotate-0">
                <div className="text-4xl">🇺🇸</div>
              </div>
            </div>
          </div>
        </header>

        {/* The Ghibli Magic Section */}
        <section className="bg-white dark:bg-gray-800 py-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <Image
                  src="/images/us/ghibli-us-home.webp"
                  alt="Cozy Ghibli style home with cat"
                  width={600}
                  height={600}
                  className="rounded-3xl shadow-xl hover:rotate-2 transition-transform duration-500"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-6">
                  Experience the Purrify Peace of Mind
                </h2>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                  <p>
                    Cat box odors aren&apos;t just annoying; they&apos;re caused by ammonia molecules that can saturate your living space.
                  </p>
                  <p>
                    Purrify doesn&apos;t mask these smells with artificial perfumes. Instead, we use a sophisticated
                    adsorption process that pulls odors out of the air and traps them deep inside our premium
                    carbon pores.
                  </p>
                  <p className="font-semibold text-forest-700 dark:text-forest-400">
                    Imagine a home where the only thing you notice about your cat is their purr.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="bg-cream-50 dark:bg-gray-900 py-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
              Coming to America: Q1 2026
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16 text-lg">
              We&apos;re preparing our US logistics to bring you the highest quality cat litter odor control products starting early next year.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {usBenefits.map((benefit) => (
                <div key={benefit.title} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow group">
                  <div className="w-14 h-14 bg-forest-100 dark:bg-forest-900/30 rounded-2xl flex items-center justify-center mb-6 border border-forest-200 dark:border-forest-800 transition-transform group-hover:-translate-y-1">
                    <benefit.icon className="w-7 h-7 text-forest-600 dark:text-forest-400" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Science Visual Section */}
        <section className="bg-forest-900 text-white py-24 relative overflow-hidden">
          {/* Abstract circles decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-forest-800 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-700 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">
                  The Power of <br />
                  <span className="text-forest-400 font-extrabold">Activated Carbon</span>
                </h2>
                <div className="space-y-6 opacity-90 text-lg leading-relaxed">
                  <p>
                    Unlike baking soda which reacts only on contact, our coconut-shell activated carbon works
                    like a magnetic vacuum for odor molecules.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="bg-forest-800/50 p-6 rounded-2xl border border-forest-700">
                      <div className="text-4xl font-bold text-forest-400 mb-2">10x</div>
                      <div className="text-sm">Greater Surface Area than Competitors</div>
                    </div>
                    <div className="bg-forest-800/50 p-6 rounded-2xl border border-forest-700">
                      <div className="text-4xl font-bold text-forest-400 mb-2">7+</div>
                      <div className="text-sm">Days of Total Odor Elimination</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <Image
                  src="/images/us/ghibli-odor-science.webp"
                  alt="Ghibli science showing odor capture"
                  width={600}
                  height={600}
                  className="rounded-3xl shadow-2xl border-4 border-white/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Macro Realism Section */}
        <section className="bg-white dark:bg-gray-800 py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] overflow-hidden shadow-inner border border-gray-100 dark:border-gray-800">
              <div className="grid lg:grid-cols-2 lg:items-stretch">
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-6">
                    Professional Grade Filtration
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    We use the same filtration-grade material found in luxury water purification systems.
                    Our carbon granules are optimized specifically for the high-ammonia environment of a cat litter box.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Industrial adsorption strength',
                      'Non-toxic and pet-safe',
                      'No messy dust or tracking',
                      'Effective for multi-cat households'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative min-h-[400px]">
                  <Image
                    src="/images/us/realistic-carbon-effect.webp"
                    alt="Realistic macro view of carbon action"
                    fill
                    className="object-cover transition-transform duration-[2s] hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Odor Control Focus */}
        <section className="py-24 px-4 bg-cream-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-16">
              Odor Control FAQ
            </h2>

            <div className="grid gap-6">
              {[
                {
                  q: "What is the best way to control cat litter odor?",
                  a: "The most effective way is using activated carbon. Unlike baking soda or fragrances, activated carbon physically traps ammonia and sulfur molecules through adsorption, eliminating the smell completely instead of just masking it."
                },
                {
                  q: "How does Purrify compare to other deodorizers?",
                  a: "Most US brands use heavy perfumes or sodium bicarbonate. Purrify uses high-porosity coconut-shell carbon which has orders of magnitude more surface area for trapping odors, making it significantly more effective for multi-cat homes."
                },
                {
                  q: "Is it safe for my cat to inhale?",
                  a: "Yes! Purrify is 100% natural and dust-free. Our carbon is water-filter grade, meaning it's pure enough for human water filtration. It contains no chemicals or synthetic scents that could irritate a cat's respiratory system."
                },
                {
                  q: "When can I buy Purrify in the USA?",
                  a: "We are officially launching USA shipping in Q1 2026. You can join our waitlist now to receive a 25% launch discount when we go live."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Waitlist Section */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#FF3131] to-[#E02828] rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
            {/* Visual flare */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight">
                Get Fresh Air in Q1 2026
              </h2>
              <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Be the first to know when we launch in the US and secure your exclusive <strong>Early Bird Discount</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#FF3131] px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1"
                >
                  Join the Waitlist Now
                </Link>
                <Link
                  href="/blog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-full font-bold text-xl transition-all border border-white/30 backdrop-blur-sm"
                >
                  Read Our Odor Blog
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium opacity-80">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-white" />
                  <span>Free Shipping over $35</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-white" />
                  <span>100% Odor Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-white" />
                  <span>Pet Safe Materials</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
