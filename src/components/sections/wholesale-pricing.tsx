import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';
import { scrollToSection } from '../../lib/utils';

export function WholesalePricing() {
  const { t } = useTranslation();

  const pricingTiers = [
    {
      name: 'Starter Pack',
      description: 'Perfect for testing the waters',
      minOrder: '24 units',
      retailPrice: '$24.99',
      wholesalePrice: '$12.49',
      margin: '50%',
      monthlyRevenue: '$600',
      features: [
        'Proven 4.8/5 star product',
        'Lightweight shipping advantage',
        'Basic POS display included',
        'Email support & setup guide'
      ],
      highlighted: false,
      badge: '🚀 Quick Start'
    },
    {
      name: 'Growth Partner',
      description: 'Most popular choice',
      minOrder: '48 units',
      retailPrice: '$24.99',
      wholesalePrice: '$11.24',
      margin: '55%',
      monthlyRevenue: '$1,200',
      features: [
        'Everything in Starter Pack',
        'Premium counter display',
        'Staff training materials',
        'Co-op advertising credits',
        'Priority phone support'
      ],
      highlighted: true,
      badge: '⭐ Best Value'
    },
    {
      name: 'Scale Success',
      description: 'For serious revenue growth',
      minOrder: '96 units',
      retailPrice: '$24.99',
      wholesalePrice: '$9.99',
      margin: '60%',
      monthlyRevenue: '$2,400',
      features: [
        'Everything in Growth Partner',
        'Dedicated account manager',
        'Custom marketing materials',
        'Territory protection rights',
        'Quarterly business reviews'
      ],
      highlighted: false,
      badge: '🏆 Enterprise'
    }
  ];

  return (
    <section id="wholesale-pricing" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 text-[#5B2EFF] dark:text-[#3694FF] font-semibold text-sm mb-6">
            💰 Transparent Wholesale Pricing
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-50 mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent">
              Profit Level
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start earning <strong className="text-[#5B2EFF] dark:text-[#3694FF]">50-60% margins</strong> with Canada's fastest-selling cat odor solution. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-[#5B2EFF]/10 via-white to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:via-gray-800 dark:to-[#5B2EFF]/20 border-3 border-[#5B2EFF] dark:border-[#3694FF] shadow-2xl transform scale-105 z-10'
                  : 'bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl'
              } backdrop-blur-sm transition-all duration-500 hover:transform hover:scale-105`}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] text-white'
                    : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                }`}>
                  {tier.badge}
                </span>
              </div>

              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-black text-gray-900 dark:text-gray-50 mb-2">{tier.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{tier.description}</p>

                {/* Pricing Display */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">You Pay</div>
                      <div className="text-2xl font-black text-[#5B2EFF] dark:text-[#3694FF]">{tier.wholesalePrice}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">You Sell</div>
                      <div className="text-2xl font-black text-gray-900 dark:text-gray-50">{tier.retailPrice}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-3xl font-black text-[#10B981] dark:text-[#34D399]">{tier.margin}</div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Profit Margin</div>
                  </div>
                </div>

                {/* Revenue Projection */}
                <div className="bg-gradient-to-r from-[#5B2EFF]/5 to-[#3694FF]/5 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/10 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Est. Monthly Revenue</div>
                  <div className="text-2xl font-black text-[#FF3131] dark:text-[#FF5050]">{tier.monthlyRevenue}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Based on {tier.minOrder} units/month</div>
                </div>

                <div className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  Min Order: <span className="text-[#5B2EFF] dark:text-[#3694FF]">{tier.minOrder}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-gray-700 dark:text-gray-200">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => scrollToSection("retailer-contact")}
                className={`w-full py-4 px-6 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white shadow-xl hover:shadow-2xl'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-300 text-white dark:text-gray-900 hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-100 dark:hover:to-gray-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {tier.highlighted ? '🚀 Start Growing Now' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>

        {/* Risk Reversal & Urgency */}
        <div className="bg-gradient-to-r from-[#5B2EFF]/10 via-[#3694FF]/5 to-[#5B2EFF]/10 dark:from-[#3694FF]/15 dark:via-[#5B2EFF]/10 dark:to-[#3694FF]/15 rounded-3xl p-10 text-center border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-black text-gray-900 dark:text-gray-50 mb-4">
              🎯 Ready to Boost Your Revenue?
            </h3>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
              Join <strong className="text-[#5B2EFF] dark:text-[#3694FF]">300+ successful retailers</strong> already earning high margins with Purrify.
              <br/>Setup takes less than 24 hours.
            </p>

            {/* Trust Signals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-200">No Setup Fees</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-200">24hr Approval</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-200">Proven ROI</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("retailer-contact")}
                size="lg"
                className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white font-black py-4 px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
              >
                💰 Apply for Partnership
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#5B2EFF] dark:border-[#3694FF] text-[#5B2EFF] dark:text-[#3694FF] hover:bg-[#5B2EFF] dark:hover:bg-[#3694FF] hover:text-white dark:hover:text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                📞 Call: 1-250-432-9352
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}