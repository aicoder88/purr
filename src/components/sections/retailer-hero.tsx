import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';
import { scrollToSection } from '../../lib/utils';

export function RetailerHero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full pt-20 pb-16 overflow-hidden bg-gradient-to-br from-[#5B2EFF]/5 via-white to-[#3694FF]/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">

      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#3694FF]/10 dark:bg-[#5B2EFF]/5 rounded-full blur-3xl"></div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 text-[#5B2EFF] dark:text-[#3694FF] border border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {t.retailers?.hero?.badge || 'Business Partnership'}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            <span className="block text-gray-900 dark:text-gray-50">
              {t.retailers?.hero?.title || 'Partner with Purrify'}
            </span>
            <span className="block bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent">
              {t.retailers?.hero?.subtitle || 'Wholesale Success'}
            </span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
            {t.retailers?.hero?.description || 'Join hundreds of pet stores and retailers offering Canada\'s #1 activated carbon cat litter additive. Proven sales, loyal customers, marketing support included.'}
          </p>

          {/* Key Benefits Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.retailers?.benefits?.pricing?.title || 'Wholesale Pricing'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t.retailers?.benefits?.pricing?.description || 'Up to 50% margins with volume discounts'}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.retailers?.benefits?.marketing?.title || 'Marketing Support'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t.retailers?.benefits?.marketing?.description || 'POS materials, training, co-op advertising'}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.retailers?.benefits?.proven?.title || 'Proven Product'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t.retailers?.benefits?.proven?.description || '4.8/5 stars, high repeat purchase rate'}</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("wholesale-pricing")}
              size="lg"
              className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border-0 transform hover:-translate-y-1"
            >
              {t.retailers?.hero?.cta?.primary || 'View Wholesale Pricing'}
            </Button>
            <Button
              onClick={() => scrollToSection("retailer-contact")}
              size="lg"
              variant="outline"
              className="bg-white dark:bg-gray-800 text-[#5B2EFF] dark:text-[#3694FF] font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border-2 border-[#5B2EFF] dark:border-[#3694FF] hover:bg-[#5B2EFF] dark:hover:bg-[#3694FF] hover:text-white dark:hover:text-white transform hover:-translate-y-1"
            >
              {t.retailers?.hero?.cta?.secondary || 'Become a Partner'}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}