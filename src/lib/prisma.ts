import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client Singleton
 * 
 * Prevents multiple instances in development (hot reload)
 * and ensures proper connection pooling in production.
 */

declare global {
   
  var prisma: PrismaClient | undefined;
}

// Check if DATABASE_URL is available
const isDatabaseConfigured = !!process.env.DATABASE_URL;

let prisma: PrismaClient | null = null;

if (isDatabaseConfigured) {
  prisma = global.prisma || new PrismaClient();

  if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
  }
} else {
  console.warn('DATABASE_URL not configured. Database features will be disabled.');
}

export default prisma;