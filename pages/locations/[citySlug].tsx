import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { getCityBySlug } from '../../src/data/locations';
import { CityPageTemplate } from '../../src/components/sections/locations/createCityPage';

export type CityPageProps = {
  citySlug: string;
};

const CityPage = ({ citySlug }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <CityPageTemplate citySlug={citySlug} />
);

// Top 50 Canadian cities by population - pre-rendered at build time for SEO
const HIGH_PRIORITY_CITY_SLUGS = [
  'toronto',
  'montreal',
  'calgary',
  'edmonton',
  'ottawa',
  'winnipeg',
  'mississauga',
  'vancouver',
  'brampton',
  'scarborough',
  'hamilton',
  'quebec-city',
  'halifax',
  'laval',
  'london',
  'markham',
  'vaughan',
  'gatineau',
  'saskatoon',
  'kitchener',
  'longueuil',
  'windsor',
  'regina',
  'oakville',
  'richmond-hill',
  'burlington',
  'oshawa',
  'barrie',
  'kelowna',
  'guelph',
  'victoria',
  'argentia',
  'baddeck',
  'bancroft',
  'banff',
  'barkerville',
  'bathurst',
  'batoche',
  'belleville',
  'bonavista',
  'borden',
  'brandon',
  'brantford',
  'brockville',
  'brooks',
  'burnaby',
  'cambridge',
  'campbell-river',
  'caraquet',
  'cavendish',
];

export const getStaticPaths: GetStaticPaths = async () => {
  // Import all cities function to pre-render ALL pages at build time
  const { getAllCities } = await import('../../src/data/locations');
  const allCities = getAllCities();
  const locales = ['en', 'fr', 'zh'];

  // Generate paths for ALL cities across ALL locales to eliminate SSR blocking
  const paths = locales.flatMap((locale) =>
    allCities.map((city) => ({
      params: { citySlug: city.slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false, // All pages pre-rendered = instant TTFB
  };
};

export const getStaticProps: GetStaticProps<CityPageProps> = async ({ params }) => {
  const slug = typeof params?.citySlug === 'string' ? params.citySlug : null;

  if (!slug) {
    return { notFound: true };
  }

  const city = getCityBySlug(slug);

  if (!city) {
    return { notFound: true };
  }

  return {
    props: {
      citySlug: city.slug,
    },
    revalidate: 3600, // 1 hour ISR (was 24h) for faster content updates
  };
};

export default CityPage;
