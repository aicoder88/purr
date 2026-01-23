import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '../../../src/lib/translation-context';
import { formatProductPrice } from '../../../src/lib/pricing';
import { generateJSONLD } from '../../../src/lib/seo-utils';
import { useEnhancedSEO } from '../../../src/hooks/useEnhancedSEO';
import { Container } from '../../../src/components/ui/container';
import { HubSpokeNav } from '@/components/seo/HubSpokeNav';

export default function ApartmentCatSmellSolutionPage() {
  const { locale } = useTranslation();
  const trialPrice = formatProductPrice('trial', locale);
  const riskFreeLabel = `Try Purrify Risk-Free - ${trialPrice} (shipping included)`;
  const startTrialLabel = `Start Your Trial - ${trialPrice} (shipping included)`;
  const seoTitle = 'Best Litter for Apartments with No Ventilation (5 Proven Solutions)';
  const seoDescription = 'How to get rid of cat litter smell in apartment with no ventilation? Activated carbon eliminates odors in studios and small spaces. Works even without windows.';

  // SEO optimized images
  const heroImage = '/images/solutions/apartment-hero.png';
  const solutionImage = '/images/solutions/apartment-living-room.png';

  // Use enhanced SEO hook
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/learn/solutions/apartment-cat-smell-solution',
    title: seoTitle,
    description: seoDescription,
    targetKeyword: 'apartment cat smell solution',
    schemaType: 'article',
    schemaData: {
      type: 'Article',
      title: seoTitle,
      description: seoDescription,
      author: 'Purrify',
      datePublished: '2024-01-15',
      dateModified: new Date().toISOString().split('T')[0],
      image: heroImage,
    },
    includeBreadcrumb: true,
  });

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJSONLD(schema)}
        />
      )}

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center text-sm">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
              {breadcrumb?.items?.slice(1).map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                  ) : (
                    <Link href={item.path} className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                      {item.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Container>
        </section>

        {/* Hub-Spoke Navigation */}
        <Container className="py-6">
          <HubSpokeNav clusterId="small-apartments" currentUrl="/learn/solutions/apartment-cat-smell-solution" />
        </Container>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Image
                src={heroImage}
                alt="Modern apartment with cat - clean, odor-free living space"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-lg mb-8"
              />
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Best Litter for Apartments with No Ventilation
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
                Living in an apartment with no windows near the litter box? These 5 proven solutions eliminate cat odors
                in studios and small spaces—even without proper ventilation.
              </p>
            </div>

            {/* Main Solution Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-heading font-bold mb-6 text-electric-indigo dark:text-electric-indigo-400 text-center">The Purrify Apartment Solution</h2>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-200 text-center">
                Living in an apartment with cats presents unique challenges. Limited space means odors have nowhere to go,
                and close quarters with neighbors require discretion. Purrify eliminates odors at the source,
                giving you the freedom to enjoy apartment living with your feline friends.
              </p>

              <Image
                src={solutionImage}
                alt="Clean, fresh apartment living room showing successful odor control"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-md mb-6"
              />

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-heading font-bold text-lg mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Works immediately upon contact with odors</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🌿</div>
                  <h3 className="font-heading font-bold text-lg mb-2">100% Natural</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Safe for cats, humans, and the environment</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-heading font-bold text-lg mb-2">Cost Effective</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Extends litter life and reduces waste</p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {riskFreeLabel}
                </Link>
              </div>
            </div>

            {/* Apartment Challenges Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-deep-coral/10 dark:border-deep-coral/20 hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-heading font-bold mb-4 text-deep-coral dark:text-deep-coral-400">Apartment Cat Challenges</h3>
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

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-heading font-bold mb-4 text-electric-indigo dark:text-electric-indigo-400">Purrify Solutions</h3>
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
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 mb-16">
              <h3 className="text-3xl font-heading font-bold mb-8 text-center text-gray-900 dark:text-gray-100">How Purrify Works in Small Spaces</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <h4 className="font-heading font-bold mb-2">Step 1: Target Problem Areas</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    In apartments, litter boxes are often in bathrooms, bedrooms, or closets where odors concentrate
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-heading font-bold mb-2">Step 2: Immediate Action</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Activated carbon instantly begins absorbing odor molecules before they can spread through your space
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h4 className="font-heading font-bold mb-2">Step 3: Fresh Environment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintain a consistently fresh apartment that you're proud to call home
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Success Stories */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16">
              <h3 className="text-3xl font-heading font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Apartment Success Stories</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
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
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
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
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20">
              <h3 className="text-3xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100">Ready for a Fresh Apartment?</h3>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
                Join thousands of apartment dwellers who've transformed their living spaces with Purrify.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/products/trial-size"
                  className="bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {startTrialLabel}
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
            <h2 className="text-3xl font-heading font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-heading font-bold text-white dark:text-gray-100">1</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Sprinkle</h3>
                <p>Add Purrify to your existing litter</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-heading font-bold text-white dark:text-gray-100">2</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Activate</h3>
                <p>Activated carbon absorbs odor molecules</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-electric-indigo to-deep-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-heading font-bold text-white dark:text-gray-100">3</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Eliminate</h3>
                <p>Odors are permanently trapped</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-8">Ready to Solve Your Apartment Cat Smell Solution?</h2>
            <p className="text-xl mb-8">Join 1,000+ satisfied cat owners</p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 text-lg shadow-lg"
            >
              Shop Purrify Now
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
