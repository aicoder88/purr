const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL + "?connection_limit=1"
            }
        }
    });

    try {
        const posts = await prisma.blogPost.findMany({
            select: {
                id: true,
                slug: true,
                title: true,
                heroImageUrl: true
            }
        });

        console.log(`Found ${posts.length} posts in database.`);

        const updates = {
            'cat-litter-smell-worse-winter': '/optimized/blog/winter-fresh-cat.png',
            'most-powerful-odor-absorber': '/optimized/blog/scientific-odor-control.png',
            'best-litter-odor-remover-small-apartments': '/optimized/blog/apartment-cat-lifestyle.png',
            'cat-litter-smell-worse-summer': '/optimized/blog/summer-fresh-cat.png',
            'space-station-secret-fresh-home-cat-owners': '/optimized/cats-and-filters.webp'
        };

        for (const post of posts) {
            if (updates[post.slug]) {
                await prisma.blogPost.update({
                    where: { id: post.id },
                    data: { heroImageUrl: updates[post.slug] }
                });
                console.log(`Updated database for ${post.slug}`);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
