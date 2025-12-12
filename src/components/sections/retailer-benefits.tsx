import { Container } from '../ui/container';
import { useTranslation } from '../../lib/translation-context';

export function RetailerBenefits() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t.retailers?.benefits?.highDemand?.title || 'High Customer Demand',
      description: t.retailers?.benefits?.highDemand?.description || 'Pet owners actively seek odor solutions. Purrify addresses the #1 complaint about cat ownership - litter box odors.',
      stats: '89% of customers repurchase within 30 days'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: t.retailers?.benefits?.highMargins?.title || 'Premium Margins',
      description: t.retailers?.benefits?.highMargins?.description || 'Small, lightweight product with high perceived value. Better margins than traditional heavy cat litter products.',
      stats: 'Up to 55% profit margins'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t.retailers?.benefits?.easyStocking?.title || 'Easy to Stock',
      description: t.retailers?.benefits?.easyStocking?.description || 'Compact packaging saves shelf space. No refrigeration required. Long shelf life with no expiration concerns.',
      stats: '50x lighter than cat litter'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h2" />
        </svg>
      ),
      title: t.retailers?.benefits?.marketingSupport?.title || 'Complete Marketing Support',
      description: t.retailers?.benefits?.marketingSupport?.description || 'We provide everything you need: shelf displays, product training, customer education materials, and co-op advertising.',
      stats: 'Full POS kit included'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: t.retailers?.benefits?.customerLoyalty?.title || 'Builds Customer Loyalty',
      description: t.retailers?.benefits?.customerLoyalty?.description || 'When Purrify solves their odor problem, customers become loyal to your store. They return monthly and recommend to friends.',
      stats: '4.8/5 star customer rating'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t.retailers?.benefits?.fastMoving?.title || 'Fast-Moving Inventory',
      description: t.retailers?.benefits?.fastMoving?.description || 'Unlike slow-moving pet accessories, Purrify is a consumable product with predictable monthly reorders.',
      stats: 'Average 30-day inventory turnover'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            {t.retailers?.benefits?.title || 'Why Retailers Choose Purrify'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.retailers?.benefits?.description || 'Join hundreds of successful pet stores and retailers who have added Purrify to their product lineup with outstanding results.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#5B2EFF]/10 to-[#3694FF]/20 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/10 rounded-xl flex items-center justify-center mb-4 text-[#5B2EFF] dark:text-[#3694FF]">
                {benefit.icon}
              </div>

              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {benefit.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {benefit.description}
              </p>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-full mr-3"></div>
                  <span className="text-sm font-semibold text-[#5B2EFF] dark:text-[#3694FF]">
                    {benefit.stats}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Preview */}
        <div className="mt-16 bg-gradient-to-r from-[#5B2EFF]/5 to-[#3694FF]/5 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/10 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              {t.retailers?.benefits?.success?.title || 'Real Success Stories'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-2">17</div>
                <div className="text-gray-600 dark:text-gray-300">Current Retail Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF3131] dark:text-[#FF5050] mb-2">$2.3M</div>
                <div className="text-gray-600 dark:text-gray-300">Annual Retail Revenue</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-300">Partner Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}