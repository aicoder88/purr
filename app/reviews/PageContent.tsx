"use client";

import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { Home, ChevronRight, Info, FlaskConical, Mail } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { getPaymentLink } from '@/lib/payment-links';
import { localizePath } from '@/lib/i18n/locale-path';

// Metadata is defined in page.tsx (Server Component)

export default function Reviews() {
  const t = useTranslations('reviewsPage');
  const locale = useLocale() === 'fr' ? 'fr' : 'en';
  const homeHref = localizePath('/', locale);
  const scienceHref = localizePath('/learn/science/', locale);
  const contactHref = '/contact/';
  const productsHref = localizePath('/products/', locale);
  const caseStudiesHref = '/case-studies/';
  const sampleHref = getPaymentLink('trialSingle') || localizePath('/products/trial-size/', locale);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <Container>
            <nav aria-label={t('breadcrumbAria')} className="flex items-center space-x-2 text-sm">
              <Link
                href={homeHref}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              <span className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {t('breadcrumb.reviews')}
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
                <div className="inline-block px-4 py-1 bg-[#E0EFC7] dark:bg-green-900/40 rounded-full text-[#FF3131] dark:text-[#FF4D4D] font-medium text-sm mb-4">
                  {t('badge')}
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                  {t('heading')}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                  {t('description')}
                </p>
              </div>

              <div className="flex flex-col">
                {/* Review Policy / How To Verify */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-16 cv-auto cis-480 order-2">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 dark:bg-[#FF5050]/20 flex items-center justify-center flex-shrink-0">
                        <Info className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" />
                      </div>
                      <div>
                        <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
                          {t('trustSection.verifiedTitle')}
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {t('trustSection.verifiedDesc')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 dark:bg-[#FF5050]/20 flex items-center justify-center flex-shrink-0">
                        <FlaskConical className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
                          {t('trustSection.ratingTitle')}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {t('trustSection.ratingDesc')}
                        </p>
                        <Link
                          href={scienceHref}
                          className="inline-flex items-center text-sm font-semibold text-[#FF3131] dark:text-[#FF5050] hover:text-[#FF3131]/80 dark:hover:text-[#FF5050]/80 transition-colors mt-2"
                        >
                          {t('trustSection.ratingCta')}
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 dark:bg-[#FF5050]/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
                          {t('trustSection.customersTitle')}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {t('trustSection.customersDesc')}
                        </p>
                        <Link
                          href={contactHref}
                          className="inline-flex items-center text-sm font-semibold text-[#FF3131] dark:text-[#FF5050] hover:text-[#FF3131]/80 dark:hover:text-[#FF5050]/80 transition-colors mt-2"
                        >
                          {t('trustSection.customersCta')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center cv-auto cis-480">
                <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#E0EFC7] dark:from-[#311010] dark:to-green-900/20 border border-[#FF3131]/20 dark:border-[#FF3131]/10 rounded-xl p-8">
                  <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                    {t('ctaSection.heading')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                    {t('ctaSection.description')}
                  </p>
                  <div className="space-x-4">
                    <Link
                      href={productsHref}
                      className="inline-block bg-[#FF3131] text-white dark:text-white dark:text-gray-100 px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/90 transition-colors"
                    >
                      {t('ctaSection.shopNow')}
                    </Link>
                    <a
                      href={sampleHref}
                      className="inline-block border border-[#FF3131] text-[#FF3131] dark:text-[#FF5050] dark:border-[#FF5050]/50 px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/5 dark:hover:bg-[#FF5050]/10 transition-colors"
                    >
                      {t('ctaSection.tryFreeSample')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-600 cv-auto cis-480">
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">{t('relatedLinks.heading')}</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <Link href="/blog/activated-carbon-vs-baking-soda-comparison" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{t('relatedLinks.comparison')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t('relatedLinks.comparisonDesc')}</p>
                  </Link>
                  <Link href={caseStudiesHref} className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{t('relatedLinks.caseStudies')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t('relatedLinks.caseStudiesDesc')}</p>
                  </Link>
                  <Link href="/blog/using-deodorizers-with-kittens" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{t('relatedLinks.usageInfo')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t('relatedLinks.usageInfoDesc')}</p>
                  </Link>
                  <Link href="/locations/montreal" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{t('relatedLinks.storeLocations')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t('relatedLinks.storeLocationsDesc')}</p>
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
