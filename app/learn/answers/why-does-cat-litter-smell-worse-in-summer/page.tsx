export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Why does cat litter smell worse in summer? - Purrify',
  description: 'Get the answer to "Why does cat litter smell worse in summer?" and discover science-backed solutions for cat litter odor control from Purrify.',
  keywords: [
    'why does cat litter smell worse in summer',
    'cat litter odor',
    'litter box smell',
    'cat odor solutions',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/answers/why-does-cat-litter-smell-worse-in-summer/'
  },
  openGraph: {
    title: 'Why does cat litter smell worse in summer? - Purrify',
    description: 'Get the answer to why cat litter smells worse in summer and discover science-backed solutions for cat litter odor control.',
    url: `${SITE_URL}/learn/answers/why-does-cat-litter-smell-worse-in-summer`,
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_URL}/images/Logos/purrify-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Why does cat litter smell worse in summer?',
      },
    ],
  },
};

const relatedQuestions = [
  { slug: 'how-to-keep-litter-box-from-smelling', question: 'How do I keep my litter box from smelling?' },
  { slug: 'does-activated-carbon-work-for-cat-litter', question: 'Does activated carbon work for cat litter?' },
  { slug: 'how-often-should-i-change-cat-litter', question: 'How often should I change cat litter?' },
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
            FAQ
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Why does cat litter smell worse in summer?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 mt-4 text-sm">
            Last updated: February 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg">
              {/* PASTE YOUR ~120 WORD ANSWER HERE */}
              [Your answer from Perplexity goes here. Edit for brand voice and remove AI artifacts.]
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Extended explanation
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              [Add more detail here after the page starts ranking. This section can be expanded over time.]
            </p>

            <div className="bg-[#1E4D6B] dark:bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white dark:text-white font-medium mb-4">
                Try Purrify risk-free.
              </p>
              <Link
                href="/products/"
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
              name: 'Why does cat litter smell worse in summer?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '[PASTE THE SAME ~120 WORD ANSWER HERE FOR SCHEMA]',
              },
            },
          }),
        }}
      />
    </main>
  );
}
