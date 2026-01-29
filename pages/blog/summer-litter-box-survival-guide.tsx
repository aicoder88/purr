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

export default function SummerLitterBoxSurvivalGuidePage() {
  const { locale } = useTranslation();
  const seoTitle = "Summer Litter Box Survival Guide: Why Cat Litter Smells Worse in Heat & Humidity";
  const seoDescription = "Cat litter smell worse in summer? Heat and humidity accelerate ammonia production by 2-3x. Here's how to beat the summer stink and keep your home fresh.";
  const canonicalUrl = getLocalizedUrl('/blog/summer-litter-box-survival-guide', locale);
  const languageAlternates = buildLanguageAlternates('/blog/summer-litter-box-survival-guide');

  const heroImage = '/optimized/summer-hero.jpg';

  // HowTo steps for summer litter management
  const howToSteps = [
    {
      name: 'Increase scooping frequency',
      text: 'During summer, scoop at least 3 times daily instead of twice. Heat accelerates bacterial growth and ammonia production—what takes 24 hours in winter can happen in 8-12 hours during a heat wave. Morning, afternoon, and evening scooping is ideal.',
      tip: 'Set phone reminders for your summer scooping schedule.',
    },
    {
      name: 'Add activated carbon to your litter',
      text: 'Activated carbon becomes even more critical in summer. Sprinkle a generous layer on top of your litter to trap ammonia molecules before they volatilize into the air. In hot weather, you may need to refresh carbon every 5 days instead of 7.',
      tip: 'Keep extra activated carbon on hand—you\'ll use more in summer months.',
    },
    {
      name: 'Control humidity in the litter area',
      text: 'Run a dehumidifier or air conditioner in the room where the litter box is located. Target 40-50% relative humidity. High humidity prevents ammonia from dissipating naturally and intensifies the perceived odor. Even a small portable dehumidifier helps significantly.',
      tip: 'Empty dehumidifier reservoirs daily in high-humidity areas.',
    },
    {
      name: 'Improve air circulation',
      text: 'Position a small fan to create airflow near the litter box, directing air toward a window or exhaust vent—not toward living spaces. Moving air prevents ammonia concentration and helps litter dry faster between uses.',
      tip: 'A bathroom exhaust fan running during peak hours makes a big difference.',
    },
    {
      name: 'Switch to a faster-clumping litter',
      text: 'In summer, fast clumping is essential. Urine that sits unclumped for even 30 minutes starts producing more ammonia. Premium clumping litters that solidify within seconds help contain odor before it spreads.',
      tip: 'Test clumping speed by pouring a small amount of water on litter—it should clump in under 10 seconds.',
    },
    {
      name: 'Relocate the litter box if needed',
      text: 'Move the litter box away from sunny windows and heat sources. Direct sunlight can raise litter temperature significantly, accelerating all chemical reactions. A cooler location means slower ammonia production.',
      tip: 'Basements or interior bathrooms stay cooler than exterior-wall rooms.',
    },
    {
      name: 'Deep clean more frequently',
      text: 'Complete litter changes every 5-7 days instead of 7-14. Wash the box with enzyme cleaner monthly instead of bi-monthly. Summer heat causes plastic to release absorbed odors more readily, making regular deep cleaning essential.',
      tip: 'Let the clean box dry completely in the sun—UV helps kill remaining bacteria.',
    },
    {
      name: 'Consider a covered box with ventilation',
      text: 'A covered litter box with ventilation holes contains odor while allowing airflow. Avoid fully enclosed boxes in summer—they trap heat and create an odor oven. Some covered boxes have built-in carbon filters that help.',
      tip: 'If using a covered box, lift the lid daily to prevent heat buildup.',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: 'Why does cat litter smell worse in summer?',
      answer: 'Two factors: heat and humidity. Heat accelerates bacterial metabolism—the bacteria converting urea to ammonia work 2-3x faster at 85°F than at 65°F. Humidity prevents ammonia from dissipating and intensifies how your nose perceives the odor. The combination can make summer litter boxes smell 3-4x stronger than winter.',
    },
    {
      question: 'Does humidity make cat litter smell worse?',
      answer: 'Yes, significantly. High humidity (above 60%) keeps ammonia molecules suspended in the air longer, intensifies odor perception, and slows litter drying. Wet litter produces more ammonia than dry litter. Running a dehumidifier can noticeably reduce litter box odor.',
    },
    {
      question: 'How often should I change cat litter in summer?',
      answer: 'Complete litter changes every 5-7 days are recommended in summer, compared to 7-14 days in cooler months. Scoop at least 3 times daily. If you notice odor returning faster than usual, increase frequency further. The extra effort prevents odor from becoming overwhelming.',
    },
    {
      question: 'Should I put the litter box near the air conditioner?',
      answer: 'Yes, placing the litter box in an air-conditioned room helps significantly. AC reduces both temperature and humidity—the two factors that worsen summer litter odor. However, don\'t place the box directly in the AC airflow path, as this can spread odor particles throughout the room.',
    },
    {
      question: 'Does baking soda help more in summer?',
      answer: 'Baking soda provides minimal benefit regardless of season. It can only neutralize about 10-15% of ammonia through chemical reaction. In summer, when ammonia production is accelerated, baking soda is even less effective. Activated carbon, which physically traps 92% of ammonia, is far more effective.',
    },
    {
      question: 'Can I put the litter box outside in summer?',
      answer: 'While outdoor placement eliminates indoor odor concerns, it introduces other issues: direct sunlight heats the litter dramatically, rain can flood the box, and other animals may investigate. If you do use an outdoor location, choose a shaded, covered area and maintain strict hygiene to avoid attracting pests.',
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
              alt: 'Summer litter box odor control guide',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter smell worse in summer, summer litter box odor, humidity cat litter smell, heat makes litter smell, summer cat care',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/blog/summer-litter-box-survival-guide"
        options={{
          category: 'Seasonal Care',
          keywords: ['summer', 'heat', 'humidity', 'cat litter', 'odor control'],
          datePublished: '2024-01-23T12:00:00Z',
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
              <span className="inline-block px-4 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-4">
                Seasonal Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Summer Litter Box Survival Guide
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                That manageable winter litter box suddenly smells unbearable? You&apos;re not imagining it.
                Heat and humidity can make cat litter odor 3-4x stronger. Here&apos;s how to fight back.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Summer litter box odor control strategies"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* Quick Science */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 dark:border-orange-400 p-6 rounded-r-xl">
              <h2 className="text-xl font-heading font-bold text-orange-800 dark:text-orange-200 mb-3">
                The Science: Why Summer Is Worse
              </h2>
              <p className="text-orange-700 dark:text-orange-300">
                Bacteria that convert urea to ammonia follow the Arrhenius equation—their activity roughly
                doubles for every 10°C (18°F) increase in temperature. At 85°F, bacterial ammonia production
                is 2-3x faster than at 65°F. Add humidity that prevents ammonia dissipation, and you have
                the perfect storm for summer stink.
              </p>
            </div>
          </div>
        </section>

        {/* The Summer Effect */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How Heat and Humidity Attack Your Litter Box
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Heat Effects */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-700">
                <div className="text-4xl mb-4">🌡️</div>
                <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">
                  Heat Effects
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">↑</span>
                    <span>Bacterial metabolism accelerates 2-3x</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">↑</span>
                    <span>Ammonia volatilizes faster into air</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">↑</span>
                    <span>Plastic boxes release absorbed odors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 dark:text-red-400">↑</span>
                    <span>Urine breakdown speeds up dramatically</span>
                  </li>
                </ul>
              </div>

              {/* Humidity Effects */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <div className="text-4xl mb-4">💧</div>
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                  Humidity Effects
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">↑</span>
                    <span>Ammonia stays suspended longer in air</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">↑</span>
                    <span>Litter stays wetter, producing more odor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">↑</span>
                    <span>Human odor perception intensifies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">↑</span>
                    <span>Clumping becomes less effective</span>
                  </li>
                </ul>
              </div>
            </div>

            <AIQuotableBlock
              fact="Bacterial ammonia production follows the Arrhenius equation: for every 10°C increase in temperature, chemical reaction rates roughly double. At summer temperatures (30°C/86°F), bacteria produce ammonia 2-3x faster than at typical indoor winter temperatures (18°C/65°F)."
              explanation="This is why a litter box that was manageable in January can become overwhelming in July with no change in your routine."
              icon="science"
              variant="highlight"
            />
          </div>
        </section>

        {/* Temperature Comparison */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Ammonia Production by Temperature
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Temperature</th>
                    <th className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">Relative Ammonia Production</th>
                    <th className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">Time to Peak Odor</th>
                    <th className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">Recommended Scooping</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">60°F / 15°C (Winter indoor)</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">1x (baseline)</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">24-36 hours</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">2x daily</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">70°F / 21°C (Spring/Fall)</td>
                    <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400 font-bold">1.5x</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">18-24 hours</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">2x daily</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">80°F / 27°C (Summer indoor)</td>
                    <td className="px-4 py-3 text-center text-orange-600 dark:text-orange-400 font-bold">2-2.5x</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">12-18 hours</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">3x daily</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">90°F / 32°C (Heat wave)</td>
                    <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-bold">3-4x</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">8-12 hours</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">3-4x daily</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 dark:text-gray-200">
              This is why your winter routine suddenly fails in summer. The same litter box, same cat,
              same scooping schedule—but dramatically different odor levels. Adjusting your routine to
              match the temperature is essential.
            </p>
          </div>
        </section>

        {/* Step by Step Guide */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Your Summer Litter Box Action Plan
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              Follow these steps to maintain a fresh-smelling home even during the hottest, most humid months.
              The combination of increased frequency and environmental control makes all the difference.
            </p>

            <HowToSection
              title="Beat Summer Litter Box Odor"
              description="A comprehensive guide to controlling cat litter smell during hot, humid weather"
              steps={howToSteps}
              totalTime="15-20 minutes daily (increased from 10 minutes in cooler months)"
            />
          </div>
        </section>

        {/* Quick Wins */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Quick Wins for Immediate Relief
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Today</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Activated Carbon</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Add a layer of activated carbon to your existing litter right now. It starts trapping
                  ammonia immediately and can reduce odor by 90%+ within hours.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Today</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Third Daily Scoop</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Add an afternoon scooping session to your routine. The extra 2 minutes prevents
                  hours of ammonia production between morning and evening scoops.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">This Week</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Complete Litter Change</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  If it&apos;s been more than a week, do a full litter change now. Wash the box with
                  enzyme cleaner, dry completely, and start fresh with new litter plus carbon.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">This Week</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Relocate if Needed</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Move the litter box away from sunny windows or heat sources. A cooler location
                  can reduce ammonia production by 30-50% compared to a sun-heated spot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Environmental Control */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Environmental Control: Your Secret Weapon
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              The most overlooked factor in summer litter odor is environmental control. Adjusting
              temperature and humidity in the litter box area can be as effective as increasing
              scooping frequency.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">❄️</div>
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Air Conditioning</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Keeping the litter room at 70°F instead of 85°F can cut ammonia production nearly in half.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">💨</div>
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Dehumidifier</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Reducing humidity from 70% to 45% helps litter dry faster and reduces perceived odor intensity.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🌀</div>
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Ventilation</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Air movement prevents ammonia concentration. An exhaust fan or open window disperses odors.
                </p>
              </div>
            </div>

            <AIQuotableBlock
              fact="Relative humidity above 60% keeps ammonia molecules suspended in air 3-4x longer than dry air (below 40%). A $50 portable dehumidifier in the litter box room can noticeably reduce odor perception—especially in basements and bathrooms."
              explanation="Humidity control is often more cost-effective than running AC continuously."
              icon="stat"
              variant="default"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <RelatedQuestions
              title="Summer Litter Box FAQ"
              questions={faqQuestions}
              defaultOpen={[0]}
            />
          </div>
        </section>

        {/* Summer Checklist */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Your Summer Litter Box Checklist
            </h2>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-4">Daily Tasks</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Morning scoop</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Afternoon scoop (summer addition)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Evening scoop</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Check litter depth (top up if needed)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Run dehumidifier/AC in litter room</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-4">Weekly Tasks</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Complete litter replacement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Refresh activated carbon</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Wipe down litter box exterior</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Check/clean surrounding floor area</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" disabled />
                      <span>Empty dehumidifier reservoir</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                Beat the Summer Stink
              </h2>
              <p className="text-xl mb-6 opacity-90 text-center max-w-2xl mx-auto">
                Purrify&apos;s activated carbon is your best defense against summer litter box odor.
                Traps 92% of ammonia at the source—even when heat and humidity are working against you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg text-center"
                >
                  Get Summer Ready
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

        <RelatedContent
          currentUrl="/blog/summer-litter-box-survival-guide"
          className="bg-white dark:bg-gray-800"
        />
      </div>
    </>
  );
}
