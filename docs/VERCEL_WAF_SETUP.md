# Vercel WAF Setup Guide

This guide helps you set up Vercel's Web Application Firewall (WAF) to block bot traffic and reduce unnecessary ISR writes.

## Why WAF Instead of Middleware?

- **More efficient**: Blocks at the edge before hitting your application
- **Better performance**: No middleware execution overhead
- **Dedicated security layer**: Purpose-built for threat blocking

---

## Step-by-Step Setup Instructions

### 1. Access Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Sign in to your account if needed

### 2. Select Your Project

1. Find and click on your project from the dashboard
2. This will take you to the project overview page

### 3. Navigate to Security Settings

1. Click on the **"Security"** tab in the top navigation
2. In the left sidebar, click on **"Firewall"**

### 4. Create WAF Rules

1. Click the **"Create Rule"** button (top right)
2. Configure each rule using the settings below
3. Save each rule before creating the next

---

## Recommended WAF Rules

Configure these rules **in order of priority** (top to bottom):

### Rule 1: Block Singapore Traffic ⭐ HIGH PRIORITY

| Setting | Value |
|---------|-------|
| **Rule Name** | Block Singapore Bot Traffic |
| **Condition** | Country equals Singapore (SG) |
| **Action** | Deny |
| **Status** | Enabled |

> **Why**: Singapore is a major source of bot traffic affecting ISR writes.

---

### Rule 2: Block WordPress Login Attacks

| Setting | Value |
|---------|-------|
| **Rule Name** | Block WordPress Login Attacks |
| **Condition** | Path contains `wp-login.php` |
| **Action** | Deny |
| **Status** | Enabled |

> **Why**: WordPress login pages are common attack vectors for bots.

---

### Rule 3: Block Environment Config Scraping

| Setting | Value |
|---------|-------|
| **Rule Name** | Block ENV File Access |
| **Condition** | Path contains `.env` |
| **Action** | Deny |
| **Status** | Enabled |

> **Why**: Bots scan for exposed environment files containing secrets.

---

### Rule 4: Block Admin Panel Scraping

| Setting | Value |
|---------|-------|
| **Rule Name** | Block Admin Access Attempts |
| **Condition** | Path contains `admin.php` |
| **Action** | Deny |
| **Status** | Enabled |

> **Why**: Common target for brute force and scraping attacks.

---

### Rule 5: Block XML Config Scraping

| Setting | Value |
|---------|-------|
| **Rule Name** | Block XML Config Access |
| **Condition** | Path contains `config.xml` |
| **Action** | Deny |
| **Status** | Enabled |

> **Why**: Prevents bots from accessing configuration files.

---

## Expected Impact

After implementing these WAF rules, you should see:

| Metric | Expected Improvement |
|--------|---------------------|
| **Edge Requests** | 20-40% reduction |
| **Bot Traffic** | Significant decrease |
| **ISR Writes** | Reduced (targeting the 28k issue) |
| **Server Load** | Lower unnecessary processing |

---

## Testing & Verification

### Verify Rules Are Active

1. Go to **Security → Firewall** in your Vercel dashboard
2. Ensure all rules show status: **"Enabled"**
3. Check the rule order matches the priority above

### Check Blocked Requests

1. In the **Security** tab, view **"Events"** or **"Activity"**
2. Look for blocked requests matching your rules
3. You should see entries with:
   - Rule name that triggered the block
   - Timestamp of the blocked request
   - Source IP and country

### Quick Test (Singapore Rule)

If you have access to a VPN:
1. Connect to a Singapore server
2. Try accessing your site
3. You should be blocked (403 Forbidden)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Legitimate users blocked | Add IP allowlist exceptions |
| Rule not working | Check condition syntax (case-sensitive) |
| Too aggressive | Disable specific rules temporarily |

---

## Next Steps

1. ✅ Set up all 5 rules above
2. ✅ Monitor Security tab for 24-48 hours
3. ✅ Check ISR write metrics in Analytics
4. ✅ Adjust rules based on legitimate traffic patterns

---

## Additional Resources

- [Vercel WAF Documentation](https://vercel.com/docs/security/vercel-waf)
- [Vercel Security Dashboard](https://vercel.com/docs/security)
