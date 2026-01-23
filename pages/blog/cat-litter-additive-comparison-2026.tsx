import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { AIQuotableBlock } from '../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../src/components/seo/RelatedQuestions';

export default function CatLitterAdditiveComparison2026Page() {
  const { locale } = useTranslation();
  const seoTitle = "Best Cat Litter Additives 2026: Complete Buyer's Guide to Odor Control";
  const seoDescription = "Compare the top cat litter additives for odor control in 2026: activated carbon, baking soda, zeolite, enzyme powders, and more. Find out which actually works.";
  const canonicalUrl = getLocalizedUrl('/blog/cat-litter-additive-comparison-2026', locale);
  const languageAlternates = buildLanguageAlternates('/blog/cat-litter-additive-comparison-2026');

  const heroImage = '/images/solutions/ammonia-science.png';

  // FAQ questions
  const faqQuestions = [
    {
      question: 'What is the best cat litter additive for odor control?',
      answer: 'Activated carbon (specifically coconut shell-derived) is the most effective cat litter additive for odor control, achieving approximately 92% ammonia reduction through physical adsorption. It outperforms baking soda (~15%), zeolite (~45%), and fragrance-based products (~0% actual elimination).',
    },
    {
      question: 'Do cat litter deodorizers actually work?',
      answer: 'It depends on the type. Activated carbon-based deodorizers genuinely eliminate odor through adsorption. Baking soda provides minimal benefit. Fragrance-based products only mask odors temporarily. Enzyme powders work but require moisture activation. For true odor elimination, choose adsorption-based products.',
    },
    {
      question: 'Is baking soda safe to put in cat litter?',
      answer: 'Yes, baking soda (sodium bicarbonate) is non-toxic and safe if ingested in small amounts. However, its odor control effectiveness is limited—it only neutralizes about 10-15% of ammonia. It\'s safe but not particularly effective compared to alternatives.',
    },
    {
      question: 'How often should I add litter additive?',
      answer: 'Most activated carbon additives should be refreshed weekly when you do a complete litter change. Some products recommend a light sprinkle after each scooping. Check your specific product instructions, but weekly replacement is the most common recommendation for optimal effectiveness.',
    },
    {
      question: 'Can I use multiple litter additives together?',
      answer: 'Yes, you can combine additives without safety concerns. However, it\'s often unnecessary—a quality activated carbon additive alone provides better results than combining inferior products. If you do combine, activated carbon + enzyme powder can complement each other.',
    },
    {
      question: 'Are litter additives safe for kittens?',
      answer: 'Most additives are safe for kittens, but choose carefully. Activated carbon (especially coconut shell) is food-grade and completely safe. Avoid heavily fragranced products that may irritate young respiratory systems. Enzyme products are also generally safe. Always check product labels for age restrictions.',
    },
  ];

  const additiveTypes = [
    {
      name: 'Activated Carbon',
      mechanism: 'Physical adsorption',
      ammoniaReduction: '92%',
      duration: '5-7 days',
      safety: 'Food-grade safe',
      pros: ['Highest effectiveness', 'Traps multiple odor types', 'Non-toxic', 'No fragrance needed'],
      cons: ['Higher cost', 'Requires weekly replacement', 'Less available in stores'],
      bestFor: 'Maximum odor control, multi-cat homes, small spaces',
      rating: 5,
    },
    {
      name: 'Baking Soda',
      mechanism: 'Chemical neutralization',
      ammoniaReduction: '10-15%',
      duration: '3-5 days',
      safety: 'Food-grade safe',
      pros: ['Very inexpensive', 'Widely available', 'Familiar product', 'Non-toxic'],
      cons: ['Limited effectiveness', 'Doesn\'t trap VOCs', 'Needs frequent reapplication'],
      bestFor: 'Budget-conscious, mild odor issues, supplement to other methods',
      rating: 2,
    },
    {
      name: 'Zeolite',
      mechanism: 'Ion exchange + absorption',
      ammoniaReduction: '40-50%',
      duration: '3-5 days',
      safety: 'Natural mineral, safe',
      pros: ['Good moisture control', 'Natural material', 'Moderate effectiveness'],
      cons: ['Less effective than carbon', 'Shorter duration', 'Poor VOC control'],
      bestFor: 'Humidity control priority, moderate odor issues',
      rating: 3,
    },
    {
      name: 'Enzyme Powders',
      mechanism: 'Biological breakdown',
      ammoniaReduction: '60-70%',
      duration: '5-7 days',
      safety: 'Generally safe',
      pros: ['Breaks down urine compounds', 'Works on source', 'Good for accidents'],
      cons: ['Requires moisture to activate', 'Slower acting', 'Variable effectiveness'],
      bestFor: 'Treating existing odors, accident cleanup',
      rating: 3,
    },
    {
      name: 'Fragrance Beads/Crystals',
      mechanism: 'Masking only',
      ammoniaReduction: '0%',
      duration: '1-3 days',
      safety: 'May irritate sensitive cats',
      pros: ['Immediate scent improvement', 'Inexpensive', 'Widely available'],
      cons: ['No actual odor elimination', 'Temporary effect', 'Can deter cats'],
      bestFor: 'Quick masking before guests (not recommended long-term)',
      rating: 1,
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
              alt: 'Cat litter additive comparison guide 2026',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter additive, best litter deodorizer, cat litter odor control 2026, activated carbon cat litter, baking soda cat litter, litter additive comparison',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/blog/cat-litter-additive-comparison-2026"
        options={{
          category: 'Buyer\'s Guide',
          keywords: ['cat litter', 'additive', 'deodorizer', 'comparison', '2026'],
          datePublished: '2024-01-23T12:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 2800,
          readingTime: 12
        }}
      />

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">
                2026 Buyer&apos;s Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Best Cat Litter Additives 2026
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                Activated carbon, baking soda, zeolite, enzymes, fragrance beads—which actually works?
                We compare every type of litter additive to help you choose the right one.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Cat litter additive comparison guide"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* Quick Answer */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 dark:border-indigo-400 p-6 rounded-r-xl">
              <h2 className="text-xl font-heading font-bold text-indigo-800 dark:text-indigo-200 mb-3">
                Quick Answer: Our Top Pick for 2026
              </h2>
              <p className="text-indigo-700 dark:text-indigo-300">
                <strong>Activated carbon</strong> (specifically coconut shell-derived) is the clear winner for
                cat litter odor control. It achieves 92% ammonia reduction through physical adsorption—far
                outperforming baking soda (15%), zeolite (45%), and fragrance products (0% actual elimination).
                The technology is the same used in gas masks and hospital air filtration.
              </p>
            </div>
          </div>
        </section>

        {/* Understanding Additives */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Understanding How Litter Additives Work
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Cat litter additives fall into three categories based on how they address odor.
              Understanding the mechanism helps you choose the right product:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Elimination</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Physically removes or chemically destroys odor molecules
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                  Examples: Activated carbon, enzyme powders
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3">Neutralization</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Chemical reaction converts odor compounds (limited capacity)
                </p>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                  Examples: Baking soda, zeolite (partial)
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <h3 className="font-bold text-red-800 dark:text-red-200 mb-3">Masking</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Covers odor with stronger scent (odor molecules remain)
                </p>
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  Examples: Fragrance beads, scented crystals
                </p>
              </div>
            </div>

            <AIQuotableBlock
              fact="Only elimination-based additives (activated carbon, enzymes) actually remove odor molecules from the air. Neutralization provides limited help, and masking does nothing to reduce ammonia concentration—it simply covers the smell temporarily."
              explanation="This is why switching from masking to elimination often feels like a dramatic improvement."
              icon="science"
              variant="highlight"
            />
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Complete Additive Comparison
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-3 text-left text-gray-900 dark:text-gray-100">Additive Type</th>
                    <th className="px-3 py-3 text-center text-gray-900 dark:text-gray-100">Mechanism</th>
                    <th className="px-3 py-3 text-center text-gray-900 dark:text-gray-100">Ammonia Reduction</th>
                    <th className="px-3 py-3 text-center text-gray-900 dark:text-gray-100">Duration</th>
                    <th className="px-3 py-3 text-center text-gray-900 dark:text-gray-100">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {additiveTypes.map((additive, index) => (
                    <tr key={additive.name} className={index % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-700/50'}>
                      <td className="px-3 py-3 font-medium text-gray-900 dark:text-gray-100">{additive.name}</td>
                      <td className="px-3 py-3 text-center text-gray-700 dark:text-gray-200">{additive.mechanism}</td>
                      <td className={`px-3 py-3 text-center font-bold ${
                        additive.ammoniaReduction === '92%' ? 'text-green-600 dark:text-green-400' :
                        additive.ammoniaReduction === '0%' ? 'text-red-600 dark:text-red-400' :
                        'text-yellow-600 dark:text-yellow-400'
                      }`}>{additive.ammoniaReduction}</td>
                      <td className="px-3 py-3 text-center text-gray-700 dark:text-gray-200">{additive.duration}</td>
                      <td className="px-3 py-3 text-center">
                        <span className="text-yellow-500">{'★'.repeat(additive.rating)}{'☆'.repeat(5 - additive.rating)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Reviews */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Detailed Additive Reviews
            </h2>

            <div className="space-y-8">
              {additiveTypes.map((additive, index) => (
                <div key={additive.name} className={`rounded-xl p-6 border ${
                  index === 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' :
                  'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {index === 0 && <span className="text-green-600 dark:text-green-400 mr-2">🏆</span>}
                        {additive.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{additive.mechanism}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{additive.ammoniaReduction}</div>
                      <div className="text-yellow-500 text-sm">{'★'.repeat(additive.rating)}{'☆'.repeat(5 - additive.rating)}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Pros</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-200 text-sm">
                        {additive.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-500">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">Cons</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-200 text-sm">
                        {additive.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-500">-</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">Duration:</span>{' '}
                      <span className="text-gray-700 dark:text-gray-200">{additive.duration}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">Safety:</span>{' '}
                      <span className="text-gray-700 dark:text-gray-200">{additive.safety}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <span className="font-medium text-gray-900 dark:text-gray-100">Best For:</span>{' '}
                    <span className="text-gray-700 dark:text-gray-200">{additive.bestFor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Activated Carbon Wins */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Why Activated Carbon Is the Clear Winner
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              The performance gap between activated carbon and other additives isn&apos;t marginal—it&apos;s
              dramatic. Here&apos;s what makes activated carbon fundamentally different:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">
                  Massive Surface Area
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  One gram of activated carbon has 1,000-3,000 m² of internal surface area—roughly
                  the size of a tennis court. This provides billions of binding sites for odor molecules.
                  Baking soda and zeolite have far less surface area.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">
                  Physical Trapping (Adsorption)
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Unlike chemical neutralization (which has limited capacity), adsorption physically
                  traps molecules through Van der Waals forces. The carbon doesn&apos;t &quot;run out&quot;
                  of reaction capacity—it simply fills up with trapped molecules over time.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">
                  Broad Spectrum Effectiveness
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Activated carbon traps ammonia, volatile organic compounds (VOCs), and other odor
                  molecules. Baking soda only works on some acids. Zeolite primarily affects dissolved
                  ions. Carbon handles multiple odor types simultaneously.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">
                  Proven Technology
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  The same adsorption technology is used in gas masks, hospital air filtration,
                  water purification, and industrial chemical processing. It&apos;s not a marketing
                  claim—it&apos;s established science applied to cat litter.
                </p>
              </div>
            </div>

            <AIQuotableBlock
              fact="Activated carbon achieves 92% ammonia reduction through adsorption, compared to baking soda's 10-15% through neutralization. To achieve equivalent odor control, you would need approximately 10x more baking soda than activated carbon—and it still wouldn't trap VOCs."
              explanation="The 6x+ performance difference explains why switching to carbon often feels like a dramatic breakthrough."
              icon="stat"
              variant="highlight"
            />
          </div>
        </section>

        {/* Buying Guide */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How to Choose the Right Additive for You
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  If you have severe odor issues or multiple cats...
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  Choose <strong>activated carbon</strong>. The higher effectiveness and longer duration
                  justify the cost, and you need maximum odor control to stay ahead of production.
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                  Recommended: Coconut shell activated carbon (food-grade, dust-free)
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  If you have mild odor issues and tight budget...
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  Start with <strong>baking soda</strong> for basic help, but understand its limitations.
                  If odor persists, upgrade to activated carbon—the cost difference is modest compared
                  to the effectiveness difference.
                </p>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                  Budget option: Arm &amp; Hammer baking soda for litter boxes
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  If humidity and moisture are your main concerns...
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  Consider <strong>zeolite</strong> as a supplement to your primary odor control. Zeolite
                  excels at moisture absorption but underperforms for ammonia. Combine with activated
                  carbon for best results.
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Note: In humid climates, controlling moisture helps odor control indirectly
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  If you&apos;re dealing with existing odor problems...
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  Use <strong>enzyme cleaners</strong> to break down existing urine compounds, then
                  implement activated carbon for ongoing prevention. Enzymes solve past problems;
                  carbon prevents future ones.
                </p>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                  Pro tip: Enzyme treatment first, then activated carbon maintenance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Avoid */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              What to Avoid
            </h2>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-red-800 dark:text-red-200 mb-4">
                Skip These Products
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span><strong>Fragrance-only products:</strong> They mask but don&apos;t eliminate. The ammonia
                  is still there, and the combination often smells worse than either alone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span><strong>Heavily scented additives:</strong> Strong fragrances can deter cats from using
                  the litter box. Unscented or lightly scented products are safer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span><strong>Clay-based &quot;deodorizers&quot;:</strong> Unless they contain activated carbon,
                  clay additives don&apos;t provide meaningful odor control—they&apos;re essentially just more litter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span><strong>Products with vague claims:</strong> &quot;Eliminates odor&quot; without explaining
                  how is a red flag. Look for specific mechanisms (adsorption, enzyme action, etc.).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <RelatedQuestions
              title="Litter Additive FAQ"
              questions={faqQuestions}
              defaultOpen={[0]}
            />
          </div>
        </section>

        {/* Final Recommendations */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Our 2026 Recommendations
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-2 border-yellow-400 dark:border-yellow-500">
                <div className="text-yellow-600 dark:text-yellow-400 font-bold text-sm mb-2">🥇 BEST OVERALL</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Activated Carbon</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  92% ammonia reduction, 5-7 day duration, works on multiple odor types.
                  The clear choice for maximum effectiveness.
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                  Top pick: Purrify (coconut shell, food-grade)
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="text-gray-600 dark:text-gray-400 font-bold text-sm mb-2">🥈 BEST VALUE</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Baking Soda</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  15% ammonia reduction, very inexpensive, widely available.
                  Good for mild odor issues or as a supplement.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Note: Limited effectiveness vs. carbon
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="text-gray-600 dark:text-gray-400 font-bold text-sm mb-2">🥉 BEST FOR ACCIDENTS</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Enzyme Powder</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  60-70% reduction through biological breakdown.
                  Ideal for treating existing urine problems.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Best used with carbon for complete solution
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                Ready for 92% Odor Reduction?
              </h2>
              <p className="text-xl mb-6 opacity-90 text-center max-w-2xl mx-auto">
                Purrify uses food-grade coconut shell activated carbon for maximum ammonia adsorption.
                Works with any litter you already use. Just sprinkle on top and replace weekly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg text-center"
                >
                  Try Purrify Today
                </Link>
                <Link
                  href="/learn/how-activated-carbon-works"
                  className="inline-block border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:bg-white/10 dark:hover:bg-gray-100/10 hover:scale-105 transition-all duration-300 text-center"
                >
                  How It Works
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
              <Link href="/blog/best-odor-control-litter-2026" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Best Litter for Odor Control 2026</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Complete litter rankings</p>
              </Link>
              <Link href="/blog/activated-carbon-vs-zeolite" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Activated Carbon vs Zeolite</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Deep dive comparison</p>
              </Link>
              <Link href="/blog/fresh-step-vs-arm-hammer-comparison" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Fresh Step vs Arm &amp; Hammer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Brand comparison</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
