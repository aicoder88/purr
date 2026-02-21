#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const write = process.argv.includes('--write');
const root = process.cwd();

const patchJobs = [
  {
    file: 'src/components/admin/MediaLibrary.tsx',
    ensureImport: "import Image from 'next/image';",
    importAfter: "import { toast } from 'sonner';\n",
    find: /<img\s+src=\{item\.url\}\s+alt=\{item\.alt \|\| item\.filename\}\s+className="w-full h-full object-cover"\s*\/>/g,
    replace: `<Image
                      src={item.url}
                      alt={item.alt || item.filename}
                      fill
                      sizes="(max-width: 1024px) 33vw, 20vw"
                      className="w-full h-full object-cover"
                    />`,
  },
  {
    file: 'src/components/seo/HowToSection.tsx',
    ensureImport: "import Image from 'next/image';",
    importAfter: "import { useMemo } from 'react';\n",
    find: /<img\s+src=\{step\.image\}\s+alt=\{`Step \$\{index \+ 1\}: \$\{step\.name\}`\}\s+className="rounded-lg max-w-full h-auto"\s+loading="lazy"\s*\/>/g,
    replace: `<Image
                      src={step.image}
                      alt={\`Step \${index + 1}: \${step.name}\`}
                      width={1200}
                      height={675}
                      className="rounded-lg max-w-full h-auto"
                    />`,
  },
  {
    file: 'src/components/video/VideoPlayer.tsx',
    ensureImport: "import Image from 'next/image';",
    importAfter: "import { cn } from '@/lib/utils';\n",
    find: /<img\s+src=\{video\.poster\}\s+alt=\{video\.title\}\s+className="w-16 h-12 object-cover rounded flex-shrink-0"\s*\/>/g,
    replace: `<div className="relative w-16 h-12 flex-shrink-0">
                  <Image
                    src={video.poster}
                    alt={video.title}
                    fill
                    sizes="64px"
                    className="object-cover rounded"
                  />
                </div>`,
  },
];

let changedFiles = 0;

for (const job of patchJobs) {
  const fullPath = path.join(root, job.file);
  if (!fs.existsSync(fullPath)) {
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;

  if (!content.includes(job.ensureImport) && content.includes(job.importAfter)) {
    content = content.replace(job.importAfter, `${job.importAfter}${job.ensureImport}\n`);
  }

  content = content.replace(job.find, job.replace);

  if (content !== original) {
    changedFiles += 1;
    if (write) {
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

console.log(`[fix-no-img-element] mode=${write ? 'write' : 'dry-run'}`);
console.log(`[fix-no-img-element] changed files: ${changedFiles}`);
