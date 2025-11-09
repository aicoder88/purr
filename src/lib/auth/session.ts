import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

export async function getSession(
  req: NextApiRequest | GetServerSidePropsContext['req'],
  res: NextApiResponse | GetServerSidePropsContext['res']
) {
  return await getServerSession(req, res, authOptions);
}

export async function requireAuth(
  req: NextApiRequest | GetServerSidePropsContext['req'],
  res: NextApiResponse | GetServerSidePropsContext['res'],
  allowedRoles: string[] = ['admin', 'editor']
) {
  const session = await getSession(req, res);

  if (!session || !session.user) {
    return { authorized: false, session: null };
  }

  const userRole = (session.user as any).role;
  if (!allowedRoles.includes(userRole)) {
    return { authorized: false, session };
  }

  return { authorized: true, session };
}
