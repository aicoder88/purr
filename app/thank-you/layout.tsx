import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

export default async function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScopedIntlProvider scopes={['root', 'checkout']}>
      {children}
    </ScopedIntlProvider>
  );
}
