import type { User } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { AppSession } from '@/lib/auth/types';
import { resolvePrincipalByEmail } from '@/lib/auth/principals';

function toSession(
  principal: Awaited<ReturnType<typeof resolvePrincipalByEmail>>,
  user: User
): AppSession | null {
  if (!principal) {
    return null;
  }

  return {
    user: {
      id: principal.id,
      email: principal.email,
      name: principal.name ?? user.user_metadata?.name ?? user.email ?? null,
      image: principal.image ?? user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null,
      role: principal.role,
      retailerId: principal.retailerId,
      affiliateId: principal.affiliateId,
      affiliateCode: principal.affiliateCode,
      supabaseUserId: user.id,
    },
  };
}

export async function auth(): Promise<AppSession | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user?.email) {
    return null;
  }

  const principal = await resolvePrincipalByEmail({
    email: data.user.email,
    name: typeof data.user.user_metadata?.name === 'string' ? data.user.user_metadata.name : null,
    image:
      typeof data.user.user_metadata?.avatar_url === 'string'
        ? data.user.user_metadata.avatar_url
        : typeof data.user.user_metadata?.picture === 'string'
          ? data.user.user_metadata.picture
          : null,
  });

  return toSession(principal, data.user);
}
