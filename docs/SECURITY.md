# Security Implementation

## Overview

The blog system now includes comprehensive security measures to protect against common web vulnerabilities.

## Implemented Security Features

### 1. XSS Protection (Cross-Site Scripting)

**Library**: `isomorphic-dompurify`

**Implementation**: `src/lib/security/sanitize.ts`

All user-generated content is sanitized before being saved or displayed:

- **HTML Content**: Sanitized to allow safe HTML tags while removing dangerous scripts
- **Plain Text**: All HTML tags stripped from titles, excerpts, and metadata
- **URLs**: Validated to only allow http, https, and mailto protocols

**Usage**:
```typescript
import { sanitizeBlogPost } from '@/lib/security/sanitize';

// Automatically sanitizes all fields
const cleanPost = sanitizeBlogPost(dirtyPost);
```

**Allowed HTML Tags**:
- Text formatting: `p`, `br`, `strong`, `em`, `u`, `s`, `mark`, `small`, `sub`, `sup`
- Headings: `h1` through `h6`
- Lists: `ul`, `ol`, `li`
- Links and media: `a`, `img`
- Quotes and code: `blockquote`, `code`, `pre`
- Tables: `table`, `thead`, `tbody`, `tr`, `th`, `td`
- Semantic: `div`, `span`, `article`, `section`

### 2. CSRF Protection (Cross-Site Request Forgery)

**Implementation**: `src/lib/security/csrf.ts`

Protects state-changing operations (POST, PUT, DELETE, PATCH) with token validation.

**How it works**:
1. Server generates a random token and stores it in an HttpOnly cookie
2. Client includes token in request headers or body
3. Server validates that both tokens match

**Usage**:
```typescript
import { withCSRFProtection } from '@/lib/security/csrf';

export default withCSRFProtection(async (req, res) => {
  // Your handler code
});
```

**Client-side** (automatic in admin interface):
```typescript
// Get CSRF token
const response = await fetch('/api/csrf-token');
const { csrfToken } = await response.json();

// Include in requests
fetch('/api/admin/blog/posts', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

### 3. Rate Limiting

**Implementation**: `src/lib/security/rate-limit.ts`

Prevents abuse by limiting the number of requests from a single IP address.

**Rate Limit Configurations**:

| Endpoint Type | Window | Max Requests | Use Case |
|--------------|--------|--------------|----------|
| AUTH | 15 minutes | 5 | Login attempts |
| CREATE | 1 minute | 10 | Content creation |
| READ | 1 minute | 100 | Content reading |
| UPLOAD | 1 minute | 5 | Image uploads |

**Usage**:
```typescript
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';

export default withRateLimit(RATE_LIMITS.CREATE, async (req, res) => {
  // Your handler code
});
```

**Response Headers**:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: When the limit resets (ISO 8601 timestamp)

**Error Response** (429 Too Many Requests):
```json
{
  "error": "Too many requests",
  "retryAfter": 45
}
```

### 4. Authentication & Authorization

**Implementation**: NextAuth.js with role-based access control

**Roles**:
- **Admin**: Full access to all features
- **Editor**: Can create and edit posts (future enhancement)

**Protected Routes**:
- All `/admin/*` routes require authentication
- Middleware automatically redirects unauthenticated users to login

### 5. Input Validation

**Implementation**: Zod schemas (future enhancement)

Currently validates:
- Required fields (title, content, slug)
- File types and sizes for uploads (max 10MB)
- URL formats
- Email formats

## Security Best Practices

### For Developers

1. **Never trust user input**: Always sanitize and validate
2. **Use HTTPS in production**: Ensure all traffic is encrypted
3. **Keep dependencies updated**: Run `npm audit` regularly
4. **Use environment variables**: Never commit secrets to Git
5. **Implement proper logging**: Track security events

### For Administrators

1. **Use strong passwords**: Minimum 12 characters with mixed case, numbers, symbols
2. **Change default credentials**: Update `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
3. **Monitor logs**: Check `logs/audit/` for suspicious activity
4. **Regular backups**: Backup `content/` directory regularly
5. **Update regularly**: Keep Next.js and dependencies up to date

## Environment Variables

```bash
# Authentication
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-domain.com"

# Admin Credentials (CHANGE THESE!)
ADMIN_EMAIL="your-email@domain.com"
ADMIN_PASSWORD="your-strong-password"

# Optional: Editor Credentials
EDITOR_EMAIL="editor@domain.com"
EDITOR_PASSWORD="editor-strong-password"
```

## API Endpoints Security

### Protected Endpoints

All admin API endpoints are protected with:
- ✅ Authentication (NextAuth session)
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input sanitization

| Endpoint | Method | Rate Limit | CSRF | Auth |
|----------|--------|------------|------|------|
| `/api/admin/blog/posts` | POST/PUT | CREATE | ✅ | ✅ |
| `/api/admin/blog/posts/[slug]` | DELETE | CREATE | ✅ | ✅ |
| `/api/admin/blog/upload-image` | POST | UPLOAD | ❌ | ✅ |
| `/api/auth/[...nextauth]` | POST | AUTH | ❌ | N/A |

### Public Endpoints

Public endpoints have read-only rate limiting:
- `/api/blog/*` - READ rate limit (100 req/min)

## Security Headers

Configured in `next.config.js`:

```javascript
{
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}
```

## Audit Logging

All content changes are logged to `logs/audit/`:

```json
{
  "timestamp": "2024-11-09T12:00:00.000Z",
  "userId": "admin@purrify.ca",
  "action": "create",
  "resourceType": "post",
  "resourceId": "my-post-slug",
  "details": {
    "title": "My Post Title",
    "status": "published"
  }
}
```

## Known Limitations

1. **In-Memory Rate Limiting**: Uses in-memory storage (not suitable for multi-instance deployments)
   - **Solution**: Use Redis for production with multiple servers
   
2. **No Account Lockout**: Failed login attempts don't lock accounts
   - **Mitigation**: Rate limiting prevents brute force attacks
   
3. **No 2FA**: Two-factor authentication not implemented
   - **Future Enhancement**: Add TOTP-based 2FA

4. **No Content Security Policy**: CSP headers not configured
   - **Future Enhancement**: Add strict CSP headers

## Incident Response

If you suspect a security breach:

1. **Immediately**: Change all passwords and regenerate `NEXTAUTH_SECRET`
2. **Review**: Check `logs/audit/` for unauthorized changes
3. **Restore**: Restore content from Git history if needed
4. **Update**: Update all dependencies with `npm update`
5. **Monitor**: Watch for unusual activity in the next 48 hours

## Security Checklist

Before deploying to production:

- [ ] Change default admin credentials
- [ ] Generate strong `NEXTAUTH_SECRET`
- [ ] Enable HTTPS
- [ ] Configure security headers
- [ ] Set up monitoring and alerts
- [ ] Test rate limiting
- [ ] Review audit logs
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Test CSRF protection
- [ ] Verify input sanitization

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [NextAuth.js Security](https://next-auth.js.org/configuration/options#security)

---

**Last Updated**: November 9, 2024  
**Security Level**: Production Ready ✅
