import { NextSeo } from 'next-seo';
import Link from 'next/link';
import NextImage from '../../components/NextImage';

export default function naturalcatlitteradditivePage() {
  const seoTitle = 'Natural Cat Litter Additive Solution | Purrify';
  const seoDescription = 'Effective solution for natural cat litter additive. 100% natural activated carbon with no added fragrances or dyes. Works with any litter brand.';

  // Natural cat litter additive images
  const heroImage = 'https://images.unsplash.com/photo-1517080727870-780609473738?auto=format&fit=crop&w=1600&q=80'; // Coconut shells natural
  const sectionImage1 = 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1600&q=80'; // Natural ingredients
  const sectionImage2 = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80'; // Happy cats clean home
  const solutionImage = 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1600&q=80'; // Natural eco-friendly
  
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: heroImage,
              width: 1600,
              height: 1067,
              alt: 'Natural cat litter additive made from coconut shells',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'natural cat litter additive, cat odor control, fragrance free litter additive, natural solution',
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Natural Cat Litter Additive
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-8">
              Complete solution for natural cat litter additive
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">The Purrify Solution</h2>
              <p className="text-lg mb-6">100% natural activated carbon with no added fragrances or dyes</p>
              
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
                className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
              >
                Try Purrify Risk-Free
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <NextImage
                src={heroImage}
                alt="Natural coconut shell activated carbon - 100% natural cat litter additive"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="text-3xl font-bold mb-2">100% Natural from Coconut Shells</h2>
                  <p className="text-xl opacity-90">No chemicals, no fragrances, just pure carbon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">How It Works</h2>
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

            {/* Natural Ingredients Image */}
            <div className="mt-12 mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <NextImage
                  src={sectionImage1}
                  alt="Natural ingredients and eco-friendly cat litter solution"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="text-2xl font-bold mb-2">Pure & Natural Ingredients</h3>
                    <p className="text-lg opacity-90">Safe for your family and the environment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Happy Cats Image */}
            <div className="mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <NextImage
                  src={sectionImage2}
                  alt="Multiple happy cats in clean, naturally fresh home"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="text-2xl font-bold mb-2">Happy Cats, Natural Solution</h3>
                    <p className="text-lg opacity-90">No artificial fragrances or chemicals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Ready to Try Natural Cat Litter Additive?</h2>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">Join 1,000+ satisfied cat owners</p>

            {/* Solution Image */}
            <div className="mb-12 max-w-3xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <NextImage
                  src={solutionImage}
                  alt="Eco-friendly natural cat litter additive for sustainable pet care"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="text-2xl font-bold mb-2">Sustainable Pet Care</h3>
                    <p className="text-lg opacity-90">Natural solution for a cleaner planet</p>
                  </div>
                </div>
              </div>
            </div>

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
