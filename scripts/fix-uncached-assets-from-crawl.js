#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const fg = require("fast-glob");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const DEFAULT_LOCAL_HOSTS = new Set([
  "www.purrify.ca",
  "purrify.ca",
  "localhost",
  "127.0.0.1",
]);
const ALLOWED_TYPES = new Set(["javascript", "css"]);
const SOURCE_GLOBS = ["app/**/*.{ts,tsx,js,jsx,mjs,cjs}", "src/**/*.{ts,tsx,js,jsx,mjs,cjs}", "components/**/*.{ts,tsx,js,jsx,mjs,cjs}"];

function parseArgs(argv) {
  const args = {
    csv: "",
    apply: false,
    host: "",
  };

  for (let i = 2; i < argv.length; i += 1) {
    const current = argv[i];
    if (current === "--apply") {
      args.apply = true;
      continue;
    }
    if (current.startsWith("--csv=")) {
      args.csv = current.slice("--csv=".length);
      continue;
    }
    if (current === "--csv" && argv[i + 1]) {
      args.csv = argv[i + 1];
      i += 1;
      continue;
    }
    if (current.startsWith("--host=")) {
      args.host = current.slice("--host=".length);
      continue;
    }
    if (current === "--host" && argv[i + 1]) {
      args.host = argv[i + 1];
      i += 1;
      continue;
    }
  }

  return args;
}

function csvLineToColumns(line) {
  const columns = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      columns.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  columns.push(current);
  return columns;
}

async function readCsvRows(csvPath) {
  const content = await fs.readFile(csvPath, "utf8");
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) {
    return [];
  }

  const header = csvLineToColumns(lines[0]).map((value) => value.trim().toLowerCase());
  const pageUrlIdx = header.indexOf("page url");
  const resourceUrlIdx = header.indexOf("resource url");
  const resourceTypeIdx = header.indexOf("resource type");

  if (pageUrlIdx === -1 || resourceUrlIdx === -1 || resourceTypeIdx === -1) {
    throw new Error("CSV must include columns: Page URL, Resource URL, Resource Type");
  }

  return lines.slice(1).map((line) => {
    const columns = csvLineToColumns(line);
    return {
      pageUrl: (columns[pageUrlIdx] || "").trim(),
      resourceUrl: (columns[resourceUrlIdx] || "").trim(),
      resourceType: (columns[resourceTypeIdx] || "").trim().toLowerCase(),
    };
  });
}

function pickVendorPath(resourceUrl) {
  const url = new URL(resourceUrl);
  const originalName = path.posix.basename(url.pathname) || "asset";
  const extFromName = path.extname(originalName);
  const extFromPath = extFromName || (url.pathname.includes(".css") ? ".css" : ".js");
  const base = originalName.replace(extFromName, "");
  const hash = crypto.createHash("sha1").update(resourceUrl).digest("hex").slice(0, 10);
  const filename = `${base}.${hash}${extFromPath}`;
  const localPublicPath = path.posix.join("/vendor", url.hostname, filename);
  const localFilePath = path.join(PROJECT_ROOT, "public", "vendor", url.hostname, filename);
  return { localPublicPath, localFilePath };
}

async function ensureDownloaded(resourceUrl, localFilePath, dryRun) {
  if (!dryRun) {
    await fs.mkdir(path.dirname(localFilePath), { recursive: true });
  }

  if (dryRun) {
    return { created: true, bytes: 0 };
  }

  const existing = await fs.readFile(localFilePath).catch(() => null);
  if (existing) {
    return { created: false, bytes: existing.byteLength };
  }

  const response = await fetch(resourceUrl, {
    headers: { "User-Agent": "purrify-cache-fix-script/1.0" },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${resourceUrl}: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(localFilePath, buffer);
  return { created: true, bytes: buffer.byteLength };
}

async function rewriteSourceFiles(replacements, dryRun) {
  const files = await fg(SOURCE_GLOBS, {
    cwd: PROJECT_ROOT,
    absolute: true,
    dot: false,
  });

  const touched = [];

  for (const file of files) {
    const original = await fs.readFile(file, "utf8");
    let updated = original;
    let fileChanged = false;

    for (const [externalUrl, localUrl] of replacements.entries()) {
      if (updated.includes(externalUrl)) {
        updated = updated.split(externalUrl).join(localUrl);
        fileChanged = true;
      }
    }

    if (!fileChanged) {
      continue;
    }

    touched.push(path.relative(PROJECT_ROOT, file));
    if (!dryRun) {
      await fs.writeFile(file, updated);
    }
  }

  return touched;
}

function toAbsolutePath(value) {
  if (!value) {
    return "";
  }
  if (path.isAbsolute(value)) {
    return value;
  }
  return path.resolve(PROJECT_ROOT, value);
}

async function main() {
  const args = parseArgs(process.argv);
  const csvPath = toAbsolutePath(args.csv);
  const dryRun = !args.apply;

  if (!csvPath) {
    throw new Error("Missing --csv path. Example: --csv ../purrify.ca_uncached_javascript_and_css_files_20260221.csv");
  }

  const rows = await readCsvRows(csvPath);
  if (rows.length === 0) {
    throw new Error("CSV has no issue rows.");
  }

  const hostSet = new Set(DEFAULT_LOCAL_HOSTS);
  if (args.host) {
    hostSet.add(args.host.toLowerCase());
  }

  const uniqueResourceUrls = new Set();
  for (const row of rows) {
    if (!ALLOWED_TYPES.has(row.resourceType)) {
      continue;
    }
    let url;
    try {
      url = new URL(row.resourceUrl);
    } catch {
      continue;
    }
    if (hostSet.has(url.hostname.toLowerCase())) {
      continue;
    }
    uniqueResourceUrls.add(row.resourceUrl);
  }

  if (uniqueResourceUrls.size === 0) {
    console.log("No third-party JavaScript/CSS resources found in CSV.");
    return;
  }

  const replacements = new Map();
  const downloaded = [];

  for (const resourceUrl of uniqueResourceUrls) {
    const { localPublicPath, localFilePath } = pickVendorPath(resourceUrl);
    const result = await ensureDownloaded(resourceUrl, localFilePath, dryRun);
    replacements.set(resourceUrl, localPublicPath);
    downloaded.push({
      resourceUrl,
      localPublicPath,
      localFilePath: path.relative(PROJECT_ROOT, localFilePath),
      created: result.created,
      bytes: result.bytes,
    });
  }

  const changedFiles = await rewriteSourceFiles(replacements, dryRun);

  console.log(`Mode: ${dryRun ? "DRY RUN" : "APPLY"}`);
  console.log(`CSV: ${csvPath}`);
  console.log(`Unique third-party JS/CSS assets: ${uniqueResourceUrls.size}`);
  console.log("");
  console.log("Asset mapping:");
  for (const item of downloaded) {
    const status = item.created ? "prepared" : "existing";
    console.log(`- ${item.resourceUrl}`);
    console.log(`  -> ${item.localPublicPath} (${status}${item.bytes ? `, ${item.bytes} bytes` : ""})`);
  }
  console.log("");
  if (changedFiles.length === 0) {
    console.log("No source files referenced these URLs as literals.");
  } else {
    console.log("Source files to update:");
    for (const file of changedFiles) {
      console.log(`- ${file}`);
    }
  }
  console.log("");
  if (dryRun) {
    console.log("No files were modified. Re-run with --apply to write files.");
  } else {
    console.log("Files updated. Next step: run lint/tests and deploy so CDN can cache /vendor/* assets.");
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
