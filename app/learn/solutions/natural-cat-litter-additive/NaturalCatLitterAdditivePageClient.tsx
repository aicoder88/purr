'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RelatedSolutions } from '@/components/learn/RelatedSolutions';
import { HowToSection } from '@/components/seo/HowToSection';
import { AIQuotableBlock } from '@/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '@/components/seo/RelatedQuestions';

export default function NaturalCatLitterAdditivePageClient() {
  const canonicalUrl = 'https://www.purrify.ca/learn/solutions/natural-cat-litter-additive/';

  // Natural cat litter additive images
  const heroImage = '/optimized/blog/litter-box-hero.webp';
  const sectionImage1 = '/optimized/blog/ammonia-science.webp';
  const sectionImage2 = '/optimized/blog/ammonia-happy-cat.webp';
  const solutionImage = '/optimized/blog/ammonia-fresh-home.webp';

  // HowTo steps for non-toxic deodorizer
  const howToSteps = [
    {
      name: 'Choose a food-grade activated carbon additive',
      text: 'Look for activated carbon made from natural sources like coconut shells. Avoid products with added fragrances, dyes, or chemical additives that could harm your cat.',
      tip: 'Coconut shell carbon is the purest form—same grade used in water filtration.',
    },
    {
      name: 'Start with a clean litter box',
      text: 'Empty old litter and wash the box with mild dish soap and water. Rinse thoroughly—cats can detect soap residue and may avoid the box.',
    },
    {
      name: 'Add fresh litter and sprinkle carbon on top',
      text: 'Pour 2-3 inches of your regular litter, then add 2-3 tablespoons of activated carbon. Mix it into the top layer so it contacts waste immediately.',
    },
    {
      name: 'Maintain with daily scooping',
      text: 'Scoop daily as normal. The carbon continues working between cleanings, trapping ammonia molecules as they form from bacterial breakdown of urine.',
      tip: 'Add a tablespoon of fresh carbon every few days for maximum protection.',
    },
    {
      name: 'Replace completely every 2-3 weeks',
      text: 'With activated carbon, you can extend full litter changes from weekly to every 2-3 weeks. The carbon keeps odor under control longer than untreated litter.',
    },
  ];

  // FAQ questions for non-toxic deodorizer
  const faqQuestions = [
    {
      question: 'Is activated carbon safe if my cat eats some?',
      answer: "Yes, completely safe. Food-grade activated carbon is non-toxic and has been used safely in water filters, air purifiers, and even human digestive supplements. If your cat accidentally ingests small amounts during grooming, there's no health risk.",
    },
    {
      question: 'What makes a cat litter deodorizer "non-toxic"?',
      answer: "A truly non-toxic deodorizer contains no synthetic fragrances, no chemical odor neutralizers, no artificial dyes, and no ingredients that could harm cats through skin contact, inhalation, or ingestion. Activated carbon from coconut shells meets all these criteria.",
    },
    {
      question: 'Why are scented litter deodorizers harmful to cats?',
      answer: 'Cats have 200 million scent receptors (humans have 5 million). Artificial fragrances can overwhelm their senses, cause respiratory irritation, and trigger litter box avoidance. Some scented products contain essential oils that are toxic to cats.',
    },
    {
      question: 'How does activated carbon compare to baking soda for safety?',
      answer: 'Both are safe, but activated carbon is more effective. Baking soda only works for 1-2 days and can cause digestive upset if cats ingest large amounts. Activated carbon works 5-7 days and passes through safely even if ingested.',
    },
    {
      question: 'Can I use non-toxic deodorizer with kittens?',
      answer: "Yes. Activated carbon is safe for cats of all ages, including curious kittens who may dig in and accidentally ingest litter. Unlike chemical deodorizers, there's no risk of toxicity.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
            Non-Toxic Cat Litter Deodorizer
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
            Looking for a cat litter deodorizer that&apos;s truly safe? Activated carbon is food-grade, fragrance-free, and effective—without chemicals that can harm your cat.
          </p>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-4 text-electric-indigo dark:text-electric-indigo-400">The Purrify Solution</h2>
            <p className="text-lg mb-6">100% natural activated carbon with no added fragrances or dyes</p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-heading font-bold">Instant Results</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌿</div>
                <h3 className="font-heading font-bold">100% Natural</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-heading font-bold">Cost Effective</h3>
              </div>
            </div>

            <Link
              href="/products/trial-size/"
              className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-3 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Try Purrify Risk-Free
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={heroImage}
              alt="Natural coconut shell activated carbon - 100% natural cat litter additive"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white dark:text-gray-100">
                <h2 className="text-3xl font-heading font-bold mb-2">100% Natural from Coconut Shells</h2>
                <p className="text-xl opacity-90">No chemicals, no fragrances, just pure carbon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-gray-900 dark:text-gray-100">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-white dark:text-gray-100">1</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Sprinkle</h3>
              <p>Add Purrify to your existing litter</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-white dark:text-gray-100">2</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Activate</h3>
              <p>Activated carbon absorbs odor molecules</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-white dark:text-gray-100">3</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Eliminate</h3>
              <p>Odors are permanently trapped</p>
            </div>
          </div>

          {/* Natural Ingredients Image */}
          <div className="mt-12 mb-12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage1}
                alt="Natural ingredients and eco-friendly cat litter solution"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-heading font-bold mb-2">Pure & Natural Ingredients</h3>
                  <p className="text-lg opacity-90">Safe for your family and the environment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Happy Cats Image */}
          <div className="mb-12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage2}
                alt="Multiple happy cats in clean, naturally fresh home"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-heading font-bold mb-2">Happy Cats, Natural Solution</h3>
                  <p className="text-lg opacity-90">No artificial fragrances or chemicals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">Ready to Try Non-Toxic Cat Litter Deodorizer?</h2>
          <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">Join 1,000+ satisfied cat owners</p>

          {/* Solution Image */}
          <div className="mb-12 max-w-3xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={solutionImage}
                alt="Eco-friendly natural cat litter additive for sustainable pet care"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-heading font-bold mb-2">Sustainable Pet Care</h3>
                  <p className="text-lg opacity-90">Natural solution for a cleaner planet</p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/products/"
            className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 text-lg shadow-lg"
          >
            Shop Purrify Now
          </Link>
        </div>
      </section>

      {/* AI Quotable Fact */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AIQuotableBlock
            fact="Cats have 200 million scent receptors compared to humans' 5 million. Artificial fragrances in litter deodorizers can overwhelm their senses and cause litter box avoidance—activated carbon is odorless and undetectable to cats."
            explanation="Food-grade coconut shell activated carbon contains no fragrances, dyes, or chemicals. It's the same grade used in water filtration systems."
            icon="check"
            variant="highlight"
          />
        </div>
      </section>

      {/* HowTo Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <HowToSection
            title="How to Use Non-Toxic Cat Litter Deodorizer"
            description="Follow these steps to safely and effectively control litter box odor without chemicals or fragrances."
            steps={howToSteps}
            totalTime="PT10M"
            timeDisplay="10 minutes"
            url={canonicalUrl}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <RelatedQuestions
            title="Non-Toxic Deodorizer Safety Questions"
            questions={faqQuestions}
            defaultOpen={[0]}
          />
        </div>
      </section>

      <RelatedSolutions currentPath="/learn/solutions/natural-cat-litter-additive" />
    </div>
  );
}
