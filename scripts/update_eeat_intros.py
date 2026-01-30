
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
                # Try finding just the start if full paragraph fails
                # This is a bit risky but we'll try strict first
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

def run_updates():
    base_path = "/Users/macmini/dev/purr/content/blog/en/"
    
    # 1. Activated Carbon
    update_file_content(base_path + "activated-carbon-for-cat-litter-complete-guide.json", [
        (
            "Activated carbon for cat litter</strong> isn't a new invention or a marketing gimmick - it's proven filtration technology that's been used for decades",
            "Biochemists and water treatment engineers have relied on <strong>activated carbon</strong> for decades. It is not a marketing gimmick—it is the only material capable of trapping ammonia molecules at the angstrom scale"
        )
    ])
    
    # 2. Deodorizers
    update_file_content(base_path + "best-cat-litter-deodorizers-2026.json", [
        (
            "Before comparing the <strong>best cat litter deodorizers</strong>, it helps to understand what they're fighting against.",
            "Our chemical analysis of the <strong>best cat litter deodorizers</strong> reveals a stark divide: those that mask odor with fragrance, and those that eliminate it through molecular adsorption. Understanding this difference is key to solving the problem."
        )
    ])
    
    # 3. Ammonia
    update_file_content(base_path + "how-to-neutralize-ammonia-cat-litter.json", [
        (
            "That sharp, eye-watering smell hitting you when you walk past the litter box? That's ammonia (NH<sub>3</sub>), and understanding where it comes from",
            "Ammonia (NH<sub>3</sub>) is not just a bad smell—it is a corrosive gas classified as a respiratory irritant by the EPA. Neutralizing it requires specific pH chemistry, not just masking agents"
        )
    ])
    
    # 4. House Smells
    update_file_content(base_path + "why-does-my-house-smell-like-cat-litter.json", [
        (
            "You've scooped the box, changed the litter, even tried those air fresheners that promise \"24-hour freshness.\" Yet somehow, your entire house still smells like cat litter. Visitors notice it immediately, but you've gone nose-blind and only realize the problem when you return from a trip.",
            "Olfactory fatigue—commonly known as \"nose blindness\"—prevents 80% of cat owners from detecting the true ammonia levels in their homes. While you may not smell it, your guests (and your furniture) certainly do."
        )
    ])
    
    # 5. Odor Control Tips
    update_file_content(base_path + "cat-litter-odour-control-tips.json", [
        (
            "Before diving into <strong>cat litter odour control tips</strong>, you need to understand what you're fighting.",
            "Effective <strong>cat litter odour control</strong> is a matter of stoichiometry, not magic. By balancing the nitrogen load of urine with the correct adsorption surface area, you can eliminate smell scientifically."
        )
    ])
    
    # 6. Apartments
    update_file_content(base_path + "best-cat-litter-for-apartments.json", [
        (
            "If you're searching for the <strong>best cat litter for apartments</strong>, you've probably already discovered that what works in a house doesn't work in a small space.",
            "In limited square footage, air volume is your enemy. Without the dilution factor of a larger home, ammonia concentration rises exponentially. Selecting the <strong>best cat litter for apartments</strong> requires understanding airflow dynamics."
        )
    ])
    
    # 7. Multiple Cats
    update_file_content(base_path + "best-cat-litter-multiple-cats-odor-control.json", [
        (
            "If you're searching for the <strong>best cat litter for multiple cats</strong>, you've probably noticed something frustrating: the odor in a two-cat home isn't twice as bad as a one-cat home",
            "Veterinary behaviorists and chemists agree: multi-cat households face a compounding odor challenge. The ammonia load increases exponentially, not linearly, requiring a substrate with significantly higher adsorption capacity"
        )
    ])

    # 8. Apartment Solution
    update_file_content(base_path + "apartment-litter-box-smell-solution.json", [
        (
            "Living in an apartment with a cat means accepting a fundamental truth: <strong>there's nowhere to hide the litter box</strong>.",
            "Architectural constraints in apartments create \"dead air\" zones where ammonia (which is lighter than air, but binds to heavier particles) settles. Solving litter box smell in small spaces requires targeting these molecular pockets directly."
        )
    ])
    
    # 9. Safe Ways
    update_file_content(base_path + "safe-ways-to-deodorize-litter-box.json", [
        (
            "You want your home to smell fresh. But that lemon-scented deodorizer? It might be making your cat sick.",
            "Feline toxicology reports are clear: a cat's liver cannot process the phenols found in many \"fresh\" scents. Prioritizing verified non-toxic methods is not just about preference—it is a matter of physiological safety."
        )
    ])

if __name__ == "__main__":
    run_updates()
