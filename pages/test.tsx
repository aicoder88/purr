import { NextPage } from 'next';
import { Layout } from '../src/components/layout/layout';
import { NextSeo } from 'next-seo';

const TestPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Test Page"
        description="This is a test page to verify routing"
        noindex={true}
      />
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-6">Test Page</h1>
          <p className="mb-4">
            If you can see this page, the routing is working correctly.
          </p>
          <p className="mb-4">
            This is a simple test page created to verify that the Next.js routing is functioning properly.
          </p>
        </div>
      </Layout>
    </>
  );
};

export default TestPage;