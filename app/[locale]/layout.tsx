import { notFound } from 'next/navigation';
import { Providers } from '../providers';
import { Locale, isValidLocale } from '@/i18n/config';

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate that the incoming `locale` parameter is valid
    if (!isValidLocale(locale)) {
        notFound();
    }

    // Load messages for the active locale
    let messages;
    try {
        messages = (await import(`@/i18n/messages/${locale}.json`)).default;
    } catch {
        notFound();
    }

    return (
        <Providers locale={locale as Locale} messages={messages}>
            {children}
        </Providers>
    );
}
