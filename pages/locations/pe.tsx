import type { GetStaticProps } from 'next';
import { ProvincePageTemplate } from '../../src/components/sections/locations/ProvincePageTemplate';

export type ProvincePageProps = {
  provinceSlug: string;
};

const PrinceEdwardIslandPage = ({ provinceSlug }: ProvincePageProps) => (
  <ProvincePageTemplate provinceSlug={provinceSlug} />
);

export const getStaticProps: GetStaticProps<ProvincePageProps> = async () => {
  return {
    props: {
      provinceSlug: 'pe',
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default PrinceEdwardIslandPage;
