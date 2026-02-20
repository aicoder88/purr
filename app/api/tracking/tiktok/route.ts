export async function POST(): Promise<Response> {
  return Response.json(
    { success: false, message: 'TikTok direct tracking is disabled. Use GTM.' },
    { status: 410 }
  );
}
