import { useState, useEffect, useCallback } from 'react';
import { Share2, Copy, Trophy, Gift, Users, TrendingUp, Star, Mail, MessageSquare, Facebook, Twitter, Send, Linkedin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { cn } from '../../lib/utils';

interface ReferralStats {
  userId: string;
  referralCode: string;
  shareUrl: string;
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  totalEarnings: number;
  availableRewards: Reward[];
  recentActivity: ReferralActivity[];
  milestoneProgress: MilestoneProgress;
  socialShares: SocialShareStats;
}

interface Reward {
  id: string;
  type: 'discount' | 'credit' | 'free_product';
  value: number;
  description: string;
  code?: string;
  expiresAt: string;
  isUsed: boolean;
  createdAt: string;
}

interface ReferralActivity {
  id: string;
  refereeEmail: string;
  refereeName?: string;
  status: 'clicked' | 'signed_up' | 'purchased' | 'expired';
  createdAt: string;
  completedAt?: string;
  orderValue?: number;
  rewardIssued?: boolean;
}

interface MilestoneProgress {
  current: number;
  target: number;
  nextReward: string;
  progress: number;
}

interface SocialShareStats {
  email: number;
  sms: number;
  facebook: number;
  twitter: number;
  whatsapp: number;
  linkedin: number;
  total: number;
}

interface ReferralDashboardProps {
  userId: string;
  className?: string;
}

export function ReferralDashboard({ userId, className }: ReferralDashboardProps) {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchReferralStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/referrals/dashboard/${userId}`);
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to load referral data');
      }
    } catch (err) {
      setError('Network error loading referral data');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchReferralStats();
  }, [fetchReferralStats]);

  const copyReferralCode = useCallback(async () => {
    if (!stats) return;

    try {
      await navigator.clipboard.writeText(stats.referralCode);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
        variant: "default"
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive"
      });
    }
  }, [stats, toast]);

  const copyShareUrl = useCallback(async () => {
    if (!stats) return;

    try {
      await navigator.clipboard.writeText(stats.shareUrl);
      toast({
        title: "Link copied!",
        description: "Referral link copied to clipboard",
        variant: "default"
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy link",
        variant: "destructive"
      });
    }
  }, [stats, toast]);

  const handleSocialShare = useCallback((platform: string) => {
    if (!stats) return;

    const message = `I love this cat litter deodorizer that completely eliminates odors! You can get a FREE trial with my code: ${stats.referralCode}`;
    const url = stats.shareUrl;

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${message} ${url} #CatOdorSolution #PurrifyWorks`)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Get your FREE Purrify trial!')}&body=${encodeURIComponent(`Hi!\n\n${message}\n\n${url}\n\nThis stuff actually works - no more embarrassing litter box smell!\n\nBest!`)}`;
        break;
      case 'sms':
        shareUrl = `sms:?body=${encodeURIComponent(`${message} ${url}`)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');

      // Track social share
      if (typeof globalThis.window !== 'undefined' && window.gtag) {
        window.gtag('event', 'referral_social_share', {
          event_category: 'referrals',
          event_label: platform,
          custom_parameter_1: userId
        });
      }
    }
  }, [stats, userId]);

  if (loading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="text-red-500 dark:text-red-400 mb-4">
          {error || 'No referral data available'}
        </div>
        <Button onClick={fetchReferralStats} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'purchased':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200';
      case 'signed_up':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200';
      case 'clicked':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200';
      case 'expired':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Your Referral Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Share Purrify with friends and earn rewards for every successful referral!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalReferrals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.completedReferrals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${stats.totalEarnings}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available Rewards</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.availableRewards.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Referral Code Section */}
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <Share2 className="w-5 h-5 mr-2" />
          Your Referral Code
        </h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <code className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400 flex-1">
              {stats.referralCode}
            </code>
            <Button onClick={copyReferralCode} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>

          <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400 flex-1 break-all">
              {stats.shareUrl}
            </span>
            <Button onClick={copyShareUrl} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-1" />
              Copy Link
            </Button>
          </div>
        </div>
      </Card>

      {/* Social Sharing */}
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Share & Earn
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Share your referral code with friends and family. They get a free trial, you earn rewards!
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <Button
            onClick={() => handleSocialShare('email')}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <Mail className="w-5 h-5 mb-1" />
            <span className="text-xs">Email</span>
          </Button>

          <Button
            onClick={() => handleSocialShare('sms')}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-xs">SMS</span>
          </Button>

          <Button
            onClick={() => handleSocialShare('whatsapp')}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <Send className="w-5 h-5 mb-1" />
            <span className="text-xs">WhatsApp</span>
          </Button>

          <Button
            onClick={() => handleSocialShare('facebook')}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <Facebook className="w-5 h-5 mb-1" />
            <span className="text-xs">Facebook</span>
          </Button>

          <Button
            onClick={() => handleSocialShare('twitter')}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <Twitter className="w-5 h-5 mb-1" />
            <span className="text-xs">Twitter</span>
          </Button>

          <Button
            onClick={() => handleSocialShare('linkedin')}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
          >
            <Linkedin className="w-5 h-5 mb-1" />
            <span className="text-xs">LinkedIn</span>
          </Button>
        </div>
      </Card>

      {/* Milestone Progress */}
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Progress to Next Reward
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              {stats.milestoneProgress.current} of {stats.milestoneProgress.target} referrals
            </span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {Math.round(stats.milestoneProgress.progress)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${stats.milestoneProgress.progress}%` }}
            />
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Next reward: <span className="font-semibold text-gray-900 dark:text-gray-100">
              {stats.milestoneProgress.nextReward}
            </span>
          </p>
        </div>
      </Card>

      {/* Available Rewards */}
      {stats.availableRewards.length > 0 && (
        <Card className="p-6">
          <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Gift className="w-5 h-5 mr-2" />
            Your Rewards ({stats.availableRewards.length})
          </h2>

          <div className="space-y-3">
            {stats.availableRewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
              >
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-green-800 dark:text-green-200">
                    {reward.description}
                  </h3>
                  {reward.code && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Code: <code className="font-mono bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                        {reward.code}
                      </code>
                    </p>
                  )}
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Expires: {new Date(reward.expiresAt).toLocaleDateString()}
                  </p>
                </div>

                <Button variant="outline" size="sm">
                  Use Reward
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Recent Activity
        </h2>

        <div className="space-y-3">
          {stats.recentActivity.length > 0 ? (
            stats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {activity.refereeName || activity.refereeEmail}
                    </span>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(activity.createdAt).toLocaleDateString()}
                    {activity.orderValue && (
                      <span className="ml-2">• Order: ${activity.orderValue}</span>
                    )}
                  </p>
                </div>

                {activity.rewardIssued && (
                  <div className="text-green-600 dark:text-green-400">
                    <Gift className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No referral activity yet. Start sharing to see results here!
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}