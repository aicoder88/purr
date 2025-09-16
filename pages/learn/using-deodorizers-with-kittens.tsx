import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Layout } from '../../src/components/layout/layout';

export default function UsingDeodorizersWithKittensLearn() {
  const pageTitle = 'Using Cat Litter Deodorizers with Kittens: A Care Guide';
  const pageDescription = 'Guidance on introducing fragrance-free, activated carbon deodorizers around kittens: considerations, timing, and how to minimize exposure.';
  const canonicalUrl = 'https://purrify.ca/learn/using-deodorizers-with-kittens';

  return (
    <Layout>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: 'https://purrify.ca/images/kitten-safety.jpg',
              width: 1200,
              height: 630,
              alt: 'Kitten using litter box; guidance for households with young cats',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter deodorizer kittens, kitten litter care, fragrance-free cat deodorizer, activated carbon deodorizer kittens',
          },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">{pageTitle}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Expert-informed guidance on using fragrance-free deodorizers around kittens — what to consider,
            what to avoid, and how to protect your young cat's comfort.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-green-900 dark:text-green-100 mb-3">Quick Answer</h2>
            <p className="text-green-800 dark:text-green-200 mb-4">
              <strong>Many households introduce fragrance-free, activated carbon deodorizers once kittens reliably use the litter box (typically ~8+ weeks).</strong>
              Avoid products with synthetic fragrances or strong chemicals. Introduce gradually and monitor.
            </p>
            <div className="text-sm text-green-700 dark:text-green-300">
              <strong>Typical age:</strong> Around 8+ weeks when kittens reliably use litter boxes independently.
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">What to Consider</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
            <li>Start with small amounts; increase gradually if well-tolerated</li>
            <li>Choose fragrance-free, low-dust options</li>
            <li>Monitor behavior and litter box habits for 24–48 hours</li>
          </ul>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Odor Control Around Kittens</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Purrify's fragrance-free, activated carbon formula is the same type of carbon used in many water and air filters.
              Introduce gradually and monitor for comfort.
            </p>
            <div className="space-x-4">
              <Link href="/products/trial-size" className="inline-block bg-green-600 text-white dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Try Fragrance-Free Formula - $6.99
              </Link>
              <Link href="/learn/how-it-works" className="inline-block border border-green-600 text-green-600 dark:text-green-400 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}

