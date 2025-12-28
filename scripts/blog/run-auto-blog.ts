import 'dotenv/config';
import { generateAutomatedBlogPost } from '../../src/lib/blog/generator';

async function run() {
  try {
    const result = await generateAutomatedBlogPost();
    // eslint-disable-next-line no-console -- CLI output
    console.log(
      JSON.stringify(
        {
          id: result.post.id,
          slug: result.post.slug,
          topicKey: result.topic.key,
          heroImage: result.heroImage.url,
          secondaryImageCount: result.secondaryImageCount,
        },
        null,
        2
      )
    );
    process.exit(0);
  } catch (error) {
    // eslint-disable-next-line no-console -- CLI output
    console.error('[auto-blog] failed to generate post:', error);
    process.exit(1);
  }
}

run();
