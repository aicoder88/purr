import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Editorial Policy | Purrify',
  description:
    'How Purrify attributes articles, updates claims, applies internal review, and corrects published content.',
  alternates: {
    canonical: `${SITE_URL}/about/editorial-policy/`,
  },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}/about/editorial-policy/`,
    title: 'Editorial Policy | Purrify',
    description:
      'How Purrify attributes articles, updates claims, applies internal review, and corrects published content.',
  },
};

const editorialPolicySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Editorial Policy',
  url: `${SITE_URL}/about/editorial-policy/`,
  description:
    'How Purrify attributes articles, updates claims, applies internal review, and corrects published content.',
};

export default function EditorialPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(editorialPolicySchema) }}
      />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red-600">About / Policy</p>
        <h1 className="mt-4 font-heading text-4xl font-bold text-gray-900 dark:text-gray-50">
          Editorial policy
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-200">
          Purrify publishes product education, odor-control explainers, and science-oriented articles. This page
          explains how we assign public bylines, when content receives internal review, and how we handle updates
          or corrections.
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Public attribution</h2>
            <p className="mt-3 text-base leading-7 text-gray-700 dark:text-gray-300">
              We use organization-level public entities unless we can support a real public individual profile.
              Articles may be attributed to the <Link href="/about/team/purrify-team" className="text-brand-red-600 hover:text-brand-red-700">Purrify Team</Link>, reviewed by the <Link href="/about/team/purrify-science-team" className="text-brand-red-600 hover:text-brand-red-700">Purrify Science Team</Link>, or tied to internal testing maintained by the <Link href="/about/team/purrify-research-lab" className="text-brand-red-600 hover:text-brand-red-700">Purrify Research Lab</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Writing and review workflow</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>Consumer education and routine updates are prepared by the Purrify Team.</li>
              <li>Articles that make technical, chemistry, performance, or safety claims can be escalated for internal claim review.</li>
              <li>When a page includes a reviewer byline, that reviewer entity is shown directly on the article.</li>
              <li>When an article does not display a reviewer, the article is still subject to ordinary editorial maintenance but is not being represented as independently expert-reviewed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Sources and evidence</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>We prefer attributable primary or technical sources for chemistry, odor-control, and safety claims.</li>
              <li>When internal testing is referenced, we label it as internal testing and avoid presenting it as third-party validation.</li>
              <li>We separate educational content from veterinary, medical, or legal advice.</li>
              <li>Marketing copy should not overstate what a cited source or internal test can actually support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Dates and corrections</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>Published and updated dates are shown on articles where the content system provides them.</li>
              <li>Reviewed dates are shown when a specific public reviewer entity is attached to the article.</li>
              <li>Substantive corrections should update the article content and its visible updated date.</li>
              <li>Minor formatting or link changes may not change the visible published date, but substantive refreshes should.</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
