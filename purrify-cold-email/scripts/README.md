# Email Merge Scripts

## Overview

This directory contains scripts to personalize and merge email templates with prospect data from CSV files.

---

## Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Install Required Packages

```bash
pip install pandas jinja2
```

Or use requirements file:

```bash
pip install -r requirements.txt
```

---

## Quick Start

### 1. Prepare Your Data

Ensure you have:
- `contacts.csv` - Prospect data (see `/templates/contacts-template.csv`)
- `email-template.txt` - Email template with merge tags

### 2. Preview Merged Emails

```bash
python email-merge.py --csv ../templates/contacts-template.csv --template ../emails/sample-template.txt --preview
```

### 3. Generate All Emails

```bash
python email-merge.py --csv ../templates/contacts-template.csv --template ../emails/sample-template.txt --output ../output/
```

---

## Usage Guide

### Basic Command Structure

```bash
python email-merge.py --csv [CSV_FILE] --template [TEMPLATE_FILE] [OPTIONS]
```

### Command Options

**Required:**
- `--csv PATH` - Path to CSV file with prospect data
- `--template PATH` - Path to email template file

**Optional:**
- `--output DIR` - Output directory (default: `output/`)
- `--status VALUE` - Filter prospects by status (e.g., "Prospect")
- `--preview` - Preview mode (show samples without saving)
- `--preview-count N` - Number of previews to show (default: 3)
- `--prefix NAME` - Output file prefix (default: "merged")

### Examples

**Preview first 5 emails:**
```bash
python email-merge.py \
    --csv ../templates/contacts.csv \
    --template ../emails/01-problem-agitation-solution.txt \
    --preview \
    --preview-count 5
```

**Merge all "Prospect" status contacts:**
```bash
python email-merge.py \
    --csv ../templates/contacts.csv \
    --template ../emails/follow-up-email2.txt \
    --status "Prospect" \
    --output ../output/ \
    --prefix "followup2"
```

**Merge specific framework emails:**
```bash
python email-merge.py \
    --csv ../templates/contacts.csv \
    --template ../emails/04-question-based-openers.txt \
    --output ../output/question-based/
```

---

## Template Format

### Creating Email Templates

Email templates use double curly braces `{{}}` for merge tags.

**Example Template:**

```
Subject: {{FirstName}}, quick question about {{StoreName}}

Hi {{FirstName}},

How often do customers at {{StoreName}} ask if you have something that actually WORKS for litter box smell?

I'm reaching out because 20+ pet stores in Montreal have found a solution that's delivering:
- 40-60% profit margins
- Near-zero return rates
- Loyal repeat customers

Would you be open to a 10-minute call about how this could work in {{City}}?

Best,
[Your Name]
```

### Available Merge Tags

All CSV column headers can be used as merge tags:

| Merge Tag | Description | Example |
|-----------|-------------|---------|
| `{{FirstName}}` | Contact first name | "John" |
| `{{LastName}}` | Contact last name | "Smith" |
| `{{Email}}` | Email address | "john@store.com" |
| `{{StoreName}}` | Business name | "Paws & Claws" |
| `{{StoreType}}` | Type of store | "Independent" |
| `{{City}}` | City location | "Toronto" |
| `{{Province}}` | Province (Canada) | "ON" |
| `{{State}}` | State (USA) | "WA" |
| `{{Country}}` | Country | "Canada" |
| `{{EstimatedSize}}` | Store size | "Medium" |
| `{{Specialty}}` | Store specialty | "Organic/Natural" |
| `{{GoogleRating}}` | Google rating | "4.5" |
| `{{Phone}}` | Phone number | "416-555-0100" |
| `{{Website}}` | Website URL | "www.example.com" |
| `{{Notes}}` | Custom notes | Any text |

**Missing Data Handling:**
- If a merge tag has no data in CSV, it will be replaced with empty string
- Script will warn you about missing columns during validation

---

## Output Structure

### Generated Files

When you run the merge script, it creates:

```
output/
└── merged_20250116_143022/
    ├── 1_John_Smith.txt
    ├── 2_Sarah_Johnson.txt
    ├── 3_Michael_Williams.txt
    ├── merge_summary.csv
    └── ...
```

**Individual Email Files:**
- Named: `{ContactID}_{FirstName}_{LastName}.txt`
- Contains:
  - Recipient email
  - Store name
  - Contact ID
  - Full merged email content

**Summary CSV:**
- Lists all generated emails
- Columns: ContactID, Email, FirstName, LastName, StoreName, FilePath
- Use for tracking and importing to email tools

---

## Workflows

### Workflow 1: Initial Outreach Campaign

```bash
# Step 1: Preview emails
python email-merge.py \
    --csv contacts.csv \
    --template initial-email.txt \
    --preview

# Step 2: Generate all emails
python email-merge.py \
    --csv contacts.csv \
    --template initial-email.txt \
    --output campaign1/

# Step 3: Import to email tool
# Use merge_summary.csv to import into Mailchimp, SendGrid, etc.

# Step 4: Update CSV after sending
# Set LastContactDate = today
# Set EmailSequenceStage = 1
# Set Status = "Contacted"
```

### Workflow 2: Follow-Up Sequence

```bash
# Filter only contacts who haven't replied
# Update CSV to Status = "No Response"

# Generate follow-up email #2 (Day 4)
python email-merge.py \
    --csv contacts.csv \
    --template followup2.txt \
    --status "No Response" \
    --output campaign1-followup2/ \
    --prefix "followup2"

# After sending:
# Update EmailSequenceStage = 2
# Update LastContactDate
```

### Workflow 3: A/B Testing

```bash
# Generate Group A emails (Problem-Agitation-Solution)
python email-merge.py \
    --csv contacts-groupA.csv \
    --template pas-framework.txt \
    --output test-groupA/ \
    --prefix "groupA"

# Generate Group B emails (Question-Based)
python email-merge.py \
    --csv contacts-groupB.csv \
    --template question-framework.txt \
    --output test-groupB/ \
    --prefix "groupB"

# Compare response rates, refine approach
```

---

## Best Practices

### Data Quality
✓ Validate CSV data before merging
✓ Test with `--preview` before full merge
✓ Check for missing required fields
✓ Verify merge tag spelling in templates

### Template Design
✓ Use clear, descriptive merge tags
✓ Provide fallback text for optional fields
✓ Test template with various data scenarios
✓ Keep subject lines under 60 characters

### Batch Processing
✓ Use meaningful `--prefix` for each batch
✓ Generate smaller test batches first
✓ Keep merge_summary.csv files for tracking
✓ Archive output directories with date stamps

### Tracking & Follow-Up
✓ Update CSV immediately after sending
✓ Track which template was used per contact
✓ Monitor LastContactDate and EmailSequenceStage
✓ Update Status based on responses

---

## Troubleshooting

### Error: "CSV file not found"
**Solution:** Check file path. Use absolute path or path relative to script location.

```bash
# Absolute path
python email-merge.py --csv /Users/you/purrify-cold-email/templates/contacts.csv ...

# Relative path from scripts/ directory
python email-merge.py --csv ../templates/contacts.csv ...
```

### Error: "Template requires fields not in CSV"
**Solution:** Either add missing columns to CSV or remove merge tags from template.

**Check which tags are missing:**
```bash
python email-merge.py --csv contacts.csv --template email.txt --preview
# Script will list missing columns
```

### Error: "ModuleNotFoundError: No module named 'pandas'"
**Solution:** Install required packages.

```bash
pip install pandas jinja2
```

### Warning: "These tags will be replaced with [MISSING]"
**Issue:** Template uses merge tags not in CSV.
**Solution:** This is just a warning. Empty strings will be used. Update CSV if you want data there.

### Output Files Look Wrong
**Solution:** Check template format and merge tag syntax.

- Merge tags must use double curly braces: `{{Tag}}`
- Tag names must match CSV column headers exactly (case-sensitive)
- No spaces inside curly braces: `{{FirstName}}` not `{{ FirstName }}`

---

## Advanced Usage

### Custom Filtering with Python

Create custom scripts to filter CSV before merging:

```python
import pandas as pd

# Load CSV
df = pd.read_csv('contacts.csv')

# Filter high-priority prospects
high_priority = df[
    (df['GoogleRating'] >= 4.5) &
    (df['Specialty'].str.contains('Organic|Natural', case=False, na=False))
]

# Save filtered CSV
high_priority.to_csv('high-priority-contacts.csv', index=False)

# Then merge
# python email-merge.py --csv high-priority-contacts.csv --template ...
```

### Batch Processing Multiple Templates

```bash
#!/bin/bash
# Script to process multiple templates at once

TEMPLATES=(
    "01-problem-agitation-solution.txt"
    "02-before-after-bridge.txt"
    "03-story-based-leads.txt"
    "04-question-based-openers.txt"
    "05-stat-based-hooks.txt"
)

for template in "${TEMPLATES[@]}"; do
    echo "Processing $template..."
    python email-merge.py \
        --csv contacts.csv \
        --template "../emails/$template" \
        --output "../output/$(basename $template .txt)/" \
        --prefix "$(basename $template .txt)"
done
```

### Integration with Email APIs

After generating merged emails, integrate with email service APIs:

**SendGrid Example:**
```python
import sendgrid
from sendgrid.helpers.mail import Mail

sg = sendgrid.SendGridAPIClient(api_key='YOUR_API_KEY')

# Read merged email
with open('output/merged_20250116/1_John_Smith.txt', 'r') as f:
    content = f.read()

# Send email
message = Mail(
    from_email='your@email.com',
    to_emails='john@store.com',
    subject='Subject Line',
    plain_text_content=content
)

response = sg.send(message)
```

---

## Support Files

- `requirements.txt` - Python package dependencies
- `sample-template.txt` - Example email template
- `batch-process.sh` - Bash script for batch processing (create as needed)

---

## Next Steps

1. **Prepare your data** - Fill out contacts.csv with prospect information
2. **Choose templates** - Select email frameworks from /emails/ directory
3. **Test with preview** - Always preview before generating full batch
4. **Generate emails** - Run merge script with appropriate filters
5. **Import to email tool** - Use merge_summary.csv for import
6. **Track and iterate** - Update CSV, analyze results, refine approach

For questions or issues, refer to CSV-FIELD-GUIDE.md in /templates/ directory.
