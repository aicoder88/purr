import { Twitter, Facebook, CheckCircle2, Package, Mail } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Stripe from 'stripe';
import { Container } from '../src/components/ui/container';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-07-30.basil',
});

interface OrderDetails {
  customerEmail?: string;
  customerName?: string;
  productName?: string;
  quantity?: number;
  amount?: number;
  orderNumber?: string;
}

interface ThankYouPageProps {
  orderDetails: OrderDetails | null;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<ThankYouPageProps> = async (context) => {
  const { session_id } = context.query;

  // If no session_id, just show generic thank you page
  if (!session_id || typeof session_id !== 'string') {
    return {
      props: {
        orderDetails: null
      }
    };
  }

  try {
    // Fetch session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Extract order details
    const orderDetails: OrderDetails = {
      customerEmail: session.customer_details?.email || session.customer_email || undefined,
      customerName: session.customer_details?.name || undefined,
      amount: session.amount_total || undefined,
      orderNumber: session.metadata?.orderId || session_id.slice(-8).toUpperCase(),
    };

    // Get line items for product details
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session_id, { limit: 1 });
      if (lineItems.data.length > 0) {
        const item = lineItems.data[0];
        orderDetails.productName = item.description || 'Purrify';
        orderDetails.quantity = item.quantity || 1;
      }
    } catch (err) {
      console.error('Error fetching line items:', err);
    }

    return {
      props: {
        orderDetails
      }
    };
  } catch (error) {
    console.error('Error fetching Stripe session:', error);
    return {
      props: {
        orderDetails: null,
        error: 'Unable to load order details'
      }
    };
  }
};

const ThankYouPage = ({ orderDetails, error }: ThankYouPageProps) => {
  const formattedAmount = orderDetails?.amount ? (orderDetails.amount / 100).toFixed(2) : null;

  return (
    <>
      <Head>
        <title>Thank You - Your Order Has Been Received</title>
        <meta name="description" content="Thank you for your order. We appreciate your business and will process your order shortly." />
      </Head>

      <Container>
        <div className="max-w-3xl mx-auto text-center py-16">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#03E46A]/10 mb-4">
              <CheckCircle2 className="w-12 h-12 text-[#03E46A]" />
            </div>
          </div>

          <h1 className="font-heading text-4xl font-bold mb-4 text-[#03E46A] dark:text-[#03E46A]">
            Thank You for Your Order!
          </h1>

          {error && (
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              {error}
            </p>
          )}

          {orderDetails ? (
            <>
              <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">
                Your order has been received and is being processed.
              </p>

              {/* Order Details Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 text-left">
                <h2 className="font-heading text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100 text-center">
                  Order Details
                </h2>

                <div className="space-y-4 mb-6">
                  {orderDetails.orderNumber && (
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Order Number:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{orderDetails.orderNumber}</span>
                    </div>
                  )}

                  {orderDetails.customerEmail && (
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Email:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{orderDetails.customerEmail}</span>
                    </div>
                  )}

                  {orderDetails.productName && (
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Product:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{orderDetails.productName}</span>
                    </div>
                  )}

                  {orderDetails.quantity && (
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{orderDetails.quantity}</span>
                    </div>
                  )}

                  {formattedAmount && (
                    <div className="flex justify-between py-3 border-t-2 border-gray-300 dark:border-gray-600 mt-4">
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total:</span>
                      <span className="text-lg font-bold text-[#03E46A]">${formattedAmount} CAD</span>
                    </div>
                  )}
                </div>

                {orderDetails.customerEmail && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      A confirmation email has been sent to <strong>{orderDetails.customerEmail}</strong>
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">
              Your order has been received and is being processed.
            </p>
          )}

          {/* What's Next Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="font-heading text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
              <Package className="w-6 h-6 text-[#03E46A]" />
              What&apos;s Next?
            </h2>

            <div className="space-y-4 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#03E46A] text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    We&apos;ll Process Your Order
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our team will carefully prepare your order and reach out to coordinate delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#03E46A] text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Stay Tuned for Updates
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We&apos;ll send you email updates as we process and ship your order.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#03E46A] text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Enjoy Purrify!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get ready to experience odor-free litter happiness!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                <strong>Questions?</strong> Feel free to reply to your confirmation email or contact us at{' '}
                <a href="mailto:support@purrify.ca" className="text-[#03E46A] hover:underline font-semibold">
                  support@purrify.ca
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#03E46A] hover:bg-[#02C55A] transition-colors"
            >
              Return to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Share Your Experience
            </h3>
            <div className="flex justify-center gap-4">
              <a
                href="https://twitter.com/intent/tweet?text=I%20just%20ordered%20from%20Purrify%20and%20I%20can%27t%20wait%20to%20try%20their%20products!%20%23Purrify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#03E46A] transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.purrify.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#03E46A] transition-colors"
                aria-label="Share on Facebook"
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
