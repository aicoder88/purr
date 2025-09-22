import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Layout } from '../../src/components/layout/layout';
import { OptimizedImage } from '../../src/components/performance/OptimizedImage';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';

export default function HowToUseDeodorizer() {
  const pageTitle = 'How to Use Cat Litter Deodorizer Additive - Complete Step-by-Step Guide';
  const pageDescription = 'Learn how to use cat litter deodorizer additive properly. Step-by-step instructions, common mistakes to avoid, and pro tips for maximum odor control effectiveness.';
  const canonicalUrl = 'https://www.purrify.ca/learn/how-to-use-deodorizer';

  // Unique images for how-to guide
  const heroImage = 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1600&q=80'; // Cat owner using litter box
  const sectionImage1 = 'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?auto=format&fit=crop&w=1600&q=80'; // Clean litter box setup
  const sectionImage2 = 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1600&q=80'; // Cat using fresh litter
  const solutionImage = 'https://images.unsplash.com/photo-1570018144715-43110363d70a?auto=format&fit=crop&w=1600&q=80'; // Happy cat owner

  return (
    <Layout>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: heroImage,
              width: 1200,
              height: 630,
              alt: 'Step-by-step guide showing how to use cat litter deodorizer additive',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'how to use cat litter deodorizer additive, cat litter deodorizer instructions, litter box odor control guide, activated carbon litter additive usage',
          },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 dark:text-gray-50 mb-6">
            How to Use Cat Litter Deodorizer Additive: Complete Step-by-Step Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 leading-relaxed">
            Master the proper technique for using cat litter deodorizer additive to achieve maximum odor control. 
            Follow our proven method used by 1,000+ satisfied cat owners.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          {/* Hero Image */}
          <div className="mb-8">
            <OptimizedImage
              src={heroImage}
              alt="Cat owner maintaining clean litter box with proper technique"
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-green-900 dark:text-green-100 mb-3">Quick Start Guide</h2>
            <p className="text-green-800 dark:text-green-200 mb-4">
              <strong>For immediate results:</strong> Sprinkle 1-2 tablespoons of cat litter deodorizer additive 
              evenly over your existing litter, mix gently, and enjoy instant odor control that lasts weeks.
            </p>
            <div className="text-sm text-green-700 dark:text-green-300 dark:text-green-300">
              <strong>Best time to apply:</strong> Right after cleaning the litter box or when adding fresh litter.
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Step-by-Step Instructions</h2>

          <div className="grid gap-8 mb-12">
            <div className="flex items-start space-x-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="bg-blue-600 text-white dark:text-gray-100 dark:text-gray-100 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">Clean Your Litter Box</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  Start with a clean litter box for best results. Remove all waste and clumps. 
                  If doing a complete change, wash the box with mild soap and dry thoroughly.
                </p>
                <div className="bg-blue-100 p-3 rounded text-sm text-blue-700 dark:text-blue-300">
                  <strong>Pro Tip:</strong> Apply deodorizer additive to fresh litter for maximum effectiveness.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-green-50 rounded-lg">
              <div className="bg-green-600 text-white dark:text-gray-100 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">Measure the Right Amount</h3>
                <p className="text-green-800 dark:text-green-200 mb-3">
                  Use 1-2 tablespoons (15-30ml) per standard litter box. For multiple cats or extra odor control, 
                  use up to 3 tablespoons. Less is often more - don't over-apply.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-green-100 p-3 rounded text-sm">
                    <strong>1 cat:</strong> 1-2 tablespoons
                  </div>
                  <div className="bg-green-100 p-3 rounded text-sm">
                    <strong>2+ cats:</strong> 2-3 tablespoons
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-purple-50 rounded-lg">
              <div className="bg-purple-600 text-white dark:text-gray-100 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">Sprinkle Evenly</h3>
                <p className="text-purple-800 dark:text-purple-200 mb-3">
                  Distribute the deodorizer additive evenly across the litter surface. Focus on areas where 
                  your cat typically urinates - usually corners and edges of the box.
                </p>
                <div className="bg-purple-100 p-3 rounded text-sm text-purple-700 dark:text-purple-300">
                  <strong>Technique:</strong> Sprinkle from about 6 inches above the litter for even distribution.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-orange-50 rounded-lg">
              <div className="bg-orange-600 text-white dark:text-gray-100 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">Mix Gently (Optional)</h3>
                <p className="text-orange-800 dark:text-orange-200 mb-3">
                  Lightly stir the additive into the top layer of litter using a scoop or your hand. 
                  Don't mix too vigorously - you want the additive near the surface where odors occur.
                </p>
                <div className="bg-orange-100 p-3 rounded text-sm text-orange-700 dark:text-orange-300">
                  <strong>Note:</strong> Mixing isn't required but can help distribute the additive more evenly.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-teal-50 rounded-lg">
              <div className="bg-teal-600 text-white dark:text-gray-100 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-900 mb-3">Let It Work</h3>
                <p className="text-teal-800 mb-3">
                  The deodorizer additive starts working immediately. You'll notice reduced odors within minutes, 
                  with maximum effectiveness achieved within 24 hours.
                </p>
                <div className="bg-teal-100 p-3 rounded text-sm text-teal-700">
                  <strong>Duration:</strong> Continues working for 2-4 weeks depending on usage.
                </div>
              </div>
            </div>
          </div>

          {/* Section Image */}
          <div className="mb-8">
            <OptimizedImage
              src={sectionImage1}
              alt="Clean litter box ready for proper deodorizer application"
              width={600}
              height={300}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Common Mistakes to Avoid</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 dark:text-red-200 mb-3">❌ Using Too Much</h3>
              <p className="text-red-700 dark:text-red-300 mb-3">
                More isn't always better. Excessive amounts can create dust and waste product without improving odor control.
              </p>
              <div className="text-sm text-red-600 dark:text-red-400 dark:text-red-400">
                <strong>Solution:</strong> Start with 1 tablespoon and increase gradually if needed.
              </div>
            </div>

            <div className="border border-red-200 bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">❌ Applying to Dirty Litter</h3>
              <p className="text-red-700 dark:text-red-300 mb-3">
                Adding deodorizer to heavily soiled litter reduces effectiveness and wastes product.
              </p>
              <div className="text-sm text-red-600 dark:text-red-400">
                <strong>Solution:</strong> Always remove waste first, then apply to clean or fresh litter.
              </div>
            </div>

            <div className="border border-red-200 bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">❌ Mixing Too Deep</h3>
              <p className="text-red-700 dark:text-red-300 mb-3">
                Burying the additive too deep in the litter prevents it from capturing airborne odors effectively.
              </p>
              <div className="text-sm text-red-600 dark:text-red-400">
                <strong>Solution:</strong> Keep most of the additive in the top 1-2 inches of litter.
              </div>
            </div>

            <div className="border border-red-200 bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">❌ Inconsistent Application</h3>
              <p className="text-red-700 dark:text-red-300 mb-3">
                Forgetting to reapply when adding fresh litter or after deep cleaning reduces long-term effectiveness.
              </p>
              <div className="text-sm text-red-600 dark:text-red-400">
                <strong>Solution:</strong> Set a reminder to reapply every 2-3 weeks or when changing litter.
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Pro Tips for Maximum Effectiveness</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">🎯 Target High-Traffic Areas</h3>
              <p className="text-blue-800 dark:text-blue-200">
                Apply extra deodorizer additive where your cat urinates most frequently. Most cats prefer corners 
                and the same spots repeatedly.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-6">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">⏰ Time It Right</h3>
              <p className="text-green-800 dark:text-green-200">
                Apply deodorizer additive right after scooping waste for immediate odor control, or when adding 
                fresh litter for preventive protection.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-400 p-6">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">🔄 Maintain Consistency</h3>
              <p className="text-purple-800 dark:text-purple-200">
                Reapply every 2-3 weeks or whenever you notice odors returning. Consistent use provides better 
                long-term odor control than sporadic applications.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-400 p-6">
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">📏 Adjust for Your Situation</h3>
              <p className="text-orange-800 dark:text-orange-200">
                Multiple cats, small apartments, or senior cats may need slightly more product. Start with standard 
                amounts and adjust based on results.
              </p>
            </div>
          </div>

          {/* Cat Usage Image */}
          <div className="mb-8">
            <OptimizedImage
              src={sectionImage2}
              alt="Cat comfortably using well-maintained litter box"
              width={600}
              height={300}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Compatibility with Different Litter Types</h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left">Litter Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Compatibility</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Special Instructions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Clay (Non-Clumping)</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600 dark:text-green-400 dark:text-green-400 dark:text-green-400">✓ Excellent</td>
                  <td className="border border-gray-300 px-4 py-3">Mix lightly to distribute evenly</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Clumping Clay</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600 dark:text-green-400 dark:text-green-400">✓ Excellent</td>
                  <td className="border border-gray-300 px-4 py-3">Won't interfere with clumping action</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Crystal/Silica</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600 dark:text-green-400 dark:text-green-400">✓ Excellent</td>
                  <td className="border border-gray-300 px-4 py-3">Complements crystal odor absorption</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Wood Pellets</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600 dark:text-green-400 dark:text-green-400">✓ Good</td>
                  <td className="border border-gray-300 px-4 py-3">Apply to sawdust layer</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Paper/Recycled</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600 dark:text-green-400 dark:text-green-400">✓ Good</td>
                  <td className="border border-gray-300 px-4 py-3">Use slightly more for best results</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Corn/Wheat</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600 dark:text-green-400 dark:text-green-400">✓ Excellent</td>
                  <td className="border border-gray-300 px-4 py-3">Natural combination works well</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Troubleshooting Common Issues</h2>

          <div className="space-y-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
                Q: "I still smell odors after applying the deodorizer additive"
              </h3>
              <div className="text-gray-700 dark:text-gray-200 dark:text-gray-200 space-y-2">
                <p><strong>Possible causes:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Not enough product used (try increasing amount)</li>
                  <li>Applied to heavily soiled litter (clean first)</li>
                  <li>Litter box needs deeper cleaning</li>
                  <li>Multiple cats may need more frequent application</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
                Q: "My cat seems hesitant to use the litter box after adding deodorizer"
              </h3>
              <div className="text-gray-700 dark:text-gray-200 space-y-2">
                <p><strong>Solutions:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Use less product initially and gradually increase</li>
                  <li>Mix more thoroughly to reduce visible particles</li>
                  <li>Ensure you're using fragrance-free, natural deodorizer</li>
                  <li>Give your cat 24-48 hours to adjust</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
                Q: "How often should I reapply the deodorizer additive?"
              </h3>
              <div className="text-gray-700 dark:text-gray-200">
                <p>
                  Reapply every 2-3 weeks for normal use, or when you notice odors returning. 
                  With multiple cats or heavy use, you may need to reapply weekly. Always reapply 
                  when doing a complete litter change.
                </p>
              </div>
            </div>
          </div>

          {/* Solution Image */}
          <div className="mb-8">
            <OptimizedImage
              src={solutionImage}
              alt="Happy cat owner enjoying odor-free home environment"
              width={600}
              height={300}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Ready to Try Purrify?</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Experience the difference with Canada's #1 natural cat litter deodorizer additive. 
              Made with premium activated carbon for superior odor control.
            </p>
            <div className="space-x-4">
              <Link 
                href="/products/trial-size" 
                className="inline-block bg-green-600 text-white dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start with Trial Size - $6.99
              </Link>
              <Link 
                href="/learn/activated-carbon-benefits" 
                className="inline-block border border-green-600 text-green-600 dark:text-green-400 dark:text-green-400 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Learn the Science
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <RelatedArticles currentPath="/learn/how-to-use-deodorizer" />
        </div>
      </article>
    </Layout>
  );
}
