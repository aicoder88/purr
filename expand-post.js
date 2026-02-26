const fs = require('fs');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config({ path: '.env.local' });

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

async function run() {
    const filePath = './content/blog/en/fresh-step-vs-arm-hammer-comparison.json';
    const post = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const prompt = `
You are an expert SEO copywriter and feline behavioral specialist. Your task is to rewrite and significantly expand the following blog post about "Fresh Step vs Arm & Hammer Cat Litter".

GOALS:
1. Target keywords heavily: "fresh step vs arm and hammer", "fresh step vs arm and hammer cat litter", "arm and hammer vs fresh step", "best cat litter fresh step or arm and hammer", "fresh step outstretch vs arm and hammer clump and seal", "best cat litter for odor control".
2. Make the article at least 3000 words long. It should be comprehensive, actionable, and formatted in beautiful HTML to be injected directly into the blog.
3. Don't use markdown to wrap the HTML. Only output raw valid JSON. The JSON should match this exact structure:
{
  "content": "<div class=\\"max-w-4xl mx-auto\\">...</div>",
  "seo": {
    "title": "...",
    "description": "...",
    "keywords": ["..."]
  },
  "faq": [
    { "question": "...", "answerHtml": "..." }
  ],
  "excerpt": "...",
  "readingTime": 15
}
4. For the HTML content, maintain the existing Tailwind CSS classes, styling, and tone. Expand upon the scientific reasons why activated carbon works better than baking soda. Include sections on specific product lines (like Fresh Step Outstretch vs Arm & Hammer Clump & Seal). Make it highly engaging with blockquotes, styled checklists, and data tables comparing the two. Do not include markdown \`\`\`json blocks in the response, just the raw JSON text.

Here is the current post data:
Title: ${post.title}
Current Content HTML:
${post.content}
Current FAQ:
${JSON.stringify(post.faq, null, 2)}
`;

    try {
        const response = await anthropic.messages.create({
            model: process.env.BLOG_ANTHROPIC_MODEL || "claude-3-5-sonnet-20241022",
            max_tokens: 8000,
            temperature: 0.7,
            system: "Output only raw, valid JSON. No markdown wrappers.",
            messages: [
                { role: "user", content: prompt }
            ]
        });

        let jsonStr = response.content[0].text.trim();
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.replace(/```json\\n?/g, '').replace(/```\\n?/g, '');
        }

        const expanded = JSON.parse(jsonStr);

        post.content = expanded.content;
        post.seo.title = expanded.seo.title;
        post.seo.description = expanded.seo.description;
        post.seo.keywords = expanded.seo.keywords;
        post.faq = expanded.faq;
        post.excerpt = expanded.excerpt;
        post.readingTime = expanded.readingTime;

        fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf-8');
        console.log('Successfully expanded the blog post!');
    } catch (err) {
        console.error('Error:', err);
    }
}

run();
