import { GetServerSideProps } from 'next';

/**
 * Montreal redirect page
 * Redirects /montreal to /locations/montreal for consistency with location routing
 */

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const destination = locale === 'fr' 
    ? '/fr/locations/montreal'
    : '/locations/montreal';

  return {
    redirect: {
      destination,
      permanent: true, // 301 redirect for SEO
    },
  };
};

// This component will never render due to the redirect
export default function MontrealRedirect() {
  return null;
}
