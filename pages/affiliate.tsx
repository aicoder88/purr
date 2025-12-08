import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { CheckCircle2, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '../src/lib/translation-context';

export default function AffiliatePage() {
  const { t } = useTranslation();
  const [standardReferrals, setStandardReferrals] = useState(10);
  const [familyPackReferrals, setFamilyPackReferrals] = useState(5);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Commission: 30% of product price
  const standardPrice = 24.99;
  const familyPackPrice = 44.99;
  const commissionRate = 0.30;

  const standardCommission = standardPrice * commissionRate;
  const familyPackCommission = familyPackPrice * commissionRate;

  const monthlyIncome = (standardReferrals * standardCommission) + (familyPackReferrals * familyPackCommission);
  const yearlyIncome = monthlyIncome * 12;

  const canonicalUrl = 'https://www.purrify.ca/affiliate';

  // Ensure affiliate translations exist
  if (!t.affiliate) {
    return null;
  }

  return (
    <>
      <NextSeo
        title={t.affiliate.metaTitle}
        description={t.affiliate.metaDescription}
        canonical={canonicalUrl}
        openGraph={{
          title: t.affiliate.metaTitle,
          description: t.affiliate.metaDescription,
          url: canonicalUrl,
          images: [
            {
              url: 'https://www.purrify.ca/optimized/purrify-affiliate-program.webp',
              width: 1200,
              height: 630,
              alt: 'Purrify Affiliate Program',
            },
          ],
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/10"></div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight tracking-tight">
              {t.affiliate.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-light">
              {t.affiliate.hero.subtitle}
            </p>
            <Link href="/customer/referrals">
              <button className="inline-flex items-center px-8 py-4 bg-[#2e90fa] hover:bg-[#1e5dd6] text-white dark:text-gray-100 text-lg font-semibold rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1),0_0_0_1px_#1E5DD6] hover:shadow-[0_4px_12px_rgba(46,144,250,0.4)] transition-all duration-200">
                {t.affiliate.hero.primaryCTA}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                {t.affiliate.calculator.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-light">
                {t.affiliate.calculator.subtitle}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-800 p-8 md:p-12">
              {/* Standard Product Slider */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t.affiliate.calculator.standardProduct}
                  </label>
                  <span className="text-3xl font-bold text-[#2e90fa] dark:text-[#2e90fa]">
                    {standardReferrals}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={standardReferrals}
                  onChange={(e) => setStandardReferrals(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2e90fa] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#2e90fa] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span>0</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    ${standardPrice} × 30% = ${standardCommission.toFixed(2)} {t.affiliate.calculator.perSale}
                  </span>
                  <span>100</span>
                </div>
              </div>

              {/* Family Pack Slider */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t.affiliate.calculator.familyPack}
                  </label>
                  <span className="text-3xl font-bold text-[#2e90fa] dark:text-[#2e90fa]">
                    {familyPackReferrals}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={familyPackReferrals}
                  onChange={(e) => setFamilyPackReferrals(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2e90fa] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#2e90fa] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span>0</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    ${familyPackPrice} × 30% = ${familyPackCommission.toFixed(2)} {t.affiliate.calculator.perSale}
                  </span>
                  <span>50</span>
                </div>
              </div>

              {/* Results */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 font-semibold">
                      {t.affiliate.calculator.monthlyIncome}
                    </p>
                    <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50">
                      ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-[#2e90fa] to-[#1e5dd6] dark:from-[#2e90fa] dark:to-[#1e5dd6] rounded-xl shadow-lg">
                    <p className="text-sm uppercase tracking-wide text-blue-100 dark:text-blue-50 mb-2 font-semibold">
                      {t.affiliate.calculator.yearlyIncome}
                    </p>
                    <p className="text-4xl md:text-5xl font-bold text-white dark:text-gray-100">
                      ${yearlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                  {t.affiliate.calculator.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
              {t.affiliate.howItWorks.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2e90fa] to-[#1e5dd6] dark:from-[#2e90fa] dark:to-[#1e5dd6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-white dark:text-gray-100">1</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {t.affiliate.howItWorks.step1.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.affiliate.howItWorks.step1.description}
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2e90fa] to-[#1e5dd6] dark:from-[#2e90fa] dark:to-[#1e5dd6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-white dark:text-gray-100">2</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {t.affiliate.howItWorks.step2.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.affiliate.howItWorks.step2.description}
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2e90fa] to-[#1e5dd6] dark:from-[#2e90fa] dark:to-[#1e5dd6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold text-white dark:text-gray-100">3</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {t.affiliate.howItWorks.step3.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.affiliate.howItWorks.step3.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">
              {t.affiliate.benefits.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 font-light">
              {t.affiliate.benefits.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefit 1 */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-800 hover:shadow-[0_12px_48px_rgba(46,144,250,0.15)] dark:hover:shadow-[0_12px_48px_rgba(46,144,250,0.2)] transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#2e90fa] dark:text-[#2e90fa]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {t.affiliate.benefits.benefit1.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.affiliate.benefits.benefit1.description}
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-800 hover:shadow-[0_12px_48px_rgba(46,144,250,0.15)] dark:hover:shadow-[0_12px_48px_rgba(46,144,250,0.2)] transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#2e90fa] dark:text-[#2e90fa]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {t.affiliate.benefits.benefit2.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.affiliate.benefits.benefit2.description}
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-800 hover:shadow-[0_12px_48px_rgba(46,144,250,0.15)] dark:hover:shadow-[0_12px_48px_rgba(46,144,250,0.2)] transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#2e90fa] dark:text-[#2e90fa]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {t.affiliate.benefits.benefit3.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.affiliate.benefits.benefit3.description}
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-800 hover:shadow-[0_12px_48px_rgba(46,144,250,0.15)] dark:hover:shadow-[0_12px_48px_rgba(46,144,250,0.2)] transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#2e90fa] dark:text-[#2e90fa]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {t.affiliate.benefits.benefit4.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.affiliate.benefits.benefit4.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
              {t.affiliate.testimonials.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed italic">
                  &quot;{t.affiliate.testimonials.testimonial1.quote}&quot;
                </p>
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {t.affiliate.testimonials.testimonial1.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.affiliate.testimonials.testimonial1.role}
                  </p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed italic">
                  &quot;{t.affiliate.testimonials.testimonial2.quote}&quot;
                </p>
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {t.affiliate.testimonials.testimonial2.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.affiliate.testimonials.testimonial2.role}
                  </p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed italic">
                  &quot;{t.affiliate.testimonials.testimonial3.quote}&quot;
                </p>
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {t.affiliate.testimonials.testimonial3.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.affiliate.testimonials.testimonial3.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
              {t.affiliate.faq.title}
            </h2>

            <div className="space-y-4">
              {[
                { q: t.affiliate.faq.question1, a: t.affiliate.faq.answer1 },
                { q: t.affiliate.faq.question2, a: t.affiliate.faq.answer2 },
                { q: t.affiliate.faq.question3, a: t.affiliate.faq.answer3 },
                { q: t.affiliate.faq.question4, a: t.affiliate.faq.answer4 },
                { q: t.affiliate.faq.question5, a: t.affiliate.faq.answer5 },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_0_0_1px_#e5e7eb] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_0_0_1px_rgba(55,65,81,1)] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-gray-100 pr-4">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#2e90fa] to-[#1e5dd6] dark:from-[#2e90fa] dark:to-[#1e5dd6]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-100 mb-6">
              {t.affiliate.finalCTA.title}
            </h2>
            <p className="text-xl text-blue-100 dark:text-blue-50 mb-10 font-light">
              {t.affiliate.finalCTA.subtitle}
            </p>
            <Link href="/customer/referrals">
              <button className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-900 text-[#2e90fa] dark:text-[#2e90fa] text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                {t.affiliate.finalCTA.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            <p className="text-sm text-blue-100 dark:text-blue-200 mt-6">
              {t.affiliate.finalCTA.disclaimer}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
