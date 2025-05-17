import { NextPage } from 'next';
import Link from 'next/link';
import { Layout } from '../src/components/layout/layout';
import { NextSeo } from 'next-seo';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Page Not Found"
        description="The page you are looking for does not exist"
        noindex={true}
      />
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
          <p className="text-xl mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mb-8">
            <p className="mb-2">Error details:</p>
            <code className="bg-gray-100 p-3 rounded block mb-4">
              404: NOT_FOUND
            </code>
          </div>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Return to Home Page
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default NotFoundPage;