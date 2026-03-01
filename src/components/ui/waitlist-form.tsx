'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { joinWaitlist } from '@/app/actions/waitlist';

export function WaitlistForm() {
    const t = useTranslations('waitlist');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(formData: FormData) {
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const result = await joinWaitlist(formData);
        setLoading(false);

        if (result.success) {
            setSuccessMessage(result.message || t('success'));
        } else {
            setErrorMessage(result.error || t('errorGeneric'));
        }
    }

    if (successMessage) {
        return (
            <div className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-gray-950/20 bg-white/80 px-5 py-2 font-black text-green-700 border-gray-900/20 bg-black/10 text-green-400">
                {successMessage}
            </div>
        );
    }

    return (
        <form action={onSubmit} className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto relative">
            <input
                type="email"
                name="email"
                required
                placeholder={t('placeholder')}
                className="w-full sm:w-auto flex-1 rounded-full border border-gray-950/20 bg-white/80 px-4 py-2 font-semibold text-gray-950 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 border-gray-900/20 bg-black/10 text-gray-900 placeholder-gray-600 focus:ring-gray-700 transition"
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center rounded-full bg-gray-950 px-5 py-2 font-black text-white transition-colors hover:bg-gray-800 disabled:opacity-50 bg-white text-gray-900 hover:bg-gray-200"
            >
                {loading ? t('loading') : t('buttonText')}
            </button>
            {errorMessage && (
                <p className="absolute -bottom-6 text-xs font-bold text-red-800 text-red-600 w-full text-center">
                    {errorMessage}
                </p>
            )}
        </form>
    );
}
