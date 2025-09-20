import Head from 'next/head';
import Image from 'next/image';
import { Container } from '../../src/components/ui/container';
import { SITE_NAME } from '../../src/lib/constants';
import Link from 'next/link';
import { useTranslation } from '../../src/lib/translation-context';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';

// Relevant images for how-to guide content
const heroImage = 'https://images.unsplash.com/photo-1516750105099-4b8adeaaf824?auto=format&fit=crop&w=1600&q=80';
const stepByStepImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80';
const applicationImage = 'https://images.unsplash.com/photo-1545529468-42764ef8c85f?auto=format&fit=crop&w=1600&q=80';
const resultImage = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=80';

export default function HowToUseLitterDeodorizer() {
  // const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>How to Use Cat Litter Deodorizer Additive: Complete Step-by-Step Guide | {SITE_NAME}</title>
        <meta name="description" content="Learn the proper way to use cat litter deodorizer additive for maximum odor control. Step-by-step instructions, common mistakes to avoid, and expert tips." />
        <meta name="keywords" content="how to use cat litter deodorizer additive, litter box odor control, cat litter deodorizer instructions, activated carbon application" />
        
        {/* Open Graph */}
        <meta property="og:title" content="How to Use Cat Litter Deodorizer Additive: Complete Step-by-Step Guide" />
        <meta property="og:description" content="Learn the proper way to use cat litter deodorizer additive for maximum odor control. Step-by-step instructions and expert tips." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.purrify.ca/blog/how-to-use-cat-litter-deodorizer" />
        <meta property="og:image" content={heroImage} />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="1067" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Use Cat Litter Deodorizer Additive: Complete Guide" />
        <meta name="twitter:description" content="Step-by-step instructions for proper cat litter deodorizer application and maximum odor control." />
        <meta name="twitter:image" content={heroImage} />
        
        {/* Canonical */}
        <link rel="canonical" href="https://www.purrify.ca/blog/how-to-use-cat-litter-deodorizer" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Use Cat Litter Deodorizer Additive",
            "description": "Complete step-by-step guide for using cat litter deodorizer additive for maximum odor control effectiveness.",
            "image": "https://www.purrify.ca/optimized/before-after.webp",
            "totalTime": "PT5M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "CAD",
              "value": "15"
            },
            "supply": [
              {
                "@type": "HowToSupply",
                "name": "Cat litter deodorizer additive"
              },
              {
                "@type": "HowToSupply", 
                "name": "Clean litter box"
              },
              {
                "@type": "HowToSupply",
                "name": "Fresh cat litter"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Clean the litter box",
                "text": "Start with a clean, empty litter box for best results"
              },
              {
                "@type": "HowToStep", 
                "name": "Add base layer of litter",
                "text": "Pour 2-3 inches of your regular cat litter into the box"
              },
              {
                "@type": "HowToStep",
                "name": "Sprinkle deodorizer evenly",
                "text": "Distribute the deodorizer additive evenly across the litter surface"
              },
              {
                "@type": "HowToStep",
                "name": "Add final litter layer",
                "text": "Add another layer of litter on top and mix gently"
              }
            ],
            "author": {
              "@type": "Organization",
              "name": "Purrify"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Purrify",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.purrify.ca/purrify-logo.png"
              }
            }
          })}
        </script>
      </Head>

      <article className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <li><Link href="/" className="hover:text-[#FF3131]">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-[#FF3131]">Blog</Link></li>
                <li>/</li>
                <li className="text-[#FF3131]">How to Use Deodorizer</li>
              </ol>
            </nav>

            {/* Article Header */}
            <header className="mb-12 text-center">
              <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
                How-To Guide
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                How to Use Cat Litter Deodorizer Additive: Complete Step-by-Step Guide
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Master the proper application technique for maximum odor control effectiveness. 
                Learn common mistakes to avoid and expert tips for long-lasting freshness.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
                <span>Published January 20, 2024</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-12">
              <Image
                src={heroImage}
                alt="Cat owner properly applying litter deodorizer additive following step-by-step instructions"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
                width={1600}
                height={1067}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1600px"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                Proper application technique makes all the difference in odor control effectiveness
              </p>
            </div>

            {/* Quick Summary Box */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-12">
              <h2 className="text-xl font-bold text-green-900 dark:text-green-100 mb-4">📋 Quick Application Summary</h2>
              <div className="grid md:grid-cols-2 gap-4 text-green-800 dark:text-green-200">
                <div>
                  <strong>Application Time:</strong> 2-3 minutes
                </div>
                <div>
                  <strong>Frequency:</strong> With each litter change
                </div>
                <div>
                  <strong>Amount Needed:</strong> 1-2 tablespoons per box
                </div>
                <div>
                  <strong>Effectiveness:</strong> Up to 7 days
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Step-by-Step Application Guide</h2>
              
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Using a <strong>cat litter deodorizer additive</strong> correctly is crucial for achieving maximum odor control. 
                Follow this comprehensive guide to ensure you get the best results from your deodorizer.
              </p>

              <div className="space-y-8 mb-12">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF3131] text-white dark:text-gray-100 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Start with a Clean Litter Box</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                      Begin with a completely clean, empty litter box. Remove all old litter and wash the box 
                      with mild soap and water. Dry thoroughly before proceeding.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        <strong>Pro Tip:</strong> A clean starting surface ensures maximum contact between 
                        the deodorizer and odor-causing compounds.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF3131] text-white dark:text-gray-100 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Add Base Layer of Litter</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                      Pour 2-3 inches of your regular cat litter into the clean box. This creates the 
                      foundation layer that will work with your deodorizer additive.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-1">
                      <li>Use your cat's preferred litter type</li>
                      <li>Ensure even distribution across the box</li>
                      <li>Don't overfill - leave room for mixing</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF3131] text-white dark:text-gray-100 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Sprinkle Deodorizer Evenly</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                      This is the most critical step. Sprinkle the <strong>activated carbon litter additive</strong> 
                      evenly across the entire litter surface. Use the following amounts:
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">📏 Recommended Amounts:</h4>
                      <ul className="text-yellow-800 dark:text-yellow-200 space-y-1">
                        <li><strong>Small litter box:</strong> 1 tablespoon</li>
                        <li><strong>Medium litter box:</strong> 1.5 tablespoons</li>
                        <li><strong>Large litter box:</strong> 2 tablespoons</li>
                        <li><strong>Multiple cats:</strong> Add 0.5 tablespoon per additional cat</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF3131] text-white dark:text-gray-100 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Add Final Litter Layer</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                      Add another 1-2 inches of litter on top of the deodorizer. This creates a "sandwich" 
                      effect that maximizes odor control while keeping the additive in place.
                    </p>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4">
                      <p className="text-green-800 dark:text-green-200 text-sm">
                        <strong>Why This Works:</strong> The layered approach ensures the deodorizer 
                        contacts odors from both above and below, providing 360-degree protection.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF3131] text-white dark:text-gray-100 rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Gentle Mixing (Optional)</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                      Lightly mix the top layer with a clean scoop to distribute the deodorizer throughout 
                      the litter. Be gentle to avoid creating dust clouds.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Note: Some cats prefer unmixed litter, so observe your cat's preferences.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Common Mistakes to Avoid</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4">❌ What NOT to Do</h3>
                <div className="space-y-4 text-red-800 dark:text-red-200">
                  <div>
                    <strong>Don't dump it all in one spot:</strong> Uneven distribution reduces effectiveness significantly.
                  </div>
                  <div>
                    <strong>Don't use too much:</strong> More isn't always better - follow recommended amounts.
                  </div>
                  <div>
                    <strong>Don't skip the layering:</strong> Mixing everything together reduces contact time with odors.
                  </div>
                  <div>
                    <strong>Don't apply to wet litter:</strong> Always start with dry litter for best results.
                  </div>
                  <div>
                    <strong>Don't forget regular maintenance:</strong> Reapply with each complete litter change.
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Maintenance and Reapplication</h2>
              
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                To maintain optimal odor control with your <strong>natural cat litter odor eliminator</strong>, 
                follow these maintenance guidelines:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">🔄 Regular Maintenance</h4>
                  <ul className="text-blue-800 dark:text-blue-200 space-y-2">
                    <li>• Reapply with each complete litter change</li>
                    <li>• Spot-treat high-use areas weekly</li>
                    <li>• Monitor effectiveness daily</li>
                    <li>• Adjust amounts based on odor levels</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-3">📅 Timing Guidelines</h4>
                  <ul className="text-purple-800 dark:text-purple-200 space-y-2">
                    <li>• Single cat: Every 7-10 days</li>
                    <li>• Multiple cats: Every 5-7 days</li>
                    <li>• High-traffic boxes: Every 3-5 days</li>
                    <li>• Senior cats: Every 5-7 days</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Maximizing Effectiveness</h2>
              
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Get the most out of your <strong>cat litter deodorizer</strong> with these expert tips:
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <span className="text-[#FF3131] text-xl">💡</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-50">Storage Matters:</strong>
                    <span className="text-gray-700 dark:text-gray-200"> Keep your deodorizer in a cool, dry place in an airtight container.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#FF3131] text-xl">💡</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-50">Ventilation Helps:</strong>
                    <span className="text-gray-700 dark:text-gray-200"> Ensure good airflow around the litter box area for best results.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#FF3131] text-xl">💡</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-50">Quality Counts:</strong>
                    <span className="text-gray-700 dark:text-gray-200"> Choose premium activated carbon products for superior performance.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#FF3131] text-xl">💡</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-50">Monitor and Adjust:</strong>
                    <span className="text-gray-700 dark:text-gray-200"> Increase frequency or amount if odors persist.</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FF3131]/10 border border-[#FF3131]/20 rounded-lg p-6 mb-8">
                <h4 className="font-bold text-[#FF3131] mb-3">🏆 Why Choose Purrify?</h4>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Purrify's premium coconut shell activated carbon is specifically designed for easy application 
                  and maximum effectiveness. Our fine granules distribute evenly and provide up to 7 days of 
                  superior odor control.
                </p>
                <Link href="/products" className="inline-block bg-[#FF3131] text-white dark:text-gray-100 px-6 py-2 rounded-lg hover:bg-[#FF3131]/90 transition-colors">
                  Shop Purrify Products →
                </Link>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Troubleshooting Common Issues</h2>
              
              <div className="space-y-6 mb-8">
                <div className="border-l-4 border-orange-400 pl-6">
                  <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-2">Problem: Odors still present after application</h4>
                  <p className="text-orange-800 dark:text-orange-200">
                    <strong>Solution:</strong> Increase the amount used, ensure even distribution, 
                    or consider more frequent applications for heavy-use boxes.
                  </p>
                </div>
                <div className="border-l-4 border-orange-400 pl-6">
                  <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-2">Problem: Cat avoiding the litter box</h4>
                  <p className="text-orange-800 dark:text-orange-200">
                    <strong>Solution:</strong> Reduce the amount used or try mixing less thoroughly. 
                    Some cats are sensitive to texture changes.
                  </p>
                </div>
                <div className="border-l-4 border-orange-400 pl-6">
                  <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-2">Problem: Deodorizer clumping together</h4>
                  <p className="text-orange-800 dark:text-orange-200">
                    <strong>Solution:</strong> Ensure litter is completely dry before application 
                    and store deodorizer in a moisture-free environment.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Conclusion</h2>
              
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Proper application of <strong>cat litter deodorizer additive</strong> is the key to achieving 
                professional-grade odor control in your home. By following this step-by-step guide and 
                avoiding common mistakes, you'll enjoy a fresher, more pleasant environment for both 
                you and your feline friends.
              </p>

              <p className="text-gray-700 dark:text-gray-200">
                Remember, consistency is key. Regular application and proper technique will give you 
                the best results. <Link href="/products" className="text-[#FF3131] hover:underline font-medium">
                Try Purrify today</Link> and experience the difference that proper application can make!
              </p>
            </div>

            {/* Related Articles */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-600">
              <RelatedArticles currentPath="/blog/how-to-use-cat-litter-deodorizer" />
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
