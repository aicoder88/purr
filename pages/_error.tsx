import { NextPage } from 'next';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import NextImage from '../components/NextImage';
import { SITE_NAME } from '../src/lib/constants';

interface ErrorProps {
  statusCode?: number;
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

// Suggested pages for different error types
const getErrorSuggestions = (statusCode: number) => {
  const commonPages = [
    { title: 'Home', path: '/', description: 'Return to our homepage' },
    { title: 'Products', path: '/#products', description: 'Browse our cat litter additives' },
    { title: 'Blog', path: '/blog', description: 'Read our latest articles on cat care' },
    { title: 'Contact', path: '/#contact', description: 'Get in touch with our team' },
  ];

  if (statusCode === 403) {
    return [
      { title: 'Home', path: '/', description: 'Return to our homepage' },
      { title: 'Login', path: '/api/auth/signin', description: 'Sign in to your account' },
      ...commonPages.slice(1),
    ];
  }

  if (statusCode >= 500) {
    return [
      { title: 'Home', path: '/', description: 'Return to our homepage' },
      { title: 'Support', path: '/support', description: 'Contact our support team' },
      ...commonPages.slice(1, 3),
    ];
  }

  return commonPages;
};

const getErrorMessage = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      return {
        title: '400 - Bad Request',
        message: 'The request could not be understood by the server due to malformed syntax.',
      };
    case 401:
      return {
        title: '401 - Unauthorized',
        message: 'You need to authenticate to access this resource.',
      };
    case 403:
      return {
        title: '403 - Forbidden',
        message: 'You do not have permission to access this resource.',
      };
    case 404:
      return {
        title: '404 - Page Not Found',
        message: 'The page you are looking for might have been moved, deleted, or perhaps never existed.',
      };
    case 429:
      return {
        title: '429 - Too Many Requests',
        message: 'You have sent too many requests in a given amount of time. Please try again later.',
      };
    case 500:
      return {
        title: '500 - Internal Server Error',
        message: 'Something went wrong on our end. Our team has been notified and is working on a fix.',
      };
    case 502:
      return {
        title: '502 - Bad Gateway',
        message: 'We are experiencing temporary issues. Please try again in a few minutes.',
      };
    case 503:
      return {
        title: '503 - Service Unavailable',
        message: 'The service is temporarily unavailable. Please try again later.',
      };
    case 504:
      return {
        title: '504 - Gateway Timeout',
        message: 'The request took too long to complete. Please try again.',
      };
    default:
      return {
        title: `${statusCode} - Error`,
        message: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
      };
  }
};

const ErrorPage: NextPage<ErrorProps> = ({ statusCode = 404 }) => {
  const { title, message } = getErrorMessage(statusCode);
  const suggestions = getErrorSuggestions(statusCode);

  // Log errors to analytics
  useEffect(() => {
    // This would connect to your analytics platform in production
    console.error(`${statusCode} error occurred`, {
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
      statusCode,
    });
  }, [statusCode]);

  const isServerError = statusCode >= 500;
  const isClientError = statusCode >= 400 && statusCode < 500;

  return (
    <>
      <NextSeo
        title={`${title} | ${SITE_NAME}`}
        description={message}
        noindex={true}
        nofollow={true}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: 'none',
          maxVideoPreview: -1,
        }}
      />
      <Container>
        <div className="py-16 px-4 text-center max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <NextImage
              src="/optimized/purrify-logo-icon.webp"
              alt="Purrify Logo"
              width={80}
              height={80}
              className={isServerError ? "animate-pulse" : "animate-bounce"}
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50">
            {title}
          </h1>

          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            {message}
          </p>

          {isServerError && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
              <h2 className="text-lg font-semibold mb-2 text-red-800 dark:text-red-200">
                What can you do?
              </h2>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Try refreshing the page in a few minutes</li>
                <li>• Check your internet connection</li>
                <li>• Contact our support team if the issue persists</li>
              </ul>
            </div>
          )}

          {isClientError && statusCode !== 404 && (
            <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
              <h2 className="text-lg font-semibold mb-2 text-orange-800 dark:text-orange-200">
                What can you do?
              </h2>
              <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                <li>• Check the URL for any typos</li>
                <li>• Make sure you are logged in if required</li>
                <li>• Try accessing the resource again</li>
              </ul>
            </div>
          )}

          <div className="mb-12 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              You might be looking for:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((page, index) => (
                <Link
                  key={index}
                  href={page.path}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-300 text-left flex flex-col"
                >
                  <span className="font-medium text-blue-600 dark:text-blue-400">{page.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{page.description}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white dark:text-gray-100 font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Return to Home Page
          </Link>
        </div>
      </Container>
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

export default ErrorPage;
