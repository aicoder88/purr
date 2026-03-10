'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { AppSession, AppSessionStatus } from '@/lib/auth/types';
import { getBrowserSupabaseClient } from '@/lib/supabase/browser';

interface AuthContextValue {
  session: AppSession | null;
  status: AppSessionStatus;
  refreshSession: () => Promise<AppSession | null>;
}

interface SignInOptions {
  email?: string;
  password?: string;
  redirect?: boolean;
  callbackUrl?: string;
}

interface SignInResult {
  error: string | null;
  ok: boolean;
  status: number;
  url: string | null;
}

interface SignOutOptions {
  callbackUrl?: string;
  redirect?: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchAppSession(): Promise<AppSession | null> {
  const response = await fetch('/api/auth/session', {
    cache: 'no-store',
    credentials: 'same-origin',
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json() as { session?: AppSession | null };
  return data.session ?? null;
}

function expectedRoleForProvider(provider: string) {
  switch (provider) {
    case 'admin-credentials':
      return ['admin', 'editor'];
    case 'affiliate-credentials':
      return ['affiliate'];
    case 'customer-credentials':
      return ['customer'];
    default:
      return null;
  }
}

async function migrateLegacyCredentials(provider: string, email: string, password: string) {
  const response = await fetch('/api/auth/legacy-sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, email, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null) as { message?: string } | null;
    return data?.message ?? 'Invalid email or password.';
  }

  return null;
}

async function signInWithCredentials(provider: string, options: SignInOptions): Promise<SignInResult> {
  const email = options.email?.trim().toLowerCase();
  const password = options.password ?? '';

  if (!email || !password) {
    return { error: 'Email and password are required.', ok: false, status: 400, url: null };
  }

  const supabase = getBrowserSupabaseClient();
  let { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const migrationError = await migrateLegacyCredentials(provider, email, password);
    if (migrationError) {
      return { error: migrationError, ok: false, status: 401, url: null };
    }

    ({ error } = await supabase.auth.signInWithPassword({ email, password }));
  }

  if (error) {
    return { error: error.message, ok: false, status: 401, url: null };
  }

  const session = await fetchAppSession();
  const expectedRoles = expectedRoleForProvider(provider);

  if (!session?.user || (expectedRoles && !expectedRoles.includes(session.user.role ?? ''))) {
    await supabase.auth.signOut();
    return { error: 'Unauthorized account for this portal.', ok: false, status: 403, url: null };
  }

  if (options.redirect !== false && options.callbackUrl) {
    window.location.assign(options.callbackUrl);
  }

  return {
    error: null,
    ok: true,
    status: 200,
    url: options.callbackUrl ?? null,
  };
}

async function signInWithGoogle(options: SignInOptions): Promise<SignInResult> {
  const supabase = getBrowserSupabaseClient();
  const callbackUrl = options.callbackUrl ?? '/';
  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  });

  if (error) {
    return { error: error.message, ok: false, status: 400, url: null };
  }

  if (data.url) {
    window.location.assign(data.url);
  }

  return {
    error: null,
    ok: true,
    status: 200,
    url: data.url ?? null,
  };
}

export async function getSession() {
  return fetchAppSession();
}

export async function signIn(provider: string, options: SignInOptions = {}): Promise<SignInResult> {
  if (provider === 'google') {
    return signInWithGoogle(options);
  }

  if (
    provider === 'customer-credentials'
    || provider === 'admin-credentials'
    || provider === 'affiliate-credentials'
  ) {
    return signInWithCredentials(provider, options);
  }

  return { error: 'Unsupported authentication provider.', ok: false, status: 400, url: null };
}

export async function signOut(options: SignOutOptions = {}) {
  const supabase = getBrowserSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  if (options.redirect !== false) {
    window.location.assign(options.callbackUrl ?? '/');
  }
}

export function NextAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AppSession | null>(null);
  const [status, setStatus] = useState<AppSessionStatus>('loading');

  useEffect(() => {
    let mounted = true;
    const supabase = getBrowserSupabaseClient();

    const refreshSession = async () => {
      try {
        const nextSession = await fetchAppSession();
        if (!mounted) {
          return null;
        }

        setSession(nextSession);
        setStatus(nextSession ? 'authenticated' : 'unauthenticated');
        return nextSession;
      } catch {
        if (mounted) {
          setSession(null);
          setStatus('unauthenticated');
        }

        return null;
      }
    };

    void refreshSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      void refreshSession();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    session,
    status,
    refreshSession: fetchAppSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSession() {
  const context = useContext(AuthContext);

  return {
    data: context?.session ?? null,
    status: context?.status ?? 'loading',
  };
}
