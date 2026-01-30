
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

print("--- Outro Audit ---\n")
for filename in files:
    try:
        with open(base_path + filename, 'r') as f:
            data = json.load(f)
            print(f"FILE: {filename}")
            
            content = data.get('content', '')
            # Try to grab the last 1000 characters
            if len(content) > 1000:
                outro_text = content[-1000:]
                print(f"OUTRO SNIPPET:\n...{outro_text}\n")
            else:
                print(f"OUTRO SNIPPET:\n{content}\n")
            print("-" * 40)
    except FileNotFoundError:
        print(f"FILE NOT FOUND: {filename}")
