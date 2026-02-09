# Blog Post Translation Prompt

## For AI Translation (Claude/ChatGPT)

Use this exact prompt for translating blog posts:

---

```
You are a professional translator specializing in pet care content. Translate this blog post from English to [TARGET_LANGUAGE: French/Chinese/Spanish].

## CRITICAL RULES - DO NOT VIOLATE:

1. **PRESERVE HTML EXACTLY**: Keep ALL HTML tags, classes, attributes, and structure identical. Only change the text content between tags.

2. **KEEP IMAGE URLS IDENTICAL**: All image `src` attributes must remain EXACTLY as they are in English. Only translate `alt` text and captions.

3. **MAINTAIN JSON STRUCTURE**: Keep all JSON keys, field names, and data types exactly the same.

4. **TRANSLATE THESE FIELDS**:
   - `title` - Translate to natural [TARGET_LANGUAGE]
   - `excerpt` - Translate to natural [TARGET_LANGUAGE]
   - `content` - Translate all text, keep HTML structure
   - `featuredImage.alt` - Translate the alt text
   - `seo.title` - Translate
   - `seo.description` - Translate
   - `seo.keywords` - Translate each keyword
   - `author.name` - Can keep "Purrify Team" or translate if appropriate

5. **DO NOT TRANSLATE**:
   - `slug` - Keep in English (used for URLs)
   - `id` - Keep as-is
   - `publishDate` - Keep as-is
   - `modifiedDate` - Keep as-is
   - `status` - Keep as-is
   - `featuredImage.url` - Keep identical
   - `seo.ogImage` - Keep identical
   - `categories` - Keep as-is (English tags)
   - `tags` - Keep as-is (English tags)
   - `locale` - Set to [TARGET_LOCALE_CODE: fr/zh/es]

6. **CONTENT QUALITY**:
   - Use natural, fluent [TARGET_LANGUAGE]
   - Maintain the same tone (friendly, informative, expert)
   - Keep all headings, paragraphs, lists intact
   - Preserve all links and formatting

## SOURCE JSON:

[PASTE THE ENGLISH JSON FILE CONTENT HERE]

## OUTPUT FORMAT:

Return ONLY the translated JSON object. No explanation, no markdown code blocks, no additional text. Just valid JSON that can be directly saved to a file.
```

---

## How to Use This Prompt

### Step 1: Get Source Content
```bash
# Copy the English content
cat content/blog/en/POST-SLUG.json | pbcopy
```

### Step 2: Customize Prompt
Replace:
- `[TARGET_LANGUAGE]` → French / Chinese / Spanish
- `[TARGET_LOCALE_CODE]` → fr / zh / es
- `[PASTE THE ENGLISH JSON FILE CONTENT HERE]` → The actual JSON content

### Step 3: Run Translation
Paste the complete prompt into Claude, ChatGPT, or your preferred AI.

### Step 4: Save Output
```bash
# Save the AI's response to the correct location
# Example for Chinese:
echo 'PASTE_AI_RESPONSE_HERE' > content/blog/zh/POST-SLUG.json
```

### Step 5: Validate
```bash
# Check JSON is valid
node -e "JSON.parse(require('fs').readFileSync('content/blog/zh/POST-SLUG.json'))"

# Run validation
node scripts/validate-blog-posts.js
```

---

## Batch Processing Template

For processing multiple posts at once:

```
Translate these 5 blog posts from English to Chinese. Apply the same rules as above to each.

POST 1:
[PASTE JSON]

POST 2:
[PASTE JSON]

POST 3:
[PASTE JSON]

POST 4:
[PASTE JSON]

POST 5:
[PASTE JSON]

Return 5 separate JSON objects, clearly labeled with the slug for each.
```

---

## Example Output Structure (Chinese)

```json
{
  "id": "1731182400000",
  "slug": "how-to-eliminate-cat-litter-odor",
  "title": "如何消除猫砂异味：完整指南",
  "excerpt": "探索经过验证的方法，使用天然猫砂除臭解决方案保持家居清新无异味。",
  "content": "<div class=\"max-w-4xl mx-auto\">...translated HTML content...</div>",
  "author": {
    "name": "Purrify团队",
    "avatar": "/optimized/team-avatar.png"
  },
  "publishDate": "2024-11-09T12:00:00.000Z",
  "modifiedDate": "2025-12-18T03:00:00.000Z",
  "status": "published",
  "featuredImage": {
    "url": "/optimized/fresh-home-hero-ghibli.webp",
    "alt": "快乐的猫咪在清新干净的家居环境中",
    "width": 1200,
    "height": 630
  },
  "categories": ["tips", "odor-control"],
  "tags": ["cat-litter", "odor-elimination", "activated-carbon"],
  "locale": "zh",
  "seo": {
    "title": "如何中和猫砂中的氨味（完整指南）",
    "description": "什么能中和猫砂中的氨？探索经过验证的方法...",
    "keywords": ["如何中和猫砂中的氨味", "什么能中和氨"],
    "ogImage": "/optimized/fresh-home-hero-ghibli.webp"
  }
}
```

Notice: `slug`, image URLs, categories, tags remain English; only text content is translated.
