

import re
import json
import glob
import os

def strip_tags(text):
    return re.sub(r'<[^>]+>', ' ', text)

def count_words(text):
    text = re.sub(r'\s+', ' ', text).strip()
    if not text:
        return 0
    return len(text.split())

def get_tsx_word_count(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Remove imports and metadata (roughly)
        content = re.sub(r'import .*?;', '', content, flags=re.DOTALL)
        content = re.sub(r'<Head>.*?</Head>', '', content, flags=re.DOTALL)
        content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
        
        # Strip tags to leave text
        text_content = re.sub(r'<[^>]*>', ' ', content)
        
        # Simple stop-words for code syntax vs content might be hard
        # But simply splitting by whitespace gives a rough "visible + code" count.
        # To better approximate "content", we can look for longer strings or specific text patterns.
        # But for 'discrepancy' checks, a simple comparison of magnitude is often enough.
        # Let's try to be slightly smarter: remove common JS keywords?
        # No, let's stick to the previous logic which seemed to give ~371 words for the file.
        
        words = text_content.split()
        # Filter out obvious code-like tokens
        clean_words = [w for w in words if not w.startswith('{') and len(w) > 1 and not re.match(r'^[a-zA-Z]+=$', w)]
        
        return len(clean_words)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return 0

def get_json_word_count(file_path):
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        content = data.get('content', '')
        if not content:
            return 0
        
        text = strip_tags(content)
        return count_words(text)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return 0

def clean_slug(filename):
    return os.path.basename(filename).replace('.tsx', '').replace('.json', '')

def main():
    root_dir = '/Users/macmini/dev/purr'
    
    # 1. content/blog/en/*.json
    blog_content_files = glob.glob(os.path.join(root_dir, 'content/blog/en/*.json'))
    blog_content_map = {clean_slug(f): f for f in blog_content_files}
    
    # 2. pages/blog/*.tsx (Hardcoded overrides)
    # We ignore [slug].tsx and index.tsx
    blog_page_files = glob.glob(os.path.join(root_dir, 'pages/blog/*.tsx'))
    
    print(f"{'SLUG':<40} | {'TSX WORDS':<10} | {'JSON WORDS':<10} | {'DIFF':<10}")
    print("-" * 80)
    
    discrepancies = []

    for page_path in blog_page_files:
        slug = clean_slug(page_path)
        if slug in ['[slug]', 'index']:
            continue
            
        json_path = blog_content_map.get(slug)
        
        tsx_count = get_tsx_word_count(page_path)
        
        if json_path:
            json_count = get_json_word_count(json_path)
            diff = abs(tsx_count - json_count)
            
            # Highlight if difference is significant (e.g. > 20%)
            # or if one is very small compared to the other
            print(f"{slug:<40} | {tsx_count:<10} | {json_count:<10} | {diff:<10}")
            
            if diff > 100: # Arbitrary threshold for "significant discrepancy"
                 discrepancies.append((slug, tsx_count, json_count))
        else:
            # Page exists but no JSON? Or JSON exists but no Page?
            # User asked for 'discrepancy' - implies collision.
            print(f"{slug:<40} | {tsx_count:<10} | {'N/A':<10} | {'N/A':<10}")

    print("\n\nAnalyzed hardcoded pages against JSON content.")

if __name__ == "__main__":
    main()
