import { AUTOMATED_BLOG_TOPICS } from '../../data/automated-blog-topics';
import { prisma } from '../prisma';
import { BlogTopic } from './types';

export async function getNextTopic(): Promise<BlogTopic> {
  const usedTopicKeys = new Set(
    (
      await prisma.blogPost.findMany({
        select: { topicKey: true },
        where: { topicKey: { not: null } },
      })
    )
      .map((entry) => entry.topicKey)
      .filter((value): value is string => Boolean(value))
  );

  const next = AUTOMATED_BLOG_TOPICS.find((topic) => !usedTopicKeys.has(topic.key));
  if (next) {
    return next;
  }

  // Fall back to the least recently used topic when all are exhausted.
  const oldestPost = await prisma.blogPost.findFirst({
    select: { topicKey: true },
    where: { topicKey: { not: null } },
    orderBy: { publishedAt: 'asc' },
  });

  const fallback = AUTOMATED_BLOG_TOPICS.find((topic) => topic.key === oldestPost?.topicKey);
  if (fallback) {
    return fallback;
  }

  // Absolute fallback — return the first topic to keep the automation running.
  return AUTOMATED_BLOG_TOPICS[0];
}
