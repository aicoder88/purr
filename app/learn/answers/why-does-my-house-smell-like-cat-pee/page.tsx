export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Does My House Smell Like Cat Pee? - Purrify',
  description: 'Discover why cat urine odor lingers in your home and the science-backed solutions to eliminate it permanently. Stop masking, start removing.',
  keywords: [
    'why does my house smell like cat pee',
    'cat urine smell in house',
    'remove cat pee odor',
    'cat ammonia smell',
    'house smells like cat urine',
  ],
  alternates: {
    canonical: '/learn/answers/why-does-my-house-smell-like-cat-pee',
  },
};

const relatedQuestions = [
  { slug: 'how-to-keep-litter-box-from-smelling', question: 'How do I keep my litter box from smelling?' },
  { slug: 'does-activated-carbon-work-for-cat-litter', question: 'Does activated carbon work?' },
  { slug: 'how-to-get-rid-of-cat-odor-in-small-space', question: 'How do I remove odor in apartments?' },
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
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full mb-4">
            Problems
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Why does my house smell like cat pee?
          </h1>
          <p className="text-gray-500 mt-4 text-sm">
            Last updated: February 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 leading-relaxed text-lg">
              Your house smells like cat pee because of ammonia, a compound in urine that becomes concentrated as it breaks down. Standard cat litter does not neutralize ammonia; it merely absorbs liquid. Over time, ammonia gas escapes into the air, permeating fabrics, walls, and carpets. Heat and humidity accelerate this process. If your cat has had accidents outside the box, urine crystals may remain in flooring or furniture, releasing odor continuously. Baking soda and air fresheners only mask the smell temporarily. The only effective solution is to neutralize ammonia at the molecular level using activated carbon or enzymatic cleaners that break down the compounds causing odor.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Common sources of lingering odor
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Urine crystals in litter:</strong> Even scooping leaves microscopic residue that releases ammonia.</li>
              <li><strong>Accidents outside the box:</strong> Carpets, baseboards, and grout absorb urine deeply.</li>
              <li><strong>Poor ventilation:</strong> Closed windows trap ammonia gas indoors.</li>
              <li><strong>Old litter boxes:</strong> Plastic absorbs odors over time and should be replaced annually.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How to eliminate the smell permanently
            </h2>
            <p className="text-gray-700 mb-4">
              Start with a deep clean. Replace the litter box if it is over a year old. Use an enzymatic cleaner on any accident spots. Add activated carbon to fresh litter to prevent future ammonia release. Increase ventilation in the litter box area.
            </p>

            <div className="bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white font-medium mb-4">
                Eliminate odor at the source. Try Purrify.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white font-semibold rounded-full transition-colors"
              >
                Get Free Trial
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
              name: 'Why does my house smell like cat pee?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Your house smells like cat pee because of ammonia, a compound in urine that becomes concentrated as it breaks down. Standard cat litter does not neutralize ammonia; it merely absorbs liquid. Over time, ammonia gas escapes into the air, permeating fabrics, walls, and carpets. Heat and humidity accelerate this process. If your cat has had accidents outside the box, urine crystals may remain in flooring or furniture, releasing odor continuously. Baking soda and air fresheners only mask the smell temporarily. The only effective solution is to neutralize ammonia at the molecular level using activated carbon or enzymatic cleaners that break down the compounds causing odor.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
