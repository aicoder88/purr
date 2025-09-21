import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { OptimizedImage } from '../../src/components/performance/OptimizedImage';

export default function LitterBoxSmellEliminationPage() {
  const seoTitle = 'Litter Box Smell Elimination - Complete Odor Control Guide | Purrify';
  const seoDescription = 'Eliminate litter box smells permanently with proven activated carbon technology. Complete guide to odor-free cat care with natural, fragrance-free solutions.';
  const canonicalUrl = 'https://www.purrify.ca/solutions/litter-box-smell-elimination';

  // SEO optimized images for odor elimination
  const heroImage = 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1600&q=80'; // Cat with clean litter box
  const solutionImage = 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1600&q=80'; // Happy cat in fresh environment
  const scienceImage = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80'; // Science/laboratory setting

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
              alt: 'Complete litter box odor elimination solution',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'litter box smell elimination, cat litter odor control, activated carbon odor eliminator, natural pet odor removal, fragrance-free cat care',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/solutions/litter-box-smell-elimination"
        options={{
          category: 'Pet Odor Solutions',
          keywords: ['litter box odor', 'smell elimination', 'activated carbon', 'natural solutions'],
          datePublished: '2024-01-15T12:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 900,
          readingTime: 4
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <OptimizedImage
                src={heroImage}
                alt="Clean litter box with cat - complete odor elimination"
                width={600}
                height={300}
                className="w-full h-48 object-cover rounded-lg shadow-lg mb-8"
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Litter Box Smell Elimination
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
                End embarrassing litter box odors forever with our scientifically proven activated carbon technology.
                Natural, safe, and incredibly effective.
              </p>
            </div>

            {/* Main Solution Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400 text-center">The Science of Odor Elimination</h2>

              <OptimizedImage
                src={scienceImage}
                alt="Scientific approach to odor elimination with activated carbon"
                width={500}
                height={250}
                className="w-full h-40 object-cover rounded-lg shadow-md mb-6"
              />

              <p className="text-lg mb-8 text-gray-700 dark:text-gray-200 text-center">
                Unlike masking agents or fragrances, activated carbon actually removes odor molecules from the air.
                Each tiny pore traps ammonia, hydrogen sulfide, and other odor compounds permanently.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🧪</div>
                  <h3 className="font-bold text-lg mb-2">Molecular Level</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Eliminates odors at the source, not just masking</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🌿</div>
                  <h3 className="font-bold text-lg mb-2">100% Natural</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Made from coconut shells - safe for cats and family</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">⏱️</div>
                  <h3 className="font-bold text-lg mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Works within minutes of application</p>
                </div>
              </div>

              <OptimizedImage
                src={solutionImage}
                alt="Happy cat in fresh, odor-free environment"
                width={500}
                height={250}
                className="w-full h-40 object-cover rounded-lg shadow-md mb-6"
              />

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Ready to Eliminate Odors Forever?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Join thousands of cat owners who've solved their litter box odor problems with Purrify.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products/trial-size"
                    className="inline-block bg-green-600 text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
                  >
                    Try Purrify Risk-Free - $6.99
                  </Link>
                  <Link
                    href="/learn/how-it-works"
                    className="inline-block border-2 border-green-600 text-green-600 dark:text-green-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  >
                    Learn the Science
                  </Link>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Works with Any Litter</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li>✅ Clay litter (clumping & non-clumping)</li>
                  <li>✅ Crystal/silica gel litter</li>
                  <li>✅ Natural/biodegradable litter</li>
                  <li>✅ Wood pellet litter</li>
                  <li>✅ Paper-based litter</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Perfect For</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li>🏠 Small apartments & condos</li>
                  <li>🐱 Multiple cat households</li>
                  <li>👥 Sensitive family members</li>
                  <li>🏢 Indoor cats in offices</li>
                  <li>🎯 Any persistent odor problem</li>
                </ul>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white dark:text-gray-100 text-center">
              <blockquote className="text-2xl font-medium mb-4">
                "I was so embarrassed when guests came over. Now I actually invite people in!
                Purrify completely eliminated the smell in just one day."
              </blockquote>
              <cite className="text-blue-100 dark:text-gray-300">— Sarah M., Toronto</cite>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}