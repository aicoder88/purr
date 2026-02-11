export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How Do I Stop My Cat Litter From Smelling? - Purrify',
  description: 'Stop cat litter odor permanently with science-backed methods. Learn why deodorizers fail and how activated carbon eliminates ammonia at molecular level.',
  keywords: [
    'how do i stop my cat litter from smelling',
    'stop cat litter odor',
    'prevent litter box smell',
    'cat litter odor solutions',
    'eliminate cat litter smell'
  ],
  alternates: {
    canonical: '/learn/answers/how-do-i-stop-my-cat-litter-from-smelling',
  },
  openGraph: {
    title: 'How Do I Stop My Cat Litter From Smelling? - Purrify',
    description: 'Stop cat litter odor permanently with these science-backed methods. Learn why most deodorizers fail and how activated carbon eliminates ammonia.',
    url: `${SITE_URL}/learn/answers/how-do-i-stop-my-cat-litter-from-smelling`,
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: 'How Do I Stop My Cat Litter From Smelling?',
      },
    ],
  },
};

const relatedQuestions = [
  { slug: 'how-do-i-keep-my-house-from-smelling-like-cat-litter', question: 'How do I keep my house from smelling like cat litter?' },
  { slug: 'how-to-eliminate-cat-litter-odor', question: 'How to eliminate cat litter odor?' },
  { slug: 'what-eliminates-cat-litter-odor', question: 'What eliminates cat litter odor?' },
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
          <span className="inline-block px-3 py-1 bg-[#F7A41D]/10 text-[#F7A41D] text-sm font-medium rounded-full mb-4">
            Odor Control
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            How do I stop my cat litter from smelling?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 mt-4 text-sm">
            Last updated: February 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg">
              To stop cat litter from smelling, you need to eliminate ammonia at the molecular level rather than masking it. Scoop waste daily to remove the source before ammonia forms. Use a high-quality clumping litter that isolates urine immediately. Add an activated carbon additive specifically designed to adsorb ammonia gases. The carbon's porous surface binds ammonia molecules, physically removing them from the air. Place the litter box in a well-ventilated area away from heat sources. Avoid scented products that only cover odors temporarily and can irritate your cat's sensitive nose. Wash the entire box with mild soap monthly to eliminate residual ammonia. This combined approach creates a genuinely odor-free environment.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Why baking soda and sprays do not work
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Most household solutions only mask odor temporarily. Baking soda has limited surface area and neutralizes acid, not ammonia. Sprays add fragrance that mixes with ammonia, creating an unpleasant chemical smell. Neither removes the root cause.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
              The science of activated carbon
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Activated carbon works through adsorption, where ammonia molecules bind to millions of microscopic pores. One gram has over 1,000 square meters of surface area. This is the same technology used in water filters and industrial air purification.
            </p>

            <div className="bg-[#1E4D6B] dark:bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white dark:text-white font-medium mb-4">
                Stop odor at the source with Purrify.
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
              name: 'How do I stop my cat litter from smelling?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'To stop cat litter from smelling, you need to eliminate ammonia at the molecular level rather than masking it. Scoop waste daily to remove the source before ammonia forms. Use a high-quality clumping litter that isolates urine immediately. Add an activated carbon additive specifically designed to adsorb ammonia gases. The carbon porous surface binds ammonia molecules, physically removing them from the air. Place the litter box in a well-ventilated area away from heat sources. Avoid scented products that only cover odors temporarily and can irritate your cat sensitive nose. Wash the entire box with mild soap monthly to eliminate residual ammonia. This combined approach creates a genuinely odor-free environment.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
