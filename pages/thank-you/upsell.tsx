import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { getLocalizedUrl } from '../../src/lib/seo-utils';
import { formatProductPrice } from '../../src/lib/pricing';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { Clock, Check, Package, Zap, Shield } from 'lucide-react';

const TIMER_DURATION = 10 * 60; // 10 minutes in seconds

// Helper function to send upsell emails
const sendUpsellEmail = async (
  email: string,
  type: 'declined' | 'expired',
  locale: string,
  sessionId?: string
) => {
  try {
    const response = await fetch('/api/upsell/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        type,
        locale,
        sessionId
      })
    });

    const data = await response.json();

    if (!data.success) {
      console.error('Failed to send upsell email:', data.error);
    } else {
      console.log(`Upsell ${type} email sent successfully:`, data.emailId);
    }

    return data;
  } catch (error) {
    console.error('Error sending upsell email:', error);
    return { success: false, error };
  }
};

const UpsellPage = () => {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isLoading, setIsLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  const standardAutoshipPrice = formatProductPrice('standardAutoship', locale);
  const originalPrice = '$44.97';
  const savings = '$12.98';
  const savingsPercent = '29%';

  useEffect(() => {
    // Get customer email from URL params or sessionStorage
    const { email} = router.query;
    if (email && typeof email === 'string') {
      setCustomerEmail(email);
      sessionStorage.setItem('upsell_customer_email', email);
    } else {
      const storedEmail = sessionStorage.getItem('upsell_customer_email');
      if (storedEmail) {
        setCustomerEmail(storedEmail);
      }
    }

    // Analytics tracking - page loaded
    if (typeof globalThis.window !== 'undefined') {
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag('event', 'page_view', {
          page_title: 'Upsell Offer',
          page_location: window.location.href,
          page_path: '/thank-you/upsell'
        });
      }
    }

    let emailSent = false;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);

          // Analytics tracking - timer expired
          if (typeof globalThis.window !== 'undefined') {
            const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
            if (gtag) {
              gtag('event', 'upsell_timer_expired', {
                event_category: 'ecommerce',
                event_label: 'post_purchase_upsell_expired',
                value: 0
              });
            }
          }

          // Send recovery email when timer expires (only once)
          if (!emailSent && customerEmail) {
            emailSent = true;
            const sessionId = typeof router.query.session_id === 'string' ? router.query.session_id : undefined;

            sendUpsellEmail(customerEmail, 'expired', locale, sessionId).then((result) => {
              if (result.success) {
                console.log('Timer expiry email sent successfully');

                // Track email sent event
                if (typeof globalThis.window !== 'undefined') {
                  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
                  if (gtag) {
                    gtag('event', 'upsell_email_sent', {
                      event_category: 'email',
                      event_label: 'upsell_expired_email',
                      email_type: 'expired'
                    });
                  }
                }
              }
            });
          }

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, locale, customerEmail]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddToOrder = async () => {
    setIsLoading(true);

    // Analytics tracking - upsell accepted
    if (typeof globalThis.window !== 'undefined') {
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag('event', 'upsell_accepted', {
          event_category: 'ecommerce',
          event_label: 'post_purchase_upsell_accepted',
          value: 31.99, // Autoship price
          currency: 'CAD',
          items: [{
            item_id: 'purrify-50g-autoship',
            item_name: 'Purrify 50g Autoship',
            price: 31.99,
            quantity: 1
          }]
        });
      }
    }

    // Redirect to checkout with autoship product
    const checkoutUrl = getLocalizedUrl('/checkout?product=purrify-50g-autoship&upsell=true', locale);
    window.location.href = checkoutUrl;
  };

  const handleNoThanks = async () => {
    // Analytics tracking - upsell declined
    if (typeof globalThis.window !== 'undefined') {
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag('event', 'upsell_declined', {
          event_category: 'ecommerce',
          event_label: 'post_purchase_upsell_declined',
          value: 0
        });
      }
    }

    // Send follow-up email if customer declined
    if (customerEmail) {
      const sessionId = typeof router.query.session_id === 'string' ? router.query.session_id : undefined;

      // Don't await - send in background and redirect immediately
      sendUpsellEmail(customerEmail, 'declined', locale, sessionId).then((result) => {
        if (result.success) {
          console.log('Declined follow-up email sent successfully');

          // Track email sent event
          if (typeof globalThis.window !== 'undefined') {
            const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
            if (gtag) {
              gtag('event', 'upsell_email_sent', {
                event_category: 'email',
                event_label: 'upsell_declined_email',
                email_type: 'declined'
              });
            }
          }
        }
      });
    }

    const homeUrl = getLocalizedUrl('/?skip_upsell=true', locale);
    window.location.href = homeUrl;
  };

  const isExpired = timeLeft === 0;

  return (
    <>
      <Head>
        <title>{t.upsell?.pageTitle || 'Special One-Time Offer - Purrify'}</title>
        <meta
          name="description"
          content={t.upsell?.metaDescription || 'Exclusive one-time offer for new customers. Save 25% on quarterly autoship subscription.'}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Container>
        <div className="max-w-4xl mx-auto py-8 md:py-16">
          {/* Countdown Timer */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 text-white dark:text-gray-100 px-6 py-3 rounded-full text-lg md:text-xl font-bold mb-4 shadow-lg">
              <Clock className="w-6 h-6 mr-2" />
              {isExpired
                ? (t.upsell?.offerExpired || 'Offer Expired')
                : `${t.upsell?.offerExpiresIn || 'Offer expires in'}: ${formatTime(timeLeft)}`
              }
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">
              {t.upsell?.headline || 'Wait! One-Time Exclusive Offer'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
              {t.upsell?.subheadline || 'Add autoship to your order and save 25%'}
            </p>
          </div>

          {/* Product Showcase */}
          <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-8 border-2 border-[#5B2EFF] dark:border-[#3694FF]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
              {/* Product Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xl">
                  <Image
                    src="/optimized/60g.webp"
                    alt="Purrify 50g Autoship - 3 Month Supply"
                    width={300}
                    height={300}
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-2 right-2 bg-[#03E46A] text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">
                    {t.upsell?.saveBadge || `SAVE ${savingsPercent}`}
                  </div>
                </div>
              </div>

              {/* Offer Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-50">
                    {t.upsell?.productTitle || 'Purrify 50g Autoship'}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {t.upsell?.productSubtitle || '3-Month Supply (3 × 50g bags)'}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-[#5B2EFF] dark:text-[#3694FF]">
                        {standardAutoshipPrice}
                      </span>
                      <span className="text-2xl text-gray-400 dark:text-gray-500 line-through">
                        {originalPrice}
                      </span>
                    </div>
                    <div className="inline-flex items-center bg-[#03E46A]/10 dark:bg-[#03E46A]/20 text-[#03E46A] dark:text-[#03E46A] px-4 py-2 rounded-full text-sm font-semibold">
                      {t.upsell?.youSave || 'You save'} {savings} ({savingsPercent})
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {[
                    t.upsell?.benefit1 || 'Never run out - delivered every 3 months',
                    t.upsell?.benefit2 || 'Free shipping included (save $7.99)',
                    t.upsell?.benefit3 || 'Lock in this special price forever',
                    t.upsell?.benefit4 || 'Cancel or skip anytime (no commitments)',
                    t.upsell?.benefit5 || 'Automatic reminders before each shipment'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[#03E46A] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToOrder}
                disabled={isExpired || isLoading}
                size="lg"
                className="w-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] disabled:from-gray-400 disabled:to-gray-500 text-white dark:text-gray-100 font-bold py-6 text-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Package className="w-6 h-6 mr-2" />
                {isLoading
                  ? (t.upsell?.processing || 'Processing...')
                  : isExpired
                    ? (t.upsell?.offerExpired || 'Offer Expired')
                    : (t.upsell?.addToOrder || 'Yes! Add to My Order')
                }
              </Button>

              <button
                onClick={handleNoThanks}
                disabled={isLoading}
                className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium py-3 transition-colors"
              >
                {t.upsell?.noThanks || 'No thanks, I prefer to pay full price later'}
              </button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <Zap className="w-12 h-12 text-[#5B2EFF] dark:text-[#3694FF] mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                {t.upsell?.feature1Title || 'Instant Activation'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t.upsell?.feature1Description || 'Your autoship starts immediately after this order'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <Shield className="w-12 h-12 text-[#03E46A] mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                {t.upsell?.feature2Title || '100% Satisfaction'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t.upsell?.feature2Description || '30-day money-back guarantee on every shipment'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <Package className="w-12 h-12 text-[#FF3131] dark:text-[#FF5050] mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                {t.upsell?.feature3Title || 'Flexible Control'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t.upsell?.feature3Description || 'Skip, pause, or cancel online anytime'}
              </p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-[#5B2EFF]/10 to-[#FF3131]/10 dark:from-[#3694FF]/10 dark:to-[#FF5050]/10 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 italic">
              &quot;{t.upsell?.testimonialText || 'I almost skipped the autoship offer, but I\'m so glad I didn\'t! It\'s one less thing to remember, and the savings add up. Plus, I never run out right when I need it most.'}&quot;
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-50">
              {t.upsell?.testimonialAuthor || '— Sarah M., Toronto'}
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h3 className="font-heading text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-50">
              {t.upsell?.faqTitle || 'Common Questions'}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                  {t.upsell?.faq1Question || 'Can I cancel anytime?'}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.upsell?.faq1Answer || 'Absolutely! Cancel, skip, or modify your subscription anytime from your account dashboard. No fees, no hassles.'}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                  {t.upsell?.faq2Question || 'When will I be charged?'}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.upsell?.faq2Answer || 'You\'ll be charged today for this special offer. Your next shipment will be in 3 months, and you\'ll receive a reminder email 7 days before.'}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                  {t.upsell?.faq3Question || 'Is the price locked in?'}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.upsell?.faq3Answer || 'Yes! This special price is locked in for as long as you remain subscribed. You\'ll never pay more than this rate.'}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t.upsell?.bottomNote || 'This one-time offer is only available immediately after your first purchase'}
            </p>
            <Link
              href={getLocalizedUrl('/', locale)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
            >
              {t.upsell?.returnHome || 'Return to homepage'}
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UpsellPage;
