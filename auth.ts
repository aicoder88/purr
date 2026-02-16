import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import type { NextAuthConfig, User } from "next-auth";

// Extend NextAuth types to include role and affiliate data
interface ExtendedUser extends User {
  role?: string;
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
    CredentialsProvider({
      name: "Credentials",
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

          const adminEmail = process.env.ADMIN_EMAIL;
          const editorEmail = process.env.EDITOR_EMAIL;

          // ADMIN_PASSWORD_HASH and EDITOR_PASSWORD_HASH should be bcrypt hashes.
          // Generate with: node -e "require('bcryptjs').hash('yourpass', 12).then(console.log)"
          const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
          const editorPasswordHash = process.env.EDITOR_PASSWORD_HASH;

          // Fallback: support legacy plaintext ADMIN_PASSWORD during migration
          const adminPasswordLegacy = process.env.ADMIN_PASSWORD;
          const editorPasswordLegacy = process.env.EDITOR_PASSWORD;

          if (!adminEmail || (!adminPasswordHash && !adminPasswordLegacy)) {
            throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD_HASH must be configured');
          }

          // Check admin credentials
          if (email === adminEmail) {
            let isValid = false;
            if (adminPasswordHash) {
              isValid = await bcrypt.compare(password, adminPasswordHash);
            } else if (adminPasswordLegacy) {
              // Legacy plaintext fallback — log warning to encourage migration
              isValid = password === adminPasswordLegacy;
              if (isValid) {
                console.warn('[AUTH] Admin login using plaintext ADMIN_PASSWORD. Migrate to ADMIN_PASSWORD_HASH (bcrypt) for security.');
              }
            }

            if (isValid) {
              return {
                id: "1",
                email: adminEmail,
                name: "Admin",
                role: "admin"
              };
            }
          }

          // Check editor credentials
          if (editorEmail && email === editorEmail) {
            let isValid = false;
            if (editorPasswordHash) {
              isValid = await bcrypt.compare(password, editorPasswordHash);
            } else if (editorPasswordLegacy) {
              isValid = password === editorPasswordLegacy;
              if (isValid) {
                console.warn('[AUTH] Editor login using plaintext EDITOR_PASSWORD. Migrate to EDITOR_PASSWORD_HASH (bcrypt) for security.');
              }
            }

            if (isValid) {
              return {
                id: "2",
                email: editorEmail,
                name: "Editor",
                role: "editor"
              };
            }
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
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

          if (!prisma) {
            console.error("Database connection not established");
            return null;
          }

          const affiliate = await prisma.affiliate.findUnique({
            where: { email: email.toLowerCase() },
            select: {
              id: true,
              email: true,
              name: true,
              code: true,
              passwordHash: true,
              status: true,
            },
          });

          if (!affiliate) {
            return null;
          }

          if (affiliate.status !== "ACTIVE") {
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            password,
            affiliate.passwordHash
          );

          if (!isValidPassword) {
            return null;
          }

          return {
            id: affiliate.id,
            email: affiliate.email,
            name: affiliate.name,
            role: "affiliate",
            affiliateId: affiliate.id,
            affiliateCode: affiliate.code,
          };
        } catch (error) {
          console.error("Affiliate authorization error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extUser = user as ExtendedUser;
        token.userId = extUser.id;
        token.role = extUser.role;
        token.affiliateId = extUser.affiliateId;
        token.affiliateCode = extUser.affiliateCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const extUser = session.user as ExtendedUser;
        (extUser as ExtendedUser & { userId?: string }).userId = token.userId as string | undefined;
        extUser.role = token.role as string | undefined;
        extUser.affiliateId = token.affiliateId as string | undefined;
        extUser.affiliateCode = token.affiliateCode as string | undefined;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60 // 2 hours (reduced from 24h for security)
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
