import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import type { Locale } from '@/i18n/config';
import type {
  CanonicalCategorySlug,
  CanonicalTagSlug,
  TaxonomyHubData,
  TaxonomyKind,
} from '@/lib/blog/taxonomy';
import {
  getTaxonomyFaq,
  getTaxonomyIntro,
  getTaxonomyTerm,
  getTaxonomyUi,
} from '@/translations/blog-taxonomy';

interface TaxonomyHubPageProps {
  locale: Locale;
  hub: TaxonomyHubData;
}

const getBlogBasePath = (locale: Locale) => (
  locale === 'en' ? '/blog' : `/${locale}/blog`
);

const formatPublishedDate = (dateString: string, locale: Locale) => {
  const parsedDate = new Date(dateString);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsedDate);
};

function ArticleCard({
  locale,
  href,
  imageUrl,
  imageAlt,
  title,
  excerpt,
  publishDate,
  readingTime,
  ctaLabel,
  readTimeLabel,
}: {
  locale: Locale;
  href: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readingTime: number;
  ctaLabel: string;
  readTimeLabel: string;
}) {
  const fallbackImage = '/optimized/blog/cat-litter-hero.webp';

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={imageUrl || fallbackImage}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatPublishedDate(publishDate, locale)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {readingTime} {readTimeLabel}
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-gray-900 dark:text-white">
            <Link href={href} className="hover:text-[#FF3131]">
              {title}
            </Link>
          </h2>
          <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
            {excerpt}
          </p>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF3131] transition-colors hover:text-[#d62929]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function TaxonomyLinkList({
  locale,
  kind,
  title,
  items,
}: {
  locale: Locale;
  kind: TaxonomyKind;
  title: string;
  items: Array<{ slug: CanonicalCategorySlug | CanonicalTagSlug; count: number }>;
}) {
  if (items.length === 0) {
    return null;
  }

  const basePath = getBlogBasePath(locale);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="font-heading text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {items.map((item) => {
          const term = getTaxonomyTerm(locale, kind, item.slug);
          const href = `${basePath}/${kind === 'category' ? 'category' : 'tag'}/${item.slug}`;

          return (
            <Link
              key={`${kind}-${item.slug}`}
              href={href}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[#FF3131] hover:text-[#FF3131] dark:border-gray-700 dark:text-gray-200"
            >
              {term.label} ({item.count})
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function TaxonomyHubPage({ locale, hub }: TaxonomyHubPageProps) {
  const ui = getTaxonomyUi(locale);
  const term = getTaxonomyTerm(locale, hub.kind, hub.slug);
  const intro = getTaxonomyIntro(locale, hub.kind, hub.slug, hub.posts.length);
  const faq = getTaxonomyFaq(locale, hub.kind, hub.slug, hub.posts.length);
  const basePath = getBlogBasePath(locale);
  const blogLabel = locale === 'fr' ? 'Blog' : 'Blog';
  const keyGuides = hub.posts.slice(0, 5);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFFF5] via-white to-[#F7FAF3] dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <section className="border-b border-gray-200/80 py-14 dark:border-gray-800">
        <Container>
          <div className="mx-auto max-w-5xl">
            <Link
              href={basePath}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#FF3131] dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              {ui.backToBlog}
            </Link>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-[#EAF4D8] px-4 py-1 font-semibold text-[#31511E] dark:bg-green-900/30 dark:text-green-200">
                  {hub.kind === 'category' ? ui.categoryEyebrow : ui.tagEyebrow}
                </span>
                <span className="rounded-full border border-gray-200 px-4 py-1 text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  {ui.articleCount(hub.posts.length)}
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                  {blogLabel}
                </p>
                <h1 className="font-heading text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  {term.label}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                  {term.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {intro.map((paragraph) => (
                  <div
                    key={paragraph}
                    className="rounded-3xl border border-gray-200 bg-white/80 p-6 text-base leading-7 text-gray-700 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-200"
                  >
                    {paragraph}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-6xl space-y-14">
            <div className="space-y-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-heading text-3xl font-semibold text-gray-900 dark:text-white">
                    {ui.featuredTitle}
                  </h2>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {hub.featuredPosts.map((post) => (
                  <ArticleCard
                    key={post.slug}
                    locale={locale}
                    href={`${basePath}/${post.slug}`}
                    imageUrl={post.featuredImage?.url || '/optimized/blog/cat-litter-hero.webp'}
                    imageAlt={post.featuredImage?.alt || post.title}
                    title={post.title}
                    excerpt={post.excerpt}
                    publishDate={post.publishDate}
                    readingTime={post.readingTime}
                    ctaLabel={ui.readArticle}
                    readTimeLabel={ui.minRead}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
              <div className="space-y-6">
                <h2 className="font-heading text-3xl font-semibold text-gray-900 dark:text-white">
                  {ui.latestTitle}
                </h2>

                {hub.remainingPosts.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                    {ui.latestEmpty}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {hub.remainingPosts.map((post) => (
                      <article
                        key={post.slug}
                        className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                      >
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatPublishedDate(post.publishDate, locale)}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {post.readingTime} {ui.minRead}
                          </span>
                        </div>

                        <div className="mt-4 space-y-3">
                          <h3 className="font-heading text-2xl font-semibold text-gray-900 dark:text-white">
                            <Link href={`${basePath}/${post.slug}`} className="hover:text-[#FF3131]">
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                            {post.excerpt}
                          </p>
                          <Link
                            href={`${basePath}/${post.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF3131] transition-colors hover:text-[#d62929]"
                          >
                            {ui.readArticle}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              <aside className="space-y-6">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                  <h2 className="font-heading text-xl font-semibold text-gray-900 dark:text-white">
                    {ui.keyGuidesTitle}
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {keyGuides.map((post) => (
                      <li key={`guide-${post.slug}`}>
                        <Link
                          href={`${basePath}/${post.slug}`}
                          className="group block rounded-2xl bg-gray-50 px-4 py-4 transition-colors hover:bg-[#FFF2F2] dark:bg-gray-800 dark:hover:bg-gray-800/80"
                        >
                          <div className="text-base font-semibold text-gray-900 group-hover:text-[#FF3131] dark:text-white">
                            {post.title}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {formatPublishedDate(post.publishDate, locale)}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <TaxonomyLinkList
                  locale={locale}
                  kind="category"
                  title={ui.relatedCategoriesTitle}
                  items={hub.relatedCategories}
                />

                <TaxonomyLinkList
                  locale={locale}
                  kind="tag"
                  title={ui.relatedTagsTitle}
                  items={hub.relatedTags}
                />
              </aside>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="font-heading text-3xl font-semibold text-gray-900 dark:text-white">
                {ui.faqTitle}
              </h2>
              <div className="mt-6 space-y-4">
                {faq.map((item) => (
                  <details
                    key={item.question}
                    className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 open:bg-white dark:border-gray-700 dark:bg-gray-800 dark:open:bg-gray-900"
                  >
                    <summary className="cursor-pointer list-none text-lg font-semibold text-gray-900 dark:text-white">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
