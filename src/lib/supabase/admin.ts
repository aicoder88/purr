import { createClient } from '@supabase/supabase-js';
import { getSupabaseServiceRoleConfig } from '@/lib/supabase/config';

export function createSupabaseAdminClient() {
  const config = getSupabaseServiceRoleConfig();
  if (!config) {
    return null;
  }

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
