'use client';

import { useState } from 'react';
import { getSession, signIn } from '@/lib/auth/client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerAuthProps {
  onLogin: (customer: { id: string; email: string }) => void;
}

export function CustomerAuth({ onLogin }: CustomerAuthProps) {
  const t = useTranslations('auth.customer');
  const shared = useTranslations('auth.shared');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const completeLogin = async () => {
    const session = await getSession();
    if (session?.user?.role === 'customer' && session.user.id && session.user.email) {
      onLogin({
        id: session.user.id,
        email: session.user.email,
      });
      return;
    }

    setError(shared('genericError'));
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('customer-credentials', {
        email: loginForm.email.trim().toLowerCase(),
        password: loginForm.password,
        redirect: false,
        callbackUrl: '/customer/portal',
      });

      if (result?.error) {
        setError(t('errors.invalidCredentials'));
        return;
      }

      await completeLogin();
    } catch {
      setError(shared('genericError'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setError(t('errors.passwordMismatch'));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
          email: registerForm.email,
          phone: registerForm.phone,
          password: registerForm.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || shared('genericError'));
      }

      const signInResult = await signIn('customer-credentials', {
        email: registerForm.email.trim().toLowerCase(),
        password: registerForm.password,
        redirect: false,
        callbackUrl: '/customer/portal',
      });

      if (signInResult?.error) {
        throw new Error(t('errors.invalidCredentials'));
      }

      await completeLogin();
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : shared('genericError'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await signIn('google', {
        callbackUrl: '/customer/portal',
      });
    } catch {
      setError(shared('genericError'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="font-heading mt-6 text-3xl font-bold text-gray-900 dark:text-gray-50">
            {mode === 'login' ? t('title') : t('createTitle')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {mode === 'login' ? t('subtitle') : t('createSubtitle')}
          </p>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {mode === 'login' ? (
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{shared('email')}</span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                  placeholder={shared('emailPlaceholder')}
                  value={loginForm.email}
                  onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{shared('password')}</span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full rounded-md px-4 py-2 text-sm font-medium text-white transition',
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              {loading ? shared('working') : t('signIn')}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              <span className="text-xs uppercase tracking-wide text-gray-500">{shared('or')}</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-800"
            >
              {shared('continueWithGoogle')}
            </button>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <button type="button" className="hover:underline" onClick={() => setMode('register')}>
                {t('switchToRegister')}
              </button>
              <Link href="/forgot-password?portal=customer" className="hover:underline">
                {shared('forgotPassword')}
              </Link>
            </div>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('firstName')}</span>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                  value={registerForm.firstName}
                  onChange={(event) => setRegisterForm((current) => ({ ...current, firstName: event.target.value }))}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('lastName')}</span>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                  value={registerForm.lastName}
                  onChange={(event) => setRegisterForm((current) => ({ ...current, lastName: event.target.value }))}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{shared('email')}</span>
              <input
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                value={registerForm.email}
                onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))}
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('phone')}</span>
              <input
                type="tel"
                autoComplete="tel"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                value={registerForm.phone}
                onChange={(event) => setRegisterForm((current) => ({ ...current, phone: event.target.value }))}
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{shared('password')}</span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                  value={registerForm.password}
                  onChange={(event) => setRegisterForm((current) => ({ ...current, password: event.target.value }))}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{shared('confirmPassword')}</span>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                  value={registerForm.confirmPassword}
                  onChange={(event) => setRegisterForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full rounded-md px-4 py-2 text-sm font-medium text-white transition',
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              {loading ? shared('working') : t('createAccount')}
            </button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <button type="button" className="hover:underline" onClick={() => setMode('login')}>
                {t('switchToLogin')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
