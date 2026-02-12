export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Eliminate Cat Litter Odor Fast | Action Guide | Purrify',
  description: 'Eliminate cat litter odor today with this 5-step action checklist. Quick fixes you can implement immediately for a fresher home.',
  keywords: [
    'how to eliminate cat litter odor',
    'eliminate cat litter smell fast',
    'quick cat odor fix',
    'litter box odor checklist'
  ],
  alternates: {
    canonical: '/learn/answers/how-to-eliminate-cat-litter-odor/',
  },
  openGraph: {
    title: 'Eliminate Cat Litter Odor Fast | Action Guide | Purrify',
    description: 'Eliminate cat litter odor today with this 5-step action checklist. Quick fixes you can implement immediately for a fresher home.',
    url: `${SITE_URL}/learn/answers/how-to-eliminate-cat-litter-odor`,
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Eliminate Cat Litter Odor Fast',
      },
    ],
  },
};

const relatedQuestions = [
  { slug: 'how-to-control-cat-litter-odor', question: 'How to control cat litter odor?' },
  { slug: 'what-eliminates-cat-litter-odor', question: 'What eliminates cat litter odor?' },
  { slug: 'how-do-i-stop-my-cat-litter-from-smelling', question: 'How do I stop my cat litter from smelling?' },
];

export default function QuestionPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <header className="bg-[#1E4D6B] dark:bg-[#1E4D6B] py-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link 
            href="/learn/cat-litter-answers" 
            className="text-white dark:text-white/80 dark:text-white dark:text-white/80 hover:text-white dark:text-white flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All Questions
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium rounded-full mb-4">
            Quick Action Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            How to eliminate cat litter odor
          </h1>
          <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 mt-4 text-sm">
            Last updated: February 2025 • 2 min read
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg">
              To eliminate cat litter odor today, follow this 5-step checklist: (1) Empty the box completely and wash with dish soap and hot water. (2) Dry thoroughly—moisture breeds bacteria. (3) Fill with 2-3 inches of quality clumping litter. (4) Mix in activated carbon additive—this is the key step that eliminates odor molecules rather than masking them. (5) Scoop waste daily without fail. For immediate room freshening, place a small air purifier with carbon filter near the box. This checklist addresses the root cause (ammonia) rather than temporarily covering smells.
            </p>
          </div>

          {/* Quick Checklist - Different format from blog */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Today's Action Checklist
            </h2>
            <div className="space-y-4">
              {[
                { step: 1, action: 'Empty and wash litter box with hot soapy water', time: '10 mins' },
                { step: 2, action: 'Dry completely (no moisture)', time: '15 mins' },
                { step: 3, action: 'Add 2-3 inches clumping litter', time: '2 mins' },
                { step: 4, action: 'Mix in activated carbon additive', time: '1 min', highlight: true },
                { step: 5, action: 'Set daily scooping reminder', time: '1 min' },
              ].map((item) => (
                <div 
                  key={item.step} 
                  className={`flex items-start gap-4 p-4 rounded-lg ${item.highlight ? 'bg-[#F7A41D]/10 border border-[#F7A41D]/30' : 'bg-gray-50 dark:bg-gray-800'}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${item.highlight ? 'bg-[#F7A41D] text-white dark:text-white' : 'bg-gray-200 text-gray-700 dark:text-gray-300'}`}>
                    {item.step}
                  </div>
                  <div className="flex-grow">
                    <p className={`font-medium ${item.highlight ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {item.action}
                      {item.highlight && <span className="ml-2 text-[#F7A41D] text-sm font-bold">← Most Important</span>}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500 flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>💡 Pro tip:</strong> Steps 1-4 are one-time setup. Step 5 (daily scooping) is what maintains the freshness long-term.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
              What makes this work
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Most odor solutions fail because they mask ammonia with fragrance. Activated carbon actually removes ammonia molecules through adsorption—physically trapping them in microscopic pores. This is why step 4 is critical.
            </p>

            <div className="bg-[#1E4D6B] dark:bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white dark:text-white font-medium mb-4">
                Get the key ingredient for step 4.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white dark:text-white font-semibold rounded-full transition-colors"
              >
                Get Activated Carbon
              </Link>
              <p className="text-white dark:text-white/60 text-sm mt-2">
                Free trial • Just pay shipping
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 text-sm">
                <strong>Want the deep dive?</strong> Read our complete guide: <Link href="/blog/how-to-eliminate-cat-litter-odor" className="text-[#1E4D6B] underline">How to Eliminate Cat Litter Odor: Complete Guide</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Related Questions
          </h3>
          <div className="space-y-3">
            {relatedQuestions.map((q) => (
              <Link
                key={q.slug}
                href={`/learn/answers/${q.slug}`}
                className="block p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#1E4D6B] transition-colors"
              >
                {q.question}
              </Link>
            ))}
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'QAPage',
            mainEntity: {
              '@type': 'Question',
              name: 'How to eliminate cat litter odor',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'To eliminate cat litter odor today, follow this 5-step checklist: (1) Empty the box completely and wash with dish soap and hot water. (2) Dry thoroughly. (3) Fill with 2-3 inches of quality clumping litter. (4) Mix in activated carbon additive—this eliminates odor molecules rather than masking them. (5) Scoop waste daily without fail. For immediate room freshening, place a small air purifier with carbon filter near the box.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
