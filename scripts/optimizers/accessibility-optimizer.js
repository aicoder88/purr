import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import t from '@babel/types';
import generate from '@babel/generator';

export default {

  name: 'accessibility-optimizer',
  
  async analyze() {
    const files = glob.sync('{src,pages,components}/**/*.{js,jsx,ts,tsx}');
    const issues = [];

    for (const file of files) {
      try {
        const code = fs.readFileSync(file, 'utf8');
        const ast = parse(code, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript', 'classProperties', 'decorators-legacy']
        });

        // Check for missing alt text on images
        traverse(ast, {
          JSXOpeningElement(path) {
            if (path.node.name.name === 'img') {
              const hasAlt = path.node.attributes.some(
                attr => attr.name && attr.name.name === 'alt'
              );
              
              if (!hasAlt) {
                issues.push({
                  file,
                  line: path.node.loc.start.line,
                  type: 'missing_alt',
                  message: 'Image is missing alt text'
                });
              }
            }
          }
        });

        // Check for buttons without proper ARIA labels
        traverse(ast, {
          JSXOpeningElement(path) {
            if (path.node.name.name === 'button') {
              const hasAriaLabel = path.node.attributes.some(
                attr => attr.name && attr.name.name === 'aria-label'
              );
              
              const hasAriaLabelledBy = path.node.attributes.some(
                attr => attr.name && attr.name.name === 'aria-labelledby'
              );
              
              const hasTextContent = path.parent.children && 
                path.parent.children.some(child => 
                  child.type === 'JSXText' && 
                  child.value.trim().length > 0
                );
              
              if (!hasAriaLabel && !hasAriaLabelledBy && !hasTextContent) {
                issues.push({
                  file,
                  line: path.node.loc.start.line,
                  type: 'missing_aria_label',
                  message: 'Button is missing accessible name (add aria-label or text content)'
                });
              }
            }
          }
        });

      } catch (error) {
        console.error(`Error analyzing ${file}:`, error.message);
      }
    }

    return issues;
  },
  
  async fix(issues) {
    const appliedFixes = [];
    const fileCache = new Map();

    // Group issues by file
    const issuesByFile = issues.reduce((acc, issue) => {
      if (!acc[issue.file]) acc[issue.file] = [];
      acc[issue.file].push(issue);
      return acc;
    }, {});

    for (const [file, fileIssues] of Object.entries(issuesByFile)) {
      try {
        if (!fileCache.has(file)) {
          fileCache.set(file, fs.readFileSync(file, 'utf8'));
        }
        let code = fileCache.get(file);
        let modified = false;
        let lines = code.split('\n');

        // Sort issues by line number in reverse to avoid offset issues
        const sortedIssues = [...fileIssues].sort((a, b) => b.line - a.line);

        for (const issue of sortedIssues) {
          if (issue.type === 'missing_alt') {
            const lineIdx = issue.line - 1;
            if (lineIdx >= 0 && lineIdx < lines.length) {
              lines[lineIdx] = lines[lineIdx].replace(
                /<img(.*?)\s*\/?>/,
                (match, p1) => {
                  if (!p1.includes('alt=')) {
                    return `<img${p1} alt="" />`;
                  }
                  return match;
                }
              );
              modified = true;
              appliedFixes.push({
                file,
                type: 'alt_added',
                line: issue.line
              });
            }
          }
        }

        if (modified) {
          fs.writeFileSync(file, lines.join('\n'));
        }
      } catch (error) {
        console.error(`Error fixing ${file}:`, error.message);
      }
    }

    return {
      applied: appliedFixes.length > 0,
      files: appliedFixes,
      details: {
        accessibilityFixes: appliedFixes.length
      }
    };
  },
  
  async analyzeAndFix() {
    const issues = await this.analyze();
    if (issues.length > 0) {
      return this.fix(issues);
    }
    return { applied: false };
  }
};
