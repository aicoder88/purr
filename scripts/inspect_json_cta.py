
import json

def inspect():
    filepath = "/Users/macmini/dev/purr/content/blog/en/best-cat-litter-deodorizers-2026.json"
    with open(filepath, 'r') as f:
        data = json.load(f)
    content = data.get('content', '')
    
    # Print the last 1000 characters where CTA usually is
    print(content[-1500:])

if __name__ == "__main__":
    inspect()
