export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { stripContext } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Cat Litter Questions Answered | Expert Advice - Purrify',
  description: 'Get expert answers to cat litter questions: odor control, ammonia elimination, litter box placement, and activated carbon science. Real solutions.',
  keywords: [
    'cat litter questions',
    'litter box odor answers',
    'cat litter FAQ',
    'how to stop litter box smell',
    'cat litter tips',
    'activated carbon cat litter guide',
    'ammonia odor solutions',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/cat-litter-answers/'
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/learn/cat-litter-answers/',
    title: 'Cat Litter Questions Answered | Expert Advice - Purrify',
    description: 'Get expert answers to every cat litter question: odor control, ammonia elimination, litter box placement, and activated carbon science.',
    locale: 'en_CA',
  },
};

// PAA Questions discovered from Google searches
// Source: https://alsoasked.com/ research + manual Google search analysis
// Organized by category and search intent (TOFU/BOFU)
const paaQuestions = [
  // === HIGH PRIORITY: BOFU (Ready to buy) ===
  {
    slug: 'what-cat-litter-controls-odor-best',
    question: 'What cat litter controls odor best?',
    category: 'Product',
    preview: 'Clumping clay litter with activated carbon provides the best odor control through adsorption technology...',
  },
  {
    slug: 'what-cat-litter-controls-odor-best',
    question: 'What cat litter smells the best?',
    category: 'Product',
    preview: 'The best smelling litter is actually unscented litter with activated carbon that eliminates odor at the source...',
  },
  {
    slug: 'what-cat-litter-controls-odor-best',
    question: 'Which cat litter smells the best?',
    category: 'Product',
    preview: 'Natural odor elimination beats artificial fragrances. Activated carbon enhanced litters perform best...',
  },
  {
    slug: 'what-cat-litter-controls-odor-best',
    question: 'Which cat litter controls odor the best?',
    category: 'Product',
    preview: 'Look for clumping litter combined with activated carbon additives for maximum ammonia elimination...',
  },
  {
    slug: 'what-cat-litter-controls-odor-best',
    question: 'Which cat litter has the best odor control?',
    category: 'Product',
    preview: 'Odor control depends on clumping ability plus odor-eliminating technology like activated carbon...',
  },
  // === HIGH PRIORITY: TOFU (Problem aware) ===
  {
    slug: 'how-do-i-stop-my-cat-litter-from-smelling',
    question: 'How do I stop my cat litter from smelling?',
    category: 'Odor Control',
    preview: 'Stop odor by eliminating ammonia at the molecular level with activated carbon, not masking with fragrance...',
  },
  {
    slug: 'how-do-i-keep-my-house-from-smelling-like-cat-litter',
    question: 'How do I keep my house from smelling like cat litter?',
    category: 'Home Care',
    preview: 'Prevent house odors by placing litter boxes strategically and using activated carbon additives...',
  },
  {
    slug: 'how-to-eliminate-cat-litter-odor',
    question: 'How to eliminate cat litter odor?',
    category: 'Solutions',
    preview: 'Eliminate odor permanently with activated carbon that adsorbs ammonia molecules from the air...',
  },
  {
    slug: 'how-to-eliminate-cat-litter-odor',
    question: 'How to control cat litter odor?',
    category: 'Solutions',
    preview: 'Control odor through daily scooping, proper ventilation, and activated carbon additives...',
  },
  {
    slug: 'how-to-eliminate-cat-litter-odor',
    question: 'How to reduce cat litter odor?',
    category: 'Solutions',
    preview: 'Reduce odor by removing waste daily and using carbon-based additives that bind ammonia...',
  },
  {
    slug: 'how-to-eliminate-cat-litter-odor',
    question: 'How to stop cat litter odor?',
    category: 'Solutions',
    preview: 'Stop odor completely with activated carbon technology that removes ammonia from the air...',
  },
  {
    slug: 'what-eliminates-cat-litter-odor',
    question: 'What eliminates cat litter odor?',
    category: 'Solutions',
    preview: 'Activated carbon is the most effective substance for eliminating cat litter odor through adsorption...',
  },
  {
    slug: 'what-absorbs-cat-litter-odor',
    question: 'What absorbs cat litter odor?',
    category: 'Science',
    preview: 'Activated carbon absorbs odor best with over 1,000 square meters of surface area per gram...',
  },
  {
    slug: 'what-eliminates-cat-litter-odor',
    question: 'What neutralizes cat litter smell?',
    category: 'Science',
    preview: 'Activated carbon neutralizes ammonia odor by binding molecules to its porous surface...',
  },
  // === ORIGINAL PAGES ===
  {
    slug: 'how-to-keep-litter-box-from-smelling',
    question: 'How do I keep my litter box from smelling?',
    category: 'Odor Control',
    preview: 'The key is addressing ammonia at the molecular level, not just masking it with fragrance...',
  },
  {
    slug: 'does-activated-carbon-work-for-cat-litter',
    question: 'Does activated carbon work for cat litter?',
    category: 'Science',
    preview: 'Yes. Activated carbon works through adsorption, binding ammonia molecules to its porous surface...',
  },
  {
    slug: 'how-often-should-i-change-cat-litter',
    question: 'How often should I change cat litter?',
    category: 'Maintenance',
    preview: 'With proper odor control, clumping litter can last 2-3 weeks. Non-clumping needs weekly changes...',
  },
  {
    slug: 'why-does-my-house-smell-like-cat-pee',
    question: 'Why does my house smell like cat pee?',
    category: 'Problems',
    preview: 'Cat urine contains ammonia that becomes concentrated over time. Standard litter does not neutralize it...',
  },
  {
    slug: 'is-clumping-or-non-clumping-better-for-odor',
    question: 'Is clumping or non-clumping litter better for odor control?',
    category: 'Comparison',
    preview: 'Clumping litter generally performs better because it isolates waste immediately...',
  },
  {
    slug: 'best-place-to-put-litter-box-apartment',
    question: 'Where is the best place to put a litter box in an apartment?',
    category: 'Placement',
    preview: 'Choose a low-traffic area with ventilation. Bathrooms, laundry rooms, or spare corners work best...',
  },
  {
    slug: 'how-do-i-keep-my-house-from-smelling-like-cat-litter',
    question: 'How do I get rid of cat odor in a small space?',
    category: 'Apartment Living',
    preview: 'Small spaces amplify ammonia buildup. Activated carbon additives work better than air fresheners...',
  },
  {
    slug: 'is-baking-soda-safe-for-cat-litter',
    question: 'Is baking soda safe for cat litter?',
    category: 'Safety',
    preview: 'Baking soda is generally safe but has limited effectiveness. It masks odor rather than eliminating it...',
  },
  {
    slug: 'why-does-cat-litter-smell-worse-in-summer',
    question: 'Why does cat litter smell worse in summer?',
    category: 'Seasonal',
    preview: 'Heat and humidity accelerate ammonia release from urine. Air conditioning helps but does not solve the root cause...',
  },
  {
    slug: 'is-it-safe-to-sleep-in-a-room-with-cat-litter',
    question: 'Can I use essential oils in cat litter?',
    category: 'Safety',
    preview: 'Most essential oils are toxic to cats. Even diluted, they can cause respiratory issues and liver damage...',
  },
  // === HEALTH & SAFETY ===
  {
    slug: 'is-it-safe-to-sleep-in-a-room-with-cat-litter',
    question: 'Is it safe to sleep in a room with cat litter?',
    category: 'Health',
    preview: 'Sleeping near a litter box is generally safe with proper odor control and ventilation...',
  },
  {
    slug: 'is-it-safe-to-sleep-in-a-room-with-cat-litter',
    question: 'Is cat litter smell toxic?',
    category: 'Health',
    preview: 'Ammonia from cat urine can irritate airways in high concentrations. Proper odor control prevents issues...',
  },
  {
    slug: 'is-it-safe-to-sleep-in-a-room-with-cat-litter',
    question: 'Is cat litter smell bad for you?',
    category: 'Health',
    preview: 'Prolonged exposure to ammonia can cause respiratory irritation. Activated carbon eliminates this risk...',
  },
  {
    slug: 'is-it-safe-to-sleep-in-a-room-with-cat-litter',
    question: 'Can cat litter smell make you sick?',
    category: 'Health',
    preview: 'Ammonia buildup can cause headaches and breathing issues. Eliminating odor prevents health effects...',
  },
  // === LITTER BOX TIPS ===
  {
    slug: 'why-do-vets-not-recommend-closed-litter-boxes',
    question: 'Why do vets not recommend closed litter boxes?',
    category: 'Litter Box',
    preview: 'Closed boxes trap ammonia and odors, creating an unpleasant environment for cats...',
  },
  {
    slug: 'which-litter-box-is-best-for-odor-control',
    question: 'Which litter box is best for odor control?',
    category: 'Litter Box',
    preview: 'Open, large litter boxes with high sides provide the best odor control when paired with carbon additives...',
  },
  // === ODOR SCIENCE ===
  {
    slug: 'why-does-my-house-smell-like-cat-pee',
    question: 'Why does cat litter smell like ammonia?',
    category: 'Science',
    preview: 'Cat urine contains urea which breaks down into ammonia. Bacteria accelerate this process...',
  },
  {
    slug: 'how-do-i-stop-my-cat-litter-from-smelling',
    question: 'Why does cat litter smell so bad?',
    category: 'Science',
    preview: 'Concentrated ammonia from urine breakdown creates the strong, unpleasant litter box odor...',
  },
  {
    slug: 'why-does-my-house-smell-like-cat-pee',
    question: 'Does cat litter smell like ammonia?',
    category: 'Science',
    preview: 'Yes, cat litter typically smells like ammonia due to the breakdown of urea in cat urine...',
  },
  // === ODOR REMOVAL ===
  {
    slug: 'how-to-keep-litter-box-from-smelling',
    question: 'How to remove cat litter smell from room?',
    category: 'Removal',
    preview: 'Remove room odors with activated carbon air purifiers and enzymatic cleaners on surfaces...',
  },
  {
    slug: 'how-do-i-keep-my-house-from-smelling-like-cat-litter',
    question: 'How to get cat litter smell out of house?',
    category: 'Removal',
    preview: 'Deep clean with enzymatic cleaners and add activated carbon to litter boxes for ongoing control...',
  },
  {
    slug: 'how-to-eliminate-cat-litter-smell',
    question: 'How to eliminate cat litter smell?',
    category: 'Removal',
    preview: 'Eliminate smell permanently with activated carbon additives that adsorb ammonia molecules...',
  },
  {
    slug: 'how-to-eliminate-cat-litter-odor',
    question: 'How to prevent cat litter smell?',
    category: 'Prevention',
    preview: 'Prevent smell before it starts with daily scooping and activated carbon in the litter...',
  },
];

const categories = [...new Set(paaQuestions.map(q => q.category))];

export default function CatLitterAnswersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#1E4D6B] dark:bg-[#1E4D6B] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-[#F7A41D]" />
            <span className="text-white/90 dark:text-white/90 text-sm font-medium">People Also Ask</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-6 leading-tight">
            Cat Litter Questions,<br />
            <span className="text-[#F7A41D]">Expert Answers</span>
          </h1>
          <p className="text-xl text-white/80 dark:text-white/80 max-w-2xl mx-auto">
            Real answers to the most searched cat litter questions.
            No fluff, no marketing speak—just science-backed solutions.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 py-2">Filter by topic:</span>
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-[#1E4D6B] hover:text-white rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
            >
              {category}
            </a>
          ))}
        </div>
      </section>

      {/* Questions Grid */}
      {/* Content Type Legend */}
      <section className="py-6 px-4 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Content types:</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="px-2 py-1 bg-[#F7A41D]/10 text-[#F7A41D] rounded text-xs font-medium">Quick Answer</span>
              <span className="text-gray-500 dark:text-gray-400">Fast facts & checklists (~2 min read)</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">Deep Guide</span>
              <span className="text-gray-500 dark:text-gray-400">Comprehensive coverage (~8-10 min read)</span>
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-[#F7A41D] rounded-full"></span>
                {category}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {paaQuestions
                  .filter((q) => q.category === category)
                  .map((q) => (
                    <Link
                      key={q.slug}
                      href={`/learn/answers/${q.slug}`}
                      className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-[#F7A41D]/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#1E4D6B] dark:group-hover:text-[#F7A41D] leading-snug">
                          {q.question}
                        </h3>
                        <span className="flex-shrink-0 px-2 py-1 bg-[#F7A41D]/10 text-[#F7A41D] text-xs font-medium rounded">
                          Quick Answer
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {q.preview}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-[#F7A41D] font-medium text-sm">
                          Read answer
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">~2 min</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#1E4D6B] dark:bg-[#1E4D6B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-white/80 dark:text-white/80 mb-8">
            Try Purrify risk-free. If you do not notice a difference, we will refund you.
          </p>
          <Link
            href="/products/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#F7A41D] hover:bg-[#E09400] text-white font-semibold rounded-full transition-colors"
          >
            Get Your Free Trial
          </Link>
          <p className="text-white/60 dark:text-white/60 text-sm mt-4">
            Just pay $4.76 shipping. One per household.
          </p>
        </div>
      </section>

      {/* Schema Markup for FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              stripContext({
                '@type': 'FAQPage',
                mainEntity: paaQuestions.map((q) => ({
                  '@type': 'Question',
                  name: q.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: q.preview,
                  },
                })),
              }),
            ],
          }),
        }}
      />
    </main>
  );
}
