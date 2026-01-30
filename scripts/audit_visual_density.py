
import json
import os
import re

def audit_visual_density():
    files = [
        "content/blog/en/activated-carbon-for-cat-litter-complete-guide.json",
        "content/blog/en/best-cat-litter-deodorizers-2026.json",
        "content/blog/en/how-to-neutralize-ammonia-cat-litter.json",
        "content/blog/en/why-does-my-house-smell-like-cat-litter.json",
        "content/blog/en/cat-litter-odour-control-tips.json",
        "content/blog/en/best-cat-litter-for-apartments.json",
        "content/blog/en/best-cat-litter-multiple-cats-odor-control.json",
        "content/blog/en/apartment-litter-box-smell-solution.json",
        "content/blog/en/safe-ways-to-deodorize-litter-box.json",
        "pages/blog/cat-litter-smell-worse-winter.tsx",
        "pages/blog/cat-litter-smell-worse-summer.tsx"
    ]
    
    report = []
    
    for f in files:
        fpath = os.path.join("/Users/macmini/dev/purr", f)
        if not os.path.exists(fpath):
            report.append(f"MISSING: {f}")
            continue
            
        with open(fpath, "r") as file:
            content = file.read()
            
        # Count words (rough estimate)
        word_count = len(re.findall(r'\w+', content))
        
        # Count images
        img_tags = len(re.findall(r'<img|<Image', content))
        
        # Ratio
        ratio = word_count / (img_tags if img_tags > 0 else 1)
        
        report.append({
            "file": f,
            "words": word_count,
            "images": img_tags,
            "ratio": round(ratio, 0)
        })
        
    print(json.dumps(report, indent=2))

if __name__ == "__main__":
    audit_visual_density()
