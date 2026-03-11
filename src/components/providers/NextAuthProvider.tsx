'use client';

import { NextAuthProvider as SupabaseAuthProvider } from '@/lib/auth/client';

interface Props {
  children: React.ReactNode;
}

export function NextAuthProvider({ children }: Props) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}
