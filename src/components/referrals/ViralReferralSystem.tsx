 
import { useState, useEffect } from 'react';
import { Share2, Copy, DollarSign, Trophy, Gift, Users, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReferralStats {
  totalReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  currentTier: string;
  nextTierProgress: number;
  recentReferrals: Array<{
    name: string;
    date: string;
    earnings: number;
    status: 'pending' | 'paid' | 'converted';
  }>;
  socialShares: {
    facebook: number;
    instagram: number;
    twitter: number;
    direct: number;
  };
}

interface ReferralTier {
  name: string;
  level: number;
  requiresReferrals: number;
  commission: number;
  perks: string[];
  color: string;
  icon: React.ReactNode;
  badge: string;
}

const REFERRAL_TIERS: ReferralTier[] = [
  {
    name: 'Cat Lover',
    level: 1,
    requiresReferrals: 0,
    commission: 20,
    perks: ['$10 per referral', 'Digital thank you card'],
    color: 'from-gray-400 to-gray-600',
    icon: <Users className="w-5 h-5" />,
    badge: '🐱'
  },
  {
    name: 'Cat Advocate',
    level: 2,
    requiresReferrals: 5,
    commission: 25,
    perks: ['$12.50 per referral', 'Free Purrify 50g monthly', 'Member-only content'],
    color: 'from-blue-400 to-blue-600',
    icon: <Star className="w-5 h-5" />,
    badge: '⭐'
  },
  {
    name: 'Cat Champion',
    level: 3,
    requiresReferrals: 15,
    commission: 30,
    perks: ['$15 per referral', 'Free quarterly bundle', 'VIP support', 'Early product access'],
    color: 'from-purple-400 to-purple-600',
    icon: <Trophy className="w-5 h-5" />,
    badge: '🏆'
  },
  {
    name: 'Cat Royalty',
    level: 4,
    requiresReferrals: 50,
    commission: 35,
    perks: ['$17.50 per referral', 'Annual subscription free', 'Personal account manager', 'Exclusive events'],
    color: 'from-yellow-400 to-orange-500',
    icon: <Crown className="w-5 h-5" />,
    badge: '👑'
  }
];

const SOCIAL_TEMPLATES = {
  facebook: {
    text: "I found the BEST solution for cat litter odors! 🐱 Purrify completely eliminates smells with natural activated carbon. My cats love it and my home is fresh 24/7! Get 25% OFF with my link:",
    hashtags: ["#CatParent", "#PetCare", "#OdorFree", "#CatLitter"]
  },
  instagram: {
    text: "PSA for cat parents: This activated carbon additive CHANGED MY LIFE 🙌 No more embarrassing litter smells when guests come over! Works with ANY litter brand. Swipe for before/after! 25% OFF for my followers 💕",
    hashtags: ["#CatMom", "#CatDad", "#PetHacks", "#OdorControl", "#CatLife", "#PetParents", "#CatTips"]
  },
  twitter: {
    text: "Cat parents, listen up! 🐱 I've tried EVERYTHING for litter odors. Purrify is the only thing that actually works. Natural activated carbon that eliminates (not masks) smells. Get 25% off:",
    hashtags: ["#CatParent", "#PetTips", "#CatLitter", "#OdorFree"]
  },
  email: {
    subject: "Found the holy grail of cat odor control! 🐱",
    text: "Hey! I know you love your cats as much as I do, so I had to share this amazing discovery. I've been using Purrify for 2 months and my litter box literally has ZERO smell now. It's natural activated carbon that works with any litter. I'm obsessed! You can get 25% off with my referral link:"
  }
};

interface ViralReferralSystemProps {
  userId: string;
  initialStats?: Partial<ReferralStats>;
}

export function ViralReferralSystem({ userId, initialStats }: ViralReferralSystemProps) {
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    currentTier: 'Cat Lover',
    nextTierProgress: 0,
    recentReferrals: [],
    socialShares: { facebook: 0, instagram: 0, twitter: 0, direct: 0 },
    ...initialStats
  });

  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof SOCIAL_TEMPLATES>('instagram');

  useEffect(() => {
    // Generate referral code and link
    const code = generateReferralCode(userId);
    const link = `https://www.purrify.ca/?ref=${code}&discount=FRIEND25`;
    
    setReferralCode(code);
    setReferralLink(link);

    // Load user stats
    loadReferralStats(userId);
  }, [userId]);

  const generateReferralCode = (_userId: string): string => {
    // Generate a user-friendly referral code
    const adjectives = ['HAPPY', 'FRESH', 'CLEAN', 'PURE', 'SWEET'];
    const nouns = ['CAT', 'KITTY', 'PAWS', 'PURR', 'MEOW'];
    
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 99) + 1;
    
    return `${adj}${noun}${num}`;
  };

  const loadReferralStats = async (userId: string) => {
    try {
      const response = await fetch(`/api/referrals/stats?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to load referral stats:', error);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      
      // Track copy event
      if (window.gtag) {
        window.gtag('event', 'referral_link_copied', {
          event_category: 'referral',
          event_label: 'clipboard'
        });
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const shareToSocial = (platform: keyof typeof SOCIAL_TEMPLATES) => {
    const template = SOCIAL_TEMPLATES[platform];
    const fullText = `${template.text} ${referralLink}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(fullText)}`;
        break;
      case 'twitter':
        const hashtags = SOCIAL_TEMPLATES.twitter.hashtags.join(',');
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}&hashtags=${hashtags}`;
        break;
      case 'instagram':
        // Instagram doesn't have direct sharing, so copy to clipboard
        copyToClipboard(fullText + '\n\n' + SOCIAL_TEMPLATES.instagram.hashtags.map(h => h).join(' '));
        return;
      case 'email':
        const emailTemplate = SOCIAL_TEMPLATES.email;
        shareUrl = `mailto:?subject=${encodeURIComponent(emailTemplate.subject)}&body=${encodeURIComponent(emailTemplate.text + ' ' + referralLink)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    // Track social share
    if (window.gtag) {
      window.gtag('event', 'referral_shared', {
        event_category: 'referral',
        event_label: platform
      });
    }

    // Update share stats
    setStats(prev => ({
      ...prev,
      socialShares: {
        ...prev.socialShares,
        [platform]: prev.socialShares[platform as keyof typeof prev.socialShares] + 1
      }
    }));
  };

  const getCurrentTier = (): ReferralTier => {
    return REFERRAL_TIERS.find(tier => tier.name === stats.currentTier) || REFERRAL_TIERS[0];
  };

  const getNextTier = (): ReferralTier | null => {
    const currentTier = getCurrentTier();
    return REFERRAL_TIERS.find(tier => tier.level === currentTier.level + 1) || null;
  };

  const calculateProgress = (): number => {
    const nextTier = getNextTier();
    if (!nextTier) return 100;
    
    const progress = (stats.totalReferrals / nextTier.requiresReferrals) * 100;
    return Math.min(progress, 100);
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const progress = calculateProgress();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
          Earn Money Helping Cat Parents
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300">
          Get paid for every friend you help eliminate cat odors forever
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-500 dark:text-blue-400 dark:text-blue-300" />
              <p className="text-2xl font-bold">{stats.totalReferrals}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Total Referrals</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-500 dark:text-green-400" />
              <p className="text-2xl font-bold">${stats.totalEarnings}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Earned</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Gift className="w-8 h-8 mx-auto mb-2 text-purple-500 dark:text-purple-400" />
              <p className="text-2xl font-bold">${stats.pendingEarnings}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r ${currentTier.color} flex items-center justify-center text-white dark:text-gray-100`}>
                {currentTier.icon}
              </div>
              <p className="text-lg font-bold">{currentTier.badge} {currentTier.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{currentTier.commission}% commission</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Progress */}
      {nextTier && (
        <Card className="mb-8">
          <CardHeader>
            <h3 className="font-heading text-xl font-bold flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Progress to {nextTier.badge} {nextTier.name}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>{stats.totalReferrals} referrals</span>
                <span>{nextTier.requiresReferrals} needed</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {nextTier.requiresReferrals - stats.totalReferrals} more referrals to unlock:
                </p>
                <ul className="text-sm text-green-600 dark:text-green-400 dark:text-green-400 mt-2">
                  {nextTier.perks.map((perk, index) => (
                    <li key={index}>• {perk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="share" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="share">Share & Earn</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {/* Share Tab */}
        <TabsContent value="share">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Referral Link */}
            <Card>
              <CardHeader>
                <h3 className="font-heading text-xl font-bold flex items-center">
                  <Share2 className="w-5 h-5 mr-2" />
                  Your Referral Link
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="font-mono text-sm break-all mb-2">{referralLink}</p>
                  <Button 
                    onClick={() => copyToClipboard(referralLink)}
                    className="w-full"
                    variant={copiedLink ? "default" : "outline"}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedLink ? 'Copied!' : 'Copy Link'}
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                    Your Code: {referralCode}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Friends get 25% OFF • You earn ${(50 * currentTier.commission / 100).toFixed(2)} per sale
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Sharing */}
            <Card>
              <CardHeader>
                <h3 className="font-heading text-xl font-bold">Share on Social Media</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Pre-written posts for maximum engagement</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => shareToSocial('instagram')}
                    className="bg-gradient-to-r from-pink-500 to-orange-500 text-white dark:text-gray-100 dark:text-gray-100"
                  >
                    📷 Instagram
                  </Button>
                  <Button 
                    onClick={() => shareToSocial('facebook')}
                    className="bg-blue-600 dark:bg-blue-600 text-white dark:text-gray-100"
                  >
                    📘 Facebook
                  </Button>
                  <Button 
                    onClick={() => shareToSocial('twitter')}
                    className="bg-sky-500 text-white dark:text-gray-100"
                  >
                    🐦 Twitter
                  </Button>
                  <Button 
                    onClick={() => shareToSocial('email')}
                    className="bg-gray-600 dark:bg-gray-600 text-white dark:text-gray-100"
                  >
                    ✉️ Email
                  </Button>
                </div>
                
                {/* Template Preview */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <select 
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value as keyof typeof SOCIAL_TEMPLATES)}
                    className="w-full mb-3 p-2 border rounded"
                  >
                    {Object.keys(SOCIAL_TEMPLATES).map(platform => (
                      <option key={platform} value={platform}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)} Template
                      </option>
                    ))}
                  </select>
                  <p className="text-sm">{SOCIAL_TEMPLATES[selectedTemplate].text}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <h3 className="font-heading text-xl font-bold flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Top Referrers This Month
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "Sarah M.", referrals: 23, earnings: 460, tier: "Cat Royalty" },
                  { rank: 2, name: "Mike R.", referrals: 18, earnings: 315, tier: "Cat Champion" },
                  { rank: 3, name: "Lisa K.", referrals: 15, earnings: 225, tier: "Cat Champion" },
                  { rank: 4, name: "You", referrals: stats.totalReferrals, earnings: stats.totalEarnings, tier: currentTier.name },
                  { rank: 5, name: "David L.", referrals: 8, earnings: 120, tier: "Cat Advocate" }
                ].map((entry, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
                    entry.name === 'You' ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200' : 'bg-gray-50 dark:bg-gray-800'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white dark:text-gray-100 font-bold mr-3 ${
                        entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-400'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <p className="font-semibold">{entry.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{entry.tier}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{entry.referrals} referrals</p>
                      <p className="text-sm text-green-600 dark:text-green-400">${entry.earnings} earned</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <h3 className="font-heading text-xl font-bold">Recent Referrals</h3>
            </CardHeader>
            <CardContent>
              {stats.recentReferrals.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                  <p className="text-gray-500 dark:text-gray-400">No referrals yet. Start sharing to earn money!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentReferrals.map((referral, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-semibold">{referral.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{referral.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">+${referral.earnings}</p>
                        <Badge variant={referral.status === 'paid' ? 'default' : referral.status === 'pending' ? 'secondary' : 'outline'}>
                          {referral.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards">
          <div className="grid md:grid-cols-2 gap-6">
            {REFERRAL_TIERS.map((tier) => (
              <Card key={tier.level} className={`${
                tier.name === currentTier.name ? 'ring-2 ring-orange-500' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center text-white dark:text-gray-100 mr-3`}>
                        {tier.icon}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold">{tier.badge} {tier.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{tier.commission}% commission</p>
                      </div>
                    </div>
                    {tier.name === currentTier.name && (
                      <Badge className="bg-orange-500 dark:bg-orange-600 text-white dark:text-gray-100">Current</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Requires: {tier.requiresReferrals} referrals
                    </p>
                    <div className="space-y-1">
                      {tier.perks.map((perk, perkIndex) => (
                        <p key={perkIndex} className="text-sm text-gray-600 dark:text-gray-300">• {perk}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { REFERRAL_TIERS, SOCIAL_TEMPLATES };
export type { ReferralStats, ReferralTier };
