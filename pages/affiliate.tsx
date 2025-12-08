import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { Button } from '../src/components/ui/button';
import { Card } from '../src/components/ui/card';
import { Slider } from '../src/components/ui/slider';
import { CheckCircle2, DollarSign, Users, TrendingUp, Share2, Gift, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '../src/lib/translation-context';

export default function AffiliatePage() {
  const { t } = useTranslation();
  const [standardReferrals, setStandardReferrals] = useState(10);
  const [familyPackReferrals, setFamilyPackReferrals] = useState(5);

  // Commission: 30% of product price
  const standardPrice = 24.99; // Purrify 50g Standard
  const familyPackPrice = 44.99; // Purrify 120g Family Pack
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
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.affiliate.hero.badge}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
              {t.affiliate.hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
              {t.affiliate.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/customer/referrals">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white dark:text-gray-100 px-8 py-6 text-lg font-bold shadow-lg"
                >
                  {t.affiliate.hero.primaryCTA}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-6 text-lg"
                onClick={() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t.affiliate.hero.secondaryCTA}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                {t.affiliate.calculator.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t.affiliate.calculator.subtitle}
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-2 border-orange-200 dark:border-orange-700">
              {/* Standard Product Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t.affiliate.calculator.standardProduct}
                  </label>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {standardReferrals}
                  </span>
                </div>
                <Slider
                  value={[standardReferrals]}
                  onValueChange={(value) => setStandardReferrals(value[0])}
                  max={100}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>0</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ${standardPrice} × 30% = ${standardCommission.toFixed(2)} {t.affiliate.calculator.perSale}
                  </span>
                  <span>100</span>
                </div>
              </div>

              {/* Family Pack Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t.affiliate.calculator.familyPack}
                  </label>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {familyPackReferrals}
                  </span>
                </div>
                <Slider
                  value={[familyPackReferrals]}
                  onValueChange={(value) => setFamilyPackReferrals(value[0])}
                  max={50}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>0</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ${familyPackPrice} × 30% = ${familyPackCommission.toFixed(2)} {t.affiliate.calculator.perSale}
                  </span>
                  <span>50</span>
                </div>
              </div>

              {/* Results */}
              <div className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {t.affiliate.calculator.monthlyIncome}
                    </p>
                    <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                      ${monthlyIncome.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 rounded-lg">
                    <p className="text-sm text-orange-100 dark:text-orange-50 mb-2">
                      {t.affiliate.calculator.yearlyIncome}
                    </p>
                    <p className="text-4xl font-bold text-white dark:text-gray-100">
                      ${yearlyIncome.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t.affiliate.calculator.disclaimer}
                  </p>
                  <Link href="/customer/referrals">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white dark:text-gray-100 font-bold"
                    >
                      {t.affiliate.calculator.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
              {t.affiliate.howItWorks.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 dark:from-orange-500 dark:to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white dark:text-gray-100">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {t.affiliate.howItWorks.step1.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.affiliate.howItWorks.step1.description}
                </p>
              </Card>

              {/* Step 2 */}
              <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 dark:from-orange-500 dark:to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white dark:text-gray-100">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {t.affiliate.howItWorks.step2.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.affiliate.howItWorks.step2.description}
                </p>
              </Card>

              {/* Step 3 */}
              <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 dark:from-orange-500 dark:to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white dark:text-gray-100">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {t.affiliate.howItWorks.step3.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.affiliate.howItWorks.step3.description}
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">
              {t.affiliate.benefits.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
              {t.affiliate.benefits.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefit 1 */}
              <Card className="p-6 flex items-start space-x-4 bg-gray-50 dark:bg-gray-800 border-l-4 border-orange-500 dark:border-orange-400">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.affiliate.benefits.benefit1.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t.affiliate.benefits.benefit1.description}
                  </p>
                </div>
              </Card>

              {/* Benefit 2 */}
              <Card className="p-6 flex items-start space-x-4 bg-gray-50 dark:bg-gray-800 border-l-4 border-pink-500 dark:border-pink-400">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.affiliate.benefits.benefit2.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t.affiliate.benefits.benefit2.description}
                  </p>
                </div>
              </Card>

              {/* Benefit 3 */}
              <Card className="p-6 flex items-start space-x-4 bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-500 dark:border-blue-400">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.affiliate.benefits.benefit3.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t.affiliate.benefits.benefit3.description}
                  </p>
                </div>
              </Card>

              {/* Benefit 4 */}
              <Card className="p-6 flex items-start space-x-4 bg-gray-50 dark:bg-gray-800 border-l-4 border-green-500 dark:border-green-400">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.affiliate.benefits.benefit4.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t.affiliate.benefits.benefit4.description}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
              {t.affiliate.testimonials.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="p-6 bg-white dark:bg-gray-900">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 dark:text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-4 italic">
                  &quot;{t.affiliate.testimonials.testimonial1.quote}&quot;
                </p>
                <div className="flex items-center">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      {t.affiliate.testimonials.testimonial1.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.affiliate.testimonials.testimonial1.role}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Testimonial 2 */}
              <Card className="p-6 bg-white dark:bg-gray-900">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 dark:text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-4 italic">
                  &quot;{t.affiliate.testimonials.testimonial2.quote}&quot;
                </p>
                <div className="flex items-center">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      {t.affiliate.testimonials.testimonial2.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.affiliate.testimonials.testimonial2.role}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Testimonial 3 */}
              <Card className="p-6 bg-white dark:bg-gray-900">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 dark:text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-4 italic">
                  &quot;{t.affiliate.testimonials.testimonial3.quote}&quot;
                </p>
                <div className="flex items-center">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      {t.affiliate.testimonials.testimonial3.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.affiliate.testimonials.testimonial3.role}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
              {t.affiliate.faq.title}
            </h2>

            <div className="space-y-6">
              <Card className="p-6 bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3 mt-1 flex-shrink-0" />
                  {t.affiliate.faq.question1}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 ml-8">
                  {t.affiliate.faq.answer1}
                </p>
              </Card>

              <Card className="p-6 bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3 mt-1 flex-shrink-0" />
                  {t.affiliate.faq.question2}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 ml-8">
                  {t.affiliate.faq.answer2}
                </p>
              </Card>

              <Card className="p-6 bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3 mt-1 flex-shrink-0" />
                  {t.affiliate.faq.question3}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 ml-8">
                  {t.affiliate.faq.answer3}
                </p>
              </Card>

              <Card className="p-6 bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3 mt-1 flex-shrink-0" />
                  {t.affiliate.faq.question4}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 ml-8">
                  {t.affiliate.faq.answer4}
                </p>
              </Card>

              <Card className="p-6 bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3 mt-1 flex-shrink-0" />
                  {t.affiliate.faq.question5}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 ml-8">
                  {t.affiliate.faq.answer5}
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 dark:from-orange-600 dark:via-pink-600 dark:to-purple-700">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-6">
              {t.affiliate.finalCTA.title}
            </h2>
            <p className="text-xl text-orange-50 dark:text-orange-100 mb-8">
              {t.affiliate.finalCTA.subtitle}
            </p>
            <Link href="/customer/referrals">
              <Button
                size="lg"
                className="bg-white dark:bg-gray-900 text-orange-600 dark:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-6 text-lg font-bold shadow-xl"
              >
                {t.affiliate.finalCTA.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-orange-100 dark:text-orange-200 mt-4">
              {t.affiliate.finalCTA.disclaimer}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
