import { PrismaClient } from '../generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

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
const connectionString = process.env.DATABASE_URL;

let prisma: PrismaClient | null = null;

if (connectionString) {
  if (global.prisma) {
    prisma = global.prisma;
  } else {
    // Configure PostgreSQL pool
    const pool = new Pool({ connectionString });
    // Configure Prisma Adapter
    const adapter = new PrismaPg(pool);
    // Initialize Prisma Client with adapter
    prisma = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
    global.prisma = prisma;
  }
} else {
  console.warn('DATABASE_URL not configured. Database features will be disabled.');
}

export default prisma;