"use client";

import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { Home, ChevronRight, Info, FlaskConical, Mail } from 'lucide-react';
import { getPaymentLink } from '@/lib/payment-links';

// Metadata is defined in page.tsx (Server Component)

interface ReviewsExperimentCopy {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  ctaHeadline: string;
  ctaBody: string;
  proofOrder: 'reviews-first' | 'trust-first';
}

interface ReviewsPageContentProps {
  experimentCopy: ReviewsExperimentCopy;
}

export default function Reviews({ experimentCopy }: ReviewsPageContentProps) {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              <span className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Reviews
                </span>
              </span>
            </nav>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="max-w-6xl mx-auto">

              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
                  Customer Feedback
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                  {experimentCopy.headline}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                  {experimentCopy.subheadline}
                </p>
              </div>

              <div className="flex flex-col">
                {/* Review Policy / How To Verify */}
                <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-16 cv-auto cis-480 ${experimentCopy.proofOrder === 'trust-first' ? 'order-1' : 'order-2'}`}>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 flex items-center justify-center flex-shrink-0">
                        <Info className="w-5 h-5 text-[#FF3131]" />
                      </div>
                      <div>
                        <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
                          No On-Site Ratings Yet
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          We do not publish aggregate star ratings or "verified review" claims on this page until a third-party review system is in place.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 flex items-center justify-center flex-shrink-0">
                        <FlaskConical className="w-5 h-5 text-[#FF3131]" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
                          Verify The Science
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          See primary sources and authoritative guidance on activated carbon adsorption in our science hub.
                        </p>
                        <Link
                          href="/science"
                          className="inline-flex items-center text-sm font-semibold text-[#FF3131] hover:text-[#FF3131]/80 transition-colors mt-2"
                        >
                          View research citations
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[#FF3131]" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
                          Share Feedback
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          Want to share your experience or a photo? Contact our team and we will route it to support.
                        </p>
                        <Link
                          href="/contact"
                          className="inline-flex items-center text-sm font-semibold text-[#FF3131] hover:text-[#FF3131]/80 transition-colors mt-2"
                        >
                          Contact us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center cv-auto cis-480">
                <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#E0EFC7] border border-[#FF3131]/20 rounded-xl p-8">
                  <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                    {experimentCopy.ctaHeadline}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                    {experimentCopy.ctaBody}
                  </p>
                  <div className="space-x-4">
                    <Link
                      href="/products/"
                      className="inline-block bg-[#FF3131] text-white dark:text-white dark:text-gray-100 px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/90 transition-colors"
                    >
                      {experimentCopy.primaryCta}
                    </Link>
                    <a
                      href={getPaymentLink('trialSingle') || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-[#FF3131] text-[#FF3131] px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/5 transition-colors"
                    >
                      {experimentCopy.secondaryCta}
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-600 cv-auto cis-480">
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">Learn More</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <Link href="/blog/activated-carbon-vs-baking-soda-comparison" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Comparison Guide</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">See how Purrify compares to alternatives</p>
                  </Link>
                  <Link href="/case-studies" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Case Studies</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Real results from real customers</p>
                  </Link>
                  <Link href="/blog/using-deodorizers-with-kittens" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Usage Tips</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">How to use with kittens and cats</p>
                  </Link>
                  <Link href="/locations/montreal" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Store Locations</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Find a retailer near you</p>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
