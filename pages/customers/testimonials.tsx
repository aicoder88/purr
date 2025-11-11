import { GetServerSideProps } from 'next';

/**
 * Redirect /customers/testimonials to /reviews
 * This maintains SEO and prevents 404s
 */
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    redirect: {
      destination: locale === 'fr' ? '/fr/reviews' : '/reviews',
      permanent: true, // 301 redirect
    },
  };
};

export default function Testimonials() {
  return null;
}
