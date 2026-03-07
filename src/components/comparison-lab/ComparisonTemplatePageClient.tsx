'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, CalendarClock, ClipboardList, FlaskConical } from 'lucide-react';
import { ClaimReviewBlock } from '@/components/seo/ClaimReviewBlock';
import { Container } from '@/components/ui/container';
import type { Locale } from '@/i18n/config';
import { SITE_URL } from '@/lib/constants';
import type { ComparisonEntry } from '@/lib/comparison-lab/data';
import { COMPARISON_LAB_BASE_PATH, COMPARISON_LAB_METHODOLOGY_PATH } from '@/lib/comparison-lab/data';
import { localizePath } from '@/lib/i18n/locale-path';

type EvidenceCopy = {
  eyebrow?: string;
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

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function asObjectArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export default function ComparisonTemplatePageClient({ entry }: { entry: ComparisonEntry }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const comparisonLab = asRecord(t.raw('comparisonLab'));
  const shared = asRecord(comparisonLab.shared);
  const intentLabels = asRecord(shared.intentLabels) as Record<string, string>;
  const pages = asRecord(comparisonLab.pages);
  const pageCopy = asRecord(pages[entry.translationKey]);
  const table = asRecord(pageCopy.table);
  const evidence = asRecord(pageCopy.evidence);
  const related = asRecord(pageCopy.related);
  const claimReview = asRecord(pageCopy.claimReview);
  const tableColumns = asStringArray(table.columns);
  const tableRows = asObjectArray<string[]>(table.rows);
  const evidenceCards = asObjectArray<EvidenceCopy>(evidence.items);
  const faqItems = asObjectArray<FAQCopy>(pageCopy.faq);
  const relatedItems = asObjectArray<EvidenceCopy>(related.items);
  const pageHref = localizePath(`${COMPARISON_LAB_BASE_PATH}/${entry.slug}`, locale);
  const methodologyHref = localizePath(COMPARISON_LAB_METHODOLOGY_PATH, locale);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffdf8_0%,#f6f1e8_38%,#fffaf4_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#111827_42%,#020617_100%)]">
      <section className="border-b border-black/5 dark:border-white/10">
        <Container className="py-14 md:py-18">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff3131]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#9f1c1c] shadow-sm dark:border-[#ff6b6b]/20 dark:bg-white/5 dark:text-[#ffb0b0]">
              <FlaskConical className="h-4 w-4" />
              {intentLabels[entry.intent]}
            </div>
            <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-6xl">
              {pageCopy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              {pageCopy.summary}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-black/5 bg-white/90 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{shared.updatedLabel as string}</div>
                <div className="mt-2 font-semibold text-slate-950 dark:text-white">
                  {formatDate(entry.updatedAt, locale)}
                </div>
              </div>
              <div className="rounded-3xl border border-black/5 bg-white/90 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{shared.publishedLabel as string}</div>
                <div className="mt-2 font-semibold text-slate-950 dark:text-white">
                  {formatDate(entry.publishedAt, locale)}
                </div>
              </div>
              <div className="rounded-3xl border border-black/5 bg-white/90 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{shared.reviewCadenceLabel as string}</div>
                <div className="mt-2 font-semibold text-slate-950 dark:text-white">
                  {shared.reviewCadenceValue as string}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#0f172a]">
                <Image
                  src={entry.heroImage}
                  alt={(pageCopy.heroImageAlt as string | undefined) ?? ''}
                  width={1200}
                  height={630}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-black/5 bg-white p-8 dark:border-white/10 dark:bg-[#0f172a]">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                  {shared.quickVerdictTitle as string}
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{pageCopy.verdict}</p>
                <div className="mt-6 space-y-4">
                  {asStringArray(pageCopy.quickPoints).map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7 text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff3131]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-black/5 bg-[linear-gradient(135deg,#fff4ef_0%,#ffffff_100%)] p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,#172554_0%,#0f172a_100%)]">
                <div className="inline-flex rounded-full bg-slate-950/5 p-3 text-slate-900 dark:bg-white/10 dark:text-white">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">
                  {shared.methodologyCalloutTitle as string}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {pageCopy.methodologyCallout}
                </p>
                <Link
                  href={methodologyHref}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-slate-950 dark:text-white"
                >
                  {shared.methodologyLinkLabel as string}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-4">
        <Container className="max-w-4xl">
          <ClaimReviewBlock
            claim={(claimReview.claim as string | undefined) ?? ''}
            rating={entry.claimRating}
            verdict={claimReview.verdict as string | undefined}
            explanation={(claimReview.explanation as string | undefined) ?? ''}
            evidence={asStringArray(claimReview.evidence)}
            includeSchema
            url={`${SITE_URL}${pageHref}/`}
            className="shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
          />
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
              {shared.comparisonTableEyebrow as string}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {table.title}
            </h2>
            <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
              {table.description}
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#0f172a]">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-black/5 bg-slate-50/80 dark:border-white/10 dark:bg-white/5">
                    {tableColumns.map((column) => (
                      <th
                        key={column}
                        className="px-5 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, rowIndex) => (
                    <tr
                      key={`${row.join('-')}-${rowIndex}`}
                      className="border-b border-black/5 last:border-b-0 dark:border-white/10"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${cell}-${cellIndex}`}
                          className={`px-5 py-4 align-top text-sm leading-7 ${
                            cellIndex === 0
                              ? 'font-semibold text-slate-950 dark:text-white'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-black/5 bg-white/70 py-16 dark:border-white/10 dark:bg-white/5">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
                {shared.firstPartyEvidenceEyebrow as string}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                {evidence.title}
              </h2>
              <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
                {evidence.description}
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300 md:inline-flex">
              <CalendarClock className="h-4 w-4" />
              {shared.reviewCadenceValue as string}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {entry.evidence.map((source, index) => {
              const copy = evidenceCards[index] ?? {};
              const href = localizePath(source.href, locale);

              return (
                <article
                  key={`${source.href}-${index}`}
                  className="rounded-[2rem] border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-[#0f172a]"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {copy.eyebrow}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
                    {copy.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {copy.description}
                  </p>
                  <div className="mt-5 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <div>
                      {shared.sourcePublishedLabel as string} {formatDate(source.publishedAt, locale)}
                    </div>
                    {source.updatedAt ? (
                      <div>
                        {shared.sourceUpdatedLabel as string} {formatDate(source.updatedAt, locale)}
                      </div>
                    ) : null}
                  </div>
                  <Link
                    href={href}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-slate-950 dark:text-white"
                  >
                    {shared.openEvidenceLabel as string}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
              {shared.relatedReadingEyebrow as string}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {shared.relatedReadingTitle as string}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {entry.relatedReadings.map((href, index) => {
              const related = relatedItems[index] ?? {};
              const localizedHref = localizePath(href, locale);

              return (
                <article
                  key={`${href}-${index}`}
                  className="rounded-[2rem] border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-[#0f172a]"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {related.eyebrow}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
                    {related.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {related.description}
                  </p>
                  <Link
                    href={localizedHref}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-slate-950 dark:text-white"
                  >
                    {shared.openReadingLabel as string}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container className="max-w-4xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3131] dark:text-[#ff8b8b]">
              {shared.faqEyebrow as string}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {shared.faqTitle as string}
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((faq) => (
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
