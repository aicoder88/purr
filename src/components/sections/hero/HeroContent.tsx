"use client";

import { Button } from "@/components/ui/button";
import { getPaymentLink } from "@/lib/payment-links";
import Link from "next/link";

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

function TrustBadgeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-3.5 w-3.5 ${className}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 1.5 3.5 4.2v5.6c0 4.2 2.8 7.9 6.5 8.9 3.7-1 6.5-4.7 6.5-8.9V4.2L10 1.5Zm3.1 6.2a.75.75 0 1 0-1.2-.9L9.2 10.4 8.1 9.3a.75.75 0 0 0-1.1 1.1l1.7 1.7a.75.75 0 0 0 1.1-.1l3.3-4.3Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const CTA_BUTTON_CLASSES =
  "w-full sm:w-auto px-8 py-5 bg-brand-red-600 hover:bg-brand-red-700 text-white dark:text-gray-100 font-semibold text-base sm:text-lg rounded-full shadow-sm transition-all duration-200 min-h-[56px] flex items-center justify-center gap-2";

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
        trustNumber?: string;
        trustText: string;
        ratingText: string;
        retailerQuote?: string;
      };
      buttons: {
        shopNow: string;
        tryFree?: string;
        learnMore?: string;
      };
      ariaLabels: {
        shopNow: string;
      };
      simplified?: {
        justPayShipping: string;
        valueProposition: string;
        thirtyDayGuarantee: string;
        moneyBackGuarantee?: string;
      };
    };
  };
}

export const HeroContent = ({ t }: HeroContentProps) => {
  const headline = t.hero.headline || t.hero.eliminateCatOdors;
  const supportingCopy = t.hero.simplified?.valueProposition || t.hero.description || t.hero.instantly;
  const eyebrow = t.hero.simplified?.thirtyDayGuarantee || t.hero.socialProof.ratingText;
  const canadaBadge = t.madeInCanada.badge;
  const reassurance = t.hero.simplified?.justPayShipping || t.hero.socialProof.trustText;
  const primaryCta = t.hero.buttons.tryFree || t.hero.buttons.shopNow;
  const secondaryCta = t.hero.buttons.learnMore;

  return (
    <div className="flex flex-col justify-center space-y-6 md:space-y-7 py-2">
      <div className="flex flex-wrap items-center gap-2 self-start">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-pink/30 px-4 py-1.5 bg-gradient-to-r from-brand-yellow/25 via-brand-pink/25 to-brand-pink/25">
          <TrustBadgeIcon className="text-emerald-600 dark:text-emerald-300" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{eyebrow}</span>
        </div>
        <div className="inline-flex items-center rounded-full border border-brand-pink/30 px-4 py-1.5 bg-gradient-to-r from-brand-yellow/25 via-brand-pink/25 to-brand-pink/25">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{canadaBadge}</span>
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

      <div className="flex flex-col gap-3 pt-2 max-w-xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className={CTA_BUTTON_CLASSES} aria-label={t.hero.ariaLabels.shopNow}>
            <a href={getPaymentLink("trialSingle") || "#"} className="flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-2">
                <LightningIcon />
                <span>{primaryCta}</span>
                <ArrowIcon />
              </span>
              {reassurance && (
                <span className="text-[0.65rem] font-normal opacity-75 leading-none">{reassurance}</span>
              )}
            </a>
          </Button>
          {secondaryCta ? (
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto px-6 py-5 border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-100 font-semibold text-base rounded-full min-h-[56px]"
            >
              <Link href="#how-it-works">
                {secondaryCta}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
