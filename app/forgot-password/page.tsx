'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword');
  const shared = useTranslations('auth.shared');
  const searchParams = useSearchParams();
  const portal = searchParams.get('portal') === 'admin' || searchParams.get('portal') === 'retailer'
    ? searchParams.get('portal')
    : 'customer';
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, portal }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || shared('genericError'));
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : shared('genericError'));
    } finally {
      setLoading(false);
    }
  };

  const backHref = portal === 'admin' ? '/admin/login' : portal === 'retailer' ? '/retailer/portal/login' : '/customer/portal';

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{t('title')}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('description').replace('{portal}', t(`portals.${portal}`))}
        </p>

        {submitted ? (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200">
            {t('success')}
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{shared('email')}</span>
              <input
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                placeholder={shared('emailPlaceholder')}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? shared('working') : t('submit')}
            </button>
          </form>
        )}

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href={backHref} className="hover:underline">
            {shared('backToSignIn')}
          </Link>
        </div>
      </div>
    </main>
  );
}
