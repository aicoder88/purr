import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.RETAILER_JWT_SECRET;

export interface RetailerJwtPayload {
  retailerId: string;
  email: string;
  businessName: string;
  iat?: number;
  exp?: number;
}

export function getRetailerBearerToken(req: NextRequest): string | null {
  const authorization = req.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return null;
  }

  return authorization.slice('Bearer '.length).trim() || null;
}

export function verifyRetailerToken(token: string): RetailerJwtPayload | null {
  if (!JWT_SECRET) {
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET) as RetailerJwtPayload;
  } catch {
    return null;
  }
}
