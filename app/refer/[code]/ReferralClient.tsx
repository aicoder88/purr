"use client";

import { useState, useEffect } from 'react';
import { Gift, Star, ArrowRight, Heart, CheckCircle, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SITE_NAME } from '@/lib/constants';
import { formatProductPrice } from '@/lib/pricing';

interface ReferralData {
  isValid: boolean;
  referrerName?: string;
  referrerEmail?: string;
  discount?: {
    type: string;
    value: number;
    description: string;
  };
  message?: string;
  error?: string;
}

interface ReferralClientProps {
  code: string;
  referralData: ReferralData;
}

export function ReferralClient({ code, referralData }: ReferralClientProps) {
  const trialPrice = formatProductPrice('trial');
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [isClaimingOffer, setIsClaimingOffer] = useState(false);

  // Countdown timer for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle claim offer
  const handleClaimOffer = async () => {
    if (!referralData.isValid) return;

    setIsClaimingOffer(true);

    try {
      // Track referral conversion
      if (typeof globalThis.window !== 'undefined' && window.gtag) {
        window.gtag('event', 'referral_offer_claimed', {
          event_category: 'referrals',
          event_label: 'free_trial_claimed',
          custom_parameter_1: code,
          custom_parameter_2: referralData.referrerName
        });
      }

      // Store referral info in localStorage for checkout tracking
      localStorage.setItem('referralInfo', JSON.stringify({
        code,
        referrerName: referralData.referrerName,
        claimedAt: new Date().toISOString()
      }));

      // Redirect to product page
      window.location.href = '/products/trial-size';

    } catch (error) {
      console.error('Failed to claim referral offer:', error);
      setIsClaimingOffer(false);
    }
  };

  if (!referralData.isValid) {
    return (
      <Container className="py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Referral Code Not Valid
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {referralData.error || 'This referral code may have expired or reached its maximum uses.'}
          </p>
          <div className="space-x-4">
            <Link href="/products/trial-size">
              <Button>Shop Trial Size</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            {/* Friend Recommendation Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">
                Recommended by {referralData.referrerName}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Your Friend Was Right -<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                This Actually Works!
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {referralData.referrerName} has shared Purrify with you because they know how embarrassing
              litter box smell can be. Get your <strong>FREE 12g trial</strong> and see why they love it!
            </p>

            {/* Urgency Timer */}
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 p-6 mb-8 inline-block">
              <div className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-red-600 dark:text-red-400" />
                <div>
                  <p className="text-red-800 dark:text-red-200 font-semibold">
                    Limited Time Offer Expires In:
                  </p>
                  <p className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Free Trial Offer */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 p-8 mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Gift className="w-8 h-8 text-green-600 dark:text-green-400" />
                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-lg px-4 py-2">
                  FREE TRIAL
                </Badge>
              </div>

              <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {referralData.discount?.description}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {`Normally ${trialPrice} - perfect for testing before you buy the full size`}
              </p>

              <Button
                onClick={handleClaimOffer}
                disabled={isClaimingOffer}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white dark:text-gray-100 px-8 py-4 text-lg font-bold shadow-lg"
              >
                {isClaimingOffer ? (
                  'Adding to Cart...'
                ) : (
                  <>
                    Claim Your FREE Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </Card>
          </div>
        </Container>
      </section>

      {/* Why Your Friend Loves It */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why {referralData.referrerName} Recommends Purrify
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              They&apos;ve experienced the transformation firsthand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                No More Embarrassment
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Guests can&apos;t tell they have cats anymore. The activated carbon completely
                eliminates ammonia odors.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Actually Works
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Unlike baking soda or air fresheners that just mask odors,
                Purrify destroys them at the source.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Non-toxic & Natural
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Made from 100% natural activated coconut carbon. No chemicals,
                fragrances, or additives.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Join Thousands of Happy Cat Parents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6 text-left">
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 dark:text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                  &ldquo;I was skeptical, but after trying EVERYTHING else, Purrify actually eliminated
                  the smell completely. My apartment finally feels fresh again!&rdquo;
                </blockquote>
                <cite className="text-sm text-gray-600 dark:text-gray-400">
                  — Jennifer L., Toronto
                </cite>
              </Card>

              <Card className="p-6 text-left">
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 dark:text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                  &ldquo;Guests can&apos;t even tell I have 3 cats now. This is life-changing for any cat parent
                  who&apos;s been embarrassed about the smell.&rdquo;
                </blockquote>
                <cite className="text-sm text-gray-600 dark:text-gray-400">
                  — Michael R., Vancouver
                </cite>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Don&apos;t Miss Out on Your FREE Trial
            </h2>

            <p className="text-xl opacity-90 mb-8">
              {referralData.referrerName} shared this with you because they care.
              See why they love Purrify and stop being embarrassed about litter box smell.
            </p>

            <div className="space-y-4">
              <Button
                onClick={handleClaimOffer}
                disabled={isClaimingOffer}
                size="lg"
                className="bg-white dark:bg-gray-100 text-orange-600 dark:text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-200 px-8 py-4 text-lg font-bold shadow-lg"
              >
                {isClaimingOffer ? (
                  'Processing...'
                ) : (
                  <>
                    Get My FREE Trial Now
                    <Gift className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-sm opacity-75">
                Shipping included • No commitment • 100% satisfaction guarantee
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
