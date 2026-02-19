'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/translation-context';
import type { Locale } from '@/i18n/config';

export function LocaleDetector() {
    const { setLocaleClient, locale } = useTranslation();
    const pathname = usePathname();

    useEffect(() => {
        // Read cookie directly to avoid server roundtrip
        const cookieLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1] as Locale | undefined;

        // If cookie exists and is different from current locale (which defaults to 'en' in static build)
        // Update the client context to show correct language
        if (cookieLocale && cookieLocale !== locale && ['en', 'fr'].includes(cookieLocale)) {
            setLocaleClient(cookieLocale);
        }
    }, [pathname, setLocaleClient, locale]);

    return null;
}
