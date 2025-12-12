import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from '../src/components/ui/container';
import { Twitter, Facebook } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

const ThankYouPage = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Check if this is a non-subscription order and should show upsell
    const showUpsell = () => {
      const { session_id, product } = router.query;

      // Don't show upsell if:
      // 1. No session_id (direct page access)
      // 2. Product is already an autoship/subscription
      // 3. User explicitly declined upsell (skip_upsell param)
      if (!session_id || router.query.skip_upsell === 'true') {
        return false;
      }

      // Check if product is a subscription (contains 'autoship' in product ID)
      if (product && typeof product === 'string' && product.includes('autoship')) {
        return false;
      }

      // Check localStorage to see if user has already seen upsell in this session
      const upsellShown = sessionStorage.getItem('upsell_shown');
      if (upsellShown === 'true') {
        return false;
      }

      return true;
    };

    // Redirect to upsell page if conditions are met
    if (showUpsell() && !isRedirecting) {
      setIsRedirecting(true);

      // Track that we're showing the upsell
      sessionStorage.setItem('upsell_shown', 'true');

      // Analytics tracking - upsell page impression
      if (typeof window !== 'undefined') {
        const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
        if (gtag) {
          gtag('event', 'upsell_page_view', {
            event_category: 'ecommerce',
            event_label: 'post_purchase_upsell',
            value: 1
          });
        }
      }

      // Redirect after a brief delay to show confirmation
      setTimeout(() => {
        router.push('/thank-you/upsell');
      }, 2000);
    }
  }, [router, isRedirecting]);

  return (
    <>
      <Head>
        <title>Thank You - Your Order Has Been Received</title>
        <meta name="description" content="Thank you for your order. We appreciate your business and will process your order shortly." />
      </Head>

      <Container>
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="mb-8">
            <Image
              src="/optimized/thank-you.webp"
              alt="Thank You"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <h1 className="font-heading text-4xl font-bold mb-4 text-[#03E46A] dark:text-[#03E46A]">Thank You!</h1>
          <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">
            Your order has been received and is being processed.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="font-heading text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">What&apos;s Next?</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              You will receive an email confirmation shortly with your order details.&nbsp;
              Our team will begin processing your order right away.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              If you have any questions about your order, please don&apos;t hesitate to contact us.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white dark:text-white dark:text-gray-100 bg-[#03E46A] hover:bg-[#02C55A]"
            >
              Return to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:bg-gray-900"
            >
              Contact Us
            </Link>
          </div>
          <div className="mt-12">
            <h3 className="font-heading text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Share Your Experience</h3>
            <div className="flex justify-center gap-4">
              <a
                href="https://twitter.com/intent/tweet?text=I%20just%20ordered%20from%20Purrify%20and%20I%20can%27t%20wait%20to%20try%20their%20products!%20%23Purrify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 dark:text-gray-300 hover:text-[#03E46A]"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.purrify.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#03E46A]"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ThankYouPage; 
