import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '../../../src/components/seo/json-ld-schema';
import { useTranslation } from '../../../src/lib/translation-context';
import { formatProductPrice } from '../../../src/lib/pricing';
import { buildLanguageAlternates, getLocalizedUrl } from '../../../src/lib/seo-utils';
import { HowToSection } from '../../../src/components/seo/HowToSection';
import { RelatedQuestions } from '../../../src/components/seo/RelatedQuestions';
import { Check, X, ChevronRight, Home, Beaker, Clock, DollarSign, Shield, Leaf } from 'lucide-react';

export default function ArmAndHammerAlternativePage() {
  const { locale } = useTranslation();
  const trialPrice = formatProductPrice('trial', locale);

  const seoTitle = 'Arm & Hammer Cat Litter Deodorizer Not Working? Try This Instead';
  const seoDescription = 'Baking soda stops working after 48 hours. It can\'t neutralize ammonia (same pH). Here\'s the science-backed alternative that lasts 3x longer.';
  const canonicalUrl = getLocalizedUrl('/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative', locale);
  const languageAlternates = buildLanguageAlternates('/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative');

  const heroImage = '/optimized/baking-soda-alternative.jpg';

  // Comparison data
  const comparisonPoints = [
    {
      feature: 'How it works',
      armHammer: 'Absorbs moisture, masks odor',
      purrify: 'Traps ammonia molecules in microscopic pores',
      winner: 'purrify',
    },
    {
      feature: 'Effective duration',
      armHammer: '24-48 hours before saturation',
      purrify: '7+ days per application',
      winner: 'purrify',
    },
    {
      feature: 'Ammonia neutralization',
      armHammer: 'No (both are alkaline, no reaction)',
      purrify: 'Yes (physical adsorption)',
      winner: 'purrify',
    },
    {
      feature: 'Surface area',
      armHammer: '0.2 m²/gram',
      purrify: '1,150 m²/gram (5,750x more)',
      winner: 'purrify',
    },
    {
      feature: 'Fragrance',
      armHammer: 'Often scented',
      purrify: '100% fragrance-free',
      winner: 'purrify',
    },
    {
      feature: 'Cat safety',
      armHammer: 'Generally safe',
      purrify: 'Water-filter grade, non-toxic',
      winner: 'tie',
    },
    {
      feature: 'Works in humidity',
      armHammer: 'Saturates quickly in humid conditions',
      purrify: 'Consistent performance regardless of humidity',
      winner: 'purrify',
    },
    {
      feature: 'Price per month',
      armHammer: '~$8-12 (requires frequent reapplication)',
      purrify: '~$10-15 (weekly application)',
      winner: 'tie',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: 'Why doesn\'t Arm & Hammer work for ammonia smell?',
      answer: 'Arm & Hammer\'s baking soda is alkaline (pH ~8.3), and ammonia is also alkaline (pH ~11.6). Chemical neutralization requires an acid-base reaction. Since both are bases, there\'s no reaction—the ammonia smell remains. Baking soda only works on acidic odors, not ammonia.',
    },
    {
      question: 'Is Arm & Hammer cat litter deodorizer pet-friendly?',
      answer: 'Arm & Hammer products are generally safe for cats. However, scented varieties may irritate cats with respiratory sensitivities. If your cat avoids the litter box after adding scented deodorizer, switch to a fragrance-free option like activated carbon.',
    },
    {
      question: 'Can I use Arm & Hammer and activated carbon together?',
      answer: 'Yes, they work on different odor compounds. Baking soda handles acidic odors from feces while activated carbon traps ammonia from urine. However, if you\'re using both, activated carbon does most of the heavy lifting—you may find baking soda unnecessary.',
    },
    {
      question: 'How long does Arm & Hammer litter deodorizer last?',
      answer: 'Arm & Hammer baking soda products typically last 24-48 hours before becoming saturated. In humid conditions or multi-cat households, effectiveness drops even faster. You\'ll need to reapply every 1-2 days for consistent odor control.',
    },
    {
      question: 'What\'s the best alternative to Arm & Hammer for cat litter smell?',
      answer: 'Activated carbon (especially coconut shell-based) is the most effective alternative. It has 5,750x more surface area than baking soda, traps ammonia through physical adsorption regardless of pH, and lasts 3-7x longer per application.',
    },
    {
      question: 'Why does my litter still smell after using Arm & Hammer?',
      answer: 'The main litter box odor is ammonia from urine. Baking soda cannot neutralize ammonia because both are alkaline. The initial improvement you noticed was likely from moisture absorption slowing bacterial growth temporarily. Once saturated (24-48 hours), baking soda stops working entirely.',
    },
  ];

  // HowTo steps for switching
  const howToSteps = [
    {
      name: 'Stop adding baking soda',
      text: 'You don\'t need to remove existing baking soda from your litter. Just stop adding more. It won\'t interfere with activated carbon.',
    },
    {
      name: 'Add activated carbon to your litter',
      text: 'Sprinkle 2-3 tablespoons of activated carbon granules onto your litter and mix it in. The black granules will distribute throughout the litter.',
    },
    {
      name: 'Refresh weekly instead of daily',
      text: 'Unlike baking soda which needs daily reapplication, activated carbon lasts 7+ days. Add a fresh tablespoon once per week to maintain peak effectiveness.',
    },
    {
      name: 'Notice the difference within 24 hours',
      text: 'Most cat owners report noticeable improvement within the first day. The ammonia smell that baking soda couldn\'t touch will be significantly reduced or eliminated.',
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
          title: seoTitle,
          description: seoDescription,
          url: canonicalUrl,
          type: 'article',
          images: [
            {
              url: `https://www.purrify.ca${heroImage}`,
              width: 1200,
              height: 630,
              alt: 'Arm & Hammer cat litter deodorizer alternative - activated carbon comparison',
            },
          ],
        }}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative"
        options={{
          category: 'Product Comparison',
          author: 'Purrify Team',
          datePublished: '2025-01-25T10:00:00Z',
          wordCount: 2500,
        }}
      />

      <div className="bg-cream-50 dark:bg-gray-900 min-h-screen">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto pt-6 pb-4 px-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/learn" className="hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
            Learn
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 dark:text-gray-100 font-medium">Arm & Hammer Alternative</span>
        </nav>

        {/* Hero Section */}
        <header className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-sm font-medium mb-6">
            <Beaker className="w-4 h-4" />
            <span>Product Comparison</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
            Arm & Hammer Not Working?<br />
            <span className="text-[#FF3131] dark:text-[#FF5050]">Here&apos;s Why (And What Actually Works)</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            You&apos;ve tried baking soda. Sprinkled it religiously. And 48 hours later, the ammonia smell is back.
            <strong> That&apos;s not your fault—it&apos;s chemistry.</strong>
          </p>
        </header>

        {/* The Problem Section */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6">
              Why Baking Soda Fails Against Ammonia
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Arm & Hammer&apos;s cat litter deodorizer uses <strong>baking soda (sodium bicarbonate)</strong>.
                  It works by neutralizing <em>acidic</em> odors through a chemical reaction.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The problem? <strong>Cat urine ammonia isn&apos;t acidic—it&apos;s alkaline.</strong>
                </p>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    Baking soda pH: ~8.3 (alkaline)<br />
                    Ammonia pH: ~11.6 (alkaline)
                  </p>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-2">
                    Base + Base = No Reaction = Ammonia Smell Stays
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  This is why you can sprinkle Arm & Hammer every day and still smell ammonia.
                  The chemistry simply doesn&apos;t work.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">What Baking Soda Actually Does:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Absorbs moisture temporarily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Neutralizes acidic odors (not ammonia)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Cannot neutralize alkaline ammonia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Saturates within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Requires daily reapplication</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6">
              The Alternative: Activated Carbon
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              Unlike baking soda, <strong>activated carbon doesn&apos;t rely on chemical reactions</strong>.
              It uses <em>physical adsorption</em>—trapping ammonia molecules in millions of microscopic pores.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Beaker className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Works on Ammonia</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Physical trapping works regardless of pH—no chemical reaction needed
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Lasts 7+ Days</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  One weekly application vs. daily baking soda
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">100% Natural</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Coconut shell-based, fragrance-free, water-filter grade
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Surface Area: The Real Difference</h3>
              <div className="flex items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Baking Soda</span>
                    <span className="font-mono text-gray-900 dark:text-gray-100">0.2 m²/g</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 dark:bg-red-500 rounded-full" style={{ width: '0.02%' }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Activated Carbon</span>
                    <span className="font-mono text-gray-900 dark:text-gray-100">1,150 m²/g</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 dark:bg-green-400 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Activated carbon has <strong>5,750x more surface area</strong> for trapping odor molecules
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Arm & Hammer vs. Activated Carbon: Full Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-4 text-left text-gray-900 dark:text-gray-100 font-bold">Feature</th>
                  <th className="p-4 text-left text-gray-900 dark:text-gray-100 font-bold">Arm & Hammer</th>
                  <th className="p-4 text-left text-gray-900 dark:text-gray-100 font-bold">Purrify (Activated Carbon)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonPoints.map((point, index) => (
                  <tr
                    key={point.feature}
                    className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}
                  >
                    <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">{point.feature}</td>
                    <td className={`p-4 ${point.winner === 'purrify' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      {point.armHammer}
                    </td>
                    <td className={`p-4 ${point.winner === 'purrify' ? 'text-green-700 dark:text-green-400 font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                      {point.winner === 'purrify' && <Check className="w-4 h-4 inline mr-1" />}
                      {point.purrify}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How To Switch */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <HowToSection
            title="How to Switch from Arm & Hammer to Activated Carbon"
            description="Making the switch is simple. You don't need to change your litter or routine dramatically."
            steps={howToSteps}
            totalTime="PT5M"
            timeDisplay="5 minutes"
            url={canonicalUrl}
          />
        </section>

        {/* Social Proof */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              What Cat Owners Say After Switching
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <blockquote className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  &quot;I used Arm & Hammer for years. Tried activated carbon on a whim. The difference is night and day. No more ammonia smell—period.&quot;
                </p>
                <footer className="text-sm text-gray-500 dark:text-gray-400">— Jennifer M., 2 cats</footer>
              </blockquote>

              <blockquote className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  &quot;Was adding baking soda every single day. Now I add carbon once a week and it actually works. Should have switched years ago.&quot;
                </p>
                <footer className="text-sm text-gray-500 dark:text-gray-400">— Michael R., studio apartment</footer>
              </blockquote>

              <blockquote className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  &quot;The science finally clicked when I learned baking soda can&apos;t neutralize ammonia. Once I understood why it wasn&apos;t working, switching was obvious.&quot;
                </p>
                <footer className="text-sm text-gray-500 dark:text-gray-400">— Sarah K., multi-cat household</footer>
              </blockquote>

              <blockquote className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  &quot;My roommates used to complain about the litter box smell. Since switching to activated carbon, not a single complaint. It just works.&quot;
                </p>
                <footer className="text-sm text-gray-500 dark:text-gray-400">— Alex T., shared apartment</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-[#FF3131] to-[#FF5050] rounded-2xl p-8 text-center text-white dark:text-gray-100">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Try What Actually Works?
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Purrify uses premium coconut shell activated carbon—the same filtration-grade material found in water purifiers.
              100% fragrance-free, works with any litter, lasts 7+ days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/trial-size"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-100 text-[#FF3131] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-all shadow-xl"
              >
                <Shield className="w-5 h-5" />
                {trialPrice} Trial (Free Shipping)
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white/20 dark:bg-white/10 text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 dark:hover:bg-white/20 transition-all border border-white/30 dark:border-white/20"
              >
                View All Products
              </Link>
            </div>
            <p className="text-sm mt-4 opacity-75">
              No subscription required • Made in Canada • Satisfaction guaranteed
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <RelatedQuestions
            title="Arm & Hammer Alternative Questions"
            questions={faqQuestions}
            defaultOpen={[0]}
          />
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-4 py-8 pb-16">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6">
            Related Reading
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/learn/activated-carbon-vs-baking-soda-deodorizers"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
            >
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                Activated Carbon vs. Baking Soda
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The complete scientific comparison
              </p>
            </Link>

            <Link
              href="/learn/solutions/ammonia-smell-cat-litter"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
            >
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                Stop Ammonia Smell Guide
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete solutions for ammonia odor
              </p>
            </Link>

            <Link
              href="/blog/how-to-neutralize-ammonia-cat-litter"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
            >
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                5 Ammonia Neutralization Methods
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Methods ranked by effectiveness
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
