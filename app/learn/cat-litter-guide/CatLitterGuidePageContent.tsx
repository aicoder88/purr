'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/container';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { formatProductPrice } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import { GUIDE_COPY } from './components/GuideCopy';
import Breadcrumb from './components/Breadcrumb';
import HeroSection from './components/HeroSection';
import LitterTypesSection from './components/LitterTypesSection';
import MaintenanceSection from './components/MaintenanceSection';
import ProblemsSection from './components/ProblemsSection';
import CTASection from './components/CTASection';
import Image from 'next/image';

type SupportedLocale = 'en' | 'fr';

export default function CatLitterGuidePageContent() {
  const locale = useLocale();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const copy = GUIDE_COPY[locale as SupportedLocale] || GUIDE_COPY.en;

  const { schema, additionalSchemas } = useEnhancedSEO({
    path: '/learn/cat-litter-guide',
    title: 'Cat Litter Guide: Types & Best Practices',
    description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems. Learn how to choose the best litter for your cat and keep it fresh longer.',
    targetKeyword: 'cat litter guide',
    schemaType: 'article',
    schemaData: {
      headline: 'Complete Cat Litter Guide - Types, Tips & Best Practices',
      description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems. Learn how to choose the best litter for your cat and keep it fresh longer.',
      image: 'https://www.purrify.ca/optimized/blog/litter-guide-hero-setup.webp',
      datePublished: '2024-01-01T10:00:00Z',
      dateModified: new Date().toISOString(),
      category: 'Pet Care Guides',
      keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
    },
    image: 'https://www.purrify.ca/optimized/blog/litter-guide-hero-setup.webp',
    keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
  });

  const trialPrice = formatProductPrice('trial', locale);
  const trialCheckoutUrl = getPaymentLink('trialSingle') || `${localePrefix}/products/trial-size`;
  const trialCtaLabel = `${copy.trialCtaPrefix} - ${trialPrice}`;

  const allSchemas = [schema, ...additionalSchemas].filter(Boolean);

  return (
    <>
      {allSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              allSchemas.length === 1
                ? allSchemas[0]
                : { '@context': 'https://schema.org', '@graph': allSchemas }
            ),
          }}
        />
      )}
      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        <Breadcrumb localePrefix={localePrefix} copy={copy} />
        <HeroSection
          localePrefix={localePrefix}
          copy={copy}
          trialCtaLabel={trialCtaLabel}
          trialCheckoutUrl={trialCheckoutUrl}
        />

        <section className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-xl border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-6 md:p-8">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 mb-4">{copy.quickAnswerTitle}</h2>
                <p className="text-blue-800 dark:text-blue-200">{copy.quickAnswerBody}</p>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-4">
          <Container>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{copy.tocTitle}</h2>
              <ol className="grid gap-2 md:grid-cols-2">
                {copy.tocItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-gray-700 dark:text-gray-300 hover:text-[#5B2EFF] dark:hover:text-[#818CF8]">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* Section Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Image
                src="/optimized/blog/safe-cat-litter.webp"
                alt={copy.sectionImageAlt}
                width={1600}
                height={1067}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </Container>
        </section>

        <LitterTypesSection copy={copy} />

        <section id="selection-framework" className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{copy.decisionFrameworkTitle}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{copy.decisionFrameworkIntro}</p>
              <div className="space-y-6">
                {copy.decisionSteps.map((step, index) => (
                  <article key={index} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                    <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{step.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.checklist.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-gray-700 dark:text-gray-300">
                          <span className="text-[#5B2EFF] dark:text-[#818CF8] mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="setup-routine" className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
              <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{copy.setupTitle}</h2>
              <div className="space-y-4">
                {copy.setupParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-6">
                Learn more about source control science on{' '}
                <Link href={`${localePrefix}/learn/how-it-works/`} className="text-[#5B2EFF] dark:text-[#818CF8] hover:underline font-medium">
                  {locale === 'fr' ? 'How It Works' : 'How It Works'}
                </Link>
                , and review common safety questions on{' '}
                <Link href={`${localePrefix}/learn/safety/`} className="text-[#5B2EFF] dark:text-[#818CF8] hover:underline font-medium">
                  {locale === 'fr' ? 'Safety' : 'Safety'}
                </Link>
                .
              </p>
            </div>
          </Container>
        </section>

        <MaintenanceSection copy={copy} />

        <section id="maintenance-schedule" className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{copy.maintenanceScheduleTitle}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{copy.maintenanceScheduleDescription}</p>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full bg-white dark:bg-gray-800">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-900 dark:text-gray-100">{copy.frequencyLabel}</th>
                      <th className="text-left px-4 py-3 text-gray-900 dark:text-gray-100">{copy.taskLabel}</th>
                      <th className="text-left px-4 py-3 text-gray-900 dark:text-gray-100">{copy.reasonLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.maintenanceSchedule.map((row, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium">{row.frequency}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.task}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        <ProblemsSection localePrefix={localePrefix} copy={copy} />

        <section id="warning-signs" className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{copy.warningSignsTitle}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{copy.warningSignsDescription}</p>
              <div className="space-y-4">
                {copy.warningSigns.map((warning, index) => (
                  <div key={index} className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-5">
                    <h3 className="font-heading text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">{warning.sign}</h3>
                    <p className="text-amber-900/90 dark:text-amber-200">{warning.action}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-6">
                For broader care guidance, visit{' '}
                <Link href={`${localePrefix}/learn/faq/`} className="text-[#5B2EFF] dark:text-[#818CF8] hover:underline font-medium">
                  {locale === 'fr' ? 'FAQ' : 'FAQ'}
                </Link>{' '}
                and{' '}
                <Link href={`${localePrefix}/learn/science/`} className="text-[#5B2EFF] dark:text-[#818CF8] hover:underline font-medium">
                  {locale === 'fr' ? 'Science' : 'Science'}
                </Link>
                .
              </p>
            </div>
          </Container>
        </section>

        <section id="related-guides" className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
              <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{copy.relatedGuidesTitle}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-5">{copy.relatedGuidesDescription}</p>
              <ul className="space-y-2">
                {copy.relatedGuides.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`${localePrefix}${item.url}`}
                      className="text-[#5B2EFF] dark:text-[#818CF8] hover:underline font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section id="external-resources" className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
              <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{copy.externalResourcesTitle}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-5">{copy.externalResourcesDescription}</p>
              <ul className="space-y-2">
                {copy.externalResources.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5B2EFF] dark:text-[#818CF8] hover:underline font-medium"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section id="guide-faq" className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">{copy.faqTitle}</h2>
              <div className="space-y-4">
                {copy.faqItems.map((faq, index) => (
                  <article key={index} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{faq.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <CTASection
          localePrefix={localePrefix}
          copy={copy}
          trialCtaLabel={trialCtaLabel}
          trialCheckoutUrl={trialCheckoutUrl}
        />

        {/* Related Articles */}
        <section className="py-16">
          <Container>
            <RelatedContent currentUrl="/learn/cat-litter-guide" />
          </Container>
        </section>
      </main>
    </>
  );
}
