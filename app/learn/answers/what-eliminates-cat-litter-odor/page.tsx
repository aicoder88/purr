export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'What Eliminates Cat Litter Odor? - Purrify',
  description: 'Discover what truly eliminates cat litter odor versus what merely masks it. Learn about activated carbon, enzymatic cleaners, and science-backed solutions.',
  keywords: [
    'what eliminates cat litter odor',
    'cat litter odor eliminator',
    'remove cat litter smell',
    'cat odor elimination',
    'best cat litter deodorizer'
  ],
  alternates: {
    canonical: '/learn/answers/what-eliminates-cat-litter-odor/',
  },
  openGraph: {
    title: 'What Eliminates Cat Litter Odor? - Purrify',
    description: 'Discover what truly eliminates cat litter odor versus what merely masks it. Learn about activated carbon and science-backed solutions.',
    url: `${SITE_URL}/learn/answers/what-eliminates-cat-litter-odor`,
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: 'What Eliminates Cat Litter Odor?',
      },
    ],
  },
};

const relatedQuestions = [
  { slug: 'what-absorbs-cat-litter-odor', question: 'What absorbs cat litter odor?' },
  { slug: 'what-neutralizes-cat-litter-smell', question: 'What neutralizes cat litter smell?' },
  { slug: 'how-to-eliminate-cat-litter-odor', question: 'How to eliminate cat litter odor?' },
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
            Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            What eliminates cat litter odor?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 mt-4 text-sm">
            Last updated: February 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg">
              Activated carbon is the most effective substance for eliminating cat litter odor. It works through adsorption, binding ammonia and other odor molecules to its porous surface. One gram of activated carbon contains over 1,000 square meters of surface area, creating massive capacity for trapping gases. Unlike baking soda which only masks odors temporarily, activated carbon physically removes them from the air. Enzymatic cleaners are also effective for eliminating odors from accidents outside the box, as they break down the organic compounds causing smell. For ongoing litter box maintenance, activated carbon additives mixed into litter provide continuous odor elimination for up to a week per application.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              What works vs what does not
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">✅ Actually Eliminates Odor</h3>
                <ul className="text-green-700 dark:text-green-400 text-sm space-y-1">
                  <li>Activated carbon additives</li>
                  <li>Enzymatic cleaners</li>
                  <li>Clumping litter (isolates waste)</li>
                  <li>Proper ventilation</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">❌ Only Masks Temporarily</h3>
                <ul className="text-red-700 dark:text-red-400 text-sm space-y-1">
                  <li>Baking soda</li>
                  <li>Fragrance sprays</li>
                  <li>Scented litter</li>
                  <li>Air fresheners</li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
              How activated carbon eliminates odor
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ammonia molecules are attracted to the carbons surface and become trapped in microscopic pores. This is called adsorption. The process is so effective that the same technology is used in water treatment plants, gas masks, and industrial air purification systems.
            </p>

            <div className="bg-[#1E4D6B] dark:bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white dark:text-white font-medium mb-4">
                Eliminate odor for good with Purrify.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white dark:text-white font-semibold rounded-full transition-colors"
              >
                Get Free Trial
              </Link>
              <p className="text-white dark:text-white/60 text-sm mt-2">
                Just pay $4.76 shipping
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
              name: 'What eliminates cat litter odor?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Activated carbon is the most effective substance for eliminating cat litter odor. It works through adsorption, binding ammonia and other odor molecules to its porous surface. One gram of activated carbon contains over 1,000 square meters of surface area, creating massive capacity for trapping gases. Unlike baking soda which only masks odors temporarily, activated carbon physically removes them from the air. Enzymatic cleaners are also effective for eliminating odors from accidents outside the box, as they break down the organic compounds causing smell. For ongoing litter box maintenance, activated carbon additives mixed into litter provide continuous odor elimination for up to a week per application.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
