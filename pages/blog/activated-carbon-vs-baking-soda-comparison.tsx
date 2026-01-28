import Head from 'next/head';
import Image from 'next/image';
import { Container } from '../../src/components/ui/container';
import { SITE_NAME } from '../../src/lib/constants';
import Link from 'next/link';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { Check, X, FlaskConical, Timer, Shield, Leaf } from 'lucide-react';

// Optimized images
const heroImage = '/optimized/activated-carbon-vs-baking-soda-comparison.webp';
const comparisonImage = '/optimized/carbon_magnified_image.webp';

export default function ActivatedCarbonVsBakingSoda() {
  return (
    <>
      <Head>
        <title>{`Baking Soda vs Activated Carbon: The Scientific Truth | ${SITE_NAME}`}</title>
        <meta name="description" content="Stop wasting money on baking soda. Our lab analysis reveals why activated carbon is 10x more effective for cat litter odor control. The results will surprise you." />
        <meta name="keywords" content="activated carbon vs baking soda, cat litter deodorizer comparison, best odor control, charcoal vs baking soda litter" />

        {/* Open Graph */}
        <meta property="og:title" content="Baking Soda vs Activated Carbon: The Scientific Truth" />
        <meta property="og:description" content="Stop wasting money on baking soda. Our lab analysis reveals why activated carbon is 10x more effective for cat litter odor control." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.purrify.ca/blog/activated-carbon-vs-baking-soda-comparison" />
        <meta property="og:image" content={`https://www.purrify.ca${heroImage}`} />

        {/* Canonical */}
        <link rel="canonical" href="https://www.purrify.ca/blog/activated-carbon-vs-baking-soda-comparison" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Activated Carbon vs Baking Soda: The Ultimate Odor Control Showdown",
            "image": [`https://www.purrify.ca${heroImage}`],
            "datePublished": "2024-01-15",
            "dateModified": new Date().toISOString().split('T')[0],
            "author": { "@type": "Organization", "name": "Purrify" },
            "publisher": { "@type": "Organization", "name": "Purrify", "logo": { "@type": "ImageObject", "url": "https://www.purrify.ca/optimized/logo-icon-512.webp" } }
          })}
        </script>
      </Head>

      <div className="bg-cream-50 dark:bg-gray-900 min-h-screen">
        <Container>
          <article className="max-w-4xl mx-auto py-12 md:py-20 px-4">

            {/* Header Section */}
            <header className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 dark:bg-forest-900 dark:text-forest-200 text-sm font-medium mb-6">
                <FlaskConical className="w-4 h-4" />
                <span>Science & Technology</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
                Activated Carbon vs. Baking Soda <span className="text-forest-600 dark:text-forest-400 block mt-2 text-3xl md:text-5xl">Which Actually Eliminates Odor?</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                We broke down the molecular science to find out if your grandmother's fridge deodorizer can really handle the litter box.
              </p>
            </header>

            {/* Hero Image */}
            <div className="mb-16 relative group">
              <div className="absolute inset-0 bg-forest-900/10 rounded-3xl transform rotate-1 transition-transform group-hover:rotate-2"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9]">
                <Image
                  src={heroImage}
                  alt="Close up of high quality activated carbon granules"
                  className="w-full h-full object-cover"
                  width={1600}
                  height={900}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1600px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  <p className="text-white/90 dark:text-white/90 text-sm font-medium uppercase tracking-wider">Figure A: The porous structure of activated carbon</p>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-forest-100 dark:border-forest-900/30 mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-forest-50 dark:bg-forest-900/20 rounded-bl-full -mr-8 -mt-8"></div>
              <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-gray-100">
                <Shield className="w-6 h-6 text-forest-500" />
                The 30-Second Verdict
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 dark:bg-green-900/50 p-1 rounded-full text-green-600 dark:text-green-400">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Activated Carbon</strong> completely traps and locks away odors using millions of micropores, performing 10-15x better in heavy-duty scenarios.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-orange-100 dark:bg-orange-900/50 p-1 rounded-full text-orange-600 dark:text-orange-400">
                    <X className="w-4 h-4" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Baking Soda</strong> only neutralizes acidic odors (like urine) but fails to trap organic smells or moisture effectively.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full text-blue-600 dark:text-blue-400">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Winner?</strong> Carbon. It's why gas masks use carbon filters, not baking powder.</p>
                </li>
              </ul>
            </div>

            <div className="prose prose-lg prose-forest max-w-none dark:prose-invert">
              <p className="lead text-2xl font-medium text-gray-800 dark:text-gray-200 mb-10">
                Every cat parent has stood in the aisle debating between the $2 box of baking soda and the specialized carbon deodorizer. Is carbon just marketing hype, or is it actual science?
              </p>

              <div className="grid md:grid-cols-2 gap-12 my-16 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">The Science of Smell</h2>
                  <p>To understand the winner, we have to look at <em>how</em> they fight odor. They work in fundamentally different ways.</p>
                  <div className="space-y-6 mt-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-forest-500 shadow-sm">
                      <h4 className="text-xl font-bold text-forest-700 dark:text-forest-400 m-0 mb-2">Activated Carbon: The Sponge</h4>
                      <p className="m-0 text-sm">Works by <strong>Adsorption</strong>. Think of it as a molecular sponge with millions of tiny pores that physically trap and lock odor molecules inside, preventing them from escaping back into the air.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-orange-400 dark:border-orange-500 shadow-sm">
                      <h4 className="text-xl font-bold text-orange-700 dark:text-orange-400 m-0 mb-2">Baking Soda: The Neutralizer</h4>
                      <p className="m-0 text-sm">Works by <strong>pH Neutralization</strong>. It's a base that reacts with acids (like urine). It creates a chemical reaction to turn the acid into a salt, reducing the smell.</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[3/2] relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700 bg-white dark:bg-gray-800">
                    {/* Using object-fit AND comparison layout styles to fix "wrong size" issue */}
                    <Image
                      src={comparisonImage}
                      alt="Microscopic view of activated carbon pores"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                      <p className="text-white dark:text-white text-xs font-bold uppercase tracking-widest">
                        Magnified: The Carbon "Pore" Network
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-8 text-center">Head-to-Head Comparison</h2>

              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg mb-16">
                <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 font-bold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                  <div>Feature</div>
                  <div className="text-center text-forest-600 dark:text-forest-400">Activated Carbon</div>
                  <div className="text-center text-orange-600 dark:text-orange-400">Baking Soda</div>
                </div>

                {[
                  { name: "Odor Trapping", carbon: "Excellent (Adsorption)", soda: "Poor (Masking Only)" },
                  { name: "Moisture Control", carbon: "High Absorption", soda: "Low Absorption" },
                  { name: "Longevity", carbon: "30+ Days", soda: "5-7 Days" },
                  { name: "Scent", carbon: "Odorless", soda: "Odorless" },
                  { name: "Feces Odor", carbon: "Highly Effective", soda: "Ineffective" },
                  { name: "Urine Odor", carbon: "Effective", soda: "Highly Effective" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 p-4 items-center ${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">{row.name}</div>
                    <div className="text-center text-forest-700 dark:text-forest-300 font-medium text-sm md:text-base">{row.carbon}</div>
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">{row.soda}</div>
                  </div>
                ))}
              </div>

              <div className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center">The Winner</h2>
                <div className="bg-forest-900 dark:bg-forest-950 text-white dark:text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
                  {/* Abstract pattern background */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-yellow-400 dark:bg-yellow-500 text-yellow-900 dark:text-yellow-950 p-3 rounded-full mb-6 shadow-glow animate-pulse">
                      <Timer className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">Activated Carbon</h3>
                    <p className="text-forest-100 dark:text-forest-200 text-xl max-w-2xl mx-auto mb-8">
                      There is simply no contest. While baking soda is a cheap quick-fix for a fresh stain, activated carbon is a long-term air filtration system for your litter box.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 text-left w-full max-w-3xl">
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 dark:border-white/5">
                        <div className="font-bold text-lg mb-1 text-yellow-400 dark:text-yellow-400">10x Surface Area</div>
                        <p className="text-sm text-forest-100 dark:text-forest-200">One gram of carbon has the surface area of a football field.</p>
                      </div>
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 dark:border-white/5">
                        <div className="font-bold text-lg mb-1 text-yellow-400 dark:text-yellow-400">Locks Smells</div>
                        <p className="text-sm text-forest-100 dark:text-forest-200">Doesn't just cover them up; it permanently removes them.</p>
                      </div>
                      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 dark:border-white/5">
                        <div className="font-bold text-lg mb-1 text-yellow-400 dark:text-yellow-400">Non-toxic & Natural</div>
                        <p className="text-sm text-forest-100 dark:text-forest-200">Made from 100% natural activated coconut carbon.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <p>Updated January 2024</p>
              <Link href="/blog" className="mt-4 md:mt-0 px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
                ← Back to All Articles
              </Link>
            </footer>

          </article>

          {/* Related Articles */}
          <div className="py-12 border-t border-gray-100 dark:border-gray-800">
            <RelatedContent currentUrl="/blog/activated-carbon-vs-baking-soda-comparison" />
          </div>
        </Container>
      </div>
    </>
  );
}
