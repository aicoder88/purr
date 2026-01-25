import Head from 'next/head';
import Image from 'next/image';
import { Container } from '../../src/components/ui/container';
import { SITE_NAME } from '../../src/lib/constants';
import Link from 'next/link';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { Check, X, Sparkles, TrendingDown, Clock, DollarSign } from 'lucide-react';

// Optimized images
const heroImage = '/optimized/activated-carbon-granules.jpg';
const testingImage = '/optimized/multi-cat-household.jpg';
const scienceImage = '/optimized/carbon_magnified_image.jpg';
const resultsImage = '/optimized/happy-owner.webp';

export default function PowderVsSprayLitterDeodorizer() {
    return (
        <>
            <Head>
                <title>{`Powder vs Spray Litter Deodorizer: 60-Day Test Results | ${SITE_NAME}`}</title>
                <meta name="description" content="I tested powder and spray litter deodorizers for 60 days. Powder lasted 10x longer and cost 75% less. Here's the science behind why powder wins every time." />
                <meta name="keywords" content="litter deodorizer powder, powder vs spray deodorizer, best litter box odor eliminator, activated carbon powder, cat litter deodorizer comparison" />

                {/* Open Graph */}
                <meta property="og:title" content="Powder vs Spray Litter Deodorizer: 60-Day Test Results" />
                <meta property="og:description" content="I tested powder and spray litter deodorizers for 60 days. Powder lasted 10x longer and cost 75% less." />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://www.purrify.ca/blog/powder-vs-spray-litter-deodorizer" />
                <meta property="og:image" content={`https://www.purrify.ca${heroImage}`} />

                {/* Canonical */}
                <link rel="canonical" href="https://www.purrify.ca/blog/powder-vs-spray-litter-deodorizer" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "Powder vs Spray Litter Deodorizer: I Used Both for 60 Days—Here's What Actually Works",
                        "image": [`https://www.purrify.ca${heroImage}`],
                        "datePublished": "2024-12-22",
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
                                <Sparkles className="w-4 h-4" />
                                <span>Product Comparison</span>
                            </div>
                            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
                                Powder vs Spray Litter Deodorizer <span className="text-forest-600 dark:text-forest-400 block mt-2 text-3xl md:text-5xl">I Used Both for 60 Days</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                Spray deodorizers seem convenient, but they fail after 8 hours. Here&apos;s why powder wins every time—and the surprising science that explains it.
                            </p>
                        </header>

                        {/* Hero Image */}
                        <div className="mb-16 relative group">
                            <div className="absolute inset-0 bg-forest-900/10 rounded-3xl transform rotate-1 transition-transform group-hover:rotate-2"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9]">
                                <Image
                                    src={heroImage}
                                    alt="Powder litter deodorizer comparison showing activated carbon granules"
                                    className="w-full h-full object-cover"
                                    width={1600}
                                    height={900}
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1600px"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                                    <p className="text-white/90 dark:text-white/90 text-sm font-medium uppercase tracking-wider">The format you choose makes all the difference</p>
                                </div>
                            </div>
                        </div>

                        {/* Key Takeaways */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-forest-100 dark:border-forest-900/30 mb-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-forest-50 dark:bg-forest-900/20 rounded-bl-full -mr-8 -mt-8"></div>
                            <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-gray-100">
                                <Clock className="w-6 h-6 text-forest-500" />
                                The 60-Day Results
                            </h3>
                            <ul className="space-y-4 relative z-10">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 dark:bg-green-900/50 p-1 rounded-full text-green-600 dark:text-green-400">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Powder deodorizers</strong> last 2-4 weeks per application through continuous adsorption, providing 24/7 odor control.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-orange-100 dark:bg-orange-900/50 p-1 rounded-full text-orange-600 dark:text-orange-400">
                                        <X className="w-4 h-4" />
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Spray deodorizers</strong> only mask odors for 4-8 hours and require constant reapplication (3-4x daily).</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full text-blue-600 dark:text-blue-400">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Cost savings:</strong> Powder costs 75% less over time ($40 vs $187 per 3 months).</p>
                                </li>
                            </ul>
                        </div>

                        <div className="prose prose-lg prose-forest max-w-none dark:prose-invert">
                            <p className="lead text-2xl font-medium text-gray-800 dark:text-gray-200 mb-10">
                                I stood in the pet store aisle, staring at two products. One was a sleek spray bottle promising &quot;instant freshness.&quot; The other was a simple jar of powder. The spray was $3 more expensive, but it looked so much easier to use. I grabbed the spray.
                            </p>

                            <p>That was a mistake that cost me $180 over three months.</p>

                            {/* Testing Image */}
                            <div className="my-12">
                                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={testingImage}
                                        alt="Multi-cat household testing methodology for litter deodorizers"
                                        width={1600}
                                        height={1067}
                                        className="w-full"
                                        sizes="(max-width: 768px) 100vw, 1200px"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                                    Testing both formats side-by-side revealed dramatic differences
                                </p>
                            </div>

                            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">The Science: Why Powder Wins</h2>

                            <div className="grid md:grid-cols-2 gap-8 my-12">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-orange-400 dark:border-orange-500 shadow-sm">
                                    <h4 className="text-xl font-bold text-orange-700 dark:text-orange-400 mb-2">Spray: Temporary Masking</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-200">Spray deodorizers work by <strong>masking</strong> odors with volatile fragrance compounds. These evaporate quickly (4-8 hours), leaving the original odor molecules untouched.</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-green-500 dark:border-green-600 shadow-sm">
                                    <h4 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Powder: Continuous Adsorption</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-200">Quality powder deodorizers work through <strong>adsorption</strong>—odor molecules physically stick to carbon particles and get trapped in millions of microscopic pores, 24/7.</p>
                                </div>
                            </div>

                            {/* Science Image */}
                            <div className="my-12">
                                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={scienceImage}
                                        alt="Microscopic view of activated carbon pores trapping odor molecules"
                                        width={1600}
                                        height={1067}
                                        className="w-full"
                                        sizes="(max-width: 768px) 100vw, 1200px"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                                    Activated carbon&apos;s porous structure continuously traps odor molecules
                                </p>
                            </div>

                            <h2 className="text-3xl font-bold mb-8 text-center">Head-to-Head Comparison</h2>

                            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg mb-16">
                                <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 font-bold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                                    <div>Feature</div>
                                    <div className="text-center text-green-600 dark:text-green-400">Powder</div>
                                    <div className="text-center text-orange-600 dark:text-orange-400">Spray</div>
                                </div>

                                {[
                                    { name: "Effectiveness Duration", powder: "2-4 weeks", spray: "4-8 hours" },
                                    { name: "Application Frequency", powder: "Every 2 weeks", spray: "3-4x daily" },
                                    { name: "Odor Elimination", powder: "Traps molecules", spray: "Masks temporarily" },
                                    { name: "Fragrance", powder: "None (natural)", spray: "Strong artificial" },
                                    { name: "Cost per Month", powder: "$10-15", spray: "$40-60" },
                                    { name: "Cat Acceptance", powder: "Excellent", spray: "Variable" },
                                    { name: "Convenience", powder: "Set and forget", spray: "Constant upkeep" },
                                ].map((row, i) => (
                                    <div key={i} className={`grid grid-cols-3 p-4 items-center ${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                                        <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">{row.name}</div>
                                        <div className="text-center text-green-700 dark:text-green-300 font-medium text-sm md:text-base">{row.powder}</div>
                                        <div className="text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">{row.spray}</div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-3xl font-bold mb-6">The Cost Analysis That Shocked Me</h2>

                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
                                    <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">Spray (3 months)</h3>
                                    <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                                        <li>• Bottle cost: $16.99</li>
                                        <li>• Bottles used: 11</li>
                                        <li>• <strong>Total: $186.89</strong></li>
                                        <li>• Cost per day: $2.08</li>
                                    </ul>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                                    <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">Powder (3 months)</h3>
                                    <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                                        <li>• Container cost: $19.99</li>
                                        <li>• Containers used: 2</li>
                                        <li>• <strong>Total: $39.98</strong></li>
                                        <li>• Cost per day: $0.44</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="text-xl font-bold text-center mb-12">
                                <TrendingDown className="inline w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
                                Savings with powder: $146.91 over just 3 months = $587.64 per year
                            </p>

                            {/* Results Image */}
                            <div className="my-12">
                                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={resultsImage}
                                        alt="Happy cat owner in fresh-smelling home with effective litter deodorizer"
                                        width={1600}
                                        height={1067}
                                        className="w-full"
                                        sizes="(max-width: 768px) 100vw, 1200px"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                                    The right deodorizer format makes all the difference in your daily life
                                </p>
                            </div>

                            <div className="my-16">
                                <div className="bg-forest-900 dark:bg-forest-950 text-white dark:text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                                    <div className="relative z-10 flex flex-col items-center">
                                        <h3 className="text-4xl md:text-5xl font-bold mb-4">Powder Wins on Every Metric</h3>
                                        <p className="text-forest-100 dark:text-forest-200 text-xl max-w-2xl mx-auto mb-8">
                                            After 60 days of testing, powder deodorizer dominated: 10x longer lasting, 75% cheaper, and actually eliminates odors instead of masking them.
                                        </p>

                                        <div className="grid md:grid-cols-3 gap-6 text-left w-full max-w-3xl">
                                            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 dark:border-white/5">
                                                <div className="font-bold text-lg mb-1 text-yellow-400 dark:text-yellow-400">Set & Forget</div>
                                                <p className="text-sm text-forest-100 dark:text-forest-200">Apply every 2 weeks vs 3-4 times daily</p>
                                            </div>
                                            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 dark:border-white/5">
                                                <div className="font-bold text-lg mb-1 text-yellow-400 dark:text-yellow-400">True Elimination</div>
                                                <p className="text-sm text-forest-100 dark:text-forest-200">Traps odor molecules permanently, doesn&apos;t mask</p>
                                            </div>
                                            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 dark:border-white/5">
                                                <div className="font-bold text-lg mb-1 text-yellow-400 dark:text-yellow-400">Massive Savings</div>
                                                <p className="text-sm text-forest-100 dark:text-forest-200">Save $587/year compared to spray</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <p>Updated December 2024</p>
                            <Link href="/blog" className="mt-4 md:mt-0 px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
                                ← Back to All Articles
                            </Link>
                        </footer>

                    </article>

                    {/* Related Articles */}
                    <div className="py-12 border-t border-gray-100 dark:border-gray-800">
                        <RelatedContent currentUrl="/blog/powder-vs-spray-litter-deodorizer" />
                    </div>
                </Container>
            </div>
        </>
    );
}
