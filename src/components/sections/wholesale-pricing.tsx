"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';
import { useCallback, useMemo } from 'react';
import { PHONE_MESSAGING } from '@/lib/constants';
import { useTranslation } from '@/lib/translation-context';

// Types
interface PricingTier {
  name: string;
  description: string;
  contents: string[];
  features: string[];
  highlighted: boolean;
  badge: string;
  cta: string;
  image: string;
  imageAlt: string;
}

interface TierCardProps {
  tier: PricingTier;
  onCtaClick: () => void;
  packageIncludesLabel: string;
  index: number;
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

// Trust signals component
function TrustSignals({ labels }: { labels: { noSetupFees: string; approval72hr: string; provenROI: string } }) {
  const signals = [
    { icon: 'check', label: labels.noSetupFees, bgColor: 'bg-green-500 dark:bg-green-600' },
    { icon: 'clock', label: labels.approval72hr, bgColor: 'bg-blue-500 dark:bg-blue-600' },
    { icon: 'verified', label: labels.provenROI, bgColor: 'bg-purple-500 dark:bg-purple-600' },
  ];

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
      {signals.map((signal) => (
        <div key={signal.label} className="flex items-center justify-center space-x-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
          <div className={`w-8 h-8 ${signal.bgColor} rounded-full flex items-center justify-center shadow-md`}>
            <svg className="w-4 h-4 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {getIcon(signal.icon)}
            </svg>
          </div>
          <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{signal.label}</span>
        </div>
      ))}
    </div>
  );
}

// Tier card component
function TierCard({ tier, onCtaClick, packageIncludesLabel, index }: TierCardProps) {
  const cardClasses = tier.highlighted
    ? `bg-white dark:bg-gray-800 border-2 border-[#5B2EFF] dark:border-[#3694FF] shadow-2xl shadow-[#5B2EFF]/15 transform lg:scale-105 z-10 ring-8 ring-[#5B2EFF]/5 dark:ring-[#3694FF]/5`
    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600';

  const badgeClasses = tier.highlighted
    ? `bg-gradient-to-r ${GRADIENTS.primary} text-white`
    : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900';

  const buttonClasses = tier.highlighted
    ? `bg-gradient-to-r ${GRADIENTS.primary} ${GRADIENTS.primaryHover} text-white shadow-xl shadow-[#5B2EFF]/20`
    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex flex-col h-full rounded-[40px] p-8 ${cardClasses} transition-all duration-500`}
    >
      {/* Badge */}
      {tier.highlighted && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-full text-center px-4">
          <span className={`inline-block px-8 py-2.5 rounded-full text-sm font-black shadow-xl shadow-[#5B2EFF]/30 tracking-tight ${badgeClasses}`}>
            {tier.badge === 'Best Value' ? '🔥' : '🚀'} {tier.badge}
          </span>
        </div>
      )}

      {/* Product Image Section */}
      <div className="relative h-48 mb-8 mt-4 flex items-center justify-center group">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-900/30 rounded-[32px] -z-10 group-hover:scale-105 transition-transform duration-500" />
        <div className="relative w-40 h-40 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
          <Image
            src={tier.image}
            alt={tier.imageAlt}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Floating elements for visual interest */}
        {tier.highlighted && (
          <>
            <div className="absolute top-0 right-4 w-12 h-12 bg-[#5B2EFF]/10 dark:bg-[#5B2EFF]/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#3694FF]/10 dark:bg-[#3694FF]/20 rounded-full blur-xl animate-pulse delay-700" />
          </>
        )}
      </div>

      {/* Card Header */}
      <div className="text-center mb-8">
        <h3 className="font-heading text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
          {tier.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-bold min-h-[40px] leading-relaxed">
          {tier.description}
        </p>

        {/* Package Contents */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800/40 rounded-[32px] p-6 border border-gray-100 dark:border-gray-700/50">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 text-left">
            {packageIncludesLabel}
          </div>
          <ul className="space-y-3 text-left">
            {tier.contents.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-200 font-bold flex items-start leading-snug">
                <span className="text-[#5B2EFF] dark:text-[#3694FF] mr-3 text-xl leading-none">•</span>
                {item.startsWith('BONUS') ? (
                  <span className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent">
                    {item}
                  </span>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 mb-10">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-5 text-left">
          Features
        </div>
        <ul className="space-y-4">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
              <div className={`w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5`}>
                <CheckIcon className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-bold leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-700">
        <Button
          onClick={onCtaClick}
          className={`w-full py-8 px-6 rounded-3xl font-black text-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border-0 shadow-lg ${buttonClasses}`}
        >
          {tier.highlighted ? '🚀 ' : ''}{tier.cta}
        </Button>
      </div>
    </motion.div>
  );
}

export function WholesalePricing() {
  const { t } = useTranslation();
  const pricing = t.retailers?.wholesalePricing;

  const handleScrollToRetailer = useCallback(() => {
    scrollToSection('retailer-contact');
  }, []);

  // Build pricing tiers from translations
  const pricingTiers: PricingTier[] = useMemo(() => [
    {
      name: pricing?.tiers?.starter?.name || 'Starter Package',
      description: pricing?.tiers?.starter?.description || 'Perfect for testing the waters',
      contents: pricing?.tiers?.starter?.contents || [
        'One box of trial size (25 small bags)',
        'One box of medium (15 medium bags)',
        'One box of large (10 large bags)',
      ],
      features: pricing?.tiers?.starter?.features || [
        'Proven 4.8/5 star product',
        'Lightweight shipping advantage',
        'Basic POS display included',
        'Email support & setup guide',
        'Free product replacement for damaged goods',
      ],
      highlighted: false,
      badge: pricing?.tiers?.starter?.badge || 'Quick Start',
      cta: pricing?.tiers?.starter?.cta || 'Get Started',
      image: '/optimized/17g-transparent-v2.webp',
      imageAlt: 'Purrify Starter Pack',
    },
    {
      name: pricing?.tiers?.growth?.name || 'Growth Partner',
      description: pricing?.tiers?.growth?.description || 'The smart choice for growing retailers',
      contents: pricing?.tiers?.growth?.contents || [
        'Five boxes of trial size (125 small bags)',
        'Five boxes of medium (75 medium bags)',
        'Five boxes of large (50 large bags)',
        'BONUS: 5 extra medium bags free',
      ],
      features: pricing?.tiers?.growth?.features || [
        'Premium counter display',
        'Staff training materials',
        'Digital marketing assets (social posts, email templates)',
        'Priority phone & email support',
      ],
      highlighted: true,
      badge: pricing?.tiers?.growth?.badge || 'Best Value',
      cta: pricing?.tiers?.growth?.cta || 'Start Growing Now',
      image: '/optimized/60g-transparent.webp',
      imageAlt: 'Purrify Growth Partner Package',
    },
    {
      name: pricing?.tiers?.scale?.name || 'Scale Success',
      description: pricing?.tiers?.scale?.description || 'For serious revenue growth',
      contents: pricing?.tiers?.scale?.contents || [
        'Ten boxes of trial size (250 small bags)',
        'Ten boxes of medium (150 medium bags)',
        'Ten boxes of large (100 large bags)',
        'BONUS: 25 extra trial bags to hook new customers',
      ],
      features: pricing?.tiers?.scale?.features || [
        'Everything in Growth Partner',
        'Dedicated account manager',
        'Custom marketing materials & co-branding',
        'Territory protection rights',
        'Quarterly business reviews & sales analytics',
        'Priority inventory allocation',
      ],
      highlighted: false,
      badge: pricing?.tiers?.scale?.badge || 'Enterprise',
      cta: pricing?.tiers?.scale?.cta || 'Get Started',
      image: '/optimized/140g-transparent.webp',
      imageAlt: 'Purrify Scale Success Package',
    },
  ], [pricing]);

  const trustSignalLabels = {
    noSetupFees: pricing?.trustSignals?.noSetupFees || 'No Setup Fees',
    approval72hr: pricing?.trustSignals?.approval72hr || '72hr Approval',
    provenROI: pricing?.trustSignals?.provenROI || 'Proven ROI',
  };

  return (
    <section id="wholesale-pricing" className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#3694FF] dark:text-[#3694FF] font-bold text-sm mb-6 border border-blue-100 dark:border-blue-800/30">
            💰 {pricing?.sectionBadge || 'Transparent Wholesale Pricing'}
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            {pricing?.title || 'Choose Your'}
            <span className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent ml-2">
              {pricing?.titleHighlight || 'Profit Level'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {pricing?.subtitle || "Start small or go big. We have a package that fits your store's needs."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {pricingTiers.map((tier, index) => (
            <TierCard
              key={index}
              tier={tier}
              onCtaClick={handleScrollToRetailer}
              packageIncludesLabel={pricing?.packageIncludes || 'Package Includes:'}
              index={index}
            />
          ))}
        </div>

        {/* Risk Reversal & Urgency */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl p-10 md:p-14 text-center border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-200/50 dark:shadow-none">
          {/* Background decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#5B2EFF]/5 to-[#3694FF]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#5B2EFF]/5 to-[#3694FF]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="font-heading text-3xl font-black text-gray-900 dark:text-white mb-6">
              🎯 {pricing?.bottomCta?.title || 'Ready to Boost Your Revenue?'}
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              {pricing?.bottomCta?.description || 'Join 21 established Montreal and surrounding-area retailers already earning high margins with Purrify.'}
              <br className="hidden md:block" /> {pricing?.bottomCta?.setupNote || 'Setup takes less than 24 hours.'}
            </p>

            {/* Trust Signals */}
            <TrustSignals labels={trustSignalLabels} />

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button
                onClick={handleScrollToRetailer}
                size="lg"
                className={`bg-gradient-to-r ${GRADIENTS.primary} ${GRADIENTS.primaryHover} text-white font-black py-7 px-10 rounded-2xl shadow-xl shadow-[#5B2EFF]/25 hover:shadow-2xl hover:shadow-[#5B2EFF]/35 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg border-0`}
              >
                💰 {pricing?.bottomCta?.primaryButton || 'Apply for Partnership'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white dark:bg-gray-900 border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30 text-[#5B2EFF] dark:text-[#3694FF] hover:bg-[#5B2EFF]/5 dark:hover:bg-[#3694FF]/10 font-bold py-7 px-10 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg"
              >
                📞 {PHONE_MESSAGING.callout}
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium italic mt-6">
              {PHONE_MESSAGING.explanation}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
