import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
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
  await prisma.$disconnect();
}

main().catch(console.error);
