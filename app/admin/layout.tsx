import { AdminSessionProvider } from '@/components/providers/AdminSessionProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminSessionProvider>{children}</AdminSessionProvider>;
}
