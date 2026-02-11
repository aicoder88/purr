export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Stop House Smelling Like Cat Litter | Purrify',
  description: 'Keep your entire home fresh with these proven strategies to prevent cat litter odor from spreading. Learn ventilation tips and odor elimination methods.',
  keywords: [
    'how do i keep my house from smelling like cat litter',
    'house smells like cat litter',
    'prevent cat litter smell in house',
    'stop litter odor spreading',
    'home odor control'
  ],
  alternates: {
    canonical: '/learn/answers/how-do-i-keep-my-house-from-smelling-like-cat-litter',
  },
  openGraph: {
    title: 'Stop House Smelling Like Cat Litter | Purrify',
    description: 'Keep your entire home fresh with these proven strategies to prevent cat litter odor from spreading.',
    url: `${SITE_URL}/learn/answers/how-do-i-keep-my-house-from-smelling-like-cat-litter`,
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Stop House Smelling Like Cat Litter',
      },
    ],
  },
};

const relatedQuestions = [
  { slug: 'how-do-i-stop-my-cat-litter-from-smelling', question: 'How do I stop my cat litter from smelling?' },
  { slug: 'how-to-eliminate-cat-litter-odor', question: 'How to eliminate cat litter odor?' },
  { slug: 'how-to-remove-cat-litter-smell-from-room', question: 'How to remove cat litter smell from room?' },
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
          <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full mb-4">
            Home Care
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            How do I keep my house from smelling like cat litter?
          </h1>
          <p className="text-gray-500 mt-4 text-sm">
            Last updated: February 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 leading-relaxed text-lg">
              To keep your house from smelling like cat litter, start by eliminating odor at the source. Use an activated carbon additive in the litter box to adsorb ammonia before it escapes. Place the litter box in a low-traffic area with good airflow, such as a bathroom with a vent fan or near a window. Use an air purifier with a carbon filter in the room. Scoop waste daily and change litter completely every two weeks. Seal soiled litter in airtight bags before disposal. Vacuum and mop regularly around the box area. For existing odors, wipe down walls and baseboards with an enzymatic cleaner that breaks down ammonia compounds.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Strategic litter box placement
            </h2>
            <p className="text-gray-700 mb-4">
              Location matters. Avoid placing the box near HVAC intakes that will spread odors throughout your home. Bathrooms with exhaust fans work well. If you have multiple cats, provide one box per cat plus one extra, spread across different areas.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
              Air quality management
            </h2>
            <p className="text-gray-700 mb-4">
              Air purifiers with activated carbon filters capture airborne ammonia. Houseplants like spider plants and peace lilies can help absorb some odors naturally. Open windows when weather permits to exchange stale air.
            </p>

            <div className="bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white font-medium mb-4">
                Keep your whole house fresh with Purrify.
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
              name: 'How do I keep my house from smelling like cat litter?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'To keep your house from smelling like cat litter, start by eliminating odor at the source. Use an activated carbon additive in the litter box to adsorb ammonia before it escapes. Place the litter box in a low-traffic area with good airflow, such as a bathroom with a vent fan or near a window. Use an air purifier with a carbon filter in the room. Scoop waste daily and change litter completely every two weeks. Seal soiled litter in airtight bags before disposal. Vacuum and mop regularly around the box area. For existing odors, wipe down walls and baseboards with an enzymatic cleaner that breaks down ammonia compounds.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
