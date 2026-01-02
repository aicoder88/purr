import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';
import { scrollToSection } from '../../lib/utils';

export function VeterinarianPartnership() {
  const { t } = useTranslation();

  const partnershipTiers = [
    {
      name: t.veterinarians?.partnership?.tiers?.starter?.name || 'Starter',
      description: t.veterinarians?.partnership?.tiers?.starter?.description || 'Perfect for clinics wanting to try our products',
      features: [
        t.veterinarians?.partnership?.tiers?.starter?.features?.[0] || 'Free sample kit (5 units)',
        t.veterinarians?.partnership?.tiers?.starter?.features?.[1] || '15% wholesale discount',
        t.veterinarians?.partnership?.tiers?.starter?.features?.[2] || 'Client education materials',
        t.veterinarians?.partnership?.tiers?.starter?.features?.[3] || 'Email support',
      ],
      cta: t.veterinarians?.partnership?.tiers?.starter?.cta || 'Request Sample Kit',
      popular: false,
      color: 'border-gray-300 dark:border-gray-600'
    },
    {
      name: t.veterinarians?.partnership?.tiers?.professional?.name || 'Professional Partner',
      description: t.veterinarians?.partnership?.tiers?.professional?.description || 'For clinics ready to recommend Purrify to clients',
      features: [
        t.veterinarians?.partnership?.tiers?.professional?.features?.[0] || '25% wholesale discount',
        t.veterinarians?.partnership?.tiers?.professional?.features?.[1] || 'Priority restocking',
        t.veterinarians?.partnership?.tiers?.professional?.features?.[2] || 'Staff training session',
        t.veterinarians?.partnership?.tiers?.professional?.features?.[3] || 'Co-branded materials',
        t.veterinarians?.partnership?.tiers?.professional?.features?.[4] || 'Dedicated account manager',
      ],
      cta: t.veterinarians?.partnership?.tiers?.professional?.cta || 'Become a Partner',
      popular: true,
      color: 'border-[#10B981] dark:border-[#34D399]'
    },
    {
      name: t.veterinarians?.partnership?.tiers?.enterprise?.name || 'Enterprise',
      description: t.veterinarians?.partnership?.tiers?.enterprise?.description || 'For clinic networks and large practices',
      features: [
        t.veterinarians?.partnership?.tiers?.enterprise?.features?.[0] || '30%+ volume discounts',
        t.veterinarians?.partnership?.tiers?.enterprise?.features?.[1] || 'Custom packaging options',
        t.veterinarians?.partnership?.tiers?.enterprise?.features?.[2] || 'Quarterly business reviews',
        t.veterinarians?.partnership?.tiers?.enterprise?.features?.[3] || 'Marketing co-investment',
        t.veterinarians?.partnership?.tiers?.enterprise?.features?.[4] || 'First access to new products',
      ],
      cta: t.veterinarians?.partnership?.tiers?.enterprise?.cta || 'Contact Sales',
      popular: false,
      color: 'border-gray-300 dark:border-gray-600'
    }
  ];

  return (
    <section id="vet-partnership" className="py-20 bg-white dark:bg-gray-900">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#10B981]/10 to-[#3694FF]/10 dark:from-[#10B981]/20 dark:to-[#3694FF]/20 text-[#10B981] dark:text-[#34D399] font-semibold text-sm mb-6">
            {t.veterinarians?.partnership?.badge || 'Partnership Options'}
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-50 mb-6">
            {t.veterinarians?.partnership?.titleLine1 || 'Choose Your'}
            <span className="block bg-gradient-to-r from-[#10B981] to-[#3694FF] bg-clip-text text-transparent">
              {t.veterinarians?.partnership?.titleLine2 || 'Partnership Level'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.veterinarians?.partnership?.subtitle || 'Flexible options for practices of all sizes. Start with samples and grow into a full partnership.'}
          </p>
        </div>

        {/* Partnership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partnershipTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800/70 rounded-3xl p-8 shadow-xl border-2 ${tier.color} hover:shadow-2xl transition-all duration-300 ${tier.popular ? 'transform md:-translate-y-4' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] text-white dark:text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {t.veterinarians?.partnership?.mostPopular || 'Most Popular'}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => scrollToSection("vet-contact")}
                className={`w-full py-4 font-bold rounded-xl ${
                  tier.popular
                    ? 'bg-gradient-to-r from-[#10B981] to-[#3694FF] hover:from-[#059669] hover:to-[#2563EB] text-white dark:text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100'
                }`}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-3xl p-10">
          <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-8 text-center">
            {t.veterinarians?.partnership?.included?.title || 'All Partners Receive'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                {t.veterinarians?.partnership?.included?.materials?.title || 'Education Materials'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t.veterinarians?.partnership?.included?.materials?.description || 'Brochures and handouts for clients'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#3694FF] to-[#60A5FA] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                {t.veterinarians?.partnership?.included?.training?.title || 'Staff Training'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t.veterinarians?.partnership?.included?.training?.description || 'Product knowledge sessions'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                {t.veterinarians?.partnership?.included?.display?.title || 'Display Materials'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t.veterinarians?.partnership?.included?.display?.description || 'Counter displays and signage'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#EC4899] to-[#F472B6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                {t.veterinarians?.partnership?.included?.support?.title || 'Dedicated Support'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t.veterinarians?.partnership?.included?.support?.description || 'Quick response to all inquiries'}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
