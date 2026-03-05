import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

export default async function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScopedIntlProvider scopes={['root', 'affiliate']}>
      {children}
    </ScopedIntlProvider>
  );
}
