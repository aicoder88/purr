export type Locale = 'en' | 'fr';

export type SourceType = 'blog' | 'learn';

export type ContentClass = 'pillar_guide' | 'comparison' | 'how_to' | 'quick_answer';

export type PriorityTier = 'P0' | 'P1' | 'P2';

export interface GscMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface ContentThresholds {
  minWords: number;
  maxWords: number;
  minH2: number;
  minH3: number;
  minInlineImages: number;
  maxWordsBetweenImages: number;
  minInternalLinks: number;
  minExternalLinks: number;
}

export interface PageMetrics {
  words: number;
  h2: number;
  h3: number;
  paragraphs: number;
  inlineImages: number;
  totalImages: number;
  internalLinks: number;
  externalLinks: number;
  maxWordsBetweenImages: number;
  listCount: number;
  tableCount: number;
  calloutCount: number;
}

export interface ScoreBreakdown {
  overall: number;
  wordCount: number;
  headings: number;
  mediaDistribution: number;
  links: number;
  layoutReadability: number;
  seoMetadata: number;
}

export interface Recommendation {
  category: 'content_depth' | 'seo_meta' | 'image_layout' | 'linking' | 'structure' | 'layout';
  priority: 'high' | 'medium' | 'low';
  message: string;
  autoFixCandidate: boolean;
}

export interface AuditEntry {
  id: string;
  url: string;
  locale: Locale;
  sourceType: SourceType;
  sourcePath: string;
  status: 'published';
  contentClass: ContentClass;
  thresholds: ContentThresholds;
  metrics: PageMetrics;
  score: ScoreBreakdown;
  gsc?: GscMetrics;
  priorityScore: number;
  priorityTier: PriorityTier;
  recommendations: Recommendation[];
}

export interface LocaleSummary {
  locale: Locale;
  pages: number;
  p0: number;
  p1: number;
  p2: number;
  belowWordTarget: number;
  missingImageTarget: number;
  missingLinkTarget: number;
}

export interface AuditSummary {
  scannedAt: string;
  totalPages: number;
  p0: number;
  p1: number;
  p2: number;
  localeSummary: LocaleSummary[];
}

export interface AuditReport {
  summary: AuditSummary;
  entries: AuditEntry[];
}

export interface AuditOptions {
  locale?: Locale;
  contentClass?: ContentClass;
  limit?: number;
  gscCsvPath?: string;
}

export interface ProposalItem {
  id: string;
  url: string;
  locale: Locale;
  sourceType: SourceType;
  sourcePath: string;
  priorityTier: PriorityTier;
  priorityScore: number;
  contentClass: ContentClass;
  topActions: Recommendation[];
  metricsSnapshot: PageMetrics;
}

export interface ProposalReport {
  generatedAt: string;
  sourceAuditPath: string;
  totalCandidates: number;
  topCandidates: ProposalItem[];
}
