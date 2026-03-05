import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

export default async function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScopedIntlProvider scopes={['root', 'locations']}>
      {children}
    </ScopedIntlProvider>
  );
}
