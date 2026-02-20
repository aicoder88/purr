'use client';

import React, { useCallback, useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createButtonClasses, createCardClasses, COLORS, GRADIENTS } from '@/lib/theme-utils';
import { CheckIcon, LoadingSpinner } from '@/lib/component-utils';

interface WaitlistSignupProps {
  variant?: 'default' | 'popup' | 'inline' | 'footer';
  showBenefits?: boolean;
  discount?: number;
  className?: string;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

const WAITLIST_MESSAGE =
  'Please add me to the backorder waitlist and notify me when shipping resumes.';

export const WaitlistSignup: React.FC<WaitlistSignupProps> = React.memo(function WaitlistSignup({
  variant = 'default',
  className = '',
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || !email.includes('@')) {
        setStatus('error');
        setErrorMessage('Please enter a valid email address.');
        return;
      }

      setStatus('loading');
      setErrorMessage('');

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Backorder Waitlist',
            email,
            message: WAITLIST_MESSAGE,
          }),
        });

        const data = (await response.json().catch(() => null)) as { message?: string } | null;

        if (!response.ok) {
          throw new Error(data?.message || 'Unable to join the waitlist right now.');
        }

        setStatus('success');
        setEmail('');

        setTimeout(() => setStatus('idle'), 3000);
      } catch (error) {
        setStatus('error');
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again or email support@purrify.ca.'
        );
      }
    },
    [email]
  );

  const cardClasses = createCardClasses(variant === 'popup');
  const buttonClasses = createButtonClasses('primary');

  return (
    <div className={`${cardClasses} overflow-hidden ${className}`}>
      <div className={`${GRADIENTS.background.purpleToRed} p-6 text-white dark:text-white text-center`}>
        <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">Backorder Waitlist</h3>
        <p className="text-base md:text-lg opacity-90">
          Join once and we&apos;ll notify you when shipping opens again.
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${COLORS.text.muted}`}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              {status === 'success' ? 'You are on the waitlist' : 'Join waitlist'}
            </span>
          </Button>

          {status === 'error' && (
            <p className={`${COLORS.text.error} text-sm text-center`}>{errorMessage}</p>
          )}
        </form>

        <p className={`text-xs ${COLORS.text.muted} text-center mt-4`}>
          Submissions go to our Zendesk support queue for stock update notifications.
        </p>
      </div>
    </div>
  );
});

export default WaitlistSignup;
