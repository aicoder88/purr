import { notFound } from 'next/navigation';
import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';
import { isValidLocale } from '@/i18n/config';

export default async function LocalizedBlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <ScopedIntlProvider locale={locale} scopes={['root', 'blog']}>
      {children}
    </ScopedIntlProvider>
  );
}
