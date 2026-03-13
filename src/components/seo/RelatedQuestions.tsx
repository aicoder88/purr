/**
 * RelatedQuestions Component
 *
 * FAQ-style accordion component for visible on-page questions.
 * Shared schema output is intentionally disabled so mixed-intent pages
 * do not emit FAQPage markup by default.
 *
 * Usage:
 * <RelatedQuestions
 *   title="Common Questions"
 *   questions={[
 *     { question: "How does activated carbon work?", answer: "..." },
 *     { question: "Is it safe for cats?", answer: "..." },
 *   ]}
 * />
 */

import { useState } from 'react';

export interface Question {
  question: string;
  answer: string;
}

export interface RelatedQuestionsProps {
  /** Section title */
  title?: string;
  /** Array of questions and answers */
  questions: Question[];
  /** Allow multiple questions open at once */
  allowMultiple?: boolean;
  /** Initially expanded question indices */
  defaultOpen?: number[];
  /** Deprecated: shared FAQPage schema output is disabled */
  includeSchema?: boolean;
  /** Custom className */
  className?: string;
}

export function RelatedQuestions({
  title = 'Frequently Asked Questions',
  questions,
  allowMultiple = true,
  defaultOpen = [0],
  className = '',
}: RelatedQuestionsProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set(defaultOpen));

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(index);
      }
      return next;
    });
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <>
      <section className={`related-questions ${className}`}>
        {title && (
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            {title}
          </h2>
        )}

        <div className="space-y-3">
          {questions.map((item, index) => {
            const isOpen = openItems.has(index);

            return (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-4 py-4 flex items-center justify-between text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 min-h-[48px]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100 pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="px-4 pb-4 pt-0 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">
                    <div className="pt-3">{item.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default RelatedQuestions;
