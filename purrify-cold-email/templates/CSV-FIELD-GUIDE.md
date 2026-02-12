# CSV Template Field Guide

## Overview

This CSV template is designed to store all prospect information needed for personalized cold email outreach. Each field can be used as a merge tag in email templates.

---

## Field Definitions

### Core Identification Fields

**ContactID** (Required)
- Unique identifier for each contact
- Format: Sequential numbers (1, 2, 3, etc.)
- Used for tracking and deduplication

**FirstName** (Required)
- Owner or primary contact's first name
- Used in: {{FirstName}} merge tag
- Example: "John", "Sarah", "Michael"

**LastName** (Required)
- Owner or primary contact's last name
- Used for formal communications if needed
- Example: "Smith", "Johnson", "Williams"

**Email** (Required)
- Primary email address for outreach
- Format: valid email address
- Example: "owner@petstore.com"

---

### Business Information Fields

**StoreName** (Required)
- Official business name
- Used in: {{StoreName}} merge tag
- Example: "Paws & Claws Pet Supply", "The Pet Emporium"
- **Important:** Use exact name as it appears on Google/website

**StoreType** (Optional)
- Business classification
- Options:
  - "Independent" - Single location, owner-operated
  - "Small Chain" - 2-5 locations
  - "Regional Chain" - 6-15 locations
  - "Franchise" - Franchised location
- Used for: Filtering and targeting strategy
- Example: "Independent", "Small Chain"

**City** (Required)
- City where primary location is based
- Used in: {{City}} merge tag
- Example: "Toronto", "Vancouver", "Seattle"
- **Important:** Use official city name, not abbreviations

**Province** (Required for Canada)
- Canadian province abbreviation
- Used in: {{Province}} merge tag
- Format: Two-letter code (ON, BC, AB, etc.)
- Leave blank for US contacts

**State** (Required for USA)
- US state abbreviation
- Used in: {{State}} merge tag
- Format: Two-letter code (WA, OR, CA, etc.)
- Leave blank for Canadian contacts

**Country** (Required)
- Country name
- Options: "Canada", "USA"
- Used for: Routing and regional messaging

---

### Business Details Fields

**EstimatedSize** (Optional)
- Store size estimation
- Options:
  - "Small" - < 1,500 sq ft, 1-3 employees
  - "Medium" - 1,500-3,000 sq ft, 4-8 employees
  - "Large" - > 3,000 sq ft, 9+ employees
- Used for: Tailoring pitch (inventory capacity, budget)
- Example: "Medium"

**Specialty** (Optional)
- Store's specialty or focus area
- Examples:
  - "Organic/Natural Products"
  - "Cat-focused"
  - "Full-service"
  - "Premium products"
  - "Local/artisan"
  - "Budget-friendly"
- Used for: Customizing value proposition
- **Tip:** Check website/reviews for this information

---

### Contact Information Fields

**Phone** (Optional)
- Primary business phone
- Format: XXX-XXX-XXXX or (XXX) XXX-XXXX
- Example: "416-555-0100"
- Used for: Follow-up after email engagement

**Website** (Optional)
- Store website URL
- Format: Full URL with http:// or https://
- Example: "https://www.example.com"
- Used for: Research and verification

**GoogleRating** (Optional)
- Current Google Business rating
- Format: Decimal number (0.0 to 5.0)
- Example: "4.5", "4.2"
- Used for: Identifying reputation concerns (mention if low)

**LinkedInURL** (Optional)
- LinkedIn profile or company page
- Format: Full LinkedIn URL
- Example: "https://linkedin.com/company/example"
- Used for: Additional research and personalization

---

### Tracking & Status Fields

**Notes** (Optional)
- Any relevant notes about the prospect
- Examples:
  - "Near downtown - high foot traffic"
  - "Owner mentioned odor issues on Reddit"
  - "Competitor nearby carries similar products"
  - "Strong online presence, active Instagram"
- Used for: Personalization and context

**Status** (Required)
- Current status in sales pipeline
- Options:
  - "Prospect" - Not yet contacted
  - "Contacted" - Initial email sent
  - "Engaged" - Replied or opened multiple times
  - "Call Scheduled" - Meeting booked
  - "Sample Sent" - Product sample shipped
  - "Customer" - Placed order
  - "Not Interested" - Declined
  - "Not a Fit" - Doesn't meet criteria
  - "On Hold" - Follow up later
- Example: "Prospect"

**LastContactDate** (Optional)
- Date of most recent outreach
- Format: YYYY-MM-DD
- Example: "2025-01-15"
- Used for: Tracking follow-up timing

**FollowUpDate** (Optional)
- Scheduled next contact date
- Format: YYYY-MM-DD
- Example: "2025-01-22"
- Used for: CRM follow-up reminders

**EmailSequenceStage** (Optional)
- Current position in email sequence
- Options:
  - "1" - Initial email
  - "2" - Value-add email (Day 4)
  - "3" - Social proof email (Day 8)
  - "4" - Different angle email (Day 15)
  - "5" - Breakup email (Day 22)
  - "Complete" - Finished sequence
  - "Paused" - Sequence paused (requested by prospect)
- Example: "1"

---

## Data Collection Best Practices

### Where to Find This Information:

**1. Google Business Profile**
- StoreName (exact official name)
- City, Province/State
- GoogleRating
- Phone
- Website
- Photos (can estimate store size)

**2. Website**
- Email (often on Contact page)
- StoreName (confirm exact spelling)
- Specialty (look for "About Us" or product focus)
- EstimatedSize (if they mention sq ft or show photos)

**3. LinkedIn**
- FirstName, LastName (search for owner)
- LinkedInURL
- Business history and background

**4. Google Reviews**
- Notes (customers mention specific pain points)
- GoogleRating
- Specialty (reviewers mention store focus)

**5. Social Media (Facebook, Instagram)**
- Photos of store interior (EstimatedSize)
- Owner name (FirstName, LastName)
- Specialty (posts focus on certain products)
- Notes (engagement style, customer complaints)

**6. Local Business Directories**
- Yelp, Yellow Pages
- Verify contact information
- Additional reviews and notes

---

## Merge Tag Reference

When writing emails, use these merge tags for personalization:

| Merge Tag | CSV Field | Example Output |
|-----------|-----------|----------------|
| {{FirstName}} | FirstName | "John" |
| {{LastName}} | LastName | "Smith" |
| {{StoreName}} | StoreName | "Paws & Claws Pet Supply" |
| {{City}} | City | "Toronto" |
| {{Province}} | Province | "ON" |
| {{State}} | State | "WA" |
| {{Specialty}} | Specialty | "Organic/Natural Products" |
| {{GoogleRating}} | GoogleRating | "4.5" |

---

## Sample Complete Entry

```csv
ContactID,FirstName,LastName,Email,StoreName,StoreType,City,Province,State,Country,EstimatedSize,Specialty,Phone,Website,GoogleRating,LinkedInURL,Notes,Status,LastContactDate,FollowUpDate,EmailSequenceStage
42,Jennifer,Thompson,jennifer@naturalpaws.ca,Natural Paws Pet Boutique,Independent,Ottawa,ON,,Canada,Small,Organic/Natural,613-555-0987,https://naturalpaws.ca,4.8,https://linkedin.com/in/jenniferthompson,"Owner very active on Instagram (5K followers). Reviews mention great customer service but some complaints about store smell. Located in trendy Glebe neighborhood - eco-conscious customers. Perfect fit for natural angle.",Prospect,,,1
```

---

## Tips for Data Quality

**✓ DO:**
- Use consistent formatting (especially for phone numbers)
- Keep notes concise but specific
- Update Status field regularly
- Use exact business names (as they appear officially)
- Verify email addresses before importing
- Research specialty/focus before outreach

**✗ DON'T:**
- Use nicknames in FirstName field
- Abbreviate City names
- Mix Province/State (use one or the other)
- Leave Email field blank
- Forget to update LastContactDate after sends
- Include personal email addresses for business owners

---

## Recommended Workflow

1. **Identify targets** via Google Maps, business directories
2. **Research each business** (10-15 minutes per prospect)
3. **Fill out CSV** with all available information
4. **Prioritize contacts** based on fit (mark high-priority in Notes)
5. **Import to email tool** or use merge script
6. **Send emails** with personalization
7. **Update Status** and tracking fields after each interaction
8. **Maintain data hygiene** - clean and deduplicate regularly

---

## Data Segmentation Ideas

Segment your CSV for targeted campaigns:

**By Size:**
- Small stores: Emphasize easy implementation, low minimum order
- Large stores: Emphasize volume pricing, category growth

**By Specialty:**
- Natural/Organic stores: Lead with eco-friendly coconut carbon
- Cat-focused stores: Emphasize cat-specific benefits
- Full-service stores: Focus on competitive differentiation

**By Geography:**
- Same city: "I'm meeting with stores in [City] next week"
- Same province/state: "20+ stores across [Province] now carry this"
- High-density areas: Emphasize apartment dweller market

**By Status:**
- High GoogleRating: "Your reputation is excellent - let's maintain it"
- Low GoogleRating: "I noticed reviews mention smell - we can help"
- No rating: Standard pitch without reputation angle

---

## Integration with Email Script

The Python merge script (see `scripts/email-merge.py`) will:
1. Read this CSV file
2. Match merge tags in email templates
3. Generate personalized emails for each contact
4. Track which template was used
5. Log send dates and status updates

See `scripts/README.md` for technical details on running the merge script.
