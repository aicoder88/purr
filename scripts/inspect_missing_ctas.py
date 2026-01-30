
import json

def inspect_missing():
    files = [
        "/Users/macmini/dev/purr/content/blog/en/safe-ways-to-deodorize-litter-box.json",
        "/Users/macmini/dev/purr/content/blog/en/why-does-my-house-smell-like-cat-litter.json"
    ]
    
    for fpath in files:
        with open(fpath, 'r') as f:
            data = json.load(f)
        
        content = data.get('content', '')
        # Check if they have the gradient box
        if "bg-gradient" in content:
            print(f"\n--- {fpath} CTA Preview ---")
            # Find index
            idx = content.find("bg-gradient")
            print(content[idx:idx+300]) # Print start of CTA
        else:
            print(f"\n--- {fpath} NO CTA FOUND ---")

if __name__ == "__main__":
    inspect_missing()
