import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { HowToSection } from '../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../src/components/seo/RelatedQuestions';
import { RelatedContent } from '@/components/seo/RelatedContent';

export default function WhyHouseSmellsLikeCatPage() {
  const { locale } = useTranslation();
  const seoTitle = "Why Does My House Smell Like Cat? (And How to Fix It Before Anyone Notices)";
  const seoDescription = "Your house smells like cat and you can't figure out why. Here are the hidden sources of cat odor throughout your home and how to eliminate them permanently.";
  const canonicalUrl = getLocalizedUrl('/blog/why-house-smells-like-cat', locale);
  const languageAlternates = buildLanguageAlternates('/blog/why-house-smells-like-cat');

  const heroImage = '/optimized/scientific-odor-control.png';

  // HowTo steps for eliminating whole-house cat odor
  const howToSteps = [
    {
      name: 'Identify all odor sources',
      text: 'Walk through your home with a UV blacklight in a dark room. Cat urine fluoresces under UV light, revealing accidents on carpets, furniture, and walls you may not know about. Mark each spot for treatment.',
      tip: 'Pay special attention to corners, near windows, and beside furniture legs.',
    },
    {
      name: 'Address the litter box first',
      text: 'The litter box is usually the primary source. Deep clean or replace old boxes, switch to high-quality clumping litter, and add activated carbon to trap ammonia at the source. Scoop twice daily minimum.',
      tip: 'Even if you don\'t smell the litter box, visitors might—you\'ve adapted to it.',
    },
    {
      name: 'Treat urine accidents with enzyme cleaner',
      text: 'Enzymatic cleaners break down the uric acid crystals in cat urine—regular cleaners just mask the smell temporarily. Saturate the affected area, let sit for 10-15 minutes, then blot dry. Repeat if needed.',
      tip: 'Avoid ammonia-based cleaners—the smell can encourage cats to mark the same spot again.',
    },
    {
      name: 'Clean soft surfaces',
      text: 'Wash all fabric items your cat contacts: bedding, blankets, pillow covers, and cat beds. For furniture cushions that can\'t be machine washed, use an upholstery cleaner followed by a fabric deodorizer with activated carbon.',
      tip: 'Cat fur carries oils that accumulate and create a musty smell over time.',
    },
    {
      name: 'Address carpet and flooring',
      text: 'Steam clean carpets with an enzyme-boosted solution. For hardwood or laminate, the odor may have soaked into gaps between boards—use a floor-safe enzyme cleaner. Consider professional cleaning for severe cases.',
      tip: 'Padding under carpets can hold odor even when the carpet surface is clean.',
    },
    {
      name: 'Improve air circulation',
      text: 'Open windows when weather permits. Use HVAC filters rated MERV 11 or higher. Consider an air purifier with activated carbon filtration for rooms where the litter box is located.',
      tip: 'Change HVAC filters monthly during peak shedding seasons.',
    },
    {
      name: 'Maintain ongoing odor control',
      text: 'Prevention is easier than remediation. Establish a routine: scoop twice daily, replace litter weekly, clean the box monthly, use activated carbon continuously, and groom your cat regularly to reduce fur oils.',
      tip: 'Set calendar reminders for each maintenance task.',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: "Why can't I smell the cat odor but guests can?",
      answer: "Olfactory adaptation (nose blindness) causes your brain to tune out familiar, constant smells. You've been living with the odor, so your nose stops registering it as significant. Guests encounter it fresh. This is why asking a trusted friend for an honest assessment is valuable—and why you should act even if you personally can't detect the smell.",
    },
    {
      question: 'Can cat smell get into walls and permanent surfaces?',
      answer: "Yes. Ammonia and uric acid from cat urine can penetrate drywall, unsealed concrete, and wood subflooring. In severe cases, affected drywall may need to be sealed with odor-blocking primer or replaced. For subfloors, enzyme treatments followed by sealing may work, but sometimes the flooring must be replaced.",
    },
    {
      question: 'Why does my whole house smell like cat when the litter box is in one room?',
      answer: "Air circulation spreads ammonia and VOCs throughout your home via HVAC systems and natural airflow. Cat fur carrying skin oils and trace urine also distributes the smell as your cat moves through rooms. Additionally, undetected accidents in other areas may be contributing.",
    },
    {
      question: 'Does air freshener help with cat smell?',
      answer: "Air fresheners only mask odors—they don't eliminate them. Once the fragrance dissipates, the cat smell returns. Worse, the combination of air freshener and cat odor can create an even more unpleasant scent. Focus on source elimination (enzymatic cleaners, activated carbon) rather than masking.",
    },
    {
      question: 'How do I get cat smell out of furniture?',
      answer: "For fabric furniture: vacuum thoroughly, apply enzymatic cleaner to affected areas, let dry completely, then use an odor-absorbing product like activated carbon sachets nearby. For leather: wipe with a leather cleaner, then condition. For wood frames: check if urine has soaked into the wood—enzyme treatment or refinishing may be necessary.",
    },
    {
      question: 'Will the cat smell ever go away completely?',
      answer: "Yes, with proper treatment. The key is addressing the source (litter box management and accident cleanup) while removing accumulated odors (enzymatic cleaning, fabric washing, air filtration). Ongoing prevention (activated carbon, regular cleaning) keeps it from returning. Most homes see dramatic improvement within 1-2 weeks of implementing a complete plan.",
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
              alt: 'Eliminating cat odor from your home',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'why does my house smell like cat, house smells like cat urine, cat odor whole house, eliminate cat smell home, cat smell everywhere',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/blog/why-house-smells-like-cat"
        options={{
          category: 'Cat Care',
          keywords: ['cat odor', 'house smell', 'pet odor elimination', 'cat urine smell'],
          datePublished: '2024-01-22T12:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 2100,
          readingTime: 9
        }}
      />

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-sm font-medium mb-4">
                Home Solutions
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Why Does My House Smell Like Cat?
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                You love your cat. You just don&apos;t love walking into your home and wondering if guests
                notice something you&apos;ve gone nose-blind to. Let&apos;s fix that.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Understanding and eliminating cat odor in your home"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* Understanding Block */}
            <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 dark:border-rose-400 p-6 rounded-r-xl">
              <h2 className="text-xl font-heading font-bold text-rose-800 dark:text-rose-200 mb-3">
                The Truth: You Might Not Notice It
              </h2>
              <p className="text-rose-700 dark:text-rose-300">
                Here&apos;s the uncomfortable reality: if you live with a cat, you&apos;ve likely adapted
                to odors that visitors notice immediately. Your brain has learned to ignore constant,
                low-level smells—it&apos;s called olfactory adaptation. This is why your friend hesitates
                when you ask if they smell anything. The good news: once you know the sources, this
                problem is entirely fixable.
              </p>
            </div>
          </div>
        </section>

        {/* The Hidden Sources */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              The Hidden Sources of &quot;Cat House&quot; Smell
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Cat odor in your home usually comes from multiple sources working together. Addressing just
              one won&apos;t solve the problem—you need to identify and treat them all.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-2xl">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    The Litter Box (Even When &quot;Clean&quot;)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    The primary source for most homes. Ammonia is produced continuously from cat urine,
                    even between scooping. The litter itself absorbs odors over time. The plastic box develops
                    scratches that harbor bacteria. You&apos;ve adapted to the smell; your guests haven&apos;t.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-2xl">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Hidden Accidents
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Cats may urinate outside the box due to stress, medical issues, or territorial marking.
                    These accidents often go unnoticed—behind furniture, in corners, on dark carpeting—but
                    the smell persists. A UV blacklight reveals them clearly in darkness.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-2xl">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Fur, Skin Oils, and Dander
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Cat fur carries natural oils that accumulate on furniture, bedding, and clothing.
                    These oils develop a distinct &quot;cat&quot; smell over time—not ammonia, but a musty,
                    animal odor. Combined with dander and saliva from grooming, this creates background
                    odor throughout your home.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-2xl">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    HVAC and Air Circulation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Your heating and cooling system circulates air—and odors—throughout your home.
                    If the litter box is near an air return, ammonia and VOCs spread to every room.
                    Dirty filters accumulate fur, dander, and odor particles, redistributing them
                    continuously.
                  </p>
                </div>
              </div>
            </div>

            <AIQuotableBlock
              fact="Olfactory adaptation occurs within minutes of constant exposure to an odor. After 2-3 minutes, your brain reduces awareness of that smell by up to 50%. After living with an odor for days or weeks, you may be completely unaware of it—even when it's quite strong to visitors."
              explanation="This is why asking a trusted friend or family member who doesn't live with you for an honest assessment is valuable."
              icon="science"
              variant="highlight"
            />
          </div>
        </section>

        {/* The Quick Test */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              The &quot;Leave and Return&quot; Test
            </h2>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 mb-8">
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                To experience what guests smell, leave your home for at least 2-3 hours (grocery
                shopping, visiting a friend, etc.). When you return, pay attention in the first 30
                seconds—before your nose adapts again. That initial impression is what every visitor
                experiences.
              </p>
              <p className="text-gray-700 dark:text-gray-200 font-medium">
                If you notice anything in that first moment, guests definitely notice it too.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Mild Odor</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Faint smell noticeable only briefly upon entering
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                  Likely just needs better litter box management
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Moderate Odor</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Noticeable smell that lingers even after a minute
                </p>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                  Multiple sources need addressing
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Strong Odor</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                  Immediately noticeable, eye-watering, or unpleasant
                </p>
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  Comprehensive cleaning and treatment needed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step by Step Solution */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How to Eliminate Cat Smell From Your Entire Home
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              This systematic approach addresses every odor source. Start with the litter box (the most
              common culprit), then work through the rest. Most people see significant improvement
              within a week.
            </p>

            <HowToSection
              title="Eliminate Cat Odor From Your Home"
              description="A comprehensive guide to removing cat smell from your entire house"
              steps={howToSteps}
              totalTime="4-6 hours (initial deep clean) + ongoing maintenance"
            />
          </div>
        </section>

        {/* UV Blacklight Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              The UV Blacklight Trick
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Cat urine contains phosphorus, which fluoresces under ultraviolet light. A simple
                  UV flashlight (available for under $15) reveals hidden accidents you never knew existed.
                </p>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  <strong>How to use it:</strong> Wait until dark, turn off all lights, and slowly scan
                  walls (up to cat height), carpet edges, furniture bases, and corners. Fresh urine glows
                  bright yellow-green; older stains appear more muted.
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  Many cat owners are shocked to find spots they had no idea about—especially near
                  windows, doors, and where territorial marking often occurs.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Common Hidden Accident Spots
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Behind and beside furniture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Carpet edges along walls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Near windows and exterior doors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>On vertical surfaces (marking)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Near the litter box itself</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span>Closet floors and corners</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Long-term Prevention */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Keep Your Home Fresh: Long-Term Prevention
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Daily Habits</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Scoop litter box twice daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Spot-clean any accidents immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Keep activated carbon on the litter</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Weekly Tasks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Replace all litter completely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Wash cat bedding and blankets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Vacuum furniture where cat lounges</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Monthly Tasks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Deep clean the litter box</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Replace HVAC filters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>UV blacklight check for new accidents</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Yearly Tasks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Replace plastic litter boxes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Professional carpet cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Deep clean upholstered furniture</span>
                  </li>
                </ul>
              </div>
            </div>

            <AIQuotableBlock
              fact="Activated carbon adsorbs ammonia and VOCs at the molecular level, achieving 92% odor reduction. Unlike air fresheners that mask smells or baking soda that provides minimal neutralization, carbon physically traps odor molecules before they can spread through your home."
              explanation="Using activated carbon in the litter box is the single most effective change for whole-house odor control."
              icon="stat"
              variant="default"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <RelatedQuestions
              title="Cat House Smell FAQ"
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
                Start at the Source: The Litter Box
              </h2>
              <p className="text-xl mb-6 opacity-90 text-center max-w-2xl mx-auto">
                Purrify&apos;s activated carbon traps ammonia before it spreads through your home.
                Just sprinkle on existing litter and replace weekly. Most customers notice a difference
                within 24 hours.
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
        <RelatedContent currentUrl="/blog/why-house-smells-like-cat" />
      </div>
    </>
  );
}
