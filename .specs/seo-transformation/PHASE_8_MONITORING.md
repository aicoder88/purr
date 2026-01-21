# Phase 8 SEO Monitoring Dashboard

**Start Date**: January 21, 2026
**Feature**: AggregateRating Schema (Star Ratings)
**Pages**: Trial Size, Standard, Family Pack

---

## Quick Links

- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Google Rich Results Status](https://search.google.com/search-console/rich-results)

---

## 1. CTR Baseline (Pre-Deployment)

Record baseline metrics BEFORE star ratings appear in search results.

### Product Page Metrics (Last 28 Days)

**Baseline Data Captured**: January 21, 2026 (Dec 24, 2025 - Jan 21, 2026)

| Page | URL | Impressions | Clicks | CTR | Avg Position |
|------|-----|-------------|--------|-----|--------------|
| Trial Size | /products/trial-size | 43 | 0 | 0.00% | 10.9 |
| Standard | /products/standard | 95 | 0 | 0.00% | 16.2 |
| Family Pack | /products/family-pack | 18 | 0 | 0.00% | 12.9 |
| **TOTAL** | /products/* | **156** | **0** | **0.00%** | **13.3** |

**Site-Wide Comparison** (same period):
- Total Clicks: 57
- Total Impressions: 7,328
- Average CTR: 0.78%
- Average Position: 15.9

**Baseline Insight**: Product pages are getting impressions but 0 clicks. Star ratings should drive first clicks and measurable CTR improvement.

**How to Get This Data**:
1. Go to Search Console → Performance
2. Click "Pages" tab
3. Filter: URL contains "/products/"
4. Set date range: Last 28 days
5. Record impressions, clicks, CTR, position

---

## 2. Weekly Tracking Log

### Week 1 (Jan 21-27, 2026)

**Status**: Monitoring for initial Google crawl

| Date | Action | Notes |
|------|--------|-------|
| Jan 21 | Deployed | Schema live on all 3 products |
| Jan 22 | | |
| Jan 23 | | |
| Jan 24 | | |
| Jan 25 | | |
| Jan 26 | | |
| Jan 27 | Week 1 Review | |

**Week 1 Metrics**:
| Page | Impressions | Clicks | CTR | Position | Star Visible? |
|------|-------------|--------|-----|----------|---------------|
| Trial Size | | | | | ☐ |
| Standard | | | | | ☐ |
| Family Pack | | | | | ☐ |

---

### Week 2 (Jan 28 - Feb 3, 2026)

**Status**: Expecting initial Rich Results

| Date | Action | Notes |
|------|--------|-------|
| Jan 28 | | |
| Jan 29 | | |
| Jan 30 | | |
| Jan 31 | | |
| Feb 1 | | |
| Feb 2 | | |
| Feb 3 | Week 2 Review | |

**Week 2 Metrics**:
| Page | Impressions | Clicks | CTR | Position | Star Visible? |
|------|-------------|--------|-----|----------|---------------|
| Trial Size | | | | | ☐ |
| Standard | | | | | ☐ |
| Family Pack | | | | | ☐ |

---

### Week 3 (Feb 4-10, 2026)

**Week 3 Metrics**:
| Page | Impressions | Clicks | CTR | Position | Star Visible? |
|------|-------------|--------|-----|----------|---------------|
| Trial Size | | | | | ☐ |
| Standard | | | | | ☐ |
| Family Pack | | | | | ☐ |

---

### Week 4 (Feb 11-17, 2026)

**Week 4 Metrics**:
| Page | Impressions | Clicks | CTR | Position | Star Visible? |
|------|-------------|--------|-----|----------|---------------|
| Trial Size | | | | | ☐ |
| Standard | | | | | ☐ |
| Family Pack | | | | | ☐ |

---

## 3. Impact Analysis (After 4 Weeks)

### CTR Change Summary

| Page | Baseline CTR | Week 4 CTR | Change | % Change |
|------|--------------|------------|--------|----------|
| Trial Size | ___% | ___% | +/- ___% | +/- ___% |
| Standard | ___% | ___% | +/- ___% | +/- ___% |
| Family Pack | ___% | ___% | +/- ___% | +/- ___% |

**Expected**: 10-35% CTR increase with star ratings

### Traffic Change Summary

| Page | Baseline Clicks | Week 4 Clicks | Change |
|------|-----------------|---------------|--------|
| Trial Size | ___ | ___ | +/- ___ |
| Standard | ___ | ___ | +/- ___ |
| Family Pack | ___ | ___ | +/- ___ |

---

## 4. Google Search Console Checks

### Daily Quick Check (2 min)
- [ ] Check for new errors in Coverage report
- [ ] Check Rich Results report for warnings

### Weekly Full Review (15 min)
- [ ] Record metrics in tracking log above
- [ ] Check Rich Results → Product status
- [ ] Compare CTR week-over-week
- [ ] Screenshot any star rating appearances
- [ ] Note any ranking changes

### Monthly Deep Dive (30 min)
- [ ] Full CTR impact analysis
- [ ] Conversion rate correlation
- [ ] Update stakeholder report
- [ ] Plan optimizations if needed

---

## 5. How to Check If Stars Are Showing

### Method 1: Incognito Search
1. Open Chrome Incognito (Cmd+Shift+N)
2. Search: `site:purrify.ca cat litter freshener`
3. Look for star ratings under product listings

### Method 2: Mobile Search
1. Search on phone (logged out of Google)
2. Look for star ratings in results

### Method 3: Search Console
1. Go to Enhancements → Product
2. Check for "valid items" count
3. Look for any errors/warnings

---

## 6. Rich Results Status Tracker

### Google Rich Results Report

| Date | Products Valid | Products Invalid | Warnings | Notes |
|------|----------------|------------------|----------|-------|
| Jan 21 | 3 | 0 | 0 | Initial deployment |
| | | | | |
| | | | | |

**How to Check**:
1. Search Console → Enhancements → Product
2. Record valid/invalid counts
3. Click into any issues to investigate

---

## 7. Troubleshooting

### Stars Not Showing After 2 Weeks?

**Step 1**: Verify Schema Still Valid
```
https://search.google.com/test/rich-results?url=https://www.purrify.ca/products/standard
```

**Step 2**: Check Search Console Errors
- Go to Enhancements → Product
- Look for any red errors

**Step 3**: Request Indexing
- Go to URL Inspection
- Enter product URL
- Click "Request Indexing"

**Step 4**: Check Crawl Stats
- Go to Settings → Crawl Stats
- Ensure Googlebot is crawling regularly

### Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| No stars after 2 weeks | Google still processing | Wait another week |
| Intermittent stars | Google A/B testing | Normal, continue monitoring |
| Schema errors | Code changed | Re-run Rich Results Test |
| CTR unchanged | Stars not showing yet | Check search appearance |

---

## 8. Success Metrics

### Target Goals (4 Weeks)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Star ratings visible | All 3 products | | ☐ |
| CTR increase | +10% minimum | | ☐ |
| No schema errors | 0 errors | | ☐ |
| Rich Results valid | 3/3 products | | ☐ |

### Stretch Goals (8 Weeks)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| CTR increase | +25% | | ☐ |
| Conversion rate | +5% | | ☐ |
| Organic traffic | +15% | | ☐ |

---

## 9. Reporting Template

### Weekly Status Update (Copy/Paste)

```
## Phase 8 SEO Update - Week [X]

**Period**: [Date Range]

### Star Rating Status
- Trial Size: [Visible/Not Yet]
- Standard: [Visible/Not Yet]
- Family Pack: [Visible/Not Yet]

### Metrics This Week
| Page | CTR | Change vs Baseline |
|------|-----|-------------------|
| Trial Size | X% | +X% |
| Standard | X% | +X% |
| Family Pack | X% | +X% |

### Notes
- [Any observations]
- [Issues encountered]
- [Actions taken]

### Next Week
- [Planned activities]
```

---

## 10. Contact & Resources

### Quick Reference
- **Schema Implementation**: Commit 634060f
- **Deployment Report**: PHASE_8_PART_3_DEPLOYMENT_REPORT.md
- **QA Report**: PHASE_8_PART_2_QA_REPORT.md

### Google Resources
- [Product Structured Data Guide](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Search Console Help](https://support.google.com/webmasters)

---

**Last Updated**: January 21, 2026
**Next Review**: January 28, 2026 (Week 1 Complete)
