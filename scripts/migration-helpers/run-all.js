#!/usr/bin/env node
/**
 * run-all.js
 * 
 * Master orchestration script for Phase 2 migration.
 * Runs all helper scripts in the correct order with proper error handling.
 * 
 * Usage: node scripts/migration-helpers/run-all.js [--quick] [--skip-validation]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const args = process.argv.slice(2);
const isQuick = args.includes('--quick');
const skipValidation = args.includes('--skip-validation');
const startFrom = args.find(arg => arg.startsWith('--start-from='))?.split('=')[1];

// Steps configuration
const STEPS = [
  {
    name: 'rewrite-references',
    description: 'Rewrite image references in source files',
    command: 'node scripts/migration-helpers/rewrite-references.js',
    dryRunCommand: 'node scripts/migration-helpers/rewrite-references.js --dry-run --verbose',
    skipCheck: () => false,
  },
  {
    name: 'update-blog-json',
    description: 'Update blog JSON files',
    command: 'node scripts/migration-helpers/update-blog-json.js',
    dryRunCommand: 'node scripts/migration-helpers/update-blog-json.js --dry-run --verbose',
    skipCheck: () => false,
  },
  {
    name: 'regenerate-artifacts',
    description: 'Regenerate dependent artifacts',
    command: `node scripts/migration-helpers/regenerate-artifacts.js ${isQuick ? '--quick' : ''}`,
    dryRunCommand: null, // No dry-run for this step
    skipCheck: () => false,
  },
  {
    name: 'validate-migration',
    description: 'Validate migration success',
    command: 'node scripts/migration-helpers/validate-migration.js --verbose',
    dryRunCommand: null,
    skipCheck: () => skipValidation,
  },
];

// State
let currentStep = 0;
const results = {
  success: [],
  failed: [],
  skipped: [],
};

/**
 * Ask user for confirmation
 */
function askQuestion(question) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    readline.question(question, answer => {
      readline.close();
      resolve(answer.toLowerCase());
    });
  });
}

/**
 * Run a command and return success status
 */
function runCommand(command, description, allowFailure = false) {
  console.log('');
  console.log(`▶ ${description}`);
  console.log(`  $ ${command}`);
  console.log('');

  try {
    execSync(command, {
      cwd: process.cwd(),
      stdio: 'inherit',
    });
    return { success: true };
  } catch (error) {
    if (allowFailure) {
      return { success: false, error: error.message };
    }
    throw error;
  }
}

/**
 * Execute a step
 */
async function executeStep(step, index) {
  console.log('');
  console.log('='.repeat(60));
  console.log(`Step ${index + 1}/${STEPS.length}: ${step.name}`);
  console.log(step.description);
  console.log('='.repeat(60));

  // Check if step should be skipped
  if (step.skipCheck()) {
    console.log('⏭ Skipped');
    results.skipped.push(step.name);
    return;
  }

  // Check if we should start from this step
  if (startFrom && step.name !== startFrom) {
    console.log('⏭ Skipped (before --start-from)');
    results.skipped.push(step.name);
    return;
  }

  // Dry run first (if available)
  if (step.dryRunCommand && !isQuick) {
    console.log('');
    console.log('Running dry-run first...');
    const dryRunResult = runCommand(step.dryRunCommand, 'Dry Run', true);
    
    if (!dryRunResult.success) {
      console.log('⚠ Dry run had issues, but continuing...');
    }

    // Ask for confirmation
    const answer = await askQuestion('\nProceed with live execution? [Y/n] ');
    if (answer === 'n' || answer === 'no') {
      console.log('Skipping this step.');
      results.skipped.push(step.name);
      return;
    }
  }

  // Run the actual command
  try {
    runCommand(step.command, 'Live Execution');
    results.success.push(step.name);
    console.log('');
    console.log(`✅ Step ${step.name} completed successfully`);
  } catch (error) {
    results.failed.push({ name: step.name, error: error.message });
    console.log('');
    console.log(`❌ Step ${step.name} failed`);
    
    const answer = await askQuestion('Continue with next step? [y/N] ');
    if (answer !== 'y' && answer !== 'yes') {
      throw new Error('Aborted by user');
    }
  }
}

/**
 * Print final summary
 */
function printSummary() {
  console.log('');
  console.log('='.repeat(60));
  console.log('Migration Complete - Summary');
  console.log('='.repeat(60));
  console.log('');

  // Successful steps
  if (results.success.length > 0) {
    console.log('✅ Successful:');
    for (const name of results.success) {
      console.log(`   ✓ ${name}`);
    }
    console.log('');
  }

  // Failed steps
  if (results.failed.length > 0) {
    console.log('❌ Failed:');
    for (const { name, error } of results.failed) {
      console.log(`   ✗ ${name}: ${error}`);
    }
    console.log('');
  }

  // Skipped steps
  if (results.skipped.length > 0) {
    console.log('⏭ Skipped:');
    for (const name of results.skipped) {
      console.log(`   • ${name}`);
    }
    console.log('');
  }

  // Final status
  const total = STEPS.length;
  const success = results.success.length;
  const failed = results.failed.length;
  const skipped = results.skipped.length;

  console.log('-'.repeat(60));
  console.log(`Total: ${total} | Success: ${success} | Failed: ${failed} | Skipped: ${skipped}`);
  console.log('');

  if (failed === 0) {
    console.log('🎉 All steps completed successfully!');
  } else if (success > 0) {
    console.log('⚠️ Some steps failed. Review the output above.');
  } else {
    console.log('❌ All steps failed or were skipped.');
  }

  // Check for report files
  const reports = [
    'migration-artifacts-report.json',
    'migration-validation-report.json',
  ];

  console.log('');
  console.log('Generated reports:');
  for (const report of reports) {
    const reportPath = path.join(process.cwd(), report);
    if (fs.existsSync(reportPath)) {
      console.log(`   📄 ${report}`);
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Phase 2 Migration - Master Orchestration');
  console.log('='.repeat(60));
  console.log('');
  console.log('This script will:');
  console.log('1. Rewrite image references in source files');
  console.log('2. Update blog JSON files');
  console.log('3. Regenerate dependent artifacts');
  console.log('4. Validate migration success');
  console.log('');

  if (isQuick) {
    console.log('Mode: QUICK (skipping dry-runs and heavy operations)');
    console.log('');
  }

  if (startFrom) {
    console.log(`Starting from step: ${startFrom}`);
    console.log('');
  }

  // Check prerequisites
  const manifestPath = path.join(process.cwd(), 'reference-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('Error: reference-manifest.json not found in current directory');
    console.error('Please ensure the manifest file exists before running this script');
    process.exit(1);
  }

  console.log('Prerequisites check:');
  console.log(`  ✓ reference-manifest.json found`);
  console.log('');

  // Confirm start
  if (!isQuick) {
    const answer = await askQuestion('Start migration? [Y/n] ');
    if (answer === 'n' || answer === 'no') {
      console.log('Aborted.');
      process.exit(0);
    }
  }

  // Execute steps
  try {
    for (let i = 0; i < STEPS.length; i++) {
      await executeStep(STEPS[i], i);
    }
  } catch (error) {
    console.log('');
    console.error(`Fatal error: ${error.message}`);
  }

  // Print summary
  printSummary();

  // Exit code
  process.exit(results.failed.length > 0 ? 1 : 0);
}

main();
