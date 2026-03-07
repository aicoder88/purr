'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReferralDashboard } from '@/components/referrals/ReferralDashboard';
import { SocialShareTools } from '@/components/referrals/SocialShareTools';
import { Share2, Trophy, Gift, Users, ArrowLeft, Plus, Sparkles } from 'lucide-react';
import { generateReferralCode, getUserReferralStats } from '@/lib/referral-tracking';
import { formatProductPrice } from '@/lib/pricing';

interface CustomerIdentity {
  id: string;
  email: string;
  name: string;
}

function getCustomerIdentity(): CustomerIdentity | null {
  if (typeof globalThis.window === 'undefined') return null;

  try {
    const sessionData = localStorage.getItem('customer_session');
    if (!sessionData) return null;

    const parsed = JSON.parse(sessionData) as {
      customer?: { id?: string; email?: string };
      expiresAt?: string;
    };

    if (!parsed.customer?.id || !parsed.customer?.email) {
      return null;
    }

    if (parsed.expiresAt && new Date(parsed.expiresAt) <= new Date()) {
      localStorage.removeItem('customer_session');
      return null;
    }

    const email = parsed.customer.email.toLowerCase().trim();
    const emailPrefix = email.split('@')[0] || 'Friend';
    const name = emailPrefix
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      id: parsed.customer.id,
      email,
      name,
    };
  } catch {
    return null;
  }
}

export default function ReferralsPageClient() {
  const trialPrice = formatProductPrice('trial');
  const [customer, setCustomer] = useState<CustomerIdentity | null>(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [hasReferralCode, setHasReferralCode] = useState(false);
  const [referralCode, setReferralCode] = useState<string>('');
  const [shareUrl, setShareUrl] = useState<string>('');
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    setCustomer(getCustomerIdentity());
    setHasCheckedSession(true);
  }, []);

  useEffect(() => {
    if (!customer) return;

    // Check if user already has a referral code
    const checkExistingReferralCode = async () => {
      try {
        const stats = await getUserReferralStats(customer.email);
        if (stats && stats.referralCode) {
          setReferralCode(stats.referralCode);
          setShareUrl(stats.shareUrl);
          setHasReferralCode(true);
        }
      } catch {
        // Silently ignore referral check errors
      }
    };

    checkExistingReferralCode();
  }, [customer]);

  const handleGenerateReferralCode = async () => {
    if (!customer) return;
    setIsGeneratingCode(true);

    try {
      const newCode = await generateReferralCode(customer.id, customer.name, customer.email);

      if (newCode) {
        setReferralCode(newCode);
        const currentOrigin = typeof globalThis.window !== 'undefined'
          ? window.location.origin
          : 'https://www.purrify.ca';
        setShareUrl(`${currentOrigin}/refer/${newCode}`);
        setHasReferralCode(true);

        // Track referral code generation
        if (typeof globalThis.window !== 'undefined' && window.gtag) {
          window.gtag('event', 'referral_code_created', {
            event_category: 'referrals',
            event_label: 'first_time_generation',
            custom_parameter_1: customer.id,
          });
        }
      }
    } catch {
      // Silently ignore referral generation errors
    } finally {
      setIsGeneratingCode(false);
    }
  };

  if (!hasCheckedSession) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Container className="py-16">
          <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400">
            Loading your referral account...
          </div>
        </Container>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Container className="py-16">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 text-center">
              <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Sign In Required
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please sign in to your customer portal before opening the referral dashboard.
              </p>
              <Button asChild>
                <Link href="/customer/portal/">Go to Customer Portal</Link>
              </Button>
            </Card>
          </div>
        </Container>
      </main>
    );
  }

  // No referral code state - show onboarding
  if (!hasReferralCode) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Container className="py-16">
          <div className="max-w-4xl mx-auto">
            {/* Back to Portal */}
            <Link
              href="/customer/portal/"
              className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Customer Portal
            </Link>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-10 h-10 text-white dark:text-gray-100" />
              </div>

              <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Share Purrify & Earn Rewards
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Help other cat parents eliminate embarrassing litter box odors while earning
                amazing rewards for yourself!
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  $5 Credit Per Referral
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Earn a $5 credit each time a referred friend completes their first order
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Milestone Bonuses
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Unlock bonus rewards at 5, 10, and 25 successful referrals
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Help Cat Parents
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your friends get $5 off their first order while you share a product that solves a real problem
                </p>
              </Card>
            </div>

            {/* How it Works */}
            <Card className="p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                How It Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-orange-600 dark:text-orange-400">1</span>
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">Share Your Code</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Get your personalized referral code and share it with friends & family
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-orange-600 dark:text-orange-400">2</span>
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">They Get $5 Off</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {`Their first order gets an instant $5 referral discount. Trial size currently starts at ${trialPrice}.`}
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-orange-600 dark:text-orange-400">3</span>
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">You Earn Rewards</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Collect a $5 credit for every completed referral plus milestone bonuses as your impact grows
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <Button
                onClick={handleGenerateReferralCode}
                disabled={isGeneratingCode}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white dark:text-gray-100 px-8 py-4 text-lg font-bold shadow-lg"
              >
                {isGeneratingCode ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Creating Your Code...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Create My Referral Code
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Free to join • No limits • Start earning immediately
              </p>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  // Has referral code state - show dashboard
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Container className="py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link
                href="/customer/portal/"
                className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Customer Portal
              </Link>
            </div>

            <div className="text-right">
              <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100">
                Referral Center
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {customer.name}!
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="share" className="flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share Tools</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center space-x-2">
                <Gift className="w-4 h-4" />
                <span>My Rewards</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <ReferralDashboard
                userId={customer.email}
                className="max-w-none"
              />
            </TabsContent>

            <TabsContent value="share" className="space-y-6">
              <SocialShareTools
                referralCode={referralCode}
                shareUrl={shareUrl}
                referrerName={customer.name}
                className="max-w-none"
              />
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <Card className="p-8 text-center">
                <Gift className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Rewards Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your earned rewards will appear here. Keep sharing to unlock amazing benefits!
                </p>
                <Button onClick={() => setActiveTab('share')}>
                  Start Sharing Now
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </main>
  );
}
