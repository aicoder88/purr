import type { GetStaticProps } from 'next';
import { ProvincePageTemplate } from '../../src/components/sections/locations/ProvincePageTemplate';

export type ProvincePageProps = {
    provinceSlug: string;
};

const NorthwestTerritoriesPage = ({ provinceSlug }: ProvincePageProps) => (
    <ProvincePageTemplate provinceSlug={provinceSlug} />
);

export const getStaticProps: GetStaticProps<ProvincePageProps> = async () => {
    return {
        props: {
            provinceSlug: 'nt',
        },
        revalidate: 60 * 60 * 24, // 24 hours
    };
};

export default NorthwestTerritoriesPage;
