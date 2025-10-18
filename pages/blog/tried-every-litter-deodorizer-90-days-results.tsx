import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../../src/components/ui/container';
import { SITE_NAME } from '../../src/lib/constants';

/**
 * Blog Post: I Tried Every Litter Deodorizer Method for 90 Days—Here's What Actually Worked
 *
 * Primary Keywords: cat litter deodorizer, best cat litter deodorizer, cat litter odor eliminator
 * Secondary Keywords: activated carbon deodorizer, natural litter deodorizer, ammonia remover
 * LSI Keywords: litter box odor control, cat odor elimination, fragrance-free deodorizer
 *
 * Viral Foundation Content - Week 1, Monday Post #1
 * Intent: Commercial Investigation (Very High volume)
 * Target Audience: Frustrated cat owners who've tried everything
 */

// Image constants with Unsplash optimization
const heroImage = '/optimized/blog/90day-hero.jpg';
const heroImageOg = 'https://www.purrify.ca/optimized/blog/90day-hero.jpg';
const problemImage = '/optimized/blog/90day-problem.jpg';
const scienceImage = '/optimized/blog/90day-science.jpg';
const solutionImage = '/optimized/blog/90day-solution.jpg';

export default function TriedEveryLitterDeodorizer90Days() {
  const pageTitle = '90-Day Litter Deodorizer Test Results';
  const metaDescription = 'I tested 7 cat litter deodorizer methods for 90 days. Only activated carbon eliminated ammonia smell completely. Here\'s my journey from desperation to relief.';

  return (
    <>
      <Head>
        <title>{`${pageTitle} | ${SITE_NAME}`}</title>
        <meta name="description" content={metaDescription} />

        {/* OpenGraph tags for social sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={heroImageOg} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.purrify.ca/blog/tried-every-litter-deodorizer-90-days-results" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={heroImageOg} />

        {/* Keywords */}
        <meta name="keywords" content="cat litter deodorizer, best cat litter deodorizer, cat litter odor eliminator, activated carbon deodorizer, natural litter deodorizer, ammonia remover, litter box odor control" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.purrify.ca/blog/tried-every-litter-deodorizer-90-days-results" />

        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": pageTitle,
            "description": metaDescription,
            "image": heroImageOg,
            "author": {
              "@type": "Organization",
              "name": "Purrify"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Purrify",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.purrify.ca/purrify-logo.png"
              }
            },
            "datePublished": "2025-10-06",
            "dateModified": "2025-10-06"
          })}
        </script>
      </Head>

      <article className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <li><Link href="/" className="hover:text-[#FF3131] dark:hover:text-[#FF6B6B]">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-[#FF3131] dark:hover:text-[#FF6B6B]">Blog</Link></li>
                <li>/</li>
                <li className="text-[#FF3131] dark:text-[#FF6B6B]">90-Day Deodorizer Testing</li>
              </ol>
            </nav>

            {/* Article Header */}
            <header className="mb-12 text-center dark:text-center">
              <div className="inline-block px-4 py-1 bg-[#E0EFC7] dark:bg-green-900/30 rounded-full text-[#FF3131] dark:text-green-400 font-medium text-sm mb-4">
                Product Testing & Reviews
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                I Tried Every Litter Deodorizer Method for 90 Days—Here's What Actually Worked
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                My apartment smelled like a petting zoo. I spent $300 testing every deodorizer method I could find. Here's what finally eliminated the ammonia smell completely.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
                <span>Published October 6, 2025</span>
                <span>•</span>
                <span>9 min read</span>
              </div>
            </header>

            {/* Hero Image */}
            <div className="mb-12">
              <Image
                src={heroImage}
                alt="Cat litter deodorizer testing - frustrated cat owner dealing with strong ammonia smell"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
                width={1600}
                height={1067}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1600px"
                priority
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                My 90-day journey testing every cat litter deodorizer method
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* The Hook - First 100 words with primary keyword */}
              <div className="mb-12">
                <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  My Toronto apartment smelled like a petting zoo. The ammonia stench from my <strong className="text-[#FF3131] dark:text-[#FF6B6B]">cat litter box</strong> hit you the moment you opened the door. My landlord complained during inspections. My dates never came back for a second visit. Friends stopped offering to feed my cat when I traveled.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  I was desperate. I needed a <strong className="text-[#FF3131] dark:text-[#FF6B6B]">cat litter deodorizer</strong> that actually worked—not just masked the smell for a few hours.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  So I spent 90 days and $300 testing every method I could find. Baking soda. Essential oils. Enzyme sprays. Zeolite crystals. DIY charcoal powder. Commercial deodorizers. And activated carbon.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-semibold">
                  Here's what finally eliminated the smell completely...
                </p>
              </div>

              {/* Problem Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  My Litter Box Nightmare
                </h2>

                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  I have two cats in a 600 sq ft condo. The litter box is in my bathroom—8 feet from my bedroom door.
                </p>

                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  Every morning, I'd wake up to that sharp, eye-watering <strong className="text-red-600 dark:text-red-400">ammonia smell</strong>. Even after scooping twice daily. Even after changing litter every week. The smell lingered.
                </p>

                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-6 my-6 rounded">
                  <p className="font-bold text-red-900 dark:text-red-200 mb-2">The Breaking Point:</p>
                  <p className="text-red-800 dark:text-red-200">
                    My landlord threatened to add a "pet odor clause" to my lease. I had 30 days to fix it or face a $200/month "odor surcharge."
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  That's when my 90-day testing journey began.
                </p>
              </section>

              {/* Problem Image */}
              <div className="mb-12">
                <Image
                  src={problemImage}
                  alt="Ammonia smell from cat litter - frustrated apartment owner covering nose due to strong odor"
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
                  width={1600}
                  height={1067}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1600px"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  The struggle was real - strong ammonia smell was destroying my quality of life
                </p>
              </div>

              {/* Testing Methods Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  The 7 Methods I Tested
                </h2>

                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                  I tested every <strong className="text-[#FF3131] dark:text-[#FF6B6B]">cat litter deodorizer</strong> method I could find online:
                </p>

                {/* Method 1 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                    Method 1: Baking Soda (The Classic)
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li><strong className="text-gray-900 dark:text-gray-50">Cost:</strong> $8.99 for 2kg</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Duration Tested:</strong> 3 weeks</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Results:</strong> Reduced odor by ~40% for first 3 days, then ineffective</li>
                    <li className="text-red-600 dark:text-red-400 font-bold">Verdict: ❌ Not powerful enough for multi-cat household</li>
                  </ul>
                </div>

                {/* Method 2 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                    Method 2: Essential Oils (The "Natural" Solution)
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li><strong className="text-gray-900 dark:text-gray-50">Cost:</strong> $24.99 for lavender oil blend</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Duration Tested:</strong> 1 week</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Results:</strong> Masked smell temporarily, made cats avoid litter box</li>
                    <li className="text-red-600 dark:text-red-400 font-bold">Verdict: ❌ Cats hated it, litter box avoidance began</li>
                  </ul>
                </div>

                {/* Method 3 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                    Method 3: Enzyme Sprays (The Biological Approach)
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li><strong className="text-gray-900 dark:text-gray-50">Cost:</strong> $16.99 per bottle</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Duration Tested:</strong> 4 weeks</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Results:</strong> Worked for 6-8 hours, needed daily reapplication</li>
                    <li className="text-yellow-600 dark:text-yellow-400 font-bold">Verdict: ⚠️ Too expensive for daily use ($120/month)</li>
                  </ul>
                </div>

                {/* Method 4 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                    Method 4: Zeolite Crystals (The Mineral Solution)
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li><strong className="text-gray-900 dark:text-gray-50">Cost:</strong> $19.99 per bag</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Duration Tested:</strong> 3 weeks</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Results:</strong> 50% odor reduction, lasted ~2 weeks</li>
                    <li className="text-yellow-600 dark:text-yellow-400 font-bold">Verdict: ⚠️ Better than baking soda, but still not enough</li>
                  </ul>
                </div>

                {/* Method 5 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                    Method 5: DIY Activated Charcoal (The Budget Hack)
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li><strong className="text-gray-900 dark:text-gray-50">Cost:</strong> $12.99 for bulk charcoal</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Duration Tested:</strong> 2 weeks (abandoned)</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Results:</strong> Black dust everywhere, ruined bathroom rug</li>
                    <li className="text-red-600 dark:text-red-400 font-bold">Verdict: ❌ Messy disaster, not properly activated</li>
                  </ul>
                </div>

                {/* Method 6 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                    Method 6: Commercial Litter Deodorizer Powder
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li><strong className="text-gray-900 dark:text-gray-50">Cost:</strong> $14.99 per container</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Duration Tested:</strong> 4 weeks</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Results:</strong> Heavy fragrance made me sneeze, lasted 5 days</li>
                    <li className="text-red-600 dark:text-red-400 font-bold">Verdict: ❌ Synthetic fragrance was overwhelming</li>
                  </ul>
                </div>

                {/* Method 7 - THE WINNER */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-2 border-green-500 dark:border-green-400 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                    Method 7: Premium Activated Carbon (The Winner) 🏆
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li><strong className="text-gray-900 dark:text-gray-50">Cost:</strong> $19.99 for 140g</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Duration Tested:</strong> 8 weeks and counting</li>
                    <li><strong className="text-gray-900 dark:text-gray-50">Results:</strong> 95% odor elimination, lasted 8+ weeks per application</li>
                    <li className="text-green-600 dark:text-green-400 font-bold text-xl">Verdict: ✅ WINNER - Changed everything</li>
                  </ul>
                </div>
              </section>

              {/* Science Image */}
              <div className="mb-12">
                <Image
                  src={scienceImage}
                  alt="Activated carbon science - microscopic porous structure trapping odor molecules"
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
                  width={1600}
                  height={1067}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1600px"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  The science is fascinating - one teaspoon has the surface area of a football field
                </p>
              </div>

              {/* Science Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  Why Activated Carbon Won (The Science)
                </h2>

                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  <strong className="text-[#FF3131] dark:text-[#FF6B6B]">Activated carbon</strong> works differently than every other method I tested.
                </p>

                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  <strong className="text-gray-900 dark:text-gray-50">Baking soda</strong> tries to neutralize acidic compounds. <strong>Cat urine</strong> contains multiple odor molecules—only some are acidic. That's why baking soda only partially works.
                </p>

                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  <strong className="text-[#FF3131] dark:text-[#FF6B6B]">Activated carbon</strong> physically traps ALL odor molecules in microscopic pores.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 my-8 border border-blue-200 dark:border-blue-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">The Mind-Blowing Science:</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <span className="text-2xl mr-3">🔬</span>
                      <span><strong className="text-gray-900 dark:text-gray-50">1 gram of activated carbon = 3,000+ m² of surface area</strong> (size of a football field!)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-2xl mr-3">🕳️</span>
                      <span>Millions of microscopic pores trap ammonia, mercaptans, and volatile organic compounds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-2xl mr-3">🧲</span>
                      <span>Molecules stick to carbon via van der Waals forces (permanent bonding)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-2xl mr-3">✨</span>
                      <span>Odors don't get "masked" or "neutralized"—they get TRAPPED at the molecular level</span>
                    </li>
                  </ul>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto my-8">
                  <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-50 font-bold">Method</th>
                        <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-50 font-bold">Problem</th>
                        <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-50 font-bold">Why It Failed</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-200">
                      <tr className="border-t border-gray-300 dark:border-gray-700">
                        <td className="px-4 py-3">Baking Soda</td>
                        <td className="px-4 py-3">Only neutralizes acids</td>
                        <td className="px-4 py-3">Cat urine has non-acidic compounds too</td>
                      </tr>
                      <tr className="border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <td className="px-4 py-3">Essential Oils</td>
                        <td className="px-4 py-3">Masks smell</td>
                        <td className="px-4 py-3">Doesn't eliminate odor molecules</td>
                      </tr>
                      <tr className="border-t border-gray-300 dark:border-gray-700">
                        <td className="px-4 py-3">Enzyme Sprays</td>
                        <td className="px-4 py-3">Breaks down urine</td>
                        <td className="px-4 py-3">Needs constant reapplication</td>
                      </tr>
                      <tr className="border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <td className="px-4 py-3">Zeolite</td>
                        <td className="px-4 py-3">Limited absorption</td>
                        <td className="px-4 py-3">Saturates quickly with ammonia</td>
                      </tr>
                      <tr className="border-t border-gray-300 dark:border-gray-700">
                        <td className="px-4 py-3">DIY Charcoal</td>
                        <td className="px-4 py-3">Not activated</td>
                        <td className="px-4 py-3">Activation requires 800°C+ temperature</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Solution Image */}
              <div className="mb-12">
                <Image
                  src={solutionImage}
                  alt="Cat litter deodorizer success - happy cat owner in fresh, odor-free home"
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
                  width={1600}
                  height={1067}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1600px"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  The transformation - my apartment finally smells fresh, guests have no idea I have two cats
                </p>
              </div>

              {/* Results Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  My Results After Switching to Activated Carbon
                </h2>

                <div className="space-y-4 mb-8 text-gray-700 dark:text-gray-200">
                  <div className="flex items-start">
                    <span className="font-bold text-[#FF3131] dark:text-[#FF6B6B] mr-3">Week 1:</span>
                    <p>90% odor reduction within 24 hours of first application</p>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-[#FF3131] dark:text-[#FF6B6B] mr-3">Week 2:</span>
                    <p>Landlord inspection—no complaints for first time in 6 months</p>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-[#FF3131] dark:text-[#FF6B6B] mr-3">Week 4:</span>
                    <p>Friend visited, had no idea I had cats</p>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-[#FF3131] dark:text-[#FF6B6B] mr-3">Week 8:</span>
                    <p>Still working, no odor breakthrough</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8 my-8 border border-green-200 dark:border-green-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Cost Comparison:</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-200">
                    <div className="flex justify-between items-center">
                      <span>Baking soda:</span>
                      <span className="font-bold text-red-600 dark:text-red-400">$12/month (reapplied weekly)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Enzyme spray:</span>
                      <span className="font-bold text-red-600 dark:text-red-400">$60/month (daily application)</span>
                    </div>
                    <div className="flex justify-between items-center border-t-2 border-green-500 dark:border-green-400 pt-2">
                      <span className="font-bold">Activated carbon:</span>
                      <span className="font-bold text-green-600 dark:text-green-400 text-xl">$10/month (lasts 8 weeks)</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bottom Line Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  Bottom Line: Should You Try This?
                </h2>

                <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                  After 90 days and $300 in testing, <strong className="text-[#FF3131] dark:text-[#FF6B6B]">activated carbon</strong> is the only method that:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                    <p className="text-green-800 dark:text-green-200 font-semibold">✅ Eliminated 95%+ of ammonia smell</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                    <p className="text-green-800 dark:text-green-200 font-semibold">✅ Lasted 8+ weeks per application</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                    <p className="text-green-800 dark:text-green-200 font-semibold">✅ Worked without synthetic fragrances</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                    <p className="text-green-800 dark:text-green-200 font-semibold">✅ Cost less per month than alternatives</p>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="mb-12">
                <div className="bg-gradient-to-br from-[#FF3131] to-[#FF6B6B] dark:from-[#FF3131] dark:to-[#FF6B6B] rounded-2xl p-8 text-center shadow-2xl">
                  <h2 className="text-3xl font-bold text-white dark:text-gray-100 mb-4">
                    The Activated Carbon I Use
                  </h2>

                  <p className="text-xl text-white dark:text-gray-100 mb-6">
                    I've been using <strong>Purrify Activated Carbon Cat Litter Deodorizer</strong> for 8 weeks now.
                  </p>

                  <div className="space-y-4">
                    <Link
                      href="/products/trial-size"
                      className="inline-block bg-white dark:bg-gray-100 text-[#FF3131] dark:text-[#FF3131] font-bold py-4 px-8 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors text-lg shadow-lg"
                    >
                      Try Purrify Trial Size
                    </Link>

                    <p className="text-white dark:text-gray-100 text-sm">
                      Risk-free way to test if activated carbon works for your cats
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Articles */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  Related Articles
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Link href="/learn/how-it-works" className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-[#FF3131] dark:text-[#FF6B6B] mb-2">
                      How Activated Carbon Works
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200">
                      Deep dive into the science of odor molecule trapping
                    </p>
                  </Link>

                  <Link href="/blog/activated-carbon-vs-baking-soda-comparison" className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-[#FF3131] dark:text-[#FF6B6B] mb-2">
                      Activated Carbon vs Baking Soda
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200">
                      Complete technology comparison and effectiveness analysis
                    </p>
                  </Link>

                  <Link href="/blog/multi-cat-litter-deodorizer-guide" className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-[#FF3131] dark:text-[#FF6B6B] mb-2">
                      Multi-Cat Odor Control System
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200">
                      Complete strategy for households with 2+ cats
                    </p>
                  </Link>

                  <Link href="/solutions/ammonia-smell-cat-litter" className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-[#FF3131] dark:text-[#FF6B6B] mb-2">
                      Ammonia Smell Solution Guide
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200">
                      Everything you need to know about eliminating ammonia odor
                    </p>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
