import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { HowToSection } from '../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../src/components/seo/RelatedQuestions';

export default function AmmoniaSciencePage() {
  const { locale } = useTranslation();
  const seoTitle = 'Why Cat Urine Smells Like Ammonia (The Chemistry + How to Stop It)';
  const seoDescription = 'Bacteria convert urea to ammonia gas within 2-4 hours. By hour 24, it\'s unbearable. Here\'s the chemistry behind the stink—and how to break the cycle.';
  const canonicalUrl = getLocalizedUrl('/learn/ammonia-science', locale);
  const languageAlternates = buildLanguageAlternates('/learn/ammonia-science');

  const heroImage = '/images/ammonia-science.png';

  // HowTo steps for reducing ammonia
  const howToSteps = [
    {
      name: 'Understand the timeline',
      text: 'Ammonia production begins 2-4 hours after urination as bacteria colonize the urine. The smell intensifies over 24-48 hours as more urea is converted.',
      tip: 'This is why daily scooping is critical—remove waste before ammonia peaks.',
    },
    {
      name: 'Remove urine quickly',
      text: 'Scoop urine clumps as soon as possible after your cat uses the litter box. The less time bacteria have to work, the less ammonia is produced.',
    },
    {
      name: 'Control moisture and temperature',
      text: 'Bacteria thrive in warm, moist conditions. Keep litter boxes in cool, well-ventilated areas and use litter that clumps well to isolate moisture.',
    },
    {
      name: 'Add activated carbon',
      text: 'Activated carbon traps ammonia molecules as they\'re released, preventing them from reaching your nose. Add 2-3 tablespoons to your litter and refresh weekly.',
    },
    {
      name: 'Deep clean regularly',
      text: 'Empty and wash the litter box with enzyme cleaner every 1-2 weeks. This removes bacterial colonies that produce ammonia even without fresh urine.',
      tip: 'Never use bleach—it reacts with ammonia to create toxic chloramine gas.',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: 'Why does cat urine smell like ammonia?',
      answer: 'Cat urine contains urea, a nitrogen-rich waste product. When bacteria break down urea through a process called urease hydrolysis, they release ammonia gas (NH₃). This is the same sharp, pungent smell you recognize from cleaning products. The smell intensifies over time as more urea is converted to ammonia.',
    },
    {
      question: 'Why does cat urine smell stronger than other animals?',
      answer: 'Cats evolved as desert animals that conserve water by producing highly concentrated urine. This means cat urine has 2-3x more urea per volume than dog or human urine. More urea = more ammonia production = stronger smell. Male cats and senior cats often have even more concentrated urine.',
    },
    {
      question: 'Is the ammonia smell from cat litter dangerous?',
      answer: 'Yes, at high concentrations. Ammonia levels above 25 ppm can cause eye and respiratory irritation in both humans and cats. Cat litter boxes can produce 5-50 ppm depending on cleanliness. Cats are especially vulnerable since they\'re close to the box and have sensitive respiratory systems.',
    },
    {
      question: 'Why does my litter box smell worse in summer?',
      answer: 'Bacteria multiply faster in warm conditions, accelerating ammonia production. At 30°C (86°F), bacterial activity can be 2-3x higher than at 20°C (68°F). Summer humidity also keeps urine moist longer, providing ideal conditions for the bacteria that convert urea to ammonia.',
    },
    {
      question: 'Can diet affect how strong cat urine smells?',
      answer: 'Yes. High-protein diets produce more nitrogen waste (urea) in urine, leading to stronger ammonia smell. Poor kidney function (common in senior cats) also concentrates urine further. If your cat\'s urine suddenly smells much stronger, consult a vet—it could indicate health issues.',
    },
    {
      question: 'How long does it take for cat urine to start smelling like ammonia?',
      answer: 'Ammonia production begins within 2-4 hours of urination as bacteria colonize the urine. The smell becomes noticeable to humans within 6-12 hours and peaks around 24-48 hours. This is why daily scooping is essential—you\'re racing against bacterial metabolism.',
    },
  ];

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: `https://www.purrify.ca${heroImage}`,
              width: 1200,
              height: 675,
              alt: 'The science of ammonia production in cat litter',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'why cat urine smells like ammonia, cat pee ammonia smell, urea to ammonia, cat litter ammonia science, why cat litter smells, ammonia from cat urine',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/learn/ammonia-science"
        options={{
          category: 'Pet Science',
          keywords: ['ammonia', 'cat urine', 'urea', 'bacteria', 'odor science'],
          datePublished: '2024-01-20T12:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 2000,
          readingTime: 9
        }}
      />

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
                Pet Science
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Why Cat Urine Smells Like Ammonia
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                The sharp ammonia smell in your litter box isn&apos;t the urine itself—it&apos;s a byproduct of
                bacterial metabolism. Understanding this chemistry is the key to eliminating it.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Molecular diagram showing urea converting to ammonia"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* Key Fact */}
            <AIQuotableBlock
              fact="Cat urine doesn't immediately smell like ammonia. The smell develops over 2-4 hours as bacteria break down urea (a nitrogen compound) into ammonia gas. This is why fresh accidents don't smell as bad as day-old litter."
              explanation="The enzyme urease, produced by bacteria, catalyzes the breakdown of urea into ammonia (NH₃) and carbon dioxide (CO₂)."
              icon="science"
              variant="highlight"
            />
          </div>
        </section>

        {/* The Chemistry */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              The Chemistry: From Urea to Ammonia
            </h2>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">The Urease Hydrolysis Reaction</h3>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
                <p className="text-center font-mono text-lg text-gray-700 dark:text-gray-200 mb-4">
                  (NH₂)₂CO + H₂O → 2NH₃ + CO₂
                </p>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Urea + Water → <strong>Ammonia</strong> + Carbon Dioxide
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-200">
                This reaction is catalyzed by <strong>urease</strong>, an enzyme produced by bacteria commonly found in
                soil, water, and animal environments. The same bacteria quickly colonize cat litter boxes, where they
                find an abundant supply of urea from cat urine.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">What is Urea?</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Urea is the primary nitrogen waste product in mammal urine. When cats metabolize protein from their
                  food, the nitrogen must be excreted. The liver converts toxic ammonia into urea, which is safer to
                  store and transport via the bloodstream to the kidneys.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Chemical formula: (NH₂)₂CO</li>
                  <li>• Contains 46% nitrogen by weight</li>
                  <li>• Water-soluble and odorless when pure</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-700">
                <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">What is Ammonia?</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Ammonia (NH₃) is a colorless gas with a characteristic pungent smell. It&apos;s highly alkaline (pH ~11.6)
                  and irritating to mucous membranes. The human nose can detect ammonia at concentrations as low as 25 ppm.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Chemical formula: NH₃</li>
                  <li>• Lighter than air (rises upward)</li>
                  <li>• Highly soluble in water</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Bacterial Process */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              The Bacterial Process: A Timeline
            </h2>

            <AIQuotableBlock
              fact="Ammonia production from cat urine peaks between 24-48 hours after urination. At this point, bacterial colonies have fully established and are converting urea at maximum efficiency. This is why two-day-old litter smells dramatically worse than one-day-old litter."
              explanation="Daily scooping removes waste before ammonia production peaks."
              icon="stat"
              variant="default"
            />

            <div className="mt-8 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-green-500 dark:border-green-400">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-green-500 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">0-2 Hours</span>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Fresh Urine</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  Urine is deposited and begins to cool. Bacteria from the environment start to colonize.
                  Little to no ammonia smell is detectable at this stage.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-yellow-500 dark:border-yellow-400">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-yellow-500 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">2-6 Hours</span>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Bacterial Colonization</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  Bacteria multiply rapidly in the nutrient-rich urine. Urease enzymes begin breaking down urea.
                  A faint ammonia smell may be detectable to sensitive noses.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-orange-500 dark:border-orange-400">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-orange-500 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">6-24 Hours</span>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Ammonia Buildup</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  Ammonia production accelerates. The smell becomes clearly noticeable to humans.
                  Litter box odor begins to spread to surrounding areas.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-red-500 dark:border-red-400">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-red-500 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">24-48 Hours</span>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Peak Ammonia</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  Maximum bacterial activity. Ammonia levels can reach 50+ ppm near the litter box.
                  The smell is overwhelming and can permeate entire rooms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Cat Urine is Especially Strong */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Why Cat Urine Smells Stronger Than Other Animals
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              If you&apos;ve owned both cats and dogs, you&apos;ve probably noticed that cat urine has a much more
              intense smell. This isn&apos;t just your imagination—there are biological reasons for this difference.
            </p>

            <AIQuotableBlock
              fact="Cats evolved as desert animals that conserve water by producing highly concentrated urine. Cat urine contains 2-3x more urea per volume than dog urine, which means 2-3x more ammonia is produced during bacterial breakdown."
              explanation="This water-conservation adaptation made sense in the desert but creates challenges for indoor cat owners."
              icon="science"
              variant="highlight"
            />

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="text-3xl mb-3">🏜️</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Desert Evolution</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cats evolved to conserve water in arid environments, producing highly concentrated urine
                  with minimal water content.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="text-3xl mb-3">🥩</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Obligate Carnivores</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  As obligate carnivores, cats eat high-protein diets that produce more nitrogen waste
                  (urea) than omnivore diets.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Felinine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cat urine contains felinine, a unique amino acid that breaks down into sulfur compounds,
                  adding to the distinctive odor.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-6 rounded-r-xl">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Special Cases: Even Stronger Smell</h3>
              <ul className="text-gray-700 dark:text-gray-200 space-y-2">
                <li>• <strong>Unneutered male cats:</strong> Produce hormones that make urine smell especially pungent for territorial marking</li>
                <li>• <strong>Senior cats:</strong> Often have reduced kidney function, producing more concentrated urine</li>
                <li>• <strong>Cats with UTIs or kidney disease:</strong> May have abnormal urine composition with stronger odor</li>
                <li>• <strong>Dehydrated cats:</strong> Produce more concentrated urine with higher urea content</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Health Concerns */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Health Concerns: Ammonia Exposure Risks
            </h2>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">Ammonia Exposure Levels</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="bg-green-500 text-white dark:text-gray-100 px-3 py-1 rounded text-sm font-bold w-24 text-center">5-25 ppm</span>
                  <span className="text-gray-700 dark:text-gray-200">Detection threshold - smell is noticeable</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-yellow-500 text-white dark:text-gray-100 px-3 py-1 rounded text-sm font-bold w-24 text-center">25-50 ppm</span>
                  <span className="text-gray-700 dark:text-gray-200">Eye and respiratory irritation begins</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-orange-500 text-white dark:text-gray-100 px-3 py-1 rounded text-sm font-bold w-24 text-center">50-100 ppm</span>
                  <span className="text-gray-700 dark:text-gray-200">Significant irritation, headaches, nausea</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-red-500 text-white dark:text-gray-100 px-3 py-1 rounded text-sm font-bold w-24 text-center">100+ ppm</span>
                  <span className="text-gray-700 dark:text-gray-200">Dangerous - can cause chemical burns</span>
                </div>
              </div>

              <p className="mt-6 text-gray-700 dark:text-gray-200 text-sm">
                <strong>Note:</strong> Poorly maintained litter boxes can reach 50+ ppm near the box surface. Cats breathing
                at this level regularly may develop respiratory issues.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Risks for Cats</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Upper respiratory infections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Eye irritation and discharge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Litter box avoidance (accidents)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Chronic respiratory inflammation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Risks for Humans</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Headaches and fatigue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Respiratory irritation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Worsening of asthma symptoms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Eye and throat irritation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* HowTo Section */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <HowToSection
              title="How to Reduce Ammonia in Your Litter Box"
              description="Follow these steps to minimize ammonia production and keep your home smelling fresh."
              steps={howToSteps}
              totalTime="PT15M"
              timeDisplay="15 minutes for setup, daily maintenance"
              url={canonicalUrl}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <RelatedQuestions
              title="Ammonia & Cat Urine FAQ"
              questions={faqQuestions}
              defaultOpen={[0]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-center text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Stop Ammonia at the Source
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Purrify&apos;s activated carbon traps ammonia molecules before they reach your nose.
                No masking, no fragrances—just science-based odor elimination.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Try Purrify Today
                </Link>
                <Link
                  href="/learn/how-activated-carbon-works"
                  className="inline-block border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:bg-white/10 dark:hover:bg-gray-100/10 hover:scale-105 transition-all duration-300"
                >
                  How Carbon Traps Ammonia
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/learn/solutions/ammonia-smell-cat-litter" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-[#FF3131]/20 dark:border-[#FF5050]/20">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Fix Ammonia Smell Fast</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Quick solutions for immediate relief</p>
              </Link>
              <Link href="/learn/cat-litter-ammonia-health-risks" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ammonia Health Risks</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Safe exposure levels explained</p>
              </Link>
              <Link href="/blog/how-to-neutralize-ammonia-cat-litter" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">5 Neutralization Methods</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Ranked by effectiveness</p>
              </Link>
              <Link href="/learn/how-activated-carbon-works" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">How Activated Carbon Works</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">The science of odor adsorption</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
