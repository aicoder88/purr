import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // TODO: Replace with actual database lookup
        // For now, using environment variables for admin access
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@purrify.ca';
        const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
        const editorEmail = process.env.EDITOR_EMAIL;
        const editorPassword = process.env.EDITOR_PASSWORD;

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
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
          credentials?.email === editorEmail &&
          credentials?.password === editorPassword
        ) {
          return {
            id: '2',
            email: editorEmail,
            name: 'Editor',
            role: 'editor'
          };
        }

        return null;
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
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
