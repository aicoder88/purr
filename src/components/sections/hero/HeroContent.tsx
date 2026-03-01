"use client";

import { Button } from "@/components/ui/button";
import { getPaymentLink } from "@/lib/payment-links";

function LightningIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

const CTA_BUTTON_CLASSES =
  "w-full sm:w-auto px-8 py-5 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-gray-50 dark:text-gray-900 font-semibold text-base sm:text-lg rounded-full shadow-sm transition-colors duration-200 min-h-[56px] flex items-center justify-center gap-2";

interface HeroContentProps {
  t: {
    madeInCanada: {
      badge: string;
    };
    hero: {
      headline?: string;
      subheadline?: string;
      eliminateCatOdors: string;
      instantly: string;
      description: string;
      socialProof: {
        trustText: string;
        ratingText: string;
      };
      buttons: {
        shopNow: string;
        tryFree?: string;
      };
      ariaLabels: {
        shopNow: string;
      };
      simplified?: {
        justPayShipping: string;
        valueProposition: string;
        thirtyDayGuarantee: string;
      };
    };
  };
  locale: string;
}

export const HeroContent = ({ t }: HeroContentProps) => {
  const headline = t.hero.headline || t.hero.eliminateCatOdors;
  const supportingCopy = t.hero.simplified?.valueProposition || t.hero.description || t.hero.instantly;
  const eyebrow = t.hero.simplified?.thirtyDayGuarantee || t.hero.socialProof.ratingText;
  const canadaBadge = t.madeInCanada.badge;
  const reassurance = t.hero.simplified?.justPayShipping || t.hero.socialProof.trustText;
  const primaryCta = t.hero.buttons.tryFree || t.hero.buttons.shopNow;

  return (
    <div className="flex flex-col justify-center space-y-6 md:space-y-7 py-2">
      <div className="flex flex-wrap items-center gap-2 self-start">
        <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 px-4 py-1.5 bg-gray-50 dark:bg-gray-900">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{eyebrow}</span>
        </div>
        <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 px-4 py-1.5 bg-gray-50 dark:bg-gray-900">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{canadaBadge}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-gray-900 dark:text-white">
          {headline}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
          {supportingCopy}
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-2 max-w-md">
        <Button asChild className={CTA_BUTTON_CLASSES} aria-label={t.hero.ariaLabels.shopNow}>
          <a href={getPaymentLink("trialSingle") || "#"} target="_blank" rel="noopener noreferrer">
            <LightningIcon />
            <span>{primaryCta}</span>
            <ArrowIcon />
          </a>
        </Button>
        <p className="text-sm text-gray-600 dark:text-gray-400">{reassurance}</p>
      </div>
    </div>
  );
};
