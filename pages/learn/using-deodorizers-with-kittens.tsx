import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import Image from 'next/image';
import { useTranslation } from '../../src/lib/translation-context';
import { generateJSONLD } from '../../src/lib/seo-utils';
import { formatProductPrice } from '../../src/lib/pricing';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';
import { Container } from '../../src/components/ui/container';

export default function UsingDeodorizersWithKittensLearn() {
  const { locale } = useTranslation();
  const pageTitle = 'Using Cat Litter Deodorizers with Kittens: A Care Guide';
  const pageDescription = 'Guidance on introducing fragrance-free, activated carbon deodorizers around kittens: considerations, timing, and how to minimize exposure.';

  // Unique images for kitten safety guide - focused on young cats
  const heroImage = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=80'; // Adorable kitten
  const sectionImage1 = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1600&q=80'; // Kittens playing safely
  const solutionImage = 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1600&q=80'; // Happy kitten with owner

  // Use enhanced SEO hook
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/learn/using-deodorizers-with-kittens',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter deodorizer kittens',
    schemaType: 'article',
    schemaData: {
      type: 'Article',
      title: pageTitle,
      description: pageDescription,
      author: 'Purrify',
      datePublished: '2024-01-15',
      dateModified: new Date().toISOString().split('T')[0],
      image: heroImage,
    },
    includeBreadcrumb: true,
  });

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJSONLD(schema) }}
        />
      )}

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center text-sm">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
              {breadcrumb?.items?.slice(1).map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                  ) : (
                    <Link href={item.path} className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                      {item.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Container>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">{pageTitle}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Expert-informed guidance on using fragrance-free deodorizers around kittens — what to consider,
            what to avoid, and how to protect your young cat's comfort.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          {/* Hero Image - Adorable Kitten */}
          <div className="mb-8">
            <Image
              src={heroImage}
              alt="Adorable kitten in safe, clean environment"
              width={800}
              height={600}
              className="w-full aspect-[4/3] object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 dark:border-green-400 p-6 mb-8">
            <h2 className="font-heading text-2xl font-semibold text-green-900 dark:text-green-100 mb-3">Quick Answer</h2>
            <p className="text-green-800 dark:text-green-200 mb-4">
              <strong>Many households introduce fragrance-free, activated carbon deodorizers once kittens reliably use the litter box (typically ~8+ weeks).</strong>
              Avoid products with synthetic fragrances or strong chemicals. Introduce gradually and monitor.
            </p>
            <div className="text-sm text-green-700 dark:text-green-300">
              <strong>Typical age:</strong> Around 8+ weeks when kittens reliably use litter boxes independently.
            </div>
          </div>

          {/* Kittens Playing Safely Image */}
          <div className="mb-8">
            <Image
              src={sectionImage1}
              alt="Young kittens playing safely in clean household environment"
              width={600}
              height={400}
              className="w-full aspect-[3/2] object-cover rounded-lg shadow-md"
            />
          </div>

          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mt-12 mb-6">What to Consider</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
            <li>Start with small amounts; increase gradually if well-tolerated</li>
            <li>Choose fragrance-free, low-dust options</li>
            <li>Monitor behavior and litter box habits for 24–48 hours</li>
          </ul>

          {/* Happy Kitten with Owner Image */}
          <div className="mb-8">
            <Image
              src={solutionImage}
              alt="Happy kitten with caring owner in safe home environment"
              width={600}
              height={400}
              className="w-full aspect-[3/2] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-lg p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Odor Control Around Kittens</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Purrify's fragrance-free, activated carbon formula is the same type of carbon used in many water and air filters.
              Introduce gradually and monitor for comfort.
            </p>
            <div className="space-x-4">
              <Link href="/products/trial-size" className="inline-block bg-green-600 dark:bg-green-600 text-white dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-700 transition-colors">
                {`Try Fragrance-Free Formula - ${formatProductPrice('trial', locale)}`}
              </Link>
              <Link href="/learn/how-it-works" className="inline-block border border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                How It Works
              </Link>
            </div>
          </div>
        </div>
        
          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <RelatedArticles currentPath="/learn/using-deodorizers-with-kittens" />
          </div>
        </article>
      </main>
    </>
  );
}
