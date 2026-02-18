'use client';

/**
 * ReferralWidget Component
 * Shareable widget with referral code and copy-to-clipboard functionality
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from '@/lib/translation-context';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ShareUrls {
  shareUrl: string;
  email: { subject: string; body: string };
  sms: { text: string };
  facebook: { url: string };
  twitter: { url: string };
  whatsapp: { url: string };
}

interface ReferralWidgetProps {
  code: string;
  shareUrl: string;
  shareUrls: ShareUrls;
  referrerName?: string;
  className?: string;
  compact?: boolean;
}

export function ReferralWidget({
  code,
  shareUrl,
  shareUrls,
  className = '',
  compact = false,
}: ReferralWidgetProps) {
  const { t, locale } = useTranslation();
  const [copied, setCopied] = useState<'code' | 'url' | null>(null);
  const shareLabels =
    locale === 'fr'
      ? { whatsapp: 'WhatsApp', facebook: 'Facebook' }
      : { whatsapp: 'WhatsApp', facebook: 'Facebook' };

  const copyToClipboard = useCallback(async (text: string, type: 'code' | 'url') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  }, []);

  const handleEmailShare = useCallback(() => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(shareUrls.email.subject)}&body=${encodeURIComponent(shareUrls.email.body)}`;
    window.open(mailtoUrl, '_blank');
  }, [shareUrls.email]);

  const handleSmsShare = useCallback(() => {
    const smsUrl = `sms:?body=${encodeURIComponent(shareUrls.sms.text)}`;
    window.open(smsUrl, '_blank');
  }, [shareUrls.sms]);

  const handleSocialShare = useCallback((url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  }, []);

  if (compact) {
    return (
      <div className={`bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-lg p-4 text-white ${className}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white dark:text-gray-100">
              {t.referral?.widget?.giveGet || 'Give $5, Get $5'}
            </p>
            <p className="text-sm text-purple-100 dark:text-purple-200">
              {t.referral?.widget?.shareDescription || 'Share your code with friends'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <code className="bg-white/20 dark:bg-black/20 px-3 py-1 rounded font-mono text-lg text-white dark:text-gray-100">
              {code}
            </code>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(code, 'code')}
              className="bg-white text-purple-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-purple-700 dark:hover:bg-gray-200"
            >
              {copied === 'code' ? (t.referral?.widget?.copied || 'Copied!') : (t.referral?.widget?.copy || 'Copy')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={`bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 p-6 text-white dark:text-gray-100">
        <CardTitle className="text-2xl text-white dark:text-gray-100">
          {t.referral?.widget?.title || 'Give $5, Get $5'}
        </CardTitle>
        <CardDescription className="text-purple-100 dark:text-purple-200 mt-1">
          {t.referral?.widget?.description || 'Share your code with friends. They get $5 off, you get $5 credit!'}
        </CardDescription>
      </div>

      <CardContent className="pt-6 space-y-6">
        {/* Referral Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.referral?.widget?.yourCode || 'Your Referral Code'}
          </label>
          <div className="flex gap-2">
            <Input
              value={code}
              readOnly
              className="font-mono text-lg text-center tracking-wider bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-50 border-gray-200 dark:border-gray-700"
            />
            <Button
              onClick={() => copyToClipboard(code, 'code')}
              className={copied === 'code' ? 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600' : ''}
            >
              {copied === 'code' ? (
                <span className="flex items-center gap-1">
                  <CheckIcon className="h-4 w-4" />
                  {t.referral?.widget?.copied || 'Copied!'}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <CopyIcon className="h-4 w-4" />
                  {t.referral?.widget?.copyCode || 'Copy Code'}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Share Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.referral?.widget?.shareLink || 'Share Link'}
          </label>
          <div className="flex gap-2">
            <Input
              value={shareUrl}
              readOnly
              className="text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-50 border-gray-200 dark:border-gray-700"
            />
            <Button
              variant="outline"
              onClick={() => copyToClipboard(shareUrl, 'url')}
              className={copied === 'url' ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'}
            >
              {copied === 'url' ? (t.referral?.widget?.copied || 'Copied!') : (t.referral?.widget?.copyLink || 'Copy Link')}
            </Button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t.referral?.widget?.shareVia || 'Share via'}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {/* Email */}
            <Button
              variant="outline"
              onClick={handleEmailShare}
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <EmailIcon className="h-5 w-5" />
              <span className="text-xs">{t.referral?.share?.email || 'Email'}</span>
            </Button>

            {/* SMS */}
            <Button
              variant="outline"
              onClick={handleSmsShare}
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <SmsIcon className="h-5 w-5" />
              <span className="text-xs">{t.referral?.share?.sms || 'SMS'}</span>
            </Button>

            {/* WhatsApp */}
            <Button
              variant="outline"
              onClick={() => handleSocialShare(shareUrls.whatsapp.url)}
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-200 dark:border-gray-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span className="text-xs">{shareLabels.whatsapp}</span>
            </Button>

            {/* Facebook */}
            <Button
              variant="outline"
              onClick={() => handleSocialShare(shareUrls.facebook.url)}
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <FacebookIcon className="h-5 w-5" />
              <span className="text-xs">{shareLabels.facebook}</span>
            </Button>

            {/* Twitter/X */}
            <Button
              variant="outline"
              onClick={() => handleSocialShare(shareUrls.twitter.url)}
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TwitterIcon className="h-5 w-5" />
              <span className="text-xs">X</span>
            </Button>

            {/* Copy Link (mobile fallback) */}
            <Button
              variant="outline"
              onClick={() => copyToClipboard(shareUrl, 'url')}
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <LinkIcon className="h-5 w-5" />
              <span className="text-xs">{t.referral?.share?.link || 'Link'}</span>
            </Button>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-3">
            {t.referral?.widget?.howItWorks || 'How it works'}
          </h4>
          <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex gap-2">
              <span className="flex-shrink-0 w-5 h-5 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-medium">1</span>
              {t.referral?.widget?.step1 || 'Share your code or link with friends'}
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 w-5 h-5 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-medium">2</span>
              {t.referral?.widget?.step2 || 'They get $5 off their first order'}
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 w-5 h-5 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-medium">3</span>
              {t.referral?.widget?.step3 || 'You get $5 credit when they purchase'}
            </li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}

// Icon Components
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function SmsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

export default ReferralWidget;
