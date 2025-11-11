import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs/promises';
import * as path from 'path';

interface StorageHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    directories: {
      status: 'ok' | 'error';
      details: Array<{
        path: string;
        exists: boolean;
        writable: boolean;
      }>;
    };
    fileOperations: {
      status: 'ok' | 'error';
      write: boolean;
      read: boolean;
      delete: boolean;
    };
    jsonFiles: {
      status: 'ok' | 'error';
      details: Array<{
        path: string;
        valid: boolean;
      }>;
    };
  };
}

const requiredDirs = [
  'content/blog/en',
  'content/blog/fr',
  'content/blog/zh',
  'content/revisions',
  'logs/audit',
  'logs/webhooks',
  'logs/errors',
  'public/optimized/blog'
];

const jsonFiles = [
  'content/categories.json',
  'content/tags.json',
  'content/media-library.json'
];

async function checkDirectories() {
  const details = [];
  let allOk = true;
  
  for (const dir of requiredDirs) {
    try {
      await fs.access(dir);
      
      // Test write permission
      const testFile = path.join(dir, '.health-check');
      try {
        await fs.writeFile(testFile, 'test');
        await fs.unlink(testFile);
        
        details.push({
          path: dir,
          exists: true,
          writable: true
        });
      } catch {
        details.push({
          path: dir,
          exists: true,
          writable: false
        });
        allOk = false;
      }
    } catch {
      details.push({
        path: dir,
        exists: false,
        writable: false
      });
      allOk = false;
    }
  }
  
  return {
    status: allOk ? 'ok' : 'error',
    details
  };
}

async function checkFileOperations() {
  const testFile = 'content/.health-check';
  const testContent = 'health-check-' + Date.now();
  
  try {
    // Write
    await fs.writeFile(testFile, testContent);
    
    // Read
    const content = await fs.readFile(testFile, 'utf-8');
    const readOk = content === testContent;
    
    // Delete
    await fs.unlink(testFile);
    
    return {
      status: readOk ? 'ok' : 'error',
      write: true,
      read: readOk,
      delete: true
    };
  } catch {
    // Clean up
    try {
      await fs.unlink(testFile);
    } catch {}
    
    return {
      status: 'error',
      write: false,
      read: false,
      delete: false
    };
  }
}

async function checkJSONFiles() {
  const details = [];
  let allOk = true;
  
  for (const file of jsonFiles) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      JSON.parse(content);
      
      details.push({
        path: file,
        valid: true
      });
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // File doesn't exist yet - this is okay
        details.push({
          path: file,
          valid: true
        });
      } else {
        details.push({
          path: file,
          valid: false
        });
        allOk = false;
      }
    }
  }
  
  return {
    status: allOk ? 'ok' : 'error',
    details
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StorageHealthCheck>
) {
  try {
    const [directories, fileOperations, jsonFiles] = await Promise.all([
      checkDirectories(),
      checkFileOperations(),
      checkJSONFiles()
    ]);
    
    const allHealthy = 
      directories.status === 'ok' &&
      fileOperations.status === 'ok' &&
      jsonFiles.status === 'ok';
    
    const response: StorageHealthCheck = {
      status: allHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        directories: directories as any,
        fileOperations: fileOperations as any,
        jsonFiles: jsonFiles as any
      }
    };
    
    res.status(allHealthy ? 200 : 503).json(response);
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        directories: { status: 'error', details: [] },
        fileOperations: { status: 'error', write: false, read: false, delete: false },
        jsonFiles: { status: 'error', details: [] }
      }
    });
  }
}
