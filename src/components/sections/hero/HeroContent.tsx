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
  <div className="flex text-yellow-400 gap-0.5">
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
    ? "w-full mt-4 bg-deep-coral hover:bg-deep-coral/90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-deep-coral/20 transition-all duration-300 transform group-hover:-translate-y-0.5"
    : "w-full mt-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:border-electric-indigo hover:text-electric-indigo font-bold py-3 px-6 rounded-xl transition-all duration-300";

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

      <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-gray-900 dark:text-white">
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          {headlinePrimary}
        </span>
        {hasEmphasis && (
          <span className="block mt-2 text-3xl md:text-5xl font-bold text-deep-coral">
            {emphasisLineText}
          </span>
        )}
        <span className="block mt-4 text-2xl md:text-3xl font-medium text-electric-indigo">
          {t.hero.instantly}
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed font-medium">
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

      <div className="flex items-center gap-4 py-2">
        <SocialProofAvatars />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-bold text-gray-900 dark:text-white block text-base">
            {t.hero.socialProof.trustNumber}
          </span>
          {t.hero.socialProof.trustText}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <PathCard
          title={t.hero.dualPath?.consumer?.title || 'For Your Cat'}
          description={t.hero.dualPath?.consumer?.description || 'Instant checkout, direct delivery'}
          cta={t.hero.dualPath?.consumer?.cta || 'Shop Now'}
          variant="primary"
          onClick={handleScrollToProducts}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
        />

        <PathCard
          title={t.hero.dualPath?.retailer?.title || 'For Retailers'}
          description={t.hero.dualPath?.retailer?.description || 'Wholesale pricing & bulk orders'}
          cta={t.hero.dualPath?.retailer?.cta || 'Retailer Portal'}
          href={`${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}/retailers`}
          variant="secondary"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
      </div>
    </div>
  );
};
