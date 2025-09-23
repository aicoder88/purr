import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { OptimizedImage } from '../../src/components/performance/OptimizedImage';

export default function ApartmentCatSmellSolutionPage() {
  const seoTitle = 'Apartment Cat Smell Solution - Activated Carbon Odor Eliminator | Purrify';
  const seoDescription = 'Eliminate apartment cat odors completely with Purrify activated carbon additive. Perfect for small spaces, works with any litter brand. Breathe easy again in your apartment.';
  const canonicalUrl = 'https://www.purrify.ca/solutions/apartment-cat-smell-solution';

  // SEO optimized images
  const heroImage = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'; // Modern apartment with cat
  const solutionImage = 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80'; // Clean apartment living room
  
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
              alt: 'Modern apartment living with cats - odor-free solution',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'apartment cat smell solution, small space cat odor, urban cat litter, activated carbon odor control, apartment living with cats, rental pet policy, cat odor elimination',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/solutions/apartment-cat-smell-solution"
        options={{
          category: 'Pet Care Solutions',
          keywords: ['apartment living', 'cat odor control', 'small space solutions', 'activated carbon'],
          datePublished: '2024-01-15T10:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 800,
          readingTime: 4
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <OptimizedImage
                src={heroImage}
                alt="Modern apartment with cat - clean, odor-free living space"
                width={600}
                height={300}
                className="w-full h-48 object-cover rounded-lg shadow-lg mb-8"
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Apartment Cat Smell Solution
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
                Transform your small living space into a fresh, odor-free environment with Purrify's activated carbon technology.
                The perfect solution for apartment dwellers who love their cats but hate the smell.
              </p>
            </div>

            {/* Main Solution Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400 text-center">The Purrify Apartment Solution</h2>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-200 text-center">
                Living in an apartment with cats presents unique challenges. Limited space means odors have nowhere to go,
                and close quarters with neighbors require discretion. Purrify eliminates odors at the source,
                giving you the freedom to enjoy apartment living with your feline friends.
              </p>

              <OptimizedImage
                src={solutionImage}
                alt="Clean, fresh apartment living room showing successful odor control"
                width={500}
                height={250}
                className="w-full h-40 object-cover rounded-lg shadow-md mb-6"
              />

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-bold text-lg mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Works immediately upon contact with odors</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🌿</div>
                  <h3 className="font-bold text-lg mb-2">100% Natural</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Safe for cats, humans, and the environment</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-bold text-lg mb-2">Cost Effective</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Extends litter life and reduces waste</p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Try Purrify Risk-Free - $4.99
                </Link>
              </div>
            </div>

            {/* Apartment Challenges Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Apartment Cat Challenges</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 dark:text-red-400 mr-3">❌</span>
                    <div>
                      <strong>Limited ventilation</strong> - Odors get trapped in small spaces
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 dark:text-red-400 mr-3">❌</span>
                    <div>
                      <strong>Close neighbors</strong> - Need to be considerate of shared walls
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 dark:text-red-400 mr-3">❌</span>
                    <div>
                      <strong>Small litter areas</strong> - Often located in bathrooms or bedrooms
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 dark:text-red-400 mr-3">❌</span>
                    <div>
                      <strong>Frequent guests</strong> - First impressions matter in compact spaces
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Purrify Solutions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-3">✅</span>
                    <div>
                      <strong>Activated carbon technology</strong> - Absorbs odors at the molecular level
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-3">✅</span>
                    <div>
                      <strong>Works with any litter</strong> - No need to change your cat's routine
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-3">✅</span>
                    <div>
                      <strong>Long-lasting protection</strong> - Continuous odor elimination
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-3">✅</span>
                    <div>
                      <strong>Guest-ready home</strong> - Always prepared for unexpected visitors
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* How It Works in Apartments */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">How Purrify Works in Small Spaces</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <h4 className="font-bold mb-2">Step 1: Target Problem Areas</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    In apartments, litter boxes are often in bathrooms, bedrooms, or closets where odors concentrate
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-bold mb-2">Step 2: Immediate Action</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Activated carbon instantly begins absorbing odor molecules before they can spread through your space
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h4 className="font-bold mb-2">Step 3: Fresh Environment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintain a consistently fresh apartment that you're proud to call home
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Success Stories */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Apartment Success Stories</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl">⭐</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Sarah M. - Toronto Studio</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">400 sq ft apartment</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 text-sm">
                    "Living in a tiny studio with my cat was embarrassing until I found Purrify.
                    Now I actually invite friends over without worrying about the smell!"
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl">⭐</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Mike R. - Montreal Condo</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">1-bedroom apartment</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 text-sm">
                    "My neighbor actually complimented how fresh my hallway smells now.
                    Purrify made apartment living with two cats totally manageable."
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Ready for a Fresh Apartment?</h3>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
                Join thousands of apartment dwellers who've transformed their living spaces with Purrify.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/products/trial-size"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Your Trial - $4.99
                </Link>
                <Link
                  href="/learn/how-it-works"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-semibold underline"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Sprinkle</h3>
                <p>Add Purrify to your existing litter</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Activate</h3>
                <p>Activated carbon absorbs odor molecules</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Eliminate</h3>
                <p>Odors are permanently trapped</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Solve Your Apartment Cat Smell Solution?</h2>
            <p className="text-xl mb-8">Join 1,000+ satisfied cat owners</p>
            <Link 
              href="/products/compare"
              className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all text-lg"
            >
              Shop Purrify Now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
