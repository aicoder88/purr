import type { Metadata } from 'next';
import Link from 'next/link';
import { editorialEntities } from '@/lib/editorial/entities';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About the Purrify Editorial and Review Teams',
  description:
    'Meet the public organization-level entities behind Purrify articles, scientific claim review, and internal testing standards.',
  alternates: {
    canonical: `${SITE_URL}/about/team/`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/about/team/`,
    title: 'About the Purrify Editorial and Review Teams',
    description:
      'Meet the public organization-level entities behind Purrify articles, scientific claim review, and internal testing standards.',
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About the Purrify Editorial and Review Teams',
  url: `${SITE_URL}/about/team/`,
  description:
    'Public overview of the organization-level author and reviewer entities used across Purrify articles.',
};

export default function AboutTeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red-600">
            About / Team
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-gray-900 dark:text-gray-50">
            Public entities behind our articles
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
            We use organization-level author and reviewer pages unless we can support a real public individual
            profile. These pages explain who owns editorial work, claim review, and internal testing across the
            site.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {editorialEntities.map((entity) => (
            <article
              key={entity.slug}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-sm font-semibold text-brand-red-600">{entity.publicLabel}</p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-50">{entity.name}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">{entity.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {entity.scope.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                href={entity.canonicalPath}
                className="mt-6 inline-flex text-sm font-semibold text-brand-red-600 hover:text-brand-red-700"
              >
                View entity page
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Policies</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700 dark:text-gray-300">
            Our editorial policy explains how articles are written, updated, corrected, and attributed. Our
            testing policy explains how we describe internal testing and where we draw the line between internal
            observations, cited sources, and product claims.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link href="/about/editorial-policy" className="text-sm font-semibold text-brand-red-600 hover:text-brand-red-700">
              Read the editorial policy
            </Link>
            <Link href="/about/testing-policy" className="text-sm font-semibold text-brand-red-600 hover:text-brand-red-700">
              Read the testing policy
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
