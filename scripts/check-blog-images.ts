
import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function main() {
    if (!prisma) {
        console.log('Prisma instance is null/undefined');
        return;
    }

    try {
        const posts = await prisma.blogPost.findMany({
            where: { status: 'PUBLISHED' },
            orderBy: { publishedAt: 'desc' },
            take: 3,
            select: {
                title: true,
                heroImageUrl: true,
            }
        });

        console.log("Found posts:", posts.length);
        console.log(JSON.stringify(posts, null, 2));
    } catch (e) {
        console.error("Error querying posts:", e);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    });
