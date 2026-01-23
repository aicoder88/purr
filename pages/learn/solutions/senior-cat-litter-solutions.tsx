import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleSchema } from '../../../src/components/seo/json-ld-schema';
import Image from 'next/image';
import { formatProductPrice } from '../../../src/lib/pricing';
import { useTranslation } from '../../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../../src/lib/seo-utils';
import { RelatedSolutions } from '../../../src/components/learn/RelatedSolutions';
import { HowToSection } from '../../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../../src/components/seo/RelatedQuestions';

export default function SeniorCatLitterSolutionsPage() {
  const { locale } = useTranslation();
  const seoTitle = 'Why Does My Older Cat\'s Litter Box Smell Worse? (Senior Cat Odor Guide)';
  const seoDescription = 'Older cat\'s litter box smelling worse than before? Aging kidneys produce more concentrated, stronger-smelling urine. Here\'s how to handle senior cat odor without harsh chemicals.';
  const canonicalUrl = getLocalizedUrl('/learn/solutions/senior-cat-litter-solutions', locale);
  const languageAlternates = buildLanguageAlternates('/learn/solutions/senior-cat-litter-solutions');

  // SEO optimized images for senior cat care
  const heroImage = '/images/solutions/ammonia-happy-cat.png';
  const solutionImage = '/images/solutions/apartment-hero.png';
  const careImage = '/images/solutions/litter-box-hero.png';

  // HowTo steps for senior cat odor control
  const howToSteps = [
    {
      name: 'Schedule a vet checkup',
      text: 'Sudden increases in litter box odor can indicate kidney disease, diabetes, or urinary tract issues. Rule out health problems before addressing odor.',
      tip: 'Senior cats (10+ years) should have bloodwork done annually to catch kidney issues early.',
    },
    {
      name: 'Increase litter box accessibility',
      text: 'Place boxes on every floor and in easily accessible locations. Use boxes with low sides for arthritic cats. Senior cats may need 2-3 boxes even for single-cat homes.',
    },
    {
      name: 'Choose fragrance-free odor control',
      text: 'Senior cats often have reduced tolerance for strong scents. Avoid scented litters and chemical deodorizers—use activated carbon which is odorless to cats.',
      tip: 'If your senior cat suddenly avoids the litter box, a new scented product may be the cause.',
    },
    {
      name: 'Use extra activated carbon for stronger odors',
      text: 'Senior cat urine is more concentrated. Add 3-4 tablespoons of activated carbon instead of the standard 2-3. Refresh every 2-3 days instead of weekly.',
    },
    {
      name: 'Scoop more frequently',
      text: 'Senior cats often urinate more frequently due to kidney changes. Scoop 2-3 times daily to remove waste before ammonia builds up.',
    },
  ];

  // FAQ questions for senior cat odor
  const faqQuestions = [
    {
      question: 'Why does my older cat\'s urine smell so much stronger?',
      answer: 'As cats age, kidney function naturally declines. Less efficient kidneys produce more concentrated urine with higher ammonia levels. This is normal aging, but sudden changes warrant a vet visit to check for kidney disease or diabetes.',
    },
    {
      question: 'Is the strong smell from my senior cat harmful?',
      answer: 'High ammonia levels can irritate both your cat\'s respiratory system and yours. Senior cats are more vulnerable because they spend more time near their litter boxes. Controlling odor with activated carbon protects everyone in the household.',
    },
    {
      question: 'Should I switch to a different litter for my senior cat?',
      answer: 'Don\'t switch litters suddenly—senior cats are creatures of habit and may stop using the box. Instead, add activated carbon to your existing litter. This controls odor without changing the texture or feel your cat is used to.',
    },
    {
      question: 'Why does my senior cat seem bothered by scented litters?',
      answer: 'Cats\' sense of smell remains strong even as they age, and many become more sensitive to artificial fragrances. Strong scents can cause litter box avoidance, leading to accidents around the house. Fragrance-free solutions like activated carbon work without overwhelming their senses.',
    },
    {
      question: 'How often should I completely change litter for a senior cat?',
      answer: 'With activated carbon, every 1-2 weeks is usually sufficient even for senior cats with stronger-smelling urine. Monitor the box—if odor breaks through between changes, increase your carbon refreshes or change litter more frequently.',
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
              alt: 'Senior cat comfortable with gentle litter solution',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'older cat litter box smell worse, senior cat urine smell stronger, elderly cat odor control, why does my old cat\'s pee smell, aging cat kidney smell, geriatric cat litter solutions',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/learn/solutions/senior-cat-litter-solutions"
        options={{
          category: 'Senior Pet Care',
          keywords: ['senior cats', 'elderly pet care', 'gentle odor control', 'aging cats'],
          datePublished: '2024-01-15T13:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 850,
          readingTime: 4
        }}
      />

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Image
                src={heroImage}
                alt="Senior cat resting comfortably in clean environment"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-lg mb-8"
              />
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Why Does My Older Cat&apos;s Litter Box Smell Worse?
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
                As cats age, declining kidney function produces more concentrated, stronger-smelling urine. Here&apos;s why it happens and how to control senior cat odor without harsh chemicals that bother sensitive systems.
              </p>
            </div>

            {/* Main Solution Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-heading font-bold mb-6 text-electric-indigo dark:text-electric-indigo-400 text-center">Understanding Senior Cat Needs</h2>

              <Image
                src={careImage}
                alt="Gentle care approach for senior cats"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-md mb-6"
              />

              <p className="text-lg mb-8 text-gray-700 dark:text-gray-200 text-center">
                As cats age, their kidneys may produce stronger-smelling urine, and they may develop
                sensitivities to fragrances and chemicals. Purrify provides powerful odor control
                without harsh additives.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">🌸</div>
                  <h3 className="font-heading font-bold text-lg mb-2">Fragrance-Free</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">No artificial scents that can irritate sensitive seniors</p>
                </div>
                <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">💖</div>
                  <h3 className="font-heading font-bold text-lg mb-2">Gentle & Natural</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Made from coconut shells - safe for sensitive systems</p>
                </div>
                <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">💪</div>
                  <h3 className="font-heading font-bold text-lg mb-2">Extra Strong</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Handles stronger odors from aging kidneys</p>
                </div>
              </div>

              <Image
                src={solutionImage}
                alt="Senior cat living peacefully in odor-free home"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-md mb-6"
              />

              <div className="bg-gradient-to-r from-electric-indigo/10 to-deep-coral/10 dark:from-electric-indigo/20 dark:to-deep-coral/20 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-50">Special Considerations for Senior Cats</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-heading font-semibold mb-2 text-electric-indigo dark:text-electric-indigo-300">Health Changes</h4>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-200">
                      <li>• Kidney function decline</li>
                      <li>• Stronger urine odor</li>
                      <li>• Increased frequency</li>
                      <li>• Arthritis affecting box access</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-2 text-deep-coral dark:text-deep-coral-300">How Purrify Helps</h4>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-200">
                      <li>• Neutralizes stronger odors</li>
                      <li>• No respiratory irritants</li>
                      <li>• Works with any litter type</li>
                      <li>• Easy application</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-50">Give Your Senior Cat the Comfort They Deserve</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Gentle enough for sensitive seniors, powerful enough for their changing needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products/trial-size"
                    className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {`Start with Trial Size - ${formatProductPrice('trial')}`}
                  </Link>
                  <Link
                    href="/learn/using-deodorizers-with-kittens"
                    className="inline-block border-2 border-electric-indigo dark:border-electric-indigo text-electric-indigo dark:text-electric-indigo-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-electric-indigo/10 dark:hover:bg-electric-indigo/20 hover:scale-105 transition-all duration-300"
                  >
                    Senior Care Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* Age-Related Tips */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 mb-16">
              <h3 className="text-2xl font-heading font-bold mb-6 text-center text-gray-900 dark:text-gray-50">Senior Cat Litter Box Tips</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">🚪</div>
                  <h4 className="font-heading font-bold mb-2">Lower Sides</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Easier entry for arthritic cats</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📍</div>
                  <h4 className="font-heading font-bold mb-2">Multiple Boxes</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Closer access throughout home</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🧼</div>
                  <h4 className="font-heading font-bold mb-2">Frequent Cleaning</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Daily scooping plus Purrify</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🌡️</div>
                  <h4 className="font-heading font-bold mb-2">Warmth</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Keep boxes away from drafts</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 text-white dark:text-gray-100 text-center mb-16">
              <blockquote className="text-2xl font-medium mb-4">
                "My 16-year-old Mittens has kidney issues, and the smell was getting really bad.
                Purrify works so well, and it doesn't bother her sensitive nose at all."
              </blockquote>
              <cite className="text-purple-100 dark:text-gray-300">— Linda K., Senior Cat Owner</cite>
            </div>

            {/* AI Quotable Fact */}
            <div className="max-w-4xl mx-auto mb-16">
              <AIQuotableBlock
                fact="Senior cats with declining kidney function produce urine with 2-3x higher ammonia concentration than younger cats. This is why the litter box seems to smell worse as cats age, even with the same cleaning routine."
                explanation="Activated carbon's massive surface area handles this increased ammonia load without irritating sensitive senior cats with fragrances or chemicals."
                icon="science"
                variant="highlight"
              />
            </div>

            {/* HowTo Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <HowToSection
                title="How to Control Stronger Odor from Your Senior Cat"
                description="Follow these 5 steps to manage age-related litter box odor while keeping your senior cat comfortable."
                steps={howToSteps}
                totalTime="PT15M"
                timeDisplay="15 minutes setup, ongoing daily care"
                url={canonicalUrl}
              />
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <RelatedQuestions
                title="Senior Cat Odor Questions"
                questions={faqQuestions}
                defaultOpen={[0]}
              />
            </div>
          </div>
        </section>

        <RelatedSolutions currentPath="/learn/solutions/senior-cat-litter-solutions" />
      </div>
    </>
  );
}
