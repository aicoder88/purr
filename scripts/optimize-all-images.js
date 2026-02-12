const { spawn } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'images', 'optimize-images-enhanced.js');

console.log('🚀 Launching enhanced image optimization...');
const child = spawn('node', [scriptPath], { stdio: 'inherit' });

child.on('close', (code) => {
    if (code !== 0) {
        console.error(`Otimization process exited with code ${code}`);
        process.exit(code);
    }
    console.log('✅ Optimization wrapper complete.');
});
