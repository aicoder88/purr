import { NextPage } from 'next';
import { Container } from '../src/components/ui/container';
import { NextSeo } from 'next-seo';

const TestPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Test Page"
        description="This is a test page to verify routing"
        noindex={true}
      />
      <Container>
        <h1 className="text-3xl font-bold mb-6">Test Page</h1>
        <p className="mb-4">
          If you can see this page, the routing is working correctly.
        </p>
        <p className="mb-4">
          This is a simple test page created to verify that the Next.js routing is functioning properly.
        </p>
      </Container>
    </>
  );
};

export default TestPage;