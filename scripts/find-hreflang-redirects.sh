#!/bin/bash
#
# Hreflang Redirect Issue Detector (Bash Version)
# Quick script to check hreflang links for redirects
#
# Usage:
#   ./find-hreflang-redirects.sh https://example.com/page
#   ./find-hreflang-redirects.sh --sitemap https://example.com/sitemap.xml
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

USER_AGENT="HreflangBot/1.0 (SEO Audit)"
TIMEOUT=10

# Function to check a single URL for hreflang issues
check_page() {
    local url="$1"
    local temp_file=$(mktemp)
    
    echo "Checking: $url"
    
    # Fetch the page
    if ! curl -sL -A "$USER_AGENT" --max-time "$TIMEOUT" "$url" > "$temp_file" 2>/dev/null; then
        echo -e "${RED}  ERROR: Failed to fetch page${NC}"
        rm -f "$temp_file"
        return 1
    fi
    
    # Extract hreflang links from the HTML
    local hreflangs=$(grep -oE '<link[^>]+rel="alternate"[^>]+hreflang="[^"]+"[^>]*>' "$temp_file" 2>/dev/null || true)
    
    if [ -z "$hreflangs" ]; then
        echo "  No hreflang links found"
        rm -f "$temp_file"
        return 0
    fi
    
    local issue_count=0
    
    # Process each hreflang link
    while IFS= read -r line; do
        if [ -z "$line" ]; then continue; fi
        
        # Extract hreflang value
        local hreflang=$(echo "$line" | grep -oE 'hreflang="[^"]+"' | sed 's/hreflang="//;s/"$//')
        
        # Extract href value
        local href=$(echo "$line" | grep -oE 'href="[^"]+"' | sed 's/href="//;s/"$//')
        
        # Resolve relative URLs
        if [[ "$href" != http* ]]; then
            local base=$(echo "$url" | grep -oE 'https?://[^/]+')
            if [[ "$href" == /* ]]; then
                href="${base}${href}"
            else
                href="${url%/}/${href}"
            fi
        fi
        
        # Check if hreflang URL returns a redirect
        local response=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}" -A "$USER_AGENT" --max-time "$TIMEOUT" "$href" 2>/dev/null || echo "000|")
        local status=$(echo "$response" | cut -d'|' -f1)
        local redirect_url=$(echo "$response" | cut -d'|' -f2)
        
        if [ "$status" -ge 300 ] && [ "$status" -lt 400 ]; then
            echo -e "${RED}  ISSUE: Hreflang redirect ($status)${NC}"
            echo "    hreflang: $hreflang"
            echo "    URL: $href"
            if [ -n "$redirect_url" ]; then
                echo "    Redirects to: $redirect_url"
            fi
            ((issue_count++))
        elif [ "$status" -ge 400 ]; then
            echo -e "${RED}  ISSUE: Hreflang error ($status)${NC}"
            echo "    hreflang: $hreflang"
            echo "    URL: $href"
            ((issue_count++))
        elif [ "$status" = "000" ]; then
            echo -e "${RED}  ISSUE: Hreflang unreachable${NC}"
            echo "    hreflang: $hreflang"
            echo "    URL: $href"
            ((issue_count++))
        else
            echo -e "${GREEN}  OK ($status): $hreflang → $href${NC}"
        fi
        
    done <<< "$hreflangs"
    
    rm -f "$temp_file"
    
    if [ "$issue_count" -eq 0 ]; then
        echo -e "${GREEN}  ✓ All hreflang links are valid${NC}"
    else
        echo -e "${RED}  ✗ Found $issue_count hreflang issue(s)${NC}"
    fi
    
    return 0
}

# Function to extract URLs from sitemap
fetch_sitemap_urls() {
    local sitemap_url="$1"
    local temp_file=$(mktemp)
    
    echo "Fetching sitemap: $sitemap_url"
    
    if ! curl -sL -A "$USER_AGENT" --max-time "$TIMEOUT" "$sitemap_url" > "$temp_file" 2>/dev/null; then
        echo "ERROR: Failed to fetch sitemap"
        rm -f "$temp_file"
        return 1
    fi
    
    # Check if it's a sitemap index
    if grep -q "<sitemapindex" "$temp_file" 2>/dev/null; then
        echo "Sitemap index detected. Processing child sitemaps..."
        grep -oE '<loc>[^<]+</loc>' "$temp_file" | sed 's/<loc>//;s/<\/loc>//' | while read -r child_url; do
            fetch_sitemap_urls "$child_url"
        done
    else
        # Regular sitemap - extract URLs
        grep -oE '<loc>[^<]+</loc>' "$temp_file" | sed 's/<loc>//;s/<\/loc>//'
    fi
    
    rm -f "$temp_file"
}

# Main
main() {
    echo "================================"
    echo "Hreflang Redirect Issue Detector"
    echo "================================"
    echo ""
    
    if [ $# -eq 0 ]; then
        echo "Usage:"
        echo "  $0 <page-url>              # Check a single page"
        echo "  $0 --sitemap <sitemap-url> # Check all pages in sitemap"
        echo ""
        echo "Examples:"
        echo "  $0 https://example.com/page"
        echo "  $0 --sitemap https://example.com/sitemap.xml"
        exit 1
    fi
    
    local total_issues=0
    
    if [ "$1" = "--sitemap" ]; then
        local sitemap_url="$2"
        local urls=$(fetch_sitemap_urls "$sitemap_url")
        local count=$(echo "$urls" | grep -c '^' || echo "0")
        
        echo "Found $count URLs to check"
        echo ""
        
        while IFS= read -r url; do
            if [ -n "$url" ]; then
                check_page "$url" || true
                echo ""
            fi
        done <<< "$urls"
    else
        check_page "$1"
    fi
    
    echo "================================"
    echo "Scan complete"
}

main "$@"
