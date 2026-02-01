import { handlers } from "@/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export const { GET, POST } = handlers;

// For Pages Router compatibility in NextAuth v5
// Wrap the handlers to match Pages Router signature
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // NextAuth v5 handlers work with both App Router and Pages Router
  const h = handlers as unknown as (req: NextApiRequest, res: NextApiResponse) => void;
  return h(req, res);
};

export default handler;
