// Script to identify broken internal links based on app structure
import * as fs from 'fs';
import * as path from 'path';

const APP_DIR = './app';
const CONTENT_DIR = './content/blog/en';

// List of known valid routes from app directory
function getValidRoutes(dir: string, base = ''): string[] {
  const routes: string[] = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip special directories
      if (item.startsWith('[') || item.startsWith('_') || item === 'api') {
        if (item.startsWith('[')) {
          // Dynamic route - check for static params or content
          routes.push(`${base}/${item}`);
        }
        continue;
      }
      routes.push(...getValidRoutes(fullPath, `${base}/${item}`));
    } else if (item === 'page.tsx' || item === 'page.ts') {
      routes.push(base || '/');
    }
  }
  
  return routes;
}

// List of blog posts
function getBlogPosts(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => `/blog/${f.replace('.json', '')}`);
}

console.log('=== Valid Routes from App Directory ===');
const appRoutes = getValidRoutes(APP_DIR);
appRoutes.forEach(r => console.log(r));

console.log('\n=== Blog Posts ===');
const blogPosts = getBlogPosts();
blogPosts.forEach(p => console.log(p));
