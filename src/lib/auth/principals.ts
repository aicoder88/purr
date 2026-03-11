import bcrypt from 'bcryptjs';
import type { RetailerStatus } from '@/generated/client/enums';
import prisma from '@/lib/prisma';
import {
  APP_ROLES,
  type AppRole,
  ADMIN_SESSION_ROLES,
  normalizeEmail,
  roleFromUserRecord,
  roleToUserRecord,
} from '@/lib/auth/roles';

export interface AuthenticatedPrincipal {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: AppRole;
  retailerId?: string;
  affiliateId?: string;
  affiliateCode?: string;
}

interface PrivilegedAccountConfig {
  email: string;
  role: Extract<AppRole, 'admin' | 'editor'>;
  name: string;
  passwordHash?: string;
  passwordLegacy?: string;
}

function getPrivilegedAccountConfig(email: string): PrivilegedAccountConfig | null {
  const normalizedEmail = normalizeEmail(email);
  const adminEmail = process.env.ADMIN_EMAIL ? normalizeEmail(process.env.ADMIN_EMAIL) : null;
  const editorEmail = process.env.EDITOR_EMAIL ? normalizeEmail(process.env.EDITOR_EMAIL) : null;

  if (adminEmail && normalizedEmail === adminEmail) {
    return {
      email: adminEmail,
      role: APP_ROLES.admin,
      name: 'Admin',
      passwordHash: process.env.ADMIN_PASSWORD_HASH,
      passwordLegacy: process.env.ADMIN_PASSWORD,
    };
  }

  if (editorEmail && normalizedEmail === editorEmail) {
    return {
      email: editorEmail,
      role: APP_ROLES.editor,
      name: 'Editor',
      passwordHash: process.env.EDITOR_PASSWORD_HASH,
      passwordLegacy: process.env.EDITOR_PASSWORD,
    };
  }

  return null;
}

function toPrincipal(input: {
  id: string;
  email: string;
  role: AppRole;
  name?: string | null;
  image?: string | null;
  retailerId?: string;
  affiliateId?: string;
  affiliateCode?: string;
}): AuthenticatedPrincipal {
  return {
    id: input.id,
    email: normalizeEmail(input.email),
    role: input.role,
    name: input.name ?? null,
    image: input.image ?? null,
    retailerId: input.retailerId,
    affiliateId: input.affiliateId,
    affiliateCode: input.affiliateCode,
  };
}

async function updateUserLastLogin(userId: string) {
  if (!prisma) return;
  await prisma.user.update({
    where: { id: userId },
    data: { lastLoginAt: new Date() },
  });
}

async function updateRetailerLastLogin(retailerId: string) {
  if (!prisma) return;
  await prisma.retailer.update({
    where: { id: retailerId },
    data: { lastLoginAt: new Date() },
  });
}

async function updateAffiliateLastLogin(affiliateId: string) {
  if (!prisma) return;
  await prisma.affiliate.update({
    where: { id: affiliateId },
    data: { lastLoginAt: new Date() },
  });
}

export async function ensurePrivilegedUserAccount(email: string) {
  if (!prisma) {
    return null;
  }

  const privileged = getPrivilegedAccountConfig(email);
  if (!privileged) {
    return null;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: privileged.email },
  });

  if (existingUser) {
    if (roleFromUserRecord(existingUser.role) !== privileged.role || existingUser.name !== privileged.name) {
      return prisma.user.update({
        where: { id: existingUser.id },
        data: {
          role: roleToUserRecord(privileged.role),
          name: privileged.name,
        },
      });
    }

    return existingUser;
  }

  const hashedPassword = privileged.passwordHash
    ?? (privileged.passwordLegacy ? await bcrypt.hash(privileged.passwordLegacy, 12) : null);

  return prisma.user.create({
    data: {
      email: privileged.email,
      name: privileged.name,
      role: roleToUserRecord(privileged.role),
      passwordHash: hashedPassword,
    },
  });
}

export async function ensureCustomerUser(input: {
  email: string;
  name?: string | null;
  image?: string | null;
}) {
  if (!prisma) {
    throw new Error('Database unavailable');
  }

  const email = normalizeEmail(input.email);
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const nextRole = roleFromUserRecord(existingUser.role);
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        name: input.name ?? existingUser.name,
        image: input.image ?? existingUser.image,
        lastLoginAt: new Date(),
      },
    });

    return toPrincipal({
      id: updatedUser.id,
      email,
      name: updatedUser.name,
      image: updatedUser.image,
      role: nextRole,
    });
  }

  const createdUser = await prisma.user.create({
    data: {
      email,
      name: input.name ?? null,
      image: input.image ?? null,
      role: 'CUSTOMER',
      lastLoginAt: new Date(),
    },
  });

  return toPrincipal({
    id: createdUser.id,
    email,
    name: createdUser.name,
    image: createdUser.image,
    role: APP_ROLES.customer,
  });
}

export async function authenticateCustomerCredentials(email: string, password: string) {
  if (!prisma) {
    return null;
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || roleFromUserRecord(user.role) !== APP_ROLES.customer || !user.passwordHash) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    return null;
  }

  await updateUserLastLogin(user.id);

  return toPrincipal({
    id: user.id,
    email: normalizedEmail,
    name: user.name,
    image: user.image,
    role: APP_ROLES.customer,
  });
}

export async function authenticateAdminCredentials(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  await ensurePrivilegedUserAccount(normalizedEmail);

  if (prisma) {
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (user && ADMIN_SESSION_ROLES.includes(roleFromUserRecord(user.role))) {
      if (!user.passwordHash) {
        return null;
      }

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return null;
      }

      await updateUserLastLogin(user.id);

      return toPrincipal({
        id: user.id,
        email: normalizedEmail,
        name: user.name,
        image: user.image,
        role: roleFromUserRecord(user.role),
      });
    }
  }

  const privileged = getPrivilegedAccountConfig(normalizedEmail);
  if (!privileged) {
    return null;
  }

  if (privileged.passwordHash) {
    const isValidPassword = await bcrypt.compare(password, privileged.passwordHash);
    if (!isValidPassword) {
      return null;
    }
  } else if (privileged.passwordLegacy !== password) {
    return null;
  }

  return toPrincipal({
    id: `env-${privileged.role}-${normalizedEmail}`,
    email: normalizedEmail,
    name: privileged.name,
    role: privileged.role,
  });
}

export async function authenticateRetailerCredentials(email: string, password: string) {
  const result = await verifyRetailerCredentials(email, password);
  return result.kind === 'success' ? result.principal : null;
}

export async function verifyRetailerCredentials(email: string): Promise<
  | { kind: 'invalid' }
  | { kind: 'blocked'; status: RetailerStatus }
  | { kind: 'success'; principal: AuthenticatedPrincipal }
>;
export async function verifyRetailerCredentials(email: string, password: string): Promise<
  | { kind: 'invalid' }
  | { kind: 'blocked'; status: RetailerStatus }
  | { kind: 'success'; principal: AuthenticatedPrincipal }
>;
export async function verifyRetailerCredentials(email: string, password?: string) {
  if (!prisma) {
    return { kind: 'invalid' } as const;
  }

  const normalizedEmail = normalizeEmail(email);
  const retailer = await prisma.retailer.findUnique({
    where: { email: normalizedEmail },
  });

  if (!retailer) {
    return { kind: 'invalid' } as const;
  }

  const isValidPassword = password
    ? await bcrypt.compare(password, retailer.password)
    : false;

  if (!isValidPassword) {
    return { kind: 'invalid' } as const;
  }

  if (retailer.status !== 'ACTIVE') {
    return { kind: 'blocked', status: retailer.status } as const;
  }

  await updateRetailerLastLogin(retailer.id);

  return {
    kind: 'success',
    principal: toPrincipal({
      id: retailer.id,
      email: retailer.email,
      name: retailer.contactName,
      role: APP_ROLES.retailer,
      retailerId: retailer.id,
    }),
  } as const;
}

export async function authenticateAffiliateCredentials(email: string, password: string) {
  if (!prisma) {
    return null;
  }

  const normalizedEmail = normalizeEmail(email);
  const affiliate = await prisma.affiliate.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      email: true,
      name: true,
      code: true,
      passwordHash: true,
      status: true,
    },
  });

  if (!affiliate || affiliate.status !== 'ACTIVE') {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, affiliate.passwordHash);
  if (!isValidPassword) {
    return null;
  }

  await updateAffiliateLastLogin(affiliate.id);

  return toPrincipal({
    id: affiliate.id,
    email: affiliate.email,
    name: affiliate.name,
    role: APP_ROLES.affiliate,
    affiliateId: affiliate.id,
    affiliateCode: affiliate.code,
  });
}

export async function resolveOAuthPrincipal(input: {
  email: string;
  name?: string | null;
  image?: string | null;
}) {
  if (!prisma) {
    return null;
  }

  const normalizedEmail = normalizeEmail(input.email);
  const privilegedUser = await ensurePrivilegedUserAccount(normalizedEmail);
  if (privilegedUser) {
    await updateUserLastLogin(privilegedUser.id);
    return toPrincipal({
      id: privilegedUser.id,
      email: normalizedEmail,
      name: privilegedUser.name,
      image: privilegedUser.image,
      role: roleFromUserRecord(privilegedUser.role),
    });
  }

  const retailer = await prisma.retailer.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      email: true,
      contactName: true,
      status: true,
    },
  });

  if (retailer) {
    if (retailer.status !== 'ACTIVE') {
      return null;
    }

    await updateRetailerLastLogin(retailer.id);
    return toPrincipal({
      id: retailer.id,
      email: retailer.email,
      name: retailer.contactName,
      role: APP_ROLES.retailer,
      retailerId: retailer.id,
    });
  }

  const affiliate = await prisma.affiliate.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      email: true,
      name: true,
      code: true,
      status: true,
    },
  });

  if (affiliate) {
    if (affiliate.status !== 'ACTIVE') {
      return null;
    }

    await updateAffiliateLastLogin(affiliate.id);
    return toPrincipal({
      id: affiliate.id,
      email: affiliate.email,
      name: affiliate.name,
      role: APP_ROLES.affiliate,
      affiliateId: affiliate.id,
      affiliateCode: affiliate.code,
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        name: input.name ?? existingUser.name,
        image: input.image ?? existingUser.image,
        lastLoginAt: new Date(),
      },
    });

    return toPrincipal({
      id: updatedUser.id,
      email: normalizedEmail,
      name: updatedUser.name,
      image: updatedUser.image,
      role: roleFromUserRecord(updatedUser.role),
    });
  }

  return ensureCustomerUser(input);
}

export async function resolvePrincipalByEmail(input: {
  email: string;
  name?: string | null;
  image?: string | null;
}) {
  if (!prisma) {
    return null;
  }

  const normalizedEmail = normalizeEmail(input.email);
  const privilegedUser = await ensurePrivilegedUserAccount(normalizedEmail);
  if (privilegedUser) {
    return toPrincipal({
      id: privilegedUser.id,
      email: normalizedEmail,
      name: privilegedUser.name,
      image: privilegedUser.image,
      role: roleFromUserRecord(privilegedUser.role),
    });
  }

  const retailer = await prisma.retailer.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      email: true,
      contactName: true,
      status: true,
    },
  });

  if (retailer) {
    if (retailer.status !== 'ACTIVE') {
      return null;
    }

    return toPrincipal({
      id: retailer.id,
      email: retailer.email,
      name: retailer.contactName,
      role: APP_ROLES.retailer,
      retailerId: retailer.id,
    });
  }

  const affiliate = await prisma.affiliate.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      email: true,
      name: true,
      code: true,
      status: true,
    },
  });

  if (affiliate) {
    if (affiliate.status !== 'ACTIVE') {
      return null;
    }

    return toPrincipal({
      id: affiliate.id,
      email: affiliate.email,
      name: affiliate.name,
      role: APP_ROLES.affiliate,
      affiliateId: affiliate.id,
      affiliateCode: affiliate.code,
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    return toPrincipal({
      id: existingUser.id,
      email: normalizedEmail,
      name: existingUser.name,
      image: existingUser.image,
      role: roleFromUserRecord(existingUser.role),
    });
  }

  return ensureCustomerUser(input);
}
