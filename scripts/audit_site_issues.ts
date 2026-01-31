import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog/en');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

interface BlogPost {
    slug: string;
    title: string;
    content: string;
    featuredImage?: { url: string };
    seo?: { ogImage?: string };
}

async function audit() {
    const files = await glob(path.join(CONTENT_DIR, '*.json'));
    console.log(`Found ${files.length} blog posts.`);

    const issues: any[] = [];

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        let json: BlogPost;
        try {
            json = JSON.parse(content);
        } catch (e) {
            console.error(`Failed to parse ${file}`);
            continue;
        }

        const report: any = {
            file: path.basename(file),
            slug: json.slug,
            issues: []
        };

        // 1. Check Slug vs Filename consistency (optional but good practice)
        // The filename might be 'how-to-get-rid-...,json' but slug is different
        // We just log the slug for now to cross reference.

        // 2. Check Images
        const checkImage = (url: string, context: string) => {
            if (!url) return;
            if (url.startsWith('http')) return; // External
            const localPath = path.join(PUBLIC_DIR, url.replace(/^\//, ''));
            if (!fs.existsSync(localPath)) {
                report.issues.push(`[${context}] Missing image: ${url}`);
            }
        };

        if (json.featuredImage?.url) checkImage(json.featuredImage.url, 'FeaturedImage');
        if (json.seo?.ogImage) checkImage(json.seo.ogImage, 'OgImage');

        // Check content images
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        let match;
        while ((match = imgRegex.exec(json.content)) !== null) {
            checkImage(match[1], 'ContentImage');
        }

        if (report.issues.length > 0) {
            issues.push(report);
        }
    }

    console.log(JSON.stringify(issues, null, 2));
}

audit();
