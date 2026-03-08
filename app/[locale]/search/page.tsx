import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Compass, Search, Sparkles } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { defaultLocale, isValidLocale, locales, type Locale } from '@/i18n/config';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import {
  getSearchExperience,
  getSearchHref,
  getSearchSummaryCopy,
} from '@/lib/search/site-search';
import { getTranslation } from '@/translations';

interface LocalizedSearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}

function getQueryValue(input?: string | string[]) {
  if (Array.isArray(input)) {
    return input[0];
  }

  return input;
}

function getCanonicalPath(locale: Locale, query: string) {
  const basePath = locale === 'fr' ? '/fr/search/' : '/search/';
  if (!query) {
    return `${SITE_URL}${basePath}`;
  }

  return `${SITE_URL}${basePath}?q=${encodeURIComponent(query)}`;
}

export async function generateStaticParams() {
  return locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
  searchParams,
}: LocalizedSearchPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const resolvedQuery = getQueryValue((await searchParams).q) ?? '';
  const experience = await getSearchExperience(locale, resolvedQuery);
  const canonical = getCanonicalPath(locale, experience.query);
  const querySuffix = experience.query ? `?q=${encodeURIComponent(experience.query)}` : '';
  const title = experience.query
    ? `${experience.copy.resultsFor} "${experience.query}" | ${SITE_NAME}`
    : `${experience.copy.title} | ${SITE_NAME}`;
  const description = experience.query
    ? `${experience.copy.resultsFor} "${experience.query}". ${getSearchSummaryCopy(experience)}.`
    : experience.copy.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/search/${querySuffix}`,
        'fr-CA': `${SITE_URL}/fr/search/${querySuffix}`,
        'x-default': `${SITE_URL}/search/${querySuffix}`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title,
      description,
      images: [`${SITE_URL}/optimized/logos/purrify-logo.png`],
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocalizedSearchPage({
  params,
  searchParams,
}: LocalizedSearchPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const translation = getTranslation(locale);
  const resolvedQuery = getQueryValue((await searchParams).q) ?? '';
  const experience = await getSearchExperience(locale, resolvedQuery);
  const summaryCopy = experience.query ? getSearchSummaryCopy(experience) : null;
  const baseSearchPath = locale === 'fr' ? '/fr/search' : '/search';
  const pageUrl = getCanonicalPath(locale, experience.query);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: translation.nav.home,
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: experience.copy.title,
        item: pageUrl,
      },
    ],
  };

  const searchPageSchema = {
    '@context': 'https://schema.org',
    '@type': experience.query ? 'SearchResultsPage' : 'CollectionPage',
    name: experience.query
      ? `${experience.copy.resultsFor} "${experience.query}"`
      : experience.copy.title,
    description: experience.query ? summaryCopy : experience.copy.subtitle,
    url: pageUrl,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
    mainEntity: experience.query
      ? {
        '@type': 'ItemList',
        numberOfItems: experience.results.length,
        itemListElement: experience.results.slice(0, 10).map((result, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_URL}${result.url}`,
          name: result.title,
        })),
      }
      : {
        '@type': 'ItemList',
        numberOfItems: experience.sectionCards.length,
        itemListElement: experience.sectionCards.map((section, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_URL}${section.url}`,
          name: section.title,
        })),
      },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [breadcrumbSchema, searchPageSchema],
          }),
        }}
      />

      <main className="min-h-screen bg-[linear-gradient(180deg,#fffdf7_0%,#fff7ef_36%,#fffdf8_100%)]">
        <section className="border-b border-[#eadfcb] bg-white/80">
          <Container>
            <nav className="flex items-center gap-2 py-4 text-sm text-gray-600">
              <Link href={locale === 'fr' ? '/fr/' : '/'} className="hover:text-[#ff3131] transition-colors">
                {translation.nav.home}
              </Link>
              <span>/</span>
              <span className="font-medium text-gray-900">{experience.copy.title}</span>
            </nav>
          </Container>
        </section>

        <section className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,49,49,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(3,228,106,0.12),transparent_34%)]" />
          <Container>
            <div className="relative mx-auto max-w-5xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd7d1] bg-white px-4 py-2 text-sm font-semibold text-[#d92a2a] shadow-sm">
                <Sparkles className="h-4 w-4" />
                {experience.copy.eyebrow}
              </div>

              <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                {experience.copy.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-gray-700 md:text-xl">
                {experience.copy.subtitle}
              </p>

              <form
                action={baseSearchPath}
                method="get"
                className="mt-10 rounded-[28px] border border-[#eadfcb] bg-white p-4 shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
              >
                <label htmlFor="site-search-input" className="sr-only">
                  {experience.copy.searchLabel}
                </label>
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#f1e5d6] bg-[#fffaf4] px-4">
                    <Search className="h-5 w-5 text-gray-500" />
                    <input
                      id="site-search-input"
                      name="q"
                      defaultValue={experience.query}
                      placeholder={experience.copy.searchPlaceholder}
                      className="h-14 w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#ff3131] px-6 text-base font-semibold text-white transition hover:bg-[#e12828]"
                  >
                    {experience.copy.searchButton}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                  {experience.copy.quickQueriesTitle}
                </p>
                <div className="flex flex-wrap gap-3">
                  {experience.relatedQueries.map((query) => (
                    <Link
                      key={query}
                      href={getSearchHref(locale, query)}
                      className="rounded-full border border-[#e8ddcc] bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-[#ffb7ab] hover:text-[#d92a2a]"
                    >
                      {query}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {experience.query ? (
          <section className="pb-20">
            <Container>
              <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col gap-3 border-b border-[#eadfcb] pb-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                      {experience.copy.resultsTitle}
                    </p>
                    <h2 className="mt-2 text-3xl font-heading font-bold text-gray-900">
                      {experience.copy.resultsFor} "{experience.query}"
                    </h2>
                    {summaryCopy ? (
                      <p className="mt-2 text-base text-gray-600">{summaryCopy}</p>
                    ) : null}
                  </div>

                  <Link
                    href={baseSearchPath}
                    className="text-sm font-semibold text-[#d92a2a] transition hover:text-[#b52323]"
                  >
                    {experience.copy.clearSearch}
                  </Link>
                </div>

                {experience.bestAnswer ? (
                  <div className="mb-10 rounded-[30px] border border-[#f0d6a3] bg-[linear-gradient(135deg,#fff7db_0%,#fff1e8_55%,#ffffff_100%)] p-8 shadow-sm">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#9c6c00]">
                      {experience.copy.bestAnswer}
                    </p>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-3xl">
                        <div className="mb-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-700">
                          {experience.copy.documentTypes[experience.bestAnswer.type]}
                        </div>
                        <h3 className="text-3xl font-heading font-bold text-gray-900">
                          {experience.bestAnswer.title}
                        </h3>
                        <p className="mt-4 text-lg leading-8 text-gray-700">
                          {experience.bestAnswer.answer}
                        </p>
                      </div>

                      <Link
                        href={experience.bestAnswer.url}
                        className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
                      >
                        {experience.copy.openPage}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mb-10 rounded-[30px] border border-[#eadfcb] bg-white p-8 shadow-sm">
                    <h3 className="text-2xl font-heading font-bold text-gray-900">
                      {experience.copy.noResultsTitle}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base text-gray-600">
                      {experience.copy.noResultsDescription}
                    </p>
                  </div>
                )}

                {experience.groupedResults.length > 0 ? (
                  <div className="space-y-10">
                    {experience.groupedResults.map((group) => (
                      <div key={group.type}>
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-2xl font-heading font-bold text-gray-900">
                            {group.label}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {group.results.length} {group.label.toLowerCase()}
                          </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          {group.results.map((result) => (
                            <Link
                              key={result.id}
                              href={result.url}
                              className="group rounded-[24px] border border-[#eadfcb] bg-white p-6 transition hover:-translate-y-1 hover:border-[#ffb7ab] hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)]"
                            >
                              <div className="mb-4 inline-flex rounded-full bg-[#fff4ec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#d92a2a]">
                                {experience.copy.documentTypes[result.type]}
                              </div>
                              <h4 className="text-xl font-heading font-bold text-gray-900 transition group-hover:text-[#d92a2a]">
                                {result.title}
                              </h4>
                              <p className="mt-3 line-clamp-4 text-base leading-7 text-gray-600">
                                {result.summary}
                              </p>
                              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                                {experience.copy.openPage}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-14 rounded-[30px] border border-[#eadfcb] bg-[#fffaf4] p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <Compass className="h-5 w-5 text-[#d92a2a]" />
                    <h3 className="text-2xl font-heading font-bold text-gray-900">
                      {experience.copy.browseTitle}
                    </h3>
                  </div>
                  <p className="max-w-2xl text-base text-gray-600">
                    {experience.copy.browseDescription}
                  </p>
                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {experience.sectionCards.map((section) => (
                      <Link
                        key={section.type}
                        href={section.url}
                        className="rounded-[22px] border border-[#eadfcb] bg-white p-5 transition hover:border-[#ffb7ab] hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                              {section.label}
                            </p>
                            <h4 className="mt-2 text-xl font-heading font-bold text-gray-900">
                              {section.title}
                            </h4>
                          </div>
                          <span className="rounded-full bg-[#fff4ec] px-3 py-1 text-sm font-semibold text-[#d92a2a]">
                            {section.count}
                          </span>
                        </div>
                        <p className="mt-3 text-base leading-7 text-gray-600">
                          {section.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        ) : (
          <section className="pb-20">
            <Container>
              <div className="mx-auto max-w-6xl space-y-14">
                <div>
                  <div className="mb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                      {experience.copy.browseTitle}
                    </p>
                    <h2 className="mt-2 text-3xl font-heading font-bold text-gray-900">
                      {experience.copy.browseTitle}
                    </h2>
                    <p className="mt-3 max-w-3xl text-base text-gray-600">
                      {experience.copy.browseDescription}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {experience.sectionCards.map((section) => (
                      <Link
                        key={section.type}
                        href={section.url}
                        className="group rounded-[28px] border border-[#eadfcb] bg-white p-6 transition hover:-translate-y-1 hover:border-[#ffb7ab] hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                              {section.label}
                            </p>
                            <h3 className="mt-2 text-2xl font-heading font-bold text-gray-900 transition group-hover:text-[#d92a2a]">
                              {section.title}
                            </h3>
                          </div>
                          <span className="rounded-full bg-[#fff4ec] px-3 py-1 text-sm font-semibold text-[#d92a2a]">
                            {section.count}
                          </span>
                        </div>
                        <p className="mt-4 text-base leading-7 text-gray-600">
                          {section.summary}
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                          {experience.copy.openPage}
                          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="grid gap-10 xl:grid-cols-[1.15fr,0.85fr]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                      {experience.copy.featuredAnswersTitle}
                    </p>
                    <h2 className="mt-2 text-3xl font-heading font-bold text-gray-900">
                      {experience.copy.featuredAnswersTitle}
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {experience.featuredAnswers.map((answer) => (
                        <Link
                          key={answer.id}
                          href={answer.url}
                          className="rounded-[24px] border border-[#eadfcb] bg-white p-6 transition hover:border-[#ffb7ab] hover:shadow-sm"
                        >
                          <div className="mb-4 inline-flex rounded-full bg-[#fff4ec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#d92a2a]">
                            {experience.copy.documentTypes[answer.type]}
                          </div>
                          <h3 className="text-xl font-heading font-bold text-gray-900">
                            {answer.title}
                          </h3>
                          <p className="mt-3 line-clamp-4 text-base leading-7 text-gray-600">
                            {answer.summary}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                      {experience.copy.recentGuidesTitle}
                    </p>
                    <h2 className="mt-2 text-3xl font-heading font-bold text-gray-900">
                      {experience.copy.recentGuidesTitle}
                    </h2>
                    <div className="mt-6 space-y-4">
                      {experience.recentGuides.map((guide) => (
                        <Link
                          key={guide.id}
                          href={guide.url}
                          className="block rounded-[24px] border border-[#eadfcb] bg-white p-5 transition hover:border-[#ffb7ab] hover:shadow-sm"
                        >
                          <div className="mb-3 inline-flex rounded-full bg-[#fff4ec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#d92a2a]">
                            {experience.copy.documentTypes.blog}
                          </div>
                          <h3 className="text-lg font-heading font-bold text-gray-900">
                            {guide.title}
                          </h3>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                            {guide.summary}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  );
}
