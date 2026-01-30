
import json
import os
import glob
import re

def standardize_ctas():
    # Targets for JSON
    json_path = "/Users/macmini/dev/purr/content/blog/en/*.json"
    files = glob.glob(json_path)
    
    # New CTA HTML for JSON (minified/escaped for JSON string)
    new_cta_json = """<div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 md:p-12 text-center my-12"><h2 class="font-heading text-3xl md:text-4xl font-bold text-green-900 mb-6">🧪 The Free Science Experiment</h2><p class="text-xl text-green-800 mb-8 max-w-2xl mx-auto">Still skeptical? Try our <strong>trial bag</strong> for free (just pay $4.76 shipping). If you don't notice the difference the <em>first day</em> you use it, we'll refund every penny.</p><p class="text-green-700 text-sm mb-8 font-medium"><em>Same activated carbon used in municipal water filters—now for your cat's litter box.</em></p><div class="flex flex-col sm:flex-row gap-4 justify-center"><a href="/products/trial-size" class="inline-block bg-[#FF3131] hover:bg-[#E62E2E] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">Get Your Free Trial (Just Pay Shipping)</a></div></div>"""
    
    # Markers to identify old CTAs in JSON
    old_markers = [
        "The $8 Science Experiment",
        "Trial Pack</strong> is designed for a full 7-day stress test",
        "The $8.99 Science Experiment",
        "Try the Trial Size",
        "Try our trial size"
    ]
    
    for filepath in files:
        with open(filepath, 'r') as f:
            try:
                data = json.load(f)
            except:
                continue
                
        content = data.get('content', '')
        if not content: continue
        
        updated = False
        
        # Heuristic: Find specific old blocks and replace
        # We try to match roughly from "<div" to "</div>" surrounding the markers
        # Since regex on HTML is fragile, we'll try straight string replacement of known chunks first
        
        # 1. Replace known "The $8 Science Experiment" blocks (if I used a consistent template)
        # 2. Replace the "Trial Pack... under $10" block
        
        # If we find a marker, we try to replace the whole paragraph/div it's in.
        # But replacing exact strings is safer if we don't have perfect delimiters.
        
        if "The $8 Science Experiment" in content:
            # Replace headers
            content = content.replace("The $8 Science Experiment", "The Free Science Experiment")
            updated = True
            
        if "Trial Pack</strong> is designed for a full 7-day stress test for under $10" in content:
            content = content.replace("Trial Pack</strong> is designed for a full 7-day stress test for under $10", "trial bag</strong> for free (just pay $4.76 shipping)")
            updated = True
            
        if "$8.99 (shipping included)" in content:
            content = content.replace("$8.99 (shipping included)", "Free + $4.76 Shipping")
            updated = True
            
        if "Try the Trial Size - $8.99" in content:
            content = content.replace("Try the Trial Size - $8.99", "Get Your Free Trial (Just Pay Shipping)")
            updated = True
            
        if "Try the Trial Pack &rarr;" in content:
            content = content.replace("Try the Trial Pack &rarr;", "Get Your Free Trial (Just Pay Shipping)")
            updated = True
            
        if updated:
            data['content'] = content
            with open(filepath, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"Fixed CTA in JSON: {os.path.basename(filepath)}")

    # Targets for TSX
    tsx_files = [
        "/Users/macmini/dev/purr/pages/blog/cat-litter-smell-worse-winter.tsx",
        "/Users/macmini/dev/purr/pages/blog/cat-litter-smell-worse-summer.tsx"
    ]
    
    for filepath in tsx_files:
        if not os.path.exists(filepath): continue
        with open(filepath, 'r') as f:
            content = f.read()
            
        new_content = content
        # Direct replacements for text I know I wrote
        new_content = new_content.replace("The $8 Science Experiment", "The Free Science Experiment")
        new_content = new_content.replace("The $8 Summer Science Experiment", "The Free Summer Science Experiment")
        new_content = new_content.replace("Try the Trial Size - $8.99", "Get Your Free Trial (Just Pay Shipping)")
        new_content = new_content.replace("$8.99 (shipping included)", "Free + $4.76 Shipping")
        new_content = new_content.replace("one litter box, one month", "one litter box, one month") # Keep this
        new_content = new_content.replace("Try our <strong>trial size</strong>", "Try our <strong>trial bag</strong>")
        new_content = new_content.replace("refund every penny", "refund your shipping cost")
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Fixed CTA in TSX: {os.path.basename(filepath)}")

if __name__ == "__main__":
    standardize_ctas()
