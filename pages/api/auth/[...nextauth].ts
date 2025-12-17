import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Simple in-memory rate limiter for login attempts
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

function checkLoginRateLimit(email: string): boolean {
  const now = Date.now();
  const key = email.toLowerCase();
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

  // Allow 20 attempts per 15 minutes (higher for E2E tests)
  return record.count <= 20;
}

// Cleanup old entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of loginAttempts.entries()) {
    if (record.resetTime < now) {
      loginAttempts.delete(key);
    }
  }
}, 30 * 60 * 1000);

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

          // For now, using environment variables for admin access
          const adminEmail = process.env.ADMIN_EMAIL || 'admin@purrify.ca';
          const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
          const editorEmail = process.env.EDITOR_EMAIL;
          const editorPassword = process.env.EDITOR_PASSWORD;

          console.log('Login attempt for:', credentials?.email);
          console.log('Admin email configured:', adminEmail);

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
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
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
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

export default NextAuth(authOptions);
