export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { RelatedContent } from '@/components/seo/RelatedContent';

export const metadata: Metadata = {
  title: 'Activated Carbon vs Zeolite: Which Is Better for Cat Litter Odor?',
  description: 'Activated carbon vs zeolite for cat litter odor control: Carbon achieves 92% ammonia reduction vs zeolite\'s 45%. Here\'s why surface area and mechanism matter.',
  keywords: 'activated carbon vs zeolite, zeolite cat litter, activated charcoal vs zeolite, best odor absorber, cat litter deodorizer comparison, zeolite ammonia',
  alternates: {
    canonical: 'https://www.purrify.ca/blog/activated-carbon-vs-zeolite',
  },
  openGraph: {
    title: 'Activated Carbon vs Zeolite: Which Is Better for Cat Litter Odor?',
    description: 'Activated carbon vs zeolite for cat litter odor control: Carbon achieves 92% ammonia reduction vs zeolite\'s 45%.',
    url: 'https://www.purrify.ca/blog/activated-carbon-vs-zeolite',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/coconut-carbon-ghibli.webp',
        width: 1200,
        height: 675,
      },
    ],
  },
};

const heroImage = '/optimized/coconut-carbon-ghibli.webp';

const faqQuestions = [
  {
    question: 'Is activated carbon better than zeolite for cat litter?',
    answer: 'Yes, for ammonia odor control. Activated carbon achieves 92% ammonia reduction through adsorption, while zeolite achieves around 45% through ion exchange. Carbon also has 10-20x more surface area per gram, providing more capacity for trapping odor molecules.',
  },
  {
    question: 'Can I use zeolite and activated carbon together?',
    answer: 'Yes, they can complement each other. Zeolite excels at moisture control while activated carbon excels at trapping odor molecules. Some premium litters combine both, though activated carbon alone is sufficient for most odor control needs.',
  },
  {
    question: 'Why is zeolite cheaper than activated carbon?',
    answer: 'Zeolite is a naturally occurring mineral that can be mined directly, while activated carbon requires processing raw materials at 800-1000°C in a controlled environment. The manufacturing cost difference reflects in pricing, but so does effectiveness.',
  },
  {
    question: 'Does zeolite work for all types of odors?',
    answer: 'Zeolite works best for moisture-related odors and some ammonia through ion exchange. It\'s less effective for organic volatile compounds and gases. Activated carbon\'s broader adsorption capability makes it more versatile for different odor types.',
  },
  {
    question: 'How long does zeolite last compared to activated carbon?',
    answer: 'Zeolite typically lasts 3-5 days before effectiveness drops significantly. Activated carbon maintains effectiveness for 5-7 days. Both eventually saturate and need replacement, but carbon provides longer protection per application.',
  },
  {
    question: 'Is zeolite safe for cats?',
    answer: 'Yes, natural zeolite is non-toxic and safe for cats. However, some zeolites are synthetically produced with additives—look for "natural zeolite" specifically. Activated carbon (especially coconut shell) is also completely safe and food-grade.',
  },
];

export default function ActivatedCarbonVsZeolitePage() {
  return (
    <>
      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
                Material Comparison
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Activated Carbon vs Zeolite
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                Both are marketed as natural odor absorbers for cat litter. But they work through completely
                different mechanisms—and one significantly outperforms the other for ammonia control.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Activated carbon vs zeolite molecular comparison"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* Quick Answer */}
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-6 rounded-r-xl">
              <h2 className="text-xl font-heading font-bold text-green-800 dark:text-green-200 mb-3">
                Quick Answer: Which Is Better?
              </h2>
              <p className="text-green-700 dark:text-green-300">
                <strong>Activated carbon</strong> is significantly better for cat litter odor control.
                It achieves 92% ammonia reduction compared to zeolite&apos;s 45%, lasts 5-7 days vs 3-5 days,
                and has 10-20x more surface area per gram. Zeolite is better for moisture control but
                inferior for trapping ammonia and other odor gases.
              </p>
            </div>
          </div>
        </section>

        {/* The Mechanisms */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How They Work: Different Mechanisms
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Activated Carbon */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">
                  Activated Carbon: Adsorption
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Activated carbon works through <strong>adsorption</strong>—odor molecules stick to the carbon&apos;s
                  surface through Van der Waals forces. The carbon&apos;s massive internal surface area (up to 3,000 m²/gram)
                  provides billions of binding sites.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Physical trapping—molecules are held permanently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Works on gases, liquids, and dissolved compounds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Extremely high surface area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Excellent for ammonia and VOCs</span>
                  </li>
                </ul>
              </div>

              {/* Zeolite */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Zeolite: Ion Exchange
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Zeolite works primarily through <strong>ion exchange</strong>—it swaps ions with molecules in solution.
                  It also has some absorption capacity for moisture. The crystalline structure has defined channels
                  rather than random pores.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                    <span>Chemical exchange—limited capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                    <span>Best for dissolved ions and moisture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                    <span>Lower surface area (50-300 m²/gram)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                    <span>Moderate for ammonia, poor for VOCs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Head-to-Head Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Property</th>
                    <th className="px-4 py-3 text-center text-green-700 dark:text-green-300">Activated Carbon</th>
                    <th className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">Zeolite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Mechanism</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">Adsorption</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">Ion exchange</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Surface Area</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">1,000-3,000 m²/g</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">50-300 m²/g</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Ammonia Reduction</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">92%</td>
                    <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400 font-bold">45%</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Duration</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">5-7 days</td>
                    <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400">3-5 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">VOC Control</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">Excellent</td>
                    <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">Poor</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Moisture Control</td>
                    <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400">Moderate</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">Good</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Cost</td>
                    <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400">Higher</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">Lower</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Cat Safety</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">Food-grade safe</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">Natural is safe</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Surface Area Matters */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Why Surface Area Is Everything
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              The effectiveness of any adsorbing material depends on its available surface area. More surface area
              means more binding sites for odor molecules. This is where activated carbon dominates.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">1 Gram of Activated Carbon</h3>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">3,000 m²</div>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Roughly the size of half a football field. Created by millions of microscopic pores
                  throughout the material.
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">1 Gram of Zeolite</h3>
                <div className="text-4xl font-bold text-gray-600 dark:text-gray-400 mb-2">300 m²</div>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  About 1/10th of activated carbon. The crystalline structure has channels, not pores,
                  limiting internal surface area.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use Each */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              When to Use Each Material
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">
                  Choose Activated Carbon When:
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Ammonia smell is your primary concern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>You have multiple cats (concentrated odors)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>Small spaces with poor ventilation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>You want longer-lasting protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400">✓</span>
                    <span>VOCs and general odors are an issue</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Zeolite May Be Sufficient When:
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                    <span>Moisture control is the priority</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                    <span>Single cat with mild odor issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                    <span>Budget is extremely tight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                    <span>Well-ventilated litter box area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                    <span>Supplementing another odor control method</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqQuestions.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
                >
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                The Clear Winner: Activated Carbon
              </h2>
              <p className="text-xl mb-6 opacity-90 text-center max-w-2xl mx-auto">
                For cat litter odor control, activated carbon outperforms zeolite in every category that matters:
                higher ammonia reduction, longer duration, better VOC control, and more capacity per gram.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg text-center"
                >
                  Try Activated Carbon
                </Link>
                <Link
                  href="/learn/how-activated-carbon-works"
                  className="inline-block border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:bg-white/10 dark:hover:bg-gray-100/10 hover:scale-105 transition-all duration-300 text-center"
                >
                  Learn How Carbon Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        <RelatedContent currentUrl="/blog/activated-carbon-vs-zeolite" />
      </div>
    </>
  );
}
