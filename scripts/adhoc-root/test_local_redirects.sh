#!/bin/bash

BASE_URL="${1:-http://localhost:3000}"

echo "=========================================="
echo "REDIRECT TEST SCRIPT (Ag)"
echo "Target: $BASE_URL"
echo "=========================================="

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

test_redirect() {
    local path=$1
    local expected_code=$2
    local description=$3
    
    echo "Testing: $description"
    echo "Path: $path"
    
    response=$(curl -sI -H "Host: www.purrify.ca" "$BASE_URL$path" 2>&1)
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
    local path=$1
    local description=$2
    
    echo "Testing Redirect Chain: $description"
    echo "Path: $path"
    echo "---"
    
    # We need to manually follow redirects because curl -L will just follow relative to localhost
    # but our redirects might point to full URLs (https://www.purrify.ca) which we can't capture easily if we want to stay on localhost
    # actually, for this test, we accept that absolute redirects break out of localhost.
    # But for redirects checking, we assume mostly relative redirects for internal structure.
    # If it redirects to https://www.purrify.ca, we stop and note it.
    
    curl -sIL -H "Host: www.purrify.ca" "$BASE_URL$path" 2>&1 | grep -E "(HTTP|location:)" | head -20
    
    echo "---"
    echo ""
}

echo "1. TRAILING SLASH REDIRECTS"
test_redirect "/blog/cat-litter-smell-worse-summer" "308" "Blog post without slash"

echo "2. LOCALE REMOVAL"
test_redirect_chain "/zh/locations/ferryland/" "Chinese locale removal"
test_redirect_chain "/es/tools/cat-litter-calculator" "Spanish locale removal"

echo "3. PATH RESTRUCTURE"
test_redirect_chain "/solutions/ammonia-smell-cat-litter" "Solutions restructure"
test_redirect_chain "/fr/solutions/ammonia-smell-cat-litter" "FR Solutions"

echo "4. SPECIFIC LOCATIONS"
test_redirect_chain "/locations/ferryland" "Ferryland location"
test_redirect_chain "/locations/ferryland/" "Ferryland location (slash)"
