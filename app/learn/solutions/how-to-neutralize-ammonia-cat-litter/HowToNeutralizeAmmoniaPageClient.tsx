'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RelatedSolutions } from '@/components/learn/RelatedSolutions';
import { HowToSection } from '@/components/seo/HowToSection';
import { AIQuotableBlock } from '@/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '@/components/seo/RelatedQuestions';

export default function HowToNeutralizeAmmoniaPageClient() {
  const canonicalUrl = 'https://www.purrify.ca/learn/solutions/how-to-neutralize-ammonia-cat-litter/';

  const heroImage = '/optimized/blog/ammonia-hero.webp';
  const scienceImage = '/optimized/blog/ammonia-science.webp';
  const freshHomeImage = '/optimized/blog/ammonia-fresh-home.webp';

  // HowTo steps for neutralizing ammonia
  const howToSteps = [
    {
      name: 'Choose activated carbon as your primary solution',
      text: 'Activated carbon is the most effective ammonia neutralizer available. It traps ammonia molecules permanently through adsorption, with 92% reduction in lab tests.',
      tip: 'Look for coconut shell activated carbon—it has the highest surface area and purity.',
    },
    {
      name: 'Remove existing ammonia-soaked litter',
      text: 'Empty the litter box completely and dispose of old litter. Ammonia has already been released from this waste and cannot be recaptured.',
    },
    {
      name: 'Clean the box with enzyme cleaner',
      text: 'Use an enzyme-based cleaner (not bleach) to break down any urine residue in the box. Let it dry completely before adding fresh litter.',
      tip: 'Bleach + ammonia creates toxic chloramine gas. Never use bleach on litter boxes.',
    },
    {
      name: 'Add fresh litter with activated carbon mixed in',
      text: "Pour 2-3 inches of clean litter, then add 2-3 tablespoons of activated carbon additive. Mix thoroughly so the carbon contacts urine as soon as it's deposited.",
    },
    {
      name: 'Maintain with daily scooping and weekly carbon refresh',
      text: 'Scoop waste daily to remove the source of new ammonia. Add 1 tablespoon of fresh carbon every 2-3 days to maintain continuous protection.',
    },
  ];

  // Enhanced FAQ questions for RelatedQuestions component (adds FAQPage schema)
  const faqQuestions = [
    {
      question: 'Why does my litter box smell like ammonia even after cleaning?',
      answer: "Ammonia forms within 2-4 hours of urination as bacteria break down urea. If you clean once daily, ammonia has already formed. Activated carbon neutralizes it continuously between cleanings, which is why it's more effective than just frequent scooping.",
    },
    {
      question: 'Is the ammonia smell harmful to my cat?',
      answer: "Yes. High ammonia levels can irritate your cat's respiratory system, cause eye problems, and lead to litter box avoidance. Cats have sensitive noses—if you can smell it, it's overwhelming for them. Prolonged exposure can cause chronic respiratory issues.",
    },
    {
      question: 'How much activated carbon should I use?',
      answer: 'For a standard litter box, 2-3 tablespoons of activated carbon additive mixed into the litter is sufficient. For multi-cat households or larger boxes, use 3-4 tablespoons. Add more with each litter change or weekly top-up for best results.',
    },
    {
      question: 'Does activated carbon work with all litter types?',
      answer: 'Yes. Activated carbon additives work with clay, clumping, crystal, wood, paper, and natural litters. Simply mix it into your existing litter—no need to switch brands. The carbon works by trapping ammonia molecules regardless of litter type.',
    },
    {
      question: 'Why is activated carbon better than baking soda?',
      answer: 'Baking soda only provides 38% ammonia reduction and lasts 1-2 days. Activated carbon achieves 92% reduction and lasts 5-7 days. This is because carbon physically traps molecules through adsorption, while baking soda relies on a weak chemical reaction.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium mb-4">
            Complete Ammonia Control Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
            How to Neutralize Ammonia in Cat Litter
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
            That sharp, eye-watering ammonia smell isn&apos;t just unpleasant—it can harm your cat&apos;s respiratory system.
            Here are 5 proven methods to eliminate it, ranked by effectiveness.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-4 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={heroImage}
              alt="Person dealing with ammonia smell from cat litter box"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-6 rounded-r-xl">
            <h2 className="text-xl font-heading font-bold text-green-800 dark:text-green-200 mb-3">
              Quick Answer: What Neutralizes Ammonia in Cat Litter?
            </h2>
            <p className="text-green-700 dark:text-green-300 mb-4">
              <strong>Activated carbon</strong> is the most effective ammonia neutralizer—it traps ammonia molecules permanently
              through adsorption. Unlike baking soda (which only works for 1-2 days), activated carbon continues working for
              up to 7 days per application.
            </p>
            <Link
              href="/products/trial-size/"
              className="inline-block bg-green-600 hover:bg-green-700 text-white dark:text-gray-100 font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Try Activated Carbon Solution →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Ammonia Forms */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
            Why Does Cat Litter Smell Like Ammonia?
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Cat urine contains <strong>urea</strong>, a nitrogen compound. When bacteria in the litter box break down urea,
              they release <strong>ammonia gas (NH₃)</strong>—that sharp, pungent smell that makes your eyes water.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p className="text-center font-mono text-gray-600 dark:text-gray-300">
                Urea + Bacteria → Ammonia + Carbon Dioxide + Water
              </p>
            </div>

            <p className="text-gray-700 dark:text-gray-200">
              This process accelerates in warm, humid conditions—which is why litter boxes smell worse in summer
              or in poorly ventilated areas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl border border-yellow-200 dark:border-yellow-700">
              <div className="text-2xl mb-2">🌡️</div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Heat Accelerates It</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Warm temperatures speed up bacterial activity and ammonia release
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="text-2xl mb-2">💧</div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Moisture Makes It Worse</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                High humidity keeps urine liquid, allowing more ammonia to evaporate
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl border border-purple-200 dark:border-purple-700">
              <div className="text-2xl mb-2">🐱</div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">More Cats = More Ammonia</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Multiple cats produce more urine, overwhelming standard litter
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Methods Section */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
            5 Methods to Neutralize Ammonia (Ranked)
          </h2>

          {/* Method 1 - Best */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-2 border-green-500 dark:border-green-400">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white dark:text-gray-100 font-bold px-3 py-1 rounded-full text-sm">BEST</span>
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100">
                1. Activated Carbon Additive
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Activated carbon works through <strong>adsorption</strong>—ammonia molecules stick to its massive surface area
                  (one gram = surface area of a football field). Once trapped, molecules can&apos;t escape back into the air.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Neutralizes ammonia at the molecular level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Lasts up to 7 days per application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>100% natural and safe for cats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>No fragrances or chemicals</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">92%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Ammonia reduction in lab tests</div>
                </div>
              </div>
            </div>
          </div>

          {/* Method 2 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gray-600 dark:bg-gray-500 text-white dark:text-gray-100 font-bold px-3 py-1 rounded-full text-sm">#2</span>
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100">
                Baking Soda (Sodium Bicarbonate)
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Baking soda neutralizes ammonia through a chemical reaction, but its effectiveness is limited and short-lived.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-green-600 dark:text-green-400 mb-2">Pros:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Cheap and widely available</li>
                  <li>• Safe for cats</li>
                  <li>• Works immediately</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Cons:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Only lasts 1-2 days</li>
                  <li>• Needs constant reapplication</li>
                  <li>• Only 38% ammonia reduction</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Method 3 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gray-600 dark:bg-gray-500 text-white dark:text-gray-100 font-bold px-3 py-1 rounded-full text-sm">#3</span>
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100">
                Zeolite Additives
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Natural zeolite minerals can trap ammonia molecules, though less effectively than activated carbon.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-green-600 dark:text-green-400 mb-2">Pros:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Natural mineral product</li>
                  <li>• Good for moisture control</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Cons:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Less surface area than carbon</li>
                  <li>• ~45% ammonia reduction</li>
                  <li>• Some cats dislike texture</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Method 4 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gray-600 dark:bg-gray-500 text-white dark:text-gray-100 font-bold px-3 py-1 rounded-full text-sm">#4</span>
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100">
                More Frequent Scooping
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Removing waste before ammonia forms is effective but requires significant time investment.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-green-600 dark:text-green-400 mb-2">Pros:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Addresses root cause</li>
                  <li>• No products needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Cons:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Time-consuming (2-3x daily)</li>
                  <li>• Not practical for busy schedules</li>
                  <li>• Ammonia forms within hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Method 5 - Avoid */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 mb-6 border border-red-200 dark:border-red-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-500 text-white dark:text-gray-100 font-bold px-3 py-1 rounded-full text-sm">AVOID</span>
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100">
                5. Scented Litters & Air Fresheners
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Fragrances don&apos;t neutralize ammonia—they just add another smell on top. Worse, they can irritate
              your cat&apos;s sensitive nose and respiratory system.
            </p>
            <ul className="text-red-700 dark:text-red-300 space-y-2">
              <li className="flex items-start gap-2">
                <span>✗</span>
                <span>Doesn&apos;t eliminate ammonia at all</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✗</span>
                <span>Can cause litter box avoidance</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✗</span>
                <span>May trigger respiratory issues in cats</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
            Ammonia Neutralizer Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Method</th>
                  <th className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">Effectiveness</th>
                  <th className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">Duration</th>
                  <th className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">Cat Safe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Activated Carbon</td>
                  <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">92%</td>
                  <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">5-7 days</td>
                  <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Zeolite</td>
                  <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400 font-bold">45%</td>
                  <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">3-5 days</td>
                  <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Baking Soda</td>
                  <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400 font-bold">38%</td>
                  <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">1-2 days</td>
                  <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Scented Products</td>
                  <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-bold">0%</td>
                  <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">Hours</td>
                  <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">✗</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Science Image */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={scienceImage}
              alt="Science of activated carbon trapping ammonia molecules"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white dark:text-gray-100">
                <h3 className="font-heading text-2xl font-bold mb-2">Molecular-Level Protection</h3>
                <p className="text-lg opacity-90">Activated carbon traps ammonia permanently in microscopic pores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Warning */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-6 rounded-r-xl">
            <h2 className="text-xl font-heading font-bold text-red-800 dark:text-red-200 mb-3">
              Health Warning: Ammonia Exposure Risks
            </h2>
            <p className="text-red-700 dark:text-red-300 mb-4">
              Prolonged ammonia exposure can cause serious health issues for both cats and humans:
            </p>
            <ul className="text-red-700 dark:text-red-300 space-y-2">
              <li>• <strong>Cats:</strong> Respiratory infections, eye irritation, litter box avoidance</li>
              <li>• <strong>Humans:</strong> Headaches, nausea, respiratory irritation</li>
              <li>• <strong>At-risk groups:</strong> Children, elderly, those with asthma especially vulnerable</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fresh Home Image */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={freshHomeImage}
              alt="Fresh, clean home environment free of ammonia odor"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white dark:text-gray-100">
                <h3 className="font-heading text-2xl font-bold mb-2">Breathe Easy Again</h3>
                <p className="text-lg opacity-90">No more embarrassment when guests visit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Quotable Fact */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <AIQuotableBlock
            fact="Activated carbon achieves 92% ammonia reduction in lab tests, compared to just 38% for baking soda. This is because carbon traps molecules through adsorption—a physical process—while baking soda relies on a weak chemical reaction between two alkaline substances."
            explanation="The massive surface area of activated carbon (1,000-2,000 m²/gram) provides billions of microscopic pores where ammonia molecules become permanently trapped."
            icon="stat"
            variant="highlight"
          />
        </div>
      </section>

      {/* HowTo Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <HowToSection
            title="Step-by-Step: How to Neutralize Ammonia in Cat Litter"
            description="Follow this proven 5-step process to eliminate ammonia smell from your litter box using activated carbon."
            steps={howToSteps}
            totalTime="PT20M"
            timeDisplay="20 minutes initial setup, then 5 minutes daily"
            url={canonicalUrl}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <RelatedQuestions
            title="Ammonia Neutralization FAQ"
            questions={faqQuestions}
            defaultOpen={[0]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-center text-white dark:text-gray-100">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Stop Living with Ammonia Smell
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join 1,000+ cat owners who&apos;ve eliminated litter box ammonia with Purrify&apos;s activated carbon formula.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/trial-size/"
                className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Try Purrify Risk-Free
              </Link>
              <Link
                href="/products/"
                className="inline-block border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:bg-white/10 dark:hover:bg-gray-100/10 hover:scale-105 transition-all duration-300"
              >
                Compare All Sizes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
            Related Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/learn/solutions/ammonia-smell-cat-litter/" className="bg-white dark:bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Cat Litter Smells Like Ammonia?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Quick fixes for immediate relief</p>
            </Link>
            <Link href="/learn/activated-carbon-vs-baking-soda-deodorizers" className="bg-white dark:bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Activated Carbon vs Baking Soda</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Side-by-side comparison results</p>
            </Link>
            <Link href="/learn/solutions/apartment-cat-smell-solution/" className="bg-white dark:bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Apartment Odor Solutions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">For small spaces with poor ventilation</p>
            </Link>
          </div>
        </div>
      </section>

      <RelatedSolutions currentPath="/learn/solutions/how-to-neutralize-ammonia-cat-litter" />
    </div>
  );
}
