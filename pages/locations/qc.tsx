import type { GetStaticProps } from 'next';
import { ProvincePageTemplate } from '../../src/components/sections/locations/ProvincePageTemplate';

export type ProvincePageProps = {
  provinceSlug: string;
};

const QuebecPage = ({ provinceSlug }: ProvincePageProps) => (
  <ProvincePageTemplate provinceSlug={provinceSlug} />
);

export const getStaticProps: GetStaticProps<ProvincePageProps> = async () => {
  return {
    props: {
      provinceSlug: 'qc',
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default QuebecPage;
