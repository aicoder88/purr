import { z } from 'zod';
import { prisma } from '../prisma';
import { callAi } from './ai-client';
import { loadGuidelines } from './guidelines';
import { getNextTopic } from './topic-queue';
import { buildBlogPrompt } from './prompt-builder';
import { selectImages } from './image-selection';
import { BlogTopic } from './types';

const GeneratedBlogSchema = z.object({
  title: z.string().min(10),
  slug: z.string().min(3),
  excerpt: z.string().min(60),
  metaDescription: z.string().min(60),
  keywords: z.array(z.string()).min(3),
  toc: z.array(z.object({ title: z.string(), id: z.string() })).min(3),
  internalLinks: z.array(z.object({ label: z.string(), url: z.string() })).min(3),
  externalLinks: z.array(z.object({ label: z.string(), url: z.string() })).min(1),
  faq: z.array(z.object({ question: z.string(), answerHtml: z.string().min(80) })).min(2),
  cta: z.object({ text: z.string().min(20), url: z.string().min(1) }),
  contentHtml: z.string().min(500),
});

const sanitizeSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const WORD_COUNT_REGEX = /<[^>]+>/g;

async function ensureUniqueSlug(baseSlug: string) {
  const slugCandidate = sanitizeSlug(baseSlug);
  const existing = await prisma.blogPost.findUnique({ where: { slug: slugCandidate } });
  if (!existing) {
    return slugCandidate;
  }
  return `${slugCandidate}-${Date.now()}`;
}

function countWords(html: string) {
  return html
    .replace(WORD_COUNT_REGEX, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

function logGeneration(topic: BlogTopic, payload: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    console.info('[auto-blog] Generated payload for topic %s', topic.key);
  }
  return payload;
}

export async function generateAutomatedBlogPost() {
  const topic = await getNextTopic();
  const guidelines = loadGuidelines();
  const prompt = buildBlogPrompt(topic, guidelines);

  const aiResponse = await callAi([
    {
      role: 'system',
      content: 'You are Claude, an elite editorial strategist for a premium litter deodorizer brand. Output clean JSON only.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ]);

  let parsedPayload: z.infer<typeof GeneratedBlogSchema>;
  try {
    const json = JSON.parse(aiResponse.text);
    parsedPayload = GeneratedBlogSchema.parse(json);
  } catch (error) {
    throw new Error(`Failed to parse AI response: ${(error as Error).message}`);
  }

  logGeneration(topic, parsedPayload);

  const slug = await ensureUniqueSlug(parsedPayload.slug || topic.slug);
  const images = await selectImages(topic, 4);
  const [heroImage, ...secondaryImages] = images;

  if (!heroImage) {
    throw new Error('Failed to source hero image');
  }

  const createdPost = await prisma.blogPost.create({
    data: {
      slug,
      locale: topic.locale,
      title: parsedPayload.title,
      author:
        topic.locale === 'fr'
          ? 'Laboratoire de recherche Purrify'
          : topic.locale === 'zh'
            ? 'Purrify 科研小组'
            : 'Purrify Research Lab',
      excerpt: parsedPayload.excerpt,
      content: parsedPayload.contentHtml,
      heroImageUrl: heroImage.url,
      heroImageAlt: heroImage.alt,
      heroImageCredit: heroImage.credit,
      heroImageCaption: heroImage.caption,
      keywords: parsedPayload.keywords,
      metaDescription: parsedPayload.metaDescription,
      toc: parsedPayload.toc,
      faq: parsedPayload.faq,
      internalLinks: parsedPayload.internalLinks,
      externalLinks: parsedPayload.externalLinks,
      ctaText: parsedPayload.cta.text,
      ctaUrl: parsedPayload.cta.url,
      topicKey: topic.key,
      promptContext: JSON.stringify(guidelines),
      rawPrompt: prompt,
      rawResponse: aiResponse.text,
      provider: aiResponse.provider,
      modelUsed: aiResponse.model,
      wordCount: countWords(parsedPayload.contentHtml),
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  if (secondaryImages.length) {
    await prisma.blogImage.createMany({
      data: secondaryImages.map((image) => ({
        postId: createdPost.id,
        kind: image.kind,
        url: image.url,
        alt: image.alt,
        caption: image.caption,
        credit: image.credit,
        keywords: image.keywords,
      })),
    });
  }

  return {
    post: createdPost,
    topic,
    heroImage,
    secondaryImageCount: secondaryImages.length,
  };
}
