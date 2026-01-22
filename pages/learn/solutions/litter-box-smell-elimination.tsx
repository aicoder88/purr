import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { formatProductPrice } from '../../../src/lib/pricing';
import { useTranslation } from '../../../src/lib/translation-context';
import { generateJSONLD } from '../../../src/lib/seo-utils';
import { useEnhancedSEO } from '../../../src/hooks/useEnhancedSEO';
import { Container } from '../../../src/components/ui/container';

export default function LitterBoxSmellEliminationPage() {
  const { locale } = useTranslation();
  const seoTitle = 'Litter Box Odor Control Guide | Purrify';
  const seoDescription = 'Eliminate litter box smells permanently with proven activated carbon technology. Complete guide to odor-free cat care with natural, fragrance-free solutions.';

  // SEO optimized images for odor elimination
  const heroImage = '/images/solutions/litter-box-hero.png';
  const solutionImage = '/images/solutions/ammonia-happy-cat.png';
  const scienceImage = '/images/solutions/ammonia-science.png';

  // Use enhanced SEO hook
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/learn/solutions/litter-box-smell-elimination',
    title: seoTitle,
    description: seoDescription,
    targetKeyword: 'litter box smell elimination',
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
          dangerouslySetInnerHTML={{ __html: generateJSONLD(schema) }}
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

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Image
                src={heroImage}
                alt="Clean litter box with cat - complete odor elimination"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-lg mb-8"
              />
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Litter Box Smell Elimination
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
                End embarrassing litter box odors forever with our scientifically proven activated carbon technology.
                Natural, safe, and incredibly effective.
              </p>
            </div>

            {/* Main Solution Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-heading font-bold mb-6 text-electric-indigo dark:text-electric-indigo-400 text-center">The Science of Odor Elimination</h2>

              <Image
                src={scienceImage}
                alt="Scientific approach to odor elimination with activated carbon"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-md mb-6"
              />

              <p className="text-lg mb-8 text-gray-700 dark:text-gray-200 text-center">
                Unlike masking agents or fragrances, activated carbon actually removes odor molecules from the air.
                Each tiny pore traps ammonia, hydrogen sulfide, and other odor compounds permanently.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🧪</div>
                  <h3 className="font-heading font-bold text-lg mb-2">Molecular Level</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Eliminates odors at the source, not just masking</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🌿</div>
                  <h3 className="font-heading font-bold text-lg mb-2">100% Natural</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Made from coconut shells - safe for cats and family</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">⏱️</div>
                  <h3 className="font-heading font-bold text-lg mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Works within minutes of application</p>
                </div>
              </div>

              <Image
                src={solutionImage}
                alt="Happy cat in fresh, odor-free environment"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-md mb-6"
              />

              <div className="text-center">
                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-50">Ready to Eliminate Odors Forever?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Join thousands of cat owners who've solved their litter box odor problems with Purrify.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products/trial-size"
                    className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {`Try Purrify Risk-Free - ${formatProductPrice('trial')}`}
                  </Link>
                  <Link
                    href="/learn/how-it-works"
                    className="inline-block border-2 border-electric-indigo dark:border-electric-indigo text-electric-indigo dark:text-electric-indigo-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-electric-indigo/10 dark:hover:bg-electric-indigo/20 hover:scale-105 transition-all duration-300"
                  >
                    Learn the Science
                  </Link>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-heading font-bold mb-4 text-electric-indigo dark:text-electric-indigo-400">Works with Any Litter</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li>✅ Clay litter (clumping & non-clumping)</li>
                  <li>✅ Crystal/silica gel litter</li>
                  <li>✅ Natural/biodegradable litter</li>
                  <li>✅ Wood pellet litter</li>
                  <li>✅ Paper-based litter</li>
                </ul>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-deep-coral/10 dark:border-deep-coral/20 hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-heading font-bold mb-4 text-deep-coral dark:text-deep-coral-400">Perfect For</h3>
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
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 text-white dark:text-gray-100 text-center">
              <blockquote className="text-2xl font-medium mb-4">
                "I was so embarrassed when guests came over. Now I actually invite people in!
                Purrify completely eliminated the smell in just one day."
              </blockquote>
              <cite className="text-blue-100 dark:text-gray-300">— Sarah M., Toronto</cite>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
