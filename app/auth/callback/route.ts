import { NextResponse } from 'next/server';
import { resolvePrincipalByEmail } from '@/lib/auth/principals';
import { upsertSupabaseUser } from '@/lib/auth/supabase-users';
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/server';

function buildRedirectUrl(origin: string, next: string, authError?: string) {
  const redirectUrl = new URL(next, origin);
  if (authError) {
    redirectUrl.searchParams.set('authError', authError);
  }

  return redirectUrl.toString();
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextParam = searchParams.get('next') ?? '/';
  const next = nextParam.startsWith('/') ? nextParam : '/';
  const supabase = await createSupabaseRouteHandlerClient();

  if (!supabase || !code) {
    return NextResponse.redirect(buildRedirectUrl(origin, next, 'oauth'));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error('Supabase OAuth callback failed:', error);
    return NextResponse.redirect(buildRedirectUrl(origin, next, 'oauth'));
  }

  const { data: userData } = await supabase.auth.getUser();
  if (userData.user?.email) {
    const principal = await resolvePrincipalByEmail({
      email: userData.user.email,
      name: typeof userData.user.user_metadata?.name === 'string' ? userData.user.user_metadata.name : null,
      image:
        typeof userData.user.user_metadata?.avatar_url === 'string'
          ? userData.user.user_metadata.avatar_url
          : typeof userData.user.user_metadata?.picture === 'string'
            ? userData.user.user_metadata.picture
            : null,
    });

    if (principal) {
      await upsertSupabaseUser({
        email: principal.email,
        name: principal.name,
        image: principal.image,
        role: principal.role,
        localUserId: principal.role === 'customer' || principal.role === 'admin' || principal.role === 'editor' ? principal.id : undefined,
        retailerId: principal.retailerId,
        affiliateId: principal.affiliateId,
        affiliateCode: principal.affiliateCode,
      });
    }
  }

  const forwardedHost = request.headers.get('x-forwarded-host');
  const isLocalEnv = process.env.NODE_ENV === 'development';

  if (isLocalEnv || !forwardedHost) {
    return NextResponse.redirect(buildRedirectUrl(origin, next));
  }

  return NextResponse.redirect(buildRedirectUrl(`https://${forwardedHost}`, next));
}
