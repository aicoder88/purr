import type { Metadata } from 'next';
import Link from 'next/link';
import { Truck, Clock, MapPin, Package, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO, SITE_NAME } from '@/lib/constants';
import { stripContext } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: `Shipping Information - ${SITE_NAME} Help Center`,
  description: 'Learn about Purrify shipping options, delivery times, costs, and tracking. We ship to USA and Canada with fast, reliable delivery.',
  keywords: ['shipping', 'delivery', 'tracking', 'shipping costs', 'international shipping'],
  alternates: {
    canonical: 'https://www.purrify.ca/support/shipping/',
    languages: {
      'en-CA': 'https://www.purrify.ca/support/shipping',
      'fr-CA': 'https://www.purrify.ca/fr/support/shipping',
      'zh-CN': 'https://www.purrify.ca/zh/support/shipping',
      'es-US': 'https://www.purrify.ca/es/support/shipping',
      'en-US': 'https://www.purrify.ca/support/shipping',
      'x-default': 'https://www.purrify.ca/support/shipping',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/support/shipping/',
    title: `Shipping Information - ${SITE_NAME} Help Center`,
    description: 'Learn about Purrify shipping options, delivery times, costs, and tracking.',
    locale: 'en_CA',
  },
  other: {
    'last-modified': '2025-12-20',
  },
};

const shippingZones = [
  {
    region: 'Canada',
    standardTime: '3-7 business days',
    expressTime: '1-3 business days',
    standardCost: '$7.99 CAD',
    expressCost: '$14.99 CAD',
    freeThreshold: 'Free over $50 CAD',
    flag: '🇨🇦'
  },
  {
    region: 'United States',
    standardTime: '5-10 business days',
    expressTime: '2-5 business days',
    standardCost: '$9.99 CAD',
    expressCost: '$19.99 CAD',
    freeThreshold: 'Free over $75 CAD',
    flag: '🇺🇸'
  }
];

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you will receive an email with a tracking number. You can use this number on our website or the carrier\'s website to track your package in real-time.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship to Canada and the United States. We\'re working on expanding to more countries soon!'
  },
  {
    question: 'What if my package is lost or damaged?',
    answer: 'If your package doesn\'t arrive within the estimated timeframe or arrives damaged, please contact us at support@purrify.ca within 14 days. We\'ll investigate and send a replacement if necessary.'
  },
  {
    question: 'Can I change my shipping address after ordering?',
    answer: 'We process orders quickly, but if you need to change your address, contact us immediately at support@purrify.ca. We\'ll do our best to update it before the package ships.'
  }
];

// FAQPage schema for Shipping
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

export default function ShippingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [stripContext(faqSchema)],
          }),
        }}
      />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
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
              <li className="text-[#03E46A] font-semibold">Shipping</li>
            </ol>
          </nav>
        </Container>

        {/* Hero */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
                <Truck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                Shipping Information
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Fast, reliable shipping to your door. Learn about delivery times, costs, and tracking your order.
              </p>
            </div>
          </Container>
        </section>

        {/* Shipping Zones */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Shipping Options & Rates
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {shippingZones.map((zone, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{zone.flag}</span>
                    <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
                      {zone.region}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Standard Delivery</p>
                        <p className="text-gray-600 dark:text-gray-300">{zone.standardTime}</p>
                        <p className="text-[#03E46A] font-bold">{zone.standardCost}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Express Delivery</p>
                        <p className="text-gray-600 dark:text-gray-300">{zone.expressTime}</p>
                        <p className="text-purple-600 dark:text-purple-400 font-bold">{zone.expressCost}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Free Shipping</p>
                        <p className="text-gray-600 dark:text-gray-300">{zone.freeThreshold}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10">
          <Container>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              How Shipping Works
            </h2>

            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Package, step: '1', title: 'Order Placed', desc: 'We receive and process your order within 24 hours' },
                { icon: CheckCircle2, step: '2', title: 'Order Shipped', desc: 'You receive a confirmation email with tracking number' },
                { icon: Truck, step: '3', title: 'In Transit', desc: 'Your package is on its way to you' },
                { icon: MapPin, step: '4', title: 'Delivered', desc: 'Enjoy your Purrify products!' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white dark:text-gray-100" />
                  </div>
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Shipping FAQs
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Ready to Order?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get free shipping on orders over $50 in Canada and $75 in the US.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products/">
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-lg px-8">
                    Shop Now
                  </Button>
                </Link>
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-white dark:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-800 font-bold text-lg px-8">
                    Contact Support
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
