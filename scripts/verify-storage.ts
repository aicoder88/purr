#!/usr/bin/env ts-node

/**
 * Storage Verification Script
 * 
 * Verifies that all required directories exist and file operations work correctly.
 * Run this before deployment to ensure the storage layer is properly configured.
 * 
 * Usage: npx ts-node scripts/verify-storage.ts
 */

import * as fs from 'fs/promises';
import * as path from 'node:path';

interface DirectoryCheck {
  path: string;
  exists: boolean;
  writable: boolean;
  error?: string;
}

interface VerificationResult {
  success: boolean;
  directories: DirectoryCheck[];
  fileOperations: {
    write: boolean;
    read: boolean;
    delete: boolean;
    error?: string;
  };
  jsonFiles: {
    path: string;
    valid: boolean;
    error?: string;
  }[];
}

class StorageVerifier {
  private requiredDirs = [
    'content/blog/en',
    'content/blog/fr',
    'content/blog/zh',
    'content/revisions',
    'logs/audit',
    'logs/webhooks',
    'logs/errors',
    'public/optimized/blog'
  ];
  
  private jsonFiles = [
    'content/categories.json',
    'content/tags.json',
    'content/media-library.json'
  ];
  
  /**
   * Verify all directories exist and are writable
   */
  async verifyDirectories(): Promise<DirectoryCheck[]> {
    const results: DirectoryCheck[] = [];
    
    for (const dir of this.requiredDirs) {
      try {
        // Check if directory exists
        await fs.access(dir);
        
        // Check if writable by attempting to create a test file
        const testFile = path.join(dir, '.write-test');
        try {
          await fs.writeFile(testFile, 'test');
          await fs.unlink(testFile);
          
          results.push({
            path: dir,
            exists: true,
            writable: true
          });
        } catch (writeError: any) {
          results.push({
            path: dir,
            exists: true,
            writable: false,
            error: `Not writable: ${writeError.message}`
          });
        }
      } catch (error) {
        results.push({
          path: dir,
          exists: false,
          writable: false,
          error: `Directory does not exist`
        });
      }
    }
    
    return results;
  }
  
  /**
   * Test basic file operations
   */
  async verifyFileOperations(): Promise<{
    write: boolean;
    read: boolean;
    delete: boolean;
    error?: string;
  }> {
    const testFile = 'content/.test-write';
    const testContent = 'test-content-' + Date.now();
    
    try {
      // Test write
      await fs.writeFile(testFile, testContent);
      
      // Test read
      const content = await fs.readFile(testFile, 'utf-8');
      if (content !== testContent) {
        throw new Error('Read content does not match written content');
      }
      
      // Test delete
      await fs.unlink(testFile);
      
      return {
        write: true,
        read: true,
        delete: true
      };
    } catch (err) {
      // Clean up test file if it exists
      try {
        await fs.unlink(testFile);
      } catch {}

      return {
        write: false,
        read: false,
        delete: false,
        error: (err as Error).message
      };
    }
  }
  
  /**
   * Verify JSON files are valid
   */
  async verifyJSONFiles(): Promise<Array<{
    path: string;
    valid: boolean;
    error?: string;
  }>> {
    const results = [];
    
    for (const file of this.jsonFiles) {
      try {
        // Check if file exists
        await fs.access(file);
        
        // Try to parse JSON
        const content = await fs.readFile(file, 'utf-8');
        JSON.parse(content);
        
        results.push({
          path: file,
          valid: true
        });
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          // File doesn't exist - this is okay, we'll create it
          results.push({
            path: file,
            valid: true,
            error: 'File does not exist (will be created on first use)'
          });
        } else {
          results.push({
            path: file,
            valid: false,
            error: `Invalid JSON: ${error.message}`
          });
        }
      }
    }
    
    return results;
  }
  
  /**
   * Create missing directories
   */
  async createMissingDirectories(checks: DirectoryCheck[]): Promise<void> {
    for (const check of checks) {
      if (!check.exists) {
        console.log(`Creating directory: ${check.path}`);
        await fs.mkdir(check.path, { recursive: true });
      }
    }
  }
  
  /**
   * Initialize missing JSON files
   */
  async initializeMissingJSONFiles(): Promise<void> {
    // Initialize categories.json
    try {
      await fs.access('content/categories.json');
    } catch {
      console.log('Creating content/categories.json');
      await fs.writeFile(
        'content/categories.json',
        JSON.stringify([], null, 2)
      );
    }
    
    // Initialize tags.json
    try {
      await fs.access('content/tags.json');
    } catch {
      console.log('Creating content/tags.json');
      await fs.writeFile(
        'content/tags.json',
        JSON.stringify([], null, 2)
      );
    }
    
    // Initialize media-library.json
    try {
      await fs.access('content/media-library.json');
    } catch {
      console.log('Creating content/media-library.json');
      await fs.writeFile(
        'content/media-library.json',
        JSON.stringify({ items: [] }, null, 2)
      );
    }
  }
  
  /**
   * Run complete verification
   */
  async verify(): Promise<VerificationResult> {
    console.log('🔍 Verifying storage configuration...\n');
    
    // Verify directories
    console.log('Checking directories...');
    const directories = await this.verifyDirectories();
    
    // Create missing directories
    const missingDirs = directories.filter(d => !d.exists);
    if (missingDirs.length > 0) {
      console.log(`\nCreating ${missingDirs.length} missing directories...`);
      await this.createMissingDirectories(missingDirs);
      
      // Re-verify after creation
      const updatedDirs = await this.verifyDirectories();
      directories.splice(0, directories.length, ...updatedDirs);
    }
    
    // Verify file operations
    console.log('\nTesting file operations...');
    const fileOperations = await this.verifyFileOperations();
    
    // Verify JSON files
    console.log('Checking JSON files...');
    const jsonFiles = await this.verifyJSONFiles();
    
    // Initialize missing JSON files
    const missingJson = jsonFiles.filter(f => f.error?.includes('does not exist'));
    if (missingJson.length > 0) {
      console.log(`\nInitializing ${missingJson.length} missing JSON files...`);
      await this.initializeMissingJSONFiles();
      
      // Re-verify after initialization
      const updatedJson = await this.verifyJSONFiles();
      jsonFiles.splice(0, jsonFiles.length, ...updatedJson);
    }
    
    const success = 
      directories.every(d => d.exists && d.writable) &&
      fileOperations.write &&
      fileOperations.read &&
      fileOperations.delete &&
      jsonFiles.every(f => f.valid);
    
    return {
      success,
      directories,
      fileOperations,
      jsonFiles
    };
  }
  
  /**
   * Print verification results
   */
  printResults(result: VerificationResult): void {
    console.log('\n' + '='.repeat(60));
    console.log('STORAGE VERIFICATION RESULTS');
    console.log('='.repeat(60) + '\n');
    
    // Directories
    console.log('📁 Directories:');
    for (const dir of result.directories) {
      const status = dir.exists && dir.writable ? '✅' : '❌';
      console.log(`  ${status} ${dir.path}`);
      if (dir.error) {
        console.log(`     Error: ${dir.error}`);
      }
    }
    
    // File Operations
    console.log('\n📝 File Operations:');
    console.log(`  ${result.fileOperations.write ? '✅' : '❌'} Write`);
    console.log(`  ${result.fileOperations.read ? '✅' : '❌'} Read`);
    console.log(`  ${result.fileOperations.delete ? '✅' : '❌'} Delete`);
    if (result.fileOperations.error) {
      console.log(`     Error: ${result.fileOperations.error}`);
    }
    
    // JSON Files
    console.log('\n📄 JSON Files:');
    for (const file of result.jsonFiles) {
      const status = file.valid ? '✅' : '❌';
      console.log(`  ${status} ${file.path}`);
      if (file.error && !file.error.includes('will be created')) {
        console.log(`     Error: ${file.error}`);
      }
    }
    
    // Overall Status
    console.log('\n' + '='.repeat(60));
    if (result.success) {
      console.log('✅ STORAGE VERIFICATION PASSED');
      console.log('All directories and file operations are working correctly.');
    } else {
      console.log('❌ STORAGE VERIFICATION FAILED');
      console.log('Please fix the errors above before deploying.');
    }
    console.log('='.repeat(60) + '\n');
  }
}

// Run verification if executed directly
if (require.main === module) {
  const verifier = new StorageVerifier();
  
  verifier.verify()
    .then(result => {
      verifier.printResults(result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Verification failed with error:');
      console.error(error);
      process.exit(1);
    });
}

export { StorageVerifier };
