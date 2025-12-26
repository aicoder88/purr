import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import {
  Province,
  getProvinceBySlug,
  locationsByProvince,
} from '../../../src/data/locations';

interface ProvincePageProps {
  province: Province;
}

const PROVINCE_DISPLAY_OVERRIDES: Record<string, string> = {
  'Newfoundland and Labrador': 'Newfoundland & Labrador',
};

const ProvincePage = ({ province }: ProvincePageProps) => {
  const router = useRouter();
  const locale = router.locale || 'en';
  const otherProvinces = locationsByProvince.filter(
    (candidateProvince) => candidateProvince.slug !== province.slug
  );

  const displayName = PROVINCE_DISPLAY_OVERRIDES[province.name] ?? province.name;
  const seoTitle = `Cat Litter Odor Control - ${displayName} (${province.code}) | Purrify`;
  const seoDescription = `Discover natural cat litter odor control trusted by cat parents across ${province.name}. Fast shipping across the province with reliable delivery.`;
  const canonicalUrl = `https://www.purrify.ca${locale === 'en' ? '' : `/${locale}`}/locations/province/${province.slug}`;

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          url: canonicalUrl,
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/80 dark:bg-gray-800/70 border border-orange-200 dark:border-orange-500/60 text-xs sm:text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-300">
              Province Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-50">
              Cat Litter Odor Control in {province.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
              Explore town-by-town resources for cat owners throughout {province.name}. Discover where Purrify ships, local retail partners, and tips tailored to your climate.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/products/trial-size"
                className="inline-flex items-center px-6 py-3 font-semibold text-white dark:text-gray-100 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg shadow-lg hover:from-orange-600 hover:to-pink-600 transition"
              >
                Shop Purrify
              </Link>
              <Link
                href="#province-cities"
                className="inline-flex items-center px-6 py-3 font-semibold text-orange-600 dark:text-orange-300 bg-white dark:bg-gray-800/80 border border-orange-200 dark:border-orange-500/50 rounded-lg shadow-sm hover:text-orange-700 dark:hover:text-orange-200 transition"
              >
                View City Guides
              </Link>
            </div>
          </div>
        </section>

        <section id="province-cities" className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-50">
              Cities We Serve in {province.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {province.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="group flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 p-5 transition hover:border-orange-300 dark:hover:border-orange-500/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-50 group-hover:text-orange-600 dark:group-hover:text-orange-300">
                    {city.name}
                  </span>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Learn about odor control solutions in {city.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">
              Explore Other Provinces
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherProvinces.map((candidateProvince) => (
                <Link
                  key={candidateProvince.slug}
                  href={`/locations/province/${candidateProvince.slug}`}
                  className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/70 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition hover:border-orange-300 dark:hover:border-orange-500/70 hover:text-orange-600 dark:hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400"
                >
                  {candidateProvince.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en', 'fr', 'zh'];

  // Pre-render ALL province pages for ALL locales at build time
  const paths = locales.flatMap((locale) =>
    locationsByProvince.map((province) => ({
      params: { provinceSlug: province.slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false, // All pages pre-rendered = instant TTFB
  };
};

export const getStaticProps: GetStaticProps<ProvincePageProps> = async ({ params }) => {
  const provinceSlug = params?.provinceSlug;

  if (typeof provinceSlug !== 'string') {
    return { notFound: true };
  }

  const province = getProvinceBySlug(provinceSlug);

  if (!province) {
    return { notFound: true };
  }

  return {
    props: {
      province,
    },
    revalidate: 3600, // 1 hour ISR (was 24h) for faster content updates
  };
};

export default ProvincePage;
