import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo/page-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Testing Policy | Purrify',
  description:
    'How Purrify describes internal testing, performance observations, limitations, and evidence boundaries in public content.',
  path: '/about/testing-policy/',
  image: `${SITE_URL}/optimized/marketing/mission.webp`,
  imageAlt: 'Purrify testing policy',
  openGraphType: 'article',
  lastModified: '2026-03-08',
});

const testingPolicySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Testing Policy',
  url: `${SITE_URL}/about/testing-policy/`,
  description:
    'How Purrify describes internal testing, performance observations, limitations, and evidence boundaries in public content.',
};

export default function TestingPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testingPolicySchema) }}
      />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red-600">About / Policy</p>
        <h1 className="mt-4 font-heading text-4xl font-bold text-gray-900 dark:text-gray-50">
          Testing policy
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-200">
          Purrify may reference internal testing, household observations, and source-backed evidence in article
          copy. This page explains how we describe those inputs so readers can tell what was internally tested,
          what comes from cited sources, and what should be treated as product guidance rather than independent
          scientific proof.
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">What we mean by internal testing</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>Internal testing refers to tests, observations, or comparisons documented by Purrify rather than by an independent outside lab.</li>
              <li>Internal testing can include odor-control observations, product handling checks, litter compatibility checks, and claim documentation.</li>
              <li>Internal testing is not presented as peer-reviewed publication or third-party certification unless that is explicitly stated.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">How we describe results</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>We describe the test context as narrowly as possible and avoid turning a single condition into a universal promise.</li>
              <li>When a result depends on litter type, airflow, maintenance cadence, cat count, or other environmental variables, that limitation should be acknowledged.</li>
              <li>We do not present internal observations as veterinary diagnosis, health outcomes, or guaranteed household performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">How testing connects to published articles</h2>
            <p className="mt-3 text-base leading-7 text-gray-700 dark:text-gray-300">
              Testing-backed content may be attributed to the <Link href="/about/team/purrify-research-lab" className="text-brand-red-600 hover:text-brand-red-700">Purrify Research Lab</Link> or reviewed by the <Link href="/about/team/purrify-science-team" className="text-brand-red-600 hover:text-brand-red-700">Purrify Science Team</Link>. When that review relationship is attached to an article, the relevant public entity and date can be shown directly on the page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">What this policy does not claim</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>This policy does not claim third-party validation where none is shown.</li>
              <li>This policy does not convert company content into veterinary, medical, or regulatory advice.</li>
              <li>This policy does not replace the need for visible citations, attribution, or article-level update dates.</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
