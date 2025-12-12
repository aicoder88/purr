import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import Image from 'next/image';
import { SITE_NAME } from '../src/lib/constants';

// Suggested pages for common user journeys
const suggestedPages = [
  { title: 'Home', path: '/', description: 'Return to our homepage' },
  { title: 'Products', path: '/#products', description: 'Browse our cat litter additives' },
  { title: 'How It Works', path: '/#how-it-works', description: 'Learn how Purrify eliminates odors' },
  { title: 'Blog', path: '/blog', description: 'Read our latest articles on cat care' },
  { title: 'Contact', path: '/#contact', description: 'Get in touch with our team' },
];

const NotFoundPage: NextPage = () => {
  // Log 404 errors to analytics
  useEffect(() => {
    // This would connect to your analytics platform in production
    console.error('404 error occurred', {
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <>
      <NextSeo
        title={`Page Not Found | ${SITE_NAME}`}
        description="We couldn't find the page you were looking for. Please check the URL or navigate to another section of our site."
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
            <Image
              src="/optimized/purrify-logo-icon.webp"
              alt="Purrify Logo"
              width={80}
              height={80}
              className="animate-bounce"
            />
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-[#5B2EFF]">
            404 - Page Not Found
          </h1>
          
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Oops! The page you are looking for might have been moved, deleted,
            or perhaps never existed.
          </p>
          
          <div className="mb-12 p-4 bg-[#FFFFF5] dark:bg-gray-800 rounded-lg border border-[#E0EFC7] dark:border-gray-600 shadow-sm">
            <h2 className="font-heading text-xl font-semibold mb-4 text-[#03E46A] dark:text-[#03E46A]">
              You might be looking for:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedPages.map((page, index) => (
                <Link
                  key={index}
                  href={page.path}
                  className="p-4 border border-[#E0EFC7] dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-300 text-left flex flex-col"
                >
                  <span className="font-medium text-[#5B2EFF] dark:text-[#5B2EFF]">{page.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{page.description}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131]/70 text-white dark:text-white dark:text-gray-100 font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Return to Home Page
          </Link>
        </div>
      </Container>
    </>
  );
};

export default NotFoundPage;