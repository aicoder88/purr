import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import ts from 'typescript';

export type InlineHeadTag = 'title' | 'meta' | 'canonical-link';

export interface InlineHeadViolation {
  file: string;
  line: number;
  column: number;
  tag: InlineHeadTag;
  message: string;
  snippet: string;
}

export interface InlineHeadGuardResult {
  passed: boolean;
  scannedFiles: number;
  allowedExceptions: number;
  issues: InlineHeadViolation[];
}

interface AllowMarker {
  line: number;
  position: number;
  reason: string;
}

interface SourceScanResult {
  allowedExceptions: number;
  issues: InlineHeadViolation[];
}

const PAGE_GLOB = 'app/**/page.tsx';
const ALLOW_MARKER = 'seo-inline-head-allow:';

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function getLineAndColumn(sourceFile: ts.SourceFile, position: number) {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(position);
  return {
    line: line + 1,
    column: character + 1,
  };
}

function collectAllowMarkers(sourceText: string, sourceFile: ts.SourceFile): AllowMarker[] {
  const markers: AllowMarker[] = [];
  const matcher = /seo-inline-head-allow:\s*([^\n*][^\n]*)/gi;

  for (const match of sourceText.matchAll(matcher)) {
    const matchIndex = match.index ?? -1;
    const reason = normalizeWhitespace(match[1] ?? '');

    if (matchIndex < 0 || reason.length === 0) {
      continue;
    }

    const { line } = getLineAndColumn(sourceFile, matchIndex);
    markers.push({
      line,
      position: matchIndex,
      reason,
    });
  }

  return markers;
}

function getJsxAttributeValue(attribute: ts.JsxAttribute): string | undefined {
  if (!attribute.initializer) {
    return undefined;
  }

  if (ts.isStringLiteral(attribute.initializer)) {
    return attribute.initializer.text;
  }

  if (!ts.isJsxExpression(attribute.initializer) || !attribute.initializer.expression) {
    return undefined;
  }

  if (ts.isStringLiteral(attribute.initializer.expression)) {
    return attribute.initializer.expression.text;
  }

  if (ts.isNoSubstitutionTemplateLiteral(attribute.initializer.expression)) {
    return attribute.initializer.expression.text;
  }

  return undefined;
}

function isCanonicalLinkTag(node: ts.JsxOpeningLikeElement, sourceFile: ts.SourceFile): boolean {
  if (node.tagName.getText(sourceFile).toLowerCase() !== 'link') {
    return false;
  }

  for (const attribute of node.attributes.properties) {
    if (!ts.isJsxAttribute(attribute)) {
      continue;
    }

    if (attribute.name.getText(sourceFile).toLowerCase() !== 'rel') {
      continue;
    }

    const value = getJsxAttributeValue(attribute);
    if (value?.toLowerCase() === 'canonical') {
      return true;
    }
  }

  return false;
}

function getViolationForNode(
  node: ts.JsxOpeningLikeElement,
  sourceFile: ts.SourceFile,
  relativeFile: string,
): InlineHeadViolation | null {
  const tagName = node.tagName.getText(sourceFile).toLowerCase();

  if (tagName !== 'title' && tagName !== 'meta' && !isCanonicalLinkTag(node, sourceFile)) {
    return null;
  }

  const { line, column } = getLineAndColumn(sourceFile, node.getStart(sourceFile));
  const snippet = normalizeWhitespace(node.getText(sourceFile));
  const tag: InlineHeadTag = tagName === 'link' ? 'canonical-link' : (tagName as InlineHeadTag);

  return {
    file: relativeFile,
    line,
    column,
    tag,
    message: tag === 'canonical-link'
      ? 'Move canonical link definitions to metadata alternates instead of inline JSX.'
      : `Move <${tagName}> definitions to the App Router metadata contract instead of inline JSX.`,
    snippet,
  };
}

function hasDocumentedException(
  violation: InlineHeadViolation,
  violationStart: number,
  markers: AllowMarker[],
): boolean {
  return markers.some((marker) => (
    marker.position < violationStart
    && marker.line >= violation.line - 2
    && marker.line <= violation.line
  ));
}

export function findInlineHeadViolationsInSource(
  sourceText: string,
  relativeFile: string,
): SourceScanResult {
  const sourceFile = ts.createSourceFile(
    relativeFile,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const allowMarkers = collectAllowMarkers(sourceText, sourceFile);
  const issues: InlineHeadViolation[] = [];
  let allowedExceptions = 0;

  const visit = (node: ts.Node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const violation = getViolationForNode(node, sourceFile, relativeFile);

      if (violation) {
        if (hasDocumentedException(violation, node.getStart(sourceFile), allowMarkers)) {
          allowedExceptions += 1;
        } else {
          issues.push(violation);
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return {
    allowedExceptions,
    issues,
  };
}

export async function validateNoInlineHeadTags(
  rootDir = process.cwd(),
): Promise<InlineHeadGuardResult> {
  const files = await fg(PAGE_GLOB, {
    cwd: rootDir,
    absolute: true,
  });

  const issues: InlineHeadViolation[] = [];
  let allowedExceptions = 0;

  for (const filePath of files) {
    const sourceText = fs.readFileSync(filePath, 'utf8');
    const relativeFile = path.relative(rootDir, filePath);
    const result = findInlineHeadViolationsInSource(sourceText, relativeFile);

    issues.push(...result.issues);
    allowedExceptions += result.allowedExceptions;
  }

  return {
    passed: issues.length === 0,
    scannedFiles: files.length,
    allowedExceptions,
    issues,
  };
}

async function main() {
  console.log('🧾 Validating App Router metadata usage...\n');

  const result = await validateNoInlineHeadTags();

  console.log(`Scanned page files: ${result.scannedFiles}`);
  console.log(`Documented exceptions: ${result.allowedExceptions}`);
  console.log(`Violations: ${result.issues.length}\n`);

  if (!result.passed) {
    for (const issue of result.issues) {
      console.error(`- ${issue.file}:${issue.line}:${issue.column} [${issue.tag}] ${issue.message}`);
      console.error(`  ${issue.snippet}`);
    }

    process.exit(1);
  }

  console.log('✅ No inline <title>, <meta>, or canonical <link> tags found in page JSX\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
