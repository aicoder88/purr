import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { glob } from 'glob';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import t from '@babel/types';
import generate from '@babel/generator';

export default {

  name: 'performance-optimizer',
  
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

        // Check for missing React.memo
        traverse(ast, {
          FunctionDeclaration(path) {
            if (path.node.id && path.node.id.name.match(/^[A-Z]/)) {
              const parent = path.findParent(p => p.isExportDefaultDeclaration());
              if (parent && !parent.node.declaration.name.endsWith('Memo')) {
                issues.push({
                  file,
                  line: path.node.loc.start.line,
                  type: 'missing_memo',
                  component: path.node.id.name,
                  message: 'Component could be memoized with React.memo'
                });
              }
            }
          }
        });

        // Check for inline functions in JSX
        traverse(ast, {
          JSXAttribute(path) {
            if (path.node.name.name === 'onClick' || 
                path.node.name.name.startsWith('on')) {
              if (path.node.value && 
                  path.node.value.expression && 
                  path.node.value.expression.type === 'ArrowFunctionExpression') {
                issues.push({
                  file,
                  line: path.node.loc.start.line,
                  type: 'inline_function',
                  message: 'Avoid inline functions in JSX to prevent unnecessary re-renders'
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

        // Sort issues by line number in reverse to avoid offset issues
        const sortedIssues = [...fileIssues].sort((a, b) => b.line - a.line);

        for (const issue of sortedIssues) {
          if (issue.type === 'missing_memo') {
            // Find the component export and wrap it with memo
            const lines = code.split('\n');
            const exportLine = lines.findIndex((line, idx) => 
              idx >= issue.line - 1 && line.includes(`export default ${issue.component}`)
            );

            if (exportLine !== -1) {
              lines[exportLine] = `const ${issue.component}Memo = React.memo(${issue.component});\n${lines[exportLine].replace(issue.component, `${issue.component}Memo`)}`;
              modified = true;
              appliedFixes.push({
                file,
                type: 'memo_added',
                component: issue.component
              });
            }
          }
        }

        if (modified) {
          fs.writeFileSync(file, code);
        }
      } catch (error) {
        console.error(`Error fixing ${file}:`, error.message);
      }
    }

    return {
      applied: appliedFixes.length > 0,
      files: appliedFixes,
      details: {
        optimizations: appliedFixes.length
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
