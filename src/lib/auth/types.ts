export interface AppSessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string;
  retailerId?: string;
  affiliateId?: string;
  affiliateCode?: string;
  supabaseUserId?: string;
}

export interface AppSession {
  user: AppSessionUser;
}

export type AppSessionStatus = 'loading' | 'authenticated' | 'unauthenticated';
