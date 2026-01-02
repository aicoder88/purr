'use client';

/**
 * ReferralCheckoutWidget Component
 * Widget for applying referral codes at checkout
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from '@/lib/translation-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ReferralCheckoutWidgetProps {
  email: string;
  onApplied: (discount: number, code: string) => void;
  onRemoved: () => void;
  className?: string;
}

export function ReferralCheckoutWidget({
  email,
  onApplied,
  onRemoved,
  className = '',
}: ReferralCheckoutWidgetProps) {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [referrerName, setReferrerName] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(false);

  const applyCode = useCallback(async () => {
    if (!code.trim()) {
      setError(t.referral?.checkout?.enterCode || 'Please enter a referral code');
      return;
    }

    if (!email) {
      setError(t.referral?.checkout?.emailRequired || 'Please enter your email first');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/referrals/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAppliedCode(data.data.code);
        setDiscount(data.data.discount);
        setReferrerName(data.data.referrerName);
        onApplied(data.data.discount, data.data.code);
        setShowInput(false);
      } else {
        setError(data.error || t.referral?.checkout?.invalidCode || 'Invalid referral code');
      }
    } catch (err) {
      setError(t.referral?.checkout?.error || 'Failed to apply code. Please try again.');
      console.error('Error applying referral code:', err);
    } finally {
      setLoading(false);
    }
  }, [code, email, onApplied, t.referral?.checkout]);

  const removeCode = useCallback(() => {
    setAppliedCode(null);
    setDiscount(0);
    setReferrerName(null);
    setCode('');
    setError(null);
    onRemoved();
  }, [onRemoved]);

  // If code is already applied, show success state
  if (appliedCode) {
    return (
      <div className={`bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">
                {t.referral?.checkout?.applied || 'Referral code applied!'}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {referrerName
                  ? (t.referral?.checkout?.referredBy || 'Referred by {name}').replace('{name}', referrerName)
                  : appliedCode}
                {' - '}
                <span className="font-semibold">${discount.toFixed(2)} {t.referral?.checkout?.off || 'off'}</span>
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeCode}
            className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 hover:bg-green-100 dark:hover:bg-green-800"
          >
            {t.referral?.checkout?.remove || 'Remove'}
          </Button>
        </div>
      </div>
    );
  }

  // Show toggle to reveal input
  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className={`text-left w-full text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline cursor-pointer ${className}`}
      >
        {t.referral?.checkout?.haveCode || 'Have a referral code? Click here'}
      </button>
    );
  }

  // Show input form
  return (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.referral?.checkout?.enterReferralCode || 'Enter Referral Code'}
        </label>
        <button
          onClick={() => {
            setShowInput(false);
            setError(null);
            setCode('');
          }}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError(null);
          }}
          placeholder="e.g., SARAH15-PURR"
          className="flex-1 font-mono uppercase bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 border-gray-200 dark:border-gray-700"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              applyCode();
            }
          }}
        />
        <Button
          onClick={applyCode}
          loading={loading}
          loadingText={t.referral?.checkout?.applying || 'Applying...'}
          disabled={!code.trim() || loading}
        >
          {t.referral?.checkout?.apply || 'Apply'}
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <ExclamationIcon className="h-4 w-4" />
          {error}
        </p>
      )}

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {t.referral?.checkout?.discountNote || 'Get $5 off your order with a friend\'s referral code'}
      </p>
    </div>
  );
}

// Icon Components
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ExclamationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default ReferralCheckoutWidget;
