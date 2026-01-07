# SEO & Backlink Building Toolkit

## Quick Start Checklist

### 1. Disavow Spammy Backlinks (5 min)
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Navigate to: Links → External Links → Export (for reference)
4. Go to: https://search.google.com/search-console/disavow-links
5. Upload `disavow.txt` from this folder

### 2. Submit to Directories (30-60 min)
Open `directory-tracker.json` and work through the list. Priority order:
1. **Critical**: Google Business, Bing Places, Apple Business Connect
2. **High**: Yellow Pages, Yelp, Product Hunt, LinkedIn, Pinterest
3. **Medium**: Crunchbase, Manta, Pet industry directories
4. **Low**: Smaller directories (do when you have time)

**Pro tip**: Keep NAP (Name, Address, Phone) consistent everywhere.

### 3. Deploy the Calculator (Linkable Asset)
The calculator is at `/pages/tools/cat-litter-calculator.tsx`. After deploying:
- Share on Reddit (r/cats, r/CatAdvice) - genuinely helpful, not spammy
- Submit to pet forums
- Pitch to pet bloggers: "We made a free cat litter cost calculator your readers might find useful"

### 4. Set Up n8n HARO Automation

#### Prerequisites
- n8n instance (self-hosted or n8n.cloud)
- Twitter/X API access (for #journorequest monitoring)
- Google account (for Sheets tracking)
- Anthropic API key (for AI pitch drafting)

#### Setup Steps
1. Import `n8n-haro-workflow.json` into n8n
2. Create credentials:
   - Twitter OAuth2
   - Google Sheets OAuth2
   - Anthropic API
   - SMTP (for email alerts)
   - Slack API (optional)
3. Set up Google Alerts:
   - Go to https://google.com/alerts
   - Create alerts for:
     - `"seeking expert" cat`
     - `"looking for sources" pet`
     - `journalist "pet products"`
     - `#journorequest pet`
   - Set delivery to RSS feed
   - Copy the RSS URL into the workflow
4. Create a Google Sheet with columns:
   - Date, Source, Relevance, Request, Angle, Pitch Draft, Deadline, Journalist, Outlet, URL, Status
5. Update the workflow with your Sheet ID
6. Activate the workflow

---

## File Reference

| File | Purpose |
|------|---------|
| `disavow.txt` | Upload to Google Search Console to disavow spammy backlinks |
| `directory-tracker.json` | List of directories to submit to with tracking |
| `n8n-haro-workflow.json` | n8n automation for monitoring journalist requests |

---

## Backlink Building Strategies

### Immediate (This Week)
- [ ] Upload disavow file
- [ ] Submit to Google Business Profile
- [ ] Submit to Yelp Canada
- [ ] Create LinkedIn company page
- [ ] Submit to Product Hunt (schedule for Tuesday launch)

### Short-term (This Month)
- [ ] Complete all high-priority directory submissions
- [ ] Set up n8n HARO monitoring
- [ ] Respond to 5+ journalist requests
- [ ] Guest post on 1-2 pet blogs

### Ongoing
- [ ] Monitor n8n for opportunities daily
- [ ] Create 1 linkable asset per month (calculators, guides, tools)
- [ ] Build relationships with pet bloggers/influencers

---

## Linkable Asset Ideas

High-value tools that attract natural backlinks:

1. **Cat Litter Calculator** ✅ (Built)
   - Compare costs, types, annual spending

2. **Cat Age Calculator** (Easy to build)
   - Convert cat years to human years with breed adjustments

3. **Litter Box Sizing Guide** (Interactive)
   - Enter cat weight/number → get recommended box size

4. **Cat Health Checklist** (PDF download = email capture)
   - Monthly/yearly health checklist for cat owners

5. **Multi-Cat Household Cost Calculator**
   - Food + litter + vet + supplies annual cost

6. **Cat Breed Compatibility Quiz**
   - Which cat breed fits your lifestyle?

---

## Response Templates for HARO

### Pet Care Expert Template
```
Hi [Journalist Name],

I'm [Your Name], founder of Purrify, a natural pet care company specializing in
activated carbon solutions for cat litter odor control.

[Specific answer to their question - 2-3 sentences]

For context, I've been working in pet care for [X] years and our products are
used by [number] cat owners across Canada. I'd be happy to provide more detail
or quotes on this topic.

Best,
[Your Name]
Founder, Purrify
purrify.ca
```

### Product Expert Template
```
Hi [Journalist Name],

Great question about [topic]. As someone who develops [relevant products],
I can share that [specific insight].

[2-3 sentences of valuable information]

I founded Purrify after experiencing [brief relevant story]. Happy to elaborate
further or provide additional expert quotes.

Best,
[Your Name]
```

---

## Monitoring Your Progress

Check monthly:
- Ahrefs/SEMrush for new backlinks
- Google Search Console for referring domains
- Organic traffic trends

Good signs:
- DR of new links > 30
- Links from relevant sites (pet, home, lifestyle)
- Natural anchor text variation

Bad signs:
- Sudden influx of low-DR links (possible negative SEO)
- All links with same anchor text (unnatural)
- Links from unrelated foreign sites
