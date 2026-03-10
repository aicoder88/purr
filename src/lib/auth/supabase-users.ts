import type { User } from '@supabase/auth-js';
import prisma from '@/lib/prisma';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { normalizeEmail, roleFromUserRecord } from '@/lib/auth/roles';

export interface SupabaseUserSyncInput {
  email: string;
  name?: string | null;
  image?: string | null;
  password?: string;
  passwordHash?: string | null;
  role?: string;
  localUserId?: string;
  retailerId?: string;
  affiliateId?: string;
  affiliateCode?: string;
}

function toUserMetadata(input: SupabaseUserSyncInput) {
  return {
    ...(input.name ? { name: input.name } : {}),
    ...(input.image ? { image: input.image } : {}),
  };
}

function toAppMetadata(input: SupabaseUserSyncInput) {
  return {
    ...(input.role ? { role: input.role } : {}),
    ...(input.localUserId ? { localUserId: input.localUserId } : {}),
    ...(input.retailerId ? { retailerId: input.retailerId } : {}),
    ...(input.affiliateId ? { affiliateId: input.affiliateId } : {}),
    ...(input.affiliateCode ? { affiliateCode: input.affiliateCode } : {}),
  };
}

async function findSupabaseUserByEmail(email: string) {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    throw new Error('Supabase admin client is not configured.');
  }

  const normalizedEmail = normalizeEmail(email);
  let page = 1;

  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });

    if (error) {
      throw error;
    }

    const match = data.users.find((user) => normalizeEmail(user.email ?? '') === normalizedEmail);
    if (match) {
      return match;
    }

    if (data.users.length < 200) {
      return null;
    }

    page += 1;
  }
}

export async function upsertSupabaseUser(input: SupabaseUserSyncInput) {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    throw new Error('Supabase admin client is not configured.');
  }

  const existingUser = await findSupabaseUserByEmail(input.email);
  const attributes = {
    email: normalizeEmail(input.email),
    email_confirm: true,
    ...(input.password ? { password: input.password } : {}),
    ...(input.passwordHash ? { password_hash: input.passwordHash } : {}),
    user_metadata: toUserMetadata(input),
    app_metadata: toAppMetadata(input),
  };

  if (existingUser) {
    const { error } = await admin.auth.admin.updateUserById(existingUser.id, attributes);
    if (error) {
      throw error;
    }

    return existingUser.id;
  }

  const { data, error } = await admin.auth.admin.createUser(attributes);
  if (error) {
    throw error;
  }

  return data.user?.id ?? null;
}

export async function syncCustomerSupabaseUser(email: string, password?: string) {
  if (!prisma) {
    throw new Error('Database unavailable');
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      passwordHash: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error('Customer account not found');
  }

  await upsertSupabaseUser({
    email: user.email ?? normalizedEmail,
    name: user.name,
    image: user.image,
    password,
    passwordHash: user.passwordHash,
    role: roleFromUserRecord(user.role),
    localUserId: user.id,
  });
}

export async function syncAffiliateSupabaseUser(email: string, password?: string) {
  if (!prisma) {
    throw new Error('Database unavailable');
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
    },
  });

  if (!affiliate) {
    throw new Error('Affiliate account not found');
  }

  await upsertSupabaseUser({
    email: affiliate.email,
    name: affiliate.name,
    password,
    passwordHash: affiliate.passwordHash,
    role: 'affiliate',
    affiliateId: affiliate.id,
    affiliateCode: affiliate.code,
  });
}

export async function syncAdminSupabaseUser(email: string, password?: string) {
  const normalizedEmail = normalizeEmail(email);

  if (prisma) {
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        passwordHash: true,
        role: true,
      },
    });

    if (user) {
      await upsertSupabaseUser({
        email: user.email ?? normalizedEmail,
        name: user.name,
        image: user.image,
        password,
        passwordHash: user.passwordHash,
        role: roleFromUserRecord(user.role),
        localUserId: user.id,
      });

      return;
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL ? normalizeEmail(process.env.ADMIN_EMAIL) : null;
  const editorEmail = process.env.EDITOR_EMAIL ? normalizeEmail(process.env.EDITOR_EMAIL) : null;

  if (adminEmail && normalizedEmail === adminEmail) {
    await upsertSupabaseUser({
      email: adminEmail,
      name: 'Admin',
      password,
      passwordHash: process.env.ADMIN_PASSWORD_HASH,
      role: 'admin',
    });
    return;
  }

  if (editorEmail && normalizedEmail === editorEmail) {
    await upsertSupabaseUser({
      email: editorEmail,
      name: 'Editor',
      password,
      passwordHash: process.env.EDITOR_PASSWORD_HASH,
      role: 'editor',
    });
    return;
  }

  throw new Error('Admin account not found');
}
