import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleSchema } from '../../../src/components/seo/json-ld-schema';
import Image from 'next/image';
import { useTranslation } from '../../../src/lib/translation-context';
import { formatProductPrice } from '../../../src/lib/pricing';
import { buildLanguageAlternates, getLocalizedUrl } from '../../../src/lib/seo-utils';
import { RelatedSolutions } from '../../../src/components/learn/RelatedSolutions';
import { HowToSection } from '../../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../../src/components/seo/RelatedQuestions';

export default function MultipleCatsOdorControlPage() {
  const { locale } = useTranslation();
  const trialPrice = formatProductPrice('trial', locale);
  const riskFreeLabel = `Try Purrify Risk-Free - ${trialPrice} (shipping included)`;
  const startTrialLabel = `Start Your Trial - ${trialPrice} (shipping included)`;
  const seoTitle = 'Multi-Cat Household Odor Solution: Complete Guide for 2+ Cats';
  const seoDescription = 'Struggling with cat smell from multiple cats? Odors multiply exponentially with each cat. Activated carbon handles 3, 4, 5+ cats where other solutions fail. See dosage guide.';
  const canonicalUrl = getLocalizedUrl('/learn/solutions/multiple-cats-odor-control', locale);
  const languageAlternates = buildLanguageAlternates('/learn/solutions/multiple-cats-odor-control');

  // SEO optimized images for multi-cat households
  const heroImage = '/optimized/multiple-cats-together.webp';
  const solutionImage = '/images/ammonia-fresh-home.webp';

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
      answer: 'Odors don\'t just add up—they multiply. Each cat produces 3-4 ounces of urine daily, and the bacteria converting it to ammonia work faster in concentrated waste. Two cats don\'t create double the odor; they can create 3-4x the smell.',
    },
    {
      question: 'Can Purrify help reduce territorial marking in multi-cat homes?',
      answer: 'Yes. Cats often mark territory in response to detecting other cats\' scent markers. By neutralizing these odor signals, activated carbon can reduce the triggers that lead to territorial marking and spraying behavior.',
    },
    {
      question: 'Do I need to use Purrify in every litter box?',
      answer: 'For best results, yes. Odor can build up in any box, and cats may avoid smelly boxes and use other areas of your home. Treating all boxes ensures consistent odor control and encourages proper litter box use.',
    },
    {
      question: 'Is it safe if my cats share litter boxes?',
      answer: 'Purrify is 100% safe regardless of how your cats use their boxes. Made from food-grade coconut shell carbon, it\'s non-toxic even if ingested during grooming. However, we recommend maintaining enough boxes to reduce stress and territorial issues.',
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
              alt: 'Multiple cats living harmoniously in odor-free home',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'multi cat household odor solution, multiple cats smell, how to control cat smell with multiple cats, best litter for multiple cats, cat odor 3 cats 4 cats 5 cats, multi-cat litter box odor',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/learn/solutions/multiple-cats-odor-control"
        options={{
          category: 'Multi-Cat Solutions',
          keywords: ['multiple cats', 'multi-cat household', 'odor control', 'cat colony', 'large cat family', 'several cats', 'many cats'],
          datePublished: '2024-01-15T11:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 1800,
          readingTime: 8
        }}
      />

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
                Multi-cat households face compounded odor challenges. With 2, 3, 4, or more cats, odors don't just add up—they multiply.
                Multiple litter boxes, territorial marking, and concentrated waste create an overwhelming smell that traditional litters
                and deodorizers simply can't handle. Purrify's industrial-strength activated carbon absorbs odors at the molecular level,
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
                  href="/products/trial-size"
                  className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {riskFreeLabel}
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

            {/* How It Works for Multiple Cats */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 mb-16">
              <h3 className="text-3xl font-heading font-bold mb-8 text-center text-gray-900 dark:text-gray-100">How Purrify Handles Multiple Cats</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <h4 className="font-heading font-bold mb-2 text-gray-900 dark:text-gray-100">Step 1: Comprehensive Coverage</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Add Purrify to each litter box in your multi-cat setup. The activated carbon starts working immediately
                    to create an odor barrier in every box.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-heading font-bold mb-2 text-gray-900 dark:text-gray-100">Step 2: Molecular Absorption</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    As each cat uses their box, Purrify's porous structure traps ammonia and other odor molecules
                    before they can combine and multiply throughout your home.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h4 className="font-heading font-bold mb-2 text-gray-900 dark:text-gray-100">Step 3: Lasting Freshness</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Continuous odor elimination across all boxes means a consistently fresh home,
                    no matter how many cats you have or how often they use the litter.
                  </p>
                </div>
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
                    "With three cats, my house used to smell terrible no matter what expensive litter I tried.
                    Purrify completely transformed my home! Now guests don't even know I have multiple cats.
                    I use it in all four boxes and it's been life-changing."
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
                    "I foster cats and currently have five. The odor was overwhelming until I discovered Purrify.
                    Now I can manage six litter boxes without the house smelling like a shelter. It's also way more
                    affordable than buying premium litter for every box. Absolute game-changer for multi-cat homes!"
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl">⭐</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">Michelle L. - Calgary</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">4 cats in townhouse</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 text-sm">
                    "Living in a townhouse with four cats meant odors would spread to every floor. I tried everything—
                    expensive litters, air purifiers, you name it. Purrify is the only thing that actually worked.
                    My home smells fresh again and I'm saving money using regular litter with Purrify added."
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl">⭐</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">David & Sarah P. - Montreal</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">2 cats, small apartment</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 text-sm">
                    "We adopted a second cat but were worried about odor in our 600 sq ft apartment.
                    Purrify has been amazing! We use it in both boxes and there's zero smell. Friends are
                    shocked when we tell them we have two cats. Highly recommend for multi-cat apartments!"
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 mb-16">
              <h3 className="text-3xl font-heading font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Multi-Cat FAQs</h3>
              <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h4 className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">How much Purrify do I need for multiple cats?</h4>
                  <p className="text-gray-700 dark:text-gray-200">
                    For 2-3 cats, our 500g jar typically lasts 6-8 weeks. For 4+ cats, we recommend our 1kg or bulk sizes
                    for better value. Add 2-4 tablespoons per litter box depending on usage frequency.
                  </p>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h4 className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Will Purrify work with different litter types in different boxes?</h4>
                  <p className="text-gray-700 dark:text-gray-200">
                    Absolutely! Purrify works with all litter types—clay, clumping, crystal, wood, corn, wheat, you name it.
                    You can use different litters in different boxes and Purrify will work effectively in all of them.
                  </p>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h4 className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Can Purrify help with territorial marking issues?</h4>
                  <p className="text-gray-700 dark:text-gray-200">
                    Yes! By eliminating odors that can trigger territorial behavior, Purrify can help reduce marking issues.
                    Cats often mark in response to other cats' scents. When Purrify neutralizes these odor triggers,
                    it can decrease the urge to mark territory.
                  </p>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h4 className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">How does Purrify compare to buying premium litter for all my boxes?</h4>
                  <p className="text-gray-700 dark:text-gray-200">
                    Much more cost-effective! Premium litters cost $20-40 per box per month. With Purrify, you can use
                    affordable basic litter ($10-15 per box) plus add Purrify ($15-20/month for 3-4 boxes), saving you
                    $30-80 per month while getting better odor control.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Is Purrify safe if my cats share litter boxes?</h4>
                  <p className="text-gray-700 dark:text-gray-200">
                    100% safe! Purrify is made from food-grade activated carbon with no added chemicals, fragrances, or toxins.
                    It's completely safe for all your cats, whether they each have their own box or share. However, we do recommend
                    following the guideline of one box per cat plus one extra for best hygiene and reduced stress.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 mb-16">
              <h3 className="text-3xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100">Ready for a Fresh Multi-Cat Home?</h3>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
                Join hundreds of multi-cat households who've discovered the power of activated carbon odor control.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/products/trial-size"
                  className="bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {startTrialLabel}
                </Link>
                <Link
                  href="/learn/how-it-works"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-semibold underline"
                >
                  Learn How It Works
                </Link>
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

            {/* FAQ Section - Replace existing FAQ with RelatedQuestions component */}
            <div className="max-w-4xl mx-auto mb-16">
              <RelatedQuestions
                title="Multi-Cat Odor Control FAQ"
                questions={faqQuestions}
                defaultOpen={[0]}
              />
            </div>
          </div>
        </section>

        <RelatedSolutions currentPath="/learn/solutions/multiple-cats-odor-control" />
      </div>
    </>
  );
}
