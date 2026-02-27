import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import prisma from '../prisma';

const KeywordEntrySchema = z.object({
  keyword: z.string().min(3),
  locale: z.enum(['en', 'fr']).default('en'),
});

const KeywordQueueSchema = z.array(KeywordEntrySchema);

export type KeywordEntry = z.infer<typeof KeywordEntrySchema>;

const QUEUE_PATH = path.join(process.cwd(), 'content', 'blog-keywords', 'queue.json');

function loadKeywordFile(): KeywordEntry[] {
  try {
    if (!fs.existsSync(QUEUE_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(QUEUE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return KeywordQueueSchema.parse(parsed);
  } catch {
    console.warn('[keyword-queue] Failed to read or parse queue.json, returning empty list');
    return [];
  }
}

/**
 * Returns the first keyword from queue.json that hasn't been generated yet (by topicKey in DB).
 * The topicKey stored in DB for keyword-driven posts uses the format: `kw:<keyword>`.
 */
export async function getNextKeyword(): Promise<KeywordEntry | null> {
  const keywords = loadKeywordFile();
  if (keywords.length === 0) {
    return null;
  }

  if (!prisma) {
    // No DB — return the first keyword optimistically
    return keywords[0];
  }

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

  const next = keywords.find(
    (entry) => !usedTopicKeys.has(topicKeyForKeyword(entry.keyword))
  );

  return next ?? null;
}

/** Deterministic topicKey for a given keyword string */
export function topicKeyForKeyword(keyword: string): string {
  return `kw:${keyword
    .toLowerCase()
    .trim()
    .replaceAll(/\s+/g, '-')
    .replaceAll(/[^a-z0-9-]/g, '')}`;
}
