import os
import json

blog_dir = '/Users/macmini/dev/purr/content/blog/en'

updates = {
    'space-station-secret-fresh-home-cat-owners': '/optimized/blog/scientific-odor-control.png',
    'most-powerful-odor-absorber': '/optimized/blog/science-molecule-lab.jpg',
    'cat-litter-smell-worse-winter': '/optimized/blog/winter-fresh-cat.png',
    'cat-litter-smell-worse-summer': '/optimized/blog/summer-fresh-cat.png',
    'best-litter-odor-remover-small-apartments': '/optimized/blog/apartment-cat-lifestyle.png',
    'why-does-my-cats-litter-box-smell-so-bad': '/optimized/blog/cat-fresh-home-ammonia.jpg',
    'embarrassed-guests-visit-cat-litter-smell': '/optimized/blog/embarrassed-hero.jpg',
    'tried-everything-cat-litter-smell-solutions': '/optimized/blog/tried-hero.jpg',
    'how-often-change-cat-litter': '/optimized/blog/frequency-hero.png',
    'litter-deodorizer-frequency-guide': '/optimized/blog/frequency-action.png'
}

for filename in os.listdir(blog_dir):
    if filename.endswith('.json'):
        filepath = os.path.join(blog_dir, filename)
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        slug = data.get('slug')
        changed = False

        # Update featuredImage if in updates list
        if slug in updates:
            data['featuredImage']['url'] = updates[slug]
            changed = True
        
        # Always ensure ogImage matches featuredImage
        if 'seo' in data:
            current_og = data['seo'].get('ogImage')
            featured = data['featuredImage']['url']
            if current_og != featured:
                data['seo']['ogImage'] = featured
                changed = True
        
        if changed:
            with open(filepath, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"Updated {filename}")
