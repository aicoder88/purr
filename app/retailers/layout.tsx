import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

export default async function RetailersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScopedIntlProvider scopes={['root', 'retailers', 'contact', 'locations']}>
      {children}
    </ScopedIntlProvider>
  );
}
