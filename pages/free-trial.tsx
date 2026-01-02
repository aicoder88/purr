/**
 * /free-trial - Redirect to try-free page
 * Handles alternative URL patterns users might try
 */
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/try-free',
      permanent: true, // 301 redirect for SEO
    },
  };
};

export default function FreeTrialPage() {
  // This will never render due to redirect
  return null;
}
