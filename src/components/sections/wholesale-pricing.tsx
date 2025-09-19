import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';
import { scrollToSection } from '../../lib/utils';

export function WholesalePricing() {
  const { t } = useTranslation();

  const pricingTiers = [
    {
      name: t.retailers?.pricing?.tiers?.starter?.name || 'Starter',
      description: t.retailers?.pricing?.tiers?.starter?.description || 'Perfect for small pet stores',
      minOrder: '24 units',
      discount: '25%',
      margin: '35%',
      features: [
        'Free shipping on orders $150+',
        'Monthly restocking',
        'Basic POS materials',
        'Email support'
      ],
      highlighted: false
    },
    {
      name: t.retailers?.pricing?.tiers?.growth?.name || 'Growth',
      description: t.retailers?.pricing?.tiers?.growth?.description || 'Most popular for established stores',
      minOrder: '48 units',
      discount: '35%',
      margin: '45%',
      features: [
        'Free shipping on all orders',
        'Bi-weekly restocking',
        'Premium POS kit',
        'Phone & email support',
        'Co-op advertising credits'
      ],
      highlighted: true
    },
    {
      name: t.retailers?.pricing?.tiers?.enterprise?.name || 'Enterprise',
      description: t.retailers?.pricing?.tiers?.enterprise?.description || 'For chains and large retailers',
      minOrder: '96 units',
      discount: '50%',
      margin: '55%',
      features: [
        'Free expedited shipping',
        'Custom restocking schedule',
        'Custom POS materials',
        'Dedicated account manager',
        'Exclusive territory rights',
        'Staff training programs'
      ],
      highlighted: false
    }
  ];

  return (
    <section id="wholesale-pricing" className="py-16 bg-white dark:bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            {t.retailers?.pricing?.title || 'Wholesale Pricing Tiers'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.retailers?.pricing?.description || 'Flexible pricing options designed to maximize your margins while providing exceptional value to your customers.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-[#5B2EFF]/5 to-[#3694FF]/10 border-2 border-[#5B2EFF] dark:border-[#3694FF] shadow-lg transform scale-105'
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              } transition-all duration-300 hover:shadow-xl`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] text-white dark:text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{tier.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tier.description}</p>

                <div className="flex justify-center items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#3694FF]">{tier.discount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Wholesale Discount</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF3131] dark:text-[#FF5050]">{tier.margin}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Your Margin</div>
                  </div>
                </div>

                <div className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Min Order: {tier.minOrder}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-200">
                    <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => scrollToSection("retailer-contact")}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-[#5B2EFF]/5 to-[#3694FF]/5 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            {t.retailers?.pricing?.additional?.title || 'Volume Discounts Available'}
          </h3>
          <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-3xl mx-auto">
            {t.retailers?.pricing?.additional?.description || 'Looking for larger quantities? We offer custom pricing for chains, distributors, and high-volume retailers. Contact us for a personalized quote.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("retailer-contact")}
              size="lg"
              className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Request Custom Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#5B2EFF] dark:border-[#3694FF] text-[#5B2EFF] dark:text-[#3694FF] hover:bg-[#5B2EFF] dark:hover:bg-[#3694FF] hover:text-white dark:hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Download Price Sheet
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}