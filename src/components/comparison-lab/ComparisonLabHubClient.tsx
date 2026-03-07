'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Beaker, NotebookPen, Scale, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/container';
import type { Locale } from '@/i18n/config';
import {
  COMPARISON_ENTRIES,
  COMPARISON_LAB_BASE_PATH,
  COMPARISON_LAB_METHODOLOGY_PATH,
  getComparisonPath,
} from '@/lib/comparison-lab/data';
import { localizePath } from '@/lib/i18n/locale-path';

type CardCopy = {
  title?: string;
  description?: string;
};

type StandardCopy = {
  title?: string;
  description?: string;
};

type FAQCopy = {
  question?: string;
  answer?: string;
};

function asRecord(value: unknown): Record<string, any> {
  return typeof value === 'object' && value !== null ? (value as Record<string, any>) : {};
}

function formatDate(value: string, locale: Locale): string {
  return new Date(value).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function asObjectArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export default function ComparisonLabHubClient() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const comparisonLab = asRecord(t.raw('comparisonLab'));
  const shared = asRecord(comparisonLab.shared);
  const intentLabels = asRecord(shared.intentLabels) as Record<string, string>;
  const hub = asRecord(comparisonLab.hub);
  const methodologyHref = localizePath(COMPARISON_LAB_METHODOLOGY_PATH, locale);
  const comparisonTypes = asRecord(hub.comparisonTypes);
  const featured = asRecord(hub.featured);
  const standardsSection = asRecord(hub.standards);
  const hero = asRecord(hub.hero);
  const metricsCopy = asRecord(hub.metrics);
  const comparisonCards = asObjectArray<CardCopy>(comparisonTypes.cards);
  const standards = asObjectArray<StandardCopy>(standardsSection.items);
  const faqs = asObjectArray<FAQCopy>(hub.faq);
  const evidenceCount = COMPARISON_ENTRIES.reduce((sum, entry) => sum + entry.evidence.length, 0);

  const metrics = [
    {
      value: String(COMPARISON_ENTRIES.length).padStart(2, '0'),
      label: metricsCopy.templatesLabel,
    },
    {
      value: String(standards.length).padStart(2, '0'),
      label: metricsCopy.standardsLabel,
    },
    {
      value: String(evidenceCount).padStart(2, '0'),
      label: metricsCopy.evidenceLabel,
    },
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffdf7_0%,#f7f4ec_45%,#fffaf1_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_48%,#020617_100%)]">
      <section className="border-b border-black/5 dark:border-white/10">
        <Container className="py-16 md:py-20">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff3131]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#9f1c1c] shadow-sm dark:border-[#ff6b6b]/20 dark:bg-white/5 dark:text-[#ffb0b0]">
              <Beaker className="h-4 w-4" />
              {hero.eyebrow}
            </div>
            <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={methodologyHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff3131] px-6 py-3 font-semibold text-white transition hover:bg-[#df2525]"
              >
                {hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={localizePath(COMPARISON_LAB_BASE_PATH, locale)}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:border-slate-500 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-500"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-black/5 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-3xl font-bold text-slate-950 dark:text-white">{metric.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {typeof metric.label === 'string' ? metric.label : ''}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
                {comparisonTypes.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                {comparisonTypes.title}
              </h2>
            </div>
            <Link
              href={methodologyHref}
              className="hidden text-sm font-semibold text-slate-700 underline-offset-4 hover:underline dark:text-slate-300 md:inline-flex"
            >
              {comparisonTypes.methodologyLinkLabel}
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {comparisonCards.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-4 inline-flex rounded-full bg-slate-950/5 p-3 text-slate-900 dark:bg-white/10 dark:text-white">
                  {index === 0 && <Scale className="h-5 w-5" />}
                  {index === 1 && <NotebookPen className="h-5 w-5" />}
                  {index === 2 && <ShieldCheck className="h-5 w-5" />}
                </div>
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
                {featured.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
                {featured.description}
              </p>
            </div>
            <Link
              href={methodologyHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 underline-offset-4 hover:underline dark:text-slate-300"
            >
              {featured.methodologyLinkLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {COMPARISON_ENTRIES.map((entry) => {
              const pages = asRecord(comparisonLab.pages);
              const pageCopy = asRecord(pages[entry.translationKey]);
              const comparisonHref = localizePath(getComparisonPath(entry.slug), locale);

              return (
                <article
                  key={entry.slug}
                  className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#0f172a]"
                >
                  <div className="border-b border-black/5 bg-[linear-gradient(135deg,#fff3ec_0%,#fffdf8_100%)] px-6 py-5 dark:border-white/10 dark:bg-[linear-gradient(135deg,#1e293b_0%,#0f172a_100%)]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-slate-950/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:bg-white/10 dark:text-slate-200">
                        {intentLabels[entry.intent]}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {shared.updatedLabel} {formatDate(entry.updatedAt, locale)}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">
                      {pageCopy.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {pageCopy.summary}
                    </p>
                  </div>
                  <div className="px-6 py-5">
                    <div className="space-y-3">
                      {asObjectArray<string>(pageCopy.quickPoints).slice(0, 2).map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300"
                        >
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff3131]" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={comparisonHref}
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-slate-950 transition group-hover:text-[#ff3131] dark:text-white dark:group-hover:text-[#ff8b8b]"
                    >
                      {featured.openTemplateLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-black/5 bg-white/70 py-16 dark:border-white/10 dark:bg-white/5">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
                {standardsSection.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                {standardsSection.title}
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                {standardsSection.description}
              </p>
              <Link
                href={methodologyHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-500"
              >
                {standardsSection.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4">
              {standards.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="rounded-3xl border border-black/5 bg-white px-6 py-5 dark:border-white/10 dark:bg-[#111827]"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    0{index + 1}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-4xl">
          <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
                {hub.faqEyebrow}
              </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {shared.faqTitle}
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-3xl border border-black/5 bg-white px-6 py-5 dark:border-white/10 dark:bg-[#111827]"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950 dark:text-white">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
