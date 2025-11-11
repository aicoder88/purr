import { GetServerSideProps } from 'next';

/**
 * Redirect /customers/case-studies to /case-studies
 * This maintains SEO and prevents 404s
 */
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    redirect: {
      destination: locale === 'fr' ? '/fr/case-studies' : '/case-studies',
      permanent: true, // 301 redirect
    },
  };
};

export default function CaseStudies() {
  return null;
}
