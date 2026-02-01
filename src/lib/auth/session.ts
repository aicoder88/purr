import { auth } from "@/auth";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

export async function getSession() {
  return auth();
}

export async function requireAuth(
  _req?: NextApiRequest | GetServerSidePropsContext['req'],
  _res?: NextApiResponse | GetServerSidePropsContext['res'],
  allowedRoles: string[] = ['admin', 'editor']
) {
  const session = await auth();

  if (!session || !session.user) {
    return { authorized: false, session: null };
  }

  const userRole = (session.user as { role?: string }).role || '';
  if (!allowedRoles.includes(userRole)) {
    return { authorized: false, session };
  }

  return { authorized: true, session };
}
