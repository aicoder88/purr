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
            console.log("Missing credentials");
            return null;
          }

          if (!checkLoginRateLimit(email)) {
            console.log("Rate limit exceeded for:", email);
            return null;
          }

          const adminEmail = process.env.ADMIN_EMAIL;
          const adminPassword = process.env.ADMIN_PASSWORD;
          const editorEmail = process.env.EDITOR_EMAIL;
          const editorPassword = process.env.EDITOR_PASSWORD;

          if (!adminEmail || !adminPassword) {
            throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured');
          }

          if (
            email === adminEmail &&
            password === adminPassword
          ) {
            console.log("Admin login successful");
            return {
              id: "1",
              email: adminEmail,
              name: "Admin",
              role: "admin"
            };
          }

          if (
            editorEmail &&
            editorPassword &&
            email === editorEmail &&
            password === editorPassword
          ) {
            console.log("Editor login successful");
            return {
              id: "2",
              email: editorEmail,
              name: "Editor",
              role: "editor"
            };
          }

          console.log("Invalid credentials");
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
            console.log("Missing affiliate credentials");
            return null;
          }

          if (!checkLoginRateLimit(email)) {
            console.log("Rate limit exceeded for affiliate:", email);
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
            console.log("Affiliate not found:", email);
            return null;
          }

          if (affiliate.status !== "ACTIVE") {
            console.log("Affiliate account not active:", email, affiliate.status);
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            password,
            affiliate.passwordHash
          );

          if (!isValidPassword) {
            console.log("Invalid affiliate password");
            return null;
          }

          console.log("Affiliate login successful:", affiliate.email);
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
        token.role = extUser.role;
        token.affiliateId = extUser.affiliateId;
        token.affiliateCode = extUser.affiliateCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const extUser = session.user as ExtendedUser;
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
    maxAge: 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
