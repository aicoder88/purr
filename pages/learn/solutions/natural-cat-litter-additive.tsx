import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../../src/lib/seo-utils';

export default function NaturalCatLitterAdditivePage() {
  const { locale } = useTranslation();
  const seoTitle = 'Natural Cat Litter Additive Solution | Purrify';
  const seoDescription = 'Effective solution for natural cat litter additive. 100% natural activated carbon with no added fragrances or dyes. Works with any litter brand.';
  const canonicalUrl = getLocalizedUrl('/learn/solutions/natural-cat-litter-additive', locale);
  const languageAlternates = buildLanguageAlternates('/learn/solutions/natural-cat-litter-additive');

  // Natural cat litter additive images
  const heroImage = '/images/solutions/litter-box-hero.png';
  const sectionImage1 = '/images/solutions/ammonia-science.png';
  const sectionImage2 = '/images/solutions/ammonia-happy-cat.png';
  const solutionImage = '/images/solutions/ammonia-fresh-home.png';

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          url: canonicalUrl,
          images: [
            {
              url: `https://www.purrify.ca${heroImage}`,
              width: 1200,
              height: 675,
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

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Natural Cat Litter Additive
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-8">
              Complete solution for natural cat litter additive
            </p>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 max-w-2xl mx-auto">
              <h2 className="text-2xl font-heading font-bold mb-4 text-electric-indigo dark:text-electric-indigo-400">The Purrify Solution</h2>
              <p className="text-lg mb-6">100% natural activated carbon with no added fragrances or dyes</p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-heading font-bold">Instant Results</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌿</div>
                  <h3 className="font-heading font-bold">100% Natural</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="font-heading font-bold">Cost Effective</h3>
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

        {/* Hero Image */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={heroImage}
                alt="Natural coconut shell activated carbon - 100% natural cat litter additive"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="text-3xl font-heading font-bold mb-2">100% Natural from Coconut Shells</h2>
                  <p className="text-xl opacity-90">No chemicals, no fragrances, just pure carbon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center mb-12 text-gray-900 dark:text-gray-100">How It Works</h2>
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

            {/* Natural Ingredients Image */}
            <div className="mt-12 mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={sectionImage1}
                  alt="Natural ingredients and eco-friendly cat litter solution"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="text-2xl font-heading font-bold mb-2">Pure & Natural Ingredients</h3>
                    <p className="text-lg opacity-90">Safe for your family and the environment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Happy Cats Image */}
            <div className="mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={sectionImage2}
                  alt="Multiple happy cats in clean, naturally fresh home"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="text-2xl font-heading font-bold mb-2">Happy Cats, Natural Solution</h3>
                    <p className="text-lg opacity-90">No artificial fragrances or chemicals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">Ready to Try Natural Cat Litter Additive?</h2>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">Join 1,000+ satisfied cat owners</p>

            {/* Solution Image */}
            <div className="mb-12 max-w-3xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={solutionImage}
                  alt="Eco-friendly natural cat litter additive for sustainable pet care"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="text-2xl font-heading font-bold mb-2">Sustainable Pet Care</h3>
                    <p className="text-lg opacity-90">Natural solution for a cleaner planet</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/products"
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
