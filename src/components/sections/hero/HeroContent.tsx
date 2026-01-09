import { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { heroTestimonials } from "@/data/hero-testimonials";
import { useABTestWithTracking, AB_TEST_SLUGS } from "@/lib/ab-testing";

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

// CTA button class variants for A/B testing
const CTA_BUTTON_VARIANTS = {
  orange: "w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white dark:text-gray-100 font-black text-lg sm:text-xl rounded-2xl shadow-2xl shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl hover:shadow-orange-500/40 min-h-[60px] flex items-center justify-center gap-3 group border-2 border-orange-400/20",
  coral: "w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-deep-coral to-deep-coral/90 hover:from-deep-coral/90 hover:to-deep-coral text-white dark:text-gray-100 font-black text-lg sm:text-xl rounded-2xl shadow-2xl shadow-deep-coral/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl hover:shadow-deep-coral/40 min-h-[60px] flex items-center justify-center gap-3 group border-2 border-deep-coral/20",
} as const;

interface HeroContentProps {
  t: {
    hero: {
      headline?: string;
      subheadline?: string;
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
        freeShippingOver: string;
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
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    ))}
  </div>
);

const StarRating = ({ rating = 5 }: { rating?: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex text-yellow-400 dark:text-yellow-300 gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (star <= fullStars) {
          // Full star
          return (
            <svg key={`star-${star}`} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else if (star === fullStars + 1 && hasHalfStar) {
          // Half star
          return (
            <svg key={`star-${star}`} className="w-5 h-5" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half-star">
                  <stop offset="50%" stopColor="currentColor" className="text-yellow-400 dark:text-yellow-300" />
                  <stop offset="50%" stopColor="currentColor" className="text-gray-300 dark:text-gray-600" />
                </linearGradient>
              </defs>
              <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else {
          // Empty star
          return (
            <svg key={`star-${star}`} className="w-5 h-5 fill-current text-gray-300 dark:text-gray-600" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
      })}
    </div>
  );
};

export const HeroContent = ({ t }: HeroContentProps) => {
  // A/B Test: Homepage Hero Layout
  const {
    isVariant: isSimplifiedHero,
    trackConversion: trackHeroConversion,
  } = useABTestWithTracking(AB_TEST_SLUGS.HOMEPAGE_HERO);

  // A/B Test: CTA Button Color
  const {
    isVariant: isOrangeButton,
    trackConversion: trackCtaConversion,
  } = useABTestWithTracking(AB_TEST_SLUGS.CTA_BUTTON_COLOR);

  const handleScrollToProducts = useCallback(() => {
    // Track conversions for both tests when CTA is clicked
    trackHeroConversion();
    trackCtaConversion();
    scrollToSection("products");
  }, [trackHeroConversion, trackCtaConversion]);

  // Rotating testimonials - slowed down to 5 seconds for readability
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTestimonialIndex((prev) => (prev + 1) % heroTestimonials.length);
        setIsTransitioning(false);
      }, 300); // Fade out duration
    }, 2500); // Rotate every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = heroTestimonials[currentTestimonialIndex];

  // Use new simplified headline structure or fallback to existing
  const headline = t.hero.headline || t.hero.eliminateCatOdors;
  const subheadline = t.hero.subheadline || t.hero.instantly;

  // CTA Button classes based on A/B test
  const ctaButtonClasses = isOrangeButton
    ? CTA_BUTTON_VARIANTS.orange
    : CTA_BUTTON_VARIANTS.coral;

  // Simplified Hero Variant (A/B Test)
  if (isSimplifiedHero) {
    return (
      <div className="space-y-4 md:space-y-6 relative z-10">
        {/* Prominent Price Badge - text-white is OK here because bg is always green gradient */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white dark:text-gray-100 shadow-lg">
          <span className="text-2xl font-black">{t.hero.simplified?.free || "FREE"}</span>
          <span className="text-sm opacity-90">{t.hero.simplified?.justPayShipping || "Just pay $4.76 shipping"}</span>
        </div>

        {/* Simplified Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-gray-900 dark:text-white">
          <span className="block">{t.hero.simplified?.noMore || "No More"}</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            {t.hero.simplified?.litterBoxSmell || "Litter Box Smell"}
          </span>
        </h1>

        {/* Short value prop */}
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md">
          {t.hero.simplified?.valueProposition || "Activated carbon eliminates odors at the source. Works with any litter."}
        </p>

        {/* Large Pricing Display */}
        <div className="flex flex-wrap items-end gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.hero.simplified?.trialSize || "Trial Size"}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-green-600 dark:text-green-400">{t.hero.simplified?.free || "FREE"}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{t.hero.simplified?.plusSH || "+ S&H"}</span>
            </div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">{t.hero.simplified?.standard || "Standard"}</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">$14.99</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">{t.hero.simplified?.familyPack || "Family Pack"}</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">$24.99</div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <StarRating rating={5} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">4.9/5</span>
          </div>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{t.hero.simplified?.thirtyDayGuarantee || "30-Day Guarantee"}</span>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={handleScrollToProducts}
            className={ctaButtonClasses}
            aria-label={t.hero.buttons.tryFree || "Try Purrify free"}
          >
            <LightningIcon className="transition-transform duration-300 group-hover:scale-110" />
            {t.hero.simplified?.getFreeSample || "Get FREE Sample"}
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    );
  }

  // Control: Current Hero (with CTA color A/B test applied)
  return (
    <div className="space-y-3 md:space-y-4 relative z-10">
      {/* Social Proof Badge - Rotating Testimonials (slowed for readability) */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm mb-2 animate-fade-in-up transition-opacity duration-500"
        style={{ opacity: isTransitioning ? 0.3 : 1 }}
      >
        <StarRating rating={currentTestimonial.stars} />
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">
          &apos;{currentTestimonial.quote}&apos;
        </span>
      </div>

      {/* Simplified Headline - outcome-focused */}
      <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-gray-900 dark:text-white">
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          {headline}
        </span>
        <span className="block mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-medium text-electric-indigo">
          {subheadline}
        </span>
      </h1>

      {/* Shortened description */}
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
        {t.hero.description}
      </p>

      {/* Pricing Above Fold - All 3 price points */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full border border-green-300 dark:border-green-700">
          <span className="font-bold text-green-700 dark:text-green-300">
            {t.hero.pricing?.trial || "Trial: $4.76 S&H"}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {t.hero.pricing?.standard || "50g: $14.99"}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {t.hero.pricing?.family || "120g: $24.99"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <SocialProofAvatars />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-bold text-gray-900 dark:text-white block text-sm sm:text-base">
            {t.hero.socialProof.trustNumber}
          </span>
          <span className="text-xs sm:text-sm">{t.hero.socialProof.trustText}</span>
        </div>
      </div>

      {/* Urgency & Social Proof */}
      <div className="flex items-center sm:justify-start justify-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-600 dark:text-gray-400">{t.hero.simplified?.soldThisWeek || "87 sold this week"}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <svg className="w-4 h-4 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600 dark:text-gray-400">{t.hero.simplified?.limitedStock || "Limited winter stock"}</span>
        </div>
      </div>

      {/* Main CTA Button - with A/B tested color */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleScrollToProducts}
          className={ctaButtonClasses}
          aria-label={t.hero.buttons.tryFree || "Try Purrify free"}
        >
          <LightningIcon className="transition-transform duration-300 group-hover:scale-110" />
          {t.hero.buttons.tryFree || "Try FREE Sample"}
          <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Risk Reversal & Guarantee */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-start justify-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-700">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-bold text-green-700 dark:text-green-300">{t.hero.simplified?.moneyBackGuarantee || "30-Day Money-Back Guarantee"}</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-700">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{t.hero.simplified?.freeShippingOver || "Free Shipping Over $35"}</span>
        </div>
      </div>
    </div>
  );
};
