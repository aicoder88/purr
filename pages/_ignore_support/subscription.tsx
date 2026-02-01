import { GetServerSideProps } from 'next';

/**
 * Redirect /support/subscription to /customer/portal
 * This maintains SEO and prevents 404s
 */
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    redirect: {
      destination: locale === 'fr' ? '/fr/customer/portal' : '/customer/portal',
      permanent: true, // 301 redirect
    },
  };
};

export default function Subscription() {
  return null;
}
