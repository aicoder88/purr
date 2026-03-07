'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, CalendarClock, Microscope, Scale, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/container';
import type { Locale } from '@/i18n/config';
import { COMPARISON_LAB_BASE_PATH } from '@/lib/comparison-lab/data';
import { localizePath } from '@/lib/i18n/locale-path';

type ItemCopy = {
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

function asObjectArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export default function ComparisonMethodologyPageClient() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const comparisonLab = asRecord(t.raw('comparisonLab'));
  const shared = asRecord(comparisonLab.shared);
  const methodology = asRecord(comparisonLab.methodology);
  const hero = asRecord(methodology.hero);
  const process = asRecord(methodology.process);
  const scoring = asRecord(methodology.scoring);
  const evidence = asRecord(methodology.evidence);
  const updates = asRecord(methodology.updates);
  const exclusions = asRecord(methodology.exclusions);
  const processItems = asObjectArray<ItemCopy>(process.steps);
  const scoringItems = asObjectArray<ItemCopy>(scoring.weights);
  const evidenceItems = asObjectArray<ItemCopy>(evidence.items);
  const updateItems = asObjectArray<ItemCopy>(updates.items);
  const faqItems = asObjectArray<FAQCopy>(methodology.faq);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf2_0%,#f5f7fb_46%,#fffdf8_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_46%,#020617_100%)]">
      <section className="border-b border-black/5 dark:border-white/10">
        <Container className="py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff3131]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#9f1c1c] shadow-sm dark:border-[#ff6b6b]/20 dark:bg-white/5 dark:text-[#ffb0b0]">
              <Microscope className="h-4 w-4" />
              {hero.eyebrow}
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={localizePath(COMPARISON_LAB_BASE_PATH, locale)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff3131] px-6 py-3 font-semibold text-white transition hover:bg-[#df2525]"
              >
                {hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300">
                <CalendarClock className="h-4 w-4" />
                {hero.reviewNote}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
              {process.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {process.title}
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
              {process.description}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processItems.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  0{index + 1}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-black/5 bg-white/70 py-16 dark:border-white/10 dark:bg-white/5">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-black/5 bg-white p-8 dark:border-white/10 dark:bg-[#0f172a]">
              <div className="mb-4 inline-flex rounded-full bg-slate-950/5 p-3 text-slate-900 dark:bg-white/10 dark:text-white">
                <Scale className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
                {scoring.title}
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                {scoring.description}
              </p>
              <div className="mt-6 space-y-4">
                {scoringItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-black/5 bg-slate-50/80 px-5 py-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="font-semibold text-slate-950 dark:text-white">{item.title}</div>
                    <div className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-white p-8 dark:border-white/10 dark:bg-[#0f172a]">
              <div className="mb-4 inline-flex rounded-full bg-slate-950/5 p-3 text-slate-900 dark:bg-white/10 dark:text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
                {evidence.title}
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                {evidence.description}
              </p>
              <div className="mt-6 space-y-4">
                {evidenceItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-black/5 bg-slate-50/80 px-5 py-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="font-semibold text-slate-950 dark:text-white">{item.title}</div>
                    <div className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
                {updates.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                {updates.title}
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                {updates.description}
              </p>
              <div className="mt-6 space-y-4">
                {updateItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-black/5 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#111827]"
                  >
                    <div className="font-semibold text-slate-950 dark:text-white">{item.title}</div>
                    <div className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-[linear-gradient(135deg,#fff4ef_0%,#ffffff_100%)] p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,#172554_0%,#0f172a_100%)]">
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
                {exclusions.title}
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                {exclusions.description}
              </p>
              <ul className="mt-6 space-y-4">
                {asObjectArray<string>(exclusions.items).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-7 text-slate-700 dark:text-slate-300"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff3131]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={localizePath(COMPARISON_LAB_BASE_PATH, locale)}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-slate-950 dark:text-white"
              >
                {exclusions.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container className="max-w-4xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
              {methodology.faqEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {shared.faqTitle as string}
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="rounded-3xl border border-black/5 bg-white px-6 py-5 dark:border-white/10 dark:bg-[#111827]"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950 dark:text-white">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
