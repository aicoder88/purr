import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';

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

    // The root layout's <Providers> already supplies NextIntlClientProvider,
    // CurrencyProvider, and TranslationProvider with the correct locale and
    // filtered messages (detected via the x-pathname middleware header).
    // A second provider here would re-serialize the full messages object into
    // __NEXT_DATA__ for every locale route — including blog pages where no
    // client component ever reads page-specific translations.
    return <>{children}</>;
}
