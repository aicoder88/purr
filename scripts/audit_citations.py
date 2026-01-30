
import json
import re

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

citation_keywords = ["study", "research", "percent", "%", "found", "shown", "data", "report", "according to"]

print("--- Citation/Claim Audit ---\n")
for filename in files:
    try:
        with open(base_path + filename, 'r') as f:
            data = json.load(f)
            content = data.get('content', '')
            
            # Simple sentence tokenizer (very rough)
            sentences = re.split(r'(?<=[.!?]) +', content)
            
            flagged_claims = []
            for s in sentences:
                s_clean = s.strip()
                # Check for keywords
                if any(k in s_clean.lower() for k in citation_keywords):
                    # Check if it already has a link
                    if "<a href" not in s_clean:
                         flagged_claims.append(s_clean)
            
            if flagged_claims:
                print(f"FILE: {filename}")
                print(f"POTENTIAL CLAIMS WITHOUT LINKS ({len(flagged_claims)}):")
                for i, claim in enumerate(flagged_claims[:5]): # Show top 5
                    # clean HTML tags for display
                    clean_text = re.sub(r'<[^>]+>', '', claim)
                    print(f"  {i+1}. {clean_text[:100]}...")
                print("-" * 40)
                
    except FileNotFoundError:
        print(f"FILE NOT FOUND: {filename}")
