import { GetServerSideProps } from 'next';

/**
 * Legacy USA-targeted landing page - now redirects to homepage
 *
 * With geo-based currency detection, US visitors automatically see USD prices
 * on all pages. This dedicated /us page is no longer needed.
 *
 * Permanent redirect preserves SEO value and prevents broken links.
 */
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/',
      permanent: true, // 301 redirect for SEO
    },
  };
};

export default function USALandingPage() {
  return null;
}
