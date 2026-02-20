'use client';

import { usePathname } from 'next/navigation';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';

interface Props {
  children: React.ReactNode;
}

const ADMIN_LOGIN_PATH = /^\/admin\/login(?:\/|$)/;

export function AdminSessionProvider({ children }: Props) {
  const pathname = usePathname();

  if (ADMIN_LOGIN_PATH.test(pathname)) {
    return <>{children}</>;
  }

  return <NextAuthProvider>{children}</NextAuthProvider>;
}
