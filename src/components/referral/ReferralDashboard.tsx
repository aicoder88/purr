'use client';

/**
 * ReferralDashboard Component
 * User dashboard showing referral code, stats, and rewards
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ReferralWidget } from './ReferralWidget';

interface ReferralStats {
  code: string;
  shareUrl: string;
  shareUrls: {
    shareUrl: string;
    email: { subject: string; body: string };
    sms: { text: string };
    facebook: { url: string };
    twitter: { url: string };
    whatsapp: { url: string };
  };
  stats: {
    totalClicks: number;
    totalSignups: number;
    totalOrders: number;
    totalEarnings: number;
    pendingReferrals: number;
    availableCredit: number;
  };
  milestoneProgress: {
    current: number;
    target: number;
    progress: number;
    nextReward: string;
  };
  recentActivity: Array<{
    id: string;
    refereeEmail: string;
    status: string;
    refereeDiscount: number;
    referrerCredit: number;
    createdAt: string;
    purchasedAt?: string;
  }>;
  availableRewards: Array<{
    id: string;
    amount: number;
    type: string;
    description: string;
    status: string;
    expiresAt?: string;
    createdAt: string;
  }>;
}

interface ReferralDashboardProps {
  className?: string;
}

export function ReferralDashboard({ className = '' }: ReferralDashboardProps) {
  const t = useTranslations();
  const { data: session, status: sessionStatus } = useSession();
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/referrals/stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.error || 'Failed to load referral data');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error fetching referral stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateCode = useCallback(async () => {
    try {
      setGenerating(true);
      setError(null);

      const response = await fetch('/api/referrals/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Refresh stats to get the new code
        await fetchStats();
      } else {
        setError(data.error || 'Failed to generate referral code');
      }
    } catch (err) {
      setError('Failed to generate referral code');
      console.error('Error generating referral code:', err);
    } finally {
      setGenerating(false);
    }
  }, [fetchStats]);

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchStats();
    } else if (sessionStatus === 'unauthenticated') {
      setLoading(false);
    }
  }, [sessionStatus, fetchStats]);

  // Not logged in state
  if (sessionStatus === 'unauthenticated') {
    return (
      <Card className={`bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 ${className}`}>
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-50">
            {t('referral.dashboard.title') || 'Referral Program'}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {t('referral.dashboard.loginRequired') || 'Sign in to access your referral dashboard and start earning rewards.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/admin/login">{t('referral.dashboard.signIn') || 'Sign In'}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (loading || sessionStatus === 'loading') {
    return (
      <Card className={`bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 ${className}`}>
        <CardHeader>
          <Skeleton className="h-8 w-48 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-64 bg-gray-200 dark:bg-gray-700" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-32 w-full bg-gray-200 dark:bg-gray-700" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error && !stats) {
    return (
      <Card className={`bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 ${className}`}>
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-50">
            {t('referral.dashboard.title') || 'Referral Program'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={fetchStats}>{t('referral.dashboard.retry') || 'Try Again'}</Button>
        </CardContent>
      </Card>
    );
  }

  // No code yet - show generate button
  if (!stats?.code) {
    return (
      <Card className={`bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 ${className}`}>
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-50">
            {t('referral.dashboard.title') || 'Give $5, Get $5'}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {t('referral.dashboard.generateDescription') || 'Generate your unique referral code and share it with friends. They get $5 off their first order, and you get $5 credit when they purchase!'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={generateCode}
            loading={generating}
            loadingText={t('referral.dashboard.generating') || 'Generating...'}
            className="w-full sm:w-auto"
          >
            {t('referral.dashboard.generateButton') || 'Generate My Referral Code'}
          </Button>
          {error && (
            <p className="text-red-600 dark:text-red-400 mt-2 text-sm">{error}</p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Full dashboard view
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Share Widget */}
      <ReferralWidget
        code={stats.code}
        shareUrl={stats.shareUrl}
        shareUrls={stats.shareUrls}
        referrerName={session?.user?.name?.split(' ')[0] || 'Friend'}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {stats.stats.totalOrders}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('referral.stats.completedReferrals') || 'Completed Referrals'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${stats.stats.totalEarnings.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('referral.stats.totalEarned') || 'Total Earned'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${stats.stats.availableCredit.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('referral.stats.availableCredit') || 'Available Credit'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.stats.pendingReferrals}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('referral.stats.pending') || 'Pending'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Milestone Progress */}
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-gray-50">
            {t('referral.milestone.title') || 'Milestone Progress'}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {stats.milestoneProgress.current} / {stats.milestoneProgress.target} {t('referral.milestone.referrals') || 'referrals'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={stats.milestoneProgress.progress} className="h-3" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('referral.milestone.nextReward') || 'Next reward'}: {stats.milestoneProgress.nextReward}
          </p>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      {stats.availableRewards.length > 0 && (
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-gray-50">
              {t('referral.rewards.title') || 'Your Rewards'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.availableRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-50">
                      ${reward.amount.toFixed(2)} {t('referral.rewards.credit') || 'Credit'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {reward.description}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {t('referral.rewards.available') || 'Available'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      {stats.recentActivity.length > 0 && (
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-gray-50">
              {t('referral.activity.title') || 'Recent Activity'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-50">
                      {activity.refereeEmail}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    className={
                      activity.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : activity.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }
                  >
                    {activity.status === 'COMPLETED'
                      ? (t('referral.activity.completed') || 'Completed')
                      : activity.status === 'PENDING'
                        ? (t('referral.activity.pending') || 'Pending')
                        : activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ReferralDashboard;
