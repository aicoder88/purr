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
        <div className="max-w-4xl mx-auto py-16">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Test Page</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              If you can see this page, the routing is working correctly.
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-200">
              This is a simple test page created to verify that the Next.js routing is functioning properly.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">System Status</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 dark:bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200">Next.js Routing: Active</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 dark:bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200">Dark Mode Support: Enabled</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 dark:bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200">SEO Components: Loaded</span>
                </div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Testing Guidelines</h3>
              <p className="text-gray-700 dark:text-gray-200">
                This page serves multiple purposes in our testing workflow:
              </p>
              <ul className="text-gray-700 dark:text-gray-200">
                <li>Verifying Next.js page routing functionality across all environments</li>
                <li>Testing component rendering and hydration behavior</li>
                <li>Validating dark mode theme switching capabilities</li>
                <li>Ensuring SEO metadata is properly configured</li>
                <li>Confirming responsive design implementation works correctly</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-200">
                If all systems are functioning properly, you should see properly styled content with working dark mode toggle,
                responsive layout, and no console errors. This page is excluded from search engine indexing to prevent
                it from appearing in search results.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TestPage;