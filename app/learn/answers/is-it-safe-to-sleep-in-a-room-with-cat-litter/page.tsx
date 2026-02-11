export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Is It Safe to Sleep in a Room With Cat Litter? - Purrify',
  description: 'Learn if sleeping near a litter box is safe and how to minimize any risks with proper odor control and ventilation.',
  keywords: [
    'is it safe to sleep in a room with cat litter',
    'sleep near litter box',
    'cat litter bedroom',
    'litter box in bedroom safe',
    'cat odor health'
  ],
  alternates: {
    canonical: '/learn/answers/is-it-safe-to-sleep-in-a-room-with-cat-litter',
  },
  openGraph: {
    title: 'Is It Safe to Sleep in a Room With Cat Litter? - Purrify',
    description: 'Learn if sleeping near a litter box is safe and how to minimize any risks with proper odor control and ventilation.',
    url: `${SITE_URL}/learn/answers/is-it-safe-to-sleep-in-a-room-with-cat-litter`,
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Is It Safe to Sleep in a Room With Cat Litter?',
      },
    ],
  },
};

const relatedQuestions = [
  { slug: 'is-cat-litter-smell-toxic', question: 'Is cat litter smell toxic?' },
  { slug: 'can-cat-litter-smell-make-you-sick', question: 'Can cat litter smell make you sick?' },
  { slug: 'how-do-i-keep-my-house-from-smelling-like-cat-litter', question: 'How do I keep my house from smelling like cat litter?' },
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
          <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full mb-4">
            Health
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Is it safe to sleep in a room with cat litter?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 mt-4 text-sm">
            Last updated: February 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg">
              Yes, it is generally safe to sleep in a room with a cat litter box if you maintain proper odor control and ventilation. The primary concern is ammonia buildup from urine, which can irritate respiratory passages in high concentrations. However, with daily scooping, quality clumping litter, and an activated carbon additive to eliminate ammonia at the source, risks are minimal. Ensure the room has adequate airflow by keeping a window slightly open or using a small air purifier. Pregnant women should avoid changing litter due to toxoplasmosis risk, but sleeping in the same room poses no danger if someone else handles cleaning. Keep the litter box as far from your bed as possible.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How to make it safer
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>Use activated carbon additive to eliminate ammonia</li>
              <li>Scoop waste every morning and evening</li>
              <li>Keep a window cracked or use a vent fan</li>
              <li>Position the box away from your bed</li>
              <li>Change litter completely every 1-2 weeks</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Who should avoid sleeping near litter boxes
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pregnant women should not handle cat litter due to toxoplasmosis risk, though sleeping in the same room is fine if ventilation is adequate. People with severe asthma or respiratory conditions may be more sensitive to any airborne particles.
            </p>

            <div className="bg-[#1E4D6B] dark:bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white dark:text-white font-medium mb-4">
                Sleep better with odor-free litter.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white dark:text-white font-semibold rounded-full transition-colors"
              >
                Get Free Trial
              </Link>
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
              name: 'Is it safe to sleep in a room with cat litter?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, it is generally safe to sleep in a room with a cat litter box if you maintain proper odor control and ventilation. The primary concern is ammonia buildup from urine, which can irritate respiratory passages in high concentrations. However, with daily scooping, quality clumping litter, and an activated carbon additive to eliminate ammonia at the source, risks are minimal. Ensure the room has adequate airflow by keeping a window slightly open or using a small air purifier. Pregnant women should avoid changing litter due to toxoplasmosis risk, but sleeping in the same room poses no danger if someone else handles cleaning. Keep the litter box as far from your bed as possible.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
