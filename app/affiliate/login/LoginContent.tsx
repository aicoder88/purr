"use client";

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function LoginContent() {
    const t = useTranslations();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Check if already logged in as affiliate
    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            if (session?.user?.role === 'affiliate') {
                router.push('/affiliate/dashboard');
            }
        };
        checkSession();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('affiliate-credentials', {
                email: email.toLowerCase().trim(),
                password,
                redirect: false,
                callbackUrl: '/affiliate/dashboard'
            });

            if (result?.error) {
                setError(t('affiliateDashboard.login.invalidCredentials') || 'Invalid email or password');
                setLoading(false);
            } else if (result?.ok) {
                // Wait a moment for session to be set, then redirect
                setTimeout(() => {
                    router.push('/affiliate/dashboard');
                }, 100);
            } else {
                setError('Login failed. Please try again.');
                setLoading(false);
            }
        } catch {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Link href="/" className="block">
                        <h1 className="font-heading text-center text-2xl font-bold text-purple-600 text-purple-400">
                            Purrify
                        </h1>
                    </Link>
                    <h2 className="font-heading mt-6 text-center text-3xl font-extrabold text-gray-900 text-gray-100">
                        {t('affiliateDashboard.loginTitle') || 'Affiliate Login'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 text-gray-400">
                        Sign in to your affiliate dashboard
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-50 bg-red-900/20 p-4">
                            <p className="text-sm text-red-800 text-red-200">{error}</p>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                {t('affiliateDashboard.login.email') || 'Email address'}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 border-gray-700 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-100 bg-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                placeholder={t('affiliateDashboard.login.email') || 'Email address'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                {t('affiliateDashboard.login.password') || 'Password'}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 border-gray-700 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-100 bg-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                placeholder={t('affiliateDashboard.login.password') || 'Password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white text-gray-100 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading
                                ? (t('affiliateDashboard.login.loggingIn') || 'Signing in...')
                                : (t('affiliateDashboard.login.loginButton') || 'Sign in')
                            }
                        </button>
                    </div>
                </form>

                <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600 text-gray-400">
                        {t('affiliateDashboard.login.noAccount')}{' '}
                        <Link
                            href="/affiliate/"
                            className="font-medium text-purple-600 hover:text-purple-500 text-purple-400 hover:text-purple-300"
                        >
                            {t('affiliateDashboard.login.applyNow') || 'Apply to become an affiliate'}
                        </Link>
                    </p>
                    <p className="text-sm text-gray-600 text-gray-400">
                        <Link
                            href="/affiliate/forgot-password"
                            className="font-medium text-purple-600 hover:text-purple-500 text-purple-400 hover:text-purple-300"
                        >
                            {t('affiliateDashboard.login.forgotPassword') || 'Forgot your password?'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
