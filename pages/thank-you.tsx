import { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Package,
  Mail,
  Clock,
  Gift,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Facebook,
  MessageCircle,
  Zap
} from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Stripe from 'stripe';
import { Container } from '../src/components/ui/container';
import { Button } from '../src/components/ui/button';

const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-07-30.basil',
  });
};

interface OrderDetails {
  customerEmail?: string;
  customerName?: string;
  productName?: string;
  quantity?: number;
  amount?: number;
  orderNumber?: string;
  isSubscription?: boolean;
  shippingCountry?: string;
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
    // Get Stripe instance with error handling
    let stripe;
    try {
      stripe = getStripeInstance();
    } catch (stripeError) {
      console.error('Stripe configuration error:', stripeError);
      return {
        props: {
          orderDetails: null,
          error: 'Unable to load order details due to configuration issue'
        }
      };
    }

    // Fetch session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['shipping_details', 'line_items']
    });

    // Extract order details
    const orderDetails: OrderDetails = {
      customerEmail: session.customer_details?.email || session.customer_email || undefined,
      customerName: session.customer_details?.name || undefined,
      amount: session.amount_total || undefined,
      orderNumber: session.metadata?.orderId || session_id.slice(-8).toUpperCase(),
      isSubscription: session.mode === 'subscription',
      shippingCountry: (session as any).shipping_details?.address?.country || session.customer_details?.address?.country || undefined,
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
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [referralLoading, setReferralLoading] = useState(false);

  // Determine delivery timeline based on shipping country
  const getDeliveryTimeline = () => {
    const country = orderDetails?.shippingCountry?.toUpperCase();
    if (country === 'CA') {
      return { time: '7-10 business days', region: 'within Canada' };
    } else if (country === 'US') {
      return { time: '10-14 business days', region: 'to the United States' };
    }
    return { time: '10-14 business days', region: '' };
  };

  const deliveryInfo = getDeliveryTimeline();

  // Generate referral code on mount if we have customer info
  useEffect(() => {
    const generateReferralCode = async () => {
      if (!orderDetails?.customerEmail || !orderDetails?.customerName) return;

      setReferralLoading(true);
      try {
        const response = await fetch('/api/referrals/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: orderDetails.orderNumber || 'guest',
            userName: orderDetails.customerName.split(' ')[0],
            email: orderDetails.customerEmail
          })
        });

        if (response.ok) {
          const data = await response.json();
          setReferralCode(data.data?.code);
        }
      } catch (err) {
        console.error('Failed to generate referral code:', err);
      } finally {
        setReferralLoading(false);
      }
    };

    generateReferralCode();
  }, [orderDetails]);

  const shareUrl = referralCode ? `https://www.purrify.ca/refer/${referralCode}` : 'https://www.purrify.ca';

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const firstName = orderDetails?.customerName?.split(' ')[0] || 'there';

  return (
    <>
      <Head>
        <title>Thank You for Your Order! - Purrify</title>
        <meta name="description" content="Your Purrify order has been confirmed. Get ready to experience an odor-free home!" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Container>
          <div className="max-w-4xl mx-auto py-12 md:py-16">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#03E46A]/10 dark:bg-[#03E46A]/20 mb-6 animate-bounce">
                <CheckCircle2 className="w-14 h-14 text-[#03E46A]" />
              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-[#03E46A]">
                Thank You{firstName !== 'there' ? `, ${firstName}` : ''}!
              </h1>

              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
                Your order has been confirmed. Get ready to experience the freshest home you've ever had!
              </p>
            </div>

            {error && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8 text-center">
                <p className="text-amber-800 dark:text-amber-200">{error}</p>
              </div>
            )}

            {/* Order Details Card */}
            {orderDetails && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100 dark:border-gray-700">
                <h2 className="font-heading text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <Package className="w-6 h-6 text-[#03E46A]" />
                  Order Confirmed
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    {orderDetails.orderNumber && (
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Order Number</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100 font-mono">#{orderDetails.orderNumber}</span>
                      </div>
                    )}
                    {orderDetails.productName && (
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Product</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{orderDetails.productName}</span>
                      </div>
                    )}
                    {orderDetails.quantity && orderDetails.quantity > 1 && (
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Quantity</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{orderDetails.quantity}</span>
                      </div>
                    )}
                    {formattedAmount && (
                      <div className="flex justify-between py-3 border-t-2 border-gray-200 dark:border-gray-600 mt-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total</span>
                        <span className="text-lg font-bold text-[#03E46A]">${formattedAmount} CAD</span>
                      </div>
                    )}
                  </div>

                  {/* Delivery Timeline */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Expected Delivery</h3>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{deliveryInfo.time}</p>
                        {deliveryInfo.region && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{deliveryInfo.region}</p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          Ships within 1-2 business days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {orderDetails.customerEmail && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#03E46A] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Confirmation email sent to <strong>{orderDetails.customerEmail}</strong>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Check your spam folder if you don't see it within 5 minutes
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* What to Expect Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100 dark:border-gray-700">
              <h2 className="font-heading text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                What to Expect
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#03E46A] text-white dark:text-gray-900 flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Receive Your Purrify
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your package will arrive in discrete, eco-friendly packaging. Each container is sealed for freshness.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500 dark:bg-purple-600 text-white dark:text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      First Use Instructions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      For best results, start with a clean litter box:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-2">
                      <li>Clean and refresh your litter box</li>
                      <li>Sprinkle a thin layer of Purrify on top</li>
                      <li>No need to mix - it works from the surface</li>
                      <li>Reapply after each litter change</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 text-white dark:text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Experience the Difference
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Most customers notice a difference within 60 seconds! The activated carbon traps ammonia molecules instantly - no masking, just real odor elimination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-900 dark:text-amber-200">
                  <strong>Pro Tip:</strong> A little goes a long way! Use just enough to lightly cover the surface. Over-application won't hurt, but it's not necessary.
                </p>
              </div>
            </div>

            {/* Referral Section */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white dark:text-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white dark:text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-2">Share the Freshness</h2>
                  <p className="text-purple-100 dark:text-purple-200">
                    Know someone with a stinky litter box? Share your referral link and they'll get a FREE trial!
                  </p>
                </div>
              </div>

              {referralLoading ? (
                <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-purple-100 dark:text-purple-200">Generating your personal referral link...</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="flex-1 bg-transparent border-none text-white dark:text-white placeholder-purple-200 dark:placeholder-purple-300 focus:outline-none font-mono text-sm"
                      />
                      <Button
                        onClick={handleCopyLink}
                        variant="ghost"
                        className="text-white dark:text-white hover:bg-white/20 dark:hover:bg-white/10"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Check out Purrify - it completely eliminates litter box odor! Get a FREE trial: ${shareUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white dark:text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white dark:text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </a>
                    <a
                      href={`mailto:?subject=You NEED this for your cat's litter box!&body=Hey! I just ordered Purrify and wanted to share - it eliminates litter box odor completely using activated carbon. You can get a FREE trial here: ${shareUrl}`}
                      className="flex items-center gap-2 bg-gray-700 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 text-white dark:text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* Upgrade to Subscription (if one-time purchase) */}
            {orderDetails && !orderDetails.isSubscription && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-[#03E46A] dark:border-[#03E46A]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#03E46A]/10 dark:bg-[#03E46A]/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#03E46A]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Never Run Out Again
                      </h2>
                      <span className="bg-[#03E46A] text-white dark:text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                        SAVE 30%
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Subscribe to Autoship and save 30% on every order, plus get FREE shipping. Cancel anytime.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <p className="text-2xl font-bold text-[#03E46A]">30%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Savings</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <p className="text-2xl font-bold text-[#03E46A]">FREE</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <p className="text-2xl font-bold text-[#03E46A]">Anytime</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cancel</p>
                  </div>
                </div>

                <Link href="/#products">
                  <Button className="w-full bg-[#03E46A] hover:bg-[#02C55A] text-white dark:text-gray-900 font-bold py-4 text-lg">
                    Upgrade to Autoship <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                <strong>Questions?</strong> We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@purrify.ca"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  support@purrify.ca
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white dark:text-gray-900 bg-[#03E46A] hover:bg-[#02C55A] transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default ThankYouPage;
