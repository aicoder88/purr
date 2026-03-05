import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScopedIntlProvider scopes={['root', 'products']}>
      {children}
    </ScopedIntlProvider>
  );
}
