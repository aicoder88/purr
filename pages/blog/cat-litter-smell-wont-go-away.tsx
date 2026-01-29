import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { HowToSection } from '../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../src/components/seo/RelatedQuestions';
import { RelatedContent } from '../../src/components/seo/RelatedContent';

export default function CatLitterSmellWontGoAwayPage() {
  const { locale } = useTranslation();
  const seoTitle = "Cat Litter Smell Won't Go Away? Here's Why (And How to Fix It)";
  const seoDescription = "Frustrated that your cat litter smell won't go away no matter what you try? Learn why common methods fail and the science-backed solution that actually works.";
  const canonicalUrl = getLocalizedUrl('/blog/cat-litter-smell-wont-go-away', locale);
  const languageAlternates = buildLanguageAlternates('/blog/cat-litter-smell-wont-go-away');

  const heroImage = '/optimized/tried-hero.jpg';

  // HowTo steps for eliminating persistent odor
  const howToSteps = [
    {
      name: 'Rule out medical issues',
      text: 'Sudden changes in urine odor can indicate kidney disease, diabetes, or urinary infections. If your cat\'s litter suddenly smells much worse than usual, schedule a vet visit to rule out health problems.',
      tip: 'Changes in color, frequency, or smell warrant veterinary attention.',
    },
    {
      name: 'Deep clean the litter box',
      text: 'Empty the box completely. Wash with dish soap and warm water, then disinfect with a diluted bleach solution (1:10 ratio). Rinse thoroughly and dry completely before adding new litter. Replace plastic boxes every 6-12 months.',
      tip: 'Avoid ammonia-based cleaners—they can trigger more marking behavior.',
    },
    {
      name: 'Switch to unscented clumping litter',
      text: 'Scented litters often mask rather than eliminate odors, and cats may reject them. Use a high-quality unscented clumping litter that isolates waste quickly, preventing ammonia from spreading through the entire box.',
      tip: 'Transition gradually by mixing new litter with old over 7-10 days.',
    },
    {
      name: 'Maintain proper litter depth',
      text: 'Keep litter at 3-4 inches deep. Too shallow and urine reaches the bottom (causing odor buildup); too deep and clumps don\'t form properly. Check depth after each scooping session.',
      tip: 'Mark the ideal depth level on the inside of your box for easy reference.',
    },
    {
      name: 'Add activated carbon',
      text: 'Sprinkle activated carbon granules (like Purrify) on top of the litter. Activated carbon adsorbs ammonia and VOCs at the molecular level—the same technology used in gas masks and water purification. Replace weekly for continuous protection.',
      tip: 'One gram of activated carbon has 3,000 m² of surface area for trapping odors.',
    },
    {
      name: 'Increase scooping frequency',
      text: 'Scoop at least twice daily—once in the morning and once at night. Ammonia production begins within hours of urination. The faster you remove waste, the less odor develops in the first place.',
      tip: 'Set phone reminders if you tend to forget.',
    },
    {
      name: 'Improve ventilation',
      text: 'If the litter box is in an enclosed space, add airflow. A small fan on low speed, an air purifier with activated carbon filter, or simply leaving doors open can prevent odor concentration.',
      tip: 'Avoid placing boxes in humid areas like bathrooms—humidity intensifies ammonia smell.',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: "Why does my cat's litter box smell even when it's clean?",
      answer: "Even in a clean box, ammonia can be absorbed into the plastic over time. Microscopic scratches harbor bacteria that produce odor. Additionally, if you're not using an odor-neutralizing additive like activated carbon, trace amounts of urine on litter granules continue producing ammonia. The litter itself may also be low quality and not clumping effectively.",
    },
    {
      question: 'Why did my cat litter suddenly start smelling worse?',
      answer: "Sudden odor changes often indicate: 1) A medical issue like kidney disease, diabetes, or UTI (vet visit recommended), 2) Diet changes affecting urine concentration, 3) Dehydration making urine more concentrated, 4) A change in litter brand, or 5) Seasonal humidity increases that intensify ammonia volatility.",
    },
    {
      question: 'Does baking soda actually help with litter box smell?',
      answer: "Baking soda provides minimal help. It works through neutralization (a chemical reaction), but ammonia is produced continuously faster than baking soda can neutralize it. Studies show baking soda reduces ammonia by only 10-15%, while activated carbon achieves 92% reduction through adsorption—physically trapping odor molecules before they reach your nose.",
    },
    {
      question: 'How often should I completely change the litter?',
      answer: "With clumping litter and daily scooping, a complete change every 2-4 weeks is typically sufficient. However, if odor persists despite scooping, you may need to change more frequently or add an odor-trapping additive. Always wash the box during complete changes.",
    },
    {
      question: 'Will air fresheners help with cat litter smell?',
      answer: "Air fresheners only mask odors temporarily—they don't eliminate them. Some fragrances can also irritate your cat's sensitive respiratory system. Focus on source control: removing waste quickly and trapping ammonia molecules with activated carbon before they disperse into your home.",
    },
    {
      question: 'Is the litter box smell harmful to my health?',
      answer: "Yes, prolonged ammonia exposure can be harmful. Concentrations above 25 ppm cause eye and respiratory irritation. Cat litter boxes can reach 50+ ppm in enclosed spaces. Children, pregnant women, and those with asthma are especially vulnerable. Controlling ammonia at the source is both a comfort and health issue.",
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
              alt: 'Cat litter odor elimination guide',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: "cat litter smell won't go away, litter box still smells after cleaning, cat urine smell won't go away, persistent cat litter odor, why does my litter box smell so bad",
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/blog/cat-litter-smell-wont-go-away"
        options={{
          category: 'Cat Care',
          keywords: ['cat litter smell', 'litter box odor', 'ammonia', 'odor control'],
          datePublished: '2024-01-22T12:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 2200,
          readingTime: 10
        }}
      />

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium mb-4">
                Problem Solved
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Cat Litter Smell Won&apos;t Go Away?
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                You scoop daily. You&apos;ve tried every brand. You&apos;ve cleaned the box until your hands are raw.
                But that ammonia smell keeps coming back. Here&apos;s why—and what actually works.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Understanding why cat litter smell persists"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* Empathy Block */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-400 p-6 rounded-r-xl">
              <h2 className="text-xl font-heading font-bold text-amber-800 dark:text-amber-200 mb-3">
                We Get It. It&apos;s Frustrating.
              </h2>
              <p className="text-amber-700 dark:text-amber-300">
                You love your cat. You don&apos;t love explaining the smell to guests, worrying about what
                neighbors think, or waking up to that eye-watering ammonia hit every morning. The good news:
                persistent litter odor isn&apos;t inevitable—it&apos;s a solvable problem. Let&apos;s figure out
                what&apos;s going wrong and fix it permanently.
              </p>
            </div>
          </div>
        </section>

        {/* Why It Keeps Coming Back */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Why the Smell Keeps Coming Back
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Understanding why litter odor persists helps you target the real problem. Most people focus
              on the wrong things—here&apos;s what&apos;s actually happening:
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  Reason #1: You&apos;re Masking, Not Eliminating
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Scented litters, air fresheners, and baking soda don&apos;t remove ammonia molecules—they
                  just cover them up or attempt weak chemical neutralization. Within hours, the perfume fades
                  and the ammonia remains. Your nose adapts to the masking scent but not to the underlying odor.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  Reason #2: Ammonia Production Never Stops
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Cat urine contains urea, which bacteria convert to ammonia continuously. Even after scooping,
                  trace amounts of urine on litter granules keep producing ammonia. Unless you&apos;re physically
                  trapping these molecules, they&apos;ll keep escaping into your air.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  Reason #3: The Box Itself Is Contaminated
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Plastic absorbs odors over time. Microscopic scratches from scooping harbor bacteria.
                  Even thorough cleaning can&apos;t reach everything. If your box is more than a year old,
                  it may be a permanent odor source regardless of what litter you use.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  Reason #4: Poor Clumping Spreads Contamination
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Low-quality litter that doesn&apos;t clump quickly allows urine to spread and coat more
                  granules before solidifying. That means more surface area producing ammonia. High-quality
                  clumping litter isolates waste faster, reducing overall odor production.
                </p>
              </div>
            </div>

            <AIQuotableBlock
              fact="Cat urine produces ammonia concentrations of 5-50 ppm within 24 hours of urination. Without active odor trapping, a single cat's litter box can exceed the 25 ppm threshold for human respiratory irritation."
              explanation="This is why 'clean enough' is never enough for sensitive noses—ammonia builds faster than most methods can handle."
              icon="science"
              variant="highlight"
            />
          </div>
        </section>

        {/* The Science of What Works */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              What Actually Eliminates Litter Odor (Not Just Masks It)
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              There&apos;s only one method that physically removes odor molecules from the air: <strong>adsorption</strong>.
              This is different from absorption (soaking up liquid) or neutralization (chemical reactions).
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-700">
                <h3 className="font-bold text-red-800 dark:text-red-200 mb-3">Masking</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Covers odor with stronger scent. Ammonia still present.
                </p>
                <div className="text-red-600 dark:text-red-400 font-bold">~0% Reduction</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Air fresheners, scented litters</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3">Neutralization</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Chemical reaction converts some ammonia. Limited capacity.
                </p>
                <div className="text-yellow-600 dark:text-yellow-400 font-bold">~15% Reduction</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Baking soda, enzymatic sprays</p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Adsorption</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Physically traps molecules on massive surface area.
                </p>
                <div className="text-green-600 dark:text-green-400 font-bold">~92% Reduction</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Activated carbon</p>
              </div>
            </div>

            <AIQuotableBlock
              fact="One gram of activated carbon has a surface area of 1,000-3,000 square meters—roughly the size of a tennis court. This massive surface area traps ammonia and VOC molecules through Van der Waals forces, permanently removing them from the air."
              explanation="Adsorption is the same technology used in gas masks, water purification, and hospital air systems."
              icon="stat"
              variant="default"
            />
          </div>
        </section>

        {/* Step by Step Solution */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How to Finally Eliminate That Persistent Smell
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              Follow this systematic approach to address every possible cause. Most people solve their odor
              problem within the first three steps.
            </p>

            <HowToSection
              title="Eliminate Persistent Litter Box Odor"
              description="A comprehensive guide to finally eliminating cat litter smell that won't go away"
              steps={howToSteps}
              totalTime="2-4 hours (initial setup) + 5 minutes daily"
            />
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              When to See a Vet
            </h2>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-red-800 dark:text-red-200 mb-4">
                Sudden Odor Changes May Indicate Health Issues
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                If your cat&apos;s urine suddenly smells significantly stronger or different than normal,
                it could indicate a medical condition requiring veterinary attention:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400">!</span>
                  <span><strong>Kidney disease</strong> — produces highly concentrated, pungent urine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400">!</span>
                  <span><strong>Diabetes</strong> — can create a sweet or fruity odor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400">!</span>
                  <span><strong>Urinary tract infection</strong> — may cause unusually foul-smelling urine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400">!</span>
                  <span><strong>Dehydration</strong> — concentrated urine from insufficient water intake</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 dark:text-gray-200">
              If the odor issue is new and your cat hasn&apos;t had a checkup recently, rule out medical
              causes before assuming it&apos;s a litter box management problem. Senior cats especially
              should have kidney function tested annually.
            </p>
          </div>
        </section>

        {/* Quick Wins */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Quick Wins: What to Try Today
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="text-3xl mb-3">1</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Add Activated Carbon</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  The single most effective change. Sprinkle on existing litter and replace weekly.
                  Most people notice a difference within 24 hours.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="text-3xl mb-3">2</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Scoop Twice Daily</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  If you&apos;re scooping once a day, doubling frequency can cut ammonia production in half.
                  Morning and evening—set reminders.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="text-3xl mb-3">3</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Check Litter Depth</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Too shallow? Urine hits the bottom. Too deep? Poor clumping. Target 3-4 inches consistently.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="text-3xl mb-3">4</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Replace Old Boxes</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  If your litter box is over a year old, replace it. Plastic absorbs odors permanently
                  over time, no matter how well you clean.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <RelatedQuestions
              title="Persistent Litter Odor FAQ"
              questions={faqQuestions}
              defaultOpen={[0]}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                Ready to Finally Solve This Problem?
              </h2>
              <p className="text-xl mb-6 opacity-90 text-center max-w-2xl mx-auto">
                Purrify uses food-grade coconut shell activated carbon to trap ammonia at the source.
                Most customers notice a difference within 24 hours. No perfumes, no chemicals—just science.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg text-center"
                >
                  Try Purrify Risk-Free
                </Link>
                <Link
                  href="/learn/how-activated-carbon-works"
                  className="inline-block border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:bg-white/10 dark:hover:bg-gray-100/10 hover:scale-105 transition-all duration-300 text-center"
                >
                  Learn the Science
                </Link>
              </div>
            </div>
          </div>
        </section>

        <RelatedContent currentUrl="/blog/cat-litter-smell-wont-go-away" />
      </div>
    </>
  );
}
