const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting i18n build test...');

try {
  // Run a production build
  console.log('📦 Running production build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if the French version of the free page was generated
  const frFreePath = path.join(__dirname, '../.next/server/pages/fr/free.html');
  const enFreePath = path.join(__dirname, '../.next/server/pages/free.html');
  
  console.log(`Checking for French free page at: ${frFreePath}`);
  console.log(`Checking for English free page at: ${enFreePath}`);
  
  if (fs.existsSync(frFreePath)) {
    console.log('✅ French free page was successfully generated!');
  } else {
    console.log('❌ French free page was NOT generated.');
  }
  
  if (fs.existsSync(enFreePath)) {
    console.log('✅ English free page was successfully generated!');
  } else {
    console.log('❌ English free page was NOT generated.');
  }
  
  // Check the export directory structure
  const exportDir = path.join(__dirname, '../.next/export');
  if (fs.existsSync(exportDir)) {
    console.log('✅ Export directory exists');
    
    // Check for fr directory in export
    const frExportDir = path.join(exportDir, 'fr');
    if (fs.existsSync(frExportDir)) {
      console.log('✅ French export directory exists');
      
      // List files in the French export directory
      const frFiles = fs.readdirSync(frExportDir);
      console.log('📄 Files in French export directory:');
      frFiles.forEach(file => {
        console.log(`  - ${file}`);
      });
    } else {
      console.log('❌ French export directory does not exist');
    }
  } else {
    console.log('❌ Export directory does not exist');
  }
  
  console.log('🎉 i18n build test completed!');
} catch (error) {
  console.error('❌ Error during i18n build test:', error);
}