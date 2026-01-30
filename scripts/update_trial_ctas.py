
import json
import os

def update_ctas():
    base_path = "/Users/macmini/dev/purr/content/blog/en/"
    
    # Generic Science CTA
    science_cta = """<div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mt-8">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Prove the Science Yourself</h3>
                <p class="text-gray-700 dark:text-gray-200 mb-4">
                  Don't rely on marketing claims. Test the adsorption capacity of Purrify coconut carbon in your own litter box. The <strong>Trial Pack</strong> is designed for a full 7-day stress test for under $10.
                </p>
                <a href="/products" class="inline-block bg-[#03E46A] text-white dark:text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-[#02C55A] transition-colors">
                  Get the Trial Pack &rarr;
                </a>
              </div>"""

    # List of files to add generic CTA (excluding special cases)
    files_to_update = [
        "activated-carbon-for-cat-litter-complete-guide.json",
        "best-cat-litter-deodorizers-2026.json",
        "how-to-neutralize-ammonia-cat-litter.json",
        "cat-litter-odour-control-tips.json",
        "best-cat-litter-for-apartments.json",
        "best-cat-litter-multiple-cats-odor-control.json"
    ]
    
    # 1. Update generic files
    for filename in files_to_update:
        filepath = base_path + filename
        try:
            with open(filepath, 'r') as f:
                data = json.load(f)
            
            content = data['content']
            
            # Check if CTA already exists to avoid duplication
            if "Prove the Science Yourself" in content:
                print(f"SKIPPED {filename}: CTA already present")
                continue
                
            # Find insertion point: usually before the related articles divider
            divider_marker = '<div class="mt-16 pt-8 border-t'
            if divider_marker in content:
                content = content.replace(divider_marker, f"\n{science_cta}\n\n            {divider_marker}")
                print(f"UPDATED {filename}: Inserted CTA before divider")
            else:
                # Append to end of content div if divider not found (rare)
                content += f"\n{science_cta}"
                print(f"UPDATED {filename}: Appended CTA to end")
                
            data['content'] = content
            with open(filepath, 'w') as f:
                json.dump(data, f, indent=2)
                
        except FileNotFoundError:
            print(f"ERROR: {filename} not found")

    # 2. Update Why Does My House Smell (Replace existing CTA)
    try:
        filepath = base_path + "why-does-my-house-smell-like-cat-litter.json"
        with open(filepath, 'r') as f:
            data = json.load(f)
        content = data['content']
        
        # This one has a specific existing CTA we want to replace/upgrade
        old_cta_start = "Ready for a Home That Doesn't Smell Like Cat?"
        # We can try to replace the whole block if we can match it, or just perform a similar insertion?
        # Let's inspect indentation in previous 'view_file' output for this file... it seemed compact.
        # But let's try to just insert the NEW CTA before the divider, and if the old one is there, maybe keep it?
        # Actually, let's keep it simple. If I insert another CTA it might be too much.
        # Let's SKIP adding a new CTA if "Ready for a Home" is there, but maybe modify the link text?
        
        if old_cta_start in content:
            content = content.replace("Shop Purrify", "Get the Trial Pack")
            content = content.replace("Works with any litter", "Test the 7-day science with our Trial Pack")
            print(f"UPDATED {filepath}: Tweaked existing CTA")
        else:
            # If not found, insert standard one
             if '<div class="mt-16 pt-8 border-t' in content:
                 content = content.replace('<div class="mt-16 pt-8 border-t', f"\n{science_cta}\n\n            <div class=\"mt-16 pt-8 border-t")
                 print(f"UPDATED {filepath}: Inserted standard CTA")
        
        data['content'] = content
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
            
    except Exception as e:
        print(f"ERROR updating house smell file: {e}")

    # 3. Update Safe Ways (Tweaking existing CTA)
    try:
        filepath = base_path + "safe-ways-to-deodorize-litter-box.json"
        with open(filepath, 'r') as f:
            data = json.load(f)
        content = data['content']
        
        # It has "The Safe Choice for Cat Owners" box at the end.
        if "The Safe Choice for Cat Owners" in content:
            content = content.replace("Try Purrify Risk-Free &rarr;", "Get the Safe-Scent Trial Pack &rarr;")
            content = content.replace("Just pure, food-grade carbon that traps odors", "Just pure, FCC-grade carbon. Start with the Trial Pack to verify cat acceptance")
            print(f"UPDATED {filepath}: Tweaked Safe Ways CTA")
            
        data['content'] = content
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
            
    except Exception as e:
        print(f"ERROR updating safe ways file: {e}")

    # Apartment solution is skipped as per plan

if __name__ == "__main__":
    update_ctas()
