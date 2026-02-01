/**
 * /buy - Redirect to products page
 * Handles common user search intent for buying
 */
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/products',
      permanent: true, // 301 redirect for SEO
    },
  };
};

export default function BuyPage() {
  // This will never render due to redirect
  return null;
}
