/**
 * ESLint Plugin: Hydration Safety
 *
 * Prevents the anti-pattern of conditionally returning null in page components,
 * which causes React hydration mismatches.
 *
 * ❌ BAD:  if (condition) return null;
 * ✅ GOOD: if (loading) return <Loading />;
 * ✅ GOOD: if (!data) return <ErrorPage />;
 */

export default {
  rules: {
    'no-conditional-return-null': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Prevent conditional return null in page components (causes hydration errors)',
          category: 'Possible Errors',
          recommended: true,
        },
        messages: {
          conditionalReturnNull:
            'Conditionally returning null causes hydration mismatches. Return a component instead: <Loading />, <ErrorPage />, etc. See CLAUDE.md for patterns.',
        },
        schema: [],
      },
      create(context) {
        let isInComponentBody = false;
        let componentDepth = 0;
        let inExport = false;

        // Get the filename to check if it's in pages/
        const filename = context.getFilename();
        const isPagesFile = filename.includes('/pages/') && !filename.includes('/pages/api/');

        // Skip API routes and special Next.js pages
        if (!isPagesFile || filename.match(/_app|_document|_error|404|500/)) {
          return {};
        }

        return {
          // Detect export default function Component
          ExportDefaultDeclaration(node) {
            inExport = true;
          },

          // Track when we enter a function that could be a component
          FunctionDeclaration(node) {
            if (inExport && node.id && /^[A-Z]/.test(node.id.name)) {
              isInComponentBody = true;
              componentDepth = 0;
            }
          },

          FunctionExpression(node) {
            // Check if parent is export default
            if (inExport && node.parent.type === 'ExportDefaultDeclaration') {
              isInComponentBody = true;
              componentDepth = 0;
            }
          },

          ArrowFunctionExpression(node) {
            // Check if parent is export default
            if (inExport && node.parent.type === 'ExportDefaultDeclaration') {
              isInComponentBody = true;
              componentDepth = 0;
            }
          },

          // Track nested functions (we only care about top-level component)
          'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression'(node) {
            if (isInComponentBody) {
              componentDepth++;
            }
          },

          'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression:exit'(node) {
            if (isInComponentBody) {
              componentDepth--;
              if (componentDepth === 0) {
                isInComponentBody = false;
                inExport = false;
              }
            }
          },

          // Detect: if (condition) return null;
          IfStatement(node) {
            if (!isInComponentBody || componentDepth !== 1) {
              return;
            }

            // Check consequent (the "then" branch)
            const { consequent } = node;

            // Pattern 1: if (condition) return null;
            if (consequent.type === 'ReturnStatement' && consequent.argument?.type === 'Literal' && consequent.argument.value === null) {
              context.report({
                node: consequent,
                messageId: 'conditionalReturnNull',
              });
            }

            // Pattern 2: if (condition) { return null; }
            if (consequent.type === 'BlockStatement' && consequent.body.length === 1) {
              const statement = consequent.body[0];
              if (statement.type === 'ReturnStatement' && statement.argument?.type === 'Literal' && statement.argument.value === null) {
                context.report({
                  node: statement,
                  messageId: 'conditionalReturnNull',
                });
              }
            }
          },
        };
      },
    },
  },
};
