"use client";

import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';
import { scrollToSection } from '../../lib/utils';

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
        <div className="max-w-6xl mx-auto">
          {/* Top Badge */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#5B2EFF]/20 dark:to-[#3694FF]/20 text-[#5B2EFF] dark:text-[#3694FF] border border-[#5B2EFF]/20 dark:border-[#5B2EFF]/30 backdrop-blur-sm shadow-sm ring-1 ring-white/50 dark:ring-gray-800/50">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {hero?.badge || '#1 Pet Store Partner in Canada'}
            </span>
          </div>

          {/* Main Content Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Column - Main Message */}
            <div className="text-center lg:text-left">
              <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-8 text-gray-900 dark:text-white">
                <span className="block mb-2">
                  {hero?.boostYour || 'Boost Your'}
                </span>
                <span className="block bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent pb-3">
                  {hero?.petStoreProfits || 'Pet Store Profits'}
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                {hero?.mainDescription || (
                  <>
                    Join <strong className="text-[#5B2EFF] dark:text-[#3694FF]">{hero?.retailerCount || '21 established retailers'}</strong> selling Canada's #1 cat odor solution with <strong>{hero?.marginHighlight || '50%+ margins'}</strong>.
                  </>
                )}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center p-5 bg-white dark:bg-gray-900/60 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800/50 backdrop-blur-md hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-black text-[#5B2EFF] dark:text-[#3694FF] mb-1">
                    {hero?.stats?.profitMargins?.value || '50%'}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {hero?.stats?.profitMargins?.label || 'Margins'}
                  </div>
                </div>
                <div className="text-center p-5 bg-white dark:bg-gray-900/60 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800/50 backdrop-blur-md hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-black text-[#FF3131] dark:text-[#FF5050] mb-1">
                    {hero?.stats?.repurchaseRate?.value || '89%'}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {hero?.stats?.repurchaseRate?.label || 'Repurchase'}
                  </div>
                </div>
                <div className="text-center p-5 bg-white dark:bg-gray-900/60 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800/50 backdrop-blur-md hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-black text-[#5B2EFF] dark:text-[#3694FF] mb-1">
                    {hero?.stats?.setupTime?.value || '24h'}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {hero?.stats?.setupTime?.label || 'Setup'}
                  </div>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection("retailer-contact")}
                  size="lg"
                  className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white font-black py-7 px-10 rounded-2xl shadow-xl shadow-[#5B2EFF]/25 hover:shadow-2xl hover:shadow-[#5B2EFF]/35 transition-all duration-300 active:scale-95 border-0 text-lg"
                >
                  🚀 {hero?.cta?.startPartnership || 'Start Partnership Today'}
                </Button>
                <Button
                  onClick={() => scrollToSection("wholesale-pricing")}
                  size="lg"
                  variant="outline"
                  className="bg-white/80 dark:bg-gray-900/50 text-[#5B2EFF] dark:text-[#3694FF] font-bold py-7 px-10 rounded-2xl border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30 hover:bg-[#5B2EFF]/5 dark:hover:bg-[#3694FF]/10 hover:border-[#5B2EFF]/50 dark:hover:border-[#3694FF]/50 transition-all duration-300 active:scale-95 backdrop-blur-sm text-lg"
                >
                  {hero?.cta?.viewPricing || 'View Pricing'}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 text-center lg:text-left">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
                  {hero?.trustIndicators?.label || 'Trusted by leading retailers:'}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 items-center">
                  {['Pet Stores', 'Vet Clinics', 'Groomers', 'Distributors'].map((badge) => (
                    <span key={badge} className="px-4 py-2 bg-gray-100 dark:bg-gray-800/80 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {hero?.trustIndicators?.types?.[badge.toLowerCase().replace(' ', '') as keyof typeof hero.trustIndicators.types] || badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Value Props */}
            <div className="space-y-6 lg:pl-10">
              <div className="group bg-white dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 hover:border-[#5B2EFF]/30 dark:hover:border-[#3694FF]/30 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5B2EFF] to-[#3694FF] rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-[#5B2EFF]/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                    <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-1 group-hover:text-[#5B2EFF] dark:group-hover:text-[#3694FF] transition-colors">
                      {hero?.valueProps?.highMargin?.title || 'High-Margin Product'}
                    </h3>
                    <p className="text-[#5B2EFF] dark:text-[#3694FF] font-bold text-sm mb-2">
                      {hero?.valueProps?.highMargin?.highlight || 'Up to 55% profit margins'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {hero?.valueProps?.highMargin?.description || 'Premium pricing with lightweight shipping. Higher margins than traditional heavy litter products.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 hover:border-[#FF3131]/30 dark:hover:border-[#FF5050]/30 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF3131] to-[#FF6B6B] rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-[#FF3131]/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                    <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-1 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                      {hero?.valueProps?.customerLoyalty?.title || 'Customer Loyalty'}
                    </h3>
                    <p className="text-[#FF3131] dark:text-[#FF5050] font-bold text-sm mb-2">
                      {hero?.valueProps?.customerLoyalty?.highlight || '4.8/5 star rating'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {hero?.valueProps?.customerLoyalty?.description || 'Customers become loyal advocates. Monthly repurchases and referrals drive steady revenue.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 hover:border-[#10B981]/30 dark:hover:border-[#34D399]/30 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-[#10B981]/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                    <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-1 group-hover:text-[#10B981] dark:group-hover:text-[#34D399] transition-colors">
                      {hero?.valueProps?.completeSupport?.title || 'Complete Support'}
                    </h3>
                    <p className="text-[#10B981] dark:text-[#34D399] font-bold text-sm mb-2">
                      {hero?.valueProps?.completeSupport?.highlight || 'Everything included'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {hero?.valueProps?.completeSupport?.description || 'POS materials, training, marketing support, and dedicated account management included.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
