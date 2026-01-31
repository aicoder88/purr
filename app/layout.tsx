import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/index.css';
import { getMessages, getTranslations } from 'next-intl/server';
import { NextIntlProvider } from '@/components/providers/NextIntlProvider';
import { getUserLocale } from '@/lib/locale';
import { AppLayout } from '@/components/layout/AppLayout';
import { TranslationProvider } from '@/lib/translation-context';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getUserLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://www.purrify.ca'),
    icons: {
      icon: '/images/favicon.png',
      apple: '/images/apple-touch-icon-root.png',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getUserLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans">
        <NextIntlProvider locale={locale} messages={messages}>
          <NextAuthProvider>
            <ThemeProvider
              defaultTheme="system"
              storageKey="purrify-ui-theme"
            >
              <TranslationProvider language={locale} isAppRouter={true}>
                <AppLayout>
                  {children}
                </AppLayout>
              </TranslationProvider>
            </ThemeProvider>
          </NextAuthProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}
