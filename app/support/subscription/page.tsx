import type { Metadata } from 'next';
import Link from 'next/link';
import { RefreshCw, Calendar, CreditCard, PauseCircle, XCircle, Gift, CheckCircle2, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Subscription & Autoship - ${SITE_NAME} Help Center`,
  description: 'Learn about Purrify autoship subscriptions. Save 30%, get free shipping, and never run out. Cancel, pause, or modify anytime.',
  keywords: ['subscription', 'autoship', 'recurring orders', 'save money', 'automatic delivery'],
  alternates: {
    canonical: 'https://www.purrify.ca/support/subscription',
    languages: {
      'en-CA': 'https://www.purrify.ca/support/subscription',
      'fr-CA': 'https://www.purrify.ca/fr/support/subscription',
      'zh-CN': 'https://www.purrify.ca/zh/support/subscription',
      'es-US': 'https://www.purrify.ca/es/support/subscription',
      'en-US': 'https://www.purrify.ca/support/subscription',
      'x-default': 'https://www.purrify.ca/support/subscription',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/support/subscription',
    title: `Subscription & Autoship - ${SITE_NAME} Help Center`,
    description: 'Learn about Purrify autoship subscriptions. Save 30%, get free shipping, and never run out.',
    locale: 'en_CA',
  },
  other: {
    'last-modified': '2025-11-23',
  },
};

const benefits = [
  {
    icon: Gift,
    title: 'Save 30%',
    description: 'Get our biggest discount on every shipment',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    icon: RefreshCw,
    title: 'Free Shipping',
    description: 'Always free, no minimum order required',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: Calendar,
    title: 'Flexible Schedule',
    description: 'Choose delivery every 1, 2, or 3 months',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    icon: PauseCircle,
    title: 'Pause Anytime',
    description: 'Going on vacation? Pause with one click',
    color: 'text-orange-600 dark:text-orange-400'
  }
];

const howItWorks = [
  {
    step: '1',
    title: 'Choose Your Plan',
    description: 'Select your preferred product size and delivery frequency'
  },
  {
    step: '2',
    title: 'Set & Forget',
    description: 'We automatically ship your Purrify on schedule'
  },
  {
    step: '3',
    title: 'Stay Fresh',
    description: 'Never run out of odor-eliminating power again'
  }
];

const faqs = [
  {
    question: 'How do I start a subscription?',
    answer: 'Simply visit our products page, select your preferred size, and choose the "Subscribe & Save" option at checkout. You\'ll save 30% instantly and get free shipping.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Absolutely! You can cancel, pause, or modify your subscription anytime from your account dashboard. There are no cancellation fees or commitments.'
  },
  {
    question: 'When will I be charged?',
    answer: 'You\'ll be charged when your order ships. We send you an email reminder 7 days before each shipment, so you\'ll never be surprised.'
  },
  {
    question: 'Can I change my delivery frequency?',
    answer: 'Yes! You can change from monthly to bi-monthly or quarterly deliveries anytime. Just log into your account and adjust your preferences.'
  },
  {
    question: 'What if I have too much product?',
    answer: 'No problem! You can skip a shipment or pause your subscription for up to 3 months. You\'re always in control.'
  }
];

// FAQPage schema for Subscription
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function SubscriptionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Breadcrumb */}
      <Container>
        <nav className="py-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#03E46A] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400 dark:text-gray-500">/</li>
            <li>
              <Link href="/support" className="hover:text-[#03E46A] transition-colors">
                Support
              </Link>
            </li>
            <li className="text-gray-400 dark:text-gray-500">/</li>
            <li className="text-[#03E46A] font-semibold">Subscription</li>
          </ol>
        </nav>
      </Container>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
              <RefreshCw className="w-10 h-10 text-[#03E46A]" />
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Subscribe & Save
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Never run out of Purrify again. Save 30%, get free shipping, and enjoy hassle-free automatic deliveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#products">
                <Button size="lg" className="bg-[#03E46A] hover:bg-[#02C55A] text-white dark:text-gray-900 font-bold text-lg px-8">
                  Start Saving Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Subscribe?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                  <div className="w-16 h-16 bg-[#03E46A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white dark:text-gray-100 font-bold text-2xl">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#03E46A]/30" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Subscription Management */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              You&apos;re in Control
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 rounded-2xl p-8 border border-green-100 dark:border-green-800">
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  Easy Management
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    Change delivery frequency anytime
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    Skip a shipment if needed
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    Update shipping address
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    Switch product sizes
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 rounded-2xl p-8 border border-purple-100 dark:border-purple-800">
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Billing & Payments
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    Secure payment processing
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    7-day reminder before each shipment
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    Update payment methods easily
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    View billing history anytime
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Subscription FAQs
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#03E46A] to-[#02C55A]">
        <Container>
          <div className="text-center text-white dark:text-gray-900 max-w-3xl mx-auto">
            <RefreshCw className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Start Saving Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of cat owners who never run out of Purrify and save 30% on every order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#products">
                <Button size="lg" className="bg-white dark:bg-gray-900 text-[#03E46A] hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-lg px-8">
                  Subscribe & Save 30%
                </Button>
              </Link>
              <Link href="/customer/portal">
                <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-white dark:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-800 font-bold text-lg px-8">
                  Manage Subscription
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
    </>
  );
}
