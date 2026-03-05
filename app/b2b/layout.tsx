import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

export default async function B2BLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScopedIntlProvider scopes={['root', 'retailers', 'contact']}>
      {children}
    </ScopedIntlProvider>
  );
}
