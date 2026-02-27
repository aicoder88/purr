'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RelatedSolutions } from '@/components/learn/RelatedSolutions';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { HowToSection } from '@/components/seo/HowToSection';
import { AIQuotableBlock } from '@/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '@/components/seo/RelatedQuestions';

export default function MultipleCatsOdorControlPageClient() {
  const canonicalUrl = 'https://www.purrify.ca/learn/solutions/multiple-cats-odor-control/';

  // SEO optimized images for multi-cat households
  const heroImage = '/optimized/blog/multiple-cats-together.webp';
  const solutionImage = '/optimized/blog/ammonia-fresh-home.webp';

  // HowTo steps for multi-cat odor control
  const howToSteps = [
    {
      name: 'Set up enough litter boxes',
      text: 'Follow the golden rule: one litter box per cat, plus one extra. For 3 cats, you need 4 boxes. Spread them across different rooms to prevent odor concentration.',
      tip: 'Place boxes in low-traffic areas where cats feel secure but with good ventilation.',
    },
    {
      name: 'Choose the right litter depth',
      text: 'Add 3-4 inches of litter per box. Multi-cat households need slightly more depth since boxes get used more frequently throughout the day.',
    },
    {
      name: 'Add activated carbon additive to each box',
      text: 'Sprinkle 3-4 tablespoons of Purrify per box for households with 2-3 cats. For 4+ cats, use 4-5 tablespoons. Mix the carbon into the top layer of litter.',
      tip: 'For 5+ cats, consider the bulk size for better value.',
    },
    {
      name: 'Scoop all boxes twice daily',
      text: 'Multi-cat households generate more waste faster. Twice-daily scooping prevents ammonia buildup and keeps all cats happy to use their boxes.',
    },
    {
      name: 'Refresh carbon and litter weekly',
      text: 'Top up each box with 1-2 tablespoons of activated carbon mid-week. Complete litter changes every 1-2 weeks depending on usage.',
    },
  ];

  // FAQ questions for multi-cat households
  const faqQuestions = [
    {
      question: 'How much Purrify do I need for multiple cats?',
      answer: 'For 2-3 cats, use 3-4 tablespoons per litter box. For 4+ cats, use 4-5 tablespoons. Our 500g jar lasts 6-8 weeks for 2-3 cats with 4 boxes. For larger multi-cat households, the 1kg size offers better value.',
    },
    {
      question: 'Why does having multiple cats make odor so much worse?',
      answer: "Odors don't just add up—they multiply. Each cat produces 3-4 ounces of urine daily, and the bacteria converting it to ammonia work faster in concentrated waste. Two cats don't create double the odor; they can create 3-4x the smell.",
    },
    {
      question: 'Can Purrify help reduce territorial marking in multi-cat homes?',
      answer: "Yes. Cats often mark territory in response to detecting other cats' scent markers. By neutralizing these odor signals, activated carbon can reduce the triggers that lead to territorial marking and spraying behavior.",
    },
    {
      question: 'Do I need to use Purrify in every litter box?',
      answer: 'For best results, yes. Odor can build up in any box, and cats may avoid smelly boxes and use other areas of your home. Treating all boxes ensures consistent odor control and encourages proper litter box use.',
    },
    {
      question: 'Is it safe if my cats share litter boxes?',
      answer: "Purrify is 100% safe regardless of how your cats use their boxes. Made from food-grade coconut shell carbon, it's non-toxic even if ingested during grooming. However, we recommend maintaining enough boxes to reduce stress and territorial issues.",
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
              alt="Multiple cats living together in clean, odor-free environment"
              width={1200}
              height={675}
              className="w-full h-auto rounded-lg shadow-lg mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Multi-Cat Household Odor Solution
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
              With 2, 3, or 4+ cats, odors don&apos;t just add up—they multiply exponentially. Standard litters can&apos;t keep up.
              Activated carbon tackles multi-cat odor at the molecular level, handling what other solutions can&apos;t.
            </p>
          </div>

          {/* Main Solution Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6 text-electric-indigo dark:text-electric-indigo-400 text-center">The Multi-Cat Challenge</h2>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-200 text-center">
              Multi-cat households face compounded odor challenges. With 2, 3, 4, or more cats, odors don&apos;t just add up—they multiply.
              Multiple litter boxes, territorial marking, and concentrated waste create an overwhelming smell that traditional litters
              and deodorizers simply can&apos;t handle. Purrify&apos;s industrial-strength activated carbon absorbs odors at the molecular level,
              giving you the power to enjoy a fresh home no matter how many cats you have.
            </p>

            <Image
              src={solutionImage}
              alt="Happy multi-cat household with successful odor management"
              width={1200}
              height={675}
              className="w-full h-auto rounded-lg shadow-md mb-6"
            />

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Instant Results</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Works immediately across all litter boxes</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🌿</div>
                <h3 className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">100% Natural</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Safe for all your cats, no matter how many</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Cost Effective</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Less expensive than buying premium litter for every box</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/products/trial-size/"
                className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Try Purrify Risk-Free
              </Link>
            </div>
          </div>

          {/* Multi-Cat Challenges Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-deep-coral/10 dark:border-deep-coral/20 hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-heading font-bold mb-4 text-deep-coral dark:text-deep-coral-400">Multi-Cat Household Challenges</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 dark:text-red-400 mr-3">❌</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Exponential odor buildup</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - Each additional cat multiplies the smell problem</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 dark:text-red-400 mr-3">❌</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Multiple litter boxes required</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - Rule of thumb: one per cat plus one extra</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 dark:text-red-400 mr-3">❌</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Territorial marking</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - Multiple cats can lead to competition and stronger scents</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 dark:text-red-400 mr-3">❌</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Expensive litter costs</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - Premium litter for 3+ boxes adds up quickly</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 dark:text-red-400 mr-3">❌</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Constant maintenance</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - More cats means more frequent cleaning needed</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-heading font-bold mb-4 text-electric-indigo dark:text-electric-indigo-400">Purrify Multi-Cat Solutions</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-3">✅</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Industrial-strength absorption</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - Handles odors from any number of cats</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-3">✅</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Works in all litter boxes</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - One solution for your entire multi-cat setup</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-3">✅</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Neutralizes territorial scents</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - Reduces marking behavior by eliminating odor triggers</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-3">✅</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Cost-effective for multiple boxes</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - Use affordable litter + Purrify in all boxes</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-3">✅</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Extends time between changes</strong>
                    <span className="text-gray-700 dark:text-gray-200"> - Superior odor control means less frequent cleaning</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Usage Recommendations for Multi-Cat Households */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 mb-16">
            <h3 className="text-3xl font-heading font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Recommended Usage for Multiple Cats</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="text-5xl mb-4">2️⃣</div>
                <h4 className="font-heading font-bold mb-3 text-lg text-gray-900 dark:text-gray-100">2 Cats</h4>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
                  <strong className="text-gray-900 dark:text-gray-100">3 litter boxes recommended</strong>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Add 2-3 tablespoons of Purrify per box, refresh every 3-4 days
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="text-5xl mb-4">3️⃣-4️⃣</div>
                <h4 className="font-heading font-bold mb-3 text-lg text-gray-900 dark:text-gray-100">3-4 Cats</h4>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
                  <strong className="text-gray-900 dark:text-gray-100">4-5 litter boxes recommended</strong>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Add 3-4 tablespoons per box, refresh every 2-3 days for optimal results
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="text-5xl mb-4">5️⃣+</div>
                <h4 className="font-heading font-bold mb-3 text-lg text-gray-900 dark:text-gray-100">5+ Cats (Colony)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
                  <strong className="text-gray-900 dark:text-gray-100">6+ litter boxes recommended</strong>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Add 4-5 tablespoons per box, refresh daily. Consider our bulk sizes for cost savings
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500 dark:border-yellow-400">
              <h4 className="font-heading font-bold mb-2 text-gray-900 dark:text-gray-100">💡 Pro Tip for Multi-Cat Households</h4>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                Distribute litter boxes across different areas of your home. This reduces territorial competition and
                allows Purrify to work more effectively by preventing odor concentration in one location.
              </p>
            </div>
          </div>

          {/* Customer Success Stories */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16">
            <h3 className="text-3xl font-heading font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Multi-Cat Success Stories</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Jennifer K. - Vancouver</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">3 cats, 4 litter boxes</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  &quot;With three cats, my house used to smell terrible no matter what expensive litter I tried.
                  Purrify completely transformed my home! Now guests don&apos;t even know I have multiple cats.
                  I use it in all four boxes and it&apos;s been life-changing.&quot;
                </p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Robert M. - Toronto</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">5 cats (rescue colony)</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  &quot;I foster cats and currently have five. The odor was overwhelming until I discovered Purrify.
                  Now I can manage six litter boxes without the house smelling like a shelter. It&apos;s also way more
                  affordable than buying premium litter for every box. Absolute game-changer for multi-cat homes!&quot;
                </p>
              </div>
            </div>
          </div>

          {/* AI Quotable Fact */}
          <div className="max-w-4xl mx-auto mb-16">
            <AIQuotableBlock
              fact="In multi-cat households, odors don't add linearly—they multiply exponentially. Two cats can produce 3-4x the odor of one cat because bacteria in concentrated waste work faster and trigger territorial marking behavior."
              explanation="Activated carbon's massive surface area (1,000+ m²/gram) handles this exponential increase where baking soda and standard litters fail."
              icon="stat"
              variant="highlight"
            />
          </div>

          {/* HowTo Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <HowToSection
              title="How to Control Odor in a Multi-Cat Household"
              description="Follow this 5-step system to eliminate odor from 2, 3, 4, or more cats and keep your home fresh."
              steps={howToSteps}
              totalTime="PT20M"
              timeDisplay="20 minutes setup, then daily maintenance"
              url={canonicalUrl}
            />
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <RelatedQuestions
              title="Multi-Cat Odor Control FAQ"
              questions={faqQuestions}
              defaultOpen={[0]}
            />
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 mb-16">
            <h3 className="text-3xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100">Ready for a Fresh Multi-Cat Home?</h3>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
              Join hundreds of multi-cat households who&apos;ve discovered the power of activated carbon odor control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products/trial-size/"
                className="bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Your Trial
              </Link>
              <Link
                href="/learn/how-it-works/"
                className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-semibold underline"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedSolutions currentPath="/learn/solutions/multiple-cats-odor-control" />

      {/* Related Articles */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <RelatedContent currentUrl="/learn/solutions/multiple-cats-odor-control" />
        </div>
      </section>
    </div>
  );
}
