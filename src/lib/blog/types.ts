export type Locale = 'en' | 'fr' | 'zh';

export type BlogTopic = {
  key: string;
  locale: Locale;
  title: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  hook: string;
  shareability: string;
  contentAngle: string;
  targetAudience: string;
  cta: string;
};

export type GeneratedImage = {
  kind: 'HERO' | 'SECTION' | 'INFOGRAPHIC' | 'CTA';
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  keywords: string[];
};

export type GeneratedBlogPayload = {
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  metaDescription: string;
  keywords: string[];
  toc: Array<{ title: string; id: string }>;
  faq: Array<{ question: string; answerHtml: string }>;
  internalLinks: Array<{ label: string; url: string }>;
  externalLinks: Array<{ label: string; url: string }>;
  heroImage: GeneratedImage;
  secondaryImages: GeneratedImage[];
  cta: { text: string; url: string };
};

export type BlogGuidelineContext = {
  writingChecklist: string;
  imageStandards: string;
  seoChecklist: string;
  legalRequirements: string;
};
