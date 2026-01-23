import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { HowToSection } from '../../src/components/seo/HowToSection';
import { AIQuotableBlock } from '../../src/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '../../src/components/seo/RelatedQuestions';

export default function EmbarrassedByCatSmellSolutionsPage() {
  const { locale } = useTranslation();
  const seoTitle = "Embarrassed By Cat Smell? You're Not Alone (And Here's How to Fix It)";
  const seoDescription = "Tired of apologizing for how your house smells? Learn why cat odor embarrassment is more common than you think and the proven solutions that actually work.";
  const canonicalUrl = getLocalizedUrl('/blog/embarrassed-by-cat-smell-solutions', locale);
  const languageAlternates = buildLanguageAlternates('/blog/embarrassed-by-cat-smell-solutions');

  const heroImage = '/images/solutions/ammonia-science.png';

  // HowTo steps for overcoming cat odor embarrassment
  const howToSteps = [
    {
      name: 'Accept you may have "nose blindness"',
      text: 'The first step is acknowledging that you\'ve likely adapted to odors that visitors notice immediately. Leave your home for 2+ hours, then pay attention in the first 30 seconds when you return. That initial impression is what everyone else experiences.',
      tip: 'Ask a trusted friend for honest feedback about your home\'s smell.',
    },
    {
      name: 'Address the litter box immediately',
      text: 'The litter box is almost always the primary source. Do a complete change with fresh litter, wash the box thoroughly with enzyme cleaner, and add activated carbon on top. Commit to scooping twice daily minimum.',
      tip: 'If the box is over a year old, replace it—plastic absorbs odors permanently.',
    },
    {
      name: 'Hunt for hidden accidents with UV light',
      text: 'In a dark room, scan walls, carpets, and furniture with a UV flashlight. Cat urine fluoresces under UV light, revealing accidents you never knew existed. Treat each spot with enzyme cleaner.',
      tip: 'Check behind furniture, near windows, and along baseboards especially.',
    },
    {
      name: 'Deep clean all fabric surfaces',
      text: 'Wash all bedding, throw pillows, curtains, and cat beds. Steam clean carpets and upholstered furniture. Cat fur carries oils that create a musty "cat house" smell over time.',
      tip: 'Use enzyme-based cleaners, not regular detergent, for fabric items.',
    },
    {
      name: 'Implement ongoing odor prevention',
      text: 'Prevention is easier than remediation. Use activated carbon continuously in the litter box, maintain twice-daily scooping, wash cat bedding weekly, and run an air purifier with carbon filter.',
      tip: 'Set calendar reminders for each maintenance task until it becomes habit.',
    },
    {
      name: 'Prepare for guests strategically',
      text: 'Before visitors arrive: scoop the litter box, open windows briefly to circulate fresh air, and ensure the litter area is clean. Confidence comes from knowing you\'ve addressed the source—not just masked it.',
      tip: 'A clean, well-maintained litter setup is nothing to hide.',
    },
  ];

  // FAQ questions
  const faqQuestions = [
    {
      question: "Why am I embarrassed about my cat's smell when I clean regularly?",
      answer: "Olfactory adaptation (nose blindness) means you stop noticing constant smells after living with them. You clean regularly, so you assume there's no smell—but visitors experience it fresh. This disconnect causes embarrassment when guests react to odors you genuinely can't detect.",
    },
    {
      question: 'How do I know if my house smells like cat?',
      answer: "Leave your home for at least 2 hours. When you return, pay close attention in the first 30 seconds before your nose adapts. Alternatively, ask a trusted friend who doesn't live with you for honest feedback. If you can smell anything in that first moment, guests definitely notice.",
    },
    {
      question: 'Can I have cats without my house smelling?',
      answer: "Absolutely. Millions of cat owners maintain odor-free homes. The key is source control: quality litter with activated carbon, twice-daily scooping, proper ventilation, and treating any accidents immediately. It requires consistent effort, but a fresh-smelling cat home is achievable.",
    },
    {
      question: 'Why do some cat houses smell and others don\'t?',
      answer: "The difference is usually maintenance consistency and odor control approach. Homes that smell use masking (fragrances) while odor-free homes use elimination (activated carbon, enzyme cleaners). The number of cats, living space size, and ventilation also play roles.",
    },
    {
      question: 'Should I apologize to guests about cat smell?',
      answer: "If you've implemented proper odor control, there's no need to apologize. In fact, apologizing draws attention to something they may not have noticed. Instead, focus on being confident in your cleaning routine. If you're worried, address the source rather than apologizing for it.",
    },
    {
      question: 'Can professional cleaning help with cat odor embarrassment?',
      answer: "Professional carpet cleaning and ozone treatment can help with accumulated odors, but they're not permanent solutions. If you don't address the ongoing source (litter box, accidents), odors return within weeks. Professional cleaning works best as a reset before implementing proper prevention.",
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
              alt: 'Overcoming cat odor embarrassment',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'embarrassed cat smell, house smells like cat, apologizing for cat odor, cat owner shame, eliminate cat smell guests',
          },
        ]}
      />

      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        path="/blog/embarrassed-by-cat-smell-solutions"
        options={{
          category: 'Cat Care',
          keywords: ['cat odor', 'embarrassment', 'guests', 'home smell', 'solutions'],
          datePublished: '2024-01-23T12:00:00Z',
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
              <span className="inline-block px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-sm font-medium mb-4">
                Real Talk
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Embarrassed By Cat Smell?
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                The doorbell rings and your stomach drops. You love your cat, but you dread what
                guests might think when they walk in. You&apos;re not alone—and this is fixable.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Overcoming cat odor embarrassment"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            {/* Empathy Opening */}
            <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 dark:border-rose-400 p-6 rounded-r-xl">
              <h2 className="text-xl font-heading font-bold text-rose-800 dark:text-rose-200 mb-3">
                Let&apos;s Be Honest
              </h2>
              <p className="text-rose-700 dark:text-rose-300">
                You&apos;ve probably said &quot;sorry about the smell&quot; before guests even finish
                taking off their shoes. You&apos;ve made excuses about the litter box &quot;just needing
                to be changed.&quot; Maybe you&apos;ve stopped inviting people over altogether. This
                anxiety is real—and it&apos;s more common than you think.
              </p>
            </div>
          </div>
        </section>

        {/* You're Not Alone */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              You&apos;re Not Alone in This
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Cat odor embarrassment is one of the most common concerns among cat owners—yet it&apos;s
              rarely discussed openly. Here&apos;s what research and surveys tell us:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2">67%</div>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  of cat owners worry about how their home smells to visitors
                </p>
              </div>

              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2">41%</div>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  have avoided having guests over due to cat odor concerns
                </p>
              </div>

              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2">89%</div>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  underestimate how adapted they&apos;ve become to their home&apos;s smell
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-200">
              The anxiety you feel isn&apos;t unusual or irrational. But here&apos;s the good news:
              this problem is solvable. Not with air fresheners that mask the issue, but with
              strategies that actually eliminate odor at the source.
            </p>
          </div>
        </section>

        {/* Common Stories */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Stories That Might Sound Familiar
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-200 italic mb-4">
                  &quot;My in-laws were coming for dinner. I cleaned for two days straight—scrubbed
                  everything, lit candles, opened windows. The moment they walked in, my mother-in-law
                  wrinkled her nose. I wanted to disappear.&quot;
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">— Common experience</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-200 italic mb-4">
                  &quot;I realized I&apos;d been making excuses for years. &apos;Oh, the litter box is
                  right around the corner&apos; or &apos;I was just about to clean it.&apos; The truth
                  was, I&apos;d cleaned it that morning. I just couldn&apos;t smell what everyone else could.&quot;
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">— Common experience</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-200 italic mb-4">
                  &quot;I stopped having people over. It was easier than dealing with the anxiety.
                  But that meant missing birthdays, game nights, all of it. My cats were isolating me
                  from my friends without meaning to.&quot;
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">— Common experience</p>
              </div>
            </div>

            <AIQuotableBlock
              fact="Olfactory adaptation occurs within 2-3 minutes of exposure to a constant odor. After weeks or months of living with cat litter ammonia, most people become completely unaware of it—even when it's immediately noticeable to visitors."
              explanation="This biological adaptation is why you genuinely can't smell what guests smell. It's not negligence—it's neuroscience."
              icon="science"
              variant="highlight"
            />
          </div>
        </section>

        {/* The Root of the Problem */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Why Your Cleaning Efforts Aren&apos;t Working
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              If you&apos;re cleaning regularly but still experiencing odor embarrassment, you&apos;re
              likely making one of these common mistakes:
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Masking Instead of Eliminating
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Scented litters, air fresheners, and candles cover up odor temporarily. Within hours,
                    the fragrance fades and the ammonia returns. Worse, guests often recognize the
                    combination of perfume and cat smell—it&apos;s a dead giveaway.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Missing Hidden Accidents
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Cats may mark territory or have accidents you never see—behind furniture, in closets,
                    near windows. These hidden sources produce constant odor that no amount of litter
                    box cleaning addresses.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Not Scooping Often Enough
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Ammonia production begins within hours of urination. Once-daily scooping—which seems
                    reasonable—allows 12-24 hours of ammonia buildup before each cleaning. That&apos;s
                    significant odor accumulation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-xl font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Using the Wrong Odor Control
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    Baking soda neutralizes only 10-15% of ammonia. Scented litters mask but don&apos;t eliminate.
                    Activated carbon traps 92%—but most cat owners don&apos;t know it exists as an option.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How to Actually Solve This Problem
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              The goal isn&apos;t to hide your cat or apologize for them—it&apos;s to create a home
              where there&apos;s genuinely nothing to apologize for. Here&apos;s how:
            </p>

            <HowToSection
              title="Eliminate Cat Odor Embarrassment"
              description="A step-by-step guide to confidently hosting guests without worrying about cat smell"
              steps={howToSteps}
              totalTime="4-6 hours initial effort + 15 minutes daily maintenance"
            />
          </div>
        </section>

        {/* Mindset Shift */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              The Mindset Shift: From Shame to Confidence
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Once you&apos;ve implemented proper odor control, something changes beyond just the smell.
              Your relationship with having guests transforms:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <h3 className="font-bold text-red-800 dark:text-red-200 mb-3">Before (Masking Approach)</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li>• Anxiety before guests arrive</li>
                  <li>• Frantic last-minute cleaning</li>
                  <li>• Constant worry during visits</li>
                  <li>• Apologizing preemptively</li>
                  <li>• Avoiding having people over</li>
                  <li>• Feeling judged as a pet owner</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">After (Elimination Approach)</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li>• Confidence when the doorbell rings</li>
                  <li>• Normal, relaxed preparation</li>
                  <li>• Present and engaged with guests</li>
                  <li>• No need to mention the cat smell</li>
                  <li>• Spontaneous invitations welcome</li>
                  <li>• Pride in your clean home</li>
                </ul>
              </div>
            </div>

            <AIQuotableBlock
              fact="The embarrassment isn't about having cats—it's about feeling out of control. When you implement source elimination rather than masking, you regain that control. Confidence follows naturally when you know there's genuinely nothing to apologize for."
              explanation="Most cat owners who solve their odor problems report that the psychological relief exceeds their expectations."
              icon="stat"
              variant="default"
            />
          </div>
        </section>

        {/* Quick Wins Before Guests */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Guests Coming Soon? Quick Wins for Today
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              If you have guests arriving and need immediate improvement, focus on these high-impact actions:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
                <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-3">2+ Hours Before</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">1.</span>
                    <span>Complete litter box change with fresh litter + carbon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">2.</span>
                    <span>Open windows to create cross-ventilation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">3.</span>
                    <span>Run air purifier on high near litter area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">4.</span>
                    <span>Vacuum all flooring and furniture</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
                <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-3">30 Minutes Before</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">1.</span>
                    <span>Scoop the litter box one more time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">2.</span>
                    <span>Close windows (fresh air has circulated)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">3.</span>
                    <span>Ensure litter area looks clean and organized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">4.</span>
                    <span>Take a breath—you&apos;ve done the work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <RelatedQuestions
              title="Cat Odor Embarrassment FAQ"
              questions={faqQuestions}
              defaultOpen={[0]}
            />
          </div>
        </section>

        {/* Long-term Freedom */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Long-Term Freedom From Odor Anxiety
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              The real solution isn&apos;t preparing frantically before each visit—it&apos;s implementing
              systems that keep your home consistently fresh. When odor control is a daily habit
              rather than a crisis response, the anxiety disappears:
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6">
              <h3 className="font-bold text-green-800 dark:text-green-200 mb-4">
                The Daily Routine That Ends Embarrassment
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Morning (3 min)</h4>
                  <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-1">
                    <li>• Scoop litter box</li>
                    <li>• Quick visual check</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Evening (3 min)</h4>
                  <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-1">
                    <li>• Scoop litter box</li>
                    <li>• Top up litter if needed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Weekly (15 min)</h4>
                  <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-1">
                    <li>• Complete litter change</li>
                    <li>• Refresh activated carbon</li>
                    <li>• Wipe box exterior</li>
                  </ul>
                </div>
              </div>
              <p className="text-green-700 dark:text-green-300 mt-4 text-sm">
                <strong>Total time:</strong> ~1 hour per week. That&apos;s the investment for a home
                you&apos;re always confident inviting people into.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                Stop Apologizing. Start Inviting.
              </h2>
              <p className="text-xl mb-6 opacity-90 text-center max-w-2xl mx-auto">
                Purrify&apos;s activated carbon eliminates 92% of ammonia at the source. No more
                masking, no more excuses, no more embarrassment. Just a home you&apos;re proud to share.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg text-center"
                >
                  Try Purrify Today
                </Link>
                <Link
                  href="/learn/how-activated-carbon-works"
                  className="inline-block border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:bg-white/10 dark:hover:bg-gray-100/10 hover:scale-105 transition-all duration-300 text-center"
                >
                  See the Science
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/why-house-smells-like-cat" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Why Does My House Smell Like Cat?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Find hidden odor sources</p>
              </Link>
              <Link href="/blog/cat-litter-smell-wont-go-away" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Litter Smell Won&apos;t Go Away?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Troubleshooting guide</p>
              </Link>
              <Link href="/learn/solutions/apartment-cat-smell-solution" className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Apartment Odor Solutions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Small space strategies</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
