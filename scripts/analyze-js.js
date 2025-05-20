const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const ANALYSIS_OUTPUT_DIR = path.join(PROJECT_ROOT, 'analysis');

// Ensure analysis directory exists
if (!fs.existsSync(ANALYSIS_OUTPUT_DIR)) {
  fs.mkdirSync(ANALYSIS_OUTPUT_DIR, { recursive: true });
}

console.log('🔍 Starting JavaScript analysis...');

// Function to run the bundle analyzer
function runBundleAnalyzer() {
  try {
    console.log('📊 Running bundle analyzer...');
    execSync('ANALYZE=true npm run build', { 
      stdio: 'inherit',
      cwd: PROJECT_ROOT
    });
    console.log('✅ Bundle analysis complete');
  } catch (error) {
    console.error('❌ Error running bundle analyzer:', error);
  }
}

// Function to find unused dependencies
function findUnusedDependencies() {
  try {
    console.log('🧹 Finding unused dependencies...');
    
    // Install depcheck if not already installed
    try {
      execSync('npx depcheck --version', { stdio: 'ignore' });
    } catch (error) {
      console.log('Installing depcheck...');
      execSync('npm install --save-dev depcheck', { 
        stdio: 'inherit',
        cwd: PROJECT_ROOT
      });
    }
    
    // Run depcheck
    const depcheckOutput = execSync('npx depcheck --json', { 
      cwd: PROJECT_ROOT,
      encoding: 'utf8'
    });
    
    // Parse the JSON output
    const depcheckResult = JSON.parse(depcheckOutput);
    
    // Write results to file
    const outputPath = path.join(ANALYSIS_OUTPUT_DIR, 'unused-dependencies.json');
    fs.writeFileSync(
      outputPath,
      JSON.stringify(depcheckResult, null, 2)
    );
    
    console.log(`✅ Unused dependencies analysis complete. Results saved to ${outputPath}`);
    
    // Print unused dependencies
    if (depcheckResult.dependencies.length > 0) {
      console.log('\nUnused dependencies:');
      depcheckResult.dependencies.forEach(dep => console.log(`- ${dep}`));
    } else {
      console.log('\nNo unused dependencies found.');
    }
    
    return depcheckResult.dependencies;
  } catch (error) {
    console.error('❌ Error finding unused dependencies:', error);
    return [];
  }
}

// Function to analyze bundle size
function analyzeBundleSize() {
  try {
    console.log('📦 Analyzing bundle size...');
    
    // Install source-map-explorer if not already installed
    try {
      execSync('npx source-map-explorer --version', { stdio: 'ignore' });
    } catch (error) {
      console.log('Installing source-map-explorer...');
      execSync('npm install --save-dev source-map-explorer', { 
        stdio: 'inherit',
        cwd: PROJECT_ROOT
      });
    }
    
    // Build with source maps
    execSync('GENERATE_SOURCEMAP=true npm run build', { 
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
      env: { ...process.env, GENERATE_SOURCEMAP: 'true' }
    });
    
    // Run source-map-explorer on main bundle
    const outputPath = path.join(ANALYSIS_OUTPUT_DIR, 'bundle-analysis.html');
    execSync(`npx source-map-explorer .next/static/chunks/*.js --html ${outputPath}`, { 
      stdio: 'inherit',
      cwd: PROJECT_ROOT
    });
    
    console.log(`✅ Bundle size analysis complete. Results saved to ${outputPath}`);
  } catch (error) {
    console.error('❌ Error analyzing bundle size:', error);
  }
}

// Main function
async function main() {
  try {
    // Create recommendations file
    const recommendationsPath = path.join(ANALYSIS_OUTPUT_DIR, 'optimization-recommendations.md');
    
    // Find unused dependencies
    const unusedDeps = findUnusedDependencies();
    
    // Run bundle analyzer
    runBundleAnalyzer();
    
    // Generate recommendations
    let recommendations = `# JavaScript Optimization Recommendations\n\n`;
    recommendations += `Generated on: ${new Date().toLocaleString()}\n\n`;
    
    if (unusedDeps.length > 0) {
      recommendations += `## Unused Dependencies\n\n`;
      recommendations += `The following dependencies are not being used and can be removed:\n\n`;
      unusedDeps.forEach(dep => {
        recommendations += `- \`${dep}\`: Remove with \`npm uninstall ${dep}\`\n`;
      });
      recommendations += `\n`;
    }
    
    recommendations += `## General Recommendations\n\n`;
    recommendations += `1. **Code Splitting**: Ensure dynamic imports are used for large components that aren't needed immediately\n`;
    recommendations += `2. **Tree Shaking**: Import only what you need from libraries (e.g., \`import { Button } from 'ui-lib'\` instead of \`import UILib from 'ui-lib'\`)\n`;
    recommendations += `3. **Lazy Loading**: Use \`next/dynamic\` for components that aren't needed for initial render\n`;
    recommendations += `4. **Optimize Third-Party Scripts**: Load non-critical third-party scripts with the \`strategy="lazyOnload"\` option\n`;
    recommendations += `5. **Reduce JavaScript Size**: Minify and compress JavaScript files\n`;
    
    // Write recommendations to file
    fs.writeFileSync(recommendationsPath, recommendations);
    
    console.log(`✅ Recommendations saved to ${recommendationsPath}`);
    console.log('🎉 JavaScript analysis complete!');
  } catch (error) {
    console.error('❌ Error in analysis process:', error);
  }
}

// Run the main function
main().catch(console.error);