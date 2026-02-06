"use client";

import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/translation-context';
import { scrollToSection } from '@/lib/utils';

export function RetailerHero() {
  const { t } = useTranslation();
  const hero = t.retailers?.hero;

  return (
    <section className="relative w-full pt-32 pb-24 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* Background Gradients & Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-gray-50/80 to-transparent dark:from-gray-900/50 dark:to-transparent" />
        <div className="absolute -top-[20%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#5B2EFF]/20 dark:to-[#3694FF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#3694FF]/10 to-[#5B2EFF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Content Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Column - Main Message */}
            <div className="text-center lg:text-left">
              {/* Top Badge */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-black bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#5B2EFF]/20 dark:to-[#3694FF]/20 text-[#5B2EFF] dark:text-[#3694FF] border border-[#5B2EFF]/20 dark:border-[#5B2EFF]/30 backdrop-blur-sm shadow-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {hero?.badge || '#1 Pet Store Partner in Canada'}
                </span>
              </div>

              <h1 className="font-heading text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 text-gray-900 dark:text-white">
                <span className="block mb-2">
                  {hero?.boostYour || 'Boost Your'}
                </span>
                <span className="block bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent pb-3">
                  {hero?.petStoreProfits || 'Pet Store Profits'}
                </span>
              </h1>

              <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                {hero?.mainDescription || (
                  <>
                    Join <strong className="text-[#5B2EFF] dark:text-[#3694FF]">{hero?.retailerCount || '21 established retailers'}</strong> selling Canada's #1 cat odor solution with <strong>{hero?.marginHighlight || '50%+ margins'}</strong>.
                  </>
                )}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="text-center p-6 bg-white dark:bg-gray-900/40 rounded-3xl shadow-xl shadow-[#5B2EFF]/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-black text-[#5B2EFF] dark:text-[#3694FF] mb-1">
                    {hero?.stats?.profitMargins?.value || '50%'}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {hero?.stats?.profitMargins?.label || 'Margins'}
                  </div>
                </div>
                <div className="text-center p-6 bg-white dark:bg-gray-900/40 rounded-3xl shadow-xl shadow-[#FF3131]/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-black text-[#FF3131] dark:text-[#FF5050] mb-1">
                    {hero?.stats?.repurchaseRate?.value || '89%'}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {hero?.stats?.repurchaseRate?.label || 'Repurchase'}
                  </div>
                </div>
                <div className="text-center p-6 bg-white dark:bg-gray-900/40 rounded-3xl shadow-xl shadow-[#3694FF]/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-black text-[#3694FF] mb-1">
                    {hero?.stats?.setupTime?.value || '24h'}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {hero?.stats?.setupTime?.label || 'Setup'}
                  </div>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection("retailer-contact")}
                  size="lg"
                  className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white font-black py-8 px-12 rounded-3xl shadow-2xl shadow-[#5B2EFF]/30 hover:shadow-2xl hover:shadow-[#5B2EFF]/40 transition-all duration-300 active:scale-95 border-0 text-xl"
                >
                  🚀 {hero?.cta?.startPartnership || 'Start Partnership Today'}
                </Button>
                <Button
                  onClick={() => scrollToSection("wholesale-pricing")}
                  size="lg"
                  variant="outline"
                  className="bg-white/50 dark:bg-gray-900/30 text-[#5B2EFF] dark:text-[#3694FF] font-black py-8 px-12 rounded-3xl border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30 hover:bg-[#5B2EFF]/5 dark:hover:bg-[#3694FF]/10 hover:border-[#5B2EFF]/50 dark:hover:border-[#3694FF]/50 transition-all duration-300 active:scale-95 backdrop-blur-md text-xl"
                >
                  {hero?.cta?.viewPricing || 'View Pricing'}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 text-center lg:text-left">
                <p className="text-xs font-black text-gray-400 dark:text-gray-500 mb-5 uppercase tracking-[0.2em]">
                  {hero?.trustIndicators?.label || 'Trusted by leading retailers:'}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 items-center">
                  {['Pet Stores', 'Vet Clinics', 'Groomers', 'Distributors'].map((badge) => (
                    <span key={badge} className="px-5 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                      {hero?.trustIndicators?.types?.[badge.toLowerCase().replace(' ', '') as keyof typeof hero.trustIndicators.types] || badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Hero Visual */}
            <div className="relative">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200 dark:shadow-none border-8 border-white dark:border-gray-800 rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[4/3]">
                <Image
                  src="/optimized/retailer-hero-lifestyle.png"
                  alt="Pet store retail display"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating Value Prop Card */}
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-2xl shadow-[#5B2EFF]/20 dark:shadow-none border border-gray-100 dark:border-gray-700 max-w-[280px] -rotate-3 hover:rotate-0 transition-transform duration-500 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                    <svg className="w-6 h-6 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900 dark:text-white leading-tight">Fast-Selling</div>
                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Inventory Turn</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  Average retailer restocking every 14 days. Don't let your shelf space go to waste.
                </p>
              </div>

              {/* Decorative Blur */}
              <div className="absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-[#5B2EFF]/20 dark:bg-[#5B2EFF]/10 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
