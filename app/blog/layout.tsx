import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScopedIntlProvider scopes={['root', 'blog']}>
      {children}
    </ScopedIntlProvider>
  );
}
