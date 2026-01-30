
import json
import os

def update_final():
    base_path = "/Users/macmini/dev/purr/content/blog/en/"
    
    # 1. OSHA Citation (Ammonia)
    ammonia_file = base_path + "how-to-neutralize-ammonia-cat-litter.json"
    with open(ammonia_file, 'r') as f:
        data = json.load(f)
    if "OSHA" not in data['content']:
        # Insert after intro or somewhere relevant
        target = "Ammonia (NH<sub>3</sub>) is not just a bad smell—it is a corrosive gas classified as a respiratory irritant by the EPA."
        replacement = target + " The <strong>Occupational Safety and Health Administration (OSHA)</strong> sets a strict permissible exposure limit of 50 ppm, recognizing its danger to respiratory tissue."
        if target in data['content']:
            data['content'] = data['content'].replace(target, replacement)
        else:
            # Fallback insertion
            data['content'] = data['content'].replace("Ammonia (NH<sub>3</sub>) is not just a bad smell", "Ammonia (NH<sub>3</sub>) is not just a bad smell. The <strong>Occupational Safety and Health Administration (OSHA)</strong> classifies it as a hazardous substance (PEL 50 ppm).")
        
        with open(ammonia_file, 'w') as f:
            json.dump(data, f, indent=2)
        print("Updated OSHA citation")
        
    # 2. NSF Citation (Carbon)
    carbon_file = base_path + "activated-carbon-for-cat-litter-complete-guide.json"
    with open(carbon_file, 'r') as f:
        data = json.load(f)
    if "NSF" not in data['content']:
        target = "used for decades in water treatment"
        replacement = "used for decades in water treatment (meeting <strong>NSF/ANSI Standard 42</strong>)"
        if target in data['content']:
            data['content'] = data['content'].replace(target, replacement)
            with open(carbon_file, 'w') as f:
                json.dump(data, f, indent=2)
            print("Updated NSF citation")
        else:
             print("NSF target not found")

if __name__ == "__main__":
    update_final()
