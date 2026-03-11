export async function GET() {
  return Response.json(
    { message: 'NextAuth endpoints have been replaced by Supabase Auth.' },
    { status: 410 }
  );
}

export const POST = GET;
