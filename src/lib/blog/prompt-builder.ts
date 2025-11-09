import { INTERNAL_LINK_OPTIONS } from './internal-links';
import { BlogGuidelineContext, BlogTopic } from './types';

export function buildBlogPrompt(topic: BlogTopic, context: BlogGuidelineContext) {
  const schema = `{
  "title": string,
  "slug": string,
  "excerpt": string,
  "metaDescription": string,
  "keywords": string[],
  "toc": Array<{"title": string, "id": string}>,
  "internalLinks": Array<{"label": string, "url": string}>,
  "externalLinks": Array<{"label": string, "url": string}>,
  "faq": Array<{"question": string, "answerHtml": string}>,
  "cta": {"text": string, "url": string},
  "contentHtml": string
}`;

  return `You are an SEO editor for a premium activated carbon litter deodorizer brand.
Follow every requirement below without exception.

### Writing Standards
${context.writingChecklist}

### Image Requirements (for context)
${context.imageStandards}

### SEO Checklist
${context.seoChecklist}

### Legal & Tone Requirements
${context.legalRequirements}
- Never mention competitor brand names.
- Use confident but conditionally phrased claims ("designed to", "may help").

### Topic Brief
- Locale: ${topic.locale}
- Title Target: ${topic.title}
- Slug Target: ${topic.slug}
- Primary Keyword: ${topic.primaryKeyword}
- Secondary Keywords: ${topic.secondaryKeywords.join(', ')}
- Search Intent: ${topic.intent}
- Hook: ${topic.hook}
- Shareability Angle: ${topic.shareability}
- Content Angle: ${topic.contentAngle}
- Target Audience: ${topic.targetAudience}
- Call to Action: ${topic.cta}

### Approved Internal Link Targets (choose the most relevant ones and reuse exact URLs)
${INTERNAL_LINK_OPTIONS.map((item) => `- ${item.label} -> ${item.url}`).join('\n')}

### Output Rules
1. Word count 1,800–2,400 words, HTML paragraphs + semantic <h2>/<h3> structure.
2. Include at least 5 H2 sections plus supporting <ul>/<ol> lists where useful.
3. Reference real data points (with sources) when making claims.
4. Provide at least 4 internal link ideas (existing site URLs) and 2 trustworthy external citations.
5. Finish with a high-converting CTA block that matches the target CTA.
6. Provide FAQ entries that feel like genuine customer questions, each 120-180 words.
7. Use locale-specific language (French and Chinese topics must be written fully in that language).

### Output Format
Return valid minified JSON that matches this schema with no extra commentary:
${schema}

All HTML must be production-ready (no markdown). Assign deterministic id attributes for table-of-contents anchors (kebab-case).`;
}
