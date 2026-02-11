export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, Home, Cat } from 'lucide-react';

import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'What Cat Litter Controls Odor Best? Decision Guide | Purrify',
  description: 'Choose the best odor-control litter for your situation. Decision framework based on cats, home type, and maintenance preferences.',
  keywords: [
    'what cat litter controls odor best',
    'best odor control cat litter',
    'choose cat litter',
    'litter decision guide'
  ],
  alternates: {
    canonical: '/learn/answers/what-cat-litter-controls-odor-best',
  },
  openGraph: {
    title: 'What Cat Litter Controls Odor Best? Decision Guide | Purrify',
    description: 'Choose the best odor-control litter for your situation. Decision framework based on cats, home type, and maintenance preferences.',
    url: `${SITE_URL}/learn/answers/what-cat-litter-controls-odor-best`,
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: 'What Cat Litter Controls Odor Best?',
      },
    ],
  },
};

const relatedQuestions = [
  { slug: 'which-cat-litter-controls-odor-the-best', question: 'Which cat litter controls odor the best?' },
  { slug: 'what-cat-litter-smells-the-best', question: 'What cat litter smells the best?' },
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
          <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-4">
            Decision Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            What cat litter controls odor best?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 mt-4 text-sm">
            Last updated: February 2025 • Choose based on your situation
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg">
              The best odor-control litter depends on your specific situation. For most households, clumping clay litter with activated carbon additive provides the best results. For single-cat homes with daily scooping, crystal litter works well. For eco-conscious owners, natural litters with carbon supplements are effective. The key differentiator is not the base litter alone but whether you add activated carbon, which does the actual odor elimination. Match your litter choice to your household size, scooping frequency, and odor sensitivity.
            </p>
          </div>

          {/* Decision Framework */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Choose by Your Situation
            </h2>
            
            <div className="space-y-4">
              {/* Scenario 1 */}
              <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/200 rounded-full flex items-center justify-center">
                    <Cat className="w-5 h-5 text-white dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 dark:text-green-100">1-2 Cats, Daily Scooping</h3>
                    <p className="text-sm text-green-700 dark:text-green-400">Best overall choice</p>
                  </div>
                </div>
                <p className="text-green-800 dark:text-green-300 ml-13">
                  <strong>Clumping clay + activated carbon additive.</strong> The clumping isolates urine, carbon eliminates ammonia. Most cost-effective for regular maintenance.
                </p>
              </div>

              {/* Scenario 2 */}
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 dark:text-blue-100">3+ Cats (Multi-Cat)</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">Heavy odor load</p>
                  </div>
                </div>
                <p className="text-blue-800 dark:text-blue-300 ml-13">
                  <strong>Premium clumping clay + extra carbon.</strong> You need maximum absorption capacity. Consider multiple boxes. Change litter weekly.
                </p>
              </div>

              {/* Scenario 3 */}
              <div className="p-5 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 dark:border-orange-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/200 rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-white dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-900 dark:text-orange-100">Small Apartment</h3>
                    <p className="text-sm text-orange-700 dark:text-orange-300">Limited ventilation</p>
                  </div>
                </div>
                <p className="text-orange-800 dark:text-orange-200 ml-13">
                  <strong>Crystal litter or clumping with carbon + air purifier.</strong> Small spaces concentrate odors. You need maximum odor control plus air filtration.
                </p>
              </div>

              {/* Scenario 4 */}
              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/200 rounded-full flex items-center justify-center">
                    <span className="text-white dark:text-white font-bold">♻</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-teal-900 dark:text-teal-100">Eco-Conscious</h3>
                    <p className="text-sm text-teal-700 dark:text-teal-300">Natural preference</p>
                  </div>
                </div>
                <p className="text-teal-800 dark:text-teal-200 ml-13">
                  <strong>Natural litter (corn/wheat) + activated carbon.</strong> Look for sustainably sourced carbon. Avoid clay mining concerns.
                </p>
              </div>
            </div>

            {/* Key insight */}
            <div className="mt-6 p-4 bg-[#1E4D6B] dark:bg-[#1E4D6B] rounded-lg text-white dark:text-white">
              <h4 className="font-bold mb-2">Key Insight</h4>
              <p className="text-white dark:text-white/90">
                The litter type matters less than the <strong>activated carbon additive</strong>. Carbon does the actual odor elimination. Without it, you are just masking smells.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
              What to avoid
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-red-800 dark:text-red-300 text-sm"><strong>❌ Scented litters</strong> — Mask odor, irritate cats</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-red-800 dark:text-red-300 text-sm"><strong>❌ Baking soda only</strong> — Does not work on ammonia</p>
              </div>
            </div>

            <div className="bg-[#1E4D6B] dark:bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white dark:text-white font-medium mb-4">
                Get the odor-elimination upgrade for any litter.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white dark:text-white font-semibold rounded-full transition-colors"
              >
                Shop Purrify
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 text-sm">
                <strong>Want product comparisons?</strong> Read our reviews: <Link href="/blog/best-cat-litter-for-smell" className="text-[#1E4D6B] underline">Best Cat Litter for Smell: Honest Reviews</Link>
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
              name: 'What cat litter controls odor best?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The best odor-control litter depends on your specific situation. For most households, clumping clay litter with activated carbon additive provides the best results. For single-cat homes with daily scooping, crystal litter works well. For eco-conscious owners, natural litters with carbon supplements are effective. The key differentiator is not the base litter alone but whether you add activated carbon, which does the actual odor elimination.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
