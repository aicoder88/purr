import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { HowToSection } from '../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../src/components/seo/RelatedQuestions';

export default function RentersCatOdorSolutionsPage() {
  const { locale } = useTranslation();
  const seoTitle = "Cat Smell in Apartment: How Renters Can Eliminate Odor and Protect Their Deposit";
  const seoDescription = "Worried about cat smell affecting your security deposit or landlord inspection? Learn proven strategies to eliminate cat odor in rental apartments and avoid costly damage.";
  const canonicalUrl = getLocalizedUrl('/blog/renters-cat-odor-solutions', locale);
  const languageAlternates = buildLanguageAlternates('/blog/renters-cat-odor-solutions');

  const heroImage = '/images/solutions/ammonia-science.png';

  // HowTo steps for renters managing cat odor
  const howToSteps = [
    {
      name: 'Protect flooring from day one',
      text: 'Place a waterproof mat under the litter box that extends at least 12 inches beyond the box edges. For extra protection, add a second layer of washable absorbent material on top. This catches tracked litter and any overflow, protecting carpet or hardwood.',
      tip: 'Large silicone baking mats work well and are easy to clean.',
    },
    {
      name: 'Choose the right litter box location',
      text: 'Select a spot with hard flooring if possible (bathroom, laundry area, kitchen corner). Avoid carpeted bedrooms or closets where accidents can soak into carpet padding—the hardest type of damage to remediate.',
      tip: 'Keep the box away from exterior walls shared with neighbors.',
    },
    {
      name: 'Use activated carbon for source control',
      text: 'Sprinkle activated carbon granules on your litter to trap ammonia at the source—before it can permeate walls, carpet, or furniture. This is the most effective preventive measure for renters. Replace weekly.',
      tip: 'Activated carbon costs far less than losing a security deposit.',
    },
    {
      name: 'Maintain rigorous scooping schedule',
      text: 'In apartments, you have less space for odor to disperse. Scoop at least twice daily—morning and evening. Consider scooping after each use if you work from home. Never let waste sit overnight.',
      tip: 'Keep a small scooped-waste container with a lid nearby for convenience.',
    },
    {
      name: 'Control odor spread with air management',
      text: 'Run a small air purifier with HEPA + carbon filter near the litter box. Keep the bathroom door closed if that\'s where the box is. Avoid placing litter boxes near HVAC vents that would spread odor throughout the apartment.',
      tip: 'A bathroom exhaust fan running while you\'re home helps significantly.',
    },
    {
      name: 'Treat any accidents immediately',
      text: 'If your cat has an accident, treat it within hours—not days. Blot (don\'t rub), apply enzymatic cleaner, let it work for 15+ minutes, then blot dry. For carpet, you may need to treat the padding below. Document the incident with photos.',
      tip: 'Keep enzymatic cleaner and paper towels readily accessible at all times.',
    },
    {
      name: 'Do monthly damage assessments',
      text: 'Walk through your apartment monthly with a UV blacklight to detect any hidden accidents. Check carpet edges, behind furniture, and near windows. Address any new spots immediately. Keep a log of your maintenance activities.',
      tip: 'Take dated photos showing the cleanliness of litter box areas.',
    },
    {
      name: 'Prepare for move-out',
      text: 'Two weeks before inspection: deep clean all fabric surfaces, steam clean carpets if permitted, wash walls and baseboards, replace any damaged outlet covers or trim. Use an ozone generator (carefully, per instructions) if needed for persistent odors.',
      tip: 'Consider professional carpet cleaning—it\'s cheaper than deposit deductions.',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: 'Can my landlord charge me for cat odor removal?',
      answer: 'Yes. Landlords can deduct reasonable cleaning costs from your security deposit if cat odor or damage exists at move-out. This can include professional carpet cleaning, ozone treatment, enzyme treatments, and in severe cases, carpet or padding replacement. Prevention through proper odor management is far cheaper than remediation.',
    },
    {
      question: 'How do I hide cat smell during a landlord inspection?',
      answer: 'Rather than hiding odor temporarily (which landlords often recognize), focus on genuine elimination. Use activated carbon continuously, scoop immediately before inspections, run air purification, and ensure no accidents have occurred. A well-maintained litter situation has minimal detectable odor.',
    },
    {
      question: 'Will my neighbors complain about cat smell?',
      answer: 'If you can smell your litter box from the hallway, neighbors might too—especially in buildings with shared HVAC or thin walls. Keep litter boxes away from entry doors and shared walls. Use activated carbon and maintain twice-daily scooping. Air purifiers near the litter box help contain odor to your unit.',
    },
    {
      question: 'Can cat urine smell come through walls?',
      answer: 'Ammonia gas can permeate drywall over time, especially in humid conditions. While occasional normal use won\'t cause this, severe accidents or chronically neglected litter boxes can allow ammonia to reach wall cavities. Prevention is critical—once ammonia is in drywall, removal becomes expensive.',
    },
    {
      question: 'What if my cat already damaged the carpet?',
      answer: 'Act immediately: treat with enzymatic cleaner (multiple applications may be needed), let dry completely, then assess. For urine that soaked through to padding, you may need to treat the subfloor. Document everything. If damage is significant, consider disclosing to your landlord early—proactive communication often leads to better outcomes than surprise discoveries.',
    },
    {
      question: 'Can I use an ozone generator to remove cat smell?',
      answer: 'Ozone generators can eliminate stubborn odors, but use carefully: remove all people and pets during treatment, follow manufacturer timing guidelines (usually 2-4 hours), ventilate thoroughly after. Ozone damages rubber and some plastics, so cover sensitive items. It\'s effective for move-out situations but shouldn\'t be your regular solution.',
    },
  ];

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: `https://www.purrify.ca${heroImage}`,
              width: 1200,
              height: 675,
              alt: 'Cat odor solutions for apartment renters',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat smell apartment renting, cat odor rental security deposit, apartment cat litter smell, landlord cat inspection, protect deposit cat',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/blog/renters-cat-odor-solutions"
        options={{
          category: 'Cat Care',
          keywords: ['apartment', 'renting', 'cat odor', 'security deposit', 'landlord'],
          datePublished: '2024-01-22T12:00:00Z',
          dateModified: new Date().toISOString(),
          image: heroImage,
          wordCount: 2300,
          readingTime: 10
        }}
      />

      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                Renter&apos;s Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Cat Smell in Your Apartment?
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                Protect your security deposit, pass landlord inspections, and keep neighbors happy.
                Here&apos;s the renter&apos;s complete guide to managing cat odor in an apartment.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Cat odor control strategies for apartment renters"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* The Stakes */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-r-xl">
              <h2 className="text-xl font-heading font-bold text-blue-800 dark:text-blue-200 mb-3">
                What&apos;s at Stake
              </h2>
              <p className="text-blue-700 dark:text-blue-300">
                The average security deposit is one month&apos;s rent—$1,500 or more in many cities.
                Professional cat odor removal (carpet cleaning, enzyme treatments, ozone) can cost
                $300-800. Carpet replacement if damage is severe? $1,000+. The good news: proper
                odor management costs under $20/month and protects your entire deposit.
              </p>
            </div>
          </div>
        </section>

        {/* Why Apartments Are Harder */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Why Cat Odor Is Harder to Manage in Apartments
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Apartment living creates unique challenges for cat odor control. Understanding these
              helps you implement more effective solutions:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Less Space for Odor to Disperse
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  A 700 sq ft apartment concentrates odor that would dissipate in a 2,000 sq ft house.
                  What might be unnoticeable in a large home becomes immediately apparent in a small space.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Shared Walls and HVAC
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Odors can travel through shared walls, especially in older buildings. Central HVAC
                  systems may circulate air between units. What happens in your apartment doesn&apos;t
                  always stay in your apartment.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Limited Litter Box Placement Options
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Small apartments often force litter boxes into bedrooms, closets, or main living areas.
                  Unlike houses where you can use a basement or garage, apartments require more creative
                  placement and better odor control.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Carpet Everywhere
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Many apartments have wall-to-wall carpet—the most vulnerable surface for cat urine.
                  Unlike hardwood that can be cleaned, carpet and padding absorb urine deeply, making
                  accidents expensive to remediate.
                </p>
              </div>
            </div>

            <AIQuotableBlock
              fact="Studies show that ammonia concentrations in small, enclosed spaces can be 2-3x higher than in larger, well-ventilated rooms. A litter box in a 50 sq ft bathroom may produce ammonia levels 3x higher than the same box in a 200 sq ft laundry room."
              explanation="This is why apartment dwellers need more aggressive odor control strategies than homeowners."
              icon="stat"
              variant="highlight"
            />
          </div>
        </section>

        {/* The Cost of Getting It Wrong */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              The Real Cost of Cat Odor Damage
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Here&apos;s what landlords typically charge for cat-related damage—all of which can be
              deducted from your security deposit:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Issue</th>
                    <th className="px-4 py-3 text-right text-gray-900 dark:text-gray-100">Typical Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Professional carpet cleaning (whole unit)</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$150-300</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Enzyme treatment for urine spots</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$50-150 per area</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Carpet padding replacement (per room)</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$200-400</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Full carpet replacement (per room)</td>
                    <td className="px-4 py-3 text-right text-yellow-600 dark:text-yellow-400 font-bold">$500-1,200</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Ozone treatment for odor</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$100-300</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Repainting walls (pet odor in drywall)</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$200-500</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Subfloor treatment/sealing</td>
                    <td className="px-4 py-3 text-right text-red-600 dark:text-red-400 font-bold">$500-1,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6">
              <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">
                Compare to Prevention Costs
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">$15-20/mo</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quality litter + activated carbon</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">$30</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Waterproof mat under litter box</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">$20</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Enzymatic cleaner for accidents</p>
                </div>
              </div>
              <p className="text-green-700 dark:text-green-300 text-center mt-4 font-medium">
                Total prevention cost: ~$250/year vs. potential damage costs of $500-2,000+
              </p>
            </div>
          </div>
        </section>

        {/* Step by Step Guide */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              The Renter&apos;s Guide to Cat Odor Control
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              Follow this comprehensive approach to protect your deposit and maintain a fresh-smelling
              apartment. Start from day one—prevention is much easier than remediation.
            </p>

            <HowToSection
              title="Manage Cat Odor as a Renter"
              description="A complete guide to controlling cat smell in rental apartments"
              steps={howToSteps}
              totalTime="2 hours initial setup + 15 minutes daily maintenance"
            />
          </div>
        </section>

        {/* Landlord Inspection Tips */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Preparing for Landlord Inspections
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Whether it&apos;s a routine inspection or move-out walkthrough, here&apos;s how to ensure
              your apartment presents well:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4">
                  24 Hours Before
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">✓</span>
                    <span>Complete litter change with fresh activated carbon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">✓</span>
                    <span>Vacuum all surfaces, including furniture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">✓</span>
                    <span>Run air purifier on high in litter box area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">✓</span>
                    <span>Check for and treat any hidden accidents with UV light</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4">
                  Morning of Inspection
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">✓</span>
                    <span>Scoop litter box immediately before inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">✓</span>
                    <span>Open windows briefly to circulate fresh air</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">✓</span>
                    <span>Ensure litter area is clean and organized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400">✓</span>
                    <span>Have cat in carrier or separate room if possible</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-6">
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-3">
                Avoid These Common Mistakes
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✗</span>
                  <span><strong>Don&apos;t use heavy air fresheners</strong> — Landlords recognize this as an attempt to mask odors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✗</span>
                  <span><strong>Don&apos;t hide the litter box</strong> — It looks suspicious; a clean, well-maintained setup looks responsible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✗</span>
                  <span><strong>Don&apos;t wait until move-out</strong> — Accumulated damage is harder to address than prevented damage</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Best Practices for Small Spaces */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Best Litter Box Locations for Apartments
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="flex-shrink-0 text-2xl">✓</div>
                <div>
                  <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">
                    Bathroom (Best Option)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Hard flooring, built-in ventilation (exhaust fan), door for containment, easy to clean.
                    Run the exhaust fan when possible to remove ammonia continuously.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <div className="flex-shrink-0 text-2xl">✓</div>
                <div>
                  <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">
                    Laundry Area / Utility Closet
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Often has hard flooring and is separate from main living areas. Ensure adequate
                    ventilation—leave door slightly open or add vent slots. Good for odor containment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                <div className="flex-shrink-0 text-2xl">~</div>
                <div>
                  <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                    Kitchen Corner (Acceptable)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Hard flooring is good, but proximity to food prep area isn&apos;t ideal. Place as far
                    from cooking areas as possible. Use a covered litter box and activated carbon.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <div className="flex-shrink-0 text-2xl">✗</div>
                <div>
                  <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">
                    Carpeted Bedroom / Closet (Avoid)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Carpet is vulnerable to accidents, closets lack ventilation and concentrate odors,
                    and any damage affects where you sleep. If unavoidable, use maximum protection
                    (waterproof mat, activated carbon, frequent scooping).
                  </p>
                </div>
              </div>
            </div>

            <AIQuotableBlock
              fact="Cat urine can soak through carpet into the padding within 12 hours. The padding absorbs 3-5x more urine than the carpet surface. Once in the padding, the odor is extremely difficult to remove without professional treatment or replacement."
              explanation="This is why floor protection and immediate accident treatment are so critical for renters with carpet."
              icon="science"
              variant="default"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <RelatedQuestions
              title="Renter&apos;s Cat Odor FAQ"
              questions={faqQuestions}
              defaultOpen={[0]}
            />
          </div>
        </section>

        {/* Documentation Tips */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Protect Yourself: Document Everything
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              In case of deposit disputes, documentation is your best defense:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">At Move-In</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li>• Photograph all flooring (especially carpet) with timestamps</li>
                  <li>• Note any existing stains or odors in writing</li>
                  <li>• Get landlord sign-off on move-in condition report</li>
                  <li>• Keep a copy of your lease&apos;s pet policy</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">During Tenancy</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li>• Keep receipts for odor control products</li>
                  <li>• Log any accidents and treatment done</li>
                  <li>• Take periodic photos of well-maintained litter area</li>
                  <li>• Save records of any professional cleaning</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">At Move-Out</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li>• Photograph entire apartment after cleaning</li>
                  <li>• Get professional carpet cleaning receipt</li>
                  <li>• Request walkthrough with landlord present</li>
                  <li>• Document any deductions in writing</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Know Your Rights</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li>• Normal wear and tear is not chargeable</li>
                  <li>• Landlords must provide itemized deductions</li>
                  <li>• Many areas have deposit return deadlines</li>
                  <li>• Consult local tenant rights organizations if disputed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                Protect Your Deposit Starting Today
              </h2>
              <p className="text-xl mb-6 opacity-90 text-center max-w-2xl mx-auto">
                Purrify&apos;s activated carbon traps ammonia at the source—before it can damage carpet,
                permeate walls, or raise red flags during inspections. Less than $20/month to protect
                a $1,500+ deposit.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg text-center"
                >
                  Start Protecting Your Deposit
                </Link>
                <Link
                  href="/learn/solutions/apartment-cat-smell-solution"
                  className="inline-block border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:bg-white/10 dark:hover:bg-gray-100/10 hover:scale-105 transition-all duration-300 text-center"
                >
                  More Apartment Tips
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/learn/solutions/apartment-cat-smell-solution" className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Apartment Odor Solutions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Small space strategies</p>
              </Link>
              <Link href="/blog/cat-litter-smell-wont-go-away" className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Smell Won&apos;t Go Away?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Troubleshooting persistent odor</p>
              </Link>
              <Link href="/blog/why-house-smells-like-cat" className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Whole-House Cat Smell</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Finding hidden sources</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
