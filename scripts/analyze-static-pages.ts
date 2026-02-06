#!/usr/bin/env tsx
/**
 * Static Page Analysis Script
 * 
 * Analyzes all page.tsx files in the app directory to determine:
 * - Current rendering mode (static vs dynamic)
 * - Whether they use 'use client' directive
 * - Whether they have force-static or force-dynamic config
 * - Whether they use dynamic functions (cookies, headers, searchParams)
 * - Recommendations for static optimization
 */

import * as fs from 'fs';
import * as path from 'path';

interface PageAnalysis {
    path: string;
    relativePath: string;
    hasForceStatic: boolean;
    hasForceDynamic: boolean;
    hasUseClient: boolean;
    hasGenerateStaticParams: boolean;
    usesCookies: boolean;
    usesHeaders: boolean;
    usesSearchParams: boolean;
    usesParams: boolean;
    isDynamic: boolean;
    canBeStatic: boolean;
    recommendation: string;
}

const APP_DIR = path.join(process.cwd(), 'app');

function findAllPageFiles(dir: string): string[] {
    const files: string[] = [];

    function walk(currentDir: string) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                // Skip api routes and node_modules
                if (entry.name !== 'api' && entry.name !== 'node_modules') {
                    walk(fullPath);
                }
            } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
                files.push(fullPath);
            }
        }
    }

    walk(dir);
    return files;
}

function analyzePageFile(filePath: string): PageAnalysis {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(APP_DIR, filePath);
    const routePath = '/' + path.dirname(relativePath).replace(/\\/g, '/');

    // Check for directives and configs
    const hasUseClient = /^['"]use client['"];?/m.test(content);
    const hasForceStatic = /export\s+const\s+dynamic\s*=\s*['"]force-static['"]/m.test(content);
    const hasForceDynamic = /export\s+const\s+dynamic\s*=\s*['"]force-dynamic['"]/m.test(content);
    const hasGenerateStaticParams = /export\s+(async\s+)?function\s+generateStaticParams/m.test(content);

    // Check for dynamic function usage
    const usesCookies = /cookies\s*\(\s*\)/.test(content);
    const usesHeaders = /headers\s*\(\s*\)/.test(content);
    const usesSearchParams = /searchParams/.test(content);
    const usesParams = /params:\s*Promise/.test(content) || /await\s+params/.test(content);

    // Determine if page is currently dynamic
    const isDynamic = !hasForceStatic && (
        hasForceDynamic ||
        usesCookies ||
        usesHeaders ||
        usesSearchParams ||
        // Note: params alone don't make it dynamic if generateStaticParams exists
        (usesParams && !hasGenerateStaticParams)
    );

    // Determine if page CAN be static
    const canBeStatic = !hasForceDynamic &&
        !usesCookies &&
        !usesHeaders &&
        !usesSearchParams &&
        (!usesParams || hasGenerateStaticParams);

    // Generate recommendation
    let recommendation: string;

    if (hasForceStatic) {
        recommendation = '✅ Already static';
    } else if (hasForceDynamic) {
        recommendation = '⛔ Intentionally dynamic';
    } else if (hasGenerateStaticParams && usesParams) {
        recommendation = '✅ SSG via generateStaticParams';
    } else if (hasUseClient && canBeStatic) {
        recommendation = '🔧 Refactor: Move to server component wrapper + force-static';
    } else if (canBeStatic) {
        recommendation = '🎯 ADD: export const dynamic = "force-static"';
    } else if (usesSearchParams) {
        recommendation = '⚠️ Uses searchParams (inherently dynamic)';
    } else if (usesCookies) {
        recommendation = '⚠️ Uses cookies() directly';
    } else if (usesHeaders) {
        recommendation = '⚠️ Uses headers() directly';
    } else {
        recommendation = '🔍 Needs manual review';
    }

    return {
        path: filePath,
        relativePath,
        hasForceStatic,
        hasForceDynamic,
        hasUseClient,
        hasGenerateStaticParams,
        usesCookies,
        usesHeaders,
        usesSearchParams,
        usesParams,
        isDynamic,
        canBeStatic,
        recommendation,
    };
}

function main() {
    console.log('🔍 Analyzing all pages in app directory...\n');

    const pageFiles = findAllPageFiles(APP_DIR);
    console.log(`Found ${pageFiles.length} page files.\n`);

    const analyses = pageFiles.map(analyzePageFile);

    // Categorize results
    const alreadyStatic = analyses.filter(a => a.hasForceStatic || (a.hasGenerateStaticParams && a.usesParams));
    const canOptimize = analyses.filter(a => a.recommendation.startsWith('🎯'));
    const needsRefactor = analyses.filter(a => a.recommendation.startsWith('🔧'));
    const inherentlyDynamic = analyses.filter(a => a.recommendation.startsWith('⚠️') || a.recommendation.startsWith('⛔'));
    const needsReview = analyses.filter(a => a.recommendation.startsWith('🔍'));

    // Print summary
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('                      ANALYSIS SUMMARY');
    console.log('═══════════════════════════════════════════════════════════════\n');

    console.log(`✅ Already Static:        ${alreadyStatic.length} pages`);
    console.log(`🎯 Can Optimize (easy):   ${canOptimize.length} pages`);
    console.log(`🔧 Needs Refactor First:  ${needsRefactor.length} pages`);
    console.log(`⚠️  Inherently Dynamic:   ${inherentlyDynamic.length} pages`);
    console.log(`🔍 Needs Manual Review:   ${needsReview.length} pages`);
    console.log(`───────────────────────────────────────────────────────────────`);
    console.log(`   TOTAL:                 ${analyses.length} pages\n`);

    // Print actionable items
    if (canOptimize.length > 0) {
        console.log('\n🎯 EASY WINS - Add force-static to these pages:');
        console.log('─────────────────────────────────────────────────');
        canOptimize.forEach(a => {
            const route = '/' + path.dirname(a.relativePath).replace(/\\/g, '/').replace(/^\./, '');
            console.log(`  ${route.padEnd(50)} ${a.relativePath}`);
        });
    }

    if (needsRefactor.length > 0) {
        console.log('\n🔧 NEEDS REFACTOR - Convert from use client first:');
        console.log('─────────────────────────────────────────────────');
        needsRefactor.forEach(a => {
            const route = '/' + path.dirname(a.relativePath).replace(/\\/g, '/').replace(/^\./, '');
            console.log(`  ${route.padEnd(50)} ${a.relativePath}`);
        });
    }

    if (inherentlyDynamic.length > 0) {
        console.log('\n⚠️  INHERENTLY DYNAMIC - Cannot be made static:');
        console.log('─────────────────────────────────────────────────');
        inherentlyDynamic.forEach(a => {
            const route = '/' + path.dirname(a.relativePath).replace(/\\/g, '/').replace(/^\./, '');
            console.log(`  ${route.padEnd(50)} ${a.recommendation}`);
        });
    }

    if (alreadyStatic.length > 0) {
        console.log('\n✅ ALREADY OPTIMIZED:');
        console.log('─────────────────────────────────────────────────');
        alreadyStatic.forEach(a => {
            const route = '/' + path.dirname(a.relativePath).replace(/\\/g, '/').replace(/^\./, '');
            console.log(`  ${route.padEnd(50)} ${a.recommendation}`);
        });
    }

    // Generate JSON report
    const report = {
        timestamp: new Date().toISOString(),
        totalPages: analyses.length,
        summary: {
            alreadyStatic: alreadyStatic.length,
            canOptimize: canOptimize.length,
            needsRefactor: needsRefactor.length,
            inherentlyDynamic: inherentlyDynamic.length,
            needsReview: needsReview.length,
        },
        pages: {
            canOptimize: canOptimize.map(a => ({
                route: '/' + path.dirname(a.relativePath).replace(/\\/g, '/').replace(/^\./, ''),
                file: a.relativePath,
            })),
            needsRefactor: needsRefactor.map(a => ({
                route: '/' + path.dirname(a.relativePath).replace(/\\/g, '/').replace(/^\./, ''),
                file: a.relativePath,
            })),
            inherentlyDynamic: inherentlyDynamic.map(a => ({
                route: '/' + path.dirname(a.relativePath).replace(/\\/g, '/').replace(/^\./, ''),
                file: a.relativePath,
                reason: a.recommendation,
            })),
            alreadyStatic: alreadyStatic.map(a => ({
                route: '/' + path.dirname(a.relativePath).replace(/\\/g, '/').replace(/^\./, ''),
                file: a.relativePath,
            })),
        },
    };

    const reportPath = path.join(process.cwd(), 'static-page-analysis.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Full report saved to: ${reportPath}`);

    // Print potential savings estimate
    const potentialSavings = canOptimize.length + needsRefactor.length;
    if (potentialSavings > 0) {
        console.log('\n═══════════════════════════════════════════════════════════════');
        console.log('                    POTENTIAL IMPACT');
        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`\n  ${potentialSavings} pages can be converted to static rendering.`);
        console.log(`  This could reduce Vercel function invocations significantly.`);
        console.log(`\n  Easy wins (just add config):     ${canOptimize.length} pages`);
        console.log(`  Requires refactoring first:      ${needsRefactor.length} pages`);
    }
}

main();
