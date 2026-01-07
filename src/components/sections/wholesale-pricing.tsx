import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { scrollToSection } from '../../lib/utils';
import { useCallback, useMemo } from 'react';
import { PHONE_MESSAGING } from '../../lib/constants';

// Types
interface PricingTier {
  name: string;
  description: string;
  contents: string[];
  features: string[];
  highlighted: boolean;
  badge: string;
}

interface TierCardProps {
  tier: PricingTier;
  onCtaClick: () => void;
}

// Shared gradient classes
const GRADIENTS = {
  primary: 'from-[#5B2EFF] to-[#3694FF]',
  primaryHover: 'hover:from-[#4C1EEB] hover:to-[#2563EB]',
  checkmark: 'from-[#10B981] to-[#34D399]',
} as const;

// Checkmark icon component
function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Trust signal data
const TRUST_SIGNALS = [
  {
    icon: 'check',
    label: 'No Setup Fees',
    bgColor: 'bg-green-500 dark:bg-green-600',
  },
  {
    icon: 'clock',
    label: '72hr Approval',
    bgColor: 'bg-blue-500 dark:bg-blue-600',
  },
  {
    icon: 'verified',
    label: 'Proven ROI',
    bgColor: 'bg-purple-500 dark:bg-purple-600',
  },
] as const;

// Trust signals component
function TrustSignals() {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'check':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />;
      case 'clock':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />;
      case 'verified':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {TRUST_SIGNALS.map((signal) => (
        <div key={signal.label} className="flex items-center justify-center space-x-3">
          <div className={`w-8 h-8 ${signal.bgColor} rounded-full flex items-center justify-center`}>
            <svg className="w-5 h-5 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {getIcon(signal.icon)}
            </svg>
          </div>
          <span className="font-bold text-gray-800 dark:text-gray-200">{signal.label}</span>
        </div>
      ))}
    </div>
  );
}

// Tier card component
function TierCard({ tier, onCtaClick }: TierCardProps) {
  const cardClasses = tier.highlighted
    ? `bg-gradient-to-br from-[#5B2EFF]/10 via-white to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:via-gray-800 dark:to-[#5B2EFF]/20 border-3 border-[#5B2EFF] dark:border-[#3694FF] shadow-2xl transform scale-105 z-10`
    : 'bg-white dark:bg-gray-800/70 border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl';

  const badgeClasses = tier.highlighted
    ? `bg-gradient-to-r ${GRADIENTS.primary} text-white dark:text-white`
    : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900';

  const buttonClasses = tier.highlighted
    ? `bg-gradient-to-r ${GRADIENTS.primary} ${GRADIENTS.primaryHover} text-white dark:text-white shadow-xl hover:shadow-2xl`
    : 'bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-300 text-white dark:text-gray-900 hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-100 dark:hover:to-gray-200 shadow-lg hover:shadow-xl';

  return (
    <div
      className={`relative flex flex-col h-full rounded-3xl p-8 ${cardClasses} backdrop-blur-sm transition-all duration-500 hover:transform hover:scale-105`}
    >
      {/* Badge */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className={`px-4 py-2 rounded-full text-sm font-bold ${badgeClasses}`}>
          {tier.badge}
        </span>
      </div>

      <div className="text-center mb-8 pt-4">
        <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-2">
          {tier.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{tier.description}</p>

        {/* Package Contents */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 mb-6">
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
            Package Includes:
          </div>
          <ul className="space-y-2 text-left">
            {tier.contents.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-200 font-medium flex items-start">
                <span className="text-[#5B2EFF] dark:text-[#3694FF] mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start text-gray-700 dark:text-gray-200">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${GRADIENTS.checkmark} flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
              <CheckIcon className="text-white dark:text-white" />
            </div>
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button
          onClick={onCtaClick}
          className={`w-full py-4 px-6 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${buttonClasses}`}
        >
          {tier.highlighted ? '🚀 Start Growing Now' : 'Get Started'}
        </Button>
      </div>
    </div>
  );
}

// Pricing tier data
const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter Package',
    description: 'Perfect for testing the waters',
    contents: [
      'One box of trial size (25 small bags)',
      'One box of medium (15 medium bags)',
      'One box of large (10 large bags)',
    ],
    features: [
      'Proven 4.8/5 star product',
      'Lightweight shipping advantage',
      'Basic POS display included',
      'Email support & setup guide',
      'Free product replacement for damaged goods',
    ],
    highlighted: false,
    badge: '🚀 Quick Start',
  },
  {
    name: 'Growth Partner',
    description: 'The smart choice for growing retailers',
    contents: [
      'Five boxes of trial size (125 small bags)',
      'Five boxes of medium (75 medium bags)',
      'Five boxes of large (50 large bags)',
      '🎁 BONUS: 5 extra medium bags free',
    ],
    features: [
      'Premium counter display',
      'Staff training materials',
      'Digital marketing assets (social posts, email templates)',
      'Priority phone & email support',
    ],
    highlighted: true,
    badge: '⭐ Best Value',
  },
  {
    name: 'Scale Success',
    description: 'For serious revenue growth',
    contents: [
      'Ten boxes of trial size (250 small bags)',
      'Ten boxes of medium (150 medium bags)',
      'Ten boxes of large (100 large bags)',
      '🎁 BONUS: 25 extra trial bags to hook new customers',
    ],
    features: [
      'Everything in Growth Partner',
      'Dedicated account manager',
      'Custom marketing materials & co-branding',
      'Territory protection rights',
      'Quarterly business reviews & sales analytics',
      'Priority inventory allocation',
    ],
    highlighted: false,
    badge: '🏆 Enterprise',
  },
];

export function WholesalePricing() {
  const handleScrollToRetailer = useCallback(() => {
    scrollToSection('retailer-contact');
  }, []);

  const pricingTiers = useMemo(() => PRICING_TIERS, []);

  return (
    <section id="wholesale-pricing" className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 text-[#5B2EFF] dark:text-[#3694FF] font-semibold text-sm mb-6">
            💰 Transparent Wholesale Pricing
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-50 mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent">
              Profit Level
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Partner with Canada's fastest-selling cat odor solution. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <TierCard key={index} tier={tier} onCtaClick={handleScrollToRetailer} />
          ))}
        </div>

        {/* Risk Reversal & Urgency */}
        <div className="bg-gradient-to-r from-[#5B2EFF]/10 via-[#3694FF]/5 to-[#5B2EFF]/10 dark:from-[#3694FF]/15 dark:via-[#5B2EFF]/10 dark:to-[#3694FF]/15 rounded-3xl p-10 text-center border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-3xl font-black text-gray-900 dark:text-gray-50 mb-4">
              🎯 Ready to Boost Your Revenue?
            </h3>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
              Join <strong className="text-[#5B2EFF] dark:text-[#3694FF]">21 established Montreal and surrounding-area retailers</strong> already earning high margins with Purrify.
              <br/>Setup takes less than 24 hours.
            </p>

            {/* Trust Signals */}
            <TrustSignals />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleScrollToRetailer}
                size="lg"
                className={`bg-gradient-to-r ${GRADIENTS.primary} ${GRADIENTS.primaryHover} text-white dark:text-white font-black py-4 px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg`}
              >
                💰 Apply for Partnership
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#5B2EFF] dark:border-[#3694FF] text-[#5B2EFF] dark:text-[#3694FF] hover:bg-[#5B2EFF] dark:hover:bg-[#3694FF] hover:text-white dark:hover:text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                📞 {PHONE_MESSAGING.callout}
              </Button>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 italic mt-4 max-w-lg mx-auto">
              {PHONE_MESSAGING.explanation}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
