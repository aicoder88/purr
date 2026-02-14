import json
import os
import re
import sys

# Constants
BLOG_DIR = "content/blog/en"
PAGES_DIR = "pages/learn"
OUTPUT_FILE = ".gemini/antigravity/brain/cc36f754-052f-497b-9603-9aebb99fc983/audit_progress.json"

# Ensure output directory exists (manually fix path if needed for your env)
# For this script we'll just print if we can't write, or write to current dir
# But keeping it simple for now.

def count_words(text):
    text = re.sub('<[^<]+?>', '', text)
    return len(text.split())

def count_images(html):
    return len(re.findall(r'<img\s', html)) + len(re.findall(r'<Image\s', html))

def analyze_blog_post(filepath, filename):
    with open(filepath, 'r') as f:
        try:
            data = json.load(f)
        except:
            return None
    
    content = data.get('content', '')
    word_count = count_words(content)
    image_count = count_images(content)
    
    # Check for front-loading (rough heuristic: images in first 20% of chars)
    total_len = len(content)
    front_loaded = False
    if total_len > 0:
        first_quarter = content[:int(total_len * 0.25)]
        first_q_images = count_images(first_quarter)
        if image_count > 0 and first_q_images / image_count > 0.7:
            front_loaded = True
            
    score = 5
    issues = []
    
    if word_count < 800:
        score -= 1
        issues.append("thin_content")
    if image_count < (word_count / 400):
        score -= 1
        issues.append("sparse_images")
    if front_loaded:
        score -= 1
        issues.append("front_loaded_images")
        
    return {
        "file": filename,
        "type": "blog",
        "path": filepath,
        "metrics": {
            "word_count": word_count,
            "image_count": image_count,
            "score": score
        },
        "issues": issues,
        "status": "pending" if score < 5 else "good"
    }

def analyze_page(filepath, filename):
    with open(filepath, 'r') as f:
        content = f.read()
        
    word_count = count_words(content)
    image_count = count_images(content)
    
    score = 5
    issues = []
    
    if word_count < 500:
        score -= 1
        issues.append("thin_content")
    if image_count < (word_count / 400):
        score -= 1
        issues.append("sparse_images")
        
    return {
        "file": filename,
        "type": "page",
        "path": filepath,
        "metrics": {
            "word_count": word_count,
            "image_count": image_count,
            "score": score
        },
        "issues": issues,
        "status": "pending" if score < 5 else "good"
    }

def main():
    results = []
    
    # Audit Blogs
    for f in os.listdir(BLOG_DIR):
        if f.endswith(".json"):
            res = analyze_blog_post(os.path.join(BLOG_DIR, f), f)
            if res: results.append(res)
            
    # Audit Pages
    # Recursive walk for pages/learn
    for root, dirs, files in os.walk(PAGES_DIR):
        for f in files:
            if f.endswith(".tsx"):
                full_path = os.path.join(root, f)
                res = analyze_page(full_path, f)
                if res: results.append(res)
                
    # Sort by score (ascending)
    results.sort(key=lambda x: x['metrics']['score'])
    
    # Save to tracker
    output_path = "audit_progress.json" # Saving to CWD for easier access
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=2)
        
    print(f"Audit complete. Processed {len(results)} files.")
    print(f"Results saved to {output_path}")

if __name__ == "__main__":
    main()
