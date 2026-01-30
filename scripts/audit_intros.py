
import json
import glob

files = [
    "activated-carbon-for-cat-litter-complete-guide.json",
    "best-cat-litter-deodorizers-2026.json",
    "how-to-neutralize-ammonia-cat-litter.json",
    "why-does-my-house-smell-like-cat-litter.json",
    "cat-litter-odour-control-tips.json",
    "best-cat-litter-for-apartments.json",
    "best-cat-litter-multiple-cats-odor-control.json",
    "apartment-litter-box-smell-solution.json",
    "safe-ways-to-deodorize-litter-box.json"
]

base_path = "/Users/macmini/dev/purr/content/blog/en/"

print("--- Intro Audit ---\n")
for filename in files:
    try:
        with open(base_path + filename, 'r') as f:
            data = json.load(f)
            print(f"FILE: {filename}")
            print(f"TITLE: {data.get('title', 'No Title')}")
            
            content = data.get('content', '')
            # Extract header and first paragraph if possible
            # Simplified: just print first 1000 chars of content to see the intro text
            # usually intro is after <h1> and <p> metadata, inside <div class="prose">
            
            # Find the first paragraph after <div class="prose ...">
            prose_start = content.find('class="prose')
            if prose_start != -1:
                intro_text = content[prose_start:prose_start+1500]
                # Clean up some HTML tags for readability in output
                print(f"INTRO SNIPPET:\n{intro_text[:500]}...\n")
            else:
                print("INTRO: Prose section not found in first check\n")
            print("-" * 40)
    except FileNotFoundError:
        print(f"FILE NOT FOUND: {filename}")
