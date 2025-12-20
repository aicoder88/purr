#!/usr/bin/env ts-node

import { BlogRepairUtility } from '../src/lib/blog/blog-repair-utility';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const locale = process.argv[2] || 'en';
  const action = process.argv[3] || 'scan';
  
  console.log(`\n🔧 Blog Repair Utility\n`);
  console.log(`Locale: ${locale}`);
  console.log(`Action: ${action}\n`);
  
  const utility = new BlogRepairUtility();
  
  if (action === 'scan') {
    // Scan for issues
    const scanReport = await utility.scanAllPosts(locale);
    const report = utility.generateReport(scanReport);
    
    console.log(report);
    
    // Save report to file
    const reportPath = path.join(process.cwd(), 'reports', `blog-scan-${locale}-${Date.now()}.md`);
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, report);
    console.log(`\n📄 Report saved to: ${reportPath}`);
    
  } else if (action === 'repair') {
    // Repair all posts
    const repairReport = await utility.repairAllPosts(locale);
    const report = utility.generateRepairReport(repairReport);
    
    console.log(report);
    
    // Save report to file
    const reportPath = path.join(process.cwd(), 'reports', `blog-repair-${locale}-${Date.now()}.md`);
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, report);
    console.log(`\n📄 Report saved to: ${reportPath}`);
    
  } else if (action === 'repair-one') {
    // Repair a specific post
    const slug = process.argv[4];
    if (!slug) {
      console.error('❌ Please provide a slug: npm run repair-blog -- en repair-one <slug>');
      process.exit(1);
    }
    
    const repairResult = await utility.repairPost(slug, locale);
    
    if (repairResult.success) {
      console.log(`✅ Successfully repaired: ${slug}`);
    } else {
      console.error(`❌ Failed to repair: ${slug}`);
      console.error('Issues:', repairResult.issues);
    }
    
  } else {
    console.error(`❌ Unknown action: ${action}`);
    console.log('\nUsage:');
    console.log('  npm run repair-blog -- <locale> scan');
    console.log('  npm run repair-blog -- <locale> repair');
    console.log('  npm run repair-blog -- <locale> repair-one <slug>');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
