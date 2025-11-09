import fs from 'fs';
import path from 'path';
import { BlogGuidelineContext } from './types';

function readFileSafe(filePath: string) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    return '';
  }
}

function extractSection(markdown: string, heading: string): string {
  if (!markdown) return '';
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`${escapedHeading}\\n([\\s\\S]*?)(\\n## |\\n### |$)`, 'i');
  const match = markdown.match(regex);
  return match ? match[1].trim() : '';
}

export function loadGuidelines(): BlogGuidelineContext {
  const blogPath = path.join(process.cwd(), 'docs', 'archive', 'blog.md');
  const claudePath = path.join(process.cwd(), 'docs', 'archive', 'CLAUDE.md');
  const blogMd = readFileSafe(blogPath);
  const claudeMd = readFileSafe(claudePath);

  const writingChecklist = extractSection(blogMd, '### Writing Excellence Checklist') ||
    'Write 1,800-2,800 word narratives with hooks, data, actionable steps, and emotional arc.';

  const imageStandards = extractSection(blogMd, '### Image Requirements (Per Post) - MANDATORY 3-4 IMAGES') ||
    'At least 3 Unsplash images: hero + 2 supporting, 1600px wide, descriptive alt text using keywords.';

  const seoChecklist = extractSection(blogMd, '### SEO Optimization Checklist') ||
    'Primary keyword in title, H1, intro; add LSI keywords to H2s; include meta description, internal/external links, FAQ schema.';

  const legalRequirements = extractSection(blogMd, '### Legal Compliance (MANDATORY)') ||
    extractSection(claudeMd, '### Legal Compliance (MANDATORY)') ||
    'Avoid competitor names, medical claims, or absolute guarantees. Use conditional language.';

  return {
    writingChecklist,
    imageStandards,
    seoChecklist,
    legalRequirements,
  };
}
