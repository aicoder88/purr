import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SITE_NAME } from '@/lib/constants';
import { formatCurrency, REFERRAL_CONFIG } from '@/lib/referral';

const canonicalUrl = 'https://www.purrify.ca/referral/';
const minimumOrder = formatCurrency(REFERRAL_CONFIG.MINIMUM_QUALIFYING_ORDER_SUBTOTAL);

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const title = `${t('referral.landing.seo.title')} | ${SITE_NAME}`;
  const description = t('referral.landing.seo.description');

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': canonicalUrl,
        'en-US': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      locale: 'en_CA',
      images: [
        {
          url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
          width: 1200,
          height: 800,
          alt: `${SITE_NAME} Referral Program`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title,
      description,
      images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'],
    },
    other: {
      'last-modified': '2026-03-08',
    },
  };
}

export default async function ReferralPage() {
  const t = await getTranslations();

  const steps = [
    {
      title: t('referral.landing.howItWorks.step1Title'),
      body: t('referral.landing.howItWorks.step1Body'),
    },
    {
      title: t('referral.landing.howItWorks.step2Title'),
      body: t('referral.landing.howItWorks.step2Body', { minimumOrder }),
    },
    {
      title: t('referral.landing.howItWorks.step3Title'),
      body: t('referral.landing.howItWorks.step3Body'),
    },
  ];

  const standards = [
    {
      title: t('referral.landing.standards.qualifyingOrderTitle'),
      body: t('referral.landing.standards.qualifyingOrderBody', { minimumOrder }),
    },
    {
      title: t('referral.landing.standards.validationTitle'),
      body: t('referral.landing.standards.validationBody'),
    },
    {
      title: t('referral.landing.standards.payoutTitle'),
      body: t('referral.landing.standards.payoutBody'),
    },
    {
      title: t('referral.landing.standards.visibilityTitle'),
      body: t('referral.landing.standards.visibilityBody'),
    },
  ];

  const faqs = [
    {
      question: t('referral.landing.faq.q1'),
      answer: t('referral.landing.faq.a1', { minimumOrder }),
    },
    {
      question: t('referral.landing.faq.q2'),
      answer: t('referral.landing.faq.a2', { minimumOrder }),
    },
    {
      question: t('referral.landing.faq.q3'),
      answer: t('referral.landing.faq.a3'),
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,49,49,0.08),_transparent_35%),linear-gradient(180deg,#fffaf7_0%,#ffffff_42%,#f8fafc_100%)] py-12 dark:bg-gray-950">
        <Container>
          <div className="mx-auto max-w-6xl space-y-10">
            <section className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white/90 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 md:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:items-end">
                <div className="space-y-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-red-600">
                    {t('referral.landing.hero.eyebrow')}
                  </p>
                  <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 md:text-5xl">
                    {t('referral.landing.hero.title')}
                  </h1>
                  <p className="max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                    {t('referral.landing.hero.subtitle', { minimumOrder })}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="lg">
                      <Link href="/customer/referrals/">{t('referral.landing.hero.primaryCta')}</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/products/">{t('referral.landing.hero.secondaryCta')}</Link>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('referral.landing.hero.note')}
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-3xl bg-brand-red-600 p-6 text-white">
                    <p className="text-3xl font-bold">{t('referral.landing.hero.stat1Title')}</p>
                    <p className="mt-2 text-sm leading-6 text-red-50">
                      {t('referral.landing.hero.stat1Body', { minimumOrder })}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                      <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                        {t('referral.landing.hero.stat2Title')}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {t('referral.landing.hero.stat2Body')}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                      <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                        {t('referral.landing.hero.stat3Title')}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {t('referral.landing.hero.stat3Body')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.75rem] border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-lg font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                    {index + 1}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {step.body}
                  </p>
                </article>
              ))}
            </section>

            <section className="rounded-[2rem] border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 md:p-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                  {t('referral.landing.standards.title')}
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  {t('referral.landing.standards.intro')}
                </p>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {standards.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                  {t('referral.landing.faq.title')}
                </h2>
                <div className="mt-6 space-y-5">
                  {faqs.map((item) => (
                    <article
                      key={item.question}
                      className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {item.question}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                        {item.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="rounded-[2rem] bg-gray-900 p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-300">
                  {t('referral.landing.hero.eyebrow')}
                </p>
                <h2 className="mt-4 text-3xl font-bold">
                  {t('referral.landing.cta.title')}
                </h2>
                <p className="mt-4 text-base leading-8 text-gray-300">
                  {t('referral.landing.cta.body')}
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/customer/referrals/">{t('referral.landing.cta.button')}</Link>
                  </Button>
                </div>
              </aside>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
}
