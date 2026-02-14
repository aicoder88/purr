'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight } from 'lucide-react';
import { Container } from '../../../src/components/ui/container';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { HubSpokeNav } from '@/components/seo/HubSpokeNav';

export default function ActivatedCarbonBenefitsClient() {
  // Unique images for science guide - different from other posts
  const heroImage = '/optimized/benefits-hero-science.webp';
  const sectionImage1 = '/optimized/benefits-lab-modern.webp';
  const sectionImage2 = '/optimized/benefits-happy-cats.avif';
  const solutionImage = '/optimized/benefits-solution-bright.webp';

  // FAQ items for display
  const faqItems = [
    {
      question: 'What is activated carbon cat litter?',
      answer: 'Activated carbon cat litter refers to litter products that contain or are enhanced with activated carbon (also called activated charcoal). This carbon has been treated to create millions of tiny pores that trap odor molecules like ammonia and hydrogen sulfide, providing superior odor elimination compared to traditional litter.',
    },
    {
      question: 'Can activated carbon be used around kittens?',
      answer: 'Activated carbon is widely used in household filtration and is fragrance-free. Many households introduce it gradually once kittens reliably use the litter box. Consult your veterinarian for specific advice about your kitten.',
    },
    {
      question: 'How long does activated carbon last in cat litter?',
      answer: 'Activated carbon continues working until its pores are saturated with odor molecules. In a typical litter box, this ranges from 2-4 weeks depending on usage and the number of cats.',
    },
    {
      question: 'Can I use activated carbon with clumping litter?',
      answer: 'Yes! Activated carbon works with all litter types including clumping clay, crystal, wood, paper, and natural alternatives. It enhances rather than interferes with clumping action.',
    },
    {
      question: 'Will my cat notice activated carbon in the litter?',
      answer: "Most cats don't notice activated carbon since it's odorless and doesn't change litter texture significantly. Some cats actually prefer the improved odor control that activated carbon provides.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Breadcrumb Navigation */}
      <section className="py-4 border-b border-gray-200 dark:border-gray-800">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <Link
              href="/learn"
              className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
            >
              Learn
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              Activated Carbon Benefits
            </span>
          </nav>
        </Container>
      </section>

      <article className="max-w-4xl mx-auto px-4 py-12 text-gray-900 dark:text-gray-100">
        <header className="mb-12">
          <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Activated Carbon Cat Litter Benefits: The Complete Science Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover how activated carbon transforms your cat&apos;s litter box into an odor-free zone through proven scientific principles. Learn why this natural solution outperforms traditional deodorizers.
          </p>
        </header>

        {/* Hub-Spoke Navigation */}
        <div className="mb-12">
          <HubSpokeNav clusterId="activated-carbon" currentUrl="/learn/activated-carbon-benefits" />
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {/* Hero Image */}
          <div className="mb-8">
            <Image
              src={heroImage}
              alt="Scientific view of activated carbon molecular structure for odor control"
              width={800}
              height={600}
              className="w-full aspect-[4/3] object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-6 mb-8">
            <h2 className="font-heading text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-3">Quick Answer</h2>
            <p className="text-blue-800 dark:text-blue-200">
              Activated carbon litter additive benefits include superior odor elimination through molecular adsorption,
              natural and fragrance-free composition, long-lasting effectiveness, and compatibility with all litter types.
              Unlike masking fragrances, activated carbon actually removes odor molecules from the air.
            </p>
          </div>

          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">How Activated Carbon Eliminates Odors</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-4">The Science of Adsorption</h3>
              <p>
                Activated carbon works through a process called <strong>adsorption</strong> (not absorption).
                The carbon&apos;s massive surface area - up to 1,500 square meters per gram - contains millions
                of microscopic pores that trap odor molecules like ammonia and hydrogen sulfide.
              </p>
              <ul className="mt-4 space-y-2">
                <li>• <strong>Physical trapping:</strong> Molecules stick to carbon surface</li>
                <li>• <strong>Chemical bonding:</strong> Weak van der Waals forces hold odors</li>
                <li>• <strong>Permanent removal:</strong> Odors don&apos;t escape back into air</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Key Odor Molecules Eliminated:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ammonia (NH₃)</span>
                  <span className="text-green-600 dark:text-green-400">✓ Removed</span>
                </div>
                <div className="flex justify-between">
                  <span>Hydrogen Sulfide (H₂S)</span>
                  <span className="text-green-600 dark:text-green-400">✓ Removed</span>
                </div>
                <div className="flex justify-between">
                  <span>Mercaptans</span>
                  <span className="text-green-600 dark:text-green-400">✓ Removed</span>
                </div>
                <div className="flex justify-between">
                  <span>Organic compounds</span>
                  <span className="text-green-600 dark:text-green-400">✓ Removed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Science Section Image */}
          <div className="mb-8">
            <Image
              src={sectionImage1}
              alt="Modern laboratory showing scientific research into odor elimination"
              width={600}
              height={400}
              className="w-full aspect-[3/2] object-cover rounded-lg shadow-md"
            />
          </div>

          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Top 8 Activated Carbon Litter Additive Benefits</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-heading text-xl font-semibold text-green-600 dark:text-green-400 mb-3">1. Superior Odor Elimination</h3>
              <p>Unlike air fresheners that mask smells, activated carbon removes odor molecules completely. Studies show 99%+ effectiveness against ammonia and sulfur compounds.</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-heading text-xl font-semibold text-green-600 dark:text-green-400 mb-3">2. Natural & Fragrance-Free</h3>
              <p>Made from coconut shells or wood, activated carbon contains no added fragrances or dyes and is widely used in household filtration.</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-heading text-xl font-semibold text-green-600 dark:text-green-400 mb-3">3. Long-Lasting Performance</h3>
              <p>A small amount provides weeks of odor control. The carbon continues working until all pore spaces are filled with odor molecules.</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-heading text-xl font-semibold text-green-600 dark:text-green-400 mb-3">4. Works with Any Litter</h3>
              <p>Compatible with clay, clumping, crystal, wood, paper, and corn-based litters. Simply sprinkle on top or mix in.</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-heading text-xl font-semibold text-green-600 dark:text-green-400 mb-3">5. Reduces Litter Changes</h3>
              <p>Extends litter life by controlling odors longer, saving money and reducing waste. Many users report 30-50% longer intervals between changes.</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-heading text-xl font-semibold text-green-600 dark:text-green-400 mb-3">6. Improves Air Quality</h3>
              <p>Removes airborne particles and volatile organic compounds (VOCs), creating healthier indoor air for your family and pets.</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-heading text-xl font-semibold text-green-600 dark:text-green-400 mb-3">7. Low-Dust Application</h3>
              <p>High-quality activated carbon produces minimal dust, a consideration for cats with respiratory sensitivities.</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-heading text-xl font-semibold text-green-600 dark:text-green-400 mb-3">8. Practical Disposal</h3>
              <p>Dispose of used litter and carbon according to local guidelines. Avoid drains and follow municipal waste instructions.</p>
            </div>
          </div>

          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Activated Carbon vs. Other Deodorizers</h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left">Method</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left">How It Works</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left">Effectiveness</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left">Considerations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">Activated Carbon</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Adsorbs and traps odor molecules</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-green-600 dark:text-green-400">Excellent (99%+)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-green-600 dark:text-green-400">Fragrance-free; biologically inert</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">Baking Soda</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Neutralizes acids</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-yellow-600 dark:text-yellow-400">Moderate</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-green-600 dark:text-green-400">Common household use</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">Fragrances</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Masks odors with scent</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-red-600 dark:text-red-400">Poor (temporary)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-yellow-600 dark:text-yellow-400">Concerns for sensitive cats</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">Enzymes</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Break down organic matter</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-yellow-600 dark:text-yellow-400">Good for specific odors</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-green-600 dark:text-green-400">Common household use</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Happy Cats Image */}
          <div className="mb-8">
            <Image
              src={sectionImage2}
              alt="Multiple cats living happily in clean, odor-free home environment"
              width={600}
              height={400}
              className="w-full aspect-[3/2] object-cover rounded-lg shadow-md"
            />
          </div>

          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Using Around Cats and Kittens</h2>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 mb-8">
            <h3 className="font-heading text-xl font-semibold text-green-800 dark:text-green-200 mb-3">✓ Fragrance-Free & Widely Used</h3>
            <ul className="space-y-2 text-green-700 dark:text-green-300">
              <li>• <strong>Biologically inert:</strong> Commonly used in household filtration</li>
              <li>• <strong>Gentle approach:</strong> Often introduced gradually for young cats</li>
              <li>• <strong>Low-dust options:</strong> A consideration for sensitive cats</li>
              <li>• <strong>Fragrance-free:</strong> Won&apos;t add scents that some cats dislike</li>
              <li>• <strong>Veterinary guidance:</strong> Consult your vet for specific medical advice</li>
            </ul>
          </div>

          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">How to Use Activated Carbon Litter Additive</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="font-heading font-semibold mb-2">Sprinkle</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Add 1-2 tablespoons per litter box</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="font-heading font-semibold mb-2">Mix</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Gently stir into existing litter</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="font-heading font-semibold mb-2">Enjoy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Experience immediate odor control</p>
            </div>
          </div>

          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Frequently Asked Questions About Activated Carbon Cat Litter</h2>

          <div className="space-y-6 mb-8">
            {faqItems.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-heading text-lg font-semibold mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Solution Image */}
          <div className="mb-8">
            <Image
              src={solutionImage}
              alt="Content cat in bright, fresh home showcasing successful odor control"
              width={600}
              height={400}
              className="w-full aspect-[3/2] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Ready to Experience the Benefits?</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Try Purrify&apos;s premium activated carbon litter additive and discover why 1,000+ cat owners trust our natural odor elimination solution.
            </p>
            <div className="space-x-4">
              <Link
                href="/products/trial-size"
                className="inline-block bg-blue-600 dark:bg-blue-600 text-white dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
              >
                Try 12g Trial Size
              </Link>
              <Link
                href="/products/"
                className="inline-block border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                View All Sizes
              </Link>
            </div>
          </div>

          {/* Related Guides */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Related Guides</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn more about cat litter odor control with these helpful resources:
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="/learn/activated-carbon-vs-baking-soda-deodorizers" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Activated Carbon vs Baking Soda: Which Is Better for Cat Litter? →
                </Link>
              </li>
              <li>
                <Link href="/blog/activated-carbon-vs-zeolite-cat-litter" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Activated Carbon vs Zeolite: Complete Comparison Guide →
                </Link>
              </li>
              <li>
                <Link href="/learn/cat-litter-ammonia-health-risks" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Cat Litter Ammonia Health Risks: What You Need to Know →
                </Link>
              </li>
              <li>
                <Link href="/learn/solutions/ammonia-smell-cat-litter" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Why Your Cat Litter Smells Like Ammonia (And How to Fix It) →
                </Link>
              </li>
              <li>
                <Link href="/learn/using-deodorizers-with-kittens" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Is Cat Litter Deodorizer Safe for Kittens? →
                </Link>
              </li>
            </ul>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <RelatedContent currentUrl="/learn/activated-carbon-benefits" />
          </div>
        </div>
      </article>
    </main>
  );
}
