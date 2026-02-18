"use client";

import { Button } from "@/components/ui/button";
import { getPaymentLink } from "@/lib/payment-links";

// Icon components - extracted to avoid repetition
function LightningIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

// CTA button class - branded coral color
const CTA_BUTTON_CLASSES = "w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-deep-coral to-deep-coral/90 hover:from-deep-coral/90 hover:to-deep-coral text-white dark:text-gray-100 font-black text-lg sm:text-xl rounded-2xl shadow-2xl shadow-deep-coral/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl hover:shadow-deep-coral/40 min-h-[60px] flex items-center justify-center gap-3 group border-2 border-deep-coral/20";

interface HeroContentProps {
  t: {
    nav?: {
      findNearYou?: string;
      findStore?: string;
    };
    hero: {
      headline?: string;
      subheadline?: string;
      tagline?: string;
      eliminateCatOdors: string;
      instantly: string;
      description: string;
      socialProof: {
        trustNumber: string;
        trustText: string;
        ratingText: string;
      };
      pricing?: {
        trial: string;
        standard: string;
        family: string;
      };
      dualPath?: {
        consumer?: {
          title: string;
          description: string;
          cta: string;
        };
        retailer?: {
          title: string;
          description: string;
          cta: string;
        };
      };
      buttons: {
        reviews: string;
        learnMore?: string;
        tryFree?: string;
      };
      ariaLabels: {
        reviews: string;
      };
      simplified?: {
        free: string;
        justPayShipping: string;
        noMore: string;
        litterBoxSmell: string;
        valueProposition: string;
        trialSize: string;
        standard: string;
        familyPack: string;
        plusSH: string;
        thirtyDayGuarantee: string;
        getFreeSample: string;
        soldThisWeek: string;
        limitedStock: string;
        moneyBackGuarantee: string;
      };
    };
  };
  locale: string;
}

// CSS-based avatars - no external API calls for better mobile performance
const avatarColors = [
  'from-purple-400 to-pink-400',
  'from-blue-400 to-cyan-400',
  'from-green-400 to-emerald-400',
  'from-orange-400 to-amber-400',
];

const SocialProofAvatars = () => (
  <div className="flex -space-x-3">
    {avatarColors.map((gradient, index) => (
      <div
        key={`avatar-${index}`}
        className={`w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-br ${gradient} flex items-center justify-center`}
        aria-hidden="true"
      >
        <svg className="w-6 h-6 text-white/80 dark:text-gray-100/80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    ))}
  </div>
);


export const HeroContent = ({ t }: HeroContentProps) => {
  // Use new simplified headline structure or fallback to existing
  const headline = t.hero.headline || t.hero.eliminateCatOdors;
  const subheadline = t.hero.subheadline || t.hero.instantly;

  return (
    <div className="flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10 relative z-10 py-4">
      {/* Simplified Headline - outcome-focused */}
      <div className="space-y-4">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-gray-900 dark:text-white">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400">
            {headline}
          </span>
          <span className="block mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-medium text-electric-indigo">
            {subheadline}
          </span>
        </h1>

        {/* Shortened description */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
          {t.hero.description}
        </p>
      </div>

      {/* Trust & Social Proof Row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10 py-2 border-y border-gray-200/30 dark:border-gray-700/30">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            {t.hero.simplified?.moneyBackGuarantee || "Money-Back Guarantee"}
          </div>
        </div>

        <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-gray-700/50"></div>

        <div className="flex items-center gap-4">
          <SocialProofAvatars />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-bold text-gray-900 dark:text-white block text-base">
              {t.hero.socialProof.trustNumber}
            </span>
            <span className="text-xs uppercase tracking-wider font-medium">{t.hero.socialProof.trustText}</span>
          </div>
        </div>
      </div>

      {/* Main CTA Button - B2C: Free Trial */}
      <div className="flex flex-col gap-4 pt-4 max-w-md">
        <Button
          asChild
          className={`${CTA_BUTTON_CLASSES} !py-8 !px-10`}
          aria-label={t.hero.buttons.tryFree || "Get My Free Trial"}
        >
          <a href={getPaymentLink('trialSingle') || '/products'}>
            <LightningIcon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            <span className="tracking-tight">{t.hero.buttons.tryFree || "Get My Free Trial"}</span>
            <ArrowIcon className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
          <span className="w-2 h-2 bg-electric-indigo rounded-full animate-pulse"></span>
          {t.hero.simplified?.moneyBackGuarantee || "Try Risk Free for 30 Days"}
        </p>
      </div>

      {/* Mantra tag line */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800/50 w-fit">
        <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight italic opacity-80 decoration-electric-indigo decoration-4 underline-offset-8">
          "{t.hero.tagline || "Just Pour. Mix. And Breathe Easy"}"
        </p>
      </div>
    </div>
  );
};
