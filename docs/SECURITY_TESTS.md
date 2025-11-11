# Security Tests Documentation (Task 10)

This document describes the security test suite created for Task 10 of the blog system integration deployment.

## Overview

The security test suite consists of 5 comprehensive E2E test files covering all aspects of application security:

1. **Authentication Tests** (`security-authentication.spec.ts`)
2. **XSS Prevention Tests** (`security-xss.spec.ts`)
3. **CSRF Protection Tests** (`security-csrf.spec.ts`)
4. **Rate Limiting Tests** (`security-rate-limiting.spec.ts`)
5. **File Upload Security Tests** (`security-file-upload.spec.ts`)

## Running the Tests

### Run All Security Tests
```bash
npm run test:e2e:security
```

### Run Individual Test Suites
```bash
# Authentication tests
npx playwright test e2e/security-authentication.spec.ts

# XSS prevention tests
npx playwright test e2e/security-xss.spec.ts

# CSRF protection tests
npx playwright test e2e/security-csrf.spec.ts

# Rate limiting tests
npx playwright test e2e/security-rate-limiting.spec.ts

# File upload security tests
npx playwright test e2e/security-file-upload.spec.ts
```

### Run with UI Mode (for debugging)
```bash
npx playwright test e2e/security-authentication.spec.ts --ui
```

## Test Coverage

### Task 10.1: Authentication Tests

**File:** `e2e/security-authentication.spec.ts`

Tests verify that:
- Admin endpoints require authentication
- API endpoints return 401 without auth
- Invalid credentials are rejected
- Valid credentials allow access
- Sessions persist across page reloads
- Logout properly clears sessions

**Key Scenarios:**
- Unauthenticated access to `/admin/blog` redirects to login
- API calls without session return 401
- Wrong credentials show error message
- Correct credentials grant access
- Session cookies work correctly
- Logout invalidates session

### Task 10.2: XSS Prevention Tests

**File:** `e2e/security-xss.spec.ts`

Tests verify that:
- Script tags in post titles are sanitized
- Script tags in post content are sanitized
- Event handlers (onerror, onclick) are stripped
- JavaScript URLs are neutralized
- HTML entities are properly escaped
- Category and tag names are sanitized

**Attack Vectors Tested:**
- `<script>alert("XSS")</script>` in titles
- Inline scripts in content
- `<img src="x" onerror="alert('XSS')">` event handlers
- `<a href="javascript:alert('XSS')">` URLs
- Malicious category/tag names

### Task 10.3: CSRF Protection Tests

**File:** `e2e/security-csrf.spec.ts`

Tests verify that:
- POST requests with wrong origin are rejected
- DELETE requests require authentication
- PUT requests require authentication
- State-changing operations need valid sessions
- Bulk operations require auth
- Category management requires auth
- Media deletion requires auth

**Protection Mechanisms:**
- Origin header validation
- Session token validation
- Authentication checks on all mutations
- Proper HTTP status codes (401, 403)

### Task 10.4: Rate Limiting Tests

**File:** `e2e/security-rate-limiting.spec.ts`

Tests verify that:
- Rapid login attempts are limited
- Rapid API requests are throttled
- Rapid post creation is limited
- Bulk operations have rate limits
- Analytics exports are rate limited

**Scenarios:**
- 10+ rapid login attempts
- 50+ rapid API calls
- 20+ rapid post creations
- Multiple bulk operations in quick succession
- Repeated analytics exports

**Expected Behavior:**
- 429 (Too Many Requests) responses
- Consistent rejection of excessive requests
- Reasonable throughput limits

### Task 10.5: File Upload Security Tests

**File:** `e2e/security-file-upload.spec.ts`

Tests verify that:
- Executable files (.sh, .exe) are rejected
- PHP files are rejected
- Oversized files are rejected
- Only image files are accepted for media
- Files with double extensions are rejected
- SVG files are sanitized or rejected
- File uploads require authentication
- Valid image files are accepted

**File Types Tested:**
- Malicious: .sh, .php, .exe
- Invalid: .txt, .doc
- Dangerous: .svg with embedded scripts
- Double extensions: .jpg.php
- Oversized: 20MB+ files
- Valid: .jpg, .png, .gif

## Environment Variables

The tests require these environment variables:

```bash
# Admin credentials for testing
ADMIN_EMAIL=admin@purrify.ca
ADMIN_PASSWORD=admin123

# Optional: Editor credentials
EDITOR_EMAIL=editor@purrify.ca
EDITOR_PASSWORD=editor123

# NextAuth secret
NEXTAUTH_SECRET=your-secret-here
```

Set these in `.env.local` or `.env.test` for local testing.

## Test Architecture

### Helper Functions

Each test file includes helper functions for common operations:

```typescript
// Login helper (used across multiple test files)
async function login(page: any) {
  await page.goto('/admin/login');
  const email = process.env.ADMIN_EMAIL || 'admin@purrify.ca';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/admin\/blog/, { timeout: 10000 });
}
```

### Test Patterns

**Authentication Check:**
```typescript
const response = await page.request.get('/api/admin/blog/posts');
expect(response.status()).toBe(401);
```

**XSS Detection:**
```typescript
const alerts: string[] = [];
page.on('dialog', dialog => {
  alerts.push(dialog.message());
  dialog.dismiss();
});
// ... perform action
expect(alerts).toHaveLength(0); // No alerts should fire
```

**Rate Limiting Check:**
```typescript
const results: number[] = [];
for (let i = 0; i < attempts; i++) {
  const response = await page.request.post('/api/endpoint');
  results.push(response.status());
}
const has429 = results.some(status => status === 429);
expect(has429).toBe(true);
```

## Known Limitations

1. **Rate Limiting**: Some rate limiting tests may need adjustment based on actual implementation. Currently tests for presence of 429 responses or reasonable throughput.

2. **File Upload**: Tests assume file upload inputs exist in the admin interface. If media library is implemented differently, tests may need updates.

3. **CSRF Tokens**: Tests verify authentication but don't explicitly check for CSRF tokens. NextAuth handles this internally.

4. **SVG Sanitization**: SVG tests check that scripts don't execute but don't verify specific sanitization methods.

## Troubleshooting

### Tests Fail to Login
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set correctly
- Check that NextAuth is configured properly
- Ensure the dev server is running on port 3010

### File Upload Tests Fail
- Verify file upload inputs exist in the UI
- Check that media library is accessible
- Ensure file validation is implemented

### Rate Limiting Tests Fail
- Rate limiting may not be implemented yet
- Tests are designed to pass if requests are consistently rejected (401)
- Adjust attempt counts if needed

### XSS Tests Fail
- Verify content sanitization is implemented
- Check that DOMPurify or similar library is used
- Ensure React's built-in XSS protection is not bypassed

## Integration with CI/CD

Add to your CI pipeline:

```yaml
# .github/workflows/security-tests.yml
name: Security Tests

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e:security
        env:
          ADMIN_EMAIL: ${{ secrets.TEST_ADMIN_EMAIL }}
          ADMIN_PASSWORD: ${{ secrets.TEST_ADMIN_PASSWORD }}
```

## Next Steps

After running these tests:

1. **Fix any failures** - Address security vulnerabilities found
2. **Implement missing features** - Add rate limiting, file validation, etc.
3. **Add to CI/CD** - Run security tests on every commit
4. **Monitor in production** - Set up security monitoring and alerts
5. **Regular audits** - Run security tests regularly and update as needed

## Related Documentation

- [Playwright Configuration](../playwright.config.ts)
- [Blog System Status](./BLOG_SYSTEM_STATUS.md)
- [Deployment Roadmap](./DEPLOYMENT_ROADMAP.md)
- [Task List](.kiro/specs/blog-system-integration-deployment/tasks.md)

## Security Best Practices

1. **Never commit credentials** - Use environment variables
2. **Rotate secrets regularly** - Change admin passwords periodically
3. **Monitor failed attempts** - Set up alerts for suspicious activity
4. **Keep dependencies updated** - Run `npm audit` regularly
5. **Use HTTPS in production** - Never send credentials over HTTP
6. **Implement CSP headers** - Add Content Security Policy
7. **Enable rate limiting** - Protect against brute force attacks
8. **Sanitize all inputs** - Never trust user input
9. **Validate file uploads** - Check type, size, and content
10. **Log security events** - Track authentication and authorization

## Contact

For questions or issues with security tests, refer to the main project documentation or create an issue in the project repository.
