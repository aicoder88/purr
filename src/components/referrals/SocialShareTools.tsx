import { useState, useCallback, useRef } from 'react';
import { Share2, Copy, Mail, MessageSquare, Facebook, Twitter, Send, Linkedin, QrCode, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { cn } from '../../lib/utils';

interface SocialShareToolsProps {
  referralCode: string;
  shareUrl: string;
  referrerName: string;
  className?: string;
}

interface ShareTemplate {
  platform: string;
  icon: LucideIcon;
  color: string;
  title: string;
  template: string;
}

const SHARE_TEMPLATES: ShareTemplate[] = [
  {
    platform: 'email',
    icon: Mail,
    color: 'text-blue-600 dark:text-blue-400',
    title: 'Email',
    template: `Subject: Get your FREE Purrify trial - eliminates cat litter odor instantly!

Hi!

I discovered this amazing cat litter deodorizer that ACTUALLY works. No more holding your breath when you walk by the litter box!

I was embarrassed about the smell in my home, but Purrify completely eliminated it in 24 hours. The activated carbon technology destroys odors instead of just masking them.

You can get a FREE 12g trial with my referral code: {code}

Try it here: {url}

Trust me, your nose (and your guests) will thank you!

Best!
{name}`
  },
  {
    platform: 'sms',
    icon: MessageSquare,
    color: 'text-green-600 dark:text-green-400',
    title: 'SMS',
    template: `Hey! Found this cat litter deodorizer that actually WORKS. No more embarrassing smell! Get a FREE trial with my code {code}: {url}`
  },
  {
    platform: 'whatsapp',
    icon: Send,
    color: 'text-green-500 dark:text-green-400',
    title: 'WhatsApp',
    template: `🐱 Finally found something that eliminates cat litter smell completely! I was so embarrassed before, but Purrify actually works. Get your FREE trial with my code {code}: {url} #CatParentLife`
  },
  {
    platform: 'facebook',
    icon: Facebook,
    color: 'text-blue-700 dark:text-blue-400',
    title: 'Facebook',
    template: `Cat parents - this is LIFE CHANGING! 🙌

No more embarrassing litter box smell when guests come over. Purrify's activated carbon completely eliminates odors (not just masks them).

My friend can get a FREE trial with code {code}. If you're tired of holding your breath near the litter box, this is for you: {url}

#CatParentLife #PurrifyWorks #CatLitter #OdorControl`
  },
  {
    platform: 'twitter',
    icon: Twitter,
    color: 'text-blue-400 dark:text-blue-300',
    title: 'Twitter',
    template: `🐱 GAME CHANGER for cat parents!

Finally found something that eliminates litter box smell completely. No more embarrassment when guests visit!

Get FREE trial: {code} at {url}

#CatParentLife #PurrifyWorks #CatOdorSolution`
  },
  {
    platform: 'linkedin',
    icon: Linkedin,
    color: 'text-blue-800 dark:text-blue-400',
    title: 'LinkedIn',
    template: `As a pet owner, I'm always looking for effective solutions that actually work.

Purrify's activated carbon technology has completely transformed my home environment - no more litter box odors affecting my work-from-home setup.

Professional recommendation for fellow pet owners: try the free sample with code {code}: {url}

#PetOwners #HomeOffice #ProductRecommendation`
  }
];

export function SocialShareTools({ referralCode, shareUrl, referrerName, className }: SocialShareToolsProps) {
  const [showQR, setShowQR] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Generate personalized message
  const generatePersonalizedMessage = useCallback((template: string) => {
    return template
      .replaceAll(/\{code\}/g, referralCode)
      .replaceAll(/\{url\}/g, shareUrl)
      .replaceAll(/\{name\}/g, referrerName);
  }, [referralCode, shareUrl, referrerName]);

  // Copy template to clipboard
  const copyTemplate = useCallback(async (template: ShareTemplate) => {
    const personalizedMessage = generatePersonalizedMessage(template.template);

    try {
      await navigator.clipboard.writeText(personalizedMessage);
      toast({
        title: "Copied!",
        description: `${template.title} message copied to clipboard`,
        variant: "default"
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy message",
        variant: "destructive"
      });
    }
  }, [generatePersonalizedMessage, toast]);

  // Handle social media sharing
  const handleSocialShare = useCallback((template: ShareTemplate) => {
    const personalizedMessage = generatePersonalizedMessage(template.template);

    let shareUrl = '';

    switch (template.platform) {
      case 'email':
        const subject = personalizedMessage.split('\n')[0].replace('Subject: ', '');
        const body = personalizedMessage.split('\n').slice(2).join('\n');
        shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        break;

      case 'sms':
        shareUrl = `sms:?body=${encodeURIComponent(personalizedMessage)}`;
        break;

      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(personalizedMessage)}`;
        break;

      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(personalizedMessage)}`;
        break;

      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(personalizedMessage)}`;
        break;

      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(personalizedMessage)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');

      // Track social share
      if (typeof globalThis.window !== 'undefined' && window.gtag) {
        window.gtag('event', 'referral_social_share', {
          event_category: 'referrals',
          event_label: template.platform,
          custom_parameter_1: referralCode
        });
      }
    }
  }, [generatePersonalizedMessage, shareUrl, referralCode]);

  // Generate QR code
  const generateQRCode = useCallback(() => {
    if (!qrCanvasRef.current) return;

    const canvas = qrCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR code placeholder - in production, use a proper QR library
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 200, 200);

    // Add white border
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 10, 180, 180);

    // Add placeholder pattern
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 18; j++) {
        if (Math.random() > 0.6) {
          ctx.fillRect(10 + i * 10, 10 + j * 10, 10, 10);
        }
      }
    }
  }, []);

  // Download QR code
  const downloadQRCode = useCallback(() => {
    if (!qrCanvasRef.current) return;

    const canvas = qrCanvasRef.current;
    const link = document.createElement('a');
    link.download = `purrify-referral-${referralCode}-qr.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Downloaded!",
      description: "QR code saved to your device",
      variant: "default"
    });
  }, [referralCode, toast]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Quick Share Buttons */}
      <Card className="p-6">
        <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <Share2 className="w-5 h-5 mr-2" />
          Quick Share
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {SHARE_TEMPLATES.map((template) => (
            <Button
              key={template.platform}
              onClick={() => handleSocialShare(template)}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
            >
              <template.icon className={cn("w-6 h-6 mb-2", template.color)} />
              <span className="text-sm font-medium">{template.title}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Detailed Templates */}
      <Card className="p-6">
        <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Personalized Templates
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Use these pre-written messages optimized for maximum conversion rates
        </p>

        <div className="space-y-4">
          {SHARE_TEMPLATES.map((template) => (
            <div
              key={template.platform}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-200 dark:hover:border-orange-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <template.icon className={cn("w-5 h-5", template.color)} />
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {template.title}
                  </h4>
                  <Badge variant="outline">Optimized</Badge>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => copyTemplate(template)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <template.icon className={cn("w-5 h-5 mr-2", template.color)} />
                          {template.title} Template
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                            {generatePersonalizedMessage(template.template)}
                          </pre>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => copyTemplate(template)}
                            variant="outline"
                            className="flex-1"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Message
                          </Button>
                          <Button
                            onClick={() => handleSocialShare(template)}
                            className="flex-1"
                          >
                            <template.icon className="w-4 h-4 mr-2" />
                            Share Now
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm text-gray-600 dark:text-gray-400">
                <p className="line-clamp-3">
                  {generatePersonalizedMessage(template.template)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* QR Code Generator */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <QrCode className="w-5 h-5 mr-2" />
              QR Code
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Perfect for in-person sharing at vet clinics, pet stores, or with neighbors
            </p>
          </div>

          <Button
            onClick={() => setShowQR(!showQR)}
            variant="outline"
          >
            {showQR ? 'Hide QR' : 'Generate QR'}
          </Button>
        </div>

        {showQR && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-100 p-4 rounded-lg shadow-lg">
                <canvas
                  ref={qrCanvasRef}
                  width={200}
                  height={200}
                  className="border border-gray-200 dark:border-gray-700"
                  onLoad={generateQRCode}
                />
                <div className="text-center mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{referralCode}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Free Trial Code</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <Button onClick={generateQRCode} variant="outline">
                Regenerate QR
              </Button>
              <Button onClick={downloadQRCode}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                How to use your QR code:
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Print and display at your vet clinic or pet store</li>
                <li>• Share digitally in local pet parent groups</li>
                <li>• Add to your email signature</li>
                <li>• Include in social media posts</li>
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* Performance Tips */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          💡 Sharing Tips for Better Results
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Best Times to Share:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• When friends complain about litter smell</li>
              <li>• After cleaning your litter box</li>
              <li>• In pet parent Facebook groups</li>
              <li>• When someone gets a new cat</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">High-Converting Messages:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Focus on embarrassment/relief</li>
              <li>• Mention "actually works" vs other products</li>
              <li>• Emphasize the FREE trial</li>
              <li>• Share your personal transformation</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
