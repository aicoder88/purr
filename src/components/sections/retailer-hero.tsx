import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';
import { scrollToSection } from '../../lib/utils';

export function RetailerHero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full pt-24 pb-16 overflow-hidden bg-gradient-to-br from-[#5B2EFF]/8 via-white to-[#3694FF]/8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">

      {/* Enhanced background decorations */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-[#5B2EFF]/20 to-[#3694FF]/20 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-l from-[#3694FF]/20 to-[#5B2EFF]/20 dark:from-[#5B2EFF]/10 dark:to-[#3694FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Top Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#5B2EFF]/15 to-[#3694FF]/15 dark:from-[#3694FF]/25 dark:to-[#5B2EFF]/25 text-[#5B2EFF] dark:text-[#3694FF] border-2 border-[#5B2EFF]/30 dark:border-[#3694FF]/40 shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {t.retailers?.hero?.badge || '🚀 #1 Pet Store Partner in Canada'}
            </span>
          </div>

          {/* Main Content Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column - Main Message */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
                <span className="block text-gray-900 dark:text-gray-50">
                  Boost Your
                </span>
                <span className="block bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent">
                  Pet Store Profits
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                Join <strong className="text-[#5B2EFF] dark:text-[#3694FF]">17 established retailers</strong> selling Canada's #1 cat odor solution with <strong>50%+ margins</strong>
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-black text-[#5B2EFF] dark:text-[#3694FF]">50%</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Profit Margins</div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-black text-[#FF3131] dark:text-[#FF5050]">89%</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Repurchase Rate</div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-black text-[#5B2EFF] dark:text-[#3694FF]">24h</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Setup Time</div>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection("retailer-contact")}
                  size="lg"
                  className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-white font-black py-6 px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 active:scale-95 border-0 transform hover:-translate-y-2 text-lg"
                >
                  🚀 Start Partnership Today
                </Button>
                <Button
                  onClick={() => scrollToSection("wholesale-pricing")}
                  size="lg"
                  variant="outline"
                  className="bg-white/80 dark:bg-gray-800/80 text-[#5B2EFF] dark:text-[#3694FF] font-bold py-6 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 border-2 border-[#5B2EFF]/50 dark:border-[#3694FF]/50 hover:bg-[#5B2EFF] dark:hover:bg-[#3694FF] hover:text-white dark:hover:text-white transform hover:-translate-y-2 backdrop-blur-sm"
                >
                  View Pricing
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 text-center lg:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Trusted by leading retailers:</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300">Pet Stores</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300">Vet Clinics</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300">Groomers</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300">Distributors</span>
                </div>
              </div>
            </div>

            {/* Right Column - Value Props */}
            <div className="space-y-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-900 dark:text-gray-50">High-Margin Product</h3>
                    <p className="text-[#5B2EFF] dark:text-[#3694FF] font-bold">Up to 55% profit margins</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">Premium pricing with lightweight shipping. Higher margins than traditional heavy litter products.</p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#FF3131] to-[#FF6B6B] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-900 dark:text-gray-50">Customer Loyalty</h3>
                    <p className="text-[#FF3131] dark:text-[#FF5050] font-bold">4.8/5 star rating</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">Customers become loyal advocates. Monthly repurchases and referrals drive steady revenue.</p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-900 dark:text-gray-50">Complete Support</h3>
                    <p className="text-[#10B981] dark:text-[#34D399] font-bold">Everything included</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">POS materials, training, marketing support, and dedicated account management included.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
