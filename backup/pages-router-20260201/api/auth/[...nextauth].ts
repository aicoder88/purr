import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// Extend NextAuth types to include role and affiliate data
interface ExtendedUser extends User {
  role?: string;
  affiliateId?: string;
  affiliateCode?: string;
}

// Simple in-memory rate limiter for login attempts
// Note: In serverless, each invocation starts fresh, so this only works
// within a single warm instance. For production, use Redis or similar.
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

// Cleanup old entries lazily during rate limit check
// Note: Using setInterval in serverless is problematic as each invocation
// starts fresh. Instead, we clean up stale entries during the rate limit check.
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

  // Cleanup stale entries periodically (every 10th check)
  if (Math.random() < 0.1) {
    cleanupStaleEntries();
  }

  const record = loginAttempts.get(key);

  if (!record || record.resetTime < now) {
    // New window
    loginAttempts.set(key, {
      count: 1,
      resetTime: now + 15 * 60 * 1000 // 15 minutes
    });
    return true;
  }

  record.count++;

  // Allow 5 attempts per 15 minutes to prevent brute force attacks
  return record.count <= 5;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          // Check rate limit
          if (!checkLoginRateLimit(credentials.email)) {
            console.log('Rate limit exceeded for:', credentials.email);
            return null;
          }

          // Admin credentials from environment variables with fallbacks for development
          const adminEmail = process.env.ADMIN_EMAIL || 'admin@purrify.ca';
          const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
          const editorEmail = process.env.EDITOR_EMAIL;
          const editorPassword = process.env.EDITOR_PASSWORD;

          if (
            credentials.email === adminEmail &&
            credentials.password === adminPassword
          ) {
            console.log('Admin login successful');
            return {
              id: '1',
              email: adminEmail,
              name: 'Admin',
              role: 'admin'
            };
          }

          if (
            editorEmail &&
            editorPassword &&
            credentials.email === editorEmail &&
            credentials.password === editorPassword
          ) {
            console.log('Editor login successful');
            return {
              id: '2',
              email: editorEmail,
              name: 'Editor',
              role: 'editor'
            };
          }

          console.log('Invalid credentials');
          return null;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    }),
    // Affiliate credentials provider
    CredentialsProvider({
      id: 'affiliate-credentials',
      name: 'Affiliate',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing affiliate credentials');
            return null;
          }

          // Check rate limit
          if (!checkLoginRateLimit(credentials.email)) {
            console.log('Rate limit exceeded for affiliate:', credentials.email);
            return null;
          }

          if (!prisma) {
            console.error('Database connection not established');
            return null;
          }

          // Find affiliate by email
          const affiliate = await prisma.affiliate.findUnique({
            where: { email: credentials.email.toLowerCase() },
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
            console.log('Affiliate not found:', credentials.email);
            return null;
          }

          // Check if affiliate is active
          if (affiliate.status !== 'ACTIVE') {
            console.log('Affiliate account not active:', credentials.email, affiliate.status);
            return null;
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            affiliate.passwordHash
          );

          if (!isValidPassword) {
            console.log('Invalid affiliate password');
            return null;
          }

          console.log('Affiliate login successful:', affiliate.email);
          return {
            id: affiliate.id,
            email: affiliate.email,
            name: affiliate.name,
            role: 'affiliate',
            affiliateId: affiliate.id,
            affiliateCode: affiliate.code,
          };
        } catch (error) {
          console.error('Affiliate authorization error:', error);
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
    signIn: '/admin/login',
    error: '/admin/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

export default NextAuth(authOptions);
