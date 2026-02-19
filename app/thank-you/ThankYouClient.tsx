'use client';

import { useState, useEffect, useRef } from 'react';
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
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/translation-context';
import { CONTACT_INFO } from '@/lib/constants';

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

interface ThankYouClientProps {
  orderDetails: OrderDetails | null;
  error?: string;
}

export default function ThankYouClient({ orderDetails, error }: ThankYouClientProps) {
  const { t, locale } = useTranslation();
  const thankYou = t.thankYou!;
  const anytimeLabel =
    locale === 'fr'
      ? 'Nimporte quand'
      : 'Anytime';
  const formattedAmount = orderDetails?.amount ? (orderDetails.amount / 100).toFixed(2) : null;
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [referralLoading, setReferralLoading] = useState(false);
  const purchaseTracked = useRef(false);

  // Track purchase event for TikTok (server-side for reliability)
  useEffect(() => {
    if (!orderDetails || purchaseTracked.current) return;
    purchaseTracked.current = true;

    const trackPurchase = async () => {
      try {
        await fetch('/api/tracking/tiktok', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'Purchase',
            content_id: orderDetails.orderNumber,
            content_name: orderDetails.productName || 'Purrify',
            content_type: 'product',
            quantity: orderDetails.quantity || 1,
            value: orderDetails.amount ? orderDetails.amount / 100 : undefined,
            currency: 'CAD',
            email: orderDetails.customerEmail,
            external_id: orderDetails.orderNumber,
            url: typeof window !== 'undefined' ? window.location.href : undefined,
          }),
        });

        if (typeof window !== 'undefined' && (window as Window & { ttq?: { track: (event: string, data: Record<string, unknown>) => void } }).ttq) {
          (window as Window & { ttq: { track: (event: string, data: Record<string, unknown>) => void } }).ttq.track('Purchase', {
            content_id: orderDetails.orderNumber,
            content_name: orderDetails.productName || 'Purrify',
            content_type: 'product',
            quantity: orderDetails.quantity || 1,
            value: orderDetails.amount ? orderDetails.amount / 100 : undefined,
            currency: 'CAD',
          });
        }
      } catch {
        // Silently ignore tracking errors
      }
    };

    trackPurchase();
  }, [orderDetails]);

  // Determine delivery timeline based on shipping country
  const getDeliveryTimeline = () => {
    const country = orderDetails?.shippingCountry?.toUpperCase();
    if (country === 'CA') {
      return { time: thankYou.deliveryCA, region: '' };
    } else if (country === 'US') {
      return { time: thankYou.deliveryUS, region: '' };
    }
    return { time: thankYou.deliveryIntl || '10-14 business days', region: '' };
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
      } catch {
        // Silently ignore referral generation errors
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
    <div className="max-w-4xl mx-auto py-12 md:py-16">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#03E46A]/10 dark:bg-[#03E46A]/20 mb-6 animate-bounce">
          <CheckCircle2 className="w-14 h-14 text-[#03E46A]" />
        </div>

        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-[#03E46A]">
          {firstName !== 'there'
            ? thankYou.headingWithName.replace('{{name}}', firstName)
            : thankYou.heading}
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
          {thankYou.subheadingExtended}
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
            {thankYou.orderConfirmed}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              {orderDetails.orderNumber && (
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{thankYou.orderNumber}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100 font-mono">#{orderDetails.orderNumber}</span>
                </div>
              )}
              {orderDetails.productName && (
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{thankYou.product}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{orderDetails.productName}</span>
                </div>
              )}
              {orderDetails.quantity && orderDetails.quantity > 1 && (
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{thankYou.quantity}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{orderDetails.quantity}</span>
                </div>
              )}
              {formattedAmount && (
                <div className="flex justify-between py-3 border-t-2 border-gray-200 dark:border-gray-600 mt-2">
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{thankYou.total}</span>
                  <span className="text-lg font-bold text-[#03E46A]">${formattedAmount}</span>
                </div>
              )}
            </div>

            {/* Delivery Timeline */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{thankYou.expectedDelivery}</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{deliveryInfo.time}</p>
                  {deliveryInfo.region && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{deliveryInfo.region}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {thankYou.shipsWithin}
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
                  {thankYou.confirmationSent} <strong>{orderDetails.customerEmail}</strong>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {thankYou.checkSpam}
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
          {thankYou.whatToExpect.heading}
        </h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#03E46A] text-white dark:text-gray-900 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {thankYou.whatToExpect.step1Title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {thankYou.whatToExpect.step1Desc}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500 dark:bg-purple-600 text-white dark:text-white flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {thankYou.whatToExpect.step2Title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {thankYou.whatToExpect.step2Desc}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-2">
                <li>{thankYou.whatToExpect.step2Item1}</li>
                <li>{thankYou.whatToExpect.step2Item2}</li>
                <li>{thankYou.whatToExpect.step2Item3}</li>
                <li>{thankYou.whatToExpect.step2Item4}</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 text-white dark:text-white flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {thankYou.whatToExpect.step3Title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {thankYou.whatToExpect.step3Desc}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-900 dark:text-amber-200">
            <strong>{thankYou.whatToExpect.proTip}</strong> {thankYou.whatToExpect.proTipText}
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
            <h2 className="font-heading text-2xl font-bold mb-2">{thankYou.shareSection.heading}</h2>
            <p className="text-purple-100 dark:text-purple-200">
              {thankYou.shareSection.description}
            </p>
          </div>
        </div>

        {referralLoading ? (
          <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 text-center">
            <p className="text-purple-100 dark:text-purple-200">{thankYou.shareSection.generating}</p>
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
                {thankYou.shareSection.whatsapp}
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white dark:text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Facebook className="w-4 h-4" />
                {thankYou.shareSection.facebook}
              </a>
              <a
                href={`mailto:?subject=You NEED this for your cat's litter box!&body=Hey! I just ordered Purrify and wanted to share - it eliminates litter box odor completely using activated carbon. You can get a FREE trial here: ${shareUrl}`}
                className="flex items-center gap-2 bg-gray-700 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 text-white dark:text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                {thankYou.shareSection.email}
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
                  {thankYou.autoshipCta.heading}
                </h2>
                <span className="bg-[#03E46A] text-white dark:text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                  {thankYou.autoshipCta.saveBadge}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {thankYou.autoshipCta.description}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <p className="text-2xl font-bold text-[#03E46A]">30%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{thankYou.autoshipCta.savings}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <p className="text-2xl font-bold text-[#03E46A]">FREE</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{thankYou.autoshipCta.shipping}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <p className="text-2xl font-bold text-[#03E46A]">{anytimeLabel}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{thankYou.autoshipCta.cancel}</p>
            </div>
          </div>

          <Link href="/#products">
            <Button className="w-full bg-[#03E46A] hover:bg-[#02C55A] text-white dark:text-gray-900 font-bold py-4 text-lg">
              {thankYou.autoshipCta.button} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          <strong>{thankYou.helpSection.question}</strong> {thankYou.helpSection.weAreHere}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            {CONTACT_INFO.email}
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white dark:text-gray-900 bg-[#03E46A] hover:bg-[#02C55A] transition-colors"
          >
            {thankYou.helpSection.returnHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
