import React, { useState } from 'react';
import { Mail, Check, X, Gift, Sparkles, Bell, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';
import { createButtonClasses, createCardClasses, GRADIENTS, COLORS, TRANSITIONS } from '@/lib/theme-utils';
import { LoadingSpinner, CheckIcon } from '@/lib/component-utils';

interface NewsletterSignupProps {
  variant?: 'default' | 'popup' | 'inline' | 'footer';
  showBenefits?: boolean;
  discount?: number;
  className?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  variant = 'default',
  showBenefits = true,
  discount = 10,
  className = ''
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call - replace with actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
      console.log('Newsletter signup:', email);
      
      setStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: t.newsletter?.joinFamily?.benefits?.firstOrder || `${discount}% Off First Order`,
      description: t.newsletter?.joinFamily?.benefits?.firstOrderDesc || 'Exclusive discount for new subscribers'
    },
    {
      icon: Sparkles,
      title: t.newsletter?.joinFamily?.benefits?.catCareTips || 'Cat Care Tips',
      description: t.newsletter?.joinFamily?.benefits?.catCareTipsDesc || 'Weekly expert advice and litter tips'
    },
    {
      icon: Bell,
      title: t.newsletter?.joinFamily?.benefits?.earlyAccess || 'Early Access',
      description: t.newsletter?.joinFamily?.benefits?.earlyAccessDesc || 'Be first to know about new products'
    },
    {
      icon: Users,
      title: t.newsletter?.joinFamily?.benefits?.communityStories || 'Community Stories',
      description: t.newsletter?.joinFamily?.benefits?.communityStoriesDesc || 'Success stories from other cat owners'
    }
  ];

  if (variant === 'popup') {
    const cardClasses = createCardClasses(true);
    const buttonClasses = createButtonClasses('primary');

    return (
      <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${className}`}>
        <div className={`${cardClasses} p-8 max-w-md w-full relative shadow-2xl`}>
          <button
            className={`absolute top-4 right-4 ${COLORS.text.muted} hover:${COLORS.text.tertiary} ${TRANSITIONS.default}`}
            onClick={() => {/* Handle close */}}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <div className={`w-16 h-16 ${GRADIENTS.background.purpleToRed} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Mail className="w-8 h-8 text-white dark:text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${COLORS.text.primary} mb-2`}>
              Get {discount}% Off Your First Order!
            </h3>
            <p className={COLORS.text.tertiary}>
              Join 1,000+ happy customers and get exclusive tips, discounts, and early access to new products.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${COLORS.text.muted}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter?.joinFamily?.emailPlaceholder || "Enter your email address"}
                className={`w-full pl-10 pr-4 py-3 ${COLORS.border.input} rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${COLORS.surface.light} ${COLORS.text.primary}`}
                disabled={status === 'loading'}
              />
            </div>

            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`w-full ${buttonClasses} font-semibold py-3`}
            >
              {status === 'loading' && <LoadingSpinner size="w-5 h-5" />}
              {status === 'success' && <CheckIcon size="w-5 h-5" />}
              <span className={status === 'loading' || status === 'success' ? 'ml-2' : ''}>
                {status === 'success' ? 'Welcome to Purrify!' : `Get ${discount}% Off Now`}
              </span>
            </Button>

            {status === 'error' && (
              <p className={`${COLORS.text.error} text-sm text-center`}>{errorMessage}</p>
            )}
          </form>

          <p className={`text-xs ${COLORS.text.muted} text-center mt-4`}>
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    const cardClasses = createCardClasses(false);
    const buttonClasses = createButtonClasses('secondary');

    return (
      <div className={`${cardClasses} p-6 ${className}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className={`text-lg font-semibold ${COLORS.text.primary} mb-1`}>
              Stay Updated with Purrify
            </h3>
            <p className={`${COLORS.text.tertiary} text-sm`}>
              Get cat care tips and exclusive offers delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className={`flex-1 md:w-64 px-4 py-2 ${COLORS.border.input} rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${COLORS.surface.light} ${COLORS.text.primary}`}
              disabled={status === 'loading'}
            />
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`${buttonClasses} px-6`}
            >
              {status === 'loading' && <LoadingSpinner size="w-4 h-4" />}
              {status === 'success' && <CheckIcon size="w-4 h-4" />}
              {status === 'idle' && 'Subscribe'}
            </Button>
          </form>
        </div>

        {status === 'error' && (
          <p className={`${COLORS.text.error} text-sm mt-2`}>{errorMessage}</p>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    const buttonClasses = createButtonClasses('secondary');

    return (
      <div className={`${GRADIENTS.background.purpleToRedLight} rounded-xl p-6 ${className}`}>
        <div className="text-center mb-6">
          <Mail className={`w-12 h-12 ${COLORS.text.purple} mx-auto mb-4`} />
          <h3 className={`text-xl font-bold ${COLORS.text.primary} mb-2`}>
            Join the Purrify Community
          </h3>
          <p className={COLORS.text.tertiary}>
            Get expert cat care tips and exclusive offers straight to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter?.joinFamily?.emailPlaceholder || "Enter your email address"}
              className={`w-full px-4 py-3 ${COLORS.border.input} rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${COLORS.surface.light} ${COLORS.text.primary}`}
              disabled={status === 'loading'}
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full ${buttonClasses} font-semibold`}
          >
            {status === 'loading' && <LoadingSpinner size="w-5 h-5" />}
            {status === 'success' && <CheckIcon size="w-5 h-5" />}
            <span className={status === 'loading' || status === 'success' ? 'ml-2' : ''}>
              {status === 'success' ? 'Successfully Subscribed!' : 'Subscribe for Free'}
            </span>
          </Button>

          {status === 'error' && (
            <p className={`${COLORS.text.error} text-sm text-center`}>{errorMessage}</p>
          )}
        </form>
      </div>
    );
  }

  // Default variant
  const cardClasses = createCardClasses(true);
  const buttonClasses = createButtonClasses('primary');

  return (
    <div className={`${cardClasses} overflow-hidden ${className}`}>
      {/* Header */}
      <div className={`${GRADIENTS.background.purpleToRed} p-6 text-white text-center`}>
        <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {t.newsletter?.joinFamily?.title || 'Join the Purrify Family'}
        </h2>
        <p className="text-lg opacity-90">
          {t.newsletter?.joinFamily?.subtitle || `Get ${discount}% off your first order plus exclusive cat care tips`}
        </p>
      </div>

      {/* Benefits */}
      {showBenefits && (
        <div className={`p-6 ${COLORS.surface.muted}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${COLORS.surface.purple} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className={`w-4 h-4 ${COLORS.text.purple}`} />
                </div>
                <div>
                  <h4 className={`font-semibold ${COLORS.text.primary} text-sm`}>
                    {benefit.title}
                  </h4>
                  <p className={`${COLORS.text.tertiary} text-xs`}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${COLORS.text.muted}`} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter?.joinFamily?.emailPlaceholder || "Enter your email address"}
              className={`w-full pl-10 pr-4 py-3 ${COLORS.border.input} rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${COLORS.surface.light} ${COLORS.text.primary}`}
              disabled={status === 'loading'}
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full ${buttonClasses} font-semibold py-3`}
          >
            {status === 'loading' && <LoadingSpinner size="w-5 h-5" />}
            {status === 'success' && <CheckIcon size="w-5 h-5" />}
            <span className={status === 'loading' || status === 'success' ? 'ml-2' : ''}>
              {status === 'success' ? 'Welcome to Purrify!' : (t.newsletter?.joinFamily?.ctaButton || `Get ${discount}% Off Your First Order`)}
            </span>
          </Button>

          {status === 'error' && (
            <p className={`${COLORS.text.error} text-sm text-center`}>{errorMessage}</p>
          )}
        </form>

        <div className="mt-4 text-center">
          <p className={`text-xs ${COLORS.text.muted}`}>
            {t.newsletter?.joinFamily?.joinText || 'Join 1,000+ happy customers • No spam, unsubscribe anytime'}
          </p>
          <div className={`flex items-center justify-center space-x-4 mt-2 text-xs ${COLORS.text.muted}`}>
            <span>{t.newsletter?.joinFamily?.features?.weeklyTips || '✓ Weekly tips'}</span>
            <span>{t.newsletter?.joinFamily?.features?.exclusiveOffers || '✓ Exclusive offers'}</span>
            <span>{t.newsletter?.joinFamily?.features?.earlyAccessProducts || '✓ Early access'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
