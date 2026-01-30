
import json
import os
import glob

def fix_pricing():
    # 1. Update JSON files
    json_path = "/Users/macmini/dev/purr/content/blog/en/*.json"
    files = glob.glob(json_path)
    
    # Text to find (JSONs likely have HTML entities or escaped quotes, so we search for substrings)
    # Replaces the whole CTA block if possible or specific strings
    
    for filepath in files:
        with open(filepath, 'r') as f:
            try:
                data = json.load(f)
            except:
                continue
                
        content = data.get('content', '')
        changed = False
        
        # Replacements for JSON
        if "The $8 Science Experiment" in content:
            content = content.replace("The $8 Science Experiment", "The Free Science Experiment")
            changed = True
            
        if "$8.99" in content:
             content = content.replace("$8.99 (shipping included)", "Free + $4.76 Shipping")
             content = content.replace("$8.99", "Free + $4.76 Shipping")
             changed = True
             
        if "Try the Trial Size" in content and "Free" not in content:
             # This is risky if simpler, but let's try to target the button text
             pass

        # Specific replacement for the body text if found
        target_body = "If you don't notice the difference the first day you use it, we'll refund every penny."
        if target_body in content:
            # Add price clarification before this
            pass 

        if changed:
            data['content'] = content
            with open(filepath, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"Updated JSON: {os.path.basename(filepath)}")

    # 2. Update TSX files
    tsx_files = [
        "/Users/macmini/dev/purr/pages/blog/cat-litter-smell-worse-winter.tsx",
        "/Users/macmini/dev/purr/pages/blog/cat-litter-smell-worse-summer.tsx"
    ]
    
    for filepath in tsx_files:
        if not os.path.exists(filepath): continue
        
        with open(filepath, 'r') as f:
            content = f.read()
            
        new_content = content
        new_content = new_content.replace("The $8 Science Experiment", "The Free Science Experiment")
        new_content = new_content.replace("The $8 Summer Science Experiment", "The Free Summer Science Experiment")
        new_content = new_content.replace("Try the Trial Size - $8.99", "Get Your Free Trial (Just Pay Shipping)")
        new_content = new_content.replace("$8.99 (shipping included)", "Free + $4.76 Shipping")
        
        # Body text update
        if "Try our <strong>trial size</strong> for one litter box, one month." in new_content:
             new_content = new_content.replace(
                 "Try our <strong>trial size</strong> for one litter box, one month.", 
                 "Try our <strong>trial bag</strong> for free (just pay $4.76 shipping)."
             )

        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated TSX: {os.path.basename(filepath)}")

if __name__ == "__main__":
    fix_pricing()
