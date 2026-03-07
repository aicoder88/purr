import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  buildEditorialEntitySchema,
  editorialEntities,
  getEditorialEntityBySlug,
  getEditorialEntityUrl,
} from '@/lib/editorial/entities';
import { SITE_URL } from '@/lib/constants';

interface EditorialEntityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return editorialEntities.map((entity) => ({ slug: entity.slug }));
}

export async function generateMetadata({ params }: EditorialEntityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEditorialEntityBySlug(slug);

  if (!entity) {
    return {};
  }

  return {
    title: `${entity.name} | Purrify About`,
    description: entity.description,
    alternates: {
      canonical: getEditorialEntityUrl(entity),
    },
    openGraph: {
      type: 'profile',
      url: getEditorialEntityUrl(entity),
      title: `${entity.name} | Purrify About`,
      description: entity.description,
    },
  };
}

export default async function EditorialEntityPage({ params }: EditorialEntityPageProps) {
  const { slug } = await params;
  const entity = getEditorialEntityBySlug(slug);

  if (!entity) {
    notFound();
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: entity.profileTitle,
        url: getEditorialEntityUrl(entity),
        description: entity.description,
      },
      {
        ...buildEditorialEntitySchema(entity),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/about/team" className="text-sm font-semibold text-brand-red-600 hover:text-brand-red-700">
          Back to team overview
        </Link>

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red-600">{entity.publicLabel}</p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-gray-900 dark:text-gray-50">
            {entity.profileTitle}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-200">{entity.profileIntro}</p>
          <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">{entity.description}</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <section className="rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Scope</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
              {entity.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Responsibilities</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
              {entity.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Evidence standards</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
              {entity.evidenceStandards.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Related policies</h2>
          <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
            Attribution is only useful if the process behind it is clear. These policies explain how we assign
            bylines, when technical claims are reviewed, and how we describe internal testing.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link href="/about/editorial-policy" className="text-sm font-semibold text-brand-red-600 hover:text-brand-red-700">
              Editorial policy
            </Link>
            <Link href="/about/testing-policy" className="text-sm font-semibold text-brand-red-600 hover:text-brand-red-700">
              Testing policy
            </Link>
            <Link href={`${SITE_URL}${entity.canonicalPath}`} className="text-sm font-semibold text-brand-red-600 hover:text-brand-red-700">
              Canonical URL
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
