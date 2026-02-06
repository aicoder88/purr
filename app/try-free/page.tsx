export const dynamic = 'force-static';

/**
 * /try-free - Conversion-focused free trial landing page
 * Primary landing page for ad traffic - simplified layout with clear CTA
 */
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { getProductPrice, formatProductPrice } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import Image from 'next/image';
import { Check, Star, Truck, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { TryFreeClient } from './TryFreeClient';

export const metadata = {
  title: 'FREE Purrify Trial - Just Pay Shipping | Eliminate Cat Litter Odor',
  description: 'FREE Purrify Trial | Just Pay $4.76 Shipping | Eliminates cat litter smell instantly with water-filter grade carbon. ★ 4.8 rating. Ships USA & Canada.',
  keywords: ['free trial', 'cat litter freshener', 'odor eliminator sample', 'free shipping'],
  openGraph: {
    title: 'FREE Purrify Trial - Just Pay Shipping | Eliminate Cat Litter Odor',
    description: 'FREE Purrify Trial | Just Pay $4.76 Shipping | Eliminates cat litter smell instantly with water-filter grade carbon. ★ 4.8 rating. Ships USA & Canada.',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/17g-transparent.webp',
        width: 1200,
        height: 800,
        alt: 'Purrify Trial Size - Free Sample',
      },
    ],
  },
};

export default function TryFreePage() {
  return (
    <TryFreeClient>
      <TryFreeContent />
    </TryFreeClient>
  );
}

// Main content component - receives locale via TryFreeClient
function TryFreeContent() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section - Above the Fold */}
      <section className="relative py-8 md:py-12 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

        <Container>
          <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Content */}
            <div className="order-2 md:order-1 text-center md:text-left">
              {/* Urgency badge */}
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 dark:bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 dark:bg-red-400" />
                </span>
                Limited Time Offer
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4 leading-tight">
                Try Purrify{' '}
                <span className="text-[#03E46A]">FREE</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
                Discover why cat owners are switching to activated carbon odor control.
                <strong className="text-gray-900 dark:text-gray-100"> Just pay shipping.</strong>
              </p>

              {/* Price callout */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-through">$9.99 value</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">FREE</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Shipping only</p>
                    <p className="text-2xl font-bold text-[#03E46A]">$4.76</p>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#03E46A] hover:bg-[#02C55A] text-white dark:text-gray-900 font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <a href={getPaymentLink('trialSingle') || '/products/trial-size'}>
                    Get My Free Trial
                  </a>
                </Button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                  <ShieldCheck className="inline h-4 w-4 mr-1" />
                  30-day money-back guarantee
                </p>
              </div>

              {/* Social proof stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[#03E46A]">87%</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">upgrade to full size</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[#03E46A]">4.8</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">star rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[#03E46A]">2-3</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">weeks of freshness</p>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-64 md:w-80 aspect-[3/4]">
                <Image
                  src="/optimized/17g-transparent.webp"
                  alt="Purrify 12g Trial Size - Free Sample"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
                {/* Free badge */}
                <div className="absolute -top-2 -right-2 bg-[#FF3131] text-white dark:text-gray-100 font-bold px-4 py-2 rounded-full text-sm shadow-lg transform rotate-12">
                  FREE!
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-50 mb-8">
            Why Cat Owners Love Purrify
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, text: 'Eliminates odor instantly' },
              { icon: ShieldCheck, text: '100% natural coconut carbon' },
              { icon: Truck, text: 'Fast Canada-wide shipping' },
              { icon: Clock, text: '30-day money-back guarantee' },
            ].map((benefit, i) => (
              <div
                key={i}
                className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <benefit.icon className="h-10 w-10 mx-auto mb-3 text-[#03E46A]" />
                <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-50 mb-8">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Sprinkle', desc: 'Add to any litter your cat already uses' },
              { step: '2', title: 'Trap', desc: 'Activated carbon traps ammonia molecules' },
              { step: '3', title: 'Enjoy', desc: 'Fresh-smelling home for 2-3 weeks' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-[#03E46A] text-white dark:text-gray-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust indicators */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-4">
              &ldquo;I was skeptical at first, but after trying the free sample, I immediately ordered the full size.
              My litter box area has never smelled better!&rdquo;
            </blockquote>
            <p className="text-gray-500 dark:text-gray-400">
              - Sarah M., Toronto
            </p>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-gradient-to-r from-[#03E46A] to-[#02C55A]">
        <Container>
          <div className="text-center text-white dark:text-gray-900">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to eliminate litter box odor?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Get your free trial today - just pay $4.76 shipping
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white dark:bg-gray-900 text-[#03E46A] hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              <a href={getPaymentLink('trialSingle') || '/products/trial-size'}>
                Claim My Free Trial
              </a>
            </Button>
            <p className="mt-4 text-sm opacity-80">
              <Check className="inline h-4 w-4 mr-1" />
              Limit 1 per customer | Ships within 24 hours
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
