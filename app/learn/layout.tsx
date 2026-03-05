import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScopedIntlProvider scopes={['root', 'learn']}>
      {children}
    </ScopedIntlProvider>
  );
}
