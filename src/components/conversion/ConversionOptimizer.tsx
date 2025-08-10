import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { ExitIntentPopup, useExitIntent } from './ExitIntentPopup';
import { LivePurchaseNotifications, LiveVisitorCounter } from '../social-proof/LivePurchaseNotifications';
import { ScarcityIndicator } from '../urgency/ScarcityIndicators';

interface ConversionOptimizerProps {
  enabled?: boolean;
  pageType?: 'homepage' | 'product' | 'checkout' | 'cart';
  productId?: string;
}

export function ConversionOptimizer({ 
  enabled = true, 
  pageType = 'homepage',
  productId 
}: ConversionOptimizerProps) {
  const { items, cartAbandoned, checkoutStarted, lastActivity } = useCart();
  const { showExitIntent, closeExitIntent, hasShown } = useExitIntent(enabled);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [offerType, setOfferType] = useState<'discount' | 'shipping' | 'bundle'>('discount');

  useEffect(() => {
    // Determine the best offer based on page type and cart contents
    if (pageType === 'product' && !items.length) {
      setOfferType('shipping'); // Free shipping for first-time visitors
    } else if (items.length > 0 && !checkoutStarted) {
      setOfferType('discount'); // Discount for cart abandoners
    } else if (pageType === 'homepage') {
      setOfferType('bundle'); // Bundle offer for homepage visitors
    }
  }, [pageType, items.length, checkoutStarted]);

  const handleEmailCapture = async (email: string) => {
    try {
      // Store email for future cart recovery
      if (typeof window !== 'undefined') {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('emailCapturedAt', new Date().toISOString());
      }

      // Track email capture
      if (window.gtag) {
        window.gtag('event', 'email_capture', {
          event_category: 'conversion',
          event_label: 'exit_intent',
          value: 1
        });
      }

      // Send welcome email with discount code
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'exit_intent',
          offer: offerType,
          page: pageType
        })
      });

      setEmailCaptured(true);

      // Show success message
      setTimeout(() => {
        closeExitIntent();
      }, 2000);

    } catch (error) {
      console.error('Email capture failed:', error);
    }
  };

  if (!enabled) return null;

  return (
    <>
      {/* Exit Intent Popup */}
      <ExitIntentPopup
        isOpen={showExitIntent && !emailCaptured}
        onClose={closeExitIntent}
        onEmailCapture={handleEmailCapture}
        offer={offerType}
      />

      {/* Social Proof Notifications */}
      {pageType !== 'checkout' && (
        <LivePurchaseNotifications 
          enabled={true}
          position="bottom-left"
          maxNotifications={2}
        />
      )}

      {/* Live Visitor Counter */}
      {pageType === 'homepage' && <LiveVisitorCounter />}

      {/* Scarcity Indicators for Product Pages */}
      {pageType === 'product' && productId && (
        <div className="fixed bottom-4 right-4 z-40 max-w-sm">
          <ScarcityIndicator
            productId={productId}
            variant="banner"
            showRecentSales={true}
          />
        </div>
      )}

      {/* Cart Abandonment Warning */}
      {cartAbandoned && items.length > 0 && !checkoutStarted && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <div className="text-center">
            <p className="font-bold">⏰ Your Cart Expires Soon!</p>
            <p className="text-sm">Complete your order to avoid losing your items</p>
          </div>
        </div>
      )}

      {/* Success Message After Email Capture */}
      {emailCaptured && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-bold">Success! 🎉</p>
              <p className="text-sm">Check your email for your discount code!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Hook for A/B testing different conversion strategies
export function useConversionTests() {
  const [variant, setVariant] = useState<'control' | 'aggressive' | 'subtle'>('control');

  useEffect(() => {
    // Simple A/B test implementation
    const savedVariant = localStorage.getItem('conversionVariant');
    let activeVariant: 'control' | 'aggressive' | 'subtle';
    
    if (savedVariant && ['control', 'aggressive', 'subtle'].includes(savedVariant)) {
      activeVariant = savedVariant as 'control' | 'aggressive' | 'subtle';
      setVariant(activeVariant);
    } else {
      const random = Math.random();
      
      if (random < 0.33) {
        activeVariant = 'control';
      } else if (random < 0.66) {
        activeVariant = 'aggressive';
      } else {
        activeVariant = 'subtle';
      }
      
      setVariant(activeVariant);
      localStorage.setItem('conversionVariant', activeVariant);
    }

    // Track A/B test assignment
    if (window.gtag) {
      window.gtag('event', 'ab_test_assigned', {
        event_category: 'experiment',
        event_label: 'conversion_optimizer',
        custom_parameter_1: activeVariant
      });
    }
  }, []); // Remove variant from dependencies since we're setting it inside

  const getSettings = () => {
    switch (variant) {
      case 'aggressive':
        return {
          exitIntentEnabled: true,
          exitIntentDelay: 1000, // Show after 1 second of exit intent
          socialProofEnabled: true,
          socialProofFrequency: 10000, // Every 10 seconds
          scarcityEnabled: true,
          urgencyEnabled: true
        };
      case 'subtle':
        return {
          exitIntentEnabled: true,
          exitIntentDelay: 5000, // Show after 5 seconds of exit intent
          socialProofEnabled: true,
          socialProofFrequency: 30000, // Every 30 seconds
          scarcityEnabled: false,
          urgencyEnabled: false
        };
      default: // control
        return {
          exitIntentEnabled: false,
          exitIntentDelay: 0,
          socialProofEnabled: false,
          socialProofFrequency: 0,
          scarcityEnabled: false,
          urgencyEnabled: false
        };
    }
  };

  return {
    variant,
    settings: getSettings()
  };
}

// Email capture form for various use cases
export function EmailCaptureForm({ 
  onCapture, 
  placeholder = "Enter your email",
  buttonText = "Get My Discount",
  offer = "15% OFF",
  className = ""
}: {
  onCapture: (email: string) => void;
  placeholder?: string;
  buttonText?: string;
  offer?: string;
  className?: string;
}) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      await onCapture(email);
      setIsSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Email capture error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`text-center p-4 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <div className="text-green-600 font-medium">✅ Success!</div>
        <div className="text-sm text-green-700">Check your email for your {offer} code!</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="flex space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 transition-all"
        >
          {isSubmitting ? '...' : buttonText}
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Get {offer} + exclusive cat care tips. Unsubscribe anytime.
      </p>
    </form>
  );
}