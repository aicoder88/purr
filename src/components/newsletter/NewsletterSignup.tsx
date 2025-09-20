import React, { useState } from 'react';
import { Mail, Check, X, Gift, Sparkles, Bell, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';

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
    return (
      <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${className}`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
          <button 
            className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => {/* Handle close */}}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white dark:text-gray-100" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Get {discount}% Off Your First Order!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join 1,000+ happy customers and get exclusive tips, discounts, and early access to new products.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter?.joinFamily?.emailPlaceholder || "Enter your email address"}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                disabled={status === 'loading'}
              />
            </div>

            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-gradient-to-r from-[#5B2EFF] to-[#FF3131] hover:from-[#5B2EFF]/90 hover:to-[#FF3131]/90 text-white dark:text-gray-100 font-semibold py-3"
            >
              {status === 'loading' && (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              )}
              {status === 'success' && <Check className="w-5 h-5 mr-2" />}
              {status === 'success' ? 'Welcome to Purrify!' : `Get ${discount}% Off Now`}
            </Button>

            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center">{errorMessage}</p>
            )}
          </form>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 ${className}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Stay Updated with Purrify
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get cat care tips and exclusive offers delivered to your inbox.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              disabled={status === 'loading'}
            />
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100 px-6"
            >
              {status === 'loading' && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {status === 'success' && <Check className="w-4 h-4" />}
              {status === 'idle' && 'Subscribe'}
            </Button>
          </form>
        </div>
        
        {status === 'error' && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-gradient-to-br from-[#5B2EFF]/10 to-[#FF3131]/10 dark:from-[#5B2EFF]/20 dark:to-[#FF3131]/20 rounded-xl p-6 ${className}`}>
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 text-[#5B2EFF] dark:text-[#3694FF] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Join the Purrify Community
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              disabled={status === 'loading'}
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100 font-semibold"
          >
            {status === 'loading' && (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            )}
            {status === 'success' && <Check className="w-5 h-5 mr-2" />}
            {status === 'success' ? 'Successfully Subscribed!' : 'Subscribe for Free'}
          </Button>

          {status === 'error' && (
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-[#E0EFC7] dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5B2EFF] to-[#FF3131] p-6 text-white dark:text-gray-100 text-center">
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
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[#5B2EFF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-4 h-4 text-[#5B2EFF]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
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
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter?.joinFamily?.emailPlaceholder || "Enter your email address"}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              disabled={status === 'loading'}
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-gradient-to-r from-[#5B2EFF] to-[#FF3131] hover:from-[#5B2EFF]/90 hover:to-[#FF3131]/90 text-white dark:text-gray-100 font-semibold py-3"
          >
            {status === 'loading' && (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            )}
            {status === 'success' && <Check className="w-5 h-5 mr-2" />}
            {status === 'success' ? 'Welcome to Purrify!' : (t.newsletter?.joinFamily?.ctaButton || `Get ${discount}% Off Your First Order`)}
          </Button>

          {status === 'error' && (
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{errorMessage}</p>
          )}
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t.newsletter?.joinFamily?.joinText || 'Join 1,000+ happy customers • No spam, unsubscribe anytime'}
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2 text-xs text-gray-400 dark:text-gray-500">
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
