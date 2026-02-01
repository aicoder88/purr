import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { HowToSection } from '../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../src/components/seo/RelatedQuestions';

export default function HowActivatedCarbonWorksPage() {
  const { locale } = useTranslation();
  const seoTitle = 'How Does Activated Carbon Work? Complete Science Guide';
  const seoDescription = 'Activated carbon traps odor molecules through adsorption—a physical process where molecules stick to its massive surface area. One gram = 3,000 m² surface. Here\'s exactly how it works.';
  const canonicalUrl = getLocalizedUrl('/learn/how-activated-carbon-works', locale);
  const languageAlternates = buildLanguageAlternates('/learn/how-activated-carbon-works');

  const heroImage = '/images/ammonia-science.webp';

  // HowTo steps for using activated carbon
  const howToSteps = [
    {
      name: 'Understand what activated carbon is',
      text: 'Activated carbon is regular carbon (from coconut shells, wood, or coal) that has been processed at high temperatures with steam or chemicals to create millions of microscopic pores. This "activation" dramatically increases surface area.',
    },
    {
      name: 'Learn about the adsorption process',
      text: 'When air passes through activated carbon, odor molecules (like ammonia) are attracted to the carbon surface by Van der Waals forces. They stick to the pore walls and become trapped—this is adsorption (not absorption).',
      tip: 'Adsorption is surface-level trapping; absorption means soaking into the material like a sponge.',
    },
    {
      name: 'Maximize surface area contact',
      text: 'For best results with cat litter, mix activated carbon into the top layer where it will contact fresh waste. The more surface contact between carbon and air, the more odor molecules get trapped.',
    },
    {
      name: 'Replace when saturated',
      text: 'Activated carbon has a finite capacity—once all pores are filled with trapped molecules, it stops working. In litter boxes, refresh every 5-7 days or when odor returns.',
      tip: 'You can\'t "recharge" consumer-grade activated carbon at home. Replace, don\'t reuse.',
    },
    {
      name: 'Choose the right type for your application',
      text: 'For cat litter odor, coconut shell activated carbon is ideal—it has the highest surface area and smallest pores, perfect for trapping ammonia molecules.',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: 'How does activated carbon work to remove odors?',
      answer: 'Activated carbon removes odors through adsorption—a physical process where odor molecules stick to the carbon\'s surface. The carbon\'s massive internal surface area (up to 3,000 m² per gram) provides billions of binding sites where molecules like ammonia become permanently trapped. Unlike air fresheners that mask odors, activated carbon physically removes odor molecules from the air.',
    },
    {
      question: 'What is the difference between adsorption and absorption?',
      answer: 'Adsorption is a surface phenomenon where molecules stick to the outside of a material. Absorption means molecules are soaked up and distributed throughout a material (like water in a sponge). Activated carbon uses adsorption—odor molecules cling to its porous surface rather than being absorbed into it. This distinction matters because adsorbed molecules are held more securely.',
    },
    {
      question: 'Why does activated carbon have such a large surface area?',
      answer: 'Activated carbon is processed at 800-1000°C with steam or chemicals, which creates millions of microscopic pores throughout its structure. These pores range from 1-1000 nanometers in diameter. When you add up all the internal surface area of these pores, a single gram of activated carbon can have 1,000-3,000 square meters of surface area—roughly the size of half a football field.',
    },
    {
      question: 'Is coconut shell activated carbon better than other types?',
      answer: 'For odor control applications like cat litter, yes. Coconut shell carbon has the highest percentage of micropores (smallest pores), which are ideal for trapping small gas molecules like ammonia. It\'s also harder and more durable than wood-based or coal-based carbon, meaning it won\'t break down into dust as easily.',
    },
    {
      question: 'How long does activated carbon last before it stops working?',
      answer: 'Activated carbon has a finite capacity—once its pores are filled with trapped molecules, it becomes "saturated" and stops working. In a cat litter box, this typically happens after 5-7 days of continuous use. Unlike some materials, consumer-grade activated carbon cannot be effectively recharged at home. It must be replaced.',
    },
    {
      question: 'Can activated carbon remove all types of odors?',
      answer: 'Activated carbon is most effective at trapping organic compounds and gases with larger molecules. It excels at removing ammonia, hydrogen sulfide (rotten egg smell), and volatile organic compounds (VOCs). It\'s less effective for very small molecules like carbon monoxide or for ionic compounds. For cat litter, it\'s ideal because ammonia molecules adsorb very well.',
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
              alt: 'How activated carbon works - molecular diagram',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'how does activated carbon work, activated carbon adsorption, activated carbon surface area, how activated carbon removes odors, activated carbon for cat litter, coconut shell activated carbon',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/learn/how-activated-carbon-works"
        options={{
          category: 'Science & Technology',
          keywords: ['activated carbon', 'adsorption', 'odor removal', 'surface area'],
          datePublished: '2024-01-20T12:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 2500,
          readingTime: 12
        }}
      />

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                Science Deep Dive
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                How Does Activated Carbon Work?
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                The complete science behind activated carbon&apos;s odor-eliminating power—from molecular structure
                to practical applications in cat litter and beyond.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Activated carbon molecular structure showing porous surface"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* Key Fact Box */}
            <AIQuotableBlock
              fact="One gram of activated carbon has a surface area of 1,000-3,000 square meters—equivalent to half a football field. This massive surface area is what makes it so effective at trapping odor molecules."
              explanation="This surface area comes from millions of microscopic pores created during the activation process at temperatures exceeding 800°C."
              icon="science"
              variant="highlight"
            />
          </div>
        </section>

        {/* What Is Activated Carbon */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              What Is Activated Carbon?
            </h2>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Activated carbon (also called activated charcoal) is a form of carbon that has been processed to have
                extremely small pores, dramatically increasing its surface area. While regular charcoal might seem porous,
                activated carbon takes this to an extreme—creating an internal structure with surface area thousands of
                times greater than its external dimensions.
              </p>

              <p className="text-gray-700 dark:text-gray-200 mb-6">
                The &quot;activation&quot; process involves heating carbon-rich materials (coconut shells, wood, coal, or peat)
                to very high temperatures (800-1000°C) in the presence of steam, oxygen, or chemical activating agents.
                This process burns away internal carbon atoms, creating an intricate network of pores throughout the material.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Common Source Materials</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 dark:text-green-400 text-xl">1.</span>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">Coconut Shells</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Highest micropore content, ideal for gas adsorption</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 dark:text-green-400 text-xl">2.</span>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">Wood</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Good for decolorization, larger pores</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 dark:text-green-400 text-xl">3.</span>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">Coal</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Most common industrial source</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 dark:text-green-400 text-xl">4.</span>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">Bamboo</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Sustainable option, growing in popularity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Adsorption vs Absorption */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Adsorption vs. Absorption: The Critical Difference
            </h2>

            <AIQuotableBlock
              fact="Activated carbon works through adsorption, not absorption. In adsorption, molecules stick to the surface; in absorption, they soak into the material. This distinction explains why activated carbon traps odors permanently rather than just temporarily holding them."
              explanation="Think of adsorption like sticky tape (molecules adhere to surface) vs. absorption like a sponge (liquid soaks throughout)."
              icon="science"
              variant="default"
            />

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Adsorption (What Carbon Does)</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">•</span>
                    <span>Molecules stick to the <strong>surface</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">•</span>
                    <span>Held by Van der Waals forces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">•</span>
                    <span>Surface area determines capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">•</span>
                    <span>Molecules are trapped, not dissolved</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200 mb-4">Absorption (Like a Sponge)</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 dark:text-orange-400">•</span>
                    <span>Molecules soak <strong>into</strong> the material</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 dark:text-orange-400">•</span>
                    <span>Distributed throughout volume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 dark:text-orange-400">•</span>
                    <span>Volume determines capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 dark:text-orange-400">•</span>
                    <span>Can often be squeezed out</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Why This Matters for Odor Control</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Because activated carbon uses adsorption, odor molecules become physically bound to the carbon surface.
                They can&apos;t evaporate back into the air like they might from an absorbent material. Once trapped,
                ammonia and other odor molecules stay trapped until the carbon is disposed of. This is why activated
                carbon provides permanent odor removal, not temporary masking.
              </p>
            </div>
          </div>
        </section>

        {/* The Pore Structure */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Understanding Pore Structure
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              Activated carbon&apos;s effectiveness depends entirely on its pore structure. During activation, three types
              of pores are created, each serving different purposes:
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-green-500 text-white dark:text-gray-100 font-bold px-3 py-1 rounded-full text-sm">Micropores</span>
                  <span className="text-gray-600 dark:text-gray-300">&lt; 2 nanometers</span>
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  <strong>Best for:</strong> Small gas molecules like ammonia (NH₃), hydrogen sulfide (H₂S), and VOCs
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Micropores provide the majority of surface area and are responsible for most odor adsorption.
                  Coconut shell carbon has the highest micropore content.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-gray-500 dark:bg-gray-400 text-white dark:text-gray-100 font-bold px-3 py-1 rounded-full text-sm">Mesopores</span>
                  <span className="text-gray-600 dark:text-gray-300">2-50 nanometers</span>
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  <strong>Best for:</strong> Medium-sized molecules, dyes, some organic compounds
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Mesopores act as transport channels, allowing molecules to reach the micropores deep within the carbon structure.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-gray-400 dark:bg-gray-500 text-white dark:text-gray-100 font-bold px-3 py-1 rounded-full text-sm">Macropores</span>
                  <span className="text-gray-600 dark:text-gray-300">&gt; 50 nanometers</span>
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  <strong>Best for:</strong> Large molecules, bacteria, some liquids
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Macropores serve as entry points and highways, allowing air and water to flow through the carbon structure.
                </p>
              </div>
            </div>

            <AIQuotableBlock
              fact="Ammonia molecules (NH₃) have a diameter of approximately 0.26 nanometers, making micropores the perfect trap. Coconut shell activated carbon has the highest micropore content of any carbon source, which is why it's ideal for cat litter odor control."
              explanation="The match between pore size and molecule size determines adsorption efficiency."
              icon="stat"
              variant="highlight"
            />
          </div>
        </section>

        {/* How It Works for Cat Litter */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How Activated Carbon Eliminates Cat Litter Odor
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">The Ammonia Problem</h3>

              <p className="text-gray-700 dark:text-gray-200 mb-4">
                Cat urine contains urea, a nitrogen compound. When bacteria in the litter box break down urea,
                they produce ammonia gas (NH₃)—the sharp, pungent smell that makes litter boxes unpleasant.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-center font-mono text-gray-600 dark:text-gray-300">
                  Urea (from urine) + Bacteria → <strong>Ammonia (NH₃)</strong> + CO₂ + H₂O
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-200">
                This process begins within 2-4 hours of urination and intensifies over time. Traditional clay litters
                can clump urine but cannot stop ammonia from being released into the air.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">The Activated Carbon Solution</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white dark:text-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Contact</h4>
                    <p className="text-gray-700 dark:text-gray-200">Ammonia molecules rise from the litter and encounter activated carbon particles</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white dark:text-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Entry</h4>
                    <p className="text-gray-700 dark:text-gray-200">Molecules enter through macropores and travel through mesopores to reach micropores</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white dark:text-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Adsorption</h4>
                    <p className="text-gray-700 dark:text-gray-200">Van der Waals forces cause ammonia molecules to stick to micropore walls</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white dark:text-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Permanent Trapping</h4>
                    <p className="text-gray-700 dark:text-gray-200">Once adsorbed, molecules cannot escape back into the air—odor is eliminated</p>
                  </div>
                </div>
              </div>
            </div>

            <AIQuotableBlock
              fact="Laboratory tests show activated carbon achieves 92% ammonia reduction in cat litter applications, compared to just 38% for baking soda. This 10x effectiveness difference is due to carbon's physical adsorption mechanism versus baking soda's weak chemical reaction."
              explanation="Baking soda and ammonia are both alkaline, so they don't neutralize each other effectively."
              icon="stat"
              variant="highlight"
            />
          </div>
        </section>

        {/* Comparison with Other Methods */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Activated Carbon vs. Other Odor Control Methods
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Method</th>
                    <th className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">Mechanism</th>
                    <th className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">Effectiveness</th>
                    <th className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Activated Carbon</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">Physical adsorption</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">92%</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">5-7 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Baking Soda</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">Chemical reaction</td>
                    <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400 font-bold">38%</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">1-2 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Zeolite</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">Ion exchange</td>
                    <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400 font-bold">45%</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">3-5 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Air Fresheners</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">Masking only</td>
                    <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-bold">0%</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">Hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-700">
                <h3 className="font-bold text-red-800 dark:text-red-200 mb-3">Why Baking Soda Falls Short</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Baking soda (sodium bicarbonate) is alkaline with a pH of ~8.4. Ammonia is also alkaline with a pH of ~11.6.
                  Alkaline substances don&apos;t neutralize each other effectively—they need an acid-base reaction. Baking soda
                  provides minimal, short-term odor absorption but cannot trap ammonia like activated carbon does.
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3">Where Zeolite Comes Up Short</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Zeolite works through ion exchange, swapping ions with ammonia molecules. While effective for moisture
                  control, zeolite has less surface area than activated carbon and its ion exchange capacity depletes
                  faster. It also doesn&apos;t trap organic compounds as effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HowTo Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <HowToSection
              title="How to Use Activated Carbon for Odor Control"
              description="Follow these steps to maximize the effectiveness of activated carbon in any odor control application."
              steps={howToSteps}
              totalTime="PT10M"
              timeDisplay="10 minutes to set up"
              url={canonicalUrl}
            />
          </div>
        </section>

        {/* Applications Beyond Cat Litter */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Other Applications of Activated Carbon
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              The same adsorption properties that make activated carbon effective for cat litter odor control
              are used across many industries:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="text-2xl mb-2">💧</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Water Filtration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Removes chlorine, sediment, VOCs, and improves taste in home and industrial water treatment
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="text-2xl mb-2">🌬️</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Air Purification</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  HVAC filters, air purifiers, and industrial ventilation systems
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="text-2xl mb-2">😷</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Gas Masks</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Military and industrial respirators use activated carbon to filter toxic gases
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="text-2xl mb-2">🏥</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Medical Treatment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Emergency treatment for certain poisonings and drug overdoses
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="text-2xl mb-2">🍷</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Food & Beverage</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Decolorizing sugar, purifying spirits, and removing impurities from food products
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="text-2xl mb-2">⛽</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Fuel Vapor Recovery</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Capturing gasoline vapors at gas stations and in vehicle fuel systems
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <RelatedQuestions
              title="Frequently Asked Questions About Activated Carbon"
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
                Experience Activated Carbon in Action
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Purrify uses premium coconut shell activated carbon—the most effective type for trapping
                ammonia and other litter box odors.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Try Purrify Today
                </Link>
                <Link
                  href="/learn/ammonia-science"
                  className="inline-block border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:bg-white/10 dark:hover:bg-gray-100/10 hover:scale-105 transition-all duration-300"
                >
                  Learn About Ammonia
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
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/learn/ammonia-science" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Why Cat Urine Smells Like Ammonia</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">The science behind the smell</p>
              </Link>
              <Link href="/learn/solutions/how-to-neutralize-ammonia-cat-litter" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">5 Methods to Neutralize Ammonia</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Ranked by effectiveness</p>
              </Link>
              <Link href="/learn/activated-carbon-vs-baking-soda-deodorizers" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Activated Carbon vs Baking Soda</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Head-to-head comparison</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
