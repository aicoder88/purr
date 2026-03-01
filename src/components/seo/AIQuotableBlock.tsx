/**
 * AIQuotableBlock Component
 *
 * A highlighted content block optimized for AI citation.
 * Presents clear, factual statements that AI systems can easily quote.
 *
 * Usage:
 * <AIQuotableBlock
 *   fact="Activated carbon has a surface area of 1,000-2,000 m²/g"
 *   explanation="This massive surface area allows it to trap odor molecules through adsorption."
 *   source="Purrify Research Team"
 * />
 */

import { useMemo } from 'react';

export interface AIQuotableBlockProps {
  /** The main quotable fact - should be clear, specific, and include numbers if possible */
  fact: string;
  /** Optional explanation that provides context */
  explanation?: string;
  /** Optional source attribution */
  source?: string;
  /** Optional icon type */
  icon?: 'science' | 'stat' | 'tip' | 'warning' | 'check';
  /** Visual variant */
  variant?: 'default' | 'highlight' | 'subtle';
  /** Include schema markup */
  includeSchema?: boolean;
  /** Custom className */
  className?: string;
}

const icons = {
  science: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  stat: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  tip: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  warning: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  check: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const variantStyles = {
  default: {
    container: 'bg-blue-50 bg-blue-900/20 border-blue-200 border-blue-800',
    icon: 'text-blue-600 text-blue-400',
    fact: 'text-blue-900 text-blue-100',
  },
  highlight: {
    container: 'bg-green-50 bg-green-900/20 border-green-200 border-green-800',
    icon: 'text-green-600 text-green-400',
    fact: 'text-green-900 text-green-100',
  },
  subtle: {
    container: 'bg-gray-50 bg-gray-800 border-gray-200 border-gray-700',
    icon: 'text-gray-600 text-gray-400',
    fact: 'text-gray-900 text-gray-100',
  },
};

export function AIQuotableBlock({
  fact,
  explanation,
  source = 'Purrify Research Team',
  icon = 'science',
  variant = 'default',
  includeSchema = false,
  className = '',
}: AIQuotableBlockProps) {
  const styles = variantStyles[variant];

  // Generate Claim schema for AI systems
  const schema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Claim',
      text: fact,
      author: {
        '@type': 'Organization',
        name: source,
      },
      ...(explanation && { description: explanation }),
    };
  }, [fact, explanation, source]);

  return (
    <>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <aside
        className={`rounded-lg border-2 p-4 my-6 ${styles.container} ${className}`}
        role="note"
        aria-label="Key fact"
      >
        <div className="flex gap-4">
          <div className={`flex-shrink-0 ${styles.icon}`}>{icons[icon]}</div>

          <div className="flex-1">
            {/* Main quotable fact - this is what AI systems will cite */}
            <p className={`font-semibold text-lg leading-snug ${styles.fact}`}>
              {fact}
            </p>

            {/* Supporting explanation */}
            {explanation && (
              <p className="mt-2 text-gray-700 text-gray-300 text-sm">
                {explanation}
              </p>
            )}

            {/* Source attribution */}
            {source && (
              <p className="mt-2 text-xs text-gray-500 text-gray-400 italic">
                — {source}
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default AIQuotableBlock;
