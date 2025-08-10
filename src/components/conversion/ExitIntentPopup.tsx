import { useState, useEffect } from 'react';
import { X, Gift, Clock, Star } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/translation-context';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailCapture: (email: string) => void;
  offer?: 'discount' | 'shipping' | 'bundle';
}

export function ExitIntentPopup({ 
  isOpen, 
  onClose, 
  onEmailCapture,
  offer = 'discount' 
}: ExitIntentPopupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, locale } = useTranslation();

  const offers = {
    discount: {
      title: '🚨 WAIT! Don\'t Let Odors Win!',
      subtitle: 'Get 15% OFF Your First Purrify Order',
      description: 'Join 10,000+ happy cat owners who eliminated litter box odors forever',
      cta: 'CLAIM MY 15% DISCOUNT',
      urgency: 'Limited time offer - expires in 10 minutes!',
      icon: <Gift className="w-8 h-8 text-green-500" />
    },
    shipping: {
      title: '🚚 FREE SHIPPING Alert!',
      subtitle: 'Get FREE Delivery on Any Order',
      description: 'No minimum purchase required. Your cats deserve odor-free litter delivered free!',
      cta: 'GET FREE SHIPPING',
      urgency: 'Today only - FREE shipping to your door!',
      icon: <Star className="w-8 h-8 text-blue-500" />
    },
    bundle: {
      title: '🎁 EXCLUSIVE Bundle Deal!',
      subtitle: 'Save 25% on Our Starter Bundle',
      description: '3x Purrify bags + Premium Scoop + Odor Guide',
      cta: 'GRAB THE BUNDLE',
      urgency: 'Only 12 bundles left at this price!',
      icon: <Clock className="w-8 h-8 text-orange-500" />
    }
  };

  const currentOffer = offers[offer];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Track exit intent email capture
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exit_intent_email_capture', {
          event_category: 'conversion',
          event_label: offer,
          value: 1
        });
      }

      await onEmailCapture(email);
      
      // Show success state
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Email capture error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Track exit intent dismissal
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exit_intent_dismissed', {
        event_category: 'conversion',
        event_label: offer
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 border-2 border-orange-200 dark:border-orange-800">
        <div className="relative p-6">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              {currentOffer.icon}
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentOffer.title}
            </h2>

            {/* Subtitle */}
            <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">
              {currentOffer.subtitle}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300">
              {currentOffer.description}
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>4.8/5 from 247+ reviews</span>
            </div>

            {/* Email Capture Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email to claim offer"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-center border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              />
              
              <Button 
                type="submit" 
                disabled={isSubmitting || !email}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {isSubmitting ? 'CLAIMING...' : currentOffer.cta}
              </Button>
            </form>

            {/* Urgency */}
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm font-medium text-red-700 dark:text-red-400 flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2" />
                {currentOffer.urgency}
              </p>
            </div>

            {/* Trust Signals */}
            <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
              <span>✓ No spam</span>
              <span>✓ Unsubscribe anytime</span>
              <span>✓ Canadian company</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Hook for detecting exit intent
export function useExitIntent(enabled: boolean = true) {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!enabled || hasShown || typeof window === 'undefined') return;

    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the viewport
      if (e.clientY <= 0 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        setShowExitIntent(true);
        setHasShown(true);
        
        // Track exit intent trigger
        if (window.gtag) {
          window.gtag('event', 'exit_intent_triggered', {
            event_category: 'user_behavior',
            event_label: 'mouse_leave'
          });
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !exitIntentTriggered) {
        exitIntentTriggered = true;
        setShowExitIntent(true);
        setHasShown(true);
        
        // Track exit intent trigger
        if (window.gtag) {
          window.gtag('event', 'exit_intent_triggered', {
            event_category: 'user_behavior',
            event_label: 'tab_blur'
          });
        }
      }
    };

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, hasShown]);

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

  return {
    showExitIntent,
    closeExitIntent,
    hasShown
  };
}