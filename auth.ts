import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig, User } from "next-auth";
import {
  authenticateAdminCredentials,
  authenticateAffiliateCredentials,
  authenticateCustomerCredentials,
  authenticateRetailerCredentials,
  resolveOAuthPrincipal,
} from "@/lib/auth/principals";

// Extend NextAuth types to include role and affiliate data
interface ExtendedUser extends User {
  role?: string;
  retailerId?: string;
  affiliateId?: string;
  affiliateCode?: string;
}

// Simple in-memory rate limiter for login attempts
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

function cleanupStaleEntries() {
  const now = Date.now();
  for (const [key, record] of loginAttempts.entries()) {
    if (record.resetTime < now) {
      loginAttempts.delete(key);
    }
  }
}

function checkLoginRateLimit(email: string): boolean {
  const now = Date.now();
  const key = email.toLowerCase();

  if (Math.random() < 0.1) {
    cleanupStaleEntries();
  }

  const record = loginAttempts.get(key);

  if (!record || record.resetTime < now) {
    loginAttempts.set(key, {
      count: 1,
      resetTime: now + 15 * 60 * 1000
    });
    return true;
  }

  record.count++;
  return record.count <= 5;
}

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      id: "customer-credentials",
      name: "Customer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined;

          if (!email || !password) {
            return null;
          }

          if (!checkLoginRateLimit(email)) {
            return null;
          }

          return authenticateCustomerCredentials(email, password);
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    }),
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined;

          if (!email || !password) {
            return null;
          }

          if (!checkLoginRateLimit(email)) {
            return null;
          }

          return authenticateAdminCredentials(email, password);
        } catch (error) {
          console.error("Admin authorization error:", error);
          return null;
        }
      }
    }),
    CredentialsProvider({
      id: "retailer-credentials",
      name: "Retailer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined;

          if (!email || !password) {
            return null;
          }

          if (!checkLoginRateLimit(email)) {
            return null;
          }

          return authenticateRetailerCredentials(email, password);
        } catch (error) {
          console.error("Retailer authorization error:", error);
          return null;
        }
      }
    }),
    CredentialsProvider({
      id: "affiliate-credentials",
      name: "Affiliate",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined;
          
          if (!email || !password) {
            return null;
          }

          if (!checkLoginRateLimit(email)) {
            return null;
          }

          return authenticateAffiliateCredentials(email, password);
        } catch (error) {
          console.error("Affiliate authorization error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === 'google') {
        if (!profile?.email || profile.email_verified === false) {
          return false;
        }
      }

      return !!user?.email;
    },
    async jwt({ token, user, account }) {
      if (user) {
        const extUser = user as ExtendedUser;
        token.userId = extUser.id;
        token.role = extUser.role;
        token.retailerId = extUser.retailerId;
        token.affiliateId = extUser.affiliateId;
        token.affiliateCode = extUser.affiliateCode;
      }

      if (account?.provider === 'google' && token.email) {
        const principal = await resolveOAuthPrincipal({
          email: token.email,
          name: token.name,
          image: token.picture,
        });

        if (principal) {
          token.userId = principal.id;
          token.role = principal.role;
          token.retailerId = principal.retailerId;
          token.affiliateId = principal.affiliateId;
          token.affiliateCode = principal.affiliateCode;
          token.name = principal.name ?? token.name;
          token.picture = principal.image ?? token.picture;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const extUser = session.user as ExtendedUser;
        extUser.id = token.userId as string | undefined;
        extUser.role = token.role as string | undefined;
        extUser.retailerId = token.retailerId as string | undefined;
        extUser.affiliateId = token.affiliateId as string | undefined;
        extUser.affiliateCode = token.affiliateCode as string | undefined;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60 // 2 hours (reduced from 24h for security)
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
