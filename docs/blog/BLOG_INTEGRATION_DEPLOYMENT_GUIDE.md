# Blog System Integration & Deployment Guide

**Quick Reference for Getting Everything Working in Production**

## ⚠️ CRITICAL FIX APPLIED

**500 Error Fixed**: Blog storage has been switched from file-based to database-backed storage to work on Vercel's serverless environment. See `BLOG_500_ERROR_FIX.md` for details.

## 🎯 Goal

Get all recently built blog features integrated, tested, and deployed to production on Vercel.

## 📋 What's Been Built

- ✅ Edit Post Functionality
- ✅ Media Library System
- ✅ Enhanced Auto-save
- ✅ Bulk Operations
- ✅ Content Scheduling
- ✅ Revision History
- ✅ Category & Tag Management
- ✅ Analytics Dashboard
- ✅ AI Content Generation
- ✅ SEO Enhancements

## 🚀 Fast Track Deployment (7-12 hours)

### Step 1: Environment Setup (2 hours)

#### 1.1 Generate Required Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate CRON_SECRET
openssl rand -base64 32
```

#### 1.2 Add to Vercel Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required:**
```
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=https://purrify.ca
DATABASE_URL=<your-postgresql-url>
CRON_SECRET=<generated-secret>
```

**Optional (AI Features):**
```
ANTHROPIC_API_KEY=sk-ant-xxx
FAL_API_KEY=xxx
UNSPLASH_ACCESS_KEY=xxx
```

**Optional (Analytics):**
```
GA4_PROPERTY_ID=xxx
GA4_CLIENT_EMAIL=xxx
GA4_PRIVATE_KEY=xxx
```

#### 1.3 Update vercel.json

Add cron job configuration:

```json
{
  "crons": [
    {
      "path": "/api/cron/generate-blog-post",
      "schedule": "0 0 */3 * *"
    },
    {
      "path": "/api/cron/publish-scheduled-posts",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/cleanup-old-revisions",
      "schedule": "0 2 * * 0"
    }
  ],
  "functions": {
    "pages/api/admin/blog/**/*.ts": {
      "maxDuration": 30
    },
    "pages/api/cron/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

### Step 2: Pre-Deployment Checks (1 hour)

```bash
# Type check
npm run check-types

# Lint
npm run lint

# Build
npm run build

# Test locally
npm run start
# Visit http://localhost:3000/admin/blog
```

### Step 3: Deploy (1 hour)

```bash
# Commit changes
git add .
git commit -m "feat: integrate blog system features for production"
git push origin main

# Vercel will auto-deploy, or use CLI:
vercel --prod
```

### Step 4: Post-Deployment Verification (2 hours)

#### 4.1 Basic Smoke Tests

1. **Visit Site**: https://purrify.ca
2. **Login to Admin**: https://purrify.ca/admin/blog
3. **Create Test Post**:
   - Click "New Post"
   - Add title and content
   - Wait for auto-save (30 seconds)
   - Verify "Saved at HH:MM:SS" appears
   - Click "Publish"
4. **Test Media Library**:
   - Go to Media tab
   - Verify images load
   - Click an image to see usage
5. **Test Bulk Operations**:
   - Select 2-3 posts
   - Click "Change Status"
   - Select "Draft"
   - Verify success message
6. **Test Scheduling**:
   - Go to Schedule tab
   - Verify calendar loads
   - Create scheduled post

#### 4.2 Verify Cron Jobs

In Vercel Dashboard:
1. Go to Cron Jobs section
2. Verify 3 cron jobs are listed
3. Check execution logs
4. Manually trigger one to test

#### 4.3 Check Logs

In Vercel Dashboard:
1. Go to Logs
2. Filter by "Error"
3. Verify no critical errors
4. Check function execution times

### Step 5: Monitor (24 hours)

- Watch error rates in Vercel
- Monitor performance metrics
- Check cron job executions
- Respond to any issues

## 🔧 Troubleshooting

### Issue: Cron Jobs Not Running

**Solution:**
1. Check CRON_SECRET is set in Vercel
2. Verify cron paths in vercel.json
3. Check function logs for errors
4. Manually trigger via Vercel dashboard

### Issue: Auto-save Not Working

**Solution:**
1. Check browser console for errors
2. Verify API endpoint responding
3. Check localStorage permissions
4. Test with different content

### Issue: Media Library Empty

**Solution:**
1. Verify `public/optimized/` has images
2. Check `content/media-library.json` exists
3. Run image optimization: `npm run optimize-images:enhanced`
4. Refresh media library page

### Issue: AI Generation Fails

**Solution:**
1. Check ANTHROPIC_API_KEY is set
2. Verify API key is valid
3. Check API quota/limits
4. Review error message in UI

### Issue: Analytics Not Showing Data

**Solution:**
1. Analytics uses mock data initially
2. To enable real data, set GA4 environment variables
3. Wait 24-48 hours for data to populate
4. Check GA4 property configuration

## 📊 Success Metrics

After deployment, verify:

- ✅ Site loads in < 2 seconds
- ✅ Admin dashboard accessible
- ✅ Can create/edit posts
- ✅ Auto-save works within 30 seconds
- ✅ Media library displays images
- ✅ Bulk operations complete successfully
- ✅ Cron jobs execute on schedule
- ✅ No errors in Vercel logs
- ✅ Performance metrics acceptable

## 🔄 Rollback Procedure

If critical issues occur:

1. **Immediate Rollback**:
   - Go to Vercel Dashboard
   - Deployments tab
   - Find previous stable deployment
   - Click "Promote to Production"

2. **Verify Rollback**:
   - Check site is accessible
   - Test critical features
   - Monitor error rates

3. **Investigate**:
   - Review deployment logs
   - Check error reports
   - Identify root cause

4. **Fix and Redeploy**:
   - Fix issues in development
   - Test thoroughly
   - Deploy again

## 📚 Additional Resources

### Documentation
- **Full Spec**: `.kiro/specs/blog-system-integration-deployment/`
- **Implementation Summary**: `docs/BLOG_IMPLEMENTATION_FINAL_SUMMARY.md`
- **AI Setup**: `docs/BLOG_AI_API_SETUP.md`
- **Vercel Setup**: `docs/VERCEL_ENV_SETUP.md`

### Code Locations
- **Components**: `src/components/admin/`
- **Services**: `src/lib/blog/`
- **API Routes**: `pages/api/admin/blog/`
- **Cron Jobs**: `pages/api/cron/`

### External Links
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Anthropic Console](https://console.anthropic.com/)
- [Google Analytics](https://analytics.google.com/)

## 🎉 Post-Launch

After successful deployment:

1. **Announce to Team**: Let everyone know the new features are live
2. **User Training**: Share user guides with content creators
3. **Monitor Closely**: Watch for 24-48 hours
4. **Collect Feedback**: Gather user feedback on new features
5. **Iterate**: Plan improvements based on usage

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review detailed spec in `.kiro/specs/blog-system-integration-deployment/`
3. Check Vercel logs for specific errors
4. Review implementation docs in `docs/`

---

**Last Updated**: November 11, 2025  
**Status**: Ready for Deployment  
**Estimated Time**: 7-12 hours for fast track
