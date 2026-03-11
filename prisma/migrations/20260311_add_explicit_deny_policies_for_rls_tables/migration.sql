-- Make intentional API denial explicit on RLS-protected internal/public tables.
-- These tables are accessed through Prisma/server code, not directly through
-- Supabase PostgREST from anon/authenticated clients.

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'Account',
    'Session',
    'VerificationToken',
    '_prisma_migrations',
    'affiliate_applications',
    'audit_logs',
    'blog_images',
    'blog_posts',
    'carts',
    'email_subscribers',
    'freshness_profiles',
    'leads',
    'review_votes',
    'reviews',
    'social_posts',
    'waitlists'
  ]
  LOOP
    IF to_regclass(format('%I.%I', 'public', table_name)) IS NOT NULL THEN
      EXECUTE format(
        'DROP POLICY IF EXISTS %I ON %I.%I;',
        'deny_all_api_access',
        'public',
        table_name
      );

      EXECUTE format(
        'CREATE POLICY %I ON %I.%I FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);',
        'deny_all_api_access',
        'public',
        table_name
      );
    END IF;
  END LOOP;
END
$$;
