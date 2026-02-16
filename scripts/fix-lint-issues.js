const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

function runEslint() {
    console.log(`${colors.blue}Running ESLint to identify issues...${colors.reset}`);
    try {
        execSync('npx eslint . --format json > eslint-report.json', { stdio: 'ignore' });
    } catch (e) {
        // Expected
    }
}

function processReport() {
    if (!fs.existsSync('eslint-report.json')) {
        console.error(`${colors.red}Error: eslint-report.json not found.${colors.reset}`);
        return;
    }

    const report = JSON.parse(fs.readFileSync('eslint-report.json', 'utf8'));
    let fixedCount = 0;

    report.forEach(fileResult => {
        const { filePath, messages } = fileResult;
        if (!messages || messages.length === 0) return;

        if (!fs.existsSync(filePath)) return;
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        let modified = false;

        const unusedVars = messages.filter(m =>
            m.ruleId === '@typescript-eslint/no-unused-vars' ||
            m.ruleId === 'no-unused-vars'
        );

        // Sort descending to edit lines without shifting
        unusedVars.sort((a, b) => {
            if (a.line !== b.line) return b.line - a.line;
            return b.column - a.column;
        });

        unusedVars.forEach(msg => {
            const lineIdx = msg.line - 1;
            const line = lines[lineIdx];
            const match = maxMatch(msg.message);

            if (match) {
                const varName = match;

                // Skip renaming if it's an import to avoid breaking references
                // But try to remove the unused import if it's safe
                if (line.trim().startsWith('import ')) {
                    // Basic regex to try to remove the specific import
                    // Remove named import: ", varName" or "varName,"

                    let newLine = line;

                    // If simple import "import X from '...'"
                    if (new RegExp(`^import\\s+${varName}\\s+from`).test(line)) {
                        // Comment out whole line as safe fallback
                        // Or remove it?
                        // Let's remove it if it's the only thing
                        if (!line.includes('{')) {
                            lines[lineIdx] = '';
                            modified = true;
                            fixedCount++;
                            console.log(`${colors.green}Removed unused default import '${varName}' in ${path.basename(filePath)}:${msg.line}${colors.reset}`);
                            return;
                        }
                    }

                    // Named imports inside { }
                    if (line.includes('{') && line.includes('}')) {
                        // Remove `varName, ` or `, varName` or `varName`
                        // This is tricky with regex but let's try

                        // Remove trailing comma case "varName,"
                        newLine = newLine.replace(new RegExp(`\\b${varName}\\s*,`), '');

                        // Remove leading comma case ", varName"
                        if (newLine === line) {
                            newLine = newLine.replace(new RegExp(`,\\s*${varName}\\b`), '');
                        }

                        // Remove solo usage
                        if (newLine === line) {
                            newLine = newLine.replace(new RegExp(`\\b${varName}\\b`), '');
                        }

                        // Clean up empty braces "import { } from ..."
                        if (newLine.match(/import\s*\{\s*\}\s*from/)) {
                            newLine = '';
                        }

                        if (newLine !== line) {
                            lines[lineIdx] = newLine;
                            modified = true;
                            fixedCount++;
                            console.log(`${colors.green}Removed unused named import '${varName}' in ${path.basename(filePath)}:${msg.line}${colors.reset}`);
                        }
                    }
                    return;
                }

                // For non-imports (locals/params), prefix with _
                const regex = new RegExp(`\\b${varName}\\b`);
                if (regex.test(line)) {
                    if (!varName.startsWith('_')) {
                        lines[lineIdx] = line.replace(regex, `_${varName}`);
                        modified = true;
                        fixedCount++;
                        console.log(`${colors.green}Fixed unused var '${varName}' in ${path.basename(filePath)}:${msg.line}${colors.reset}`);
                    }
                }
            }
        });

        if (modified) {
            // Filter out empty lines created by import removal
            const finalContent = lines.filter(l => l !== '').join('\n');
            fs.writeFileSync(filePath, finalContent, 'utf8');
        }
    });

    console.log(`${colors.blue}Total fixes applied: ${fixedCount}${colors.reset}`);

    if (fs.existsSync('eslint-report.json')) {
        fs.unlinkSync('eslint-report.json');
    }
}

function maxMatch(message) {
    const match = message.match(/'([^']+)'/);
    return match ? match[1] : null;
}

runEslint();
processReport();
