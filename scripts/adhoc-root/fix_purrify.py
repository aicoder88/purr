import requests

# Triple-check these are exactly as they appear in Cloudflare
API_KEY = "2c57148b9ab7b0d04f0ef05053b551b42f520".strip()
EMAIL = "iptmim@gmail.com".strip()
ZONE_ID = "7874a773838423403332036643272635".strip()

headers = {
    "X-Auth-Email": EMAIL,
    "X-Auth-Key": API_KEY,
    "Content-Type": "application/json",
}

def rescue():
    # Attempt to find the ruleset using the main zones endpoint
    print("Checking connection...")
    url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/rulesets"
    r = requests.get(url, headers=headers)
    
    if r.status_code != 200:
        print(f"❌ Connection failed. Status: {r.status_code}")
        print(f"Response: {r.text}")
        return

    rulesets = r.json().get("result", [])
    # Find the Custom Ruleset ID
    rs_id = next((rs['id'] for rs in rulesets if rs['phase'] == 'http_request_firewall_custom'), None)
    
    if not rs_id:
        print("❌ Ruleset not found. Are you sure WAF rules exist for this domain?")
        return

    # Get the rules in that ruleset
    rules_url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/rulesets/{rs_id}"
    rules = requests.get(rules_url, headers=headers).json().get("result", {}).get("rules", [])
    
    # Find the Rule ID for the Vercel protection
    target_rule = next((rule for rule in rules if "Protect Vercel Bill" in rule.get("description", "")), None)
    
    if not target_rule:
        print("❌ Could not find 'Protect Vercel Bill' rule. Check the name in your dashboard.")
        return

    # Update the rule
    rule_id = target_rule['id']
    update_url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/rulesets/{rs_id}/rules/{rule_id}"
    
    new_logic = {
        "description": "Protect Vercel Bill: Allow CA, US, HR and Bots",
        "expression": '(not ip.geoip.country in {"CA" "US" "HR"} and not cf.client.bot and not http.request.uri.path contains ".well-known")',
        "action": "managed_challenge"
    }
    
    update_r = requests.patch(update_url, headers=headers, json=new_logic)
    
    if update_r.status_code == 200:
        print("✅ SUCCESS! Purrify is protected. Croatia is whitelisted.")
    else:
        print(f"❌ Update failed: {update_r.text}")

if __name__ == "__main__":
    rescue()
