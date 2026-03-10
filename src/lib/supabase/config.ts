const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

export function getSupabasePublicConfig() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }

  return {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
  };
}

export function getSupabaseServiceRoleConfig() {
  const publicConfig = getSupabasePublicConfig();
  if (!publicConfig || !SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  return {
    ...publicConfig,
    serviceRoleKey: SUPABASE_SERVICE_ROLE_KEY,
  };
}
