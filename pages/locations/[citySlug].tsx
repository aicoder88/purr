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
const HIGH_PRIORITY_CITY_SLUGS: string[] = [
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
  const paths = HIGH_PRIORITY_CITY_SLUGS
    .map((citySlug) => getCityBySlug(citySlug))
    .filter((city): city is NonNullable<typeof city> => Boolean(city))
    .map((city) => ({ params: { citySlug: city.slug } }));

  return {
    paths,
    fallback: 'blocking',
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
    revalidate: 60 * 60 * 24,
  };
};

export default CityPage;
