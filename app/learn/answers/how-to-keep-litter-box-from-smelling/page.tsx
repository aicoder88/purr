export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How Do I Keep My Litter Box From Smelling? Daily Routine | Purrify',
  description: 'Simple daily and weekly routines to keep your litter box fresh. Morning and evening tasks that prevent odor buildup.',
  keywords: [
    'how do i keep my litter box from smelling',
    'litter box daily routine',
    'prevent litter box odor',
    'litter box maintenance schedule'
  ],
  alternates: {
    canonical: '/learn/answers/how-to-keep-litter-box-from-smelling',
  },
};

const relatedQuestions = [
  { slug: 'how-often-should-i-change-cat-litter', question: 'How often should I change cat litter?' },
  { slug: 'how-do-i-stop-my-cat-litter-from-smelling', question: 'How do I stop my cat litter from smelling?' },
];

export default function QuestionPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-[#1E4D6B] py-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link 
            href="/learn/cat-litter-answers" 
            className="text-white/80 hover:text-white flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All Questions
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#F7A41D]/10 text-[#F7A41D] text-sm font-medium rounded-full mb-4">
            Daily Routine
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            How do I keep my litter box from smelling?
          </h1>
          <p className="text-gray-500 mt-4 text-sm">
            Last updated: February 2025 • Routine-based approach
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 leading-relaxed text-lg">
              Keep your litter box from smelling by following a simple two-part routine. Daily: Scoop waste every morning and evening (2 minutes each). Weekly: Completely change litter and wash the box with soap and water (15 minutes). The secret ingredient most people miss: add activated carbon additive to your litter—it eliminates odor molecules rather than just masking them. Place the box in a well-ventilated area, keep litter depth at 2-3 inches, and never let waste sit overnight. This routine takes less than 5 minutes per day but prevents odor from ever building up.
            </p>
          </div>

          {/* Daily vs Weekly split - Unique format */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Odor-Prevention Routine
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Daily Tasks */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="w-6 h-6 text-orange-500" />
                  <h3 className="font-bold text-orange-900">Daily Tasks</h3>
                  <span className="text-sm text-orange-600 ml-auto">~4 mins/day</span>
                </div>
                <ul className="space-y-3">
                  {[
                    { task: 'Morning scoop (2 min)', time: 'Before work' },
                    { task: 'Evening scoop (2 min)', time: 'Before bed' },
                    { task: 'Quick visual check', time: 'Anytime' },
                  ].map((item, i) => (
                    <li key={i} className="flex justify-between items-center py-2 border-b border-orange-200/50 last:border-0">
                      <span className="text-orange-900">{item.task}</span>
                      <span className="text-xs text-orange-600">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weekly Tasks */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Moon className="w-6 h-6 text-blue-500" />
                  <h3 className="font-bold text-blue-900">Weekly Tasks</h3>
                  <span className="text-sm text-blue-600 ml-auto">~15 mins/week</span>
                </div>
                <ul className="space-y-3">
                  {[
                    { task: 'Empty entire box', detail: 'Every 1-2 weeks' },
                    { task: 'Wash with soap', detail: 'Hot water, dry thoroughly' },
                    { task: 'Add fresh litter', detail: '2-3 inches depth' },
                    { task: 'Mix in carbon additive', detail: 'The odor eliminator' },
                  ].map((item, i) => (
                    <li key={i} className="py-2 border-b border-blue-200/50 last:border-0">
                      <span className="text-blue-900 font-medium">{item.task}</span>
                      <p className="text-xs text-blue-600">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The 2-3 inch rule */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">The 2-3 Inch Rule</h4>
              <p className="text-gray-700 text-sm">
                Too shallow (under 2 inches) and urine reaches the bottom, creating odor. Too deep (over 3 inches) and cats may avoid it. The Goldilocks zone is 2-3 inches for optimal odor control and cat comfort.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
              Why routines beat reactive cleaning
            </h2>
            <p className="text-gray-700 mb-4">
              Waiting until you smell odor means ammonia has already built up. By then, you are masking a problem rather than preventing it. The 2-minute daily scoops prevent ammonia from forming in the first place.
            </p>

            <div className="bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white font-medium mb-4">
                Add the secret ingredient to your weekly routine.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white font-semibold rounded-full transition-colors"
              >
                Get Purrify
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600 text-sm">
                <strong>Want the complete system?</strong> Read: <Link href="/blog/best-way-to-keep-litter-box-fresh" className="text-[#1E4D6B] underline">Best Way to Keep Litter Box Fresh: Complete Guide</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Related Questions
          </h3>
          <div className="space-y-3">
            {relatedQuestions.map((q) => (
              <Link
                key={q.slug}
                href={`/learn/answers/${q.slug}`}
                className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-[#1E4D6B] transition-colors"
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
              name: 'How do I keep my litter box from smelling?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Keep your litter box from smelling by following a simple two-part routine. Daily: Scoop waste every morning and evening (2 minutes each). Weekly: Completely change litter and wash the box with soap and water (15 minutes). Add activated carbon additive to eliminate odor molecules rather than just masking them. Place the box in a well-ventilated area, keep litter depth at 2-3 inches, and never let waste sit overnight.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
