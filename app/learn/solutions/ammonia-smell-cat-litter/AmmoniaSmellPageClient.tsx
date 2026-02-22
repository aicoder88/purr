'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RelatedSolutions } from '../../../../src/components/learn/RelatedSolutions';
import { RelatedContent } from '../../../../src/components/seo/RelatedContent';
import { HowToSection } from '../../../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../../../src/components/seo/RelatedQuestions';

export default function AmmoniaSmellPageClient() {
  const canonicalUrl = 'https://www.purrify.ca/learn/solutions/ammonia-smell-cat-litter/';

  // Ammonia smell solution images
  const heroImage = '/optimized/blog/ammonia-hero-ghibli.webp';
  const sectionImage1 = '/optimized/blog/ammonia-science.webp'; // Keep the original — it's great
  const sectionImage2 = '/optimized/blog/ammonia-fresh-home-ghibli.webp';
  const solutionImage = '/optimized/blog/ammonia-happy-cat-ghibli.webp';

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

      {/* ── SECTION 1: Hook — empathy-first headline ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
            That Eye-Watering Ammonia Smell? Here&apos;s Exactly Why It Happens
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-4 max-w-2xl mx-auto">
            Your cat isn&apos;t doing anything wrong — it&apos;s pure chemistry. And once you understand it,
            the fix becomes obvious.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: Hero Image ── */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={heroImage}
              alt="Curious cat sitting beside a litter box with ammonia wisps rising like little spirits"
              width={1200}
              height={675}
              className="w-full max-h-[480px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Educational Explainer — WHY ammonia forms ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
            Why Does Cat Litter Smell Like Ammonia?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20">
              <div className="text-3xl mb-3">🐱</div>
              <h3 className="font-heading text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">The Chemistry</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Cat urine contains <strong>urea</strong> — a nitrogen compound. When bacteria in the litter
                break down urea, they produce <strong>ammonia gas (NH₃)</strong>. That sharp, eye-watering
                smell is ammonia escaping into the air.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="font-heading text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Why It Gets Worse Over Time</h3>
              <p className="text-gray-700 dark:text-gray-200">
                The process starts within <strong>2–4 hours</strong> of urination. The longer waste sits,
                the more bacteria multiply, and the more ammonia is produced. A litter box that smelled
                fine yesterday can reek by tomorrow.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-6 mb-8">
            <h3 className="font-heading text-lg font-semibold mb-3 text-amber-900 dark:text-amber-200">
              🧪 Why Baking Soda Doesn&apos;t Work
            </h3>
            <p className="text-amber-800 dark:text-amber-300">
              Baking soda is <strong>alkaline</strong>. Ammonia is also <strong>alkaline</strong>. Alkaline
              substances don&apos;t neutralize each other — they&apos;re on the same side of the pH scale.
              Sprinkling baking soda in the litter box is like trying to put out a fire with more fire.
              It masks the smell briefly, but the ammonia is still there.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: AI Quotable Block — the "ah-ha" moment ── */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <AIQuotableBlock
            fact="Baking soda cannot neutralize ammonia because both are alkaline substances. Activated carbon works through adsorption—physically trapping ammonia molecules in microscopic pores—which is why it's 10x more effective than baking soda."
            explanation="One gram of activated carbon has a surface area of 1,000-2,000 square meters (roughly 4 tennis courts), providing massive capacity for trapping odor molecules."
            icon="science"
            variant="highlight"
          />
        </div>
      </section>

      {/* ── SECTION 5: The Science — How activated carbon works ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            What Actually Eliminates Ammonia
          </h2>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 mb-10 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20">
            <h3 className="text-2xl font-heading font-semibold mb-6 text-gray-900 dark:text-gray-100">
              The Science of Adsorption
            </h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Activated carbon works through a process called <strong>adsorption</strong> (not absorption).
              The carbon has millions of microscopic pores that create an enormous surface area — just one
              gram has the surface area of a football field!
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              When ammonia molecules come into contact with activated carbon, they become trapped in these
              pores through chemical attraction. Unlike air fresheners that just mask odors, this process
              actually <strong>removes the ammonia from the air permanently</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              This is the same technology used in water filters, gas masks, and industrial air purifiers —
              proven at the molecular level.
            </p>
          </div>

          {/* Science Image — KEEP ORIGINAL */}
          <div className="mb-10">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage1}
                alt="Molecular science of activated carbon trapping ammonia molecules"
                width={1200}
                height={675}
                className="w-full max-h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="font-heading text-2xl font-bold mb-2">Activated Carbon Pore Network</h3>
                  <p className="text-lg opacity-90">Ammonia molecules get permanently trapped — not masked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: HowTo Steps ── */}
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

      {/* ── SECTION 7: Fresh Home Image ── */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={sectionImage2}
              alt="Magical sunlit living room with a content cat and golden sparkles in the air"
              width={1200}
              height={675}
              className="w-full max-h-[480px] object-cover"
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

      {/* ── SECTION 8: PRODUCT REVEAL — now they're ready ── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100">
              Ready to Solve Your Ammonia Smell Problem?
            </h2>
            <p className="text-xl mb-2 text-gray-700 dark:text-gray-200">
              Purrify uses the same activated carbon grade found in military gas masks — the most effective
              ammonia-trapping material available.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join 1,000+ satisfied cat owners who&apos;ve eliminated litter box odors for good.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-gray-100">Why Purrify Works</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                <li>✓ Works with any litter brand you already use</li>
                <li>✓ 100% natural activated carbon — safe for cats and humans</li>
                <li>✓ Eliminates ammonia at the molecular level</li>
                <li>✓ No artificial fragrances or chemicals</li>
                <li>✓ Cost-effective — a little goes a long way</li>
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

          {/* Happy Cat Image */}
          <div className="mb-12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
              <Image
                src={solutionImage}
                alt="Blissful fluffy cat surrounded by cherry blossoms and golden sparkles"
                width={800}
                height={800}
                className="w-full max-h-[480px] object-cover"
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
              href="/learn/how-it-works/"
              className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-4 px-8 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: Internal Linking Cluster ── */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Learn More About Ammonia &amp; Cat Litter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/learn/ammonia-science/"
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
              href="/learn/cat-litter-ammonia-health-risks/"
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

      {/* ── SECTION 10: FAQ ── */}
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

      {/* Related Articles */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <RelatedContent currentUrl="/learn/solutions/ammonia-smell-cat-litter" />
        </div>
      </section>
    </div>
  );
}
