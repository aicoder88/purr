import { GetServerSideProps } from 'next';

/**
 * Redirect /free to trial size product page
 * This maintains SEO and prevents 404s
 */
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    redirect: {
      destination: locale === 'fr' ? '/fr/products/trial-size' : '/products/trial-size',
      permanent: true, // 301 redirect
    },
  };
};

export default function FreeRedirect() {
  return null;
}
