import re
import os

files = [
    "content/blog/en/baking-soda-vs-activated-carbon-cat-litter.json",
    "content/blog/en/best-cat-litter-multiple-cats.json",
    "content/blog/en/how-to-get-rid-of-cat-litter-smell-in-apartment.json",
    "content/blog/en/why-does-my-cats-litter-box-smell-so-bad.json"
]

for file_path in files:
    abs_path = os.path.join("/Users/macmini/dev/purr", file_path)
    if not os.path.exists(abs_path):
        print(f"File not found: {abs_path}")
        continue
    
    with open(abs_path, 'r') as f:
        content = f.read()
    
    # Simple regex to find class strings in Next.js/React/HTML style
    # Handles class="...", className="..." and JSON-escaped versions
    class_regex = r'(?:className|class)=(?:\\")?([^\\"]*?)(?:\\")?'
    
    matches = re.finditer(class_regex, content)
    for match in matches:
        class_str = match.group(1)
        # Split by spaces/newlines
        classes = re.split(r'\s+', class_str)
        
        for cls in classes:
            # Check for gray-400/500/600 that lack dark variants
            if cls in ["text-gray-400", "text-gray-500", "text-gray-600"]:
                # Check if any dark: variant of same type exists
                has_dark = any(c.startswith("dark:text-") for c in classes)
                if not has_dark:
                    print(f"MISSING DARK: {file_path} -> '{cls}' in '{class_str}'")
            
            # Check for redundant/conflicting dark variants
            darks = [c for c in classes if c.startswith("dark:text-gray-")]
            if len(darks) > 1:
                # Deduplicate or clean up
                # Only warn if they are different colors
                if len(set(darks)) > 1:
                    print(f"REDUNDANT DARK: {file_path} -> '{class_str}'")
