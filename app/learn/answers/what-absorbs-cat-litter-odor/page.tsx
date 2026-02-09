export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What Absorbs Cat Litter Odor? - Purrify',
  description: 'Learn what materials actually absorb cat litter odor versus masking it. Discover activated carbon, zeolite, and other odor-absorbing solutions.',
  keywords: [
    'what absorbs cat litter odor',
    'cat litter odor absorber',
    'absorb cat litter smell',
    'odor absorbing materials',
    'cat litter deodorizer'
  ],
  alternates: {
    canonical: '/learn/answers/what-absorbs-cat-litter-odor',
  },
};

const relatedQuestions = [
  { slug: 'what-eliminates-cat-litter-odor', question: 'What eliminates cat litter odor?' },
  { slug: 'what-neutralizes-cat-litter-smell', question: 'What neutralizes cat litter smell?' },
  { slug: 'does-activated-carbon-work-for-cat-litter', question: 'Does activated carbon work for cat litter?' },
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
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full mb-4">
            Science
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            What absorbs cat litter odor?
          </h1>
          <p className="text-gray-500 mt-4 text-sm">
            Last updated: February 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 leading-relaxed text-lg">
              Activated carbon is the most effective material for absorbing cat litter odor. Made from coconut shells, wood, or coal, it has millions of microscopic pores that trap ammonia and other odor molecules through a process called adsorption. Zeolite, a natural volcanic mineral, also absorbs odors reasonably well but has less surface area than activated carbon. Baking soda absorbs some moisture but has minimal effect on ammonia gas. Charcoal briquettes can help in a pinch but are not food-safe and less effective than activated carbon designed for odor control. For best results, use activated carbon specifically manufactured for pet odor applications, as it has the optimal pore size for ammonia molecules.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Odor-absorbing materials ranked
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <span className="text-2xl">🥇</span>
                <div>
                  <h3 className="font-semibold text-green-800">Activated Carbon</h3>
                  <p className="text-green-700 text-sm">1000+ m²/g surface area. Binds ammonia permanently. Most effective option.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <span className="text-2xl">🥈</span>
                <div>
                  <h3 className="font-semibold text-blue-800">Zeolite</h3>
                  <p className="text-blue-700 text-sm">Natural mineral. Moderate absorption. Good for moisture and some odors.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                <span className="text-2xl">🥉</span>
                <div>
                  <h3 className="font-semibold text-yellow-800">Baking Soda</h3>
                  <p className="text-yellow-700 text-sm">Limited effect. Mostly masks odor. Not effective on ammonia.</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
              How absorption actually works
            </h2>
            <p className="text-gray-700 mb-4">
              True absorption requires porous materials with high surface area. A teaspoon of activated carbon has the surface area of a football field. Ammonia molecules collide with the carbon surface and become trapped in pores slightly larger than the molecules themselves. This physical bond holds them until the carbon is replaced.
            </p>

            <div className="bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white font-medium mb-4">
                Use the best odor absorber available.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white font-semibold rounded-full transition-colors"
              >
                Get Purrify
              </Link>
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
              name: 'What absorbs cat litter odor?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Activated carbon is the most effective material for absorbing cat litter odor. Made from coconut shells, wood, or coal, it has millions of microscopic pores that trap ammonia and other odor molecules through a process called adsorption. Zeolite, a natural volcanic mineral, also absorbs odors reasonably well but has less surface area than activated carbon. Baking soda absorbs some moisture but has minimal effect on ammonia gas. Charcoal briquettes can help in a pinch but are not food-safe and less effective than activated carbon designed for odor control. For best results, use activated carbon specifically manufactured for pet odor applications, as it has the optimal pore size for ammonia molecules.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
