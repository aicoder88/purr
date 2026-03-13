import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isValidLocale, locales } from '@/i18n/config';

export const dynamicParams = false;

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

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

    setRequestLocale(locale);

    // The root layout's <Providers> already supplies NextIntlClientProvider,
    // CurrencyProvider, and TranslationProvider with the resolved request
    // locale and filtered root messages.
    // A second provider here would re-serialize the full messages object into
    // __NEXT_DATA__ for every locale route — including blog pages where no
    // client component ever reads page-specific translations.
    return <>{children}</>;
}
