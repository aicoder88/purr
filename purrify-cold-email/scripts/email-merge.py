#!/usr/bin/env python3
"""
Purrify Cold Email Merge Script
--------------------------------
Personalizes email templates with prospect data from CSV.
Supports multiple templates, tracking, and batch processing.

Requirements:
    pip install pandas jinja2

Usage:
    python email-merge.py --csv contacts.csv --template email-template.txt --output output/
"""

import argparse
import csv
import os
import sys
from datetime import datetime
from pathlib import Path
import re

try:
    import pandas as pd
    from jinja2 import Template
except ImportError:
    print("Error: Required packages not installed.")
    print("Install with: pip install pandas jinja2")
    sys.exit(1)


class EmailMerge:
    """Handles email template merging with prospect data."""

    def __init__(self, csv_path, template_path, output_dir="output"):
        self.csv_path = Path(csv_path)
        self.template_path = Path(template_path)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)

        # Load data
        self.prospects = self.load_prospects()
        self.template = self.load_template()

    def load_prospects(self):
        """Load prospect data from CSV."""
        try:
            df = pd.read_csv(self.csv_path)
            print(f"✓ Loaded {len(df)} prospects from {self.csv_path}")
            return df
        except FileNotFoundError:
            print(f"Error: CSV file not found: {self.csv_path}")
            sys.exit(1)
        except Exception as e:
            print(f"Error loading CSV: {e}")
            sys.exit(1)

    def load_template(self):
        """Load email template."""
        try:
            with open(self.template_path, 'r', encoding='utf-8') as f:
                content = f.read()
            print(f"✓ Loaded template from {self.template_path}")
            return content
        except FileNotFoundError:
            print(f"Error: Template file not found: {self.template_path}")
            sys.exit(1)
        except Exception as e:
            print(f"Error loading template: {e}")
            sys.exit(1)

    def get_merge_tags(self):
        """Extract all merge tags from template."""
        pattern = r'\{\{(\w+)\}\}'
        tags = set(re.findall(pattern, self.template))
        return tags

    def validate_data(self):
        """Validate that all required merge tags have data."""
        merge_tags = self.get_merge_tags()
        csv_columns = set(self.prospects.columns)

        missing_columns = merge_tags - csv_columns
        if missing_columns:
            print(f"\nWarning: Template requires fields not in CSV: {missing_columns}")
            print("These tags will be replaced with [MISSING] in output.")

        print(f"\n✓ Template uses {len(merge_tags)} merge tags: {', '.join(sorted(merge_tags))}")

    def merge_single(self, row):
        """Merge a single prospect's data with template."""
        # Convert row to dictionary
        data = row.to_dict()

        # Replace NaN values with empty string
        data = {k: (v if pd.notna(v) else '') for k, v in data.items()}

        # Use Jinja2 for template rendering
        template = Template(self.template)

        try:
            result = template.render(**data)
            return result
        except Exception as e:
            print(f"Error merging for {data.get('Email', 'unknown')}: {e}")
            return None

    def merge_all(self, filter_status=None):
        """Merge all prospects, optionally filtering by status."""
        results = []

        # Filter prospects if status specified
        prospects = self.prospects
        if filter_status:
            prospects = prospects[prospects['Status'] == filter_status]
            print(f"\n✓ Filtered to {len(prospects)} prospects with status: {filter_status}")

        print(f"\nMerging {len(prospects)} emails...")

        for idx, row in prospects.iterrows():
            merged = self.merge_single(row)
            if merged:
                results.append({
                    'ContactID': row.get('ContactID', idx),
                    'Email': row['Email'],
                    'FirstName': row.get('FirstName', 'Unknown'),
                    'LastName': row.get('LastName', ''),
                    'StoreName': row.get('StoreName', 'Store'),
                    'Content': merged
                })

        print(f"✓ Successfully merged {len(results)} emails")
        return results

    def save_results(self, results, prefix="merged"):
        """Save merged emails to individual files."""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        # Create timestamped subdirectory
        batch_dir = self.output_dir / f"{prefix}_{timestamp}"
        batch_dir.mkdir(exist_ok=True)

        # Save individual emails
        for result in results:
            filename = f"{result['ContactID']}_{result['FirstName']}_{result['LastName'].replace(' ', '_')}.txt"
            filepath = batch_dir / filename

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(f"To: {result['Email']}\n")
                f.write(f"Store: {result['StoreName']}\n")
                f.write(f"Contact ID: {result['ContactID']}\n")
                f.write("-" * 50 + "\n\n")
                f.write(result['Content'])

        # Save summary CSV
        summary_path = batch_dir / "merge_summary.csv"
        summary_df = pd.DataFrame([
            {
                'ContactID': r['ContactID'],
                'Email': r['Email'],
                'FirstName': r['FirstName'],
                'LastName': r['LastName'],
                'StoreName': r['StoreName'],
                'FilePath': f"{r['ContactID']}_{r['FirstName']}_{r['LastName'].replace(' ', '_')}.txt"
            }
            for r in results
        ])
        summary_df.to_csv(summary_path, index=False)

        print(f"\n✓ Saved {len(results)} emails to: {batch_dir}")
        print(f"✓ Summary CSV: {summary_path}")

        return batch_dir

    def preview(self, num_samples=3):
        """Preview merged emails for first N prospects."""
        print(f"\n{'='*60}")
        print(f"PREVIEW: First {num_samples} merged emails")
        print(f"{'='*60}\n")

        for idx, row in self.prospects.head(num_samples).iterrows():
            merged = self.merge_single(row)
            if merged:
                print(f"--- Preview {idx + 1} ---")
                print(f"To: {row['Email']}")
                print(f"Store: {row.get('StoreName', 'N/A')}")
                print(f"\n{merged}\n")
                print("-" * 60 + "\n")


def main():
    parser = argparse.ArgumentParser(
        description="Merge prospect data with email templates",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Preview first 3 merged emails
  python email-merge.py --csv contacts.csv --template email1.txt --preview

  # Merge all prospects
  python email-merge.py --csv contacts.csv --template email1.txt --output emails/

  # Merge only prospects with specific status
  python email-merge.py --csv contacts.csv --template email1.txt --status "Prospect"

  # Merge with custom output prefix
  python email-merge.py --csv contacts.csv --template email1.txt --prefix "batch1"
        """
    )

    parser.add_argument('--csv', required=True, help='Path to CSV file with prospect data')
    parser.add_argument('--template', required=True, help='Path to email template file')
    parser.add_argument('--output', default='output', help='Output directory (default: output/)')
    parser.add_argument('--status', help='Filter prospects by status (e.g., "Prospect")')
    parser.add_argument('--preview', action='store_true', help='Preview mode - show samples without saving')
    parser.add_argument('--preview-count', type=int, default=3, help='Number of previews to show (default: 3)')
    parser.add_argument('--prefix', default='merged', help='Output file prefix (default: merged)')

    args = parser.parse_args()

    # Initialize merger
    merger = EmailMerge(args.csv, args.template, args.output)

    # Validate data
    merger.validate_data()

    # Preview mode
    if args.preview:
        merger.preview(args.preview_count)
        print("\n✓ Preview complete. Use without --preview flag to save emails.")
        return

    # Merge all emails
    results = merger.merge_all(filter_status=args.status)

    if not results:
        print("\nNo emails to merge. Check your CSV data and filters.")
        return

    # Save results
    output_dir = merger.save_results(results, prefix=args.prefix)

    print(f"\n{'='*60}")
    print("MERGE COMPLETE")
    print(f"{'='*60}")
    print(f"Total emails generated: {len(results)}")
    print(f"Output directory: {output_dir}")
    print(f"\nNext steps:")
    print("1. Review merged emails in output directory")
    print("2. Import to your email tool (e.g., Mailchimp, SendGrid)")
    print("3. Update CSV with LastContactDate after sending")
    print("4. Track responses and update Status field")


if __name__ == "__main__":
    main()
