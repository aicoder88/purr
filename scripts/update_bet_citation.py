
import json
import os

def update_bet():
    filepath = "/Users/macmini/dev/purr/content/blog/en/best-cat-litter-deodorizers-2026.json"
    
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    content = data['content']
    
    target = "One gram of activated carbon has the internal surface area of a football field, filled with microscopic tunnels that trap odour molecules on contact. This is why a small amount of carbon can outperform cups of baking soda or entire bottles of spray deodorizer."
    
    replacement = "According to <strong>Brunauer–Emmett–Teller (BET) theory</strong> analysis, high-quality activated carbon has a surface area exceeding 3,000 m² per gram—roughly the size of a football field. This massive internal network traps ammonia molecules on contact, explaining why a few grams outperform cups of baking soda."
    
    if target in content:
        content = content.replace(target, replacement)
        data['content'] = content
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
        print("SUCCESS: Updated BET citation")
    else:
        print("ERROR: Target not found")
        
if __name__ == "__main__":
    update_bet()
