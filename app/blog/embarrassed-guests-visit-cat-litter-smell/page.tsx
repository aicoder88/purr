import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { RelatedContent } from '@/components/seo/RelatedContent';

export const metadata: Metadata = {
  title: "Embarrassed By Cat Smell? You're Not Alone (And Here's How to Fix It)",
  description: "Tired of apologizing for how your house smells? Learn why cat odor embarrassment is more common than you think and the proven solutions that actually work.",
  keywords: 'embarrassed cat smell, house smells like cat, apologizing for cat odor, cat owner shame, eliminate cat smell guests',
  alternates: {
    canonical: 'https://www.purrify.ca/blog/embarrassed-guests-visit-cat-litter-smell',
  },
  openGraph: {
    title: "Embarrassed By Cat Smell? You're Not Alone (And Here's How to Fix It)",
    description: "Tired of apologizing for how your house smells? Learn why cat odor embarrassment is more common than you think.",
    url: 'https://www.purrify.ca/blog/embarrassed-guests-visit-cat-litter-smell',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/embarrassed-hero.jpg',
        width: 1200,
        height: 675,
      },
    ],
  },
};

const heroImage = '/optimized/embarrassed-hero.jpg';
const livingRoomImage = '/optimized/airy-living-room-ghibli.webp';
const cleanHomeImage = '/optimized/sparkling-clean-home-ghibli.webp';

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

export default function EmbarrassedGuestsVisitCatLitterSmellPage() {
  return (
    <>
      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
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
                guests might think when they walk in. You're not alone—and this is fixable.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src={heroImage}
                alt="Overcoming cat odor embarrassment"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>

            <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 dark:border-rose-400 p-6 rounded-r-xl">
              <h2 className="text-xl font-heading font-bold text-rose-800 dark:text-rose-200 mb-3">
                Let's Be Honest
              </h2>
              <p className="text-rose-700 dark:text-rose-300">
                You've probably said "sorry about the smell" before guests even finish
                taking off their shoes. You've made excuses about the litter box "just needing
                to be changed." Maybe you've stopped inviting people over altogether. This
                anxiety is real—and it's more common than you think.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              You're Not Alone in This
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Cat odor embarrassment is one of the most common concerns among cat owners—yet it's
              rarely discussed openly. Here's what research and surveys tell us:
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
                  underestimate how adapted they've become to their home's smell
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Stories That Might Sound Familiar
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-200 italic mb-4">
                  "My in-laws were coming for dinner. I cleaned for two days straight—scrubbed
                  everything, lit candles, opened windows. The moment they walked in, my mother-in-law
                  wrinkled her nose. I wanted to disappear."
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">— Common experience</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-200 italic mb-4">
                  "I realized I'd been making excuses for years. 'Oh, the litter box is
                  right around the corner' or 'I was just about to clean it.' The truth
                  was, I'd cleaned it that morning. I just couldn't smell what everyone else could."
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">— Common experience</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              How to Actually Solve This Problem
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mb-8">
              The goal isn't to hide your cat or apologize for them—it's to create a home
              where there's genuinely nothing to apologize for. Here's how:
            </p>

            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Step 1: Accept You May Have "Nose Blindness"</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Leave your home for 2+ hours, then pay attention in the first 30 seconds when you return. 
                  Ask a trusted friend for honest feedback about your home's smell.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Step 2: Address the Litter Box Immediately</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Do a complete change with fresh litter, wash the box thoroughly, and add activated carbon. 
                  If the box is over a year old, replace it—plastic absorbs odors permanently.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Step 3: Hunt for Hidden Accidents</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Use a UV flashlight in a dark room to find accidents you never knew existed. 
                  Check behind furniture, near windows, and along baseboards.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Step 4: Deep Clean All Fabric Surfaces</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Wash all bedding, throw pillows, curtains, and cat beds. Steam clean carpets 
                  and upholstered furniture to remove accumulated odors.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">Step 5: Implement Ongoing Prevention</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Use activated carbon continuously, maintain twice-daily scooping, wash cat bedding weekly, 
                  and run an air purifier with carbon filter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-12 text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                Stop Apologizing. Start Inviting.
              </h2>
              <p className="text-xl mb-6 opacity-90 text-center max-w-2xl mx-auto">
                Purrify's activated carbon eliminates 92% of ammonia at the source. No more
                masking, no more excuses, no more embarrassment. Just a home you're proud to share.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-white dark:bg-gray-100 text-electric-indigo font-bold py-4 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg text-center"
                >
                  Try Purrify's 1-week trial size
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

        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqQuestions.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{faq.question}</h3>
                  <p className="text-gray-700 dark:text-gray-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RelatedContent currentUrl="/blog/embarrassed-guests-visit-cat-litter-smell" />
      </div>
    </>
  );
}
