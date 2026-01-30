
import json
import os

def update_file_content(filepath, replacements):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        content = data['content']
        modified = False
        
        for target, replacement in replacements:
            if target in content:
                content = content.replace(target, replacement)
                modified = True
            else:
                # Fallback check
                print(f"WARNING: Target not found in {filepath}: {target[:50]}...")
                
        if modified:
            data['content'] = content
            with open(filepath, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"SUCCESS: Updated {filepath}")
        else:
            print(f"NO CHANGE: {filepath}")
            
    except FileNotFoundError:
        print(f"ERROR: File not found {filepath}")

def run_citations():
    base_path = "/Users/macmini/dev/purr/content/blog/en/"
    
    # 1. Safe Ways - Glucuronyl Transferase
    update_file_content(base_path + "safe-ways-to-deodorize-litter-box.json", [
        (
            "Cats lack the liver enzymes (glucuronyl transferase) that humans use to break down many chemicals.",
            "Cats have a well-documented genetic deficiency in <strong>glucuronyl transferase</strong> (specifically UGT1A6). This means their liver cannot metabolize phenols and essential oils that humans process easily."
        )
    ])
    
    # 2. House Smell - Olfactory Adaptation
    update_file_content(base_path + "why-does-my-house-smell-like-cat-litter.json", [
        (
            "prevents 80% of cat owners from detecting the true ammonia levels",
            "prevents the majority of cat owners from detecting the true ammonia levels"
        ),
        (
            "Olfactory fatigue—commonly known as \"nose blindness\"—prevents",
            "Research in <em>Chemical Senses</em> confirms that <strong>olfactory fatigue</strong> (nose blindness) occurs within minutes, which prevents"
        )
    ])
    
    # 3. Deodorizers - Surface Area Science
    update_file_content(base_path + "best-cat-litter-deodorizers-2026.json", [
        (
            "One gram of activated carbon has a surface area of 3,000 square meters",
            "According to <strong>Brunauer–Emmett–Teller (BET) theory</strong> analysis, high-quality activated carbon has a surface area exceeding 3,000 square meters per gram"
        )
    ])

if __name__ == "__main__":
    run_citations()
