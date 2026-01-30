import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

// Interface for the blog post JSON structure
interface BlogPost {
    slug: string;
    title: string;
    content: string;
    faq?: Array<{ question: string; answerHtml: string }>;
    citations?: Array<{ text: string; url: string }>;
    [key: string]: any;
}

const CONTENT_DIR = path.join(process.cwd(), 'content/blog/en');

async function migrateBlogPosts() {
    console.log('🚀 Starting AI Citation Schema Migration...');

    // Find all JSON files in the content directory
    const files = await glob('*.json', { cwd: CONTENT_DIR });
    console.log(`Found ${files.length} blog posts to process.`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
        const filePath = path.join(CONTENT_DIR, file);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const p: BlogPost = JSON.parse(content);
            let isModified = false;

            // 1. Extract FAQs if not present
            if (!p.faq || p.faq.length === 0) {
                const extractedFaqs = extractFaqsFromContent(p.content);
                if (extractedFaqs.length > 0) {
                    p.faq = extractedFaqs;
                    console.log(`✅ Extracted ${extractedFaqs.length} FAQs for: ${p.slug}`);
                    isModified = true;
                }
            } else {
                console.log(`ℹ️ FAQs already exist for: ${p.slug}`);
            }

            // 2. Add empty citations field if missing
            if (!p.citations) {
                // We add it as undefined or empty array? 
                // Let's add it as undefined (not present in JSON) is fine, 
                // but if we want to encourage usage, maybe we don't force it.
                // Actually, let's NOT blindly add empty array to avoid clutter.
                // p.citations = []; 
                // isModified = true;
            }

            if (isModified) {
                fs.writeFileSync(filePath, JSON.stringify(p, null, 2));
                updatedCount++;
            } else {
                skippedCount++;
            }

        } catch (err) {
            console.error(`❌ Error processing ${file}:`, err);
        }
    }

    console.log(`\nMigration Complete!`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Skipped: ${skippedCount}`);
}

/**
 * Heuristic to extract FAQs from HTML content
 * Looks for H3/H2 "Frequently Asked Questions" followed by Question/Answer blocks
 */
function extractFaqsFromContent(html: string): Array<{ question: string; answerHtml: string }> {
    const faqs: Array<{ question: string; answerHtml: string }> = [];

    // Simple heuristic: 
    // 1. Find the "Frequently Asked Questions" header
    // 2. Look for patterns like <h3...>Question?</h3><p...>Answer</p>
    // This is a naive implementation using regex. A DOM parser would be better but cheerio add dep.
    // We'll stick to regex for simplicity as the structure is likely consistent.

    // Check if FAQ section exists
    if (!html.includes('Frequently Asked Questions') && !html.includes('FAQ')) {
        return [];
    }

    // Regex to find the Start of FAQ section
    // It usually starts with <h2 ...>Frequently Asked Questions</h2>
    const faqSectionRegex = /<section[^>]*>[\s\S]*?<h2[^>]*>.*?Frequently Asked Questions.*?<\/h2>([\s\S]*?)<\/section>/i;
    const match = html.match(faqSectionRegex);

    if (!match || !match[1]) {
        // Try to find just the H2 and everything after it if section is not closed nicely or is huge
        // But let's assume section wrapper is common in this codebase based on previous files
        return [];
    }

    const faqContent = match[1];

    // Pattern: <div ...><h3 ...>Question</h3><p...>Answer</p></div>
    // OR just <h3 ...>Question</h3><p...>Answer</p>

    // Let's look for h3/p pairs
    const qnaRegex = /<h3[^>]*>(.*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;

    let qnaMatch;
    while ((qnaMatch = qnaRegex.exec(faqContent)) !== null) {
        const question = qnaMatch[1].replace(/<[^>]+>/g, '').trim(); // Strip tags from question
        const answerHtml = qnaMatch[2].trim(); // Keep tags in answer

        // Clean up answer if needed (remove wrapper divs if captured?)
        // The regex captures content inside <p>...</p>, so it should be cleanish.

        if (question && answerHtml) {
            faqs.push({ question, answerHtml });
        }
    }

    return faqs;
}

migrateBlogPosts();
