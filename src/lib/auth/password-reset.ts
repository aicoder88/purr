import { createHash, randomBytes } from 'crypto';
import prisma from '@/lib/prisma';
import { normalizeEmail } from '@/lib/auth/roles';

export const PASSWORD_RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

export type PasswordResetPortal = 'customer' | 'retailer' | 'admin';

export interface PasswordResetTarget {
  email: string;
  portal: PasswordResetPortal;
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function buildIdentifier({ email, portal }: PasswordResetTarget): string {
  return `password-reset:${portal}:${normalizeEmail(email)}`;
}

export function parsePasswordResetIdentifier(identifier: string): PasswordResetTarget | null {
  const [prefix, portal, ...emailParts] = identifier.split(':');
  if (prefix !== 'password-reset') {
    return null;
  }

  if (portal !== 'customer' && portal !== 'retailer' && portal !== 'admin') {
    return null;
  }

  const email = emailParts.join(':').trim().toLowerCase();
  if (!email) {
    return null;
  }

  return {
    email,
    portal,
  };
}

export async function issuePasswordResetToken(target: PasswordResetTarget) {
  if (!prisma) {
    throw new Error('Database unavailable');
  }

  const token = randomBytes(32).toString('hex');
  const identifier = buildIdentifier(target);
  const expires = new Date(Date.now() + PASSWORD_RESET_TOKEN_TTL_MS);

  await prisma.verificationToken.deleteMany({
    where: {
      identifier,
    },
  });

  await prisma.verificationToken.create({
    data: {
      identifier,
      token: hashToken(token),
      expires,
    },
  });

  return {
    token,
    expires,
  };
}

export async function consumePasswordResetToken(token: string): Promise<PasswordResetTarget | null> {
  if (!prisma) {
    throw new Error('Database unavailable');
  }

  const hashedToken = hashToken(token);
  const record = await prisma.verificationToken.findUnique({
    where: {
      token: hashedToken,
    },
  });

  if (!record || record.expires < new Date()) {
    if (record) {
      await prisma.verificationToken.delete({
        where: {
          token: hashedToken,
        },
      });
    }
    return null;
  }

  const parsed = parsePasswordResetIdentifier(record.identifier);
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: record.identifier,
    },
  });

  return parsed;
}
