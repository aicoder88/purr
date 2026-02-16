'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RelatedSolutions } from '../../../../src/components/learn/RelatedSolutions';
import { HowToSection } from '../../../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../../../src/components/seo/RelatedQuestions';

export default function AmmoniaSmellPageClient() {
  const canonicalUrl = 'https://www.purrify.ca/learn/solutions/ammonia-smell-cat-litter/';

  // Ammonia smell solution images
  const heroImage = '/images/ammonia-hero.webp';
  const sectionImage1 = '/images/ammonia-science.webp';
  const sectionImage2 = '/images/ammonia-fresh-home.webp';
  const solutionImage = '/images/ammonia-happy-cat.webp';

  // HowTo steps for fixing ammonia smell
  const howToSteps = [
    {
      name: 'Identify the source of ammonia',
      text: 'Ammonia forms when bacteria break down urea in cat urine. This process starts within hours of urination and intensifies over time. The older the waste, the stronger the ammonia.',
    },
    {
      name: 'Empty and deep clean the litter box',
      text: 'Remove all litter and scrub the box with enzyme cleaner (not bleach, which reacts with ammonia). Let it dry completely before adding fresh litter.',
      tip: 'Never mix bleach with ammonia—it creates toxic fumes.',
    },
    {
      name: 'Add fresh litter with activated carbon',
      text: 'Pour 2-3 inches of clean litter, then add 2-3 tablespoons of activated carbon additive. Mix it into the top layer where it will contact fresh waste.',
    },
    {
      name: 'Scoop daily to prevent ammonia buildup',
      text: 'Remove solid waste and urine clumps daily. The faster you remove waste, the less time bacteria have to produce ammonia.',
    },
    {
      name: 'Maintain with regular carbon refreshes',
      text: 'Add a tablespoon of fresh activated carbon every 2-3 days to maintain odor control. The carbon continuously traps new ammonia molecules as they form.',
    },
  ];

  // FAQ questions for ammonia smell
  const faqQuestions = [
    {
      question: 'Why does cat litter smell like ammonia?',
      answer: 'Cat urine contains urea, which bacteria break down into ammonia gas. This is a natural biological process that starts within 2-4 hours of urination. The distinctive sharp, eye-watering smell is ammonia being released into the air.',
    },
    {
      question: 'Is the ammonia smell from cat litter dangerous?',
      answer: 'Yes, at high concentrations. Ammonia can irritate eyes and respiratory systems for both humans and cats. Cats are particularly vulnerable since they spend time close to the litter box. Prolonged exposure can cause respiratory infections in cats.',
    },
    {
      question: "Why doesn't baking soda stop the ammonia smell?",
      answer: 'Baking soda (sodium bicarbonate) is alkaline, and ammonia is also alkaline. Alkaline substances don\'t neutralize each other effectively. Baking soda provides minimal, short-term masking but doesn\'t trap ammonia molecules like activated carbon does.',
    },
    {
      question: 'How is activated carbon different from charcoal?',
      answer: "Activated carbon is charcoal that's been processed to create millions of microscopic pores, dramatically increasing surface area. One gram of activated carbon has the surface area of a football field, while regular charcoal has minimal porosity.",
    },
    {
      question: 'Will air fresheners help with ammonia smell?',
      answer: 'No. Air fresheners only mask odor with fragrance—the ammonia is still present. Worse, some air fresheners contain chemicals that can irritate cats\' respiratory systems. Activated carbon actually removes ammonia molecules from the air.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
            Stop That Sharp Ammonia Smell!
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
            Finally! A solution that destroys ammonia smell instead of masking it. Your nose (and your guests) will thank you.
          </p>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-4 text-electric-indigo dark:text-electric-indigo-400">Powerful Ammonia Destroyer</h2>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-200">This isn&apos;t your typical air freshener. Purrify uses the same activated carbon grade found in military gas masks to destroy ammonia molecules instantly.</p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-heading text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Why Ammonia Smell Develops</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-3">
                Ammonia smell in cat litter boxes occurs when bacteria break down urea in cat urine. This natural process
                produces ammonia gas, which has that distinctive sharp, pungent odor that makes you want to hold your breath.
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                Traditional clay litters can trap some odors, but they can&apos;t neutralize ammonia at the molecular level.
                That&apos;s where activated carbon technology makes the difference.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100">Instant Results</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Works immediately upon application</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌿</div>
                <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100">100% Natural</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Safe for cats and humans</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100">Cost Effective</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Small amount goes a long way</p>
              </div>
            </div>

            <Link
              href="/products/trial-size"
              className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-3 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Purrify Now - Stop The Stink
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
              alt="Person bothered by strong ammonia smell from cat litter box"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white dark:text-gray-100">
                <h2 className="font-heading text-3xl font-bold mb-2">No More Holding Your Breath!</h2>
                <p className="text-xl opacity-90">Eliminate ammonia smell at the molecular level</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-gray-900 dark:text-gray-100">How It Works</h2>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 mb-12 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-heading font-semibold mb-6 text-gray-900 dark:text-gray-100">The Science Behind Ammonia Elimination</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Activated carbon works through a process called adsorption (not absorption). The carbon has millions of
              microscopic pores that create an enormous surface area - just one gram has the surface area of a football field!
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              When ammonia molecules come into contact with activated carbon, they become trapped in these pores through
              chemical attraction. Unlike air fresheners that just mask odors, this process actually removes the ammonia
              from the air permanently.
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              This is why Purrify works so effectively - it doesn&apos;t just cover up the smell, it eliminates the source
              of the odor at the molecular level.
            </p>
          </div>

          {/* Science Image */}
          <div className="mb-12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage1}
                alt="Molecular science of activated carbon trapping ammonia molecules"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="font-heading text-2xl font-bold mb-2">Military-Grade Carbon Technology</h3>
                  <p className="text-lg opacity-90">Same technology used in water filters and gas masks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-white dark:text-gray-100">1</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 text-gray-900 dark:text-gray-100">Sprinkle</h3>
              <p className="text-gray-700 dark:text-gray-200">Add Purrify to your existing litter - works with any brand</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-white dark:text-gray-100">2</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 text-gray-900 dark:text-gray-100">Activate</h3>
              <p className="text-gray-700 dark:text-gray-200">Activated carbon absorbs ammonia molecules at the source</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-white dark:text-gray-100">3</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 text-gray-900 dark:text-gray-100">Eliminate</h3>
              <p className="text-gray-700 dark:text-gray-200">Odors are permanently trapped - no more ammonia smell</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Home Image */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={sectionImage2}
              alt="Clean, fresh-smelling home environment without ammonia odor"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white dark:text-gray-100">
                <h3 className="font-heading text-2xl font-bold mb-2">Fresh Home, Happy Life</h3>
                <p className="text-lg opacity-90">No more embarrassment when guests visit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">Ready to Solve Your Ammonia Smell Problem?</h2>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">Join 1,000+ satisfied cat owners who&apos;ve eliminated litter box odors</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-gray-100">Why Choose Purrify?</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                <li>✓ Works with any litter brand you already use</li>
                <li>✓ 100% natural activated carbon - safe for cats and humans</li>
                <li>✓ Eliminates ammonia at the molecular level</li>
                <li>✓ No artificial fragrances or chemicals</li>
                <li>✓ Cost-effective - a little goes a long way</li>
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-gray-100">Common Results</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                <li>✓ Immediate reduction in ammonia smell</li>
                <li>✓ Fresh-smelling home even with multiple cats</li>
                <li>✓ No more embarrassment when guests visit</li>
                <li>✓ Longer-lasting litter between changes</li>
                <li>✓ Happier cats and humans alike</li>
              </ul>
            </div>
          </div>

          {/* Solution Image - Happy Cat */}
          <div className="mb-12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
              <Image
                src={solutionImage}
                alt="Happy cat in odor-free home thanks to Purrify ammonia elimination"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="font-heading text-2xl font-bold mb-2">Your Cat Deserves Better</h3>
                  <p className="text-lg opacity-90">Join 1,000+ happy cat owners</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/products/"
              className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 text-lg mr-4 shadow-lg"
            >
              Shop Purrify Now
            </Link>
            <Link
              href="/learn/how-it-works"
              className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-4 px-8 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* AI Quotable Fact */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AIQuotableBlock
            fact="Baking soda cannot neutralize ammonia because both are alkaline substances. Activated carbon works through adsorption—physically trapping ammonia molecules in microscopic pores—which is why it's 10x more effective than baking soda."
            explanation="One gram of activated carbon has a surface area of 1,000-2,000 square meters (roughly 4 tennis courts), providing massive capacity for trapping odor molecules."
            icon="science"
            variant="highlight"
          />
        </div>
      </section>

      {/* HowTo Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <HowToSection
            title="How to Stop Cat Litter Ammonia Smell"
            description="Follow these 5 steps to eliminate ammonia odor at the source and keep your home fresh."
            steps={howToSteps}
            totalTime="PT15M"
            timeDisplay="15 minutes for setup"
            url={canonicalUrl}
          />
        </div>
      </section>

      {/* Related Ammonia Content - Internal Linking Cluster */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Learn More About Ammonia & Cat Litter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/learn/ammonia-science"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-[#FF3131] dark:hover:border-[#FF5050] transition-all group"
            >
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                The Science of Ammonia
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Why cat urine produces ammonia and the chemistry behind the smell.
              </p>
            </Link>
            <Link
              href="/learn/cat-litter-ammonia-health-risks"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-[#FF3131] dark:hover:border-[#FF5050] transition-all group"
            >
              <div className="text-3xl mb-3">⚠️</div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                Ammonia Health Risks
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Is ammonia from cat litter dangerous? Safe exposure levels explained.
              </p>
            </Link>
            <Link
              href="/blog/how-to-neutralize-ammonia-cat-litter"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-[#FF3131] dark:hover:border-[#FF5050] transition-all group"
            >
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                5 Ways to Neutralize Ammonia
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Proven methods to eliminate ammonia smell permanently.
              </p>
            </Link>
            <Link
              href="/learn/activated-carbon-vs-baking-soda-deodorizers"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-[#FF3131] dark:hover:border-[#FF5050] transition-all group"
            >
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                Carbon vs Baking Soda
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Compare activated carbon and baking soda for ammonia control — see which actually works.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <RelatedQuestions
            title="Ammonia Smell Questions"
            questions={faqQuestions}
            defaultOpen={[0]}
          />
        </div>
      </section>

      <RelatedSolutions currentPath="/learn/solutions/ammonia-smell-cat-litter" />
    </div>
  );
}
