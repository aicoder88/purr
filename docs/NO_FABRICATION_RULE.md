# NO FABRICATION RULE

## CRITICAL: Never Fabricate Contact Info, Paths, or Branding

**When writing code, content, or documentation, you must VERIFY before using ANY of the following:**

### 🚫 NEVER Fabricate These Without Verification:

#### Contact Information
- ❌ Phone numbers (even placeholder ones like 1-800-XXX-XXXX)
- ❌ Email addresses (hello@, support@, info@, etc.)
- ❌ Physical addresses
- ❌ Contact forms or support URLs

#### Branding & Social Media
- ❌ Social media handles (@username, @companyname, etc.)
- ❌ Hashtags (#BrandName, #ProductName, etc.)
- ❌ Social media profile URLs
- ❌ Social media campaign names

#### File Paths & Assets
- ❌ Image paths (/images/logo.png, /assets/hero.jpg, etc.)
- ❌ PDF paths (/docs/guide.pdf, etc.)
- ❌ Font paths or custom fonts
- ❌ Video/audio file paths
- ❌ Any file that doesn't exist in the codebase

#### URLs & Links
- ❌ Subdomains (blog.company.com, shop.company.com, etc.)
- ❌ URL paths (/about, /contact, /services, etc.)
- ❌ External partner URLs
- ❌ Documentation URLs
- ❌ API endpoints

#### Identifiers & Codes
- ❌ Product SKUs or IDs
- ❌ Tracking codes (Google Analytics IDs, etc.)
- ❌ API keys (even fake ones)
- ❌ License numbers
- ❌ Certification numbers

---

## ✅ What To Do Instead:

### 1. **Check First**
```bash
# For images
ls public/images/

# For files
find . -name "*.pdf"
find . -name "*logo*"

# For URLs (check pages directory)
ls pages/
ls pages/blog/
```

### 2. **Ask First**
If you need any of the above and can't verify it exists:
```
"I need a [phone number/email/social handle/etc.] for [purpose].
What should I use?"
```

### 3. **Use Placeholders (ONLY when explicitly instructed)**
```html
<!-- ❌ NEVER do this spontaneously -->
<a href="mailto:support@company.com">Contact Us</a>

<!-- ✅ Do this instead -->
<a href="mailto:[EMAIL_NEEDED]">Contact Us</a>
<!-- Then ask: "What email address should I use here?" -->
```

### 4. **Read Existing Examples**
Before adding contact info, check existing files:
```bash
# Find existing email addresses
grep -r "@" pages/ src/ public/ | grep -i "mailto\|email"

# Find existing phone numbers
grep -r "tel:" pages/ src/ public/

# Find existing social handles
grep -r "@" pages/ src/ public/ | grep -i "twitter\|instagram\|facebook"
```

---

## 🎯 Real Examples from This Project

### ❌ What NOT To Do (Actual Mistakes Made)

```javascript
// WRONG - Fabricated social media handle
<p>Follow us: @PurrifyPets</p>
// ACTUAL: @purrifyhq

// WRONG - Fabricated hashtag
<p>Use hashtag #PurrifyFresh</p>
// ACTUAL: No official hashtags exist

// WRONG - Fabricated image path
<meta property="og:image" content="/images/og-training-guide.jpg">
// ACTUAL: File doesn't exist, should use /images/140g.jpg

// WRONG - Fabricated phone number
<a href="tel:1-800-PURRIFY">Call Us</a>
// ACTUAL: Phone number doesn't exist
```

### ✅ What To Do Instead

```javascript
// ✅ CORRECT - Verified first
<p>Follow us: @purrifyhq</p>

// ✅ CORRECT - Asked user first
<p>Follow us: @purrifyhq</p>
// (No hashtags - user confirmed none exist)

// ✅ CORRECT - Checked what images exist
const availableImages = await fs.readdir('public/images/')
// Use actual file: /images/140g.jpg

// ✅ CORRECT - Ask user
// "What phone number should customers call?"
```

---

## 🔍 Verification Checklist

Before using ANY contact info or asset path, verify:

- [ ] **Email**: Grep codebase for existing emails, or ASK USER
- [ ] **Phone**: Grep codebase for existing phone numbers, or ASK USER
- [ ] **Social**: Grep codebase for existing handles, or ASK USER
- [ ] **Hashtags**: Grep codebase for existing hashtags, or ASK USER
- [ ] **Images**: Run `ls public/images/` to see what exists
- [ ] **URLs**: Check `pages/` directory structure
- [ ] **Files**: Use `find` to locate before linking

---

## 💡 Why This Matters

### Real-World Consequences of Fabrication:

1. **Broken Links** - Users click on non-existent pages (404 errors)
2. **Failed Contact** - Customers email/call numbers that don't exist
3. **Brand Confusion** - Wrong social handles send traffic to competitors or random accounts
4. **SEO Penalties** - Broken links and 404s hurt search rankings
5. **User Frustration** - Trust is destroyed when links don't work
6. **Support Burden** - More support tickets from confused users
7. **Legal Issues** - Accidentally linking to someone else's trademarked handle

### Example Impact:
```
User sees: "Follow us @PurrifyPets"
User goes to Twitter, searches @PurrifyPets
Result: Account doesn't exist or belongs to someone else
Outcome: User thinks brand is unprofessional or fake
```

---

## 🎓 Training Principle

**"If I haven't verified it exists in the codebase or heard it from the user, I CANNOT use it."**

This applies to:
- Every email address
- Every phone number
- Every social media handle
- Every hashtag
- Every image path
- Every URL
- Every file path
- Every external link

**No exceptions. No assumptions. No fabrications.**

---

## 📝 Quick Reference Card

When tempted to add contact info or paths:

1. **STOP** ✋
2. **CHECK** - Does it exist in the codebase? 🔍
3. **ASK** - If not found, ask the user 💬
4. **VERIFY** - Double-check before committing ✅

Remember: **Accuracy > Speed**

A 30-second verification prevents hours of cleanup and broken user experiences.
