#!/bin/bash

# Security Test Runner for Task 10
# Runs all security-related E2E tests

set -e

echo "🔒 Running Security Tests (Task 10)"
echo "===================================="
echo ""

# Set test environment variables if not already set
export ADMIN_EMAIL="${ADMIN_EMAIL:-admin@purrify.ca}"
export ADMIN_PASSWORD="${ADMIN_PASSWORD:-admin123}"

echo "📋 Test Configuration:"
echo "  Admin Email: $ADMIN_EMAIL"
echo "  Base URL: http://localhost:3010"
echo ""

# Run each security test suite
echo "🔐 Task 10.1: Testing Authentication..."
npx playwright test e2e/security-authentication.spec.ts --reporter=list

echo ""
echo "🛡️  Task 10.2: Testing XSS Prevention..."
npx playwright test e2e/security-xss.spec.ts --reporter=list

echo ""
echo "🔒 Task 10.3: Testing CSRF Protection..."
npx playwright test e2e/security-csrf.spec.ts --reporter=list

echo ""
echo "⏱️  Task 10.4: Testing Rate Limiting..."
npx playwright test e2e/security-rate-limiting.spec.ts --reporter=list

echo ""
echo "📁 Task 10.5: Testing File Upload Security..."
npx playwright test e2e/security-file-upload.spec.ts --reporter=list

echo ""
echo "✅ All security tests completed!"
echo ""
echo "📊 Summary:"
echo "  - Authentication tests"
echo "  - XSS prevention tests"
echo "  - CSRF protection tests"
echo "  - Rate limiting tests"
echo "  - File upload security tests"
