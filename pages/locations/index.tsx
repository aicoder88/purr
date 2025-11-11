import { GetServerSideProps } from 'next';

/**
 * Redirect /locations to homepage with locations section
 * This maintains SEO and prevents 404s
 */
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    redirect: {
      destination: locale === 'fr' ? '/fr/#locations' : '/#locations',
      permanent: false, // 302 redirect (temporary)
    },
  };
};

export default function LocationsIndex() {
  return null;
}
