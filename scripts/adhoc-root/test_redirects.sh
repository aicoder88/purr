#!/bin/bash

echo "=========================================="
echo "REDIRECT TEST SCRIPT FOR PURRIFY.CA"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_redirect() {
    local url=$1
    local expected_code=$2
    local description=$3
    
    echo "Testing: $description"
    echo "URL: $url"
    
    # Get the HTTP status and location
    response=$(curl -sI "$url" 2>&1)
    http_code=$(echo "$response" | grep -E "^HTTP" | tail -1 | awk '{print $2}')
    location=$(echo "$response" | grep -i "location:" | head -1 | sed 's/location: //i' | tr -d '\r')
    
    if [ "$http_code" = "$expected_code" ]; then
        echo -e "${GREEN}✓ Status: $http_code (Expected: $expected_code)${NC}"
    else
        echo -e "${YELLOW}⚠ Status: $http_code (Expected: $expected_code)${NC}"
    fi
    
    if [ -n "$location" ]; then
        echo "  → Location: $location"
    fi
    echo ""
}

test_redirect_chain() {
    local url=$1
    local description=$2
    
    echo "Testing Redirect Chain: $description"
    echo "URL: $url"
    echo "---"
    
    # Count redirects
    redirect_count=$(curl -sIL "$url" 2>&1 | grep -cE "^HTTP")
    
    curl -sIL "$url" 2>&1 | grep -E "(HTTP|location:)" | head -20
    
    echo "---"
    echo "Total HTTP responses: $redirect_count"
    if [ "$redirect_count" -gt 3 ]; then
        echo -e "${YELLOW}⚠ Too many redirects! Should be 1-2 hops.${NC}"
    elif [ "$redirect_count" -gt 2 ]; then
        echo -e "${YELLOW}⚠ Moderate redirect chain. Could be optimized.${NC}"
    else
        echo -e "${GREEN}✓ Good redirect chain.${NC}"
    fi
    echo ""
}

echo "1. NON-WWW TO WWW REDIRECT (Should be 308)"
echo "============================================"
test_redirect "https://purrify.ca/" "308" "Non-www homepage"
test_redirect "https://purrify.ca/learn/faq" "308" "Non-www subpage"

echo ""
echo "2. TRAILING SLASH REDIRECTS (Should be 308)"
echo "============================================"
test_redirect "https://www.purrify.ca/blog/cat-litter-smell-worse-summer" "308" "Blog post without slash"

echo ""
echo "3. LOCALE REMOVAL REDIRECTS"
echo "============================================"
test_redirect_chain "https://www.purrify.ca/zh/locations/ferryland/" "Chinese locale removal"
test_redirect_chain "https://www.purrify.ca/es/tools/cat-litter-calculator" "Spanish locale removal"
test_redirect_chain "https://www.purrify.ca/en/blog/cat-litter-smell-worse-summer" "English locale removal"

echo ""
echo "4. PATH RESTRUCTURE REDIRECTS"
echo "============================================"
test_redirect_chain "https://www.purrify.ca/solutions/ammonia-smell-cat-litter" "Solutions to learn/solutions"
test_redirect_chain "https://www.purrify.ca/fr/solutions/ammonia-smell-cat-litter" "FR solutions redirect"

echo ""
echo "5. COMPLETE CHAIN FROM NON-WWW"
echo "============================================"
test_redirect_chain "http://purrify.ca/learn/faq" "HTTP non-www to HTTPS www"

echo ""
echo "=========================================="
echo "TEST COMPLETE"
echo "=========================================="
