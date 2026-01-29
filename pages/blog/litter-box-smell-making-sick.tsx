import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { HowToSection } from '../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../src/components/seo/RelatedQuestions';

export default function LitterBoxSmellMakingSickPage() {
  const { locale } = useTranslation();
  const seoTitle = "Is Your Litter Box Making You Sick? Cat Litter Ammonia Health Risks Explained";
  const seoDescription = "Cat litter ammonia can cause headaches, respiratory irritation, and worsen asthma. Learn the health risks of prolonged ammonia exposure and how to protect your family.";
  const canonicalUrl = getLocalizedUrl('/blog/litter-box-smell-making-sick', locale);
  const languageAlternates = buildLanguageAlternates('/blog/litter-box-smell-making-sick');

  const heroImage = '/optimized/cat-fresh-home-ammonia.jpg';

  // HowTo steps for reducing ammonia exposure
  const howToSteps = [
    {
      name: 'Test your ammonia levels',
      text: 'Purchase ammonia test strips from a pet store or online (under $20). Test the air near your litter box by waving a moistened strip in the area. Compare to the color chart—levels above 25 ppm indicate a health concern requiring immediate action.',
      tip: 'Test at different times of day; levels are often highest in the morning.',
    },
    {
      name: 'Relocate the litter box if needed',
      text: 'Move the litter box away from bedrooms, nurseries, and main living areas if possible. Ideal locations include well-ventilated utility rooms, bathrooms with exhaust fans, or enclosed spaces with dedicated air filtration.',
      tip: 'Avoid closets or small enclosed spaces without ventilation—they concentrate ammonia.',
    },
    {
      name: 'Improve ventilation immediately',
      text: 'Open windows in the litter box area when weather permits. Run a bathroom exhaust fan if the box is in a bathroom. Add a small fan to create airflow that moves ammonia away from living spaces rather than through them.',
      tip: 'Position the fan to push air toward a window or exhaust vent, not toward other rooms.',
    },
    {
      name: 'Add activated carbon for source control',
      text: 'Activated carbon adsorbs ammonia molecules before they become airborne. Sprinkle carbon granules (like Purrify) on top of your existing litter. This traps 92% of ammonia at the source—far more effective than air filtration alone.',
      tip: 'Replace activated carbon weekly to maintain effectiveness.',
    },
    {
      name: 'Increase scooping frequency',
      text: 'Ammonia production begins within hours of urination. Scoop at least twice daily—morning and evening. For households with sensitive individuals, consider scooping after each use if practical.',
      tip: 'Set phone reminders if you tend to forget.',
    },
    {
      name: 'Use an air purifier with HEPA + carbon',
      text: 'A quality air purifier near the litter box provides an additional layer of protection. Look for models with both HEPA filtration (for particles) and activated carbon filters (for gases like ammonia). Run continuously on low.',
      tip: 'Replace carbon filters according to manufacturer schedule—they become saturated.',
    },
    {
      name: 'Monitor symptoms and document patterns',
      text: 'Track when symptoms occur in relation to litter box proximity or maintenance schedule. If symptoms persist despite improvements, consult a healthcare provider and consider temporary cat care alternatives for vulnerable family members.',
      tip: 'Keep a simple log of symptoms, times, and litter box activities.',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: 'Can cat litter ammonia cause headaches?',
      answer: 'Yes. Ammonia is a known irritant that can trigger headaches at concentrations as low as 25-50 ppm. Cat litter boxes in enclosed spaces can reach these levels. If you notice headaches that improve when away from home and return when near the litter box, ammonia exposure is a likely cause.',
    },
    {
      question: 'Is cat litter safe for pregnant women?',
      answer: 'The primary risk for pregnant women is toxoplasmosis from handling litter (someone else should scoop during pregnancy). However, ammonia exposure is an additional concern—high levels can irritate respiratory passages and should be minimized. Pregnant women should avoid lingering near poorly maintained litter boxes.',
    },
    {
      question: 'Can cat litter ammonia trigger asthma attacks?',
      answer: 'Yes. Ammonia is a respiratory irritant that can trigger asthma symptoms and attacks. The American Lung Association identifies ammonia as a common indoor air quality concern. Asthmatics should minimize exposure through proper ventilation, activated carbon use, and keeping litter boxes away from bedrooms.',
    },
    {
      question: 'What are the symptoms of ammonia exposure from cat litter?',
      answer: 'Common symptoms include: eye irritation (watering, burning), nose and throat irritation, headaches, coughing, shortness of breath, and worsening of pre-existing respiratory conditions. Symptoms typically improve when away from the source and worsen with continued exposure.',
    },
    {
      question: 'Is cat litter dust harmful to breathe?',
      answer: 'Yes. Fine silica dust from clay litters can irritate respiratory passages and, with chronic exposure, potentially contribute to respiratory issues. Crystalline silica is classified as a known human carcinogen by OSHA. Low-dust or dust-free litter options reduce this risk significantly.',
    },
    {
      question: 'How long can you be exposed to ammonia before it causes harm?',
      answer: 'OSHA sets the workplace limit at 50 ppm for 8-hour exposure. NIOSH recommends no more than 25 ppm. Effects depend on concentration: 25-50 ppm causes eye and respiratory irritation; 100+ ppm causes severe irritation; 300+ ppm is immediately dangerous. Most home litter boxes don\'t reach dangerous levels, but enclosed spaces can approach harmful concentrations.',
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
              alt: 'Cat litter ammonia health risks and solutions',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter ammonia health risks, litter box making me sick, cat litter headache, cat litter asthma, ammonia exposure cat litter, is cat litter safe',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/blog/litter-box-smell-making-sick"
        options={{
          category: 'Health & Safety',
          keywords: ['ammonia', 'health risks', 'cat litter safety', 'respiratory health'],
          datePublished: '2024-01-22T12:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 2400,
          readingTime: 11
        }}
      />

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium mb-4">
                Health & Safety
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Is Your Litter Box Making You Sick?
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                Headaches near the litter box. Irritated eyes. A cough that won&apos;t go away.
                If these sound familiar, ammonia from your cat&apos;s litter could be affecting your health.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Understanding cat litter ammonia health risks"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* Important Notice */}
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-6 rounded-r-xl">
              <h2 className="text-xl font-heading font-bold text-red-800 dark:text-red-200 mb-3">
                Important Health Information
              </h2>
              <p className="text-red-700 dark:text-red-300">
                This article provides general information about ammonia exposure from cat litter.
                If you&apos;re experiencing persistent symptoms, consult a healthcare provider.
                Individuals with asthma, COPD, or other respiratory conditions should discuss
                pet ownership with their doctor.
              </p>
            </div>
          </div>
        </section>

        {/* The Science of Ammonia */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              What Is Ammonia and Why Is It in Cat Litter?
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              When your cat urinates, the urine contains urea—a nitrogen-based compound. Bacteria in
              the litter box break down urea through a process called urease hydrolysis, producing
              ammonia (NH₃) as a byproduct. This process begins within hours and intensifies over time.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                The Ammonia Production Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 font-medium text-gray-600 dark:text-gray-300">0-2 hrs</div>
                  <div className="text-gray-700 dark:text-gray-200">Fresh urine, minimal ammonia odor</div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 font-medium text-yellow-600 dark:text-yellow-400">2-6 hrs</div>
                  <div className="text-gray-700 dark:text-gray-200">Bacterial breakdown begins, ammonia detectable (~5-15 ppm)</div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 font-medium text-orange-600 dark:text-orange-400">6-24 hrs</div>
                  <div className="text-gray-700 dark:text-gray-200">Significant ammonia production (~15-30 ppm)</div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 font-medium text-red-600 dark:text-red-400">24+ hrs</div>
                  <div className="text-gray-700 dark:text-gray-200">Peak ammonia levels, especially in enclosed spaces (30-50+ ppm)</div>
                </div>
              </div>
            </div>

            <AIQuotableBlock
              fact="Cat urine produces ammonia concentrations of 5-50 ppm within 24 hours of urination. For comparison, the OSHA workplace exposure limit is 50 ppm, and NIOSH recommends no more than 25 ppm. In enclosed litter box areas, levels can approach or exceed these thresholds."
              explanation="These are occupational standards for healthy adult workers—children, elderly, pregnant women, and those with respiratory conditions are more sensitive."
              icon="science"
              variant="highlight"
            />
          </div>
        </section>

        {/* Health Effects */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How Ammonia Affects Your Body
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Ammonia is classified as a respiratory irritant. When inhaled, it reacts with moisture
              in your airways to form ammonium hydroxide, which irritates mucous membranes. The
              severity of effects depends on concentration and duration of exposure.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-4">
                  Low-Level Exposure (10-25 ppm)
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Common with moderately maintained litter boxes
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">•</span>
                    <span>Noticeable but tolerable odor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">•</span>
                    <span>Mild eye irritation in sensitive individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">•</span>
                    <span>Possible mild headache with prolonged exposure</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-6">
                <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-4">
                  Moderate Exposure (25-50 ppm)
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Common in enclosed spaces with neglected litter boxes
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 dark:text-orange-400">•</span>
                    <span>Strong, unpleasant odor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 dark:text-orange-400">•</span>
                    <span>Eye and nose irritation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 dark:text-orange-400">•</span>
                    <span>Headaches, especially with regular exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 dark:text-orange-400">•</span>
                    <span>Potential asthma trigger</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6">
                <h3 className="font-bold text-red-800 dark:text-red-200 mb-4">
                  High Exposure (50-100 ppm)
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Possible in poorly ventilated areas with multiple cats
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Immediate eye burning and watering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Throat irritation and coughing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Chest tightness in sensitive individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">•</span>
                    <span>Nausea and significant discomfort</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Dangerous Exposure (100+ ppm)
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Rare in home settings—requires severe neglect in enclosed space
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span>Severe respiratory distress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span>Potential lung damage with prolonged exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span>Requires immediate removal from area</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Vulnerable Populations */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Who Is Most at Risk?
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              While ammonia exposure affects everyone, certain groups are particularly sensitive and
              should take extra precautions:
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-xl">!</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    People with Asthma or COPD
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Ammonia is a known asthma trigger. People with chronic respiratory conditions may
                    experience symptoms at lower concentrations than healthy individuals. If you have
                    asthma, keep litter boxes well away from bedrooms and use activated carbon to minimize
                    ammonia at the source.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-xl">!</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Infants and Young Children
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Children breathe faster than adults and inhale more air relative to their body weight.
                    Their developing respiratory systems are more susceptible to irritants. Keep litter
                    boxes out of nurseries, playrooms, and areas where children spend significant time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-xl">!</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Pregnant Women
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Beyond the toxoplasmosis risk from scooping litter (which should be avoided during
                    pregnancy), ammonia exposure should be minimized. Pregnant women should not maintain
                    the litter box and should avoid prolonged time in poorly ventilated litter box areas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-xl">!</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Elderly Individuals
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Older adults often have decreased lung function and may have developed sensitivities
                    over time. They may also be less aware of odors due to age-related olfactory decline,
                    potentially exposing themselves to higher concentrations without realizing it.
                  </p>
                </div>
              </div>
            </div>

            <AIQuotableBlock
              fact="Children breathe 40-60 times per minute compared to adults' 12-20 breaths. This means a child near a litter box inhales 2-3x more ammonia per minute than an adult in the same location."
              explanation="This is why litter box placement matters so much in homes with children—keep boxes away from play areas and bedrooms."
              icon="stat"
              variant="highlight"
            />
          </div>
        </section>

        {/* Solutions */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How to Reduce Ammonia Exposure in Your Home
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              You don&apos;t have to choose between your cat and your family&apos;s health. With proper
              management, ammonia levels can be kept well below concerning thresholds.
            </p>

            <HowToSection
              title="Reduce Cat Litter Ammonia Exposure"
              description="A systematic approach to minimizing ammonia exposure from your litter box"
              steps={howToSteps}
              totalTime="1-2 hours initial setup + 10 minutes daily maintenance"
            />
          </div>
        </section>

        {/* The Activated Carbon Solution */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Why Activated Carbon Is the Most Effective Solution
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Most odor control methods either mask ammonia (fragrances) or attempt to neutralize it
              chemically (baking soda). Neither approach is very effective. Activated carbon works
              differently—it physically traps ammonia molecules through a process called adsorption.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center">
                <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">Fragrances</h3>
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">0%</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Ammonia reduction (just masks odor)
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 text-center">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Baking Soda</h3>
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">~15%</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Limited chemical neutralization
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">Activated Carbon</h3>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">~92%</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Physical adsorption of molecules
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Activated carbon&apos;s effectiveness comes from its massive surface area—one gram has
              up to 3,000 square meters of internal surface. Ammonia molecules stick to this surface
              through Van der Waals forces, permanently trapping them before they can become airborne.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6">
              <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">
                The Same Technology Used in Critical Applications
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                Activated carbon isn&apos;t just for litter boxes. The same adsorption technology is used in:
              </p>
              <ul className="grid md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-200">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  <span>Gas masks and respirators</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  <span>Hospital air filtration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  <span>Water purification plants</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>
                  <span>Industrial chemical processing</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <RelatedQuestions
              title="Cat Litter Health FAQ"
              questions={faqQuestions}
              defaultOpen={[0]}
            />
          </div>
        </section>

        {/* When to Seek Help */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6">
              <h2 className="text-2xl font-heading font-bold text-red-800 dark:text-red-200 mb-4">
                When to Consult a Doctor
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                Seek medical attention if you experience:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-200 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400">•</span>
                  <span>Persistent cough that doesn&apos;t improve when away from home</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400">•</span>
                  <span>Wheezing or difficulty breathing near the litter box</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400">•</span>
                  <span>Chronic headaches that correlate with litter box exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400">•</span>
                  <span>New or worsening asthma symptoms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400">•</span>
                  <span>Eye irritation that persists beyond exposure</span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-200">
                Bring up your litter box setup with your doctor—they may have specific recommendations
                based on your health profile.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                Protect Your Family&apos;s Health
              </h2>
              <p className="text-xl mb-6 opacity-90 text-center max-w-2xl mx-auto">
                Purrify uses food-grade coconut shell activated carbon to trap 92% of ammonia at the
                source. Non-toxic, dust-free, and effective for 7+ days. Keep the cat, lose the health concerns.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg text-center"
                >
                  Try Purrify Today
                </Link>
                <Link
                  href="/learn/ammonia-science"
                  className="inline-block border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:bg-white/10 dark:hover:bg-gray-100/10 hover:scale-105 transition-all duration-300 text-center"
                >
                  Learn About Ammonia
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/learn/ammonia-science" className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">The Science of Ammonia</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">How cat urine produces ammonia</p>
              </Link>
              <Link href="/learn/how-activated-carbon-works" className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">How Activated Carbon Works</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">The adsorption process explained</p>
              </Link>
              <Link href="/learn/solutions/senior-cat-litter-solutions" className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Senior Cat Solutions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Older cats and stronger odors</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
