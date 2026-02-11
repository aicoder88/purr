export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Does Activated Carbon Work for Cat Litter? Proof | Purrify',
  description: 'Yes—here is the proof. Scientific evidence, real-world test results, and why activated carbon outperforms baking soda and fragrances.',
  keywords: [
    'does activated carbon work for cat litter',
    'activated carbon proof',
    'activated carbon vs baking soda',
    'carbon litter additive results'
  ],
  alternates: {
    canonical: '/learn/answers/does-activated-carbon-work-for-cat-litter',
  },
  openGraph: {
    title: 'Does Activated Carbon Work for Cat Litter? Proof | Purrify',
    description: 'Yes—here is the proof. Scientific evidence, real-world test results, and why activated carbon outperforms baking soda and fragrances.',
    url: `${SITE_URL}/learn/answers/does-activated-carbon-work-for-cat-litter`,
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Does Activated Carbon Work for Cat Litter?',
      },
    ],
  },
};

const relatedQuestions = [
  { slug: 'what-absorbs-cat-litter-odor', question: 'What absorbs cat litter odor?' },
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
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full mb-4">
            Evidence-Based Answer
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Does activated carbon work for cat litter?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 mt-4 text-sm">
            Last updated: February 2025 • Evidence review
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Clear YES answer */}
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-8 mb-8 text-center">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">Yes. Here is the proof.</h2>
            <p className="text-green-800 dark:text-green-300 text-lg">
              Activated carbon eliminates cat litter odor through adsorption—a physical process where ammonia molecules bind to carbon's porous surface. One gram has 1,000+ square meters of surface area. The same technology is used in water treatment plants, gas masks, and hospital air filtration systems.
            </p>
          </div>

          {/* Evidence breakdown */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              The Evidence Breakdown
            </h2>
            
            <div className="space-y-6">
              {/* Point 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold text-blue-700 dark:text-blue-400">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Industrial Use</h3>
                  <p className="text-gray-700 dark:text-gray-300">Municipal water treatment uses activated carbon to remove contaminants. If it works for drinking water, it works for cat litter.</p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold text-blue-700 dark:text-blue-400">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Surface Area Science</h3>
                  <p className="text-gray-700 dark:text-gray-300">One gram = 1,000+ m² surface area (size of 10 tennis courts). Ammonia molecules collide with and stick to this massive surface.</p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold text-blue-700 dark:text-blue-400">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Physical vs Chemical</h3>
                  <p className="text-gray-700 dark:text-gray-300">Carbon physically traps ammonia (adsorption), not a chemical reaction. This means it works until full, then you replace it.</p>
                </div>
              </div>
            </div>

            {/* Comparison table */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
              Activated Carbon vs. Alternatives
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="py-3 text-left">Method</th>
                    <th className="py-3 text-center">How It Works</th>
                    <th className="py-3 text-center">Effectiveness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="py-4 font-medium">Activated Carbon</td>
                    <td className="py-4 text-center text-sm">Traps ammonia molecules</td>
                    <td className="py-4 text-center"><span className="text-green-600 dark:text-green-400 font-bold">High ✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">Baking Soda</td>
                    <td className="py-4 text-center text-sm">Neutralizes acid (not ammonia)</td>
                    <td className="py-4 text-center"><span className="text-yellow-600 dark:text-yellow-400">Low</span></td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">Fragrance Sprays</td>
                    <td className="py-4 text-center text-sm">Masks odor temporarily</td>
                    <td className="py-4 text-center"><span className="text-red-600 dark:text-red-400">None</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Common skepticism addressed */}
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common concern: "I tried it and it didn't work"</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Usually means: (1) Not enough carbon used, (2) Carbon was already saturated, or (3) Expecting it to work without daily scooping. Carbon eliminates airborne ammonia—it does not remove physical waste.
              </p>
            </div>

            <div className="bg-[#1E4D6B] dark:bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white dark:text-white font-medium mb-4">
                Try it yourself with our risk-free trial.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white dark:text-white font-semibold rounded-full transition-colors"
              >
                Get Free Trial
              </Link>
              <p className="text-white dark:text-white/60 text-sm mt-2">
                Not satisfied? Full refund.
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 text-sm">
                <strong>Want the deep science?</strong> Read: <Link href="/learn/how-activated-carbon-works" className="text-[#1E4D6B] underline">How Does Activated Carbon Work? Complete Science Guide</Link>
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
              name: 'Does activated carbon work for cat litter?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Activated carbon eliminates cat litter odor through adsorption—a physical process where ammonia molecules bind to carbon porous surface. One gram has 1,000+ square meters of surface area. The same technology is used in water treatment plants, gas masks, and hospital air filtration systems.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
