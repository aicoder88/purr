import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SITE_NAME } from '@/lib/constants';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { Check, X, FlaskConical, Timer, Shield, Leaf, Droplets, Zap } from 'lucide-react';

// Optimized images
const heroImage = '/optimized/activated-carbon-granules.webp';
const comparisonImage = '/optimized/carbon_magnified_image.webp';

export const metadata: Metadata = {
  title: `Zeolite vs Activated Carbon for Cat Litter: Which Works Better? | ${SITE_NAME}`,
  description: 'Zeolite and activated carbon both claim to eliminate cat litter odor. We compared their molecular structures, absorption rates, and real-world performance. Here\'s the winner.',
  keywords: 'zeolite vs activated charcoal, zeolite cat litter, activated carbon cat litter, best cat litter deodorizer, zeolite litter additive',
  alternates: {
    canonical: 'https://www.purrify.ca/blog/activated-carbon-vs-zeolite-cat-litter',
  },
  openGraph: {
    title: 'Zeolite vs Activated Carbon: Which Eliminates Cat Litter Odor Better?',
    description: 'Both claim to eliminate odor, but only one actually traps ammonia at the molecular level. See the science behind the winner.',
    url: 'https://www.purrify.ca/blog/activated-carbon-vs-zeolite-cat-litter',
    images: [
      {
        url: `https://www.purrify.ca${heroImage}`,
        width: 1600,
        height: 900,
      },
    ],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Zeolite vs Activated Carbon for Cat Litter: The Scientific Comparison',
  image: [`https://www.purrify.ca${heroImage}`],
  datePublished: '2025-01-22',
  dateModified: new Date().toISOString().split('T')[0],
  author: { '@type': 'Organization', name: 'Purrify' },
  publisher: {
    '@type': 'Organization',
    name: 'Purrify',
    logo: { '@type': 'ImageObject', url: 'https://www.purrify.ca/optimized/logo-icon-512.webp' },
  },
};

export default function ActivatedCarbonVsZeoliteCatLitterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-cream-50 dark:bg-gray-900 min-h-screen">
        <Container>
          <article className="max-w-4xl mx-auto py-12 md:py-20 px-4">

            {/* Header Section */}
            <header className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 dark:bg-forest-900 dark:text-forest-200 text-sm font-medium mb-6">
                <FlaskConical className="w-4 h-4" />
                <span>Science & Comparison</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
                Zeolite vs. Activated Carbon <span className="text-forest-600 dark:text-forest-400 block mt-2 text-3xl md:text-5xl">Which Actually Eliminates Cat Litter Odor?</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Two natural minerals. Both claim to eliminate ammonia. But their molecular structures tell very different stories.
              </p>
            </header>

            {/* Hero Image */}
            <div className="mb-16 relative group">
              <div className="absolute inset-0 bg-forest-900/10 rounded-3xl transform rotate-1 transition-transform group-hover:rotate-2"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9]">
                <Image
                  src={heroImage}
                  alt="Close up comparison of activated carbon and zeolite granules"
                  className="w-full h-full object-cover"
                  width={1600}
                  height={900}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1600px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  <p className="text-white/90 dark:text-white/90 text-sm font-medium uppercase tracking-wider">The porous structure that makes all the difference</p>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-forest-100 dark:border-forest-900/30 mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-forest-50 dark:bg-forest-900/20 rounded-bl-full -mr-8 -mt-8"></div>
              <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-gray-100">
                <Shield className="w-6 h-6 text-forest-500" />
                The Quick Verdict
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 dark:bg-green-900/50 p-1 rounded-full text-green-600 dark:text-green-400">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Activated Carbon</strong> excels at trapping organic odor compounds (ammonia, sulfur) through its massive surface area of micropores - up to 3,000 m²/gram.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full text-blue-600 dark:text-blue-400">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Zeolite</strong> is better at moisture absorption and ion exchange, making it useful for humidity control but less effective for ammonia gas.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-forest-100 dark:bg-forest-900/50 p-1 rounded-full text-forest-600 dark:text-forest-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300"><strong>For cat litter odor?</strong> Activated carbon wins. Ammonia is a gas, and carbon&apos;s adsorption mechanism is specifically designed to trap gases.</p>
                </li>
              </ul>
            </div>

            <div className="prose prose-lg prose-forest max-w-none dark:prose-invert">
              <p className="lead text-2xl font-medium text-gray-800 dark:text-gray-200 mb-10">
                If you&apos;ve researched natural odor eliminators, you&apos;ve probably seen both zeolite and activated carbon marketed as miracle solutions. But which one actually works for the sharp ammonia smell from your cat&apos;s litter box?
              </p>

              {/* Understanding the Two Materials */}
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Understanding the Science</h2>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-forest-500 shadow-sm">
                  <h4 className="text-xl font-bold text-forest-700 dark:text-forest-400 m-0 mb-3">What is Activated Carbon?</h4>
                  <p className="m-0 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Activated carbon (also called activated charcoal) is carbon processed at extremely high temperatures to create millions of tiny pores. These pores dramatically increase surface area - just one gram can have up to 3,000 square meters of surface area (roughly half a football field). This makes it incredibly effective at <strong>adsorbing</strong> gas molecules like ammonia.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-blue-400 dark:border-blue-500 shadow-sm">
                  <h4 className="text-xl font-bold text-blue-700 dark:text-blue-400 m-0 mb-3">What is Zeolite?</h4>
                  <p className="m-0 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Zeolite is a naturally occurring volcanic mineral with a crystalline cage-like structure. It works through <strong>ion exchange</strong> - swapping ions to neutralize certain compounds. Zeolite is excellent at absorbing moisture and can trap some ammonia ions dissolved in liquid, but struggles with ammonia in its gaseous form.
                  </p>
                </div>
              </div>

              {/* Key Difference Section */}
              <div className="bg-gradient-to-r from-forest-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 my-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">The Critical Difference: Gas vs. Liquid</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Here&apos;s what most comparisons miss: <strong>cat litter odor is primarily airborne ammonia gas</strong>, not dissolved ammonia ions.
                </p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-forest-500 mt-0.5 flex-shrink-0" />
                    <span>Activated carbon excels at trapping gas molecules through physical adsorption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Zeolite&apos;s ion exchange works best with dissolved compounds in liquid</span>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4 text-sm italic">
                  This is why zeolite-based products often disappoint cat owners - they&apos;re fighting the wrong battle.
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Head-to-Head Comparison</h2>

              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg mb-16">
                <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 font-bold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                  <div>Property</div>
                  <div className="text-center text-forest-600 dark:text-forest-400">Activated Carbon</div>
                  <div className="text-center text-blue-600 dark:text-blue-400">Zeolite</div>
                </div>

                {[
                  { name: 'Surface Area', carbon: '1,000-3,000 m²/g', zeolite: '300-800 m²/g' },
                  { name: 'Ammonia Gas Trapping', carbon: 'Excellent', zeolite: 'Moderate' },
                  { name: 'Moisture Absorption', carbon: 'Moderate', zeolite: 'Excellent' },
                  { name: 'Odor Elimination Speed', carbon: 'Immediate', zeolite: 'Gradual' },
                  { name: 'Longevity in Litter', carbon: '7-14 Days', zeolite: '3-7 Days' },
                  { name: 'pH Stability', carbon: 'Neutral', zeolite: 'Slightly Alkaline' },
                  { name: 'Cat Safety', carbon: 'Non-toxic, Food-grade', zeolite: 'Non-toxic, Natural' },
                  { name: 'Dust Level', carbon: 'Low (coconut-based)', zeolite: 'Can be dusty' },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 p-4 items-center ${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">{row.name}</div>
                    <div className="text-center text-forest-700 dark:text-forest-300 font-medium text-sm md:text-base">{row.carbon}</div>
                    <div className="text-center text-blue-600 dark:text-blue-400 text-sm md:text-base">{row.zeolite}</div>
                  </div>
                ))}
              </div>

              {/* When Zeolite Makes Sense */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 my-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <Droplets className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  When Zeolite Does Help
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  To be fair, zeolite isn&apos;t useless - it has legitimate applications:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• High-humidity environments where moisture control is the priority</li>
                  <li>• Water filtration (where ammonia is dissolved, not gaseous)</li>
                  <li>• Soil amendment for gardens</li>
                  <li>• As a secondary additive alongside activated carbon</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  However, for the specific problem of ammonia odor in cat litter, activated carbon&apos;s adsorption mechanism is simply better suited to the task.
                </p>
              </div>

              {/* The Winner */}
              <div className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">The Winner for Cat Litter Odor</h2>
                <div className="bg-forest-900 dark:bg-forest-950 text-white dark:text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-yellow-400 dark:bg-yellow-500 text-yellow-900 dark:text-yellow-950 p-3 rounded-full mb-6 shadow-glow">
                      <Timer className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">Activated Carbon</h3>
                    <p className="text-forest-100 dark:text-forest-200 text-xl max-w-2xl mx-auto mb-8">
                      For eliminating the ammonia smell from cat litter, activated carbon wins decisively. Its massive surface area and gas-trapping mechanism are specifically designed for airborne odors.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 text-left w-full max-w-3xl">
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 dark:border-white/5">
                        <div className="font-bold text-lg mb-1 text-yellow-400 dark:text-yellow-400">4x More Surface</div>
                        <p className="text-sm text-forest-100 dark:text-forest-200">Up to 3,000 m²/g vs zeolite&apos;s 800 m²/g maximum.</p>
                      </div>
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 dark:border-white/5">
                        <div className="font-bold text-lg mb-1 text-yellow-400 dark:text-yellow-400">Gas Specialist</div>
                        <p className="text-sm text-forest-100 dark:text-forest-200">Adsorption mechanism designed specifically for trapping gases.</p>
                      </div>
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 dark:border-white/5">
                        <div className="font-bold text-lg mb-1 text-yellow-400 dark:text-yellow-400">Longer Lasting</div>
                        <p className="text-sm text-forest-100 dark:text-forest-200">Works effectively for 7-14 days vs zeolite&apos;s 3-7 days.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practical Recommendation */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-forest-100 dark:border-forest-900/30 my-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <Leaf className="w-6 h-6 text-forest-500" />
                  Our Recommendation
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you&apos;re dealing with cat litter odor, choose a <strong>coconut shell activated carbon</strong> product. Here&apos;s why coconut-based specifically:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-forest-500 mt-0.5 flex-shrink-0" />
                    <span>Highest micropore density for trapping small ammonia molecules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-forest-500 mt-0.5 flex-shrink-0" />
                    <span>Food-grade and completely non-toxic to cats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-forest-500 mt-0.5 flex-shrink-0" />
                    <span>Lower dust levels than coal-based alternatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-forest-500 mt-0.5 flex-shrink-0" />
                    <span>Sustainable and renewable resource</span>
                  </li>
                </ul>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 dark:bg-forest-700 dark:hover:bg-forest-600 text-white dark:text-gray-100 font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Try Purrify Activated Carbon
                </Link>
              </div>

              {/* FAQ Section */}
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>

              <div className="space-y-6 mb-12">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">Can I use zeolite and activated carbon together?</h4>
                  <p className="text-gray-700 dark:text-gray-300 m-0">Yes, they can complement each other. Zeolite handles moisture while carbon handles odor. However, for most cat owners, activated carbon alone is sufficient and more cost-effective.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">Is zeolite safe for cats?</h4>
                  <p className="text-gray-700 dark:text-gray-300 m-0">Natural zeolite is generally considered non-toxic. However, some zeolite products can be dusty, which may irritate cats with respiratory sensitivities. Always choose low-dust options.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">Why do some products combine both?</h4>
                  <p className="text-gray-700 dark:text-gray-300 m-0">Marketing often drives this decision. While the combination can work, it&apos;s usually more expensive without providing proportionally better results for odor control specifically.</p>
                </div>
              </div>

            </div>

            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <p>Published January 2025</p>
              <Link href="/blog" className="mt-4 md:mt-0 px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
                ← Back to All Articles
              </Link>
            </footer>

          </article>

          {/* Related Articles */}
          <div className="py-12 border-t border-gray-100 dark:border-gray-800">
            <RelatedContent currentUrl="/blog/activated-carbon-vs-zeolite-cat-litter" />
          </div>
        </Container>
      </div>
    </>
  );
}
