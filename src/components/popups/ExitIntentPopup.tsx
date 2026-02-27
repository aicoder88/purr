'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Mail, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import {
  WELCOME_DISCOUNT_CODE,
  WELCOME_DISCOUNT_PERCENT,
} from '@/lib/config/ui-constants';

interface ExitIntentPopupProps {
  /** Delay in ms before popup can trigger (prevents immediate popups) */
  delayMs?: number;
  /** Discount percentage to offer */
  discountPercent?: number;
  /** Discount code to show */
  discountCode?: string;
  /** Optional className for the backdrop */
  className?: string;
}

const STORAGE_KEY = 'purrify_exit_popup_shown';
const STORAGE_SUBSCRIBED_KEY = 'purrify_email_subscribed';

/**
 * ExitIntentPopup - Email capture popup triggered when user is about to leave
 *
 * Features:
 * - Mouse-out detection (desktop) or scroll-up detection (mobile)
 * - Respects localStorage to not show again
 * - Offers discount code for signing up
 * - Full dark mode support
 * - Keyboard accessible (Esc to close)
 */
export function ExitIntentPopup({
  delayMs = 5000,
  discountPercent = WELCOME_DISCOUNT_PERCENT,
  discountCode = WELCOME_DISCOUNT_CODE,
  className,
}: ExitIntentPopupProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasTriggered = useRef(false);
  const isDelayPassed = useRef(false);

  // Combined effect for popup initialization and event listeners
  useEffect(() => {
    if (typeof globalThis.window === 'undefined') return;

    // Check if already shown or subscribed
    const hasShown = localStorage.getItem(STORAGE_KEY);
    const hasSubscribed = localStorage.getItem(STORAGE_SUBSCRIBED_KEY);

    if (hasShown || hasSubscribed) {
      hasTriggered.current = true;
      return;
    }

    // Start delay timer
    const timer = setTimeout(() => {
      isDelayPassed.current = true;
    }, delayMs);

    // Desktop: Mouse-out detection
    const handleMouseOut = (e: MouseEvent) => {
      if (
        !hasTriggered.current &&
        isDelayPassed.current &&
        e.clientY <= 0 &&
        e.relatedTarget === null
      ) {
        hasTriggered.current = true;
        setIsVisible(true);
        localStorage.setItem(STORAGE_KEY, 'true');
      }
    };

    // Mobile: Scroll-up detection
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentScrollY;
        if (
          !hasTriggered.current &&
          isDelayPassed.current &&
          scrollUpDistance > 200 &&
          currentScrollY < 100
        ) {
          hasTriggered.current = true;
          setIsVisible(true);
          localStorage.setItem(STORAGE_KEY, 'true');
        }
      } else {
        scrollUpDistance = 0;
      }
      lastScrollY = currentScrollY;
    };

    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delayMs]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || !email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            source: 'exit-intent',
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to subscribe');
        }

        setIsSuccess(true);
        localStorage.setItem(STORAGE_SUBSCRIBED_KEY, 'true');

        // Close after showing success
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    },
    [email]
  );

  if (!isVisible) return null;

  const content = {
    title: t('exitPopup.title'),
    subtitle:
      t('exitPopup.subtitle') ||
      `Get ${discountPercent}% off your first order`,
    description:
      t('exitPopup.description') ||
      'Join our community of happy cat parents and receive exclusive deals.',
    placeholder: t('exitPopup.placeholder') || 'Enter your email',
    button: t('exitPopup.button') || 'Get My Discount',
    noThanks: t('exitPopup.noThanks') || 'No thanks, I prefer full price',
    successTitle: t('exitPopup.successTitle'),
    successMessage:
      t('exitPopup.successMessage') ||
      `Use code ${discountCode} at checkout for ${discountPercent}% off!`,
  };
  const closePopupLabel =
    locale === 'fr'
      ? 'Fermer la fenetre'
      : 'Close popup';

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-black/60 backdrop-blur-sm',
        'animate-in fade-in duration-300',
        className
      )}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      <div
        className={cn(
          'relative w-full max-w-md',
          'bg-white dark:bg-gray-900',
          'rounded-2xl shadow-2xl',
          'animate-in zoom-in-95 duration-300',
          'border border-gray-200 dark:border-gray-700'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={cn(
            'absolute top-4 right-4 p-2 rounded-full',
            'text-gray-500 hover:text-gray-700',
            'dark:text-gray-400 dark:hover:text-gray-200',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'transition-colors'
          )}
          aria-label={closePopupLabel}
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {content.successTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {content.successMessage}
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <span className="text-2xl font-bold text-[#03E46A] tracking-wider">
                {discountCode}
              </span>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="p-8">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#03E46A] to-[#02C55A] flex items-center justify-center shadow-lg shadow-[#03E46A]/20">
              <Gift className="w-8 h-8 text-white dark:text-gray-900" />
            </div>

            {/* Title */}
            <h3
              id="exit-popup-title"
              className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2"
            >
              {content.title}
            </h3>

            {/* Subtitle */}
            <p className="text-xl font-semibold text-center text-[#03E46A] mb-2">
              {content.subtitle}
            </p>

            {/* Description */}
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              {content.description}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.placeholder}
                  className={cn(
                    'w-full pl-12 pr-4 py-4 rounded-xl',
                    'bg-gray-50 dark:bg-gray-800',
                    'border border-gray-200 dark:border-gray-700',
                    'text-gray-900 dark:text-white',
                    'placeholder:text-gray-500 dark:placeholder:text-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-[#03E46A] focus:border-transparent',
                    'transition-all'
                  )}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              </div>

              {error && (
                <p className="text-red-500 dark:text-red-400 text-sm text-center">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full py-4 rounded-xl font-bold text-lg',
                  'bg-[#03E46A] hover:bg-[#02C55A]',
                  'text-white',
                  'shadow-lg shadow-[#03E46A]/30',
                  'transition-all',
                  'disabled:opacity-50'
                )}
              >
                {isSubmitting ? 'Subscribing...' : content.button}
              </Button>
            </form>

            {/* No thanks link */}
            <button
              onClick={handleClose}
              className="block w-full mt-4 text-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {content.noThanks}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExitIntentPopup;
