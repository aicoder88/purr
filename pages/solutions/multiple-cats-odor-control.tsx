import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import Image from 'next/image';

export default function MultipleCatsOdorControlPage() {
  const seoTitle = 'Multiple Cats Odor Control Solution | Purrify';
  const seoDescription = 'Effective solution for multiple cats odor control. Purrify handles multi-cat households with industrial-strength odor elimination. Works with any litter brand.';
  const canonicalUrl = 'https://www.purrify.ca/solutions/multiple-cats-odor-control';

  // SEO optimized images for multi-cat households
  const heroImage = 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1600&q=80'; // Multiple cats together
  const solutionImage = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80'; // Happy multi-cat home

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
              alt: 'Multiple cats living harmoniously in odor-free home',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'multiple cats odor control, multi-cat household, cat litter many cats, litter deodorizer for multiple cats, large cat family, cat colony odor management',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/solutions/multiple-cats-odor-control"
        options={{
          category: 'Multi-Cat Solutions',
          keywords: ['multiple cats', 'multi-cat household', 'odor control', 'cat colony', 'large cat family'],
          datePublished: '2024-01-15T11:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 750,
          readingTime: 4
        }}
      />

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Image
              src={heroImage}
              alt="Multiple cats living together in clean, odor-free environment"
              width={600}
              height={300}
              className="w-full h-48 object-cover rounded-lg shadow-lg mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Multiple Cats Odor Control
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-8">
              Complete solution for multiple cats odor control
            </p>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 max-w-2xl mx-auto">
              <h2 className="text-2xl font-heading font-bold mb-4 text-electric-indigo dark:text-electric-indigo-400">The Purrify Solution</h2>
              <p className="text-lg mb-6">Purrify handles multi-cat households with industrial-strength odor elimination</p>

              <Image
                src={solutionImage}
                alt="Happy multi-cat household with successful odor management"
                width={500}
                height={250}
                className="w-full h-40 object-cover rounded-lg shadow-md mb-6"
              />

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-bold">Instant Results</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌿</div>
                  <h3 className="font-bold">100% Natural</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="font-bold">Cost Effective</h3>
                </div>
              </div>

              <Link
                href="/products/trial-size"
                className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-3 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Try Purrify Risk-Free
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text- center mb-12">How It Works</h2>
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
            <h2 className="text-3xl font-heading font-bold mb-8">Ready to Solve Your Multiple Cats Odor Control?</h2>
            <p className="text-xl mb-8">Join 1,000+ satisfied cat owners</p>
            <Link
              href="/products/compare"
              className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 text-lg shadow-lg"
            >
              Shop Purrify Now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
