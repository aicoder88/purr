
import json
import re
import os

def inject_final():
    # CTA HTML (Standardized)
    cta_html = """<div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 md:p-12 text-center my-12"><h2 class="font-heading text-3xl md:text-4xl font-bold text-green-900 mb-6">🧪 The Free Science Experiment</h2><p class="text-xl text-green-800 mb-8 max-w-2xl mx-auto">Still skeptical? Try our <strong>trial bag</strong> for free (just pay $4.76 shipping). If you don't notice the difference the <em>first day</em> you use it, we'll refund every penny.</p><p class="text-green-700 text-sm mb-8 font-medium"><em>Same activated carbon used in municipal water filters—now for your cat's litter box.</em></p><div class="flex flex-col sm:flex-row gap-4 justify-center"><a href="/products/trial-size" class="inline-block bg-[#FF3131] hover:bg-[#E62E2E] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">Get Your Free Trial (Just Pay Shipping)</a></div></div>"""
    
    # 1. House Smell (Replace old box)
    house_file = "/Users/macmini/dev/purr/content/blog/en/why-does-my-house-smell-like-cat-litter.json"
    with open(house_file, 'r') as f:
        data = json.load(f)
    content = data.get('content', '')
    
    # Regex to find the old box containing "Professional-Grade Odour Control"
    # Matches <div class="bg-gradient... > content ... </div>
    # Using a simpler split/replace approach as regex on nested HTML is hard
    if "Professional-Grade Odour Control" in content:
        # Find start of div
        pattern = r'<div class="bg-gradient.*?Professional-Grade Odour Control.*?</div>'
        # This regex is risky if newlines exist. We'll use DOTALL
        match = re.search(pattern, content, re.DOTALL)
        if match:
            content = content.replace(match.group(0), cta_html)
            data['content'] = content
            with open(house_file, 'w') as f:
                json.dump(data, f, indent=2)
            print("Updated House Smell CTA")
        else:
             print("Could not regex match House Smell CTA")
    else:
        # If not found, maybe append?
        print("Old House Smell CTA textual marker not found")

    # 2. Safe Ways (Append new box)
    safe_file = "/Users/macmini/dev/purr/content/blog/en/safe-ways-to-deodorize-litter-box.json"
    with open(safe_file, 'r') as f:
        data = json.load(f)
    content = data.get('content', '')
    
    if "The Free Science Experiment" not in content:
        # Append to end
        data['content'] = content + "\n\n" + cta_html
        with open(safe_file, 'w') as f:
            json.dump(data, f, indent=2)
        print("Appended Safe Ways CTA")
    else:
        print("Safe Ways already has CTA")

if __name__ == "__main__":
    inject_final()
