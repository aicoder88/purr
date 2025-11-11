# Blog System Deployment Checklist

**Use this checklist to ensure a smooth deployment to production**

## ✅ Pre-Deployment Completed

The following tasks have been completed automatically:

- [x] Environment configuration system created
- [x] Storage verification system created
- [x] Health check API endpoint created
- [x] Vercel.json updated with cron jobs
- [x] Security headers configured
- [x] TypeScript errors in new code fixed
- [x] All new files validated

## 📋 What You Need to Do

### 1. Generate Secrets (5 minutes)

Run these commands to generate secure secrets:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate CRON_SECRET  
openssl rand -base64 32
```

Save these values - you'll need them in the next step.

### 2. Add Environment Variables to Vercel (10 minutes)

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

#### Required Variables

Add these for all environments (Production, Preview, Development):

```
NEXTAUTH_SECRET=<paste-generated-secret-here>
NEXTAUTH_URL=https://purrify.ca
DATABASE_URL=<your-existing-postgresql-url>
CRON_SECRET=<paste-generated-secret-here>
```

#### Optional Variables (Recommended)

For AI content generation:
```
ANTHROPIC_API_KEY=<your-claude-api-key>
```

Get your Claude API key at: https://console.anthropic.com/

For AI image generation:
```
FAL_API_KEY=<your-fal-api-key>
```

Get your fal.ai API key at: https://fal.ai/

#### Optional Variables (Nice to Have)

For real analytics (currently using mock data):
```
GA4_PROPERTY_ID=<your-ga4-property-id>
GA4_CLIENT_EMAIL=<your-service-account-email>
GA4_PRIVATE_KEY=<your-service-account-private-key>
```

For error monitoring:
```
SENTRY_DSN=<your-sentry-dsn>
```

For email alerts:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your-email>
SMTP_PASS=<your-app-password>
ALERT_EMAIL=<admin-email>
```

### 3. Run Pre-Deployment Checks (5 minutes)

```bash
# Type check (should pass - pre-existing errors are okay)
npm run check-types

# Lint
npm run lint

# Build
npm run build

# Test locally
npm run start
# Visit http://localhost:3000/admin/blog and test features
```

### 4. Deploy to Production (5 minutes)

```bash
# Commit all changes
git add .
git commit -m "feat: integrate blog system features for production deployment"

# Push to trigger Vercel deployment
git push origin main
```

Or deploy directly:
```bash
vercel --prod
```

### 5. Post-Deployment Verification (15 minutes)

#### Basic Smoke Tests

1. **Visit Site**: https://purrify.ca
   - [ ] Site loads successfully
   - [ ] No console errors

2. **Login to Admin**: https://purrify.ca/admin/blog
   - [ ] Can login successfully
   - [ ] Admin dashboard loads

3. **Create Test Post**:
   - [ ] Click "New Post"
   - [ ] Add title: "Test Post - Delete Me"
   - [ ] Add content with formatting
   - [ ] Wait 30 seconds for auto-save
   - [ ] Verify "Saved at HH:MM:SS" appears
   - [ ] Click "Publish"
   - [ ] Post appears in list

4. **Test Media Library**:
   - [ ] Click "Media" tab
   - [ ] Images load in grid view
   - [ ] Can search for images
   - [ ] Click image to see usage info

5. **Test Bulk Operations**:
   - [ ] Select 2-3 posts with checkboxes
   - [ ] Click "Change Status" dropdown
   - [ ] Select "Draft"
   - [ ] Click "Apply"
   - [ ] Verify success message
   - [ ] Posts updated to draft

6. **Test Scheduling**:
   - [ ] Click "Schedule" tab
   - [ ] Calendar loads
   - [ ] Can see scheduled posts (if any)

7. **Test Analytics**:
   - [ ] Click "Analytics" tab
   - [ ] Dashboard loads with metrics
   - [ ] Can change date range
   - [ ] Can export CSV

#### Verify Cron Jobs

In Vercel Dashboard:
1. Go to **Cron Jobs** section
2. Verify 3 cron jobs are listed:
   - [ ] `generate-blog-post` (every 3 days at noon)
   - [ ] `publish-scheduled-posts` (every hour)
   - [ ] `cleanup-old-revisions` (weekly on Sunday at 2am)
3. Check execution logs
4. Manually trigger one to test

#### Check Logs

In Vercel Dashboard → Logs:
1. Filter by "Error"
2. [ ] No critical errors
3. [ ] Function execution times reasonable
4. [ ] No timeout errors

#### Test Health Endpoint

```bash
curl https://purrify.ca/api/health/storage
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "checks": {
    "directories": { "status": "ok", ... },
    "fileOperations": { "status": "ok", ... },
    "jsonFiles": { "status": "ok", ... }
  }
}
```

### 6. Monitor for 24 Hours

- [ ] Check error rates in Vercel dashboard
- [ ] Monitor performance metrics
- [ ] Verify cron jobs execute on schedule
- [ ] Respond to any issues immediately

## 🚨 Rollback Procedure

If critical issues occur:

1. **Immediate Rollback**:
   - Go to Vercel Dashboard
   - Click "Deployments" tab
   - Find previous stable deployment
   - Click "..." menu → "Promote to Production"

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

## 📊 Success Criteria

After deployment, verify:

- [ ] Site loads in < 2 seconds
- [ ] Admin dashboard accessible
- [ ] Can create/edit posts
- [ ] Auto-save works within 30 seconds
- [ ] Media library displays images
- [ ] Bulk operations complete successfully
- [ ] Cron jobs execute on schedule
- [ ] No errors in Vercel logs
- [ ] Performance metrics acceptable

## 🎉 Post-Launch

After successful deployment:

1. **Announce to Team**: Let everyone know the new features are live
2. **User Training**: Share user guides with content creators
3. **Monitor Closely**: Watch for 24-48 hours
4. **Collect Feedback**: Gather user feedback on new features
5. **Iterate**: Plan improvements based on usage

## 📚 Documentation References

- **Quick Guide**: `docs/BLOG_INTEGRATION_DEPLOYMENT_GUIDE.md`
- **Status Report**: `docs/BLOG_SYSTEM_STATUS.md`
- **Roadmap**: `docs/DEPLOYMENT_ROADMAP.md`
- **Full Spec**: `.kiro/specs/blog-system-integration-deployment/`
- **AI Setup**: `docs/BLOG_AI_API_SETUP.md`
- **Vercel Setup**: `docs/VERCEL_ENV_SETUP.md`

## 🆘 Need Help?

1. Check the troubleshooting section in `docs/BLOG_INTEGRATION_DEPLOYMENT_GUIDE.md`
2. Review Vercel logs for specific errors
3. Check health endpoint: `https://purrify.ca/api/health/storage`
4. Review implementation docs in `docs/`

---

**Last Updated**: November 11, 2025  
**Status**: Ready for Deployment  
**Estimated Time**: 40 minutes + 24 hours monitoring
