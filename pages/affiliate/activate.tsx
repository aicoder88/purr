import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { Container } from '@/components/ui/container';
import { Package, CheckCircle2, ArrowRight, CreditCard, Gift, Award, TrendingUp, Zap } from 'lucide-react';
import Image from 'next/image';
import prisma from '@/lib/prisma';

interface Props {
  affiliate: {
    name: string;
    code: string;
  };
}

export default function AffiliateActivatePage({ affiliate }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/affiliate/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start checkout');
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Activate Your Affiliate Account - Purrify</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 py-12">
          <Container>
            <div className="text-center">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-2">
                Welcome, {affiliate.name.split(' ')[0]}!
              </h1>
              <p className="text-purple-100 dark:text-purple-200 text-lg">
                One more step to start earning commissions
              </p>
            </div>
          </Container>
        </div>

        <Container className="py-12">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-green-500 dark:bg-green-600 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-white dark:text-gray-100" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Application Approved</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-700 mx-4"></div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-600 dark:bg-purple-500 rounded-full animate-pulse">
                  <span className="text-white dark:text-gray-100 font-bold">2</span>
                </div>
                <span className="ml-2 text-sm font-medium text-purple-600 dark:text-purple-400">Get Your Starter Kit</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-700 mx-4"></div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full">
                  <span className="text-gray-600 dark:text-gray-400 font-bold">3</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">Start Earning</span>
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left - Product Info */}
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Affiliate Starter Kit
                    </h2>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Get everything you need to start earning commissions with Purrify. Your starter kit includes:
                  </p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">1 Bag of Purrify (500g)</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Experience the product yourself</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Marketing Materials</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">High-quality images and copy templates</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Your Unique Referral Code</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{affiliate.code}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Priority Support</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Direct access to our affiliate team</p>
                      </div>
                    </li>
                  </ul>

                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <Image
                      src="/optimized/three_bags_no_bg.webp"
                      alt="Purrify Starter Kit"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right - Pricing & CTA */}
                <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-10 flex flex-col">
                  <div className="mb-8">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">One-time investment</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">$49</span>
                      <span className="text-gray-500 dark:text-gray-400">CAD</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Includes free shipping across Canada
                    </p>
                  </div>

                  {/* Commission Tiers Preview */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Your Commission Path</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Starter</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Active (3+ sales)</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">25%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Partner</span>
                        </div>
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">30%</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Reward */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-semibold text-green-800 dark:text-green-300">Monthly Bonus</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Make 3+ sales each month and get a free Purrify product ($49 value)!
                    </p>
                  </div>

                  <div className="flex-grow"></div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  )}

                  <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white dark:text-gray-100 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        <span>Get Started - $49</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                Common Questions
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Why do I need a starter kit?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The starter kit ensures you can experience Purrify firsthand, making you a more authentic and effective ambassador. Plus, it covers the cost of your marketing materials.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">How quickly can I earn back my investment?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    At 20% commission, just 10 standard product referrals (worth ~$50 in commissions) covers your starter kit investment.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">What&apos;s included in marketing materials?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You&apos;ll get access to professional product photos, social media templates, email swipe copy, and banner ads for your website.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">How long does shipping take?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We ship within 1-2 business days. Most orders arrive within 3-5 business days across Canada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  // Check if user is authenticated as affiliate
  const user = session?.user as { role?: string; id?: string } | undefined;
  if (!session || user?.role !== 'affiliate' || !user?.id) {
    return {
      redirect: {
        destination: '/affiliate/login',
        permanent: false,
      },
    };
  }

  if (!prisma) {
    return {
      redirect: {
        destination: '/affiliate/login',
        permanent: false,
      },
    };
  }

  // Get affiliate details
  const affiliate = await prisma.affiliate.findUnique({
    where: { id: user.id },
    select: {
      name: true,
      code: true,
      activatedAt: true,
    },
  });

  if (!affiliate) {
    return {
      redirect: {
        destination: '/affiliate/login',
        permanent: false,
      },
    };
  }

  // If already activated, redirect to dashboard
  if (affiliate.activatedAt) {
    return {
      redirect: {
        destination: '/affiliate/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {
      affiliate: {
        name: affiliate.name,
        code: affiliate.code,
      },
    },
  };
};
