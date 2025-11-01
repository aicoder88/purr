import { NextApiRequest, NextApiResponse } from 'next';

type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (result?: Error | void) => void
) => void;

/**
 * Helper function to run middleware in Next.js API routes
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 * @param fn - Middleware function to run
 */
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFunction
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result?: Error | void) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}