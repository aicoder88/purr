import * as fs from 'fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';

interface StorageHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    tmp: {
      status: 'ok' | 'error';
      details: {
        path: string;
        writable: boolean;
        freeSpace?: number;
      };
    };
  };
}

export async function GET(): Promise<Response> {
  try {
    const tmpDir = os.tmpdir();
    const testFile = path.join(tmpDir, `.health-check-${Date.now()}`);
    let isWritable = false;

    try {
      await fs.writeFile(testFile, 'test');
      await fs.unlink(testFile);
      isWritable = true;
    } catch (_error) {
      isWritable = false;
    }

    const response: StorageHealthCheck = {
      status: isWritable ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        tmp: {
          status: isWritable ? 'ok' : 'error',
          details: {
            path: tmpDir,
            writable: isWritable
          }
        }
      }
    };

    return Response.json(response, { status: isWritable ? 200 : 503 });
  } catch (_error) {
    return Response.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        tmp: {
          status: 'error',
          details: {
            path: '/tmp',
            writable: false
          }
        }
      }
    }, { status: 500 });
  }
}
