#!/usr/bin/env python3
"""
Audit script for /public/optimized directory.
Identifies unused images, duplicates, and redundant format variants.
"""

import os
import hashlib
import re
import argparse
from pathlib import Path
from collections import defaultdict

# Project root (parent of scripts directory)
PROJECT_ROOT = Path(__file__).parent.parent
OPTIMIZED_DIR = PROJECT_ROOT / "public" / "optimized"

# Directories to search for image references
SEARCH_DIRS = [
    PROJECT_ROOT / "src",
    PROJECT_ROOT / "pages",
    PROJECT_ROOT / "content",
    PROJECT_ROOT / "public",
]

# File extensions to search within
SEARCH_EXTENSIONS = {".ts", ".tsx", ".json", ".js", ".webmanifest", ".md"}

# Image extensions in optimized folder
IMAGE_EXTENSIONS = {".webp", ".avif", ".png", ".jpg", ".jpeg"}


def get_file_hash(filepath: Path) -> str:
    """Compute SHA-256 hash of a file."""
    hasher = hashlib.sha256()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def get_all_optimized_images() -> list[Path]:
    """Get all image files in the optimized directory."""
    images = []
    for ext in IMAGE_EXTENSIONS:
        images.extend(OPTIMIZED_DIR.glob(f"*{ext}"))
    return sorted(images)


def find_duplicates(images: list[Path]) -> dict[str, list[Path]]:
    """Find duplicate images by hash."""
    hash_to_files = defaultdict(list)
    for img in images:
        file_hash = get_file_hash(img)
        hash_to_files[file_hash].append(img)
    
    # Only return hashes with more than one file
    return {h: files for h, files in hash_to_files.items() if len(files) > 1}


def search_for_references(images: list[Path]) -> dict[str, set[Path]]:
    """Search codebase for references to each image."""
    # Map image name to set of files that reference it
    references = {img.name: set() for img in images}
    
    for search_dir in SEARCH_DIRS:
        if not search_dir.exists():
            continue
        
        for root, _, files in os.walk(search_dir):
            # Skip node_modules and .next
            if "node_modules" in root or ".next" in root:
                continue
            
            for filename in files:
                filepath = Path(root) / filename
                if filepath.suffix not in SEARCH_EXTENSIONS:
                    continue
                
                try:
                    content = filepath.read_text(encoding="utf-8", errors="ignore")
                    for img_name in references.keys():
                        # Check various patterns
                        if img_name in content:
                            references[img_name].add(filepath)
                except Exception:
                    continue
    
    return references


def find_unused_images(images: list[Path], references: dict[str, set[Path]]) -> list[Path]:
    """Find images with no references."""
    unused = []
    for img in images:
        if not references.get(img.name):
            unused.append(img)
    return unused


def find_format_variants(images: list[Path]) -> dict[str, list[Path]]:
    """Group images by base name (without extension and size suffix)."""
    base_to_files = defaultdict(list)
    
    # Pattern to strip size suffixes like -640w, -828w, -1080w
    size_pattern = re.compile(r"-\d+w$")
    
    for img in images:
        base_name = img.stem
        base_name = size_pattern.sub("", base_name)
        base_to_files[base_name].append(img)
    
    # Only return bases with multiple variants
    return {base: files for base, files in base_to_files.items() if len(files) > 1}


def main():
    parser = argparse.ArgumentParser(description="Audit optimized images")
    parser.add_argument("--delete", action="store_true", help="Delete unused images")
    parser.add_argument("--verbose", "-v", action="store_true", help="Verbose output")
    args = parser.parse_args()

    print("=" * 60)
    print("OPTIMIZED IMAGES AUDIT")
    print("=" * 60)

    # Get all images
    images = get_all_optimized_images()
    print(f"\n📁 Total images in /public/optimized: {len(images)}")

    # Find duplicates
    print("\n🔍 Checking for duplicates...")
    duplicates = find_duplicates(images)
    if duplicates:
        print(f"   Found {len(duplicates)} sets of duplicate files:")
        for hash_val, files in duplicates.items():
            print(f"   • {[f.name for f in files]}")
    else:
        print("   No exact duplicates found.")

    # Search for references
    print("\n🔍 Searching for image references in codebase...")
    references = search_for_references(images)

    # Find unused images
    unused = find_unused_images(images, references)
    print(f"\n📊 Results:")
    print(f"   • Used images: {len(images) - len(unused)}")
    print(f"   • Unused images: {len(unused)}")

    if unused:
        print(f"\n🗑️  Unused images ({len(unused)}):")
        total_size = 0
        for img in unused:
            size = img.stat().st_size
            total_size += size
            if args.verbose:
                print(f"   • {img.name} ({size // 1024} KB)")
        
        if not args.verbose and len(unused) > 10:
            for img in unused[:10]:
                print(f"   • {img.name}")
            print(f"   ... and {len(unused) - 10} more")
        elif not args.verbose:
            for img in unused:
                print(f"   • {img.name}")
        
        print(f"\n   Total size: {total_size // 1024} KB ({total_size // (1024*1024)} MB)")

        # Write unused list to file
        unused_file = PROJECT_ROOT / "scripts" / "unused_images.txt"
        with open(unused_file, "w") as f:
            for img in unused:
                f.write(f"{img.name}\n")
        print(f"\n   List saved to: {unused_file}")

        if args.delete:
            print("\n⚠️  Deleting unused images...")
            for img in unused:
                img.unlink()
                print(f"   Deleted: {img.name}")
            print(f"   ✅ Deleted {len(unused)} files")
        else:
            print("\n   Run with --delete to remove these files")

    # Format variants analysis
    if args.verbose:
        print("\n🔍 Format variants analysis:")
        variants = find_format_variants(images)
        for base, files in list(variants.items())[:5]:
            used = [f.name for f in files if references.get(f.name)]
            unused_v = [f.name for f in files if not references.get(f.name)]
            if unused_v:
                print(f"   {base}: used={used}, unused={unused_v}")

    print("\n" + "=" * 60)
    print("Audit complete.")


if __name__ == "__main__":
    main()
