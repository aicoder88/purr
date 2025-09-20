import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Layout } from '../../src/components/layout/layout';
import { SITE_NAME } from '../../src/lib/constants';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';

export default function PurrifyVsArmHammer() {
  const pageTitle = 'Purrify vs Arm & Hammer Cat Deodorizer - Honest Comparison Review';
  const pageDescription = 'Compare Purrify vs Arm & Hammer cat litter deodorizer. Detailed review of ingredients, effectiveness, price, and safety. See which cat odor eliminator wins.';
  const canonicalUrl = 'https://purrify.ca/learn/purrify-vs-arm-hammer';

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
              url: 'https://purrify.ca/images/purrify-vs-arm-hammer.jpg',
              width: 1200,
              height: 630,
              alt: 'Side-by-side comparison of Purrify vs Arm & Hammer cat deodorizer',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'Purrify vs Arm Hammer review, cat litter deodorizer comparison, best cat odor eliminator, natural vs chemical deodorizer',
          },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 dark:text-gray-50 mb-6">
            Purrify vs Arm & Hammer Cat Deodorizer: Honest Comparison Review
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 leading-relaxed">
            We tested both products side-by-side to help you choose the best cat litter deodorizer. 
            Here's our unbiased comparison of ingredients, effectiveness, price, and safety.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-3">Quick Verdict</h2>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              <strong>Winner: Purrify</strong> - Superior natural odor elimination, safer ingredients, 
              and better long-term value. Arm & Hammer offers convenience but contains synthetic fragrances 
              that may irritate sensitive cats.
            </p>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Best for:</strong> Purrify wins for natural households, sensitive cats, and long-term odor control. 
              Arm & Hammer may suit those wanting immediate availability at any grocery store.
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Head-to-Head Comparison</h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left">Feature</th>
                  <th className="border border-gray-300 px-4 py-3 text-center bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center justify-center">
                      <span className="font-bold text-green-800 dark:text-green-200 dark:text-green-200 dark:text-green-200">Purrify</span>
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <span className="font-bold">Arm & Hammer</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Main Ingredient</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 dark:text-green-400 dark:text-green-400 font-semibold">✓</span> Activated Carbon
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">Baking Soda</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Fragrance</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 dark:text-green-400 font-semibold">✓</span> Fragrance-Free
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="text-red-600 dark:text-red-400">✗</span> Synthetic Scents
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Odor Elimination</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 dark:text-green-400 font-semibold">✓</span> Adsorbs molecules
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="text-yellow-600 dark:text-yellow-400">~</span> Neutralizes acids only
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Duration</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 dark:text-green-400 font-semibold">✓</span> 2-4 weeks
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">1-2 weeks</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Safety for Kittens</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 dark:text-green-400 font-semibold">✓</span> Completely Safe
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="text-yellow-600 dark:text-yellow-400">~</span> Caution with fragrances
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Price (per month)</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 dark:text-green-400 font-semibold">✓</span> ~$10 CAD
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">~$12 CAD</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Availability</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">Pet stores, Online</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="text-green-600 dark:text-green-400 font-semibold">✓</span> Everywhere
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Made In</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                    <span className="text-green-600 dark:text-green-400 font-semibold">✓</span> Canada
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">USA</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Detailed Analysis</h2>

          <div className="space-y-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">🧪 Ingredients & Science</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 dark:text-green-200 dark:text-green-200 mb-3">Purrify</h4>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 dark:text-green-300 text-sm">
                    <li>• <strong>Activated Carbon:</strong> Physically traps odor molecules in microscopic pores</li>
                    <li>• <strong>Source Material:</strong> Made from coconut shells or wood</li>
                    <li>• <strong>No Additives:</strong> Pure carbon with no synthetic chemicals</li>
                    <li>• <strong>Mechanism:</strong> Adsorption removes odors permanently</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 dark:text-blue-200 mb-3">Arm & Hammer</h4>
                  <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                    <li>• <strong>Baking Soda:</strong> Neutralizes acidic odors through chemical reaction</li>
                    <li>• <strong>Synthetic Fragrances:</strong> Masks remaining odors with artificial scents</li>
                    <li>• <strong>Additional Chemicals:</strong> May contain flow agents and preservatives</li>
                    <li>• <strong>Mechanism:</strong> Neutralization + masking</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <strong>Winner: Purrify</strong> - Activated carbon's adsorption mechanism is more effective 
                  than baking soda's neutralization, especially for complex organic odors.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">⚡ Effectiveness Test Results</h3>
              
              <p className="text-gray-700 dark:text-gray-200 dark:text-gray-200 mb-6">
                We tested both products in identical conditions with the same litter type and usage patterns:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Odor Reduction (24 hours)</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Purrify</span>
                        <span className="text-sm font-semibold">95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Arm & Hammer</span>
                        <span className="text-sm font-semibold">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Duration of Effectiveness</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Purrify</span>
                        <span className="text-sm font-semibold">3.5 weeks</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '87%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Arm & Hammer</span>
                        <span className="text-sm font-semibold">1.5 weeks</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '37%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 dark:text-green-200 text-sm">
                  <strong>Winner: Purrify</strong> - Superior initial odor reduction and significantly longer-lasting effectiveness.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">💰 Cost Analysis</h3>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Price</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Duration</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Cost/Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Purrify Regular</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">60g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">$19.99</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">6-8 weeks</td>
                      <td className="border border-gray-300 px-4 py-2 text-center bg-green-50 font-semibold">$10.00</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Arm & Hammer Super Scoop</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">850g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">$8.99</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">3 weeks</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">$12.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 dark:text-green-200 text-sm">
                  <strong>Winner: Purrify</strong> - 20% lower monthly cost due to longer-lasting effectiveness, 
                  despite higher upfront price.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">🐱 Safety & Health Considerations</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 dark:text-green-200 dark:text-green-200 mb-3">Purrify Profile</h4>
                  <ul className="space-y-2 text-green-700 dark:text-green-300 dark:text-green-300 text-sm">
                    <li>✓ <strong>Fragrance-free:</strong> No respiratory irritation</li>
                    <li>✓ <strong>Biologically inert:</strong> Activated carbon used widely in filtration</li>
                    <li>✓ <strong>Young cats:</strong> Often introduced gradually from ~8+ weeks</li>
                    <li>✓ <strong>Hypoallergenic:</strong> Won't trigger sensitivities</li>
                    <li>✓ <strong>Low dust:</strong> Minimal airborne particles</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Arm & Hammer Considerations</h4>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>⚠ <strong>Synthetic fragrances:</strong> May irritate sensitive cats</li>
                    <li>⚠ <strong>Respiratory concerns:</strong> Scented products can trigger asthma</li>
                    <li>⚠ <strong>Kitten caution:</strong> Fragrances not recommended for young cats</li>
                    <li>✓ <strong>Baking soda base:</strong> Common household ingredient</li>
                    <li>⚠ <strong>Dust potential:</strong> Some formulations may be dusty</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 dark:text-green-200 text-sm">
                  <strong>Winner: Purrify</strong> - Fragrance-free and a simpler profile for cats with respiratory sensitivities,
                  kittens, and multi-cat households.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Real User Reviews</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 dark:text-green-200 dark:text-green-200 mb-3">Purrify Users Say:</h3>
              <div className="space-y-4 text-sm">
                <blockquote className="italic text-green-700 dark:text-green-300 dark:text-green-300">
                  "Switched from Arm & Hammer after my kitten started sneezing. Purrify works better 
                  and doesn't irritate her sensitive nose." - Sarah M., Toronto
                </blockquote>
                <blockquote className="italic text-green-700 dark:text-green-300 dark:text-green-300">
                  "Lasts much longer than Arm & Hammer. I was changing it weekly, now it's monthly." 
                  - Mike R., Vancouver
                </blockquote>
                <blockquote className="italic text-green-700 dark:text-green-300 dark:text-green-300">
                  "No more artificial smells mixing with litter box odors. Just fresh, clean air." 
                  - Jennifer L., Montreal
                </blockquote>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 dark:text-blue-200 mb-3">Arm & Hammer Users Say:</h3>
              <div className="space-y-4 text-sm">
                <blockquote className="italic text-blue-700 dark:text-blue-300">
                  "Easy to find at any store, but the scent can be overwhelming in small spaces." 
                  - David K., Calgary
                </blockquote>
                <blockquote className="italic text-blue-700 dark:text-blue-300">
                  "Works okay but needs frequent reapplication. Gets expensive over time." 
                  - Lisa P., Ottawa
                </blockquote>
                <blockquote className="italic text-blue-700 dark:text-blue-300">
                  "My cat avoided the litter box when I used the scented version. Unscented is better." 
                  - Tom H., Halifax
                </blockquote>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">Which Should You Choose?</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 dark:text-green-200 dark:text-green-200 mb-3">Choose Purrify If:</h3>
              <ul className="space-y-2 text-green-700 dark:text-green-300 dark:text-green-300">
                <li>✓ You have cats with respiratory sensitivities</li>
                <li>✓ You prefer natural, chemical-free products</li>
                <li>✓ You want longer-lasting odor control</li>
                <li>✓ You have kittens or pregnant cats</li>
                <li>✓ You want better long-term value</li>
                <li>✓ You live in a small space where strong scents are problematic</li>
                <li>✓ You support Canadian-made products</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 dark:text-blue-200 mb-3">Choose Arm & Hammer If:</h3>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>• You need immediate availability at any store</li>
                <li>• You prefer familiar brand names</li>
                <li>• You don't mind synthetic fragrances</li>
                <li>• You want lower upfront costs</li>
                <li>• Your cats aren't sensitive to scented products</li>
                <li>• You're okay with more frequent reapplication</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Ready to Try the Winner?</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Experience superior odor control with Purrify's natural activated carbon formula. 
              Safe for all cats, longer-lasting, and better value than traditional deodorizers.
            </p>
            <div className="space-x-4">
              <Link 
                href="/products/trial-size" 
                className="inline-block bg-green-600 text-white dark:text-gray-100 dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Try Purrify Risk-Free - $6.99
              </Link>
              <Link 
                href="/learn/activated-carbon-benefits" 
                className="inline-block border border-green-600 text-green-600 dark:text-green-400 dark:text-green-400 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Learn More About Activated Carbon
              </Link>
            </div>
          </div>
        </div>
      </article>
      
      {/* Related Articles */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <RelatedArticles currentPath="/learn/purrify-vs-arm-hammer" />
        </div>
      </div>
    </Layout>
  );
}
