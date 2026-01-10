/**
 * NextAuth.js Type Extensions
 * Extends Session and User types to include role and affiliate data
 */

import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      role?: string;
      affiliateId?: string;
      affiliateCode?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string;
    affiliateId?: string;
    affiliateCode?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role?: string;
    affiliateId?: string;
    affiliateCode?: string;
  }
}
