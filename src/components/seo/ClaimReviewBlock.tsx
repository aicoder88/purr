/**
 * ClaimReviewBlock Component
 *
 * Displays a fact-checked claim with ClaimReview schema markup.
 * Ideal for comparison content where you're evaluating competitor claims.
 *
 * Usage:
 * <ClaimReviewBlock
 *   claim="Baking soda eliminates cat litter odor"
 *   rating={2}
 *   verdict="Mostly False"
 *   explanation="Baking soda and ammonia are both alkaline, so baking soda cannot neutralize ammonia."
 * />
 */

import React, { useMemo } from 'react';

export type ClaimRating = 1 | 2 | 3 | 4 | 5;

export interface ClaimReviewBlockProps {
  /** The claim being reviewed */
  claim: string;
  /** Rating: 1=False, 2=Mostly False, 3=Mixed, 4=Mostly True, 5=True */
  rating: ClaimRating;
  /** Human-readable verdict (auto-generated if not provided) */
  verdict?: string;
  /** Explanation of why the rating was given */
  explanation: string;
  /** Who made the original claim (optional) */
  claimSource?: string;
  /** Evidence supporting the rating */
  evidence?: string[];
  /** URL of the page for schema */
  url?: string;
  /** Include JSON-LD schema */
  includeSchema?: boolean;
  /** Custom className */
  className?: string;
}

const ratingLabels: Record<ClaimRating, string> = {
  1: 'False',
  2: 'Mostly False',
  3: 'Mixed',
  4: 'Mostly True',
  5: 'True',
};

const ratingColors: Record<ClaimRating, { bg: string; text: string; border: string }> = {
  1: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-200',
    border: 'border-red-300 dark:border-red-700',
  },
  2: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-800 dark:text-orange-200',
    border: 'border-orange-300 dark:border-orange-700',
  },
  3: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-200',
    border: 'border-yellow-300 dark:border-yellow-700',
  },
  4: {
    bg: 'bg-lime-100 dark:bg-lime-900/30',
    text: 'text-lime-800 dark:text-lime-200',
    border: 'border-lime-300 dark:border-lime-700',
  },
  5: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-200',
    border: 'border-green-300 dark:border-green-700',
  },
};

const ratingIcons: Record<ClaimRating, React.ReactNode> = {
  1: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  2: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  3: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  4: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  5: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
};

export function ClaimReviewBlock({
  claim,
  rating,
  verdict,
  explanation,
  claimSource,
  evidence,
  url,
  includeSchema = true,
  className = '',
}: ClaimReviewBlockProps) {
  const colors = ratingColors[rating];
  const displayVerdict = verdict || ratingLabels[rating];

  // Generate ClaimReview schema
  const schema = useMemo(() => {
    const schemaObj: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'ClaimReview',
      claimReviewed: claim,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rating,
        bestRating: 5,
        worstRating: 1,
        alternateName: displayVerdict,
      },
      author: {
        '@type': 'Organization',
        name: 'Purrify',
        url: 'https://www.purrify.ca',
      },
      datePublished: new Date().toISOString().split('T')[0],
    };

    if (url) {
      schemaObj.url = url;
    }

    if (claimSource) {
      schemaObj.itemReviewed = {
        '@type': 'Claim',
        author: {
          '@type': 'Organization',
          name: claimSource,
        },
      };
    }

    return schemaObj;
  }, [claim, rating, displayVerdict, url, claimSource]);

  return (
    <>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <div
        className={`rounded-lg border-2 overflow-hidden my-6 ${colors.border} ${className}`}
        role="article"
        aria-label={`Claim review: ${claim}`}
      >
        {/* Header with verdict */}
        <div className={`px-4 py-3 flex items-center gap-3 ${colors.bg}`}>
          <span className={colors.text}>{ratingIcons[rating]}</span>
          <span className={`font-bold text-lg ${colors.text}`}>{displayVerdict}</span>
        </div>

        {/* Content */}
        <div className="p-4 bg-white dark:bg-gray-900">
          {/* The claim */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              Claim
            </p>
            <blockquote className="text-lg font-medium text-gray-900 dark:text-gray-100 border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic">
              &ldquo;{claim}&rdquo;
            </blockquote>
            {claimSource && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                — {claimSource}
              </p>
            )}
          </div>

          {/* Explanation */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              Our Analysis
            </p>
            <p className="text-gray-700 dark:text-gray-300">{explanation}</p>
          </div>

          {/* Evidence list */}
          {evidence && evidence.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Supporting Evidence
              </p>
              <ul className="space-y-1">
                {evidence.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 text-green-500 dark:text-green-400 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ClaimReviewBlock;
