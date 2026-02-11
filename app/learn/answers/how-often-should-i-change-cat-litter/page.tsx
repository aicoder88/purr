export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How Often to Change Cat Litter? Schedule Guide | Purrify',
  description: 'Quick reference guide for litter changing schedules by type. At-a-glance timelines for clumping, crystal, and natural litters.',
  keywords: [
    'how often should i change cat litter',
    'cat litter change schedule',
    'litter replacement timeline',
    'when to change cat litter'
  ],
  alternates: {
    canonical: '/learn/answers/how-often-should-i-change-cat-litter',
  },
  openGraph: {
    title: 'How Often to Change Cat Litter? Schedule Guide | Purrify',
    description: 'Quick reference guide for litter changing schedules by type. At-a-glance timelines for clumping, crystal, and natural litters.',
    url: `${SITE_URL}/learn/answers/how-often-should-i-change-cat-litter`,
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: 'How Often to Change Cat Litter?',
      },
    ],
  },
};

const relatedQuestions = [
  { slug: 'how-to-keep-litter-box-from-smelling', question: 'How do I keep my litter box from smelling?' },
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
          <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full mb-4">
            Quick Reference
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            How often should I change cat litter?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 mt-4 text-sm">
            Last updated: February 2025 • At-a-glance reference
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg">
              Change clumping litter every 1-2 weeks, crystal litter every 2-4 weeks, and non-clumping clay every 2-3 days. Scoop waste daily regardless of litter type. With activated carbon additives, you can extend clumping litter to 2-3 weeks. Multi-cat households should change 50% more frequently. The exact timing depends on litter type, number of cats, and whether you use odor-controlling additives. Watch for signs it is time: persistent odor after scooping, discolored litter, or your cat avoiding the box.
            </p>
          </div>

          {/* Quick Reference Table - Different from blog */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Reference Chart
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Litter Type</th>
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Scoop</th>
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Full Change</th>
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">With Carbon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-green-50 dark:bg-green-900/20/50">
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Clumping Clay</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">Daily</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">1-2 weeks</td>
                    <td className="py-4 px-4 text-green-700 dark:text-green-400 font-medium">2-3 weeks</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Crystal</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">Stir daily</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">2-4 weeks</td>
                    <td className="py-4 px-4 text-gray-500 dark:text-gray-400 dark:text-gray-500">—</td>
                  </tr>
                  <tr className="bg-yellow-50 dark:bg-yellow-900/20/50">
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Non-Clumping</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">Remove solids</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">2-3 days</td>
                    <td className="py-4 px-4 text-yellow-700 dark:text-yellow-400 font-medium">3-5 days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Natural (Corn/Wheat)</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">Daily</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">1 week</td>
                    <td className="py-4 px-4 text-green-700 dark:text-green-400 font-medium">10-14 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Multi-cat multiplier */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Multi-Cat Adjustment</h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                Have multiple cats? Reduce the "Full Change" timeline by 30-50% per additional cat. 
                <br />
                <strong>Example:</strong> 2 cats with clumping = change every 1 week (not 2).
              </p>
            </div>

            {/* Signs it's time */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
              5 Signs It's Time to Change
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Odor persists after scooping',
                'Litter looks discolored or dark',
                'Cat avoids the box or goes elsewhere',
                'Litter feels gritty/dusty',
                'It has been longer than the chart recommends'
              ].map((sign, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500">⚠</span>
                  <span className="text-red-800 dark:text-red-300 text-sm">{sign}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#1E4D6B] dark:bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white dark:text-white font-medium mb-4">
                Extend time between changes with odor elimination.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white dark:text-white font-semibold rounded-full transition-colors"
              >
                Try Purrify
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 text-sm">
                <strong>Want detailed explanations?</strong> Read our complete guide: <Link href="/blog/how-often-change-cat-litter" className="text-[#1E4D6B] underline">How Often Should You Change Cat Litter? Complete Schedule</Link>
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
              name: 'How often should I change cat litter?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Change clumping litter every 1-2 weeks, crystal litter every 2-4 weeks, and non-clumping clay every 2-3 days. Scoop waste daily regardless of litter type. With activated carbon additives, you can extend clumping litter to 2-3 weeks. Multi-cat households should change 50% more frequently.',
              },
            },
          }),
        }}
      />
    </main>
  );
}
