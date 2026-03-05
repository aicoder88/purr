import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

export default async function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScopedIntlProvider scopes={['root', 'results']}>
      {children}
    </ScopedIntlProvider>
  );
}
