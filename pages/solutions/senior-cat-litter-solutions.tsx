import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { OptimizedImage } from '../../src/components/performance/OptimizedImage';

export default function SeniorCatLitterSolutionsPage() {
  const seoTitle = 'Senior Cat Litter Odor Solutions | Purrify';
  const seoDescription = 'Specialized litter solutions for senior cats. Gentle, fragrance-free odor control that works with age-related health issues and sensitive systems.';
  const canonicalUrl = 'https://www.purrify.ca/solutions/senior-cat-litter-solutions';

  // SEO optimized images for senior cat care
  const heroImage = 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1600&q=80'; // Senior cat comfortable
  const solutionImage = 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=1600&q=80'; // Older cat in peaceful environment
  const careImage = 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1600&q=80'; // Gentle cat care

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: heroImage,
              width: 1200,
              height: 630,
              alt: 'Senior cat comfortable with gentle litter solution',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'senior cat litter, elderly cat odor control, gentle cat litter additive, aging cat care, fragrance-free senior pets',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/solutions/senior-cat-litter-solutions"
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

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <OptimizedImage
                src={heroImage}
                alt="Senior cat resting comfortably in clean environment"
                width={600}
                height={300}
                className="w-full h-48 object-cover rounded-lg shadow-lg mb-8"
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Senior Cat Litter Solutions
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
                Gentle, effective odor control designed for older cats. Natural solutions that work with
                age-related changes and sensitive systems.
              </p>
            </div>

            {/* Main Solution Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400 text-center">Understanding Senior Cat Needs</h2>

              <OptimizedImage
                src={careImage}
                alt="Gentle care approach for senior cats"
                width={500}
                height={250}
                className="w-full h-40 object-cover rounded-lg shadow-md mb-6"
              />

              <p className="text-lg mb-8 text-gray-700 dark:text-gray-200 text-center">
                As cats age, their kidneys may produce stronger-smelling urine, and they may develop
                sensitivities to fragrances and chemicals. Purrify provides powerful odor control
                without harsh additives.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-4xl mb-3">🌸</div>
                  <h3 className="font-bold text-lg mb-2">Fragrance-Free</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">No artificial scents that can irritate sensitive seniors</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-4xl mb-3">💖</div>
                  <h3 className="font-bold text-lg mb-2">Gentle & Natural</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Made from coconut shells - safe for sensitive systems</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-4xl mb-3">💪</div>
                  <h3 className="font-bold text-lg mb-2">Extra Strong</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Handles stronger odors from aging kidneys</p>
                </div>
              </div>

              <OptimizedImage
                src={solutionImage}
                alt="Senior cat living peacefully in odor-free home"
                width={500}
                height={250}
                className="w-full h-40 object-cover rounded-lg shadow-md mb-6"
              />

              <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">Special Considerations for Senior Cats</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Health Changes</h4>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-200">
                      <li>• Kidney function decline</li>
                      <li>• Stronger urine odor</li>
                      <li>• Increased frequency</li>
                      <li>• Arthritis affecting box access</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">How Purrify Helps</h4>
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
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Give Your Senior Cat the Comfort They Deserve</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Gentle enough for sensitive seniors, powerful enough for their changing needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products/trial-size"
                    className="inline-block bg-purple-600 dark:bg-purple-600 text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors shadow-lg"
                  >
                    Start with Trial Size - $6.99
                  </Link>
                  <Link
                    href="/learn/using-deodorizers-with-kittens"
                    className="inline-block border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    Senior Care Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* Age-Related Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-50">Senior Cat Litter Box Tips</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">🚪</div>
                  <h4 className="font-bold mb-2">Lower Sides</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Easier entry for arthritic cats</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📍</div>
                  <h4 className="font-bold mb-2">Multiple Boxes</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Closer access throughout home</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🧼</div>
                  <h4 className="font-bold mb-2">Frequent Cleaning</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Daily scooping plus Purrify</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🌡️</div>
                  <h4 className="font-bold mb-2">Warmth</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Keep boxes away from drafts</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white dark:text-gray-100 text-center">
              <blockquote className="text-2xl font-medium mb-4">
                "My 16-year-old Mittens has kidney issues, and the smell was getting really bad.
                Purrify works so well, and it doesn't bother her sensitive nose at all."
              </blockquote>
              <cite className="text-purple-100 dark:text-gray-300">— Linda K., Senior Cat Owner</cite>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
