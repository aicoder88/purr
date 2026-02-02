import prisma from '@/lib/prisma';

if (!prisma) {
  throw new Error('Database not configured');
}
const db = prisma;

async function main() {
  const posts = await db.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 2,
    select: {
      title: true,
      heroImageUrl: true,
      slug: true,
    },
  });
  console.log(JSON.stringify(posts, null, 2));
  await db.$disconnect();
}

main().catch(console.error);
