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
  <div className="flex -space-x-2">
    <div className="w-10 h-10 rounded-full bg-purple-500 dark:bg-purple-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white dark:text-white text-sm font-bold">
      MJ
    </div>
    <div className="w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white dark:text-white text-sm font-bold">
      SK
    </div>
    <div className="w-10 h-10 rounded-full bg-green-500 dark:bg-green-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white dark:text-white text-sm font-bold">
      TC
    </div>
  </div>
);

const StarRating = () => (
  <div className="flex text-yellow-500 dark:text-yellow-300">
    ★★★★★
  </div>
);

const PathCard = ({
  title,
  description,
  cta,
  href,
  icon,
  colorScheme,
  onClick
}: {
  title: string;
  description: string;
  cta: string;
  href?: string;
  icon: React.ReactNode;
  colorScheme: 'red' | 'purple';
  onClick?: () => void;
}) => {
  const bgClass = colorScheme === 'red'
    ? 'bg-gradient-to-br from-[#FF3131]/5 to-[#FF5050]/10 dark:from-[#FF5050]/10 dark:to-[#FF3131]/5'
    : 'bg-gradient-to-br from-[#5B2EFF]/5 to-[#3694FF]/10 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/5';

  const borderClass = colorScheme === 'red'
    ? 'border-[#FF3131]/20 dark:border-[#FF5050]/30 hover:border-[#FF3131]/40 dark:hover:border-[#FF5050]/50'
    : 'border-[#5B2EFF]/20 dark:border-[#3694FF]/30 hover:border-[#5B2EFF]/40 dark:hover:border-[#3694FF]/50';

  const buttonClass = colorScheme === 'red'
    ? createButtonClasses('primary')
    : 'w-full bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 border-0 transform group-hover:-translate-y-0.5';

  const content = (
    <div className={`${bgClass} border-2 ${borderClass} rounded-xl p-6 transition-all duration-300 hover:shadow-lg group`}>
      <div className="flex items-center mb-3">
        <div className={`w-8 h-8 ${colorScheme === 'red' ? 'bg-[#FF3131]/10 dark:bg-[#FF5050]/20' : 'bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20'} rounded-lg flex items-center justify-center mr-3`}>
          {icon}
        </div>
        <h3 className={`font-bold text-lg ${COLORS.text.primary}`}>{title}</h3>
      </div>
      <p className={`text-sm ${COLORS.text.tertiary} mb-4`}>{description}</p>
      {onClick ? (
        <Button
          onClick={onClick}
          className={buttonClass}
          aria-label={title}
        >
          {cta}
        </Button>
      ) : (
        <Button
          className={buttonClass}
          aria-label={title}
        >
          {cta}
        </Button>
      )}
    </div>
  );

  return href ? (
    <Link href={href}>
      {content}
    </Link>
  ) : content;
};

export const HeroContent = ({ t, locale }: HeroContentProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-center">
        <span className={`block ${GRADIENTS.text.primary} ${GRADIENTS.text.primaryDark} [text-shadow:0_0_16px_rgba(0,0,0,0.1)] dark:[text-shadow:0_0_16px_rgba(255,255,255,0.1)]`}>
          {t.hero.eliminateCatOdors}
        </span>
        <span
          className={`block text-2xl md:text-3xl font-medium ${COLORS.text.primary}`}
          style={{
            lineHeight: "1.3"
          }}
        >
          {t.hero.instantly}
        </span>
      </h1>

      <p className={`text-xl ${COLORS.text.secondary} mb-8 max-w-2xl`}>
        {t.hero.description}
      </p>

      {/* Social Proof Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="flex items-center gap-4">
          <SocialProofAvatars />
          <div className={`text-sm ${COLORS.text.tertiary}`}>
            <span className={`font-semibold ${COLORS.text.primary}`}>{t.hero.socialProof.trustNumber}</span>
            <br />{t.hero.socialProof.trustText}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <StarRating />
          <span className={`text-sm ${COLORS.text.tertiary} ml-2`}>
            {t.hero.socialProof.ratingText}
          </span>
        </div>
      </div>

      {/* Dual Path CTA Section */}
      <div className="space-y-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PathCard
            title={t.hero.dualPath?.consumer?.title || 'For Your Cat'}
            description={t.hero.dualPath?.consumer?.description || 'Individual cat owners - instant checkout, direct delivery'}
            cta={t.hero.dualPath?.consumer?.cta || 'Buy Now for Your Cat'}
            colorScheme="red"
            onClick={() => scrollToSection("products")}
            icon={
              <svg className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
          />

          <PathCard
            title={t.hero.dualPath?.retailer?.title || 'Pet Stores & Retailers'}
            description={t.hero.dualPath?.retailer?.description || 'Wholesale pricing, bulk orders, marketing support'}
            cta={t.hero.dualPath?.retailer?.cta || 'Wholesale Portal'}
            href={`${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}/retailers`}
            colorScheme="purple"
            icon={
              <svg className="w-5 h-5 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => scrollToSection("testimonials")}
            size="lg"
            variant="outline"
            className={createButtonClasses('outline')}
            aria-label={t.hero.ariaLabels.reviews}
          >
            {t.hero.buttons.reviews}
          </Button>
          <Button
            onClick={() => scrollToSection("how-it-works")}
            size="lg"
            variant="ghost"
            className={`${COLORS.text.primary} font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 active:scale-95 transform hover:-translate-y-1`}
            aria-label="Learn how Purrify works"
          >
            {t.hero.buttons.learnMore || 'How It Works'}
          </Button>
        </div>
      </div>
    </div>
  );
};