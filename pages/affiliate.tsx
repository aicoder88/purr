import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { CheckCircle2, ArrowRight, Star, DollarSign, Users, TrendingUp, Award, Zap, Gift } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../src/lib/translation-context';

// Tier configuration
const TIERS = {
  STARTER: { name: 'Starter', rate: 0.20, color: 'gray', requirement: 'Starting tier' },
  ACTIVE: { name: 'Active', rate: 0.25, color: 'blue', requirement: '3 cleared sales' },
  PARTNER: { name: 'Partner', rate: 0.30, color: 'purple', requirement: '5+ sales/mo for 2 months' },
} as const;

type TierKey = keyof typeof TIERS;

export default function AffiliatePage() {
  const { t } = useTranslation();
  const [standardReferrals, setStandardReferrals] = useState(10);
  const [familyPackReferrals, setFamilyPackReferrals] = useState(5);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierKey>('STARTER');

  // Product prices
  const standardPrice = 24.99;
  const familyPackPrice = 44.99;

  // Use selected tier's commission rate
  const commissionRate = TIERS[selectedTier].rate;

  const standardCommission = standardPrice * commissionRate;
  const familyPackCommission = familyPackPrice * commissionRate;

  const monthlyIncome = (standardReferrals * standardCommission) + (familyPackReferrals * familyPackCommission);
  const yearlyIncome = monthlyIncome * 12;

  const canonicalUrl = 'https://www.purrify.ca/affiliate';

  if (!t.affiliate) {
    return null;
  }

  return (
    <div className="bg-gray-950 min-h-screen text-gray-50 dark:text-gray-50 selection:bg-blue-500/30">
      <NextSeo
        title={t.affiliate.metaTitle}
        description={t.affiliate.metaDescription}
        canonical={canonicalUrl}
        openGraph={{
          title: t.affiliate.metaTitle,
          description: t.affiliate.metaDescription,
          url: canonicalUrl,
          images: [
            {
              url: 'https://www.purrify.ca/optimized/purrify-affiliate-program.webp',
              width: 1200,
              height: 630,
              alt: 'Purrify Affiliate Program',
            },
          ],
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/20 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 dark:bg-blue-900/30 border border-blue-800/50 dark:border-blue-800/50 mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 dark:bg-blue-400 mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-blue-200 dark:text-blue-200">Join our growing partner network</span>
              </div>

              <h1 className="font-heading text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 dark:from-white dark:via-blue-100 dark:to-blue-200">
                {t.affiliate.hero.title}
              </h1>

              <p className="text-xl text-gray-400 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.affiliate.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/affiliate/signup" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white dark:text-white text-lg font-semibold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-200 hover:scale-105">
                    {t.affiliate.hero.primaryCTA}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </Link>
                <Link href="#calculator" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gray-800/50 hover:bg-gray-800 dark:bg-gray-800/50 dark:hover:bg-gray-800 text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white border border-gray-700 hover:border-gray-600 dark:border-gray-700 dark:hover:border-gray-600 text-lg font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm">
                    Calculate Income
                  </button>
                </Link>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500 dark:text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-500" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-500" />
                  <span>Instant approval</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-gray-800/50 dark:border-gray-800/50 bg-gray-900/50 dark:bg-gray-900/50 backdrop-blur-sm p-4">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-800 dark:bg-gray-800">
                  <Image
                    src="/optimized/three_bags_no_bg.webp"
                    alt="Purrify Products"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/20 dark:bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/20 dark:bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Earnings Preview Section */}
      <section className="py-24 border-y border-gray-800/50 dark:border-gray-800/50 bg-gray-900/30 dark:bg-gray-900/30">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 dark:border-gray-800 bg-gray-900 dark:bg-gray-900 ring-1 ring-white/10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/optimized/affiliate-dashboard.webp"
                  alt="Affiliate Earnings Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"></div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-blue-500/20 dark:bg-blue-500/20 blur-3xl -z-10 rounded-full opacity-50"></div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white dark:text-white mb-8">
                Track your success in real-time
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-500/10 dark:bg-blue-500/10 rounded-xl h-fit">
                    <DollarSign className="w-6 h-6 text-blue-400 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white dark:text-white mb-2">Tiered Commissions Up to 30%</h3>
                    <p className="text-gray-400 dark:text-gray-400 leading-relaxed">
                      Start at 20%, grow to 25% at Active tier, and earn 30% as a Partner. No caps, no limits.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-purple-500/10 dark:bg-purple-500/10 rounded-xl h-fit">
                    <TrendingUp className="w-6 h-6 text-purple-400 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white dark:text-white mb-2">High Conversion Rates</h3>
                    <p className="text-gray-400 dark:text-gray-400 leading-relaxed">
                      Our optimized landing pages and strong brand trust mean more of your clicks turn into cash.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-green-500/10 dark:bg-green-500/10 rounded-xl h-fit">
                    <Users className="w-6 h-6 text-green-400 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white dark:text-white mb-2">Easy to Promote</h3>
                    <p className="text-gray-400 dark:text-gray-400 leading-relaxed">
                      Eco-friendly, effective, and loved by cat owners. A product that practically sells itself.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tier System Section */}
      <section className="py-24 border-b border-gray-800/50 dark:border-gray-800/50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
                Grow Your Commission Rate
              </h2>
              <p className="text-xl text-gray-400 dark:text-gray-400 font-light max-w-2xl mx-auto">
                Start earning immediately and unlock higher rates as you make more sales
              </p>
            </div>

            {/* Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Starter Tier */}
              <div className="bg-gray-900/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 dark:border-gray-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/10 dark:bg-gray-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gray-700/50 dark:bg-gray-700/50 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-gray-400 dark:text-gray-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white dark:text-white mb-2">Starter</h3>
                  <div className="text-4xl font-bold text-gray-300 dark:text-gray-300 mb-4">20%</div>
                  <p className="text-gray-400 dark:text-gray-400 text-sm mb-6">Starting tier for all new affiliates</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                      <span>Immediate access</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                      <span>90-day cookie tracking</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                      <span>Full dashboard access</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Active Tier */}
              <div className="bg-gray-900/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30 dark:border-blue-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 dark:bg-blue-500/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-500/20 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-400 dark:text-blue-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white dark:text-white mb-2">Active</h3>
                  <div className="text-4xl font-bold text-blue-400 dark:text-blue-400 mb-4">25%</div>
                  <p className="text-gray-400 dark:text-gray-400 text-sm mb-6">Unlocked after 3 cleared sales</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-blue-500" />
                      <span>5% commission boost</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-blue-500" />
                      <span>Automatic upgrade</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-blue-500" />
                      <span>Permanent tier</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Partner Tier */}
              <div className="bg-gray-900/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 dark:border-purple-500/30 relative overflow-hidden ring-1 ring-purple-500/20 dark:ring-purple-500/20">
                <div className="absolute -top-2 -right-2 bg-purple-600 dark:bg-purple-600 text-white dark:text-white text-xs font-bold px-3 py-1 rounded-full">
                  TOP TIER
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 dark:bg-purple-500/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple-500/20 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-purple-400 dark:text-purple-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white dark:text-white mb-2">Partner</h3>
                  <div className="text-4xl font-bold text-purple-400 dark:text-purple-400 mb-4">30%</div>
                  <p className="text-gray-400 dark:text-gray-400 text-sm mb-6">5+ sales/month for 2 consecutive months</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 dark:text-purple-500" />
                      <span>Maximum commission</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 dark:text-purple-500" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 dark:text-purple-500" />
                      <span>Exclusive perks</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Monthly Reward Banner */}
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-8 border border-green-500/30 dark:border-green-500/30 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-green-500/20 dark:bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Gift className="w-8 h-8 text-green-400 dark:text-green-400" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-heading text-2xl font-bold text-white dark:text-white mb-2">
                  Sell 3, Get Free Monthly Reward
                </h3>
                <p className="text-gray-400 dark:text-gray-400">
                  Make 3+ sales in a month and get a free Purrify product ($49 value) credited to your account. Keep using it yourself or gift it to friends!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
                {t.affiliate.calculator.title}
              </h2>
              <p className="text-xl text-gray-400 dark:text-gray-400 font-light max-w-2xl mx-auto">
                {t.affiliate.calculator.subtitle}
              </p>
            </div>

            <div className="bg-gray-900/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-blue-500/20 dark:border-blue-500/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                <div className="space-y-12">
                  {/* Tier Selector */}
                  <div>
                    <label className="text-xl font-medium text-gray-200 dark:text-gray-200 mb-6 block">
                      Select Your Tier
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(Object.keys(TIERS) as TierKey[]).map((tier) => {
                        const isSelected = selectedTier === tier;
                        const tierInfo = TIERS[tier];
                        return (
                          <button
                            key={tier}
                            onClick={() => setSelectedTier(tier)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                              isSelected
                                ? tier === 'PARTNER'
                                  ? 'border-purple-500 bg-purple-500/20 dark:border-purple-500 dark:bg-purple-500/20'
                                  : tier === 'ACTIVE'
                                  ? 'border-blue-500 bg-blue-500/20 dark:border-blue-500 dark:bg-blue-500/20'
                                  : 'border-gray-500 bg-gray-500/20 dark:border-gray-500 dark:bg-gray-500/20'
                                : 'border-gray-700 dark:border-gray-700 hover:border-gray-600 dark:hover:border-gray-600 bg-gray-800/50 dark:bg-gray-800/50'
                            }`}
                          >
                            <div className={`text-2xl font-bold mb-1 ${
                              isSelected
                                ? tier === 'PARTNER'
                                  ? 'text-purple-400 dark:text-purple-400'
                                  : tier === 'ACTIVE'
                                  ? 'text-blue-400 dark:text-blue-400'
                                  : 'text-gray-300 dark:text-gray-300'
                                : 'text-gray-400 dark:text-gray-400'
                            }`}>
                              {(tierInfo.rate * 100).toFixed(0)}%
                            </div>
                            <div className="text-sm font-semibold text-gray-300 dark:text-gray-300">
                              {tierInfo.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {tierInfo.requirement}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Standard Product Slider */}
                  <div>
                    <div className="flex justify-between items-end mb-6">
                      <label className="text-xl font-medium text-gray-200 dark:text-gray-200">
                        {t.affiliate.calculator.standardProduct}
                      </label>
                      <div className="text-right">
                        <span className="text-4xl font-bold text-blue-400 dark:text-blue-400">
                          {standardReferrals}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-500 block">referrals/mo</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={standardReferrals}
                      onChange={(e) => setStandardReferrals(parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-800 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">
                      Based on ${standardPrice} product value
                    </p>
                  </div>

                  {/* Family Pack Slider */}
                  <div>
                    <div className="flex justify-between items-end mb-6">
                      <label className="text-xl font-medium text-gray-200 dark:text-gray-200">
                        {t.affiliate.calculator.familyPack}
                      </label>
                      <div className="text-right">
                        <span className="text-4xl font-bold text-blue-400 dark:text-blue-400">
                          {familyPackReferrals}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-500 block">referrals/mo</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={familyPackReferrals}
                      onChange={(e) => setFamilyPackReferrals(parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-800 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">
                      Based on ${familyPackPrice} product value
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 rounded-2xl p-8 text-center shadow-xl transform transition-transform lg:scale-105 border border-blue-400/20 dark:border-blue-400/20">
                    <p className="text-blue-100 dark:text-blue-100 font-medium mb-2 uppercase tracking-wider text-sm">
                      {t.affiliate.calculator.monthlyIncome}
                    </p>
                    <p className="text-5xl lg:text-6xl font-bold text-white dark:text-white mb-8 tracking-tight">
                      ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>

                    <div className="pt-8 border-t border-blue-500/30 dark:border-blue-500/30">
                      <p className="text-blue-200 dark:text-blue-200 text-sm mb-1 uppercase tracking-wider">
                        {t.affiliate.calculator.yearlyIncome}
                      </p>
                      <p className="text-3xl font-bold text-white dark:text-white">
                        ${yearlyIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
                    {t.affiliate.calculator.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works - Steps */}
      <section className="py-24 bg-gray-900 dark:bg-gray-900 border-y border-gray-800 dark:border-gray-800">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-white dark:text-white mb-20">
              {t.affiliate.howItWorks.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 opacity-30"></div>

              {/* Step 1 */}
              <div className="relative group text-center">
                <div className="w-24 h-24 mx-auto bg-gray-800 dark:bg-gray-800 rounded-full border-2 border-gray-700 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-500 flex items-center justify-center mb-8 relative z-10 transition-colors shadow-lg shadow-black/50">
                  <span className="text-3xl font-bold text-blue-400 dark:text-blue-400 group-hover:text-blue-300 dark:group-hover:text-blue-300">1</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white dark:text-white mb-4 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
                  {t.affiliate.howItWorks.step1.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-400 leading-relaxed px-4">
                  {t.affiliate.howItWorks.step1.description}
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative group text-center">
                <div className="w-24 h-24 mx-auto bg-gray-800 dark:bg-gray-800 rounded-full border-2 border-gray-700 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-500 flex items-center justify-center mb-8 relative z-10 transition-colors shadow-lg shadow-black/50">
                  <span className="text-3xl font-bold text-blue-400 dark:text-blue-400 group-hover:text-blue-300 dark:group-hover:text-blue-300">2</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white dark:text-white mb-4 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
                  {t.affiliate.howItWorks.step2.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-400 leading-relaxed px-4">
                  {t.affiliate.howItWorks.step2.description}
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative group text-center">
                <div className="w-24 h-24 mx-auto bg-gray-800 dark:bg-gray-800 rounded-full border-2 border-gray-700 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-500 flex items-center justify-center mb-8 relative z-10 transition-colors shadow-lg shadow-black/50">
                  <span className="text-3xl font-bold text-blue-400 dark:text-blue-400 group-hover:text-blue-300 dark:group-hover:text-blue-300">3</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white dark:text-white mb-4 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
                  {t.affiliate.howItWorks.step3.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-400 leading-relaxed px-4">
                  {t.affiliate.howItWorks.step3.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Visual Benefits Section */}
      <section className="py-24 overflow-hidden">
        <Container>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
              {t.affiliate.benefits.title}
            </h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 font-light max-w-2xl mx-auto">
              {t.affiliate.benefits.subtitle}
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature Block 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 dark:border-gray-800 group">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/optimized/happy-owner.webp"
                      alt="Happy Customer"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent dark:from-gray-900/80"></div>
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-blue-400 dark:text-blue-400" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white dark:text-white mb-6">
                  {t.affiliate.benefits.benefit1.title}
                </h3>
                <p className="text-lg text-gray-400 dark:text-gray-400 leading-relaxed mb-6">
                  {t.affiliate.benefits.benefit1.description}
                </p>
                <div className="bg-gray-800/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-700 dark:border-gray-700">
                  <p className="text-gray-300 dark:text-gray-300 italic">"The easiest product I've ever promoted. My followers love the eco-friendly aspect!"</p>
                </div>
              </div>
            </div>

            {/* Feature Block 2 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2">
                <div className="w-12 h-12 bg-purple-500/10 dark:bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-purple-400 dark:text-purple-400" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white dark:text-white mb-6">
                  {t.affiliate.benefits.benefit2.title}
                </h3>
                <p className="text-lg text-gray-400 dark:text-gray-400 leading-relaxed">
                  {t.affiliate.benefits.benefit2.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {[t.affiliate.benefits.benefit3.title, t.affiliate.benefits.benefit4.title].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 dark:text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 dark:border-gray-800 group">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/optimized/benefits-happy-cats.webp"
                      alt="Effective Product"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent dark:from-gray-900/60"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-900 dark:bg-gray-900 border-t border-gray-800 dark:border-gray-800">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-white dark:text-white mb-16">
              {t.affiliate.faq.title}
            </h2>

            <div className="space-y-4">
              {[
                { q: t.affiliate.faq.question1, a: t.affiliate.faq.answer1 },
                { q: t.affiliate.faq.question2, a: t.affiliate.faq.answer2 },
                { q: t.affiliate.faq.question3, a: t.affiliate.faq.answer3 },
                { q: t.affiliate.faq.question4, a: t.affiliate.faq.answer4 },
                { q: t.affiliate.faq.question5, a: t.affiliate.faq.answer5 },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-950 dark:bg-gray-950 rounded-2xl border border-gray-800 dark:border-gray-800 overflow-hidden transition-all duration-200 hover:border-gray-700 dark:hover:border-gray-700"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex items-start justify-between"
                  >
                    <span className="font-semibold text-lg text-gray-200 dark:text-gray-200 pr-8">
                      {faq.q}
                    </span>
                    <span className={`flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                      <div className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="px-8 pb-8 text-gray-400 dark:text-gray-400 leading-relaxed border-t border-gray-800/50 dark:border-gray-800/50 pt-4">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-600">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-900 dark:to-blue-600 mix-blend-multiply"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/30 dark:bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white dark:text-white mb-8 tracking-tight">
              {t.affiliate.finalCTA.title}
            </h2>
            <p className="text-xl text-blue-100 dark:text-blue-100 mb-12 font-light max-w-2xl mx-auto">
              {t.affiliate.finalCTA.subtitle}
            </p>
            <Link href="/affiliate/signup">
              <button className="inline-flex items-center px-10 py-5 bg-white dark:bg-white text-blue-600 dark:text-blue-600 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200">
                {t.affiliate.finalCTA.cta}
                <ArrowRight className="w-6 h-6 ml-3" />
              </button>
            </Link>
            <p className="text-sm text-blue-200/60 dark:text-blue-200/60 mt-8">
              {t.affiliate.finalCTA.disclaimer}
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
