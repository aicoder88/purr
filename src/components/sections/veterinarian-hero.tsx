'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/translation-context';
import { scrollToSection } from '@/lib/utils';

export function VeterinarianHero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full pt-24 pb-16 overflow-hidden bg-gradient-to-br from-[#10B981]/8 via-white to-[#3694FF]/8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">

      {/* Enhanced background decorations */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-[#10B981]/20 to-[#3694FF]/20 dark:from-[#10B981]/10 dark:to-[#3694FF]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-l from-[#3694FF]/20 to-[#10B981]/20 dark:from-[#3694FF]/10 dark:to-[#10B981]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Top Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#10B981]/15 to-[#3694FF]/15 dark:from-[#10B981]/25 dark:to-[#3694FF]/25 text-brand-green-700 dark:text-[#34D399] border-2 border-[#10B981]/30 dark:border-[#34D399]/40 shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {t.veterinarians?.hero?.badge || 'Veterinary Partnership Program'}
            </span>
          </div>

          {/* Main Content Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column - Main Message */}
            <div className="text-center lg:text-left">
              <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
                <span className="block text-gray-900 dark:text-gray-50">
                  {t.veterinarians?.hero?.titleLine1 || 'Recommend With'}
                </span>
                <span className="block bg-gradient-to-r from-[#10B981] to-[#3694FF] bg-clip-text text-transparent">
                  {t.veterinarians?.hero?.titleLine2 || 'Confidence'}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                {t.veterinarians?.hero?.description || 'Give your clients a health-focused odor solution that\'s'}
                {' '}
                <strong className="text-brand-green-700 dark:text-[#34D399]">
                  {t.veterinarians?.hero?.highlight || '100% natural and fragrance-free'}
                </strong>
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-black text-brand-green-700 dark:text-[#34D399]">100%</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t.veterinarians?.hero?.stats?.natural || 'Natural'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-black text-[#3694FF] dark:text-[#60A5FA]">Zero</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t.veterinarians?.hero?.stats?.chemicals || 'Chemicals'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-black text-brand-green-700 dark:text-[#34D399]">7+</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t.veterinarians?.hero?.stats?.days || 'Days Protection'}
                  </div>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection("vet-contact")}
                  size="lg"
                  className="bg-gradient-to-r from-[#10B981] to-[#3694FF] hover:from-[#059669] hover:to-[#2563EB] text-white dark:text-white font-black py-6 px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 active:scale-95 border-0 transform hover:-translate-y-2 text-lg"
                >
                  {t.veterinarians?.hero?.cta?.primary || 'Request Sample Kit'}
                </Button>
                <Button
                  onClick={() => scrollToSection("vet-partnership")}
                  size="lg"
                  variant="outline"
                  className="bg-white dark:bg-gray-800 text-brand-green-700 dark:text-[#34D399] font-bold py-6 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 border-2 border-[#10B981]/50 dark:border-[#34D399]/50 hover:bg-[#10B981] dark:hover:bg-[#34D399] hover:text-white dark:hover:text-gray-900 transform hover:-translate-y-2 backdrop-blur-sm"
                >
                  {t.veterinarians?.hero?.cta?.secondary || 'View Partnership Options'}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 text-center lg:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {t.veterinarians?.hero?.trustedBy || 'Trusted by veterinary professionals:'}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {t.veterinarians?.hero?.badges?.fragrance || 'Fragrance-Free'}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {t.veterinarians?.hero?.badges?.natural || 'Non-Toxic'}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {t.veterinarians?.hero?.badges?.sensitive || 'Sensitive Cat Approved'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Value Props */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50">
                      {t.veterinarians?.hero?.valueProps?.health?.title || 'Health-First Formula'}
                    </h3>
                    <p className="text-brand-green-700 dark:text-[#34D399] font-bold">
                      {t.veterinarians?.hero?.valueProps?.health?.subtitle || 'No fragrances or irritants'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  {t.veterinarians?.hero?.valueProps?.health?.description || 'Activated coconut carbon with zero chemicals - ideal for cats with respiratory sensitivities or allergies.'}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#3694FF] to-[#60A5FA] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50">
                      {t.veterinarians?.hero?.valueProps?.ammonia?.title || 'Reduces Ammonia Exposure'}
                    </h3>
                    <p className="text-[#3694FF] dark:text-[#60A5FA] font-bold">
                      {t.veterinarians?.hero?.valueProps?.ammonia?.subtitle || 'Better air quality'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  {t.veterinarians?.hero?.valueProps?.ammonia?.description || 'Activated carbon traps ammonia molecules at the source, reducing respiratory irritation for both cats and their owners.'}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50">
                      {t.veterinarians?.hero?.valueProps?.revenue?.title || 'Additional Revenue Stream'}
                    </h3>
                    <p className="text-[#F59E0B] dark:text-[#FBBF24] font-bold">
                      {t.veterinarians?.hero?.valueProps?.revenue?.subtitle || 'High margins, repeat purchases'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  {t.veterinarians?.hero?.valueProps?.revenue?.description || 'Clients trust your recommendations. Offer a solution to the #1 complaint about cat ownership and build loyalty.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
