# City Sales Activation Playbook

## 1. Lead Capture & CRM Handoff
- **Source event:** `view_city_page` fires on every location load; `generate_lead` fires once the modal form confirms.
- **Data to ingest:** read `reports/city-leads-log.json` or pipe the `/api/leads/city` payload into your ESP/CRM. Each record includes `citySlug`, `cityName`, `province`, `marketingConsent`, and the top scent pain point.
- **Workflow:**
  1. Map `citySlug` to a custom field to personalise nurture emails.
  2. Tag leads with `channel=city_page` for reporting.
  3. Auto-create a deal in the sales pipeline with stage `Sample Requested`.

## 2. Seven-Day Email Sprint (use Liquid/Handlebars tokens)
| Day | Objective | Key Message |
| --- | --- | --- |
| 0 | Confirm & deliver offer | Subject: `Your {{cityName}} litter odor blueprint + 12g trial`. Recap the main scent pain point (`{{scentFocus}}`) and link the sample CTA + FAQ.
| 2 | Social proof | Share two testimonials from `cityOdorProfiles` + local stats (population label) and include a CTA to order the trial size.
| 3 | Education | Short video/GIF showing Purrify usage in `{{housingHighlight}}`; remind them of free shipping across `{{provinceName}}`.
| 4 | Retail tie-in | Highlight recommended retailers (`{{retailerAllies}}`) and include a “Ask your store to stock Purrify” script.
| 5 | Objection handling | FAQ style email addressing `{{scentFocus}}` plus refill cadence tips.
| 6 | Urgency close | Subject: `Last chance for your {{cityName}} fresh air kit`. Add a time-bound bonus (e.g., free scoop) and CTA back to `/products/trial-size`.

**ESP Setup**
- Trigger: API/Webhook ingest from `/api/leads/city` with marketing consent.
- Suppression: remove users who reached the checkout event (listen for GA4 `begin_checkout` or Shopify webhook) during the sequence.
- Localisation: swap copy blocks based on `provinceCode`; fallback to generic Canadian messaging.

## 3. Remarketing Audiences
### GA4
1. Create custom dimension `city_slug` (event scope) capturing `event_parameter.city_slug`.
2. Audience A (warm): Include `event_name = "view_city_page"` with the parameter `city_slug` populated AND exclude `add_to_cart` within 7 days.
3. Audience B (hot): Include `event_name = "generate_lead"` and `marketing_consent = true` for cross-channel follow-up.

### Meta (Facebook/Instagram)
- Build a website custom audience using GA4 → Ads Manager integration (or GTM). Source event `generate_lead` with parameter `city_slug`.
- Creative rules: headline `Stop {City} Litter Smell`, carousel card 1 = benefit, card 2 = testimonial, card 3 = free shipping promise.

## 4. Paid Media Creative Checklist
- Asset bank: 1080×1080 product hero, testimonial quotes, “Before/After” graphic.
- Copy variations (carousel text): `{{cityName}} condos`, `{{provinceName}} winters`, `Multi-cat households`.
- UTM structure: `utm_source=meta&utm_medium=paid&utm_campaign=city-{citySlug}&utm_content={adVariant}`.

## 5. Retailer Outreach Kit
1. **One-sheet** (share via Google Doc) – include bullet points from `cityOdorProfiles.retailerAllies`, climate considerations, and the consumer CTA.
2. **Email Script:**
   ```
   Subject: {City} cat parents keep asking for Purrify

   Hi {Retailer},

   We’re helping {cityName} cat owners eliminate litter odor without fragrances. Local customers tell us {scentFocus} is the biggest headache. Let’s stock Purrify so they buy from you.

   • Free sample cases to test sell-through
   • Social shoutouts featuring your store
   • Carbon-neutral Canadian shipping in 2-3 days

   Can we set up a 15-minute call this week?

   Thanks,
   {{Your Name}}
   ```
3. **Follow-up cadence:** Day 3 quick reminder, Day 7 success story, Day 14 new testimonial.

## 6. KPIs & Dashboards
- **Core metrics:** leads captured (per city), sample-to-purchase conversion %, subscription attach rate.
- **Reporting cadence:**
  - Daily: lead volume by `citySlug` from the API log or CRM.
  - Weekly: GA4 conversions from audiences + ESP click rate.
  - Monthly: retailer signups by province.
- **Tooling:** feed `reports/search-console-filters.json` into Looker Studio for keyword monitoring; merge with lead data to prioritise cities.

## 7. Next Engineering Tasks
- Sync `/api/leads/city` with your ESP webhook (e.g., Klaviyo, Customer.io).
- Extend the modal to show a Calendly link for VIP demos (optional).
- Automate Slack alerts when a new lead arrives for high-priority metros (Toronto, Vancouver, Montreal).
