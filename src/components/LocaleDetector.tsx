'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/translation-context';
import type { Locale } from '@/i18n/config';
import { getLocaleFromPath } from '@/lib/i18n/locale-path';

export function LocaleDetector() {
    const { setLocaleClient, locale } = useTranslation();
    const pathname = usePathname();

    useEffect(() => {
        const pathLocale = getLocaleFromPath(pathname || '/');

        // Read cookie directly to avoid server roundtrip
        const cookieLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1] as Locale | undefined;

        // Path locale takes precedence because locale-prefixed routes are explicit user intent.
        const detectedLocale = pathLocale || cookieLocale;

        if (detectedLocale && detectedLocale !== locale && ['en', 'fr', 'zh', 'es'].includes(detectedLocale)) {
            setLocaleClient(detectedLocale);
        }
    }, [pathname, setLocaleClient, locale]);

    return null;
}
