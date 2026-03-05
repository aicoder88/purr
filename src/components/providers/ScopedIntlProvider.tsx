import { defaultLocale, isValidLocale, type Locale } from '@/i18n/config';
import { getScopedMessages, type MessageScope } from '@/i18n/scoped-messages';
import { NextIntlProvider } from './NextIntlProvider';

interface ScopedIntlProviderProps {
  children: React.ReactNode;
  locale?: string;
  scopes: MessageScope[];
}

export async function ScopedIntlProvider({
  children,
  locale,
  scopes,
}: ScopedIntlProviderProps) {
  const resolvedLocale: Locale = locale && isValidLocale(locale) ? locale : defaultLocale;
  const messages = await getScopedMessages(resolvedLocale, scopes);

  return (
    <NextIntlProvider locale={resolvedLocale} messages={messages}>
      {children}
    </NextIntlProvider>
  );
}
