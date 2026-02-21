/**
 * Trial CTA Component
 * Displays a call-to-action for the trial size product in blog posts
 * Links to /products/trial-size for conversion
 */

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface TrialCTAProps {
  /** Optional class name for styling */
  className?: string;
  /** Optional variant for different styling */
  variant?: 'default' | 'compact' | 'inline';
}

/**
 * Trial CTA component
 * Encourages blog readers to try the product with a compelling offer
 */
export function TrialCTA({ className = '', variant = 'default' }: TrialCTAProps) {
  const t = useTranslations();

  // Use nav.trialSize which is available in the translation type
  const trialSizeText = t('nav.trialSize') || 'FREE Trial (Just Pay S&H)';
  const tryFreeText = t('nav.tryFree') || 'Try Free';
  const readMoreText = t('relatedArticles.readMore') || 'Learn more';
  // Try to get product name from translations, fallback to default
  let trialImageAlt = 'Purrify Trial Size';
  try {
    const products = t.raw('products') as Record<string, any>;
    trialImageAlt = products?.['purrify-12g']?.name || 'Purrify Trial Size';
  } catch {
    trialImageAlt = 'Purrify Trial Size';
  }
  const limitedOfferText = 'Limited Time Offer';
  const trialDescription =
    'Experience the power of activated carbon odor control risk-free.';

  if (variant === 'inline') {
    return (
      <aside
        className={`my-8 p-4 bg-gradient-to-r from-[#03E46A]/10 to-[#5B2EFF]/10 dark:from-[#03E46A]/5 dark:to-[#5B2EFF]/5 border border-[#03E46A]/30 dark:border-[#03E46A]/20 rounded-lg ${className}`}
      >
        <Link
          href="/products/trial-size/"
          className="flex items-center justify-between group"
        >
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {trialSizeText}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {trialDescription}
            </p>
          </div>
          <span className="text-[#5B2EFF] dark:text-[#3694FF] font-medium text-sm group-hover:translate-x-1 transition-transform">
            {tryFreeText} →
          </span>
        </Link>
      </aside>
    );
  }

  if (variant === 'compact') {
    return (
      <aside
        className={`my-6 p-4 bg-white dark:bg-gray-800 border border-[#E0EFC7] dark:border-gray-700 rounded-xl shadow-sm ${className}`}
      >
        <Link
          href="/products/trial-size/"
          className="flex items-center gap-4 group"
        >
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src="/optimized/products/17g-transparent.webp"
              alt={trialImageAlt}
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] dark:group-hover:text-[#3694FF] transition-colors">
              {trialSizeText}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tryFreeText}
            </p>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-[#5B2EFF] dark:group-hover:text-[#3694FF] transition-colors flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </aside>
    );
  }

  // Default variant - full featured CTA
  return (
    <aside
      className={`my-12 overflow-hidden rounded-2xl bg-gradient-to-br from-[#03E46A]/10 via-white to-[#5B2EFF]/10 dark:from-[#03E46A]/5 dark:via-gray-800 dark:to-[#5B2EFF]/5 border border-[#E0EFC7] dark:border-gray-700 ${className}`}
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Image */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
            <Image
              src="/optimized/products/17g-transparent.webp"
              alt={trialImageAlt}
              fill
              className="object-contain drop-shadow-lg"
              sizes="(max-width: 768px) 128px, 160px"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-[#03E46A] bg-[#03E46A]/10 dark:bg-[#03E46A]/20 rounded-full mb-3">
              {limitedOfferText}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {trialSizeText}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-lg">
              {trialDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <Link
                href="/products/trial-size/"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100 font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                {tryFreeText}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {readMoreText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default TrialCTA;
