'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RelatedSolutions } from '../../../../src/components/learn/RelatedSolutions';
import { RelatedContent } from '../../../../src/components/seo/RelatedContent';
import { HowToSection } from '../../../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../../../src/components/seo/RelatedQuestions';

export default function LitterBoxSmellPageClient() {
  const canonicalUrl = 'https://www.purrify.ca/learn/solutions/litter-box-smell-elimination/';

  // SEO optimized images for odor elimination
  const heroImage = '/optimized/blog/litter-box-hero.webp';
  const solutionImage = '/optimized/blog/ammonia-happy-cat.webp';
  const scienceImage = '/optimized/blog/ammonia-science.webp';

  // HowTo steps for schema
  const howToSteps = [
    {
      name: 'Empty and clean the litter box completely',
      text: 'Remove all old litter and wash the box with mild soap and water. Avoid harsh chemicals that can leave residue or odors cats dislike.',
      tip: 'Do a deep clean every 1-2 weeks, even if you scoop daily.',
    },
    {
      name: 'Let the box dry completely',
      text: 'Moisture trapped under litter accelerates bacterial growth and ammonia production. Ensure the box is fully dry before adding fresh litter.',
    },
    {
      name: 'Add 2-3 inches of fresh litter',
      text: "Pour clean litter to the recommended depth. Too little litter means odors aren't absorbed; too much is wasteful.",
    },
    {
      name: 'Sprinkle activated carbon additive on top',
      text: 'Add 2-3 tablespoons of Purrify activated carbon and mix it into the top layer. The carbon begins trapping odor molecules immediately.',
      tip: 'For multi-cat households, use 3-4 tablespoons per box.',
    },
    {
      name: 'Scoop daily and refresh carbon weekly',
      text: 'Daily scooping removes waste before ammonia forms. Add a tablespoon of Purrify every few days to maintain odor control between full changes.',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: 'Why does my litter box smell even after I just cleaned it?',
      answer: "Bacteria convert urea in cat urine to ammonia gas within 2-4 hours. Even with daily scooping, ammonia has already formed. The smell you notice isn't from visible waste—it's ammonia that's been released into the air. Activated carbon traps these molecules continuously between cleanings.",
    },
    {
      question: 'How often should I completely change the litter?',
      answer: 'With regular scooping and activated carbon additive, you can extend full litter changes to every 2-3 weeks instead of weekly. The carbon continues neutralizing odors, keeping litter fresher longer and reducing waste.',
    },
    {
      question: "Will activated carbon change my cat's litter box behavior?",
      answer: "No. Activated carbon is odorless and has a similar texture to litter. Unlike scented additives that can cause litter box avoidance, cats don't notice the carbon. Many cats actually prefer the cleaner environment.",
    },
    {
      question: 'Is activated carbon safe if my cat ingests some?',
      answer: 'Yes. Food-grade activated carbon is non-toxic and has been safely used in water filtration and even human supplements. Small amounts accidentally ingested during grooming pose no health risk to cats.',
    },
    {
      question: 'Can I use activated carbon with any type of litter?',
      answer: 'Absolutely. Activated carbon works with clay, clumping, crystal, wood, paper, corn, and wheat litters. Simply mix it into your existing litter—no need to switch brands or types.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Image
              src={heroImage}
              alt="Clean litter box with cat - complete odor elimination"
              width={1200}
              height={675}
              className="w-full h-auto rounded-lg shadow-lg mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Litter Box Stinks After Cleaning?
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
              You just cleaned the litter box—why does it still smell? Bacteria create ammonia gas within hours of urination.
              Learn why traditional cleaning fails and how activated carbon eliminates odors at the molecular level.
            </p>
          </div>

          {/* Main Solution Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6 text-electric-indigo dark:text-electric-indigo-400 text-center">The Science of Odor Elimination</h2>

            <Image
              src={scienceImage}
              alt="Scientific approach to odor elimination with activated carbon"
              width={1200}
              height={675}
              className="w-full h-auto rounded-lg shadow-md mb-6"
            />

            <p className="text-lg mb-8 text-gray-700 dark:text-gray-200 text-center">
              Unlike masking agents or fragrances, activated carbon actually removes odor molecules from the air.
              Each tiny pore traps ammonia, hydrogen sulfide, and other odor compounds permanently.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🧪</div>
                <h3 className="font-heading font-bold text-lg mb-2">Molecular Level</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Eliminates odors at the source, not just masking</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🌿</div>
                <h3 className="font-heading font-bold text-lg mb-2">100% Natural</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Made from coconut shells - safe for cats and family</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">⏱️</div>
                <h3 className="font-heading font-bold text-lg mb-2">Instant Results</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Works within minutes of application</p>
              </div>
            </div>

            <Image
              src={solutionImage}
              alt="Happy cat in fresh, odor-free environment"
              width={1200}
              height={675}
              className="w-full h-auto rounded-lg shadow-md mb-6"
            />

            <div className="text-center">
              <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-50">Ready to Eliminate Odors Forever?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join thousands of cat owners who&apos;ve solved their litter box odor problems with Purrify.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size/"
                  className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Try Purrify Risk-Free
                </Link>
                <Link
                  href="/learn/how-it-works/"
                  className="inline-block border-2 border-electric-indigo dark:border-electric-indigo text-electric-indigo dark:text-electric-indigo-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-electric-indigo/10 dark:hover:bg-electric-indigo/20 hover:scale-105 transition-all duration-300"
                >
                  Learn the Science
                </Link>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-heading font-bold mb-4 text-electric-indigo dark:text-electric-indigo-400">Works with Any Litter</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                <li>✅ Clay litter (clumping & non-clumping)</li>
                <li>✅ Crystal/silica gel litter</li>
                <li>✅ Natural/biodegradable litter</li>
                <li>✅ Wood pellet litter</li>
                <li>✅ Paper-based litter</li>
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-deep-coral/10 dark:border-deep-coral/20 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-heading font-bold mb-4 text-deep-coral dark:text-deep-coral-400">Perfect For</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                <li>🏠 Small apartments & condos</li>
                <li>🐱 Multiple cat households</li>
                <li>👥 Sensitive family members</li>
                <li>🏢 Indoor cats in offices</li>
                <li>🎯 Any persistent odor problem</li>
              </ul>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 text-white dark:text-gray-100 text-center mb-16">
            <blockquote className="text-2xl font-medium mb-4">
              &quot;I was so embarrassed when guests came over. Now I actually invite people in!
              Purrify completely eliminated the smell in just one day.&quot;
            </blockquote>
            <cite className="text-blue-100 dark:text-gray-300">— Sarah M., Toronto</cite>
          </div>

          {/* AI Quotable Fact */}
          <div className="max-w-4xl mx-auto mb-16">
            <AIQuotableBlock
              fact="Ammonia forms in cat litter boxes within 2-4 hours of urination as bacteria break down urea. This is why litter boxes smell even after cleaning—the gas has already been released."
              explanation="Activated carbon traps ammonia molecules through adsorption, with one gram providing the surface area of a football field for odor capture."
              icon="science"
              variant="highlight"
            />
          </div>

          {/* HowTo Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <HowToSection
              title="How to Stop Your Litter Box From Smelling After Cleaning"
              description="Follow these 5 steps to eliminate persistent litter box odor and keep your home fresh between cleanings."
              steps={howToSteps}
              totalTime="PT15M"
              timeDisplay="15 minutes"
              url={canonicalUrl}
            />
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <RelatedQuestions
              title="Common Questions About Litter Box Odor"
              questions={faqQuestions}
              defaultOpen={[0]}
            />
          </div>
        </div>
      </section>

      <RelatedSolutions currentPath="/learn/solutions/litter-box-smell-elimination" />

      {/* Related Articles */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <RelatedContent currentUrl="/learn/solutions/litter-box-smell-elimination" />
        </div>
      </section>
    </div>
  );
}
