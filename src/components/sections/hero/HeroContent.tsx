import { useCallback, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import Link from "next/link";
import { GRADIENTS, COLORS, createButtonClasses } from "@/lib/theme-utils";

interface HeroContentProps {
  t: {
    hero: {
      eliminateCatOdors: string;
      instantly: string;
      description: string;
      socialProof: {
        trustNumber: string;
        trustText: string;
        ratingText: string;
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
      };
      ariaLabels: {
        reviews: string;
      };
    };
  };
  locale: string;
}

const SocialProofAvatars = () => (
  <div className="flex -space-x-3">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=b6e3f4`}
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
);

const StarRating = () => (
  <div className="flex text-yellow-400 dark:text-yellow-300 gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const PathCard = ({
  title,
  description,
  cta,
  href,
  icon,
  variant,
  onClick
}: {
  title: string;
  description: string;
  cta: string;
  href?: string;
  icon: ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}) => {
  const baseClasses = "relative overflow-hidden rounded-2xl p-6 transition-all duration-300 group border";
  const variantClasses = variant === 'primary'
    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-deep-coral/30 hover:shadow-xl hover:shadow-deep-coral/10"
    : "bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-electric-indigo/30 hover:shadow-xl hover:shadow-electric-indigo/10";

  const buttonClass = variant === 'primary'
    ? "w-full mt-4 bg-deep-coral hover:bg-deep-coral/90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-deep-coral/20 transition-all duration-300 transform group-hover:-translate-y-0.5 min-h-[44px] text-sm sm:text-base"
    : "w-full mt-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:border-electric-indigo hover:text-electric-indigo font-bold py-3 px-6 rounded-xl transition-all duration-300 min-h-[44px] text-sm sm:text-base";

  const content = (
    <div className={`${baseClasses} ${variantClasses}`}>
      <div className="flex items-start gap-4 mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${variant === 'primary' ? 'bg-deep-coral/10 text-deep-coral' : 'bg-electric-indigo/10 text-electric-indigo'}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white leading-tight mb-1">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
      {onClick ? (
        <Button onClick={onClick} className={buttonClass} aria-label={title}>
          {cta}
        </Button>
      ) : (
        <Button className={buttonClass} aria-label={title}>
          {cta}
        </Button>
      )}
    </div>
  );

  return href ? <Link href={href} className="block h-full">{content}</Link> : <div className="h-full">{content}</div>;
};

export const HeroContent = ({ t, locale }: HeroContentProps) => {
  const handleScrollToProducts = useCallback(() => {
    scrollToSection("products");
  }, []);

  const headlineRaw = t.hero.eliminateCatOdors;
  const emphasisPhrase = 'And Why Cat Owners Care';
  const emphasisIndex = headlineRaw.indexOf(emphasisPhrase);
  const hasEmphasis = emphasisIndex >= 0;
  const emphasisStart = hasEmphasis && emphasisIndex > 0 && headlineRaw[emphasisIndex - 1] === '('
    ? emphasisIndex - 1
    : emphasisIndex;
  const headlinePrimary = hasEmphasis
    ? headlineRaw.slice(0, emphasisStart).trimEnd()
    : headlineRaw;
  const emphasisLineText = hasEmphasis
    ? headlineRaw.slice(emphasisStart).trim()
    : '';
  const descriptionRaw = t.hero.description;
  const highlightSentence = 'One sprinkle eliminates litter box odor for 7 full days.';
  const highlightIndex = descriptionRaw.indexOf(highlightSentence);
  const hasHighlightSentence = highlightIndex >= 0;
  const descriptionBeforeHighlight = hasHighlightSentence
    ? descriptionRaw.slice(0, highlightIndex).trimEnd()
    : '';
  const descriptionAfterHighlight = hasHighlightSentence
    ? descriptionRaw.slice(highlightIndex + highlightSentence.length).trimStart()
    : '';

  return (
    <div className="space-y-8 relative z-10">
      {/* Social Proof Badge - Moved to top */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm mb-2 animate-fade-in-up">
        <StarRating />
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">
          {t.hero.socialProof.ratingText}
        </span>
      </div>

      <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-gray-900 dark:text-white">
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          {headlinePrimary}
        </span>
        {hasEmphasis && (
          <span className="block mt-2 text-2xl sm:text-3xl md:text-5xl font-bold text-deep-coral">
            {emphasisLineText}
          </span>
        )}
        <span className="block mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-medium text-electric-indigo">
          {t.hero.instantly}
        </span>
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed font-medium">
        {hasHighlightSentence ? (
          <>
            {descriptionBeforeHighlight && <span>{descriptionBeforeHighlight} </span>}
            <span className="text-gray-900 dark:text-white font-bold bg-deep-coral/10 px-1 rounded">
              {highlightSentence}
            </span>
            {descriptionAfterHighlight && <span> {descriptionAfterHighlight}</span>}
          </>
        ) : (
          descriptionRaw
        )}
      </p>

      <div className="flex items-center gap-3 sm:gap-4 py-2">
        <SocialProofAvatars />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-bold text-gray-900 dark:text-white block text-sm sm:text-base">
            {t.hero.socialProof.trustNumber}
          </span>
          <span className="text-xs sm:text-sm">{t.hero.socialProof.trustText}</span>
        </div>
      </div>

      {/* Urgency & Social Proof */}
      <div className="flex items-center justify-center gap-6 pt-4 pb-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-600 dark:text-gray-400">2,847 sold this week</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <svg className="w-4 h-4 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600 dark:text-gray-400">Limited winter stock</span>
        </div>
      </div>

      {/* Main CTA Button */}
      <div className="pt-2 pb-4">
        <Button
          onClick={handleScrollToProducts}
          className="w-full sm:w-auto px-10 py-7 bg-gradient-to-r from-deep-coral to-deep-coral/90 hover:from-deep-coral/90 hover:to-deep-coral text-white dark:text-gray-100 font-black text-xl sm:text-2xl rounded-2xl shadow-2xl shadow-deep-coral/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl hover:shadow-deep-coral/40 min-h-[72px] flex items-center justify-center gap-4 group border-2 border-deep-coral/20"
          aria-label="Stop embarrassing cat odors forever"
        >
          <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Stop Embarrassing Cat Odors Forever
          <svg className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </div>

      {/* Risk Reversal & Guarantee */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-700">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-bold text-green-700 dark:text-green-300">30-Day Money-Back Guarantee</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-700">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">Free Shipping Over $35</span>
        </div>
      </div>

      {/* Final Urgency Push */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <svg className="w-4 h-4 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Winter special ends soon - most customers order 3+ bottles</span>
      </div>
    </div>
  );
};
