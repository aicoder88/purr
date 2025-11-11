# Deployment Checklist

## Pre-Deployment

### 1. Environment Variables
Set these in Vercel project settings:

```env
# Required for AI Content Generation
OPENAI_API_KEY=sk-...
UNSPLASH_ACCESS_KEY=...

# Required for Automation
CRON_SECRET=your-secure-random-string
WEBHOOK_SECRET=your-secure-random-string
ENABLE_CRON_AUTOMATION=true
ENABLE_WEBHOOK_AUTOMATION=true

# Required for Authentication
NEXTAUTH_SECRET=your-secure-random-string
NEXTAUTH_URL=https://purrify.ca

# Optional: Database (if using)
DATABASE_URL=postgresql://...
```

### 2. Local Testing
- [ ] Run type check: `npm run check-types`
- [ ] Run build: `npm run build`
- [ ] Test locally: `npm run dev`
- [ ] Visit blog: http://localhost:3000/blog
- [ ] Visit a post: http://localhost:3000/blog/activated-carbon-litter-additive-benefits
- [ ] Check admin: http://localhost:3000/admin/blog

### 3. Migration Verification
- [ ] Verify all 14 posts migrated: `ls -la content/blog/en/`
- [ ] Check backup exists: `ls -la pages/blog/archive/`
- [ ] Review migration report: `docs/BLOG_MIGRATION_REPORT.md`

## Deployment

### 4. Deploy to Vercel
```bash
# Build for production
npm run build

# Deploy
vercel --prod

# Or push to main (auto-deploy)
git push origin main
```

### 5. Post-Deployment Verification
- [ ] Visit production site: https://purrify.ca
- [ ] Check blog listing: https://purrify.ca/blog
- [ ] Test a blog post: https://purrify.ca/blog/activated-carbon-litter-additive-benefits
- [ ] Verify SEO metadata (view source)
- [ ] Check structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test category pages: https://purrify.ca/blog/category/odor-control
- [ ] Test tag pages: https://purrify.ca/blog/tag/cat-litter-deodorizer

### 6. Webhook Testing
Test the webhook endpoint:

```bash
# Test Generate Mode
curl -X POST https://purrify.ca/api/webhooks/generate-blog-post \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-webhook-secret",
    "mode": "generate",
    "topic": "Test Blog Post - Delete Me",
    "keywords": ["test"]
  }'

# Expected: 200 response with post URL
# Then delete the test post from content/blog/en/
```

### 7. Sitemap Update
- [ ] Regenerate sitemap: `npm run generate-enhanced-sitemap`
- [ ] Verify sitemap: https://purrify.ca/sitemap.xml
- [ ] Check blog sitemap: https://purrify.ca/sitemap-blog.xml
- [ ] Submit to Google Search Console

### 8. Make.com Setup
- [ ] Create HTTP module in Make.com
- [ ] Configure webhook URL
- [ ] Add authentication (secret)
- [ ] Test with manual trigger
- [ ] Verify post appears on site
- [ ] Enable automation

## Monitoring

### 9. Analytics Setup
- [ ] Verify Google Analytics tracking
- [ ] Check Google Search Console
- [ ] Monitor Vercel function logs
- [ ] Set up error alerts

### 10. Performance Check
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify image optimization
- [ ] Test page load speed

## Post-Launch

### 11. Content Verification (First 24 Hours)
- [ ] Monitor first automated post (cron)
- [ ] Check for any errors in logs
- [ ] Verify SEO metadata
- [ ] Check social media sharing
- [ ] Test internal links

### 12. Backup & Rollback Plan
- [ ] Original files backed up: `pages/blog/archive/`
- [ ] Git history available for rollback
- [ ] Document rollback procedure
- [ ] Keep backup for 30 days

### 13. Documentation Review
- [ ] Team knows how to use webhook
- [ ] Make.com scenario documented
- [ ] Environment variables documented
- [ ] Troubleshooting guide available

## Success Criteria

✅ All blog posts accessible  
✅ SEO metadata correct  
✅ Images loading properly  
✅ Webhook responding correctly  
✅ No TypeScript errors  
✅ No console errors  
✅ Lighthouse score > 90  
✅ Sitemap updated  
✅ Search Console verified  

## Rollback Procedure

If issues are discovered:

1. **Immediate**: Disable webhook automation
   ```env
   ENABLE_WEBHOOK_AUTOMATION=false
   ```

2. **If needed**: Restore old blog files
   ```bash
   cp pages/blog/archive/*.tsx pages/blog/
   git add pages/blog/*.tsx
   git commit -m "Rollback: restore original blog files"
   git push origin main
   ```

3. **Investigate**: Check logs and fix issues

4. **Re-deploy**: Once fixed, deploy again

## Support Contacts

- **Vercel Support**: https://vercel.com/support
- **Make.com Support**: https://www.make.com/en/help
- **Documentation**: `docs/` folder

## Notes

- Keep this checklist updated
- Document any issues encountered
- Share learnings with team
- Update environment variables as needed

---

**Last Updated**: November 10, 2024  
**Version**: 1.0.0
