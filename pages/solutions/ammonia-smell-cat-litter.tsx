import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';

export default function ammoniasmellcatlitterPage() {
  const seoTitle = 'Stop Cat Litter Ammonia Smell | Purrify';
  const seoDescription = 'Sharp ammonia smell from litter box? Water-filter grade carbon destroys it instantly. No more holding your breath!';

  // Ammonia smell solution images
  const heroImage = 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&w=1600&q=80'; // Person holding nose
  const sectionImage1 = 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb74c7?auto=format&fit=crop&w=1600&q=80'; // Scientific molecular view
  const sectionImage2 = 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=1600&q=80'; // Clean fresh home
  const solutionImage = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=80'; // Happy cat
  
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical="https://www.purrify.ca/solutions/ammonia-smell-cat-litter"
        openGraph={{
          type: 'article',
          url: 'https://www.purrify.ca/solutions/ammonia-smell-cat-litter',
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: heroImage,
              width: 1600,
              height: 1067,
              alt: 'Stop embarrassing ammonia smell from cat litter box',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'ammonia smell cat litter, litter box stink, cat urine odor, activated carbon deodorizer, eliminate ammonia smell instantly, water-filter grade carbon',
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Stop That Sharp Ammonia Smell!
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-8">
              Finally! A solution that destroys ammonia smell instead of masking it. Your nose (and your guests) will thank you.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Powerful Ammonia Destroyer</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-200">This isn't your typical air freshener. Purrify uses the same activated carbon grade found in military gas masks to destroy ammonia molecules instantly.</p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Why Ammonia Smell Develops</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-3">
                  Ammonia smell in cat litter boxes occurs when bacteria break down urea in cat urine. This natural process
                  produces ammonia gas, which has that distinctive sharp, pungent odor that makes you want to hold your breath.
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  Traditional clay litters can trap some odors, but they can't neutralize ammonia at the molecular level.
                  That's where activated carbon technology makes the difference.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Instant Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Works immediately upon application</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌿</div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">100% Natural</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Safe for cats and humans</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Cost Effective</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Small amount goes a long way</p>
                </div>
              </div>
              
              <Link
                href="/products/trial-size"
                className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
              >
                Get Purrify Now - Stop The Stink
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
                alt="Person bothered by strong ammonia smell from cat litter box"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="text-3xl font-bold mb-2">No More Holding Your Breath!</h2>
                  <p className="text-xl opacity-90">Eliminate ammonia smell at the molecular level</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">How It Works</h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-12 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">The Science Behind Ammonia Elimination</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                Activated carbon works through a process called adsorption (not absorption). The carbon has millions of
                microscopic pores that create an enormous surface area - just one gram has the surface area of a football field!
              </p>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                When ammonia molecules come into contact with activated carbon, they become trapped in these pores through
                chemical attraction. Unlike air fresheners that just mask odors, this process actually removes the ammonia
                from the air permanently.
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                This is why Purrify works so effectively - it doesn't just cover up the smell, it eliminates the source
                of the odor at the molecular level.
              </p>
            </div>

            {/* Science Image */}
            <div className="mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={sectionImage1}
                  alt="Molecular science of activated carbon trapping ammonia molecules"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="text-2xl font-bold mb-2">Military-Grade Carbon Technology</h3>
                    <p className="text-lg opacity-90">Same technology used in water filters and gas masks</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-300">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Sprinkle</h3>
                <p className="text-gray-700 dark:text-gray-200">Add Purrify to your existing litter - works with any brand</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-300">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Activate</h3>
                <p className="text-gray-700 dark:text-gray-200">Activated carbon absorbs ammonia molecules at the source</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-300">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Eliminate</h3>
                <p className="text-gray-700 dark:text-gray-200">Odors are permanently trapped - no more ammonia smell</p>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Home Image */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage2}
                alt="Clean, fresh-smelling home environment without ammonia odor"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-2">Fresh Home, Happy Life</h3>
                  <p className="text-lg opacity-90">No more embarrassment when guests visit</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Ready to Solve Your Ammonia Smell Problem?</h2>
              <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">Join 1,000+ satisfied cat owners who've eliminated litter box odors</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Why Choose Purrify?</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li>✓ Works with any litter brand you already use</li>
                  <li>✓ 100% natural activated carbon - safe for cats and humans</li>
                  <li>✓ Eliminates ammonia at the molecular level</li>
                  <li>✓ No artificial fragrances or chemicals</li>
                  <li>✓ Cost-effective - a little goes a long way</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Common Results</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li>✓ Immediate reduction in ammonia smell</li>
                  <li>✓ Fresh-smelling home even with multiple cats</li>
                  <li>✓ No more embarrassment when guests visit</li>
                  <li>✓ Longer-lasting litter between changes</li>
                  <li>✓ Happier cats and humans alike</li>
                </ul>
              </div>
            </div>

            {/* Solution Image - Happy Cat */}
            <div className="mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
                <Image
                  src={solutionImage}
                  alt="Happy cat in odor-free home thanks to Purrify ammonia elimination"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="text-2xl font-bold mb-2">Your Cat Deserves Better</h3>
                    <p className="text-lg opacity-90">Join 1,000+ happy cat owners</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/products/compare"
                className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all text-lg mr-4"
              >
                Shop Purrify Now
              </Link>
              <Link
                href="/learn/how-it-works"
                className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-4 px-8 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
