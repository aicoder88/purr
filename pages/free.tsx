import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SITE_NAME } from '../src/lib/constants';

export default function FreeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      <Head>
        <title>{`Redirecting... | ${SITE_NAME}`}</title>
        <meta name="description" content="Redirecting to homepage. Please wait..." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.purrify.ca/" />
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    </>
  );
}
