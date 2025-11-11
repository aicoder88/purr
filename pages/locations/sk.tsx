import type { GetStaticProps } from 'next';
import { ProvincePageTemplate } from '../../src/components/sections/locations/ProvincePageTemplate';

export type ProvincePageProps = {
  provinceSlug: string;
};

const SaskatchewanPage = ({ provinceSlug }: ProvincePageProps) => (
  <ProvincePageTemplate provinceSlug={provinceSlug} />
);

export const getStaticProps: GetStaticProps<ProvincePageProps> = async () => {
  return {
    props: {
      provinceSlug: 'sk',
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default SaskatchewanPage;
