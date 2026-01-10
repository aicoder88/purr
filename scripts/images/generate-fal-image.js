#!/usr/bin/env node
/**
 * Generate images using fal.ai Flux Pro API
 *
 * Usage:
 *   node scripts/images/generate-fal-image.js --prompt "A fluffy cat..." --output "public/optimized/blog/my-image.webp"
 *   node scripts/images/generate-fal-image.js --prompt "A fluffy cat..." --output "my-image.webp" --dir "public/optimized/blog"
 *   node scripts/images/generate-fal-image.js --batch prompts.json  # Generate multiple images from JSON file
 *
 * Options:
 *   --prompt, -p     Image generation prompt
 *   --output, -o     Output filename (with path or just filename)
 *   --dir, -d        Output directory (default: public/optimized/blog)
 *   --batch, -b      JSON file with array of {prompt, output} objects
 *   --model, -m      fal.ai model (default: fal-ai/flux-pro/v1.1)
 *   --size, -s       Image size WxH (default: 1024x1024)
 *   --dry-run        Show what would be generated without making API calls
 *   --help, -h       Show help
 *
 * Environment:
 *   FAL_KEY          Your fal.ai API key (required)
 */

require('dotenv').config();
const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');

const FAL_KEY = process.env.FAL_KEY;
const DEFAULT_DIR = path.join(process.cwd(), 'public/optimized/blog');
const DEFAULT_MODEL = 'fal-ai/flux-pro/v1.1';
const DEFAULT_SIZE = '1024x1024';

// Parse command line arguments
function parseArgs(args) {
  const result = {
    prompt: null,
    output: null,
    dir: DEFAULT_DIR,
    batch: null,
    model: DEFAULT_MODEL,
    size: DEFAULT_SIZE,
    dryRun: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];

    switch (arg) {
      case '--prompt':
      case '-p':
        result.prompt = next;
        i++;
        break;
      case '--output':
      case '-o':
        result.output = next;
        i++;
        break;
      case '--dir':
      case '-d':
        result.dir = path.resolve(next);
        i++;
        break;
      case '--batch':
      case '-b':
        result.batch = next;
        i++;
        break;
      case '--model':
      case '-m':
        result.model = next;
        i++;
        break;
      case '--size':
      case '-s':
        result.size = next;
        i++;
        break;
      case '--dry-run':
        result.dryRun = true;
        break;
      case '--help':
      case '-h':
        result.help = true;
        break;
    }
  }

  return result;
}

function showHelp() {
  console.log(`
fal.ai Image Generator for Blog Posts

Usage:
  node scripts/images/generate-fal-image.js --prompt "A fluffy orange cat..." --output "cat-image.webp"
  node scripts/images/generate-fal-image.js --batch prompts.json

Options:
  --prompt, -p     Image generation prompt (required for single image)
  --output, -o     Output filename (required for single image)
  --dir, -d        Output directory (default: public/optimized/blog)
  --batch, -b      JSON file with array of {prompt, output} objects
  --model, -m      fal.ai model (default: fal-ai/flux-pro/v1.1)
  --size, -s       Image size WxH (default: 1024x1024)
  --dry-run        Show what would be generated without making API calls
  --help, -h       Show this help

Batch file format (prompts.json):
  [
    { "prompt": "A fluffy cat in a clean home", "output": "fluffy-cat.webp" },
    { "prompt": "Activated carbon absorbing odors", "output": "carbon-science.webp" }
  ]

Environment:
  FAL_KEY          Your fal.ai API key (required, set in .env)

Models:
  fal-ai/flux-pro/v1.1       Default, high quality
  fal-ai/flux/dev            Faster, good quality
  fal-ai/flux-lora           LoRA customization
  fal-ai/stable-diffusion-v3 Alternative

Examples:
  # Generate a single blog hero image
  node scripts/images/generate-fal-image.js \\
    --prompt "A happy cat next to fresh litter box, cozy home interior, warm lighting, photorealistic" \\
    --output "happy-cat-fresh-litter.webp"

  # Generate multiple images from a batch file
  node scripts/images/generate-fal-image.js --batch my-prompts.json

  # Use a different model
  node scripts/images/generate-fal-image.js \\
    --prompt "Abstract visualization of activated carbon molecules" \\
    --output "carbon-molecules.webp" \\
    --model "fal-ai/flux/dev"
`);
}

async function generateImage(prompt, model, size) {
  const [width, height] = size.split('x').map(Number);

  const payload = JSON.stringify({
    prompt,
    image_size: { width, height },
    num_inference_steps: 28,
    guidance_scale: 3.5,
    num_images: 1,
    enable_safety_checker: true,
    output_format: 'jpeg',
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'fal.run',
        path: `/${model}`,
        method: 'POST',
        headers: {
          'Authorization': `Key ${FAL_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`fal.ai API error ${res.statusCode}: ${data}`));
            return;
          }
          try {
            const json = JSON.parse(data);
            if (json.images && json.images[0]) {
              resolve(json.images[0].url);
            } else {
              reject(new Error(`Unexpected response format: ${data}`));
            }
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');

    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Handle redirects
        downloadImage(res.headers.location, outputPath).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode}`));
        return;
      }

      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const file = fs.createWriteStream(outputPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
      file.on('error', (err) => {
        fs.unlink(outputPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function processOne(prompt, outputPath, model, size, dryRun) {
  const displayPath = path.relative(process.cwd(), outputPath);

  if (dryRun) {
    console.log(`[DRY-RUN] Would generate: ${displayPath}`);
    console.log(`  Prompt: ${prompt.slice(0, 80)}${prompt.length > 80 ? '...' : ''}`);
    console.log(`  Model: ${model}`);
    console.log(`  Size: ${size}`);
    return { success: true, path: displayPath, dryRun: true };
  }

  console.log(`Generating: ${displayPath}`);
  console.log(`  Prompt: ${prompt.slice(0, 80)}${prompt.length > 80 ? '...' : ''}`);

  try {
    const imageUrl = await generateImage(prompt, model, size);
    console.log(`  Generated URL: ${imageUrl}`);

    await downloadImage(imageUrl, outputPath);
    console.log(`  ✓ Saved to: ${displayPath}`);

    return { success: true, path: displayPath, url: imageUrl };
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return { success: false, path: displayPath, error: error.message };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    showHelp();
    process.exit(0);
  }

  if (!FAL_KEY) {
    console.error('Error: FAL_KEY environment variable is required');
    console.error('Set it in your .env file or export it in your shell');
    process.exit(1);
  }

  const jobs = [];

  if (args.batch) {
    // Load batch file
    const batchPath = path.resolve(args.batch);
    if (!fs.existsSync(batchPath)) {
      console.error(`Error: Batch file not found: ${batchPath}`);
      process.exit(1);
    }
    const batchData = JSON.parse(fs.readFileSync(batchPath, 'utf-8'));
    if (!Array.isArray(batchData)) {
      console.error('Error: Batch file must contain a JSON array');
      process.exit(1);
    }
    for (const item of batchData) {
      if (!item.prompt || !item.output) {
        console.error('Error: Each batch item must have "prompt" and "output" properties');
        process.exit(1);
      }
      const outputPath = item.output.includes(path.sep) || item.output.startsWith('/')
        ? path.resolve(item.output)
        : path.join(args.dir, item.output);
      jobs.push({ prompt: item.prompt, output: outputPath });
    }
  } else if (args.prompt && args.output) {
    const outputPath = args.output.includes(path.sep) || args.output.startsWith('/')
      ? path.resolve(args.output)
      : path.join(args.dir, args.output);
    jobs.push({ prompt: args.prompt, output: outputPath });
  } else {
    console.error('Error: Either --prompt and --output, or --batch is required');
    showHelp();
    process.exit(1);
  }

  console.log(`\nfal.ai Image Generator`);
  console.log(`Model: ${args.model}`);
  console.log(`Size: ${args.size}`);
  console.log(`Jobs: ${jobs.length}`);
  if (args.dryRun) {
    console.log(`Mode: DRY-RUN (no API calls)`);
  }
  console.log('');

  const results = [];
  for (const job of jobs) {
    const result = await processOne(job.prompt, job.output, args.model, args.size, args.dryRun);
    results.push(result);
  }

  console.log('\n--- Summary ---');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  console.log(`Total: ${results.length}`);
  console.log(`Successful: ${successful.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length) {
    console.log('\nFailed jobs:');
    for (const f of failed) {
      console.log(`  - ${f.path}: ${f.error}`);
    }
    process.exit(1);
  }

  // Output JSON for easy parsing by Claude Code
  console.log('\n--- Generated Files ---');
  console.log(JSON.stringify(successful.map(s => s.path), null, 2));
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
