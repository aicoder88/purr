"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AffiliateLayout from '@/components/affiliate/AffiliateLayout';
import { useTranslations } from 'next-intl';
import {
    User,
    CreditCard,
    Lock,
    Save,
    Check,
    AlertCircle,
    Eye,
    EyeOff
} from 'lucide-react';

interface SettingsData {
    profile: {
        name: string;
        email: string;
        code: string;
        website: string | null;
        status: string;
        memberSince: string;
    };
    payment: {
        method: string | null;
        email: string | null;
    };
}

export default function SettingsContent() {
    const t = useTranslations();
    const router = useRouter();
    const [data, setData] = useState<SettingsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Payment settings form
    const [payoutMethod, setPayoutMethod] = useState<string>('');
    const [payoutEmail, setPayoutEmail] = useState<string>('');
    const [paymentSaving, setPaymentSaving] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    // Password form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const fetchSettings = useCallback(async () => {
        try {
            const response = await fetch('/api/affiliate/dashboard/settings');
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    router.push('/affiliate/login');
                    return;
                }
                throw new Error('Failed to fetch settings');
            }
            const settingsData = await response.json();
            setData(settingsData);
            setPayoutMethod(settingsData.payment.method || '');
            setPayoutEmail(settingsData.payment.email || '');
        } catch (err) {
            console.error('Failed to fetch settings:', err);
            setError(t('affiliateDashboard.errors.loadFailed') || 'Failed to load settings');
        } finally {
            setIsLoading(false);
        }
    }, [t, router]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handlePaymentSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setPaymentSaving(true);
        setPaymentError(null);
        setPaymentSuccess(false);

        try {
            const response = await fetch('/api/affiliate/dashboard/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payoutMethod, payoutEmail }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to save payment settings');
            }

            setPaymentSuccess(true);
            setTimeout(() => setPaymentSuccess(false), 3000);
        } catch (err) {
            setPaymentError(err instanceof Error ? err.message : 'Failed to save settings');
        } finally {
            setPaymentSaving(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordSaving(true);
        setPasswordError(null);
        setPasswordSuccess(false);

        // Validate
        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            setPasswordSaving(false);
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError('New password must be at least 8 characters');
            setPasswordSaving(false);
            return;
        }

        try {
            const response = await fetch('/api/affiliate/dashboard/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to change password');
            }

            setPasswordSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setPasswordSuccess(false), 3000);
        } catch (err) {
            setPasswordError(err instanceof Error ? err.message : 'Failed to change password');
        } finally {
            setPasswordSaving(false);
        }
    };

    return (
        <AffiliateLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-heading text-3xl font-bold text-gray-900 text-gray-100">
                    {t('affiliateDashboard.settings') || 'Settings'}
                </h1>
                <p className="text-gray-600 text-gray-400 mt-1">
                    Manage your account and payment settings.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 bg-red-900/20 border border-red-200 border-red-800 rounded-lg">
                    <p className="text-red-700 text-red-300">{error}</p>
                </div>
            )}

            {isLoading ? (
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6 animate-pulse"
                        >
                            <div className="h-6 bg-gray-200 bg-gray-700 rounded w-32 mb-4" />
                            <div className="space-y-4">
                                <div className="h-10 bg-gray-200 bg-gray-700 rounded" />
                                <div className="h-10 bg-gray-200 bg-gray-700 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : data ? (
                <div className="space-y-6">
                    {/* Profile Information */}
                    <div className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6">
                        <div className="flex items-center space-x-2 mb-6">
                            <User className="w-5 h-5 text-purple-600 text-purple-400" />
                            <h2 className="text-lg font-semibold text-gray-900 text-gray-100">
                                Profile Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                                    Name
                                </label>
                                <p className="text-gray-900 text-gray-100">{data.profile.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                                    Email
                                </label>
                                <p className="text-gray-900 text-gray-100">{data.profile.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                                    Affiliate Code
                                </label>
                                <code className="text-purple-600 text-purple-400 font-mono">
                                    {data.profile.code}
                                </code>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                                    Website
                                </label>
                                <p className="text-gray-900 text-gray-100">
                                    {data.profile.website || 'Not provided'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                                    Member Since
                                </label>
                                <p className="text-gray-900 text-gray-100">
                                    {new Date(data.profile.memberSince).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Settings */}
                    <form
                        onSubmit={handlePaymentSave}
                        className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6"
                    >
                        <div className="flex items-center space-x-2 mb-6">
                            <CreditCard className="w-5 h-5 text-purple-600 text-purple-400" />
                            <h2 className="text-lg font-semibold text-gray-900 text-gray-100">
                                Payment Settings
                            </h2>
                        </div>

                        {paymentError && (
                            <div className="mb-4 p-3 bg-red-50 bg-red-900/20 border border-red-200 border-red-800 rounded-lg flex items-start space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-600 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700 text-red-300">{paymentError}</p>
                            </div>
                        )}

                        {paymentSuccess && (
                            <div className="mb-4 p-3 bg-green-50 bg-green-900/20 border border-green-200 border-green-800 rounded-lg flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-600 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-green-700 text-green-300">
                                    Payment settings saved successfully!
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="payoutMethod"
                                    className="block text-sm font-medium text-gray-700 text-gray-300 mb-1"
                                >
                                    Payout Method
                                </label>
                                <select
                                    id="payoutMethod"
                                    value={payoutMethod}
                                    onChange={(e) => setPayoutMethod(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:ring-purple-400 focus:border-transparent"
                                >
                                    <option value="">Select a method</option>
                                    <option value="PAYPAL">PayPal</option>
                                    <option value="E_TRANSFER">E-Transfer (Canada)</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="payoutEmail"
                                    className="block text-sm font-medium text-gray-700 text-gray-300 mb-1"
                                >
                                    Payout Email
                                </label>
                                <input
                                    type="email"
                                    id="payoutEmail"
                                    value={payoutEmail}
                                    onChange={(e) => setPayoutEmail(e.target.value)}
                                    placeholder="your-paypal-email@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-gray-100 placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:ring-purple-400 focus:border-transparent"
                                />
                                <p className="mt-1 text-sm text-gray-500 text-gray-400">
                                    This is where your payout will be sent
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={paymentSaving}
                                    className="px-4 py-2 bg-purple-600 bg-purple-500 hover:bg-purple-700 hover:bg-purple-600 text-white text-gray-100 font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                                >
                                    {paymentSaving ? (
                                        <>
                                            <svg
                                                className="animate-spin w-4 h-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>Save Payment Settings</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Change Password */}
                    <form
                        onSubmit={handlePasswordChange}
                        className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6"
                    >
                        <div className="flex items-center space-x-2 mb-6">
                            <Lock className="w-5 h-5 text-purple-600 text-purple-400" />
                            <h2 className="text-lg font-semibold text-gray-900 text-gray-100">
                                Change Password
                            </h2>
                        </div>

                        {passwordError && (
                            <div className="mb-4 p-3 bg-red-50 bg-red-900/20 border border-red-200 border-red-800 rounded-lg flex items-start space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-600 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700 text-red-300">{passwordError}</p>
                            </div>
                        )}

                        {passwordSuccess && (
                            <div className="mb-4 p-3 bg-green-50 bg-green-900/20 border border-green-200 border-green-800 rounded-lg flex items-start space-x-2">
                                <Check className="w-5 h-5 text-green-600 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-green-700 text-green-300">
                                    Password changed successfully!
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="currentPassword"
                                    className="block text-sm font-medium text-gray-700 text-gray-300 mb-1"
                                >
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:ring-purple-400 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:text-gray-300"
                                    >
                                        {showCurrentPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="newPassword"
                                    className="block text-sm font-medium text-gray-700 text-gray-300 mb-1"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:ring-purple-400 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:text-gray-300"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                <p className="mt-1 text-sm text-gray-500 text-gray-400">
                                    Must be at least 8 characters
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 text-gray-300 mb-1"
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:ring-purple-400 focus:border-transparent"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={passwordSaving || !currentPassword || !newPassword || !confirmPassword}
                                    className="px-4 py-2 bg-purple-600 bg-purple-500 hover:bg-purple-700 hover:bg-purple-600 text-white text-gray-100 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    {passwordSaving ? (
                                        <>
                                            <svg
                                                className="animate-spin w-4 h-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            <span>Changing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            <span>Change Password</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}
        </AffiliateLayout>
    );
}
