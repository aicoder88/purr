# Satellite Sites Strategy

## Current Situation

You own 9+ domains all linking to Purrify. This creates PBN risk signals.

## Recommended: Consolidate to 2 Sites

### Keep These (Primary Properties)
1. **catlittersmell.com** - Most established (91 links)
2. **reviewcatlitter.com** - Best brandable name for reviews

### 301 Redirect These → catlittersmell.com
- healthycatlitter.com
- ecocatlitters.com
- allnaturalcatlitter.com
- premiumcatlitter.com
- finepinecatlitter.com
- backtobasicscatlitter.com

### Keep Separate (Different Niche)
- crystaldeodorantprotection.com (not cat-related, fine as-is)

---

## Action Plan for Keeper Sites

### catlittersmell.com - Informational Authority Site

**Goal:** Become THE resource for cat litter odor problems

**Content to add (10+ articles):**
1. "Why Does Cat Litter Smell So Bad? The Science Explained"
2. "Best Cat Litters for Odor Control [Tested]"
3. "How Often Should You Change Cat Litter?"
4. "Cat Litter Smell in Apartment: Complete Solution Guide"
5. "DIY Cat Litter Deodorizer Recipes"
6. "Why Does My Cat's Pee Smell Like Ammonia?"
7. "Covered vs Uncovered Litter Box: Which Smells Less?"
8. "Best Air Purifiers for Cat Litter Smell"
9. "How to Get Cat Litter Smell Out of Carpet"
10. "Multi-Cat Household Odor Solutions"

**Purrify mentions:**
- ONE "products we use" page
- Branded anchor: "Purrify" or "purrify.ca"
- Can be dofollow (you own both sites, it's natural)

**Build independent authority:**
- Submit to pet blogger roundups
- Answer questions on Reddit r/cats, r/CatAdvice (link to articles, not Purrify)
- Get listed in pet resource directories

---

### reviewcatlitter.com - Review/Comparison Site

**Goal:** Genuine cat litter review site that happens to recommend Purrify

**Content structure:**
1. Homepage: "We Test Cat Litters So You Don't Have To"
2. Category pages: Clumping, Crystal, Natural, Budget
3. Individual reviews: 15-20 litter brand reviews
4. Comparison posts: "X vs Y: Which Is Better?"
5. Best-of lists: "Best Clumping Litter 2026"

**Purrify mentions:**
- Review Purrify honestly alongside competitors
- Include in relevant "best of" lists
- Don't make it #1 in every list (looks fake)

**Credibility signals:**
- Show testing methodology
- Include photos of actual products
- Update reviews with dates
- Respond to comments

---

## Link Profile Cleanup

### Current Problem: Over-optimized Anchors

If all 91 links from catlittersmell.com use "cat litter deodorizer" anchor text, that's a red flag.

### Fix: Diversify Anchor Text

| Anchor Type | % Target | Examples |
|-------------|----------|----------|
| Brand | 40% | "Purrify", "Purrify Canada" |
| URL | 20% | "purrify.ca", "www.purrify.ca" |
| Generic | 20% | "this product", "check it out", "learn more" |
| Partial match | 15% | "their litter deodorizer", "activated carbon option" |
| Exact match | 5% | "cat litter deodorizer" (minimal!) |

---

## Technical Setup

### Hosting
Don't host all sites on the exact same server/IP. Options:
- Different Vercel projects
- Mix of Netlify, Vercel, Cloudflare Pages
- Different shared hosting accounts

### Design
Each site should look distinct:
- Different themes/templates
- Different color schemes
- Different logos

### WHOIS
If domains have WHOIS privacy, you're fine. If public, having same registrant is actually OK for legitimate businesses (Amazon owns many domains publicly).

---

## 301 Redirect Implementation

For domains you're consolidating, add this to their DNS/hosting:

```
# Redirect entire domain to catlittersmell.com
healthycatlitter.com/* → 301 → catlittersmell.com
```

Or if using Vercel/Netlify, configure redirects in their dashboard.

**Important:** Keep domain registration active for at least 1 year after redirect so the 301 passes link equity.

---

## Timeline

### Week 1
- [ ] Audit current anchor text distribution on all sites
- [ ] Set up 301 redirects for domains being consolidated
- [ ] Remove excessive Purrify links from keeper sites (reduce to 1-2 per site)

### Week 2-4
- [ ] Add 5 genuine content pieces to catlittersmell.com
- [ ] Add 5 genuine content pieces to reviewcatlitter.com
- [ ] Diversify anchor text on remaining links

### Month 2-3
- [ ] Build independent backlinks to catlittersmell.com
- [ ] Continue content production
- [ ] Monitor rankings for any negative impact

---

## What NOT to Do

❌ Interlink all your sites to each other (network footprint)
❌ Use same Google Analytics/Search Console account for all
❌ Publish thin/duplicate content
❌ Use exact-match anchors for all Purrify links
❌ Create new satellite sites (you have enough)
