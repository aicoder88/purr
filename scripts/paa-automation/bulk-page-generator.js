#!/usr/bin/env node

/**
 * Bulk generate PAA question pages from JSON output
 * 
 * Usage:
 *   node bulk-page-generator.js questions-answers.json
 * 
 * Input JSON format (from generate-answers.js):
 *   [
 *     {
 *       "question": "How do I...?",
 *       "category": "Odor Control",
 *       "answer": "The answer text...",
 *       "wordCount": 123
 *     }
 *   ]
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

function generatePageTemplate(question, answer, category, slug) {
  const shortQuestion = question.replace(/\?$/, '');
  const categoryClass = category.toLowerCase().replace(/\s+/g, '-');
  
  // Color mapping for categories
  const categoryColors = {
    'odor-control': 'bg-[#F7A41D]/10 text-[#F7A41D]',
    'science': 'bg-blue-100 text-blue-700',
    'maintenance': 'bg-green-100 text-green-700',
    'problems': 'bg-red-100 text-red-700',
    'comparison': 'bg-purple-100 text-purple-700',
    'placement': 'bg-orange-100 text-orange-700',
    'apartment-living': 'bg-teal-100 text-teal-700',
    'safety': 'bg-indigo-100 text-indigo-700',
    'seasonal': 'bg-pink-100 text-pink-700'
  };
  
  const badgeClass = categoryColors[categoryClass] || 'bg-gray-100 text-gray-700';
  
  return `export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '${shortQuestion}? - Purrify',
  description: '${answer.substring(0, 150).replace(/"/g, '\\"')}...',
  keywords: [
    '${slug.replace(/-/g, ' ')}',
    'cat litter odor',
    'litter box smell',
    'cat odor solutions',
    '${category.toLowerCase()}'
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
          <span className="inline-block px-3 py-1 ${badgeClass} text-sm font-medium rounded-full mb-4">
            ${category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            ${question}
          </h1>
          <p className="text-gray-500 mt-4 text-sm">
            Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <p className="text-gray-800 leading-relaxed text-lg">
              ${answer}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Why this matters
            </h2>
            <p className="text-gray-700 mb-4">
              Understanding the science behind cat litter odor helps you make informed decisions about products and maintenance routines. The right approach saves time, money, and creates a healthier environment for both you and your cat.
            </p>

            <div className="bg-[#1E4D6B] rounded-xl p-6 text-center mt-8">
              <p className="text-white font-medium mb-4">
                Experience odor-free litter boxes with Purrify.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F7A41D] hover:bg-[#E09400] text-white font-semibold rounded-full transition-colors"
              >
                Get Free Trial
              </Link>
              <p className="text-white/60 text-sm mt-2">
                Just pay $4.76 shipping
              </p>
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
              name: '${question.replace(/'/g, "\\'")}',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '${answer.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
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

function updateHubPage(questions) {
  const hubPagePath = path.join(__dirname, '../../app/learn/cat-litter-answers/page.tsx');
  
  if (!fs.existsSync(hubPagePath)) {
    console.error('❌ Hub page not found:', hubPagePath);
    return;
  }

  let hubContent = fs.readFileSync(hubPagePath, 'utf8');
  
  // Find the paaQuestions array and add new questions
  const newEntries = questions.map(q => {
    const slug = slugify(q.question);
    return `  {
    slug: '${slug}',
    question: '${q.question.replace(/'/g, "\\'")}',
    category: '${q.category}',
    preview: '${q.answer.substring(0, 100).replace(/'/g, "\\'")}...',
  },`;
  }).join('\n');

  console.log('\n📋 Add these entries to the hub page paaQuestions array:');
  console.log(newEntries);
  console.log('\n⚠️  Manual step required: Copy the above into /app/learn/cat-litter-answers/page.tsx');
}

async function main() {
  const inputFile = process.argv[2];

  if (!inputFile) {
    console.log('Usage: node bulk-page-generator.js questions-answers.json');
    console.log('\nThe JSON file should be generated by generate-answers.js');
    process.exit(0);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ File not found: ${inputFile}`);
    process.exit(1);
  }

  const questions = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  console.log(`📁 Processing ${questions.length} questions...\n`);

  const createdPages = [];
  const skippedPages = [];

  for (const item of questions) {
    const slug = slugify(item.question);
    const dirPath = path.join(__dirname, '../../app/learn/answers', slug);
    const filePath = path.join(dirPath, 'page.tsx');

    // Check if already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping (exists): ${item.question}`);
      skippedPages.push(item);
      continue;
    }

    // Create directory
    fs.mkdirSync(dirPath, { recursive: true });

    // Generate and write page
    const template = generatePageTemplate(
      item.question,
      item.answer,
      item.category,
      slug
    );
    fs.writeFileSync(filePath, template);

    console.log(`✅ Created: /learn/answers/${slug}`);
    createdPages.push(item);
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${createdPages.length} pages`);
  console.log(`   Skipped: ${skippedPages.length} pages (already exist)`);

  if (createdPages.length > 0) {
    console.log(`\n📋 Update hub page with new questions?`);
    updateHubPage(createdPages);
  }

  console.log(`\n🚀 Next steps:`);
  console.log(`   1. Update hub page with new questions`);
  console.log(`   2. Run: pnpm check-types`);
  console.log(`   3. Run: pnpm build`);
  console.log(`   4. Submit new URLs to Google Search Console`);
}

main().catch(console.error);
