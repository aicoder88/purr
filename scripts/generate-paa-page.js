#!/usr/bin/env node

/**
 * Generate a new PAA (People Also Ask) question page
 * 
 * Usage: node scripts/generate-paa-page.js "How do I stop litter box smell?"
 */

const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 80);
}

function generatePageTemplate(question, slug) {
  const shortQuestion = question.replace(/\?$/, '');
  
  return `export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '${shortQuestion}? - Purrify',
  description: 'Get the answer to "${question}" and discover science-backed solutions for cat litter odor control from Purrify.',
  keywords: [
    '${slug.replace(/-/g, ' ')}',
    'cat litter odor',
    'litter box smell',
    'cat odor solutions',
  ],
  alternates: {
    canonical: '/learn/answers/${slug}',
  },
};

const relatedQuestions = [
  { slug: 'how-to-keep-litter-box-from-smelling', question: 'How do I keep my litter box from smelling?' },
  { slug: 'does-activated-carbon-work-for-cat-litter', question: 'Does activated carbon work for cat litter?' },
  { slug: 'how-often-should-i-change-cat-litter', question: 'How often should I change cat litter?' },
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
          <span className="inline-block px-3 py-1 bg-[#F7A41D]/10 text-[#F7A41D] text-sm font-medium rounded-full mb-4">
            FAQ
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            ${question}
          </h1>
          <p className="text-gray-500 mt-4 text-sm">
            Last updated: February 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 leading-relaxed text-lg">
              {/* PASTE YOUR ~120 WORD ANSWER HERE */}
              [Your answer from Perplexity goes here. Edit for brand voice and remove AI artifacts.]
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Extended explanation
            </h2>
            <p className="text-gray-700 mb-4">
              [Add more detail here after the page starts ranking. This section can be expanded over time.]
            </p>

            <div className="bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white font-medium mb-4">
                Try Purrify risk-free.
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
                href={\`/learn/answers/\${q.slug}\`}
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
              name: '${question}',
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
`;
}

function main() {
  const question = process.argv[2];
  
  if (!question) {
    console.error('Usage: node scripts/generate-paa-page.js "Your question here?"');
    process.exit(1);
  }

  const slug = slugify(question);
  const dirPath = path.join(__dirname, '..', 'app', 'learn', 'answers', slug);
  const filePath = path.join(dirPath, 'page.tsx');

  // Check if directory already exists
  if (fs.existsSync(dirPath)) {
    console.error(`Error: Directory already exists: ${dirPath}`);
    process.exit(1);
  }

  // Create directory
  fs.mkdirSync(dirPath, { recursive: true });

  // Generate and write file
  const template = generatePageTemplate(question, slug);
  fs.writeFileSync(filePath, template);

  console.log('✅ Created new PAA question page:');
  console.log(`   Directory: ${dirPath}`);
  console.log(`   File: ${filePath}`);
  console.log(`   URL: /learn/answers/${slug}`);
  console.log('');
  console.log('Next steps:');
  console.log('1. Edit the ~120 word answer in the file');
  console.log('2. Update related questions for internal linking');
  console.log('3. Add the question to the hub page (/learn/cat-litter-answers)');
  console.log('4. Submit URL to Google Search Console');
}

main();
